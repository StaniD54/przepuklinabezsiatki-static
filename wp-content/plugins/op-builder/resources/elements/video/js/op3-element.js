/**
 * OptimizePress3 element type:
 * op3 element type video manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/id/js/op3-property.js
 *     - properties/class/js/op3-property.js
 *     - properties/src/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Video = OP3.defineClass({

        Name: "OP3.Element.Video",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "video",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.Code, { label: OP3._("Embed Code") } ],
                    [ OP3.Elements._extension.prop.VideoSource ],
                    [ OP3.Elements._extension.prop.VideoSrc ],
                    [ OP3.Elements._extension.prop.VideoUrlYoutube ],
                    [ OP3.Elements._extension.prop.VideoUrlVimeo ],
                    [ OP3.Elements._extension.prop.VideoUrlWistia ],
                    [ OP3.Elements._extension.prop.VideoUrlSelfhosted ],
                    [ OP3.Elements._extension.prop.VideoUrlUploaded ],
                    [ OP3.Elements._extension.prop.VideoAutoplay ],
                    [ OP3.Elements._extension.prop.VideoMute ],
                    [ OP3.Elements._extension.prop.VideoLoop ],
                    [ OP3.Elements._extension.prop.VideoDownloadControls ],
                    [ OP3.Elements._extension.prop.VideoControls ],
                    [ OP3.Elements._extension.prop.VideoModestBranding ],
                    [ OP3.Elements._extension.prop.VideoRelated ],
                    [ OP3.Elements._extension.prop.VideoColor ],
                    [ OP3.Elements._extension.prop.VideoBackground ],
                    [ OP3.Elements._extension.prop.VideoByline ],
                    [ OP3.Elements._extension.prop.VideoPortrait ],
                    [ OP3.Elements._extension.prop.VideoTitle ],
                    [ OP3.Elements._extension.prop.VideoSpeed ],
                    [ OP3.Elements._extension.prop.VideoStartTime ],
                    [ OP3.Elements._extension.prop.MarginAlign, { label: OP3._("Video Align") } ],
                    [ OP3.Elements._extension.prop.AspectRatio, { selector: " [data-op3-aspect-ratio]" } ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Sticky Video
                    [ OP3.Elements._extension.prop.VideoSticky ],
                    [ OP3.Elements._extension.prop.VideoStickyPosition ],
                    [ OP3.Elements._extension.prop.VideoStickyDesktop ],
                    [ OP3.Elements._extension.prop.VideoStickyDevices ],
                    [ OP3.Elements._extension.prop.VideoStickyTablet ],
                    [ OP3.Elements._extension.prop.VideoStickyMobile ],
                    [ OP3.Elements._extension.prop.VideoStickyPreview ],
                    [ OP3.Elements._extension.prop.VideoStickyClose ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "videoStickyMaxWidth", selector: ' [data-op3-video-sticky]', defaultUnit: "px", } ],
                    [ OP3.Elements._extension.prop.Top, { id: "videoStickyTop", selector: ' [data-op3-video-sticky]', label: "Top Padding", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "1000", "data-step-px": "1", "data-precision-px": "0", }, } ],
                    [ OP3.Elements._extension.prop.Bottom, { id: "videoStickyBottom", selector: ' [data-op3-video-sticky]', label: "Bottom Padding", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "1000", "data-step-px": "1", "data-precision-px": "0", }, } ],
                    [ OP3.Elements._extension.prop.Left, { id: "videoStickyLeft", selector: ' [data-op3-video-sticky]', label: "Left Padding", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "1000", "data-step-px": "1", "data-precision-px": "0", }, } ],
                    [ OP3.Elements._extension.prop.Right, { id: "videoStickyRight", selector: ' [data-op3-video-sticky]', label: "Right Padding", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "1000", "data-step-px": "1", "data-precision-px": "0", }, } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-video-wrapper, .op3-video-image-overlay" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, {selector: " .op3-video-wrapper"} ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Style tab - Image Overlay
                    [ OP3.Elements._extension.prop.Display, { selector: " .op3-video-image-overlay", label: OP3._("Placeholder Image"), hidden: true, } ],
                    [ OP3.Elements._extension.prop.Visible, { selector: " .op3-video-image-overlay", } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' .op3-video-image-overlay' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { label: OP3._("Image Overlay") } ],
                    [ OP3.Elements._extension.prop.Display, { id: "videoIconDisplay", selector: " .op3-icon", hidden: true } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "videoIconVisible", selector: " .op3-icon", label: OP3._("Show Play Icon") } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { label: OP3._("Icon"), selector: ' .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { selector: ' .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { label: OP3._("Icon Size"), selector: ' .op3-icon', attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "200", "data-step-px": "1", "data-precision-px": "0", }, } ],
                    [ OP3.Elements._extension.prop.TextShadow, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.TextShadowIcon ],
                    [ OP3.Elements._extension.prop.Filter, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.FilterIconShadow ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.PaddingDrag ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

    // Currently video background can be set only on section element
    var isVideoBackground = function(element) {
        return (element.type() === "section");
    }

    // Hide image overlay when autoplay starts (OP3-1664)
    var hideImageOverlay = function(element) {
        var $element = $(element);
        var $overlay = $element.find(".op3-video-image-overlay").removeAttr("style");
        if ($element.find('.op3-video-wrapper[data-op3-video-autoplay="1"]').length > 0 && $overlay.is(":visible"))
            $overlay.css("display", "none");
    }

    // Prevent autoplay in builder (OP3-1792)
    var stopVideoAutoplay = function(element) {
        var $element = $(element);
        var $iframe = $element.find('iframe');
        if ($iframe.length > 0) {
            var src = $iframe.attr("src");
            src = src.replace(/(\&|\?)(autoplay)/, "$1noautplay");
            $iframe.attr("src", src);
        }

        var $video = $element.find('video');
        if ($video.length > 0)
            $video.get(0).pause();
    }
    // Get the video src & iframe code based on
    // provided url and element options
    // per video provider
    var getVideoCode = {
        youtube: function(element, url) {
            // Not a youtube url
            if (url && url.indexOf("youtube.com") < 0 && url.indexOf("youtu.be") < 0)
                return;

            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            var id = (match && match[7]) ? match[7] : false;
            var loop = element.getOption("videoLoop");
            var props = {
                enablejsapi: 1,
                start: element.getOption("videoStartTime"),
                loop: loop,
                controls: element.getOption("videoControls"),
                modestbranding: element.getOption("videoModestBranding"),
                related: element.getOption("videoRelated"),
                autoplay: element.getOption("videoAutoplay"),
                mute: element.getOption("videoMute"),
                playsinline: 1,
            };

            // playlist parameter is required because of loop
            // loop=0 is not working in combination with playlist
            if (props.loop == "1")
                props.playlist = id;

            // video background
            if (isVideoBackground(element)) {
                props.autoplay = "1";
                props.controls = "0";
                props.showinfo = "0";
                props.autohide = "1";
                props.modestbranding = "1";
                props.iv_load_policy = "3";
                props.cc_load_policy = "0";

                // loop is done via api, so disabled on iframe
                props.loop = "0";
            }

            var time = props.start.split(":");
            props.start = (+time[0] * 60 + (+time[1]));
            if (!id) return;
            return {
                src: "https://www.youtube.com/embed/" + id + "?" + $.param(props),
                code: '<iframe type="text/html" class="fitvidsignore" width="900" height="506" src="https://www.youtube.com/embed/' + id + '?' + $.param(props) + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            }
        },
        vimeo: function(element, url) {
            if (url && url.indexOf("vimeo.com") < 1)
                return;

            var regExp = /^(https?:\/\/)?((?:www|player)\.)?(vimeo\.com)(\/video)?(\/\d+)?(\/[a-fA-F0-9]+)?/;
            var match = url.match(regExp);
            var id = (match && match[5]) ? match[5].slice(1) : false;
            if (!id) return;
            var hash = (match && match[6]) ? match[6].slice(1) : false;

            var props = {
                autoplay: element.getOption("videoAutoplay"),
                background: element.getOption("videoBackground"),
                muted: element.getOption("videoMute"),
                portrait: element.getOption("videoPortrait"),
                byline: element.getOption("videoByline"),
                title: element.getOption("videoTitle"),
                speed: element.getOption("videoSpeed"),
                color: element.getOption("videoColor").replace("#", ""),
                loop: element.getOption("videoLoop"),
            };

            if (hash) {
                props.h = hash;
            }

            // video background
            if (isVideoBackground(element)) {
                props.autoplay = "1";
                props.muted = "1";
                props.loop = "1";
                props.controls = "0";
                props.title = "0";
                props.byline = "0";
                props.background = "1";
            }

            return {
                src: "https://player.vimeo.com/video/" + id + "?" + $.param(props),
                code: '<iframe src="https://player.vimeo.com/video/' + id + '?' + $.param(props) + '" class="fitvidsignore" width="900" height="506" frameborder="0" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
            }
        },
        wistia: function(element, url) {
            if (url && url.indexOf("wistia") < 0)
                return;

            var regExp = /https?:\/\/(.+)?(wistia\.(com|net)|wi\.st)\/(.*)(wvideo=|wvideoid=|iframe\/|medias\/)([\d\w]*)/;
            var match = url.match(regExp);
            var id = (match && match[6]) ? match[6] : false;
            var props = {
                playerColor: element.getOption("videoColor").replace("#", ""),
                autoplay: element.getOption("videoAutoplay"),
                endVideoBehavior: element.getOption("videoLoop") === "1" ? "loop" : "default",
                playbackRateControl: element.getOption("videoSpeed") === "1" ? "true" : "false",
                playbar: element.getOption("videoControls") === "1" ? "true" : "false",
                muted: element.getOption("videoMute") === "1" ? "true" : "false",
            };

            if (isVideoBackground(element)) {
                props.autoplay = "true";
                props.endVideoBehavior = "loop";
                props.playbar = "false";
                props.muted = "true";
            }

            if (!id) return;
            return {
                src: "https://fast.wistia.net/embed/iframe/" + id + "?" + $.param(props),
                code: '<iframe src="https://fast.wistia.net/embed/iframe/' + id + '?' + $.param(props) + '" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed fitvidsignore" name="wistia_embed" allowfullscreen width="900" height="506"></iframe>',
            }
        },
        selfhosted: function(element, url) {
            if (!url)
                return;

            var props = {
                controls: element.getOption("videoControls") === "1",
                autoplay: element.getOption("videoAutoplay") === "1",
                muted: element.getOption("videoMute") === "1",
                loop: element.getOption("videoLoop") === "1",
                controlsList: element.getOption("videoDownloadControls") === "0" ? "nodownload" : "",
            };

            if (isVideoBackground(element)) {
                props.controls = false;
                props.autoplay = true;
                props.muted = true;
                props.loop = true;
                props.controlsList = "nodownload";
            }

            var attrs = '';
            for (var entry in props) {
                if (props[entry]) attrs += ' ' + entry + '="' + props[entry] + '"';
            }

            return {
                src: url,
                code: '<video data-op3-video-selfhosted src="' + url + '" width="900" height="506" playsinline preload ' + attrs + '></video>',
            }
        },
    }

    // set icon visibility on by default
    OP3.bind("elementchange::*::visible", function(e, o) {
        if (o.id === "visible")
            OP3.$(o.node).setOption("videoIconVisible", o.value.after, o.media);
    });

    OP3.bind("elementchange::video::videoSticky", function(e, o) {
        if (o.value.after === "1") {
            var $element = $(o.node).find('.op3-video-wrapper');

            if ($element.attr('data-op3-video-sticky-desktop') === "")
                $element.attr('data-op3-video-sticky-desktop', "1");

            if ($element.attr('data-op3-video-sticky-tablet') === "")
                $element.attr('data-op3-video-sticky-tablet', "0");

            if ($element.attr('data-op3-video-sticky-mobile') === "")
                $element.attr('data-op3-video-sticky-mobile', "0");
        }

        OP3.$(o.node).setOption("videoStickyPreview", "0");
    });

    OP3.bind("elementchange::video::videoStickyPosition elementchange::video::left elementchange::video::top elementchange::video::right elementchange::video::bottom elementchange::video::height elementchange::video::maxWidth", function(e, o) {
        var element = OP3.$(o.node);
        if (element.getOption("videoStickyPreview") === "0" || o.id.indexOf("videoSticky") === -1)
            return;

        // Reposition image overlay
        var $node = $(o.node);
        var $wrapper = $node.find('.op3-video-wrapper');
        var $overlay = $node.find('.op3-video-image-overlay');
        $overlay
            .css({
                left: $wrapper.css("left"),
                right: $wrapper.css("right"),
                top: $wrapper.css("top"),
                bottom: $wrapper.css("bottom"),
                height: $wrapper.height(),
                "max-width": $wrapper.width(),
            });
    });

    OP3.bind("elementchange::video::videoStickyPreview", function(e, o) {
        var $node = $(o.node);
        if (o.value.after === "1") {
            $node.css("height", $node.height() + "px");
            $node.find('.op3-video-wrapper').attr("data-op3-video-sticky-preview", "1");
            setTimeout(function() {
                var $wrapper = $node.find('.op3-video-wrapper');
                var $overlay = $node.find('.op3-video-image-overlay');
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
            return;
        }

        $node.css("height", "auto");
        $node.find(".op3-video-wrapper").attr("data-op3-video-sticky-preview", "0");
        setTimeout(function() {
            var $overlay = $node.find(".op3-video-image-overlay");
            $overlay
                .css({
                    height: "",
                    "max-width": "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                })
                .removeAttr("data-op3-video-sticky-position")
                .find(".op3-icon")
                .css("font-size", "");
        })
    });

    OP3.bind("elementfocus::video", function(e, o) {
        var $node = $(o.node);
        if ($node.find(".op3-video-sticky-close").length > 0) return;
        $node
            .find(".op3-video-wrapper")
            .append('<button class="op3-video-sticky-close"></button>')
            .on("click", ".op3-video-sticky-close", function() {
                OP3.$(o.node).setOption("videoStickyPreview", "0");
            });
    });

    OP3.bind("elementunfocus::video", function(e, o) {
        OP3.$(o.node).setOption("videoStickyPreview", "0");
    });

    OP3.bind("devicechange", function(e, o) {
        var element = OP3.Designer.activeElement();
        if (!element || element.type() !== "video")
            return;

        element.setOption("videoStickyPreview", "0");
    });

    OP3.bind("elementchange::*::videoSource elementchange::*::videoUrlYoutube elementchange::*::videoUrlVimeo elementchange::*::videoUrlWistia elementchange::*::videoUrlSelfhosted elementchange::*::videoUrlUploaded elementchange::*::videoColor elementchange::*::videoTitle elementchange::*::videoByline elementchange::*::videoPortrait elementchange::*::videoAutoplay elementchange::*::videoMute elementchange::*::videoLoop elementchange::*::videoControls elementchange::*::videoModestBranding elementchange::*::videoStartTime elementchange::*::videoRelated elementchange::*::videoSpeed elementchange::*::aspectRatio elementchange::*::videoDownloadControls", function(e, o) {
        var element = OP3.$(o.node);
        var source = element.getOption("videoSource");
        if (!source) return;

        var url = element.getOption("videoUrl" + source.charAt(0).toUpperCase() + source.slice(1));

        // selfhosted & uploaded are identical as they're both working with HTML5 video element
        if (source === "uploaded") source = "selfhosted";

        if (!getVideoCode[source]) return;
        var result = getVideoCode[source](element, url);

        if (url && result && result.code) {
            if (result.code !== element.getOption('code'))
                element.setOption('code', result.code);

            if (result.src !== element.getOption('videoSrc'))
                element.setOption('videoSrc', result.src);

            // Hide image overlay on autoplay
            // hideImageOverlay(o.node)

            // Stop all autoplay in builder
            stopVideoAutoplay(o.node);

            return;
        }

        if (!url && isVideoBackground(element))
            element.setOption('code', '');
    });

    // Autoplay, Mute & Loop
    OP3.bind("elementchange::video::videoBackground", function(e, o) {
        if (o.value.after == 0)
            return;

        var element = OP3.$(o.node);
        element.setOption("videoAutoplay", o.value.after, "all");
        element.setOption("videoMute", o.value.after, "all");
        element.setOption("videoLoop", o.value.after, "all");
    });

    /**
     * On code property change set videoSrc property.
     * Wrong video is displayed after popoverlay is opened twice.
     * https://optimizepress.atlassian.net/browse/OP3-2426
     * 
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementchange::video::code", function(e, o) {
        var element = OP3.$(o.node);
        var match = o.value.after.match(/<iframe.*?src="(.*?)".*?>.*?<\/iframe>/);
        var src = match && match[1] ? match[1] : null;

        if (src)
            element.setOption("videoSrc", src);
    });

    OP3.bind("elementoptionsformattach::video", function(e, o) {
        var element = OP3.$(o.node);

        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-video-source", element.getOption("videoSource", true))
            .attr("data-op3-parent-options-property-value-video-sticky", element.getOption("videoSticky", true));
    });

    OP3.bind("elementoptionsformdetach::video", function(e, o) {
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-video-source")
            .removeAttr("data-op3-parent-options-property-value-video-sticky");
    });

    OP3.bind("elementchange::video::videoSource elementchange::video::videoSticky", function(e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-parent-options-property-value-" + o.name.replace(/[A-Z]/, function(match) { return "-" + match.toLowerCase(); }), o.value.after);
    });

    // Remove image overlay from videos with autoplay (OP3-1664)
    OP3.bind("ready load elementappend", function(e, o) {
        $('[data-op3-element-type="video"]').each(function() {
            stopVideoAutoplay(this);
            // hideImageOverlay(this);
        });
    });

    // Sync properties
    OP3.bind("elementchange::video::videoStickyPosition elementchange::video::videoStickyPreview elementchange::video::videoSticky", function(e, o) {
        OP3.transmit("elementoptionssyncrequest", { property: [ "videoStickyTop", "videoStickyLeft", "videoStickyRight", "videoStickyBottom", "videoStickyMaxWidth", ] });
    });

})(jQuery, window, document);
