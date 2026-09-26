;(function() {
    EmbedVideoFacade.registerSource("wistia", {
        test: function() {
            return true
                && typeof fetch === "function"
                && /^https?:\/\/[^.]+\.(wistia\.com|wistia\.net|wi\.st)\/(medias|embed)\/.*/.test(this.parent.url);
        },
        url: function() {
            var result = this.parent.url;
            result = this._replaceUrlParam(result, "autoplay", "1");
            return result;
        },
        videoId: function() {
            return this.parent.url.match(/^https?:\/\/[^.]+\.(wistia\.com|wistia\.net|wi\.st)\/(medias|embed)(\/.*?\/|\/)?(.*?)(\?|$)/)[4];
        },
        getPoster: function(callback) {
            return fetch("https://fast.wistia.net/oembed?url=" + encodeURIComponent(this.parent.url))
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    this._call(callback, data.thumbnail_url);
                }.bind(this));
        },
        preconnect: function() {
            this._preconnect("https://fast.wistia.net");
            this._preconnect("https://distillery.wistia.com");
            this._preconnect("https://pipedream.wistia.com");
            this._preconnect("https://embedwistia-a.akamaihd.net");
        },
    });
})();
