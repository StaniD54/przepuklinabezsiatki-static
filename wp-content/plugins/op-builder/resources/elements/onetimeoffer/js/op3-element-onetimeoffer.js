;(function($, window, document) {

    "use strict";

    /**
     * Downsell link click event handler
     *
     * @param {Object} e
     */
    var _handleDownsellLinkClick = function(e) {
        e.preventDefault();

        try {
            var $target = $(e.currentTarget),
                queryString = window.location.search,
                urlParams = new URLSearchParams(queryString),
                hash = urlParams.get('hash');

            // if popoverlay, bail
            if ($target.data("op-action") === "popoverlay")
                return true;

            if (hash) {
                var urlString = $target.attr("href");
                var url = new URL(urlString);
                url.searchParams.append('hash', hash);
                url.searchParams.append('dnt-conversion', '1');
                window.location.href = url.href;
            }
        } catch(e) {
            return true;
        }
    }

    $('.op3-element[data-op3-element-type="onetimeoffer"] .op3-element[data-op3-element-spec="downsell"] a')
        .on("click", _handleDownsellLinkClick);


})(jQuery, window, document);
