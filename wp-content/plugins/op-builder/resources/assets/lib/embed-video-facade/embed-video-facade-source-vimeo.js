;(function() {
    EmbedVideoFacade.registerSource("vimeo", {
        test: function() {
            return /https?\:\/\/player\.vimeo\.com\/video\/[\d]+/.test(this.parent.url);
        },
        url: function() {
            var result = this.parent.url;
            result = this._replaceUrlParam(result, "autoplay", "1");

            // Autoplay not working on devices unless video
            // is muted...
            if (this.isDevice)
                result = this._replaceUrlParam(result, "muted", "1");

            return result;
        },
        videoId: function() {
            return this.parent.url.match(/https?\:\/\/player\.vimeo\.com\/video\/([\d]+)/)[1];
        },
        getPoster: function(callback) {
            var src = (this.canUseWebp
                ? "https://lite-vimeo-embed.vercel.app/thumb/{videoId}.webp?mw={width}&mh={height}&q=85"
                : "https://lite-vimeo-embed.vercel.app/thumb/{videoId}.jpg?mw={width}&mh={height}&q=85")
                    .replace(/{videoId}/g, this.videoId())
                    .replace(/{width}/g, this.width())
                    .replace(/{height}/g, this.height())

            this._call(callback, src);
        },
        preconnect: function() {
            this._preconnect("https://player.vimeo.com");
            this._preconnect("https://i.vimeocdn.com");
            this._preconnect("https://f.vimeocdn.com");
            this._preconnect("https://fresnel.vimeocdn.com");
        },
    });
})();
