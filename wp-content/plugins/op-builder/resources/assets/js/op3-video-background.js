document.addEventListener("DOMContentLoaded", function(e) {
    /**
     * Global OP3 object.
     *
     * @type {Object}
     */
    window.OP3 = window.OP3 || {};

    /**
     * OP3 VideoBackground object.
     *
     * @type {Object}
     */
    window.OP3.VideoBackground = {
        /**
         * Is youtube api initialized flag.
         *
         * @type {Boolean}
         */
        _isInitYoutubeApi: false,

        /**
         * Is youtube api loaded flag.
         *
         * @type {Boolean}
         */
        _isLoadYoutubeApi: false,

        /**
         * Init video background on context.
         *
         * @param  {Mixed} context (optional)
         * @return {Void}
         */
        initContext: function(context) {
            (context || document).querySelectorAll('[data-op3-background="video"]').forEach(function(element) {
                OP3.VideoBackground.initElement(element);
            });
        },

        /**
         * Init video background on element.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        initElement: function(element) {
            var source = element.getAttribute("data-op3-video-source");
            if (!source)
                return;

            var url = element.getAttribute("data-op3-src") || element.getAttribute("data-op3-video-url-" + source);
            if (!url)
                return;

            // Youtube api.
            if (source === "youtube") {
                OP3.VideoBackground._initYoutubeApi();
                OP3.VideoBackground._initVideoBackgroundPlayerYoutube(element);
            }

            // Element object fit cover.
            var code = element.querySelector("[data-op3-code]"),
                options = {};
            if (source === "youtube")
                options.adjustHeight = 130;
            elementObjectFit(code, "cover", options);

            // On mobile, video is suspended when Low Power Mode is
            // enabled, so this is a workaround to start playback
            // when user touches the screen.
            var video = element.querySelector("video[data-op3-video-selfhosted]");
            if (video && video.autoplay && video.paused) {
                var _handler = function(e) {
                    document.removeEventListener("touchstart", _handler);

                    video.play();
                };

                document.addEventListener("touchstart", _handler);
            }
        },

        /**
         * Initialize youtube api script.
         *
         * @return {Void}
         */
        _initYoutubeApi: function() {
            if (OP3.VideoBackground._isInitYoutubeApi)
                return;

            var script = document.createElement("script");
            script.id = "op3-youtube-api";
            script.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(script);

            OP3.VideoBackground._isInitYoutubeApi = true;
        },

        /**
         * Init youtube player on element.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        _initVideoBackgroundPlayerYoutube: function(element) {
            if (!OP3.VideoBackground._isLoadYoutubeApi)
                return;

            new YT.Player(element.querySelector("iframe"), {
                playerVars: {
                    modestbranding: 0,
                    controls: 0,
                    showinfo: 0,
                    wmode: "transparent",
                    branding: 0,
                    rel: 0,
                    autohide: 1,
                },
                events: {
                    onReady: OP3.VideoBackground._onVideoBackgroundPlayerYoutubeReady,
                    onStateChange: OP3.VideoBackground._onVideoBackgroundPlayerYoutubeStateChange,
                },
            });
        },

        /**
         * Video youtube onReady event handler:
         * autoplay video (iframe doesn't support mute attribute
         * and without it it doesn't work on mobile).
         *
         * @param  {Event} e
         * @return {Void}
         */
        _onVideoBackgroundPlayerYoutubeReady: function(e) {
            e.target.mute();
            e.target.playVideo();
        },

        /**
         * Video youtube onStateChange event handler:
         * autoplay video (iframe doesn't support mute attribute
         * and without it it doesn't work on mobile).
         *
         * @param  {Event} e
         * @return {Void}
         */
        _onVideoBackgroundPlayerYoutubeStateChange: function(e) {
            if (e.data !== 1)
                return;

            var video = e.target,
                remains = video.getDuration() - video.getCurrentTime();
            if (video._rewindTo)
                clearTimeout(video._rewindTo);

            video._rewindTo = setTimeout(function() {
                video.seekTo(0);
            }, (remains - 0.5) * 1000);
        },
    };

    /**
     * Autoinit youtube players.
     *
     * @return {Void}
     */
    window.onYouTubeIframeAPIReady = function() {
        OP3.VideoBackground._isLoadYoutubeApi = true;

        var selector = ''
            + '[data-op3-background="video"][data-op3-video-source="youtube"][data-op3-src]:not([data-op3-src=""])'
            + ',[data-op3-background="video"][data-op3-video-source="youtube"][data-op3-video-url-youtube]:not([data-op3-video-url-youtube=""])';
        document.querySelectorAll(selector).forEach(function(element) {
            OP3.VideoBackground._initVideoBackgroundPlayerYoutube(element);
        });
    };

    // Autoinit.
    OP3.VideoBackground.initContext();
});
