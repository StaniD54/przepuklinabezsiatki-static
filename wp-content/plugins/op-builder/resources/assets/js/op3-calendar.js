/**
 * OptimizePress3 calendar link generator
 */
;(function(window, document) {

    "use strict";

   /**
     * OP3_Cookie constructor
     *
     * @return {OP3_Cookie}
     */
    var OP3_Calendar = function() {
        if (!(this instanceof OP3_Calendar))
            throw "OP3_Calendar: OP3_Calendar is a constructor.";
    };

    /**
     * OP3_Cookie prototype
     *
     * @type {Object}
     */
    OP3_Calendar.prototype = {

        /**
         * Miliseconds to minutes
         *
         * @type {Number}
         */
        MS_IN_MINUTES: 60 * 1000,

        /**
         * Format date
         *
         * @param {Date} date
         * @return {String}
         */
        _formatTime: function(date) {
          return date.toISOString().replace(/-|:|\.\d+/g, '');
        },

        /**
         * Calculate event end date
         *
         * @param {Object} event
         * @return {String}
         */
        _calculateEndTime: function(event) {
          return event.end ? this._formatTime(event.end) : this._formatTime(new Date(event.start.getTime() + (event.duration * this.MS_IN_MINUTES)));
        },

        /**
         * Generate google calendar link
         *
         * @param {Object} event
         * @return {String}
         */
        google: function(event) {
            var startTime = this._formatTime(event.start);
            var endTime = this._calculateEndTime(event);

            var href = encodeURI([
              'https://www.google.com/calendar/render',
              '?action=TEMPLATE',
              '&text=' + (event.title || ''),
              '&dates=' + (startTime || ''),
              '/' + (endTime || ''),
              '&details=' + (event.description || ''),
              '&location=' + (event.address || ''),
              '&ctz=' + (event.timezone || ''),
              '&sprop=&sprop=name:'
            ].join(''));

            return href;
        },

        /**
         * Generate ical
         *
         * @param {Object} event
         * @return {String}
         */
        ics: function(event) {
            var startTime = this._formatTime(event.start);
            var endTime = this._calculateEndTime(event);

            var href = encodeURI(
                'data:text/calendar;charset=utf8,' + [
                'PRODID:-//Optimizepress.com v3.0//EN',
                'BEGIN:VCALENDAR',
                    'VERSION:2.0',
                    'BEGIN:VEVENT',
                        'URL:' + document.URL,
                        'DTSTART:' + (startTime || ''),
                        'DTEND:' + (endTime || ''),
                        'SUMMARY:' + (event.title || ''),
                        'DESCRIPTION:' + (event.description || ''),
                        'LOCATION:' + (event.address || ''),
                    'END:VEVENT',
                'END:VCALENDAR'].join('\n'));

            return href;
        },

        /**
         * Generate outlook calendar link
         *
         * @param {Object} event
         * @return {String}
         */
        outlook: function(event) {
            return this.ics(event);
        },

        /**
         * Generate ical calendar link
         *
         * @param {Object} event
         * @return {String}
         */
        ical: function(event) {
            return this.ics(event);
        },

    };

    // re-assign constructor
    OP3_Calendar.prototype.constructor = OP3_Calendar;

    // globalize
    window.OP3 = window.OP3 || {};
    window.OP3.Calendar = new OP3_Calendar();

})(window, document);
