;(function($, window, document) {

    "use strict";

    $(document).ready(function() {
        var $videos = $('[data-op3-element-type="video"]');
        var $frames = $videos.find("iframe");

        $frames.ready(function() {
            $('[data-op3-element-type="video"] .op3-video-image-overlay')
                .on("click", _handleVideoImageOverlayClick);
        })

        // Fixes a problem with video autoplay when a user returns to a
        // page using the browser's back button (OP3-1571)
        $(window).on("beforeunload", function() {
            $frames.each(function() {
                var src = $(this).attr("src");
                if (!src)
                    return;

                src = src.replace("autoplay=1", "autoplay=0");
                $(this).attr("src", src);
            })
        });

        // Init Sticky Video Observers
        var $stickyVideos = $('[data-op3-video-sticky="1"]');
        $videos.attr("data-op3-video-sticky-active", "0");
        if (window.IntersectionObserver && $stickyVideos.length > 0) {

            // Initialize sticky position and set filler content height so
            // that the page doesn't jump
            var initStickyVideo = function($element) {
                $element.css("height", $element.height() + "px");
                $element.attr("data-op3-video-sticky-active", "1");
                setTimeout(function() {
                    var $wrapper = $element.find('.op3-video-wrapper');
                    if ($wrapper.css('position') !== "fixed")
                        return;

                    var $overlay = $element.find('.op3-video-image-overlay');
                    $overlay
                        .css({
                            height: $wrapper.height(),
                            "max-width": $wrapper.width(),
                            left: $wrapper.css("left"),
                            right: $wrapper.css("right"),
                            top: $wrapper.css("top"),
                            bottom: $wrapper.css("bottom"),
                        })
                        .attr("data-op3-video-sticky-position", $wrapper.attr("data-op3-video-sticky-position"))
                        .find(".op3-icon")
                        .css("font-size", "70px");
                });
            }

            // Return sticky video to regular document flow
            var removeStickyVideo = function($element) {
                $element.css("height", "auto");
                $element.attr("data-op3-video-sticky-active", "0");

                setTimeout(function() {
                    var $overlay = $element.find('.op3-video-image-overlay');
                    $overlay
                        .css({
                            height: "",
                            "max-width": "",
                            left: "",
                            right: "",
                            top: "",
                            bottom: "",
                        })
                        .removeAttr('data-op3-video-sticky-position')
                        .find('.op3-icon')
                        .css('font-size', '');
                })
            }

            // When video exits the viewport, we set it to sticky
            var handleElementIntersection = function(entries, observer) {
                entries.forEach(function(entry) {
                    // Only float the video when scrolling under the video
                    // positioned on the page, not above it, as the video
                    // would be floated on pageload when positioned in the
                    // middle of the long page
                    if (entry.isIntersecting || entry.boundingClientRect.y > 0) {
                        removeStickyVideo($(entry.target));
                        return;
                    }

                    // Open video unless it was closed
                    if ($(entry.target).attr("data-op3-video-sticky-closed") !== "1")
                        initStickyVideo($(entry.target));
                });
            };

            OP3.StickyVideo = {};
            OP3.StickyVideo.observer = new IntersectionObserver(handleElementIntersection);
            $stickyVideos.each(function() {
                if ($(this).attr("data-op3-video-sticky-close") === "1") {
                    var $wrapper = $(this),
                        $element = $wrapper.closest(".op3-element"),
                        $overlay = $element.find(".op3-video-image-overlay");

                    $('<button class="op3-video-sticky-close embed-video-facade-disabled"></button>')
                        .appendTo($overlay.length ? $overlay : $wrapper);
                }

                OP3.StickyVideo.observer.observe($(this).parent().get(0));
            });

            // Reposition sticky on window resize
            $(window).on('resize', function() {
                $stickyVideos.each(function() {
                    var $parent = $(this).parent();
                    if ($parent.attr("data-op3-video-sticky-active") === "0")
                        return;

                    removeStickyVideo($parent);
                    initStickyVideo($parent);
                });
            });

            $(".op3-video-sticky-close").on("click", function(e) {
                var $element = $(this).closest(".op3-element");
                $element.attr("data-op3-video-sticky-closed", "1");
                removeStickyVideo($element);
                var $iframe = $element.find("iframe");

                if ($iframe.length > 0) {
                    var src = $iframe.attr("src");
                    if (src) {
                        $iframe.attr("src", "");
                        $iframe.attr("data-src", src);
                        src = src.replace(/([\?&])autoplay=[01]/, "$1autplay=0");
                        $iframe.attr("src", src);
                        $iframe.removeAttr("data-src");

                        // Strange thing... If we no not set data-src
                        // then the iframe won't refresh... ???
                    }
                }

                var $video = $element.find("video");
                if ($video.length > 0)
                    $video.get(0).pause();

                e.preventDefault();
            });
        }

        // Auto-Hide overlay on videos with autoplay (OP3-1664)
        $videos.each(function() {
            var $this = $(this);
            var $overlay = $this.find(".op3-video-image-overlay");

            if ($this.find('.op3-video-wrapper[data-op3-video-autoplay="1"]').length > 0 && $overlay.is(":visible"))
                $overlay.css("display", "none");
        });
    });

    // On mobile, video is suspended when Low Power Mode is enabled, so
    // this is a workaround to start playback when user touches the screen.
    $("video[data-op3-video-selfhosted]").each(function(e){
        var video = this;

        if (video.autoplay && video.paused) {
            $(document).one('touchstart', function () {
                video.play();
            });
        }
    });

    /**
     * Video image overlay click event handler
     *
     * @param {Event} e
     * @return {Void}
     */
    var _handleVideoImageOverlayClick = function(e) {
        if ($(e.target).closest(".op3-video-sticky-close").length)
            return;

        var iframe = $(this).parent().find("iframe");
        $(this)
            .addClass("op3-video-image-overlay-disabled")
            .find(".op3-icon")
            .css("display", "none");
        $(this)
            .find(".op3-video-sticky-close")
            .appendTo($(this).closest(".op3-element").find('[data-op3-video-sticky="1"]'));

        // Let EmbedVideoFacade do it's magic.
        if ($(this).is(".embed-video-facade-interact"))
            return;

        // Iframe video
        if (iframe.length > 0) {
            var src = iframe.attr("src");
            if (src.indexOf("autoplay=0") !== -1) {
                src = src.replace("autoplay=0", "autoplay=1");
            } else {
                var symbol = src.indexOf("?") > -1 ? "&" : "?";
                src = src += symbol + "autoplay=1";
            }

            iframe.attr("src", src);
            return;
        }

        // HTML5 Video
        var video = $(this).parent().find("video");
        if (video.length > 0)
            video.get(0).play();
    }

})(jQuery, window, document);
