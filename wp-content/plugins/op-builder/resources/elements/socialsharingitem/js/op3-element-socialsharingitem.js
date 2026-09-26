;(function($, window, document) {

    "use strict";

    /**
     * social share counts api response (used for cache)
     *
     * @type {Object}
     */
    var _data = null;

    /**
     * socialsharingitem element click event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _socialSharingItemClick = function(e) {
        e.preventDefault();

        var $target = $(e.currentTarget);

        // Update social sharing number by 1
        var $count = $target.find(".op3-count");
        var socialShareNumber = Number($count.text());
        $count.text(socialShareNumber + 1);

        // Update total sharing number
        var $socialSharing = $target
            .closest('[data-op3-element-type="socialsharing"]');
        var $total = $socialSharing
            .find('.op3-total-count, .op3-total-text');
        var totalSocialShareNumber = Number($total.filter(".op3-total-count").text());
        $total.text(totalSocialShareNumber + 1);

        var $totalText = $total.filter(".op3-total-text");
        if ((totalSocialShareNumber + 1) === 1)
            $totalText.text("Share");
        else
            $totalText.text("Shares");

        var href = $target.attr("href");
        var pageUrl = $socialSharing.find(" > [data-op3-element-container]").attr("data-op3-url");
        if (!pageUrl)
            pageUrl = OP3.Meta.pageUrl;

        if (href.indexOf("facebook") !== -1) {
            href = addQueryStringParameter(href, "u", pageUrl);
        } else if (href.indexOf("twitter") !== -1) {
            href = addQueryStringParameter(href, "url", pageUrl);
            href = addQueryStringParameter(href, "text", OP3.Meta.pageTitle);
        } else if (href.indexOf("pinterest") !== -1) {
            href = addQueryStringParameter(href, "url", pageUrl);
            href = addQueryStringParameter(href, "media", OP3.Meta.pageFeaturedImage);
            href = addQueryStringParameter(href, "description", OP3.Meta.pageDescription);
        } else if (href.indexOf("linkedin") !== -1) {
            href = addQueryStringParameter(href, "url", pageUrl);
        }

        if (href)
            window.open(href, "Social Sharing Popup", "height=236, width=516");

        return false;
    }
    /**
     * Add or update query string parameter
     *
     * @param {String} url
     * @param {String} key
     * @param {String} value
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

    /**
     * Get social share counts
     *
     * @param {String} url
     * @param {Function} callback
     * @param {Void}
     */
    var getSocialShareCounts = function(url, callback) {
        // Return already fatched data
        if (_data)
            return _data;

        // Get data from api
        $.ajax({
            url: OP3.Meta.homeUrl + '/wp-json/op3/v1/social-link-count',
            data: {
                url,
            },
            success: function(data, textStatus, jqXHR) {
                if (typeof callback === "function")
                    return callback(data.data);

                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var message = jqXHR.responseJSON.message;
                throw "Optimizepress: " + message;
            },
        });
    };


    $(document).ready(function() {
        var $socialSharings = $('.op3-element[data-op3-element-type="socialsharing"]');
        var url = OP3 && OP3.Meta && OP3.Meta.pageUrl ? OP3.Meta.pageUrl : "";

        $socialSharings.each(function() {
            var $socialSharing = $(this);

            $socialSharing
                .find('[data-op3-element-type="socialsharingitem"] a')
                .on("click", _socialSharingItemClick);

            var $elementContainer = $socialSharing
                .find(' > [data-op3-element-container]');
            var socialShareCount = $elementContainer
                .attr("data-op3-social-share-count");
            var socialShareTotalCount = $elementContainer
                .attr("data-op3-social-share-total-count");

            if (socialShareCount*1 || socialShareTotalCount*1) {
                getSocialShareCounts(url, function(data) {
                    data.fb = data.facebook;
                    for (var socialNetwork in data) {
                        var value = Number(data[socialNetwork]);

                        if (isNaN(value)) {
                            console.error(data[socialNetwork]);
                            continue;
                        }

                        var selector = '[data-op3-element-type="socialsharingitem"] a[data-op3-icon*=' + socialNetwork + '] .op3-count';
                        $socialSharing
                            .find(selector)
                            .text(value);
                    }

                    var $totalText = $socialSharing
                        .find(".op3-total .op3-total-text");
                    if (data.total === 1)
                        $totalText.text("Share");
                    else
                        $totalText.text("Shares");

                    var $totalText = $socialSharing
                        .find(".op3-total .op3-total-count")
                        .text(data.total);

                });
            }

        });

    });

})(jQuery, window, document);
