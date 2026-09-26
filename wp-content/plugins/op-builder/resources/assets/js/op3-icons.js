/**
 * OptimizePress3 designer:
 * page builder.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ajax.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Icons object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Icon data from API
         *
         * @type {Array}
         */
        _data: [],

        /**
         * Icon config
         *
         * @type {Object}
         */
        _config: {},

        /**
         * Refresh config
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = [];

            OP3.Ajax.request({
                url: "icons",
                success: that._handleAjax,
            });
        },

        /**
         * List icon data suitable for
         * property rendering
         *
         * @return {String} filter
         * @return {Array}
         */
        data: function(filter) {
            filter = filter || "";

            if (("_cache" in this) && (filter in this._cache))
                return that._cache[filter];

            that._cache = that._cache || {};
            that._cache[filter] = that._data
                .filter(function(item) {
                    if (!filter)
                        return true;

                    return item && item.tags && item.tags.indexOf(filter) !== -1;
                })
                .map(function(item) {
                    return {
                        id: item.uid,
                        text: item.title,
                        format: '<span><i class="op3-icon ' + item.uid + '"></i> ' + item.title + '</span>',
                        tags: item.tags.concat(that._config[item.uid]),
                    };
                });

            return that.data(filter);
        },

        /**
         * Ajax request success event handler
         *
         * @param  {Object} data
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleAjax: function(data, textStatus, jqXHR) {
            that._data = data.data;

            OP3.transmit("loadelementicons");
        },

        /**
         * Filter each option by element path
         *
         * @param  {Node}    form
         * @param  {Node}    select
         * @param  {Node}    option
         * @return {Boolean}
         */
        filterByElementPath: function(form, select, option) {
            var path = $(form).attr("data-op3-element-options-path");
            var id = $(select).attr("data-op3-element-options-property-id");

            if (/\/socialicons\/icon$/.test(path))
                return option.tags.indexOf("op3-social") !== -1;
            else if (/\/treemenu$/.test(path) && id === "hamburgerIcon")
                return option.tags.indexOf("op3-hamburger") !== -1;
            else if (/\/treemenu$/.test(path) && id === "hamburgerIconClose")
                return option.tags.indexOf("op3-close") !== -1;
            else if (/\/videothumbnail$/.test(path) && id === "op3Icon")
                return option.tags.indexOf("op3-play") !== -1;
            else if (/\/video$/.test(path) && id === "op3Icon")
                return option.tags.indexOf("op3-video-play") !== -1;
            else if (/\/orderbump\/checkbox$/.test(path) && id === "op3Icon")
                return option.tags.indexOf("op3-orderbump") !== -1;
            else if (/\/socialsharing\/socialsharingitem$/.test(path) && id === "op3Icon")
                return option.tags.indexOf("op3-social-sharing") !== -1;
            else if (/\/date$/.test(path) && id === "op3Icon")
                return option.tags.indexOf("op3-date") !== -1;
            else if (/\/date$/.test(path) && id === "op3Icon2")
                return option.tags.indexOf("op3-time") !== -1;
            //else if
            //    @todo

            return true;
        },

    }

    // globalize (designer)
    window.OP3.Icons = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Icons = that;
    });

    // import icons from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.icons });
    });

})(jQuery, window, document);
