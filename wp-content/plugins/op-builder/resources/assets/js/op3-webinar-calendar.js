/**
 * OptimizePress3 live editor extension:
 *
 * Get svgs from config file (webinar_calendars.php)
 * and prepare for further use (codeHtmlWebinarCalendarType op3property.js)
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.WebinarCalendar object
     *
     * @type {Object}
     */
    var that = {

        /**
         * WebinarCalendar data from API
         *
         * @type {Array}
         */
        _data: [],

        /**
         * List webinar calendar data suitable for
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
            that._data = data.data
                .map(function(item) {
                    return {
                        id: item.style,
                        text: item.title,
                        format: item.style,
                    };
                });

            OP3.transmit("loadelementwebinarcalendar");
        },

    }

    // globalize (designer)
    window.OP3.WebinarCalendar = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.WebinarCalendar = that;
    });

    // import webinar calendars svgs from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.webinar_calendars });
    });

})(jQuery, window, document);
