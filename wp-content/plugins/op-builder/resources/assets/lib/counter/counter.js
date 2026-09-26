;(function(root, factory) {
    // AMD.
    if (typeof define === "function" && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === "object")
        module.exports = factory();

    // Browser globals.
    else
        root.Counter = factory();
} (this, function() {
    // Strict mode.
    "use strict";

    /**
     * Counter.
     *
     * @param  {HTMLElement}           element HTML node
     * @param  {Object}                options (optional) see Counter.prototype._defaults
     * @return {RichTextAnimationBase}
     */
    var Counter = function(element, options) {
        if (!(this instanceof Counter))
            throw "Counter: Counter is a constructor.";

        this._init(element, options);
    };

    /**
     * Counter prototype.
     *
     * @type {Object}
     */
    Counter.prototype = {
        /**
         * Default options.
         *
         * @type {Object}
         */
        _defaults: {
            /**
             * Counter starting number.
             *
             * @type {Number}
             */
            start: 0,

            /**
             * Counter ending number.
             *
             * @type {Number}
             */
            end: 1000,

            /**
             * Counter animation duration.
             *
             * @type {Number}
             */
            duration: 1000,

            /**
             * Counter number separator.
             *
             * @type {String}
             */
            separator: ",",
        },

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: Counter,

        /**
         * Constructor.
         *
         * @param  {HTMLElement} element
         * @param  {Object}      options (optional)
         * @return {Void}
         */
        _init: function(element, options) {
            if (element._counter)
                return;
            element._counter = this;

            // DOM element.
            this._element = element;

            // Extend options with defaults.
            this._options = {};
            for (var key in this._defaults) {
                var type = typeof this._defaults[key],
                    value = options && (key in options) ? options[key] : this._defaults[key];
                if (type === "number")
                    value = Number(value);
                else if (type === "string")
                    value = String(value);

                this._options[key] = value;
            };

            // Instance properties.
            this._observer = null;
            this._frameId = null;
            this._startTimestamp = null;

            // Set starting number.
            this.reset();

            // Start observer.
            if (this._options.duration > 0)
                this._observe();
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            this.cancel();
            this._unobserve();

            delete this.element._counter;
            delete this._startTimestamp;
            delete this._frameId;
            delete this._observer;
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
         * Reset counter.
         *
         * @return {Void}
         */
        reset: function() {
            this.cancel();

            this.element.innerText = this._formatNumber(this._options.start);
        },

        /**
         * Start animation counter.
         *
         * @return {Void}
         */
        animate: function() {
            if (this._frameId)
                return;

            this._requestAnimationFrame();
            this._trigger("animate");
        },

        /**
         * Stop animation counter.
         *
         * @return {Void}
         */
        cancel: function() {
            if (!this._frameId)
                return;

            this._cancelAnimationFrame();
            this._trigger("cancel");
        },

        /**
         * Start intersection observer.
         *
         * @return {Void}
         */
        _observe: function() {
            if (this._observer)
                return;

            this._observer = new IntersectionObserver(this._handleIntersectionObserver.bind(this), { threshold: [1] });
            this._observer.observe(this.element);
        },

        /**
         * Stop intersection observer.
         *
         * @return {Void}
         */
        _unobserve: function() {
            if (!this._observer)
                return;

            this._observer.unobserve(this.element);
            this._observer = null;
        },

        /**
         * Request animation frame.
         *
         * @return {Void}
         */
        _requestAnimationFrame: function() {
            this._frameId = this.window.requestAnimationFrame(this._update.bind(this));
        },

        /**
         * Cancel animation frame.
         *
         * @return {Void}
         */
        _cancelAnimationFrame: function() {
            this.window.cancelAnimationFrame(this._frameId);

            this._startTimestamp = null;
            this._frameId = null;
        },

        /**
         * Counter tick.
         *
         * @param  {Number} timestamp
         * @return {Void}
         */
        _update: function(timestamp) {
            if (!this._startTimestamp)
                this._startTimestamp = timestamp;

            // Get the time passed as a fraction of total duration.
            var options = this._options,
                progress = Math.min((timestamp - this._startTimestamp) / options.duration, 1),
                number = Math.floor(progress * (options.end - options.start) + options.start);
            this.element.innerText = this._formatNumber(number);

            // Continue.
            if (progress < 1) {
                this._requestAnimationFrame();

                return;
            }

            // Animation finished.
            this.element.innerText = this._formatNumber(options.end);
            this._startTimestamp = null;
            this._frameId = null;

            this._trigger("finished");
        },

        /**
         * Dispatch event.
         *
         * @param  {String}      eventName
         * @param  {Object}      data      (optional)
         * @return {CustomEvent}
         */
        _trigger: function(eventName, data) {
            eventName = "counter" + eventName;

            var event;
            if (typeof(CustomEvent) !== "function") {
                event = this.document.createEvent("CustomEvent");
                event.initCustomEvent(eventName, false, false, data);
            }
            else
                event = new CustomEvent(eventName, { detail: data });

            this.element.dispatchEvent(event);

            return event;
        },

        /**
         * Format number.
         *
         * @param  {Number} number
         * @return {String}
         */
        _formatNumber: function(number) {
            number = number.toString();

            var separator = this._options.separator;
            if (separator && separator !== "none")
                return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator)

            return number;
        },

        /**
         * Intersection observer callback.
         *
         * @param  {Array} entries
         * @return {Void}
         */
        _handleIntersectionObserver: function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting)
                    return;

                this._unobserve();
                this.animate();
            }.bind(this));
        },
    };

    // Class as result.
    return Counter;
}));
