;(function() {
    /**
     * Calculate deadline date based on certain criteria.
     *
     * @param {*} options
     */
    var Deadline = function(options) {
        if (!(this instanceof Deadline))
            throw "Deadline: Deadline is a constructor.";

        var o = {};

        for (var key in this._defaults) {
            var value = this._defaults[key];

            if (options && (key in options))
                value = options[key];

            o[key] = value;
        }

        this._options = o;
    };

    /**
     * Deadline prototype
     *
     * @type {Object}
     */
    Deadline.prototype = {
        /**
         * Default options
         */
        _defaults: {
            /**
             * Type of date:
             *
             * 1. specific - calculate spefcific date and time deadline
             * 2. dynamic - calculate dynamic date/time depending on intervalType
             *
             * @type {String}
             */
            type: "dynamic",

            /**
             * Only important if date type is dynamic
             *
             * Types of interval:
             * 1. time
             * 2. date
             * 3. day
             *
             * @type {String}
             */
            intervalType: "time",

            /**
             * Only important if interval type is set
             *
             * If intervalType is:
             * 1. time - this option represent number of minutes.
             *    Example: if user opened page at 8:01 and interval is 20 display 8:20
             * 2. date - this options represent number of days.
             *    Example: if user opened page at 03.10.2020 and interval is 1 display 04.10.2020
             * 3. day - this options represent number of hour.
             *    Example if user opened page at 03.10.2020 17:00 and interval is 16:00 display 04.10.2020 16:00
             *
             * @type {Number}
             */
            interval: 5,

            /**
             * @type {String}
             */
            date: "2021-02-05T11:36",
        },

        /**
         * Get deadline date
         *
         * @params {String} date
         * @returns {Date}
         */
        getDate: function() {
            if (this._options.type === "dynamic")
                return this.calculateDynamicDate();
            else if (this._options.type === "specific") {
                return new Date(this._options.date);
            }
        },

        calculateDynamicDate: function() {
            var date = new Date();

            if (this._options.intervalType === "date") {
                date.setDate(date.getDate() + Number(this._options.interval));
            } else if (this._options.intervalType === "day") {
                date.setHours(this._options.interval);
                date.setMinutes(0);
                date.setSeconds(0);

                if (new Date() > date)
                    date.setDate(date.getDate() + 1);
            } else if (this._options.intervalType === "time") {
                var minutes = date.getMinutes();
                var minutesToDeadline = Number(this._options.interval) - (minutes % this._options.interval);
                date.setMinutes(minutes + minutesToDeadline);
            }

            return date;
        },

        /**
         * Returns date formatted according to given format.
         *
         * @param {String} lang
         * @param {String} dateFormat
         * @param {String} timeFormat
         * @returns {Object}
         */
        format: function(lang, dateFormat, timeFormat) {
            if (!lang || !dateFormat || !timeFormat)
                return;

            var that = this;
            var deadline = this.getDate();
            var translated = {};

            // Format and translate date
            var dateString = "";
            dateFormat = dateFormat.split(",");
            dateFormat.forEach(function(value, index, array) {
                var splitted = value.split(":");
                var options = {};
                options[splitted[0]] = splitted[1];

                var localized = null;
                try {
                    localized = deadline.toLocaleDateString(lang, options);
                } catch(e) {
                    localized = that.ordinalNumber(deadline.toLocaleDateString(lang, { day: "numeric" }));
                }
                translated[splitted[0]] = localized;
                localized = localized.replace(".", "");

                if (index === (array.length - 2))
                    dateString += localized + ", ";
                else
                    dateString +=  localized + " ";
            });

            // Format and translate time
            timeFormat = timeFormat.split(",");
            var options = {};
            timeFormat.forEach(function(value) {
                var splitted = value.split(":");
                var key = splitted[0];
                var value = splitted[1];

                if (key === "hour12")
                    value = value === "true";

                options[key] = value;
            });

            var localized = null;
            try {
                localized = deadline.toLocaleTimeString(lang, options);
            } catch(e) {
                console.error("Deadline: " + e);
            }

            if (options.postmeridiem === "dotted") {
                var length = localized.length;
                localized = localized.substring(0, length - 2) + localized[length - 2] + "." + localized[length - 1] + ".";
                localized = localized.toLowerCase();
            }

            translated.time = localized;

            return Object.assign({
                date: dateString.trim(),
            }, translated);
        },

        /**
         * Get ordinal number
         *
         * @param {Number} number
         * @return {Number}
         */
        ordinalNumber: function(number) {
            var selector;

            if (number <= 0) {
              selector = 4;
            } else if ((number > 3 && number < 21) || number % 10 > 3) {
              selector = 0;
            } else {
              selector = number % 10;
            }

            return number + ['th', 'st', 'nd', 'rd', ''][selector];
        }

    }

    // re-assign constructor
    Deadline.prototype.constructor = Deadline;

    // globalize
    window.Deadline = Deadline;

})();
