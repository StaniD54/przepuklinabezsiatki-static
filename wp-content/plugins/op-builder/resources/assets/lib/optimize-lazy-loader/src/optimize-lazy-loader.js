;(function (root, factory) {
    if (typeof define === "function" && define.amd)
        define([], factory);
    else if (typeof module === "object" && module.exports)
        module.exports = factory();
    else
        root.OptimizeLazyLoader = factory();
})(typeof self !== "undefined" ? self : this, function() {
    "use strict";

    /**
     * Initialize OptimizeLazyLoader.
     *
     * @param  {Object} options (optional) see OptimizeLazyLoader.prototype._defaultOptions
     * @return {Void}
     */
    var OptimizeLazyLoader = function(options) {
        if (!(this instanceof OptimizeLazyLoader))
            throw "OptimizeLazyLoader: OptimizeLazyLoader is a constructor.";

        this._init.apply(this, arguments);
    };

    /**
     * OptimizeLazyLoader prototype.
     *
     * @type {Object}
     */
    OptimizeLazyLoader.prototype = {
        /**
         * Reassign constructor.
         *
         * @type {OptimizeLazyLoader}
         */
        constructor: OptimizeLazyLoader,

        /**
         * Default options.
         *
         * @type {Object}
         */
        _defaultOptions: {
            /**
             * Context.
             *
             * @type {Node}
             */
            context: document,

            /**
             * Use native.
             *
             * @type {Boolean}
             */
            useNative: true,

            /**
             * Prefix used for className and data
             * attributes.
             *
             * @type {String}
             */
            prefix: "oll",

            /**
             * Allowed tags.
             *
             * @type {String}
             */
            tags: "img,picture,video,audio,iframe",

            /**
             * Attributes.
             *
             * @type {String}
             */
            attrs: "src,srcset",

            /**
             * Threshold (in pixels).
             *
             * @type {Number}
             */
            threshold: 256,
        },

        /**
         * Constructor.
         *
         * @param  {Object} options (optional)
         * @return {Void}
         */
        _init: function(options) {
            this._options = {};
            for (var key in this._defaultOptions) {
                this._options[key] = options && (key in options) ? options[key] : this._defaultOptions[key];
            }

            this._mutationObserver = null;
            this._intersectionObserver = null;
        },

        /**
         * OptimizeLazyLoader destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            this.stop();

            delete this._intersectionObserver;
            delete this._mutationObserver;
            delete this._options;
        },

        /**
         * Supported property getter:
         * is IntersectionObserver supported by the browser.
         *
         * @return {Boolean}
         */
        get supported() {
            return "IntersectionObserver" in window;
        },

        /**
         * Status property getter:
         * is IntersectionObserver observing.
         *
         * @return {Boolean}
         */
        get status() {
            return !!this._intersectionObserver;
        },

        /**
         * Option getter.
         *
         * @param  {String} key
         * @return {Mixed}
         */
        getOption: function(name) {
            var result = this._options[name];

            // Execute options of function type and return result.
            if (typeof result === "function")
                result = result.apply(this);

            return result;
        },

        /**
         * Start observing:
         * init IntersectionObserver and MutationObserver.
         *
         * @return {Void}
         */
        start: function() {
            if (this.status)
                return;
            else if (!this.supported)
                return this.preloadAll();

            var context = this._getContext(),
                callback,
                options;

            // Init IntersectionObserver.
            if (typeof IntersectionObserver === "function") {
                callback = this._handleIntersectionObserver.bind(this),
                options = {
                    root: null,
                    rootMargin: (this.getOption("threshold")*1 || 0) + "px",
                    threshold: 0,
                };

                this._intersectionObserver = new IntersectionObserver(callback, options);
                this._prepare(context);
            }

            // Init MutationObserver.
            if (typeof MutationObserver === "function") {
                callback = this._handleMutationObserver.bind(this);
                options = {
                    attributes: false,
                    childList: true,
                    subtree: true,
                };

                this._mutationObserver = new MutationObserver(callback);
                this._mutationObserver.observe(context, options);
            }
        },

        /**
         * Stop observing:
         * cancel and destroy IntersectionObserver and
         * MutationObserver.
         *
         * @return {Void}
         */
        stop: function() {
            if (!this.status)
                return;

            this._unprepare(this._getContext());
            if (this._intersectionObserver)
                this._intersectionObserver.disconnect();
            if (this._mutationObserver)
                this._mutationObserver.disconnect();

            this._intersectionObserver = null;
            this._mutationObserver = null;
        },

        /**
         * Preload asset:
         * Replace data with src,srcset attributes in
         * element and all it's children.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        preload: function(element) {
            var prefix = this.getOption("prefix");
            if (!this._matches(element, "." + prefix + ",." + prefix + "-css"))
                return;

            // Lazy load images.
            if (this._matches(element, "." + prefix)) {
                this._getElementsWithSrcAttrs(element).forEach(function(child) {
                    this.getOption("attrs").split(",").forEach(function(attr) {
                        var attrTrim = this._stringTrim(attr),
                            dataAttr = "data-" + prefix + "-" + attrTrim,
                            value = child.getAttribute(dataAttr);
                        if (value === null)
                            return;

                        child.removeAttribute(dataAttr);
                        child.setAttribute(attrTrim, value);
                    }.bind(this));
                }.bind(this));

                // We need to execute load on video element so the
                // dynamic source would work.
                if (typeof element.load === "function")
                    element.load();
            }

            // Lazy load background images.
            if (this._matches(element, "." + prefix + "-css"))
                this._removeClass(element, prefix + "-css");

            // Stop observing.
            this._unprepare(element);
        },

        /**
         * Preload all assets (see preload).
         *
         * @return {Void}
         */
        preloadAll: function() {
            this.stop();

            this._getElements().forEach(function(element) {
                this.preload(element);
            }.bind(this));
        },

        /**
         * Get context.
         *
         * @param  {Node} context (optional)
         * @return {Node}
         */
        _getContext: function(context) {
            return context || this.getOption("context") || document;
        },

        /**
         * String trim.
         *
         * @param  {String} str
         * @return {String}
         */
        _stringTrim: function(str) {
            return str.replace(/(^\s+|\s+$)/g, "");
        },

        /**
         * Convert array-like object to array.
         *
         * @param  {Object} object
         * @return {Array}
         */
        _toArray: function(object) {
            return Array.prototype.slice.call(object);
        },

        /**
         * Checks if the element would be selected by the
         * provided selector.
         *
         * @param  {HTMLElement} element
         * @param  {String}      selector
         * @return {Boolean}
         */
        _matches: function(element, selector) {
            return (null
                || element.matches
                || element.matchesSelector
                || element.mozMatchesSelector
                || element.msMatchesSelector
                || element.oMatchesSelector
                || element.webkitMatchesSelector)
                    .call(element, selector);
        },

        /**
         * Remove className from element's classList.
         *
         * @param  {HTMLElement} element
         * @param  {String}      className
         * @return {Void}
         */
        _removeClass: function(element, className) {
            var classList = (element.getAttribute("class") || "")
                    .replace(/\s+/g, " ")
                    .replace(/(^\s|\s$)/g, "")
                    .split(" "),
                index = classList.indexOf(className);
            if (index === -1)
                return;

            classList.splice(index, 1);

            element.setAttribute("class", classList.join(" "));
        },

        /**
         * Get all elements in context that have oll (options
         * prefix) class (include context as well).
         *
         * @param  {Node}  context (optional)
         * @return {Array}
         */
        _getElements: function(context) {
            context = this._getContext(context);

            var result = [];
            if (!(context instanceof Node) || !("querySelectorAll" in context))
                // Context is Node.TEXT_NODE?
                return result;

            // Find all elements (filted by tags option) in
            // context that have oll (options prefix) class
            // and that have oll-css class.
            var tags = this.getOption("tags"),
                prefix = this.getOption("prefix"),
                selector = (tags
                    .split(",")
                    .join(".{prefix},")
                    + ".{prefix}"
                    + ",.{prefix}-css")
                        .replace(/{prefix}/g, prefix);
            result = context.querySelectorAll(selector);
            result = this._toArray(result);

            // Add context node (prepend) to result if node
            // matches selector.
            if (context.nodeType === Node.ELEMENT_NODE && this._matches(context, selector))
                result.unshift(context);

            return result;
        },

        /**
         * Get all elements in context that have src,srcset
         * attributes (include context as well).
         *
         * @param  {Node}  context
         * @return {Array}
         */
        _getElementsWithSrcAttrs: function(context) {
            context = this._getContext(context);

            var result = [];
            if (!(context instanceof Node) || !("querySelectorAll" in context))
                // Context is Node.TEXT_NODE?
                return result;

            // Find all children that has src,srcset
            // attributes.
            var prefix = this.getOption("prefix"),
                attrs = this.getOption("attrs"),
                selector = ""
                    + "["
                    + attrs.split(",")
                        .map(function(item) {
                            return "data-" + prefix + "-" + this._stringTrim(item);
                        }.bind(this))
                        .join("],[")
                    + "]";
            result = context.querySelectorAll(selector);
            result = this._toArray(result);

            // <img> inside <picture> can have multiple srcset
            // in <source> siblings
            if (this._matches(context, "img") && this._matches(context.parentElement, "picture") && attrs.split(/\s*,\s*/).indexOf("srcset") !== -1)
                result = result.concat(this._toArray(context.parentElement.querySelectorAll("source[data-" + prefix + "-srcset]")));

            // Prepend context node if it has src,srcset
            // attributes.
            if (this._matches(context, selector))
                result.unshift(context);

            return result;
        },

        /**
         * Prepare all nodes with oll class in context
         * (include context itself):
         * apply IntersectionObserver.
         *
         * @param  {Node} context
         * @return {Void}
         */
        _prepare: function(context) {
            var prefix = this.getOption("prefix"),
                useNative = this.getOption("useNative");

            this._getElements(context).forEach(function(element) {
                var htmlLoad = this._matches(element, "." + prefix),
                    cssLoad = this._matches(element, "." + prefix + "-css"),
                    supportNative = "loading" in element,
                    observe = false;

                if (htmlLoad) {
                    // Native lazy-loading is supported for current
                    // element, let browser handle it.
                    if (useNative && supportNative) {
                        element.setAttribute("loading", "lazy");
                        this.preload(element);
                    }
                    else
                        observe = true;
                }

                if (cssLoad)
                    observe = true;

                // Use IntersectionObserver object for lazy-loading.
                if (observe)
                    this._intersectionObserver.observe(element);
            }.bind(this));
        },

        /**
         * Unprepare all nodes with oll and oll-css class in
         * context (include context itself):
         * unapply IntersectionObserver.
         *
         * @param  {Node} context
         * @return {Void}
         */
        _unprepare: function(context) {
            this._getElements(context).forEach(function(element) {
                if (this._intersectionObserver)
                    this._intersectionObserver.unobserve(element);

                this._removeClass(element, this.getOption("prefix"));
            }.bind(this));
        },

        /**
         * MutationObserver callback.
         *
         * @param  {Array} mutations
         * @return {Void}
         */
        _handleMutationObserver: function(mutations) {
            if (!this.status)
                return;

            mutations.forEach(function(mutation) {
                if (mutation.type !== "childList")
                    return;

                mutation.addedNodes.forEach(function(node) {
                    this._prepare(node);
                }.bind(this));

                mutation.removedNodes.forEach(function(node) {
                    this._unprepare(node);
                }.bind(this));
            }.bind(this));
        },

        /**
         * IntersectionObserver callback.
         *
         * @param  {Array} entries
         * @return {Void}
         */
        _handleIntersectionObserver: function(entries) {
            entries.forEach(function(entry) {
                if (!(entry.intersectionRatio > 0 || entry.isIntersecting))
                    return;

                this.preload(entry.target);
            }.bind(this));
        },

    };

    // Factory result.
    return OptimizeLazyLoader;
});
