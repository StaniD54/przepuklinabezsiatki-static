;(function(window, document) {
    // Invoke strict mode.
    "use strict";

    /**
     * OP3_PopOverlay constructor.
     *
     * @param  {Window}         parent (optional)
     * @return {OP3_PopOverlay}
     */
    var OP3_PopOverlay = function(parent) {
        if (!(this instanceof OP3_PopOverlay))
            throw "OP3_PopOverlay: OP3_PopOverlay is a constructor.";

        parent = parent || window;
        if (Object.prototype.toString.call(parent) !== "[object Window]")
            throw "OP3_PopOverlay: parent argument must be of type Window.";

        this._init(parent);
    }

    /**
     * OP3_PopOverlay prototype
     *
     * @type {Object}
     */
    OP3_PopOverlay.prototype = {
        /**
         * Reasign constructor.
         *
         * @type {Void}
         */
        constructor: OP3_PopOverlay,

        /**
         * Initialize.
         *
         * @param  {Window} parent (optional)
         * @return {Void}
         */
        _init: function(parent) {
            this._parent = parent;
            this._wrapper = null;
            this._elements = null;
            this._current = null;

            this._boundHandleLoad = this._handleLoad.bind(this);
            this._boundHandleExitIntent = this._handleExitIntent.bind(this);
            this._boundHandleClick = this._handleClick.bind(this);

            this.parent.addEventListener("load", this._boundHandleLoad);
            this.parent.document.addEventListener("exitintent", this._boundHandleExitIntent);
            this.parent.document.body.addEventListener("click", this._boundHandleClick);

            this.refresh();
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            this.clearElements();

            this.parent.document.body.removeEventListener("click", this._boundHandleClick);
            this.parent.document.removeEventListener("exitintent", this._boundHandleExitIntent);
            this.parent.removeEventListener("load", this._boundHandleLoad);

            delete this._boundHandleClick;
            delete this._boundHandleExitIntent;
            delete this._boundHandleLoad;

            delete this._current;
            delete this._elements;
            delete this._wrapper;
            delete this._parent;
        },

        /**
         * Parent property getter.
         *
         * @return {Window}
         */
        get parent() {
            return this._parent;
        },

        /**
         * Parent property setter.
         *
         * @param  {Window} value
         * @return {Void}
         */
        set parent(value) {
            if (this.parent === value)
                return;

            if (Object.prototype.toString.call(value) !== "[object Window]")
                throw "OP3_PopOverlay: parent property must be of type Window.";

            this.destroy();
            this._init(value);
        },

        /**
         * Wrapper element property getter.
         *
         * @return {HTMLElement}
         */
        get wrapper() {
            if (!this._wrapper)
                this._wrapper = this.parent.document.querySelector("#op3-designer-element");

            return this._wrapper;
        },

        /**
         * Current (visible) pop overlay uuid
         * (null on no modal).
         *
         * @return {String}
         */
        get current() {
            return this._current;
        },

        /**
         * Iterate all popoverlay op3 elements and store
         * it to this._elements.
         *
         * @return {Void}
         */
        refresh: function() {
            this.clearElements();

            if (this.wrapper)
                this.wrapper.querySelectorAll('#op3-designer-element .op3-element[data-op3-element-type="popoverlay"]').forEach(function(element) {
                    this.addElement(element);
                }.bind(this));
        },

        /**
         * Clear element list.
         *
         * @return {Void}
         */
        clearElements: function() {
            if (this._elements)
                Object.keys(this._elements)
                    .map(function(uuid) {
                        return this._elements[uuid];
                    }.bind(this))
                    .forEach(function(config) {
                        if (config.interval)
                            this.parent.clearInterval(config.interval);
                    }.bind(this));

            this._elements = {};
        },

        /**
         * Add element to element list.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        addElement: function(element) {
            var config = this._getElementConfig(element);
            if (!config)
                return;

            // Reindex...
            var index = config.index;
            Object.keys(this._elements)
                .map(function(uuid) {
                    return this._elements[uuid];
                }.bind(this))
                .filter(function(config) {
                    return config.index >= index;
                })
                .forEach(function(config) {
                    config.index++;
                });

            // ...and add.
            this._elements[config.uuid] = config;
        },

        /**
         * Remove element from element list.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        removeElement: function(element) {
            var config = this._getElementConfig(element);
            if (!config)
                return;

            var current = this.current,
                uuid = config.uuid,
                index = config.index,
                interval = config.interval;
            if (current === uuid)
                this.close();
            if (interval)
                this.parent.clearInterval(interval);

            // Remove...
            delete this._elements[uuid];

            // ...and reindex.
            Object.keys(this._elements)
                .map(function(uuid) {
                    return this._elements[uuid];
                }.bind(this))
                .filter(function(config) {
                    return config.index >= index;
                })
                .forEach(function(config) {
                    config.index--;
                });
        },

        /**
         * Refresh element in element list.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        refreshElement: function(element) {
            var config = this._getElementConfig(element);
            if (!config)
                return;

            this._elements[config.uuid] = this._getElementConfig(element, true);
        },

        /**
         * Get config by uuid.
         *
         * @param  {String} uuid
         * @return {Object}
         */
        getConfig: function(uuid) {
            return (uuid in this._elements) ? this._elements[uuid] : null;
        },

        /**
         * Open pop overlay by it's uuid.
         *
         * @param  {String}   uuid
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        open: function(uuid, callback) {
            var current = this.current;
            if (current)
                return this._call(callback, null);

            var config = this._elements[uuid];
            if (!config)
                return this._call(callback, null);

            this._modalShow(config, callback);
        },

        /**
         * Close current pop overlay (if any).
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        close: function(callback) {
            var current = this.current;
            if (!current) {
                this._call(callback, null);
                return;
            }

            this._modalHide(this._elements[current], callback);
        },

        /**
         * Is device.
         *
         * @type {Boolean}
         */
        _isDevice: !!(navigator.maxTouchPoints || "ontouchstart" in document.documentElement),

        /**
         * Call callback
         *
         * @return {Void}
         */
        _call: function(callback) {
            if (typeof callback !== "function")
                return;

            var args = Array.prototype.slice.call(arguments, 1);
            callback.apply(this, args);
        },

        /**
         * Get element config.
         *
         * @param  {HTMLElement} element
         * @param  {Boolean}     force
         * @return {Void}
         */
        _getElementConfig: function(element, force) {
            if (!force) {
                var uuid = element.getAttribute("data-op3-uuid"),
                    config = this.getConfig(uuid);
                if (config)
                    return config;
            }

            var content = element.querySelector(".op3-popoverlay-content"),
                videoElements = element.querySelectorAll('[data-op3-element-type="video"] iframe, [data-op3-element-type="video"] video'),
                soundcloudElements = element.querySelectorAll('[data-op3-element-type="soundcloud"] iframe'),
                index = Array.prototype.slice.call(this.wrapper.querySelectorAll('#op3-designer-element > [data-op3-children] > .op3-element[data-op3-element-type="popoverlay"]')).indexOf(element),
                uuid = element.getAttribute("data-op3-uuid"),
                name = content.getAttribute("data-op3-text"),
                animationStyle = content.getAttribute("data-op-animation"),
                animationDuration = 0,
                triggerEvent = content.getAttribute("data-op-animation-trigger") || "none",
                useOnDevices = !!(content.getAttribute("data-op3-use-on-devices")*1),
                delayTimer = 0,
                cookieExpires = content.getAttribute("data-op3-cookie-expires")*1 || 0;

            // Reset effect.
            element.className = element.className
                .replace(/(^|\s)op3-popoverlay-effect-\S+/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            element.className += (element.className ? " " : "")
                + "op3-popoverlay-effect-" + animationStyle;

            // Get animation duration.
            var style = window.getComputedStyle(content);
            animationDuration = parseFloat(style.getPropertyValue("animation-duration")) || parseFloat(style.getPropertyValue("transition-duration")) || 0;

            // Convert string timer to ms.
            var timer = content.getAttribute("data-op-timer") || "0sec";
            if (timer && timer.indexOf("sec") > -1)
                delayTimer = parseInt(timer) * 1000;
            else if (timer && timer.indexOf("min") > -1)
                delayTimer = parseInt(timer) * 1000 * 60;

            // Config result.
            return {
                element: element,
                content: content,
                videoElements: videoElements,
                soundcloudElements: soundcloudElements,
                interval: null,
                index: index,
                uuid: uuid,
                name: name,
                animationStyle: animationStyle,
                animationDuration: animationDuration,
                triggerEvent: triggerEvent,
                useOnDevices: useOnDevices,
                delayTimer: delayTimer,
                cookieExpires: cookieExpires,
            };
        },

        /**
         * Animate modal show.
         *
         * @param  {Object}   config
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _modalShow: function(config, callback) {
            var element = config.element,
                wrapper = this.wrapper,
                handler = function(e) {
                    if (e && e.target !== config.content)
                        return;

                    if (e) {
                        e.target.removeEventListener("transitionend", handler);
                        e.target.removeEventListener("animationend", handler);
                    }

                    this._call(callback, config);
                }.bind(this);

            // Flag current.
            this._current = config.uuid;

            // Add active class to wrapper.
            wrapper.classList.add("op3-popoverlay-active");

            // Clear.
            element.classList.remove("op3-popoverlay-hide");
            element.classList.remove("op3-popoverlay-show")
            element.style.display =  "block";

            // Repaint.
            element.offsetHeight;

            // Start animation.
            element.classList.add("op3-popoverlay-show");

            // Callback.
            if (config.animationDuration && element.parentElement) {
                config.content.addEventListener("transitionend", handler);
                config.content.addEventListener("animationend", handler);
            }
            else
                handler();

            this._videoStart();
            this._soundcloudStart();
        },

        /**
         * Animate modal hide.
         *
         * @param  {Object}   config
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _modalHide: function(config, callback) {
            var element = config.element,
                wrapper = this.wrapper,
                handler = function(e) {
                    if (e && e.target !== config.content)
                        return;

                    if (e) {
                        e.target.removeEventListener("transitionend", handler);
                        e.target.removeEventListener("animationend", handler);
                    }

                    this._current = null;

                    wrapper.classList.remove("op3-popoverlay-active");
                    element.classList.remove("op3-popoverlay-show");
                    element.style.display = "none";

                    this._call(callback, config);
                }.bind(this);

            // Clear interval.
            if (config.interval) {
                this.parent.clearInterval(config.interval);
                config.interval = null;
            }

            // Start animation.
            element.classList.remove("op3-popoverlay-show");
            element.classList.add("op3-popoverlay-hide");

            // Callback.
            if (config.animationDuration && element.parentElement) {
                config.content.addEventListener("transitionend", handler);
                config.content.addEventListener("animationend", handler);
            }
            else
                handler();

            this._videoStop();
            this._soundcloudStop();
        },

        /**
         * Popup (open) modal (if cookies allows to do so).
         *
         * @param  {Object} config
         * @return {Void}
         */
        _popup: function(config) {
            var cookieName = "op3-popoverlay-" + OP3.Meta.pageId + "-" + config.uuid,
                cookieValue = OP3.Cookie.get(cookieName);
            if (cookieValue)
                return;

            if (config.cookieExpires)
                OP3.Cookie.set(cookieName, "1", { expires: config.cookieExpires });

            this.open(config.uuid);
        },

        /**
         * Start op3 video element.
         *
         * @return {Void}
         */
        _videoStart: function() {
            this.getConfig(this.current).videoElements.forEach(function(element) {
                if (element.matches("[data-embed-video-facade-src]"))
                    return;

                var wrapper = element.closest(".op3-video-wrapper"),
                    oldSrc = element.getAttribute("src"),
                    newSrc = wrapper.getAttribute("data-op3-src");

                if (!oldSrc && newSrc)
                    element.setAttribute("src", newSrc);

                // Hide image overlay on autoplay.
                if (wrapper.matches('[data-op3-video-autoplay="1"]')) {
                    var overlay = wrapper.closest(".op3-element").querySelector(".op3-video-image-overlay");
                    if (overlay)
                        overlay.style.display = "none";
                }
            });
        },

        /**
         * Stop op3 video element.
         *
         * @return {Void}
         */
        _videoStop: function() {
            this.getConfig(this.current).videoElements.forEach(function(element) {
                if (element.matches("[data-embed-video-facade-src]"))
                    return;

                var wrapper = element.closest(".op3-video-wrapper"),
                    oldSrc = element.getAttribute("src"),
                    newSrc = wrapper.getAttribute("data-op3-src");

                // https://optimizepress.atlassian.net/browse/OP3-2426
                if (wrapper.getAttribute("data-op3-video-source") === "embed")
                    wrapper.setAttribute("data-op3-src", oldSrc);

                if (newSrc)
                    element.setAttribute("src", "");
            });
        },

        /**
         * Start op3 soundcloud element.
         *
         * @return {Void}
         */
        _soundcloudStart: function() {
            this.getConfig(this.current).soundcloudElements.forEach(function(element) {
                var oldSrc = element.getAttribute("src"),
                    newSrc = element.getAttribute("data-op3-src");

                if (oldSrc)
                    element.setAttribute("data-op3-src", oldSrc);
                if (!oldSrc && newSrc)
                    element.setAttribute("src", newSrc);
            });
        },

        /**
         * Stop op3 soundcloud element.
         *
         * @return {Void}
         */
        _soundcloudStop: function() {
            this.getConfig(this.current).soundcloudElements.forEach(function(element) {
                element.setAttribute("src", "");
            });
        },

        /**
         * Window load event handler:
         * open every element that has triggerEvent load or
         * load_delay.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleLoad: function(e) {
            Object.keys(this._elements)
                .map(function(uuid) {
                    return this._elements[uuid];
                }.bind(this))
                .filter(function(config) {
                    var triggerEvent = config.triggerEvent;

                    return false
                        || (triggerEvent === "load" || triggerEvent === "load_delay")
                        || (triggerEvent === "exitintent" && this._isDevice && config.useOnDevices);
                }.bind(this))
                .forEach(function(config) {
                    var triggerEvent = config.triggerEvent,
                        useOnDevices = config.useOnDevices,
                        delayTimer = triggerEvent !== "exitintent" ? config.delayTimer : 0;

                    config.interval = this.parent.setTimeout(this._popup.bind(this, config), delayTimer);
                }.bind(this));
        },

        /**
         * Document exitintent event handler:
         * open every element that has triggerEvent exitintent.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleExitIntent: function(e) {
            Object.keys(this._elements)
                .map(function(uuid) {
                    return this._elements[uuid];
                }.bind(this))
                .filter(function(config) {
                    return config.triggerEvent === "exitintent" && !this._isDevice;
                }.bind(this))
                .forEach(function(config) {
                    var triggerEvent = config.triggerEvent,
                        useOnDevices = config.useOnDevices,
                        delayTimer = triggerEvent !== "exitintent" ? config.delayTimer : 0;

                    config.interval = this.parent.setTimeout(this._popup.bind(this, config), delayTimer);
                }.bind(this));
        },

        /**
         * Document body click event handler:
         * proxy for _handleClickOpen/_handleClickClose.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleClick: function(e) {
            if (e.target.closest('[data-op3-action="popoverlay"],[data-op-action="popoverlay"]'))
                this._handleClickOpen(e);
            if (e.target.closest('.op3-popoverlay-background,.op3-popoverlay-close,[data-op-action="closePopoverlay"]'))
                this._handleClickClose(e);
        },

        /**
         * Document body click event handler:
         * open popoverlay.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleClickOpen: function(e) {
            e.preventDefault();

            var target = e.target.closest('[data-op3-action="popoverlay"],[data-op-action="popoverlay"]'),
                uuid = target.getAttribute("data-op-popoverlay-trigger") || target.getAttribute("data-op3-popoverlay-trigger"),
                config = this._elements[uuid];;
            if (!config)
                return;

            // Close current modal (if any), and then open
            // new one.
            this.close(function() {
                this.open(uuid);
            }.bind(this));
        },

        /**
         * Document body click event handler:
         * close popoverlay.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleClickClose: function(e) {
            e.preventDefault();

            var element = e.target.closest('[data-op3-element-type="popoverlay"]'),
                uuid = element.getAttribute("data-op3-uuid"),
                current = this.current;
            if (uuid !== current)
                return;

            // Close current modal.
            this.close();
        },
    };

    // Globalize popoverlay.
    window.OP3 = window.OP3 || {};
    OP3.PopOverlay = new OP3_PopOverlay();
})(window, document);
