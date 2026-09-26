;(function(root, factory) {
    // AMD.
    if (typeof define === "function" && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === "object")
        module.exports = factory();

    // Browser globals.
    else
        root.Countdown = factory();
} (this, function() {
    // Strict mode.
    "use strict";

    /**
     * Countdown.
     *
     * @param  {HTMLElement} element HTML node
     * @param  {Object}      options (optional) see Countdown.prototype._defaults
     * @return {Countdown}
     */
    var Countdown = function(element, options) {
        if (!(this instanceof Countdown))
            throw "Countdown: Countdown is a constructor.";
        if (!(element instanceof HTMLElement))
            throw 'Countdown: element argument must be of HTMLElement type.';

        this._init.apply(this, arguments);
    };

    /**
     * Countdown prototype.
     *
     * @type {Object}
     */
    Countdown.prototype = {
        /**
         * Default options.
         *
         * @type {Object}
         */
        _defaults: {
            /**
             * Final date:
             * target date that you are seeking to countdown.
             *
             * @type {Date|Number|String}
             */
            finalDate: "",

            /**
             * Elapse mode:
             * continue counting even after countdown reaches
             * its finish.
             *
             * Warning:
             * no finish event will be triggered at this mode.
             *
             * @type {Boolean}
             */
            elapseMode: false,

            /**
             * Auto start:
             * start countdown on initialization.
             *
             * @type {Boolean}
             */
            autoStart: true,

            /**
             * Precision:
             * update rate in milliseconds.
             *
             * @type {Number}
             */
            precision: 100,
        },

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: Countdown,

        /**
         * Constructor.
         *
         * @param  {HTMLElement} element HTML node
         * @param  {Object}      options (optional) see Countdown.prototype._defaults
         * @return {Void}
         */
        _init: function(element, options) {
            // Already instanced.
            if (element._countdown)
                return;
            element._countdown = this;

            // Element property.
            this._element = element;

            // Extend options with defaults.
            this._options = {};
            for (var key in this._defaults) {
                var type = typeof this._defaults[key],
                    value = options && (key in options) ? options[key] : this._defaults[key];
                if (type === "number")
                    value = value*1;
                else if (type === "boolean")
                    value = !!value;

                // Parse and validate option finalDate.
                if (key === "finalDate") {
                    value = this._parseDate(value);
                    if (!value)
                        throw "Countdown: invalid final date."
                }

                this._options[key] = value;
            };

            // Instance properties.
            this._interval = null;
            this._totalSecsLeft = null;
            this._offset = null;
            this._tick = null;

            // Start counting.
            if (this._options.autoStart)
                this.start();
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            this.stop();

            // Clear.
            delete this.element._countdown;
            delete this._tick;
            delete this._offset;
            delete this._totalSecsLeft;
            delete this._interval;
            delete this._options;
            delete this._element;
        },

        /**
         * Window property getter.
         *
         * @return {Window}
         */
        get window() {
            return this.document.defaultView;
        },

        /**
         * Document property getter.
         *
         * @return {Document}
         */
        get document() {
            return this.element.ownerDocument;
        },

        /**
         * Element property getter.
         *
         * @return {HTMLElement}
         */
        get element() {
            return this._element;
        },

        /**
         * Start countdown.
         *
         * @return {Void}
         */
        start: function() {
            if (this._interval)
                return;

            // Do update.
            this._update();

            // Destructor called on update event?
            if (!this.element)
                return;

            // Update on interval.
            this._interval = this.window.setInterval(this._update.bind(this), this._options.precision);
        },

        /**
         * Stop countdown.
         *
         * @return {Void}
         */
        stop: function() {
            if (!this._interval)
                return;

            // Clear interval and trigger stop event.
            this.window.clearInterval(this._interval);
            this._trigger("stop");

            // Destructor called on stop event?
            if (!this.element)
                return;

            // Clear.
            this._interval = null;
            this._totalSecsLeft = null;
            this._offset = null;
            this._tick = null;
        },

        /**
         * Parse date:
         * convert value to Date object.
         *
         * @param  {Mixed} value
         * @return {Date}
         */
        _parseDate: function(value) {
            if (typeof value === "undefined" || typeof value === "boolean" || value === null || value === "")
                value = 0;

            var result;
            if (typeof value === "number")
                result = new Date(value);
            else if (typeof value === "string") {
                result = new Date(value);

                // Browser can not parse date string, let's try to
                // do it ourselves...
                if (isNaN(result.getTime())) {
                    // Miliseconds.
                    if (/^[0-9]*$/.test(value))
                        result = new Date(value*1);

                    // Dashes to slashes.
                    else
                        result = new Date(value.replace(/\-/g, '/'));
                }
            }

            if (result instanceof Date && !isNaN(result.getTime()))
                return result;

            return null;
        },

        /**
         * Simple formatter.
         *
         * See:
         * http://hilios.github.io/jQuery.countdown/documentation.html#formatter-smalleventstrftimesmall-a-idformattera
         *
         * @todo - simplify this:
         * no need for pluralize (!) and custom null padding (-)???
         *
         * @return {Function}
         */
        _strftime: function() {
            var offset = Object.assign({}, this._offset),
                formatMap = {
                    Y: "years",
                    m: "months",
                    n: "daysToMonth",
                    d: "daysToWeek",
                    w: "weeks",
                    W: "weeksToMonth",
                    H: "hours",
                    M: "minutes",
                    S: "seconds",
                    D: "totalDays",
                    I: "totalHours",
                    N: "totalMinutes",
                    T: "totalSeconds",
                },
                escapedRegExp = function(str) {
                    return new RegExp(str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"));
                },
                pluralize = function(format, count) {
                    var plural = "s",
                        singular = "";
                    if (format) {
                        format = format.replace(/(:|;|\s)/gi, "").split(/\,/);
                        if (format.length !== 1) {
                            singular = format[0];
                            plural = format[1];
                        }
                        else
                            plural = format[0];
                    }

                    return Math.abs(count) > 1 ? plural : singular;
                };

            return function(format) {
                var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
                if (directives) {
                    for (var i = 0, len = directives.length; i < len; ++i) {
                        var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                            regexp = escapedRegExp(directive[0]),
                            modifier = directive[1] || "",
                            plural = directive[3] || "",
                            value = null;

                        directive = directive[2];
                        if (formatMap.hasOwnProperty(directive)) {
                            value = formatMap[directive];
                            value = Number(offset[value]);
                        }
                        if (value !== null) {
                            if (modifier === "!")
                                value = pluralize(plural, value);
                            if (modifier === "" && value < 10)
                                value = "0" + value.toString();

                            format = format.replace(regexp, value.toString());
                        }
                    }
                }

                return format.replace(/%%/, "%");
            };
        },

        /**
         * Countdown update (interval tick):
         * calculate offset.
         *
         * @return {Void}
         */
        _update: function() {
            //if (!this.element.closest("html")) {
            //    this.destroy();
            //
            //    return;
            //}

            var now = new Date(),
                finalDate = this._options.finalDate,
                elapseMode = this._options.elapseMode,
                started = !!this._interval,
                totalSecsLeft = finalDate.getTime() - now.getTime();

            // Milliseconds to seconds, do not allow negative.
            totalSecsLeft = Math.ceil(totalSecsLeft / 1000);
            totalSecsLeft = !elapseMode && totalSecsLeft < 0 ? 0 : Math.abs(totalSecsLeft);

            // Precision less than 1000 can cause tick to execute
            // more than once per second, trigger event only when
            // total seconds change.
            if (this._totalSecsLeft === totalSecsLeft)
                return;
            this._totalSecsLeft = totalSecsLeft;

            // Calculate offset.
            this._offset = {
                seconds: totalSecsLeft % 60,
                minutes: Math.floor(totalSecsLeft / 60) % 60,
                hours: Math.floor(totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(finalDate.getFullYear() - now.getFullYear()),
                totalDays: Math.floor(totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(totalSecsLeft / 60),
                totalSeconds: totalSecsLeft,
            };

            // Increase tick (element updated counter).
            if (this._tick === null)
                this._tick = 0;
            else
                this._tick++;

            // Start...
            if (!started)
                this._trigger("start");

            // ...update...
            this._trigger("update");

            // ...and finish.
            if (totalSecsLeft === 0 && !elapseMode) {
                this._trigger("finish");
                this.stop();
            }
        },

        /**
         * Dispatch event.
         *
         * @param  {String}      eventName
         * @return {CustomEvent}
         */
        _trigger: function(eventName) {
            eventName = "countdown" + eventName;

            var event, detail = {
                finalDate: this._options.finalDate,
                elapsed: this._offset.totalSecsLeft < 0,
                tick: this._tick,
                strftime: this._strftime(),
            };
            if (typeof(CustomEvent) !== "function") {
                event = this.document.createEvent("CustomEvent");
                event.initCustomEvent(eventName, false, false, detail);
            }
            else
                event = new CustomEvent(eventName, { detail: detail });

            this.element.dispatchEvent(event);

            return event;
        },
    };

    // Class as result.
    return Countdown;
}));
