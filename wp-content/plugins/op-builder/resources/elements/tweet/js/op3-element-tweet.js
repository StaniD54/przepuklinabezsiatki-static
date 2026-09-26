;(function($, window, document) {

    "use strict";

    /**
     * tweet element click event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _tweetClick = function(e) {
        e.preventDefault();

        var $target = $(e.currentTarget);
        var href = $target.attr("href");
        var url = $target.attr("data-op3-twitter-url") || OP3.Meta.pageUrl;
        var via = $target.attr("data-op3-twitter-via");
        var text = $target.find(".tweet").text();


        href = addQueryStringParameter(href, "url", url);
        href = addQueryStringParameter(href, "text", text);

        if (via)
            href = addQueryStringParameter(href, "via", via, true);

        if (href)
            window.open(href, "Tweet", "height=236, width=516");

        return false;
    }
    /**
     * Add or update query string parameter
     *
     * @param {String} url
     * @param {String} key
     * @param {String} value
     * @param {Boolean} escape
     * @returns {String}
     */
    var addQueryStringParameter = function (url, key, value) {
        if (!url)
            return "";

        if (!key || !value)
            return url;

        key = encodeURIComponent(key);
        value = encodeURIComponent(value);

        var regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = url.indexOf('?') !== -1 ? "&" : "?";

        if (url.match(regex))
            return url.replace(regex, '$1' + key + "=" + value + '$2');
        else
            return url + separator + key + "=" + value;
    }

    $(document).ready(function() {
        var $elements = $('.op3-element[data-op3-element-type="tweet"]');

        $elements.each(function() {
            var $element = $(this);

            $element
                .find('a')
                .on("click", _tweetClick);
        });

    });

})(jQuery, window, document);
