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
         * Refresh config
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = [];

            OP3.Ajax.request({
                url: "text-animations",
                success: that._handleAjax,
            });
        },

        /**
         * List text animation data suitable for
         * property rendering
         *
         * @return {String} style
         * @return {Array}
         */
        data: function(style) {
            return !(style in that._data) ? null : that._data[style]
                .map(function(item) {
                    return {
                        id: item.style,
                        text: item.label,
                        markup: item.markup || null,
                        library: item.library || null,
                    };
                });
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

            OP3.transmit("loadelementtextanimations");
        },

    }

    // globalize (designer)
    window.OP3.TextAnimations = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.TextAnimations = that;
    });

    // import icons from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.text_animations });
    });

})(jQuery, window, document);
