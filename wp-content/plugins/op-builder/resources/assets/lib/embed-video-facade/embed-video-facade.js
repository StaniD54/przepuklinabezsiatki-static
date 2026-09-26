;(function (root, factory) {
    if (typeof define === "function" && define.amd)
        define([], factory);
    else if (typeof module === "object" && module.exports)
        module.exports = factory();
    else
        root.EmbedVideoFacade = factory();
})(typeof self !== "undefined" ? self : this, function() {
    "use strict";

    /**
     * Registered sources list:
     * use EmbedVideoFacade.register to add new source
     * to the list.
     *
     * @type {Array}
     */
    var registeredSources = [];

    /**
     * EmbedVideoFacade constructor.
     *
     * @param  {HTMLElement}        element
     * @param  {Object}             options (optional) see EmbedVideoFacade.prototype._defaultOptions
     * @return {EmbedVideoFacade}
     */
    function EmbedVideoFacade(element, options) {
        if (!(this instanceof EmbedVideoFacade))
            throw "EmbedVideoFacade: EmbedVideoFacade is a constructor.";

        this._init.apply(this, arguments);
    };

    /**
     * EmbedVideoFacade prototype.
     *
     * @type {Object}
     */
    EmbedVideoFacade.prototype = {
        /**
         * Reassign constructor.
         *
         * @type {EmbedVideoFacade}
         */
        constructor: EmbedVideoFacade,

        /**
         * Default options.
         *
         * @type {Object}
         */
        _defaultOptions: {
            srcAttr: "data-src",
            addPoster: "auto",
            posterElement: null,
            interactStyle: "cursor: pointer;",
            interactElement: null,
            lazyLoad: false,
            lazyLoadThreshold: 256,
            isDevice: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            canUseWebp: false,
            canUseAvif: false,
        },

        /**
         * Constructor.
         *
         * @param  {HTMLElement} element
         * @param  {Object}      options (optional)
         * @return {Void}
         */
        _init: function(element, options) {
            if (!(element instanceof HTMLElement))
                throw "EmbedVideoFacade: element argument must be of HTMLElement type.";
            this._element = element;
            this.element.classList.add("embed-video-facade");
            this._setStatus("pending");

            // Extend options with defaults.
            if (typeof (options || {}) !== "object")
                throw "EmbedVideoFacade: element argument must be of Object type.";
            this._options = {};
            for (var key in this._defaultOptions) {
                this._options[key] = options && (key in options) ? options[key] : this._defaultOptions[key];
            }

            // Find all DOM nodes with data-src (option srcAttr) attribute.
            var srcAttr = this.getOption("srcAttr"),
                selector = "[" + srcAttr + "]",
                nodes = this.element.querySelectorAll(selector);
            nodes = Array.prototype.slice.call(nodes);
            if (this.element.matches(selector))
                nodes.unshift(this.element);
            nodes.forEach(function(node) {
                var src = node.getAttribute("src");
                if (src && src !== "about:blank")
                    node.setAttribute("src", "");
            });
            this._nodes = nodes;

            // This properties.
            this._url = this.element.getAttribute(this.getOption("srcAttr"));
            this._source = null;
            this._poster = null;
            this._posterElement = null;
            this._interactElement = null;

            // Bound event handlers.
            this._boundHandleElementLoad = this._handleElementLoad.bind(this);
            this._boundHandleElementPointerover = this._handleElementPointerover.bind(this);
            this._boundHandleElementClick = this._handleElementClick.bind(this);
            this._boundHandleIntersectionObserver = this._handleIntersectionObserver.bind(this);

            // Intersection observer used for lazy loading.
            this._intersectionObserver = null;
            if (typeof IntersectionObserver === "function" && this.getOption("lazyLoad"))
                this._intersectionObserver = new IntersectionObserver(this._boundHandleIntersectionObserver, {
                    root: null,
                    rootMargin: (this.getOption("lazyLoadThreshold")*1 || 0) + "px",
                    threshold: 0,
                });

            // Prepare all.
            var iframeProps = this._iframeProps(this.element),
                waitIframe = iframeProps
                    && !iframeProps.crossdomain
                    && iframeProps.readyState !== "complete";
            if (waitIframe)
                this._bind(this.element, "load", this._boundHandleElementLoad);
            else
                this._boundHandleElementLoad();
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            // Unbind all.
            if (this._intersectionObserver)
                this._intersectionObserver.disconnect();
            this._unbind(this._interactElement, "click", this._boundHandleElementClick);
            this._unbind(this._interactElement, "pointerover", this._boundHandleElementPointerover);
            this._unbind(this.element, "load", this._boundHandleElementLoad);

            // Remove class and attributes.
            // Important: We can not remove class on this._interactElement,
            // since element can be content document of iframe. We need to
            // get the element stored in options.
            var className = "embed-video-facade";
            this.getOption("interactElement").classList.remove(className + "-interact");
            this._posterElement.classList.remove(className + "-poster");
            this.element.classList.remove(className);
            this.element.removeAttribute("data-" + className + "-source");
            this.element.removeAttribute("data-" + className + "-status");

            // Clear all.
            delete this._boundHandleIntersectionObserver;
            delete this._boundHandleElementClick;
            delete this._boundHandleElementPointerover;
            delete this._boundHandleElementLoad;
            delete this._interactElement;
            delete this._posterElement;
            delete this._poster;
            delete this._source;
            delete this._url;
            delete this._nodes;
            delete this._options;
            delete this._element;

            this._trigger("destroy");
        },

        /**
         * Call callback (if provided) with additional
         * arguments.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _call: function(callback) {
            if (typeof callback !== "function")
                return;

            var args = Array.prototype.slice.call(arguments, 1);
            callback.apply(this, args)
        },

        /**
         * Prepare all.
         *
         * @return {Void}
         */
        _prepare: function() {
            this._prepareElement();
            this._prepareSource();
            this._preparePoster();
            this._prepareInteract();

            // No need for this event anymore, unbind...
            this._unbind(this.element, "load", this._boundHandleElementLoad);

            this._trigger("init");

            // When you move history (back/forward) or reload page
            // on firefox, it display cached content in iframe.
            // Since we already have content in iframe let's
            // trigger connect event.
            var iframeProps = this._iframeProps(this.element),
                hasCachedContent = iframeProps ? iframeProps.hasCachedContent : false;
            if (hasCachedContent)
                this.connect();
        },

        /**
         * Prepare this.element.
         *
         * @return {Void}
         */
        _prepareElement: function() {
            this._setStatus("idle");
        },

        /**
         * Prepare this._source:
         * Itereate all registered sources and find the
         * one with valid test.
         *
         * @return {Void}
         */
        _prepareSource: function() {
            registeredSources.forEach(function(constr) {
                if (this._source)
                    return;

                var source = new constr(this);
                if (source.test())
                    this._source = source;
            }.bind(this));

            this.element.setAttribute("data-embed-video-facade-source", this.source || "");
        },

        /**
         * Replace poster image.
         *
         * @return {Boolean}
         */
        _replacePoster: function() {
            var posterElement = this.getOption("posterElement");
            if (posterElement.classList.contains("oll-css"))
                return false;

            var addPoster = this.getOption("addPoster"),
                currentPoster = this._computedStyle(posterElement, "background-image"),
                hasPoster = currentPoster && currentPoster !== "none";

            return (addPoster === "auto" && !hasPoster) || (addPoster !== "auto" && addPoster);
        },

        /**
         * Prepare poster element.
         *
         * @return {Void}
         */
        _preparePoster: function() {
            var posterElement = this.getOption("posterElement");
            posterElement.classList.add("embed-video-facade-poster");
            this._posterElement = posterElement;

            if (this._source && this._replacePoster())
                this._source.getPoster(function(src) {
                    // Set poster property.
                    this._poster = src;

                    // Apply poster to element.
                    if (src && this._intersectionObserver)
                        this._applyPosterLazy(src);
                    else if (src)
                        this._applyPoster(src);
                }.bind(this));
        },

        /**
         * Apply poster to posterElement and trigger event
         * on image load.
         *
         * @param  {String} src
         * @return {Void}
         */
        _applyPoster: function(src) {
            var element = this.getOption("posterElement"),
                style = this._source.posterStyle();

            // Apply to element.
            if (style)
                this._applyStyle(element, style);
            element.style.backgroundImage = "url(" + src + ")";

            // Set poster property.
            this._poster = src;

            // Wait for image to load, then trigger event.
            this._loadImage(src, function(img) {
                this._trigger(img ? "posterload" : "postererror");
            });
        },

        /**
         * Apply intersect observer handler to posterElement.
         *
         * @param  {String} src
         * @return {Void}
         */
        _applyPosterLazy: function(src) {
            var element = this.getOption("posterElement");
            element.setAttribute("data-embed-video-facade-poster-src", src);

            this._intersectionObserver.observe(element);
        },

        /**
         * Prepare interact element.
         *
         * @return {Void}
         */
        _prepareInteract: function() {
            var interactElement = this.getOption("interactElement");
            interactElement.classList.add("embed-video-facade-interact");

            var iframeProps = this._iframeProps(interactElement),
                hasEmptyContent = iframeProps ? iframeProps.hasEmptyContent : false,
                hasCachedContent = iframeProps ? iframeProps.hasCachedContent : false;

            // Since we can not detect mouseevent on iframe, we gonna
            // set iframe's contentDocument as interactElement. This
            // would not work on crossdomain, but since we should
            // have empty src this will work.
            if (hasEmptyContent)
                interactElement = interactElement.contentDocument;

            // Custom style.
            var interactStyle = this.getOption("interactStyle");
            this._applyStyle(!hasEmptyContent ? interactElement : interactElement.documentElement, interactStyle);

            // Document element style tweak.
            if (hasEmptyContent) {
                interactElement.documentElement.style.height = "100%";
                interactElement.documentElement.style.background = "transparent";
            }

            // When you move history (back/forward) or reload page
            // on firefox, it display cached content in iframe. Bind
            // event on interact element only if interact element is
            // not iframe and it's content is not cached...
            if (!hasCachedContent) {
                this._bind(interactElement, "pointerover", this._boundHandleElementPointerover);
                this._bind(interactElement, "click", this._boundHandleElementClick);
            }

            // Set the element
            this._interactElement = interactElement;
        },

        /**
         * Load image.
         *
         * @param  {Mixed}    image (Image) or image src (String)
         * @param  {Function} callback
         * @return {Image}
         */
        _loadImage: function(src, callback) {
            if (src instanceof Image) {
                if (src.complete && src.naturalHeight !== 0)
                    this._call(callback, src);
                else if (src.complete)
                    this._call(callback, null);
                else {
                    src.addEventListener("load", function(e) {
                        if (e.target.naturalHeight)
                            this._call(callback, e.target);
                        else
                            this._call(callback, null);
                    }.bind(this));
                    src.addEventListener("error", function(e) {
                        this._call(callback, null);
                    }.bind(this));
                }

                return src;
            }
            else if (typeof src === "string") {
                var img = new Image();
                img.src = src;

                if (img.complete && img.naturalHeight !== 0)
                    this._call(callback, img);
                else if (src.complete)
                    this._call(callback, null);
                else
                    this._loadImage(img, callback);

                return img;
            }

            return null;
        },

        /**
         * Bind event to element (add event listener).
         *
         * @param  {HTMLElement} element
         * @param  {String}      eventName
         * @param  {Function}    handler
         * @return {Void}
         */
        _bind: function(element, eventName, handler) {
            element.addEventListener(eventName, handler);
        },

        /**
         * Unbind event to element (remove event listener).
         *
         * @param  {HTMLElement} element
         * @param  {String}      eventName
         * @param  {Function}    handler
         * @return {Void}
         */
        _unbind: function(element, eventName, handler) {
            element.removeEventListener(eventName, handler);
        },

        /**
         * Trigger custom event on this.element.
         *
         * @param  {String} eventName
         * @return {Event}
         */
        _trigger: function(eventName) {
            eventName = "embedvideofacade" + eventName;

            var event;
            if (typeof(Event) !== "function") {
                event = this.document.createEvent("Event");
                event.initEvent(eventName, false, false);
            }
            else
                event = new Event(eventName);

            this.element.dispatchEvent(event);

            return event;
        },

        /**
         * Set status.
         *
         * @param {String} status
         * @return {Void}
         */
        _setStatus: function(status) {
            this.element.setAttribute("data-embed-video-facade-status", status);
        },

        /**
         * Get option by name.
         *
         * @param  {String} name
         * @return {Mixed}
         */
        getOption: function(name) {
            var result = this._options[name];

            // Execute options of function type and return result.
            if (typeof result === "function")
                result = result.apply(this);

            // Options that ends with Element (posterElement and
            // interactElement) needs fallback (this.element).
            if (/Element$/.test(name) && !(result instanceof HTMLElement))
                result = this.element;

            return result;
        },

        /**
         * Preconnect video:
         * begin pre-connecting to warm up video load.
         *
         * @return {Void}
         */
        preconnect: function() {
            if (!this._source)
                return;
            if (this.status === "preconnected" || this.status === "connected")
                return;

            this._source.preconnect();

            // No need for this event anymore, unbind...
            this._unbind(this._interactElement, "pointerover", this._boundHandleElementPointerover);

            this._setStatus("preconnected");
            this._trigger("preconnect");
        },

        /**
         * Connect video:
         * replace data-src (option srcAttr) attributes with src
         * on this._nodes (this.element and all it's children).
         *
         * @return {Void}
         */
        connect: function() {
            if (!this._source)
                return;
            if (this.status === "connected")
                return;

            var srcAttr = this.getOption("srcAttr"),
                url = this._source.url();
            this._nodes.forEach(function(node) {
                var src = url || node.getAttribute(srcAttr);
                node.removeAttribute(srcAttr);
                node.setAttribute("src", src);
            });

            // No need for these events anymore, unbind...
            this._unbind(this._interactElement, "click", this._boundHandleElementClick);
            this._unbind(this._interactElement, "pointerover", this._boundHandleElementPointerover);

            this._setStatus("connected");
            this._trigger("connect");
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
         * Element property getter:
         * this.element
         *
         * @return {HTMLElement}
         */
        get element() {
            return this._element;
        },

        /**
         * Status property getter.
         *
         * @return {String}
         */
        get status() {
            return this.element.getAttribute("data-embed-video-facade-status");
        },

        /**
         * URL property getter:
         * this.element src attribute.
         *
         * @return {String}
         */
        get url() {
            return this._url;
        },

        /**
         * Source name property getter.
         *
         * @return {String}
         */
        get source() {
            return this._source ? this._source.name : null;
        },

        /**
         * Video ID property getter.
         *
         * @return {String}
         */
        get videoId() {
            return this._source ? this._source.videoId() : null;
        },

        /**
         * Poster image property getter:
         * poster image loaded from the source.
         *
         * @return {String}
         */
        get poster() {
            return this._poster;
        },

        /**
         * Width property getter.
         *
         * @return {String}
         */
        get width() {
            return this._source ? this._source.width() : null;
        },

        /**
         * Height property getter.
         *
         * @return {String}
         */
        get height() {
            return this._source ? this._source.height() : null;
        },

        /**
         * Get element computed style.
         *
         * @param  {HTMLElement} element
         * @param  {String}      property
         * @return {String}
         */
        _computedStyle: function(element, property) {
            return element.ownerDocument.defaultView.getComputedStyle(element).getPropertyValue(property);
        },

        /**
         * Apply style to element.
         *
         * We could just set element.style, but then we would
         * override any existing property. So let's parse
         * style string and apply each stylesheet property
         * individually.
         *
         * @param  {HTMLElement} element
         * @param  {String}      style
         * @return {Void}
         */
        _applyStyle: function(element, style) {
            var div = this.document.createElement("div");
            div.setAttribute("style", style);

            for (var i = 0; i < div.style.length; i++) {
                var name = div.style[i],
                    value = div.style.getPropertyValue(name);

                element.style.setProperty(name, value);
            }
        },

        /**
         * Is element (or any of its ancesters) disabled
         * (has embed-video-facade-disabled class).
         *
         * @param  {HtmlElement} element
         * @return {Boolean}
         */
        _isDisabled: function(element) {
            return !!element.closest(".embed-video-facade-disabled");
        },

        /**
         * Get some useful iframe properties.
         *
         * @param  {HTMLElement} element
         * @return {Object}
         */
        _iframeProps: function(element) {
            if (!element.matches("iframe"))
                return null;

            var src = element.src,
                hasEmptySrc = !src || src === "about:blank",
                crossorigin = !element.contentDocument;

            return {
                hasEmptySrc: hasEmptySrc,
                crossorigin: crossorigin,
                readyState: !crossorigin ? element.contentDocument.readyState : null,
                hasEmptyContent: hasEmptySrc && !crossorigin,
                hasCachedContent: hasEmptySrc && crossorigin,
            }
        },

        /**
         * Element load event handler:
         * prepare all.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleElementLoad: function(e) {
            this._prepare();
        },

        /**
         * Element pointerover event handler:
         * preconnect video resources.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleElementPointerover: function(e) {
            if (this._isDisabled(e.target))
                return;

            this.preconnect();
        },

        /**
         * Element click event handler:
         * connect video (set src).
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleElementClick: function(e) {
            if (this._isDisabled(e.target))
                return;

            this.connect();
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

                var element = entry.target,
                    attr = "data-embed-video-facade-poster-src",
                    src = element.getAttribute(attr);
                element.removeAttribute(attr);

                this._intersectionObserver.unobserve(element);
                this._intersectionObserver.disconnect();
                this._intersectionObserver = null;

                this._applyPoster(src);
            }.bind(this));
        },
    };

    /**
     * EmbedVideoFacadeSource constructor.
     *
     * @type {EmbedVideoFacadeSource}
     */
    var EmbedVideoFacadeSource = function(parent) {
        this._init.apply(this, arguments);
    };

    /**
     * EmbedVideoFacadeSource prototype.
     *
     * @type {Object}
     */
    EmbedVideoFacadeSource.prototype = {
        /**
         * Re-assign constructor.
         *
         * @type {EmbedVideoFacadeSource}
         */
        constructor: EmbedVideoFacadeSource,

        /**
         * Constructor.
         *
         * @param  {EmbedVideoFacade} parent
         * @return {Void}
         */
        _init: function(parent) {
            this._parent = parent;
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            delete this._parent;
        },

        /**
         * Parent property getter.
         *
         * @return {EmbedVideoFacade}
         */
        get parent() {
            return this._parent;
        },

        /**
         * Name property getter:
         * this is defined at EmbedVideoFacade.registerSource.
         *
         * @return {String}
         */
        get name() {
            return "unknown";
        },

        /**
         * Is device property getter.
         *
         * @type {Boolean}
         */
        get isDevice() {
            return !!this.parent.getOption("isDevice");
        },

        /**
         * Browser supports webp image format.
         *
         * There is no "browser supports next-gen image"
         * logic, user must set this option if wants to
         * use this image format.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        get canUseWebp() {
            return !!this.parent.getOption("canUseWebp");
        },

        /**
         * Browser supports avif image format.
         *
         * There is no "browser supports next-gen image"
         * logic, user must set this option if wants to
         * use this image format.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        get canUseAvif() {
            return !!this.parent.getOption("canUseAvif");
        },

        /**
         * Parent proxy.
         *
         * Call callback (if provided) with additional
         * arguments.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _call: function(callback) {
            this.parent._call.apply(this, arguments);
        },

        /**
         * Add HTMLLinkElement to the head with preconnect
         * rel attribute.
         *
         * @param  {String} href
         * @return {Void}
         */
        _preconnect: function(href) {
            var selector = 'link[rel="preconnect"][href="' + href + '"]';
            if (document.head.querySelector(selector))
                return;

            var link = document.createElement("link");
            link.rel = "preconnect";
            link.href = href;
            link.crossorigin = true;

            document.head.appendChild(link);
        },

        /**
         * Replace (or add) URL parameter.
         *
         * @param  {String} url
         * @param  {String} key
         * @param  {String} value
         * @return {String}
         */
        _replaceUrlParam: function(url, key, value) {
            var re = new RegExp("([\?&])(" + key + ")=(.*?)(&|$)"),
                result = url.replace(re, "$1$2=" + value + "$4");

            // None found, append.
            if (!re.test(result))
                result += (result.indexOf("?") === -1 ? "?" : "&") + key + "=" + value;

            return result;
        },

        /**
         * Source test method:
         * check if current element's url belongs to
         * this source.
         *
         * @return {Boolean}
         */
        test: function() {
            return false;
        },

        /**
         * Video URL:
         * the URL that will be used on parent's connect
         * method (if null parent url will be used).
         *
         * @return {String}
         */
        url: function() {
            return null;
        },

        /**
         * Video ID.
         *
         * @return {String}
         */
        videoId: function() {
            return null;
        },

        /**
         * Get video poster image (if any).
         *
         * @param  {Function} callback
         * @return {Void}
         */
        getPoster: function(callback) {
            this._call(callback, null);
        },

        /**
         * Poster style.
         *
         * @return {String}
         */
        posterStyle: function() {
            return "background: center / contain no-repeat none #000";
        },

        /**
         * Preconnect video:
         * begin pre-connecting to warm up video load.
         *
         * @return {Void}
         */
        preconnect: function() {
            // pass
        },

        /**
         * Video width.
         *
         * @return {String}
         */
        width: function() {
            return this.parent.element.getAttribute("width") || "320";
        },

        /**
         * Video height.
         *
         * @return {String}
         */
        height: function() {
            return this.parent.element.getAttribute("height") || "240";
        },
    };

    /**
     * Register custom source.
     *
     * @param  {String} name
     * @param  {Object} options
     * @return {Void}
     */
    EmbedVideoFacade.registerSource = function(name, options) {
        // Define new source class.
        var EmbedVideoFacadeCustomSource = function(parent) {
            EmbedVideoFacadeSource.apply(this, arguments);
        }

        // Extend.
        EmbedVideoFacadeCustomSource.prototype = Object.create(EmbedVideoFacadeSource.prototype);

        // Name getter.
        Object.defineProperty(EmbedVideoFacadeCustomSource.prototype, "name", {
            value: name,
            writable: false,
        });

        // Mixin another.
        for (var prop in options) {
            var desc = Object.getOwnPropertyDescriptor(options, prop);
            Object.defineProperty(EmbedVideoFacadeCustomSource.prototype, prop, desc);
        }

        // Reassign constructor.
        EmbedVideoFacadeCustomSource.prototype.constructor = EmbedVideoFacadeCustomSource;

        // Store.
        registeredSources.push(EmbedVideoFacadeCustomSource);
    }

    // Factory result.
    return EmbedVideoFacade;
});
