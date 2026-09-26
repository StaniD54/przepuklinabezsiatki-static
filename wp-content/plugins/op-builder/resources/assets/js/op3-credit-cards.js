/**
 * OptimizePress3 designer:
 * page builder.
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.CreditCards object
     *
     * @type {Object}
     */
    var that = {

        /**
         * CreditCard data from API
         *
         * @type {Array}
         */
        _data: [],

        /**
         * List credit cards data suitable for
         * property rendering
         *
         * @return {Array}
         */
        data: function() {
            return that._data;
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
            that._data = [];
            for (var card in data.data) {
                for (var style in data.data[card].style) {
                    that._data.push({
                        id: data.data[card].style[style],
                        text: data.data[card].title + " " + style.charAt(0).toUpperCase() + style.slice(1),
                        format: data.data[card].style[style],
                        type: data.data[card].id,
                        style: style,
                    });
                }
            }

            OP3.transmit("loadelementcreditcards");
        },

    }

    // globalize (designer)
    window.OP3.CreditCards = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.CreditCards = that;
    });

    // import credit card svgs from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.credit_cards });
    });

})(jQuery, window, document);
