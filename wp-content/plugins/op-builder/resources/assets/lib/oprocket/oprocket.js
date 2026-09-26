/**
 * OPRocket:
 * delay javascript execution on script[type="oprocket"]
 * elements until user interaction.
 *
 * Note:
 * This small file (it should be minimized on production) is
 * used on every OPB frontend page (if enabled in settings).
 * It is added as internal <script> inside <head> DOM element.
 */
;(function() {
    /**
     * OPRocket class.
     *
     * Delay javascript execution on script[type="oprocket"]
     * elements until user interaction.
     *
     * To make this work we need to alter html markup: for each
     * script element that you wish to delay change type attribute
     * to oprocket, and preserve original type in data-oprocket-type
     * attribute.
     *
     * For example we should change this:
     *      <script><\/script>
     * ...with this:
     *      <script type="oprocket"><\/script>
     *
     * And this:
     *      <script type="text/javascript" src="//path/to/script.js"><\/script>
     * ...with this:
     *      <script type="oprocket" data-oprocket-type="text/javascript" src="//path/to/script.js"><\/script>
     *
     * Instance listener will be automatically started, so no
     * need to do anything here, except include this script
     * (without type attribute) to your document head ...
     */
    var OPRocket = function() {
        // Not a global class, we can disable this check...
        //if (!(this instanceof OPRocket))
        //    throw "OPRocket: OPRocket is a constructor.";

        this._init();
    };

    /**
     * OPRocket prototype.
     *
     * @type {Object}
     */
    OPRocket.prototype = {
        /**
         * Reassign constructor.
         *
         * @type {OPRocket}
         */
        constructor: OPRocket,

        /**
         * Constructor.
         *
         * @return {Void}
         */
        _init: function() {
            // Properties.
            this._domContentLoadedDispatched = false;
            this._windowLoadDispatched = false;
            this._isListening = false;

            // Status (waiting/loading/loaded)
            this._status = "waiting";

            // User interaction event names and listener options.
            this._userInteractionEvents = [
                "keydown",
                "mousedown",
                "mousemove",
                "touchmove",
                "touchstart",
                "touchend",
                "touchcancel",
                "touchforcechange",
            ];
            this._eventListenerOptions = {
                passive: true,
            };

            // Registrated scripts object: store each HTMLScriptElement
            // on page so we can replace it with elements that has real
            // type attributes on user intaraction.
            this._registratedScripts = {
                normal: [],
                async: [],
                defer: []
            };

            // jQuery scripts need special handling.
            this._jQueryScripts = [];

            // Bound event handlers.
            this._boundHandleUserInteraction = this._handleUserInteraction.bind(this);
        },

        /**
         * Destructor.
         *
         * Info: since method is not used by OPRocket, we can
         * disable it...
         *
         * @return {Void}
         * /
        destroy: function() {
            // Remove event listeners.
            this.unlisten();

            // Clean.
            delete this._boundHandleUserInteraction;
            delete this._jQueryScripts;
            delete this._registratedScripts;
            delete this._eventListenerOptions;
            delete this._userInteractionEvents;
            delete this._status;
            delete this._isListening;
            delete this._windowLoadDispatched;
            delete this._domContentLoadedDispatched;
        },

        /**
         * Status:
         * waiting/loading/loaded.
         *
         * @return {String}
         */
        get status() {
            return this._status;
        },

        /**
         * Is DOM content loaded.
         *
         * @return {Boolean}
         */
        get isDOMContentLoaded() {
            return this._domContentLoadedDispatched;
        },

        /**
         * Is window load.
         *
         * @return {Boolean}
         */
        get isWindowLoad() {
            return this._windowLoadDispatched;
        },

        /**
         * Is listening property getter.
         *
         * @return {Boolean}
         */
        get isListening() {
            return this._isListening;
        },

        /**
         * Load scripts.
         *
         * @return {Void}
         */
        load: function() {
            if (this.status !== "waiting")
                return;

            // Remove event listener.
            this.unlisten();

            // Load all.
            this._status = "loading";
            if (document.readyState === "loading")
                document.addEventListener("DOMContentLoaded", this._loadAll.bind(this));
            else
                this._loadAll();
        },

        /**
         * Add user interaction event listener.
         *
         * @return {Void}
         */
        listen: function() {
            if (this.isListening || this.status !== "waiting")
                return;

            // Add event listeners.
            this._userInteractionEvents.forEach(function(eventName) {
                window.addEventListener(eventName, this._boundHandleUserInteraction, this._eventListenerOptions);
            }.bind(this));

            // Flag listening.
            this._isListening = true;
        },

        /**
         * Remove user interaction event listener.
         *
         * @return {Void}
         */
        unlisten: function() {
            if (!this.isListening)
                return;

            // Remove event listeners.
            this._userInteractionEvents.forEach(function(eventName) {
                window.removeEventListener(eventName, this._boundHandleUserInteraction, this._eventListenerOptions);
            }.bind(this));

            // Flag listening.
            this._isListening = false;
        },

        /**
         * Is type valid script type.
         *
         * @param  {String}  type
         * @return {Boolean}
         */
        _isValidScriptType: function(type) {
            var valid = [
                "text/javascript",
                "text/x-javascript",
                "text/ecmascript",
                "text/jscript",
                "application/javascript",
                "application/x-javascript",
                "application/ecmascript",
                "application/jscript",
                "module",
            ];

            // Empty type defaults to text/javascript.
            return !type
                || typeof type === "string" && valid.indexOf(type.toLowerCase()) !== -1;
        },

        /**
         * Apply callback:
         * execute callback if callback is function.
         *
         * @param  {Function} callback
         * @param  {Array}    args     (optional)
         * @return {Void}
         */
        _applyCallback: function(callback, args) {
            if (typeof callback === "function")
                callback.apply(this, args);
        },

        /**
         * Delay callback (using requestAnimationFrame).
         *
         * @param  {Function} callback
         * @param  {Array}    args     (optional)
         * @return {Void}
         */
        _delayCallback: function(callback, args) {
            window.requestAnimationFrame(function() {
                this._applyCallback(callback, args);
            }.bind(this));
        },

        /**
         * Dispatch custom event.
         *
         * @param  {HTMLElement} element
         * @param  {String}      eventName
         * @return {Event}
         */
        _dispatchCustomEvent: function(element, eventName) {
            eventName = "oprocket-" + eventName;

            var event;
            if (typeof Event !== "function") {
                event = document.createEvent("Event");
                event.initEvent(eventName, false, false);
            }
            else
                event = new Event(eventName);

            element.dispatchEvent(event);

            return event;
        },

        /**
         * Load all.
         *
         * @return {Void}
         */
        _loadAll: function() {
            this._delayEventListeners();
            this._delayOnEvents();
            this._delayJQueryEvents();
            this._delayDocumentWrite();
            this._registerScripts();
            this._preloadScripts();

            // This part is done asynchrony.
            this._loadScripts(function() {
                this._dispatchDOMContentLoaded(function() {
                    this._dispatchWindowLoad(function() {
                        this._status = "loaded";

                        this._dispatchCustomEvent(window, "allScriptsLoaded");
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        },

        /**
         * Delay event listeners:
         * override event listener methods for:
         *      - document.DOMContentLoaded
         *      - window.DOMContentLoaded
         *      - window.load
         *      - window.pageshow
         *      - document.readystatechange
         *
         * Do we really need Map for event storage? Since we only need
         * document and window object as key, we can use plain object
         * here. Using node as key will convert key to node's string
         * representation of object ("[object HTMLDocument]" and
         * "[object Window]" in our case). So, in our case it is
         * safe to use plain object for event storage...
         *
         * @return {Void}
         */
        _delayEventListeners: function() {
            var win = window,
                doc = document,
                eventStorage = {},
                override = function(element, eventName) {
                    var prefixEventName = function(args) {
                        args = Array.prototype.slice.call(args);
                        args[0] = eventStorage[element].eventsToRewrite.indexOf(args[0]) >= 0 ? "oprocket-" + args[0] : args[0];

                        return args;
                    };

                    // Store current element to event storage.
                    if (!(element in eventStorage)) {
                        eventStorage[element] = {
                            originalFunctions: {
                                add: element.addEventListener,
                                remove: element.removeEventListener
                            },
                            eventsToRewrite: [],
                        };

                        // Override addEventListener/removeEventListener.
                        element.addEventListener = function() {
                            eventStorage[element].originalFunctions.add.apply(element, prefixEventName(arguments));
                        };
                        element.removeEventListener = function() {
                            eventStorage[element].originalFunctions.remove.apply(element, prefixEventName(arguments));
                        };
                    }

                    // Store current event to event storage.
                    eventStorage[element].eventsToRewrite.push(eventName);
                };

            // Do override magic.
            override(doc, "DOMContentLoaded");
            override(win, "DOMContentLoaded");
            override(win, "load");
            override(win, "pageshow");
            override(doc, "readystatechange");
        },

        /**
         * Delay on events:
         * override event listener methods for:
         *      - document.onreadystatechange
         *      - window.onload
         *      - window.onpageshow
         *
         * @return {Void}
         */
        _delayOnEvents: function() {
            var win = window,
                doc = document,
                override = function(element, eventName) {
                    Object.defineProperty(element, eventName, {
                        get: function() {
                            return element["oprocket" + eventName] || element[eventName] || function() {};
                        },
                        set: function(fn) {
                            element["oprocket" + eventName] = fn;
                        },
                    });
                };

            // Do override magic.
            override(doc, "onreadystatechange");
            override(win, "onload");
            override(win, "onpageshow");
        },

        /**
         * Delay jQuery events:
         * override event listener methods for:
         *      - document.DOMContentLoaded
         *      - window.load
         *
         * ...and tweak jQuery's document.ready method.
         *
         * @return {Void}
         */
        _delayJQueryEvents: function() {
            var instance = this,
                scripts = instance._jQueryScripts,
                win = window,
                doc = document,
                jQuery = win.jQuery;

            Object.defineProperty(win, "jQuery", {
                get: function() {
                    return jQuery;
                },
                set: function(value) {
                    if (value && value.fn && scripts.indexOf(value) === -1) {
                        // Prefix window.load and document.DOMContentLoaded events
                        // (the events will be dispatched later along with all
                        // other event listeners).
                        var originalOn = value.fn.on;
                        value.fn.on = value.fn.init.prototype.on = function() {
                            var args = Array.prototype.slice.call(arguments);
                            if (typeof args[0] === "string" || args[0] instanceof String) {
                                var re
                                if (this[0] instanceof Window)
                                    re = /^(load)(\.|$)/
                                else if (this[0] instanceof Document)
                                    re = /^(DOMContentLoaded)(\.|$)/

                                if (re)
                                    args[0] = args[0]
                                        .split(" ")
                                        .map(function(eventName) {
                                            return eventName.replace(re, "oprocket-$1$2");
                                        })
                                        .join(" ");
                            }

                            originalOn.apply(this, args);

                            return this;
                        };

                        // Tweak document ready (callback to document.DOMContentLoaded).
                        value.fn.ready = value.fn.init.prototype.ready = function(callback) {
                            if (instance.isDOMContentLoaded)
                                callback.call(doc, value);
                            else
                                jQuery(doc).on("DOMContentLoaded", function(e) {
                                    callback.call(this, value);
                                });

                            return this;
                        };

                        scripts.push(value);
                    }

                    jQuery = value;
                },
            });
        },

        /**
         * Delay document.write and document.writeln.
         *
         * @return {Void}
         */
        _delayDocumentWrite: function() {
            var doc = document,
                original = doc.write;

            doc.write = function(markup) {
                var script = doc.currentScript;
                if (!script) {
                    // Because document.write() writes to the document stream,
                    // calling document.write() on a closed (loaded) document
                    // automatically calls document.open(), which will clear
                    // the document.
                    original.apply(this, arguments);

                    return
                }

                var parent = script.parentElement,
                    top = parent,
                    target = script.nextSibling,
                    range = doc.createRange(),
                    fragment = doc.createDocumentFragment();
                range.setStart(fragment, 0);
                fragment.appendChild(range.createContextualFragment(markup));

                // If script is in head we need to prepend markup to body.
                while (top && ["HEAD", "BODY"].indexOf(top.tagName) === -1)
                    top = top.parentElement;
                if (top && top.tagName === "HEAD") {
                    parent = doc.body;
                    target = parent.firstChild;
                }

                if (target)
                    parent.insertBefore(fragment, target);
                else
                    parent.appendChild(fragment);
            };

            doc.writeln = function(line) {
                doc.write(line + "\n");
            };
        },

        /**
         * Register script:
         * get all oprocket scripts on document and store it to
         * this._registratedScripts object.
         *
         * @return {Void}
         */
        _registerScripts: function() {
            var registratedScripts = this._registratedScripts;

            document.querySelectorAll('script[type="oprocket"]').forEach(function(element) {
                if (element.hasAttribute("src")) {
                    if (element.hasAttribute("async") && element.async)
                        registratedScripts.async.push(element);
                    else if ((element.hasAttribute("defer") && element.defer) || element.getAttribute("data-oprocket-type") === "module")
                        registratedScripts.defer.push(element);
                    else
                        registratedScripts.normal.push(element);
                }
                else
                    registratedScripts.normal.push(element);
            }.bind(this));
        },

        /**
         * Preload registrated scripts:
         * add link[rel="preload"] to document head for each
         * registrated script.
         *
         * @return {Void}
         */
        _preloadScripts: function() {
            var registratedScripts = this._registratedScripts;

            // Iterate all registrated scripts (first normal,
            // then defer and async last).
            [].concat(registratedScripts.normal, registratedScripts.defer, registratedScripts.async).forEach(function(element) {
                var src = element.getAttribute("src");
                if (!src)
                    return;

                // Create link...
                var doc = document;
                    link = doc.createElement("link");
                link.href = src;
                link.rel = "preload";
                link.as = "script";

                // ...and append it to DOM.
                doc.head.appendChild(link);
            }.bind(this));
        },

        /**
         * Asynchrony load registrated scripts:
         * replace each registrated script with it's clone
         * (using valid type attribute).
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _loadScripts: function(callback) {
            var registratedScripts = this._registratedScripts,
                scriptList = [].concat(registratedScripts.normal, registratedScripts.defer, registratedScripts.async),
                loop = function() {
                    var element = scriptList.shift();
                    if (typeof element === "undefined") {
                        this._applyCallback(callback);

                        return;
                    }

                    this._delayCallback(function() {
                        var script = document.createElement("script"),
                            type;

                        // Iterate element attributes.
                        Array.prototype.slice.call(element.attributes).forEach(function(attr) {
                            var key = attr.nodeName;
                            if (key === "type")
                                return;

                            var value = attr.nodeValue;
                            if (key === "data-oprocket-type") {
                                key = "type";
                                type = value;
                            }

                            // Apply attribute key/value to newly created script.
                            script.setAttribute(key, value);
                        });

                        // Loop on load.
                        if (element.hasAttribute("src") && this._isValidScriptType(type)) {
                            script.addEventListener("load", loop);
                            script.addEventListener("error", loop);
                        }
                        else {
                            script.text = element.text;
                            loop();
                        }

                        // Replace old element with newly created script.
                        element.parentNode.replaceChild(script, element);
                    }.bind(this));
                }.bind(this);

            // Load first registrated script loop.
            loop();
        },

        /**
         * Asynchrony displatch DOMContentLoaded event.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _dispatchDOMContentLoaded: function(callback) {
            var delay = this._delayCallback.bind(this),
                win = window,
                doc = document;

            // Dispatch DOMContentLoaded.
            delay(function() {
                this._dispatchCustomEvent(doc, "DOMContentLoaded");

                delay(function() {
                    this._dispatchCustomEvent(win, "DOMContentLoaded");

                    delay(function() {
                        var event = this._dispatchCustomEvent(doc, "readystatechange");
                        if (typeof doc.oprocketonreadystatechange === "function")
                            doc.oprocketonreadystatechange.call(doc, event);

                        delay(function() {
                            this._applyCallback(callback);
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));

            // Flag DOMContentLoaded dispatched.
            this._domContentLoadedDispatched = true;
        },

        /**
         * Asynchrony displatch window load event.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _dispatchWindowLoad: function(callback) {
            var delay = this._delayCallback.bind(this),
                win = window;

            // Dispatch window load.
            delay(function() {
                var event = this._dispatchCustomEvent(win, "load");
                if (typeof win.oprocketonload === "function")
                    win.oprocketonload.call(win, event);

                delay(function() {
                    var event = this._dispatchCustomEvent(win, "pageshow");
                    if (typeof win.oprocketonpageshow === "function")
                        win.oprocketonpageshow.call(win, event);

                    delay(function() {
                        this._applyCallback(callback);
                    }.bind(this));
                }.bind(this));
            }.bind(this));

            // Flag window load dispatched.
            this._windowLoadDispatched = true;
        },

        /**
         * User interaction event handler:
         * load.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleUserInteraction: function(e) {
            this._dispatchCustomEvent(window, "userInteraction");

            this.load();
        },
    };

    // Run, run, run...
    (new OPRocket()).listen();
})();
