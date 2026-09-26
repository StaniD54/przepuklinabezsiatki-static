;(function (root, factory) {
    if (typeof define === "function" && define.amd)
        define([], factory);
    else if (typeof module === "object" && module.exports)
        module.exports = factory();
    else
        root.Stickify = factory();
})(typeof self !== "undefined" ? self : this, function() {
    "use strict";

    /**
     * Stickify constructor.
     *
     * @param  {HTMLElement} element
     * @param  {Object}      options (optional) see Stickify.prototype._defaultOptions
     * @return {Stickify}
     */
    var Stickify = function(element, options) {
        if (!(this instanceof Stickify))
            throw "Stickify: Stickify is a constructor.";
        if (!(element instanceof HTMLElement))
            throw "Stickify: element argument must be of HTMLElement type.";
        if (typeof (options || {}) !== "object")
            throw "Stickify: options argument must be of Object type.";

        this._init.apply(this, arguments);
    };

    /**
     * Stickify prototype.
     *
     * @type {Object}
     */
    Stickify.prototype = {
        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: Stickify,

        /**
         * Default options.
         *
         * @type {Object}
         */
        _defaultOptions: {
            /**
             * Match media query string:
             * make element sticky only if window matches this media
             * query.
             *
             * @type {String}
             */
            matchMedia: "all",

            /**
             * Stick until element.
             *
             * @type {Mixed} HTMLElement or string CSS selector
             */
            stickUntilElement: null,

            /**
             * Adjust offset:
             * distance from page top where element becomes sticky.
             *
             * @type {Number} px
             */
            adjustOffset: 0,

            /**
             * Sticky zIndex:
             * applying z-index CSS when element becomes sticky.
             *
             * @type {Number}
             */
            stickyZIndex: 1000,
        },

        /**
         * Constructor.
         *
         * @param  {HTMLElement} element
         * @param  {Object}      options (optional)
         * @return {Void}
         */
        _init: function(element, options) {
            if (element._stickify)
                return;

            this._element = element;
            this.element.classList.add("stickify");
            this.element._stickify = this;

            // Extend options with defaults.
            this._options = {};
            for (var key in this._defaultOptions) {
                var value = options && (key in options) ? this._validateOption(key, options[key]) : this._defaultOptions[key];
                if (typeof value === "undefined")
                    value = this._defaultOptions[key];

                this._options[key] = value;
            }

            // Element's DOMRect and CSS margins.
            this._rect = null;
            this._margins = null;

            // Placeholder.
            var placeholder = this.document.createElement("div");
            placeholder = this.document.createElement("div");
            placeholder.classList.add("stickify-placeholder");
            this._placeholder = placeholder;

            // Bound event handlers.
            this._boundHandleScroll = this._handleScroll.bind(this);
            this._boundHandleResize = this._handleResize.bind(this);

            // Add event listeners.
            this.document.addEventListener("scroll", this._boundHandleScroll, { passive: true });
            this.window.addEventListener("resize", this._boundHandleResize, { passive: true });

            // Force refresh on init.
            this.refresh(true);
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            this._makeElementNonSticky();
            this._removePlaceholder();

            // Revert.
            this.element.classList.remove("stickify-non-sticky");
            this.element.classList.remove("stickify");
            delete this.element._stickify;

            // Remove event listeners.
            this.window.removeEventListener("resize", this._boundHandleResize);
            this.document.removeEventListener("scroll", this._boundHandleScroll);

            // Clean instance.
            delete this._boundHandleResize;
            delete this._boundHandleScroll;
            delete this._placeholder;
            delete this._margins;
            delete this._rect;
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
         * Is sticky property getter.
         *
         * @return {Boolean}
         */
        get isSticky() {
            return this.element.classList.contains("stickify-sticky");
        },

        /**
         * Get option.
         *
         * @param  {String} key
         * @return {Mixed}
         */
        getOption: function(key) {
            return this._options[key];
        },

        /**
         * Set option.
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Void}
         */
        setOption: function(key, value) {
            if (!(key in this._defaultOptions))
                return;

            // Validate.
            value = this._validateOption(key, value);
            if (typeof value === "undefined")
                return;

            // No change.
            var oldValue = this.getOption(key);
            if (oldValue === value)
                return;

            // Set.
            this._options[key] = value;

            // Trigger event.
            this._trigger("option", {
                key: key,
                value: value,
                oldValue: oldValue,
            });

            // ...and refresh.
            this.refresh();
        },

        /**
         * Refresh element.
         *
         * Element can have margins (top/bottom), and they need
         * to be applied to placeholder element. Since this is
         * (usually) static value we do not need to get stylesheet
         * from element on every refresh call. So, to optimize
         * this method, margins will be "calculated" only if
         * needed (on first refresh call), or when force argument
         * is true.
         *
         * @param  {Boolean} force
         * @return {Void}
         */
        refresh: function(force) {
            var win = this.window,
                element = this.element,
                placeholder = this._placeholder,
                matchMedia = this.getOption("matchMedia"),
                isSticky = this.isSticky;

            // If element is sticky let's make it non-sticky, so we
            // can retreive it's real size (we're forcing size on
            // fixed element).
            this._makeElementNonSticky();
            this._removePlaceholder();

            // Media query does not match, do not meake element sticky.
            if (!this.window.matchMedia(matchMedia).matches)
                return;

            // Now get element's DOMRect (position and size).
            var rect = element.getBoundingClientRect(),
                viewportTop = rect.top,
                adjustOffset = this.getOption("adjustOffset");

            // Store element's CSS margins.
            if (force || !this._margins) {
                var style = win.getComputedStyle(element);
                this._margins = [
                    parseInt(style.getPropertyValue("margin-top")) || 0,
                    parseInt(style.getPropertyValue("margin-right")) || 0,
                    parseInt(style.getPropertyValue("margin-bottom")) || 0,
                    parseInt(style.getPropertyValue("margin-left")) || 0,
                ];
            }

            // Store and adjust DOMRect (all the element positioning
            // logic is done in this._adjustRect method).
            this._rect = rect;
            this._adjustRect();

            // Apply change (make element sticky/non-sticky).
            if (viewportTop < adjustOffset) {
                this._makeElementSticky();
                this._insertPlaceholder();
            }
            else {
                this._makeElementNonSticky();
                this._removePlaceholder();
            }

            // ...and trigger event (if change occurred).
            if (isSticky !== this.isSticky)
                this._trigger("change", {
                    placeholder: !isSticky ? placeholder : null,
                    isSticky: !isSticky,
                });
        },

        /**
         * Make element sticky.
         *
         * @return {Void}
         */
        _makeElementSticky: function() {
            var element = this.element;

            element.classList.remove("stickify-non-sticky");
            element.classList.add("stickify-sticky");

            this._styleElement();
        },

        /**
         * Make element non-sticky.
         *
         * @return {Void}
         */
        _makeElementNonSticky: function() {
            var element = this.element;

            element.classList.remove("stickify-sticky");
            element.classList.add("stickify-non-sticky");

            this._styleElement();
        },

        /**
         * Apply stylesheet to element.
         *
         * @return {Void}
         */
        _styleElement: function() {
            var element = this.element,
                rect = this._rect,
                isSticky = this.isSticky;

            element.style.position = isSticky ? "fixed" : "";
            element.style.boxSizing = isSticky ? "border-box" : "";
            element.style.top = isSticky ? rect.top + "px" : "";
            element.style.left = isSticky ? rect.left + "px" : "";
            element.style.width = isSticky ? rect.width + "px" : "";
            //element.style.height = isSticky ? rect.height + "px" : "";
            element.style.zIndex = isSticky ? this.getOption("stickyZIndex") : "";
        },

        /**
         * Insert placeholder to DOM and apply CSS stylesheet
         * on it.
         *
         * @return {Void}
         */
        _insertPlaceholder: function() {
            var placeholder = this._placeholder,
                element = this.element,
                parent = element.parentElement,
                rect = this._rect,
                margins = this._margins;

            // Style placeholder.
            placeholder.style.height = rect.height + "px";
            placeholder.style.marginTop = margins[0] + "px";
            placeholder.style.marginRight = margins[1] + "px";
            placeholder.style.marginBottom = margins[2] + "px";
            placeholder.style.marginLeft = margins[3] + "px";

            // Append placeholder to DOM.
            if (!placeholder.parentElement)
                parent.insertBefore(placeholder, element);
        },

        /**
         * Remove placeholder from DOM.
         *
         * @return {Void}
         */
        _removePlaceholder: function() {
            var placeholder = this._placeholder,
                parent = placeholder.parentElement;

            if (parent)
                parent.removeChild(placeholder);
        },

        /**
         * Adjust DOMRect.
         *
         * In refresh method element is forced non-sticky before
         * DOMRect is taken. So the position in DOMRect is the
         * default element position. While making element sticky
         * we need to add some adjustments to DOMRect...
         *
         * @return {Void}
         */
        _adjustRect: function() {
            var rect = this._rect,
                viewportTop = rect.top,
                adjustOffset = this.getOption("adjustOffset");

            // Making adjustments only if element is sticky.
            if (viewportTop >= adjustOffset)
                return;

            // Stick to top, apply margins.
            rect.y = this._margins[0]*-1 + adjustOffset;

            // Stick untill element.
            var stickUntilElement = this.getOption("stickUntilElement"),
                rectBottom = rect.bottom;
            if (stickUntilElement) {
                var isChild = stickUntilElement.contains(this.element),
                    stickRect = stickUntilElement.getBoundingClientRect(),
                    stickPos = stickRect[isChild ? "bottom" : "top"],
                    marginBottom = this._margins[2],
                    diff = rectBottom + marginBottom;

                if (stickPos < diff)
                    rect.y -= diff - stickPos;
            }

            // No stick untill element defined: adjust position if
            // element is higher than screen height.
            else {
                var docElement = this.document.documentElement,
                    docClientHeight = docElement.clientHeight;
                if (rectBottom > docClientHeight) {
                    var length = docElement.scrollHeight - docClientHeight,
                        current = docElement.scrollTop,
                        tillEnd = length - current,
                        diff = rectBottom - docClientHeight;

                    if (tillEnd < diff)
                        rect.y -= diff - tillEnd;
                }
            }
        },

        /**
         * Validate option:
         * validate and return valid value (undefined if value
         * can not be validated).
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Mixed}
         */
        _validateOption: function(key, value) {
            var current = this.getOption(key);

            // Media query string
            if (key === "matchMedia")
                return String(value);

            // String to HTMLElement (if valid selector), do not
            // allow this.element and it's children.
            else if (key === "stickUntilElement") {
                try {
                    if (typeof value === "string") {
                        if (!current || !current.matches(value))
                            value = this.document.querySelector(value) || "fail";
                    }

                    if (value instanceof HTMLElement && !this.element.contains(value))
                        return value;
                    else if (!value)
                        return null;
                }
                catch(ex) {
                    // pass
                }
            }

            // Convert to number.
            else if (key === "adjustOffset" || key === "stickyZIndex") {
                value = value*1;
                if (!isNaN(value)) {
                    return value;
                }
            }

            // Undefined default.
            return undefined;
        },

        /**
         * Dispatch event.
         *
         * @param  {String}      eventName
         * @param  {Object}      detail    (optional)
         * @return {CustomEvent}
         */
        _trigger: function(eventName, detail) {
            // Prefix event name.
            eventName = "stickify" + eventName;

            // Create event.
            var event;
            if (typeof CustomEvent !== "function") {
                event = this.document.createEvent("CustomEvent");
                event.initCustomEvent(eventName, false, false, detail);
            }
            else
                event = new CustomEvent(eventName, { detail: detail });

            // Dispatch event.
            this.element.dispatchEvent(event);

            // Event as result.
            return event;
        },

        /**
         * Document scroll event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleScroll: function(e) {
            this._trigger("scroll");

            this.refresh();
        },

        /**
         * Window resize event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleResize: function(e) {
            this._trigger("resize");

            this.refresh();
        },
    };

    // Factory result.
    return Stickify;
});
