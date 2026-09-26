;(function() {
    EmbedVideoFacade.registerSource("youtube", {
        test: function() {
            return /https?\:\/\/www\.youtube\.com\/embed\/[\w-]+/.test(this.parent.url);
        },
        url: function() {
            var result = this.parent.url;
            result = this._replaceUrlParam(result, "autoplay", "1");
            // @todo - autoplay not working on devices (even with mute=1)

            return result;
        },
        videoId: function() {
            return this.parent.url.match(/https?\:\/\/www\.youtube\.com\/embed\/([\w-]+)/)[1];
        },
        getPoster: function(callback) {
            var src = (this.canUseWebp
                ? "https://i.ytimg.com/vi_webp/{videoId}/hqdefault.webp"
                : "https://i.ytimg.com/vi/{videoId}/hqdefault.jpg")
                    .replace(/{videoId}/g, this.videoId());

            this._call(callback, src);
        },
        posterStyle: function() {
            return "background: center / cover no-repeat none #000";
        },
        preconnect: function() {
            this._preconnect("https://www.youtube.com");
            this._preconnect("https://www.youtube-nocookie.com");
            this._preconnect("https://www.google.com");
            this._preconnect("https://googleads.g.doubleclick.net");
            this._preconnect("https://www.gstatic.com");
            this._preconnect("https://static.doubleclick.net");
            this._preconnect("https://i.ytimg.com");
            this._preconnect("https://yt3.ggpht.com");
        },
    });
})();
