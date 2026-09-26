;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationBase = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * ID global counter.
     *
     * @type {Number}
     */
    var _idCounter = 0;

    /**
     * RichTextAnimationBase.
     *
     * @param  {HTMLElement}           element HTML node
     * @param  {Object}                options (optional) see RichTextAnimationBase.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationBase}
     */
    var RichTextAnimationBase = function(element, options) {
        if (!(this instanceof RichTextAnimationBase))
            throw 'RichTextAnimationBase: RichTextAnimationBase is a constructor.';
        if (!(element instanceof HTMLElement))
            throw 'RichTextAnimationBase: element argument must be of HTMLElement type.';

        this._init(element, options || {});
    };

    /**
     * RichTextAnimationBase prototype.
     *
     * @type {Object}
     */
    RichTextAnimationBase.prototype = {
        /**
         * Default options.
         *
         * @type {Object}
         */
        DEFAULT_OPTIONS: {
            delay: 600,
            transitionDuration: null,
            loop: false,
            loopDelay: 2500,
            stylesheet: null,
        },

        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'base',

        /**
         * Store dynamic data (like status) to element data
         * attribute.
         *
         * @type {Boolean}
         */
        USE_DYNAMIC_DATA_ATTR: true,

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationBase,

        /**
         * Constructor.
         *
         * @param  {HTMLElement} element
         * @param  {Object}      options (optional)
         * @return {Void}
         */
        _init: function(element, options) {
            if (element._richTextAnimation)
                return;
            element._richTextAnimation = this;

            this._initUi(element);
            this._initOptions(options);
            this._initStylesheet();
            this._initStatus();
            this._initObserver();
            this._initCustom();

            this._isInit = true;
            this._trigger('init');
        },

        /**
         * Initialize user interface.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        _initUi: function(element) {
            this._ui = {
                element: element,
            };

            this._ui.document = element.ownerDocument;
            this._ui.window = this._ui.document.defaultView;

            element.classList.add('rich-text-animation');
            element.setAttribute('data-rich-text-animation', this.DATA_ATTR);
            element.setAttribute('data-rich-text-animation-id', this._uniqueId());
        },

        /**
         * Initialize options.
         *
         * @param  {Object} options
         * @return {Void}
         */
        _initOptions: function(options) {
            var defaults = this._getDefaultOptions();
            this._options = {};

            // Options from data attribute.
            var data = {};
            for (var key in defaults) {
                var attr = 'data-rich-text-animation-option-' + this._toSnakeCase(key, '-');
                if (this._ui.element.matches('[' + attr + ']'))
                    data[key] = this._ui.element.getAttribute(attr);
            }

            // Extend options: set each value making sure that
            // validation will be executed.
            for (var key in defaults) {
                this.setOption(key, defaults[key]);
            }
            for (var key in data) {
                this.setOption(key, data[key]);
            }
            for (var key in options) {
                this.setOption(key, options[key]);
            }
        },

        /**
         * Initialize stylesheet:
         * create stylesheet rule for each element in ui
         * so it can be easily accessed when necessary.
         *
         * @return {Void}
         */
        _initStylesheet: function() {
            this._defineStylesheetRule(this._ui.element, this.selector());
        },

        /**
         * Initialize status.
         *
         * @return {Void}
         */
        _initStatus: function() {
            this._setStatus('idle');
        },

        /**
         * Initialize intersection observer.
         *
         * There is no need to animate if the element is not
         * in viewport. Observer will take care of this.
         *
         * @return {Void}
         */
        _initObserver: function() {
            this._isObserving = false;
            this._observer = new IntersectionObserver(this._handleObserver.bind(this), {
                threshold: [ 0, 1 ],
            });

            // Store animation count (needed for intersection
            // observer).
            this._loopAnimationCount = 0;

            // Is element in viewport flag.
            this._isElementInViewport = null;

            // We can set the animation delay and delay between
            // animations (in loop mode). We need to store those
            // intervals so we can clear it on destructor.
            this._interval = null;
        },

        /**
         * Initialize custom stuff:
         * by default this does nothing, may be usefull on
         * extended class.
         *
         * @return {Void}
         */
        _initCustom: function() {
            // pass
        },

        /**
         * Destructor.
         *
         * @param  {Boolean} clearAttrs (optional)
         * @return {Void}
         */
        destroy: function(clearAttrs) {
            clearInterval(this._interval);
            this.unobserve();
            this._undefineStylesheetRule(this._ui.element);

            this._ui.element.removeAttribute('data-rich-text-animation-status');
            this._ui.element.removeAttribute('data-rich-text-animation-id');
            this._ui.element.removeAttribute('style');
            this._ui.element.classList.remove('rich-text-animation');

            if (clearAttrs) {
                this._ui.element.removeAttribute('data-rich-text-animation');

                Object.keys(this._options).forEach(function(key) {
                    this._ui.element.removeAttribute('data-rich-text-animation-option-' + this._toSnakeCase(key, '-'));
                }.bind(this));
            }

            // Clean.
            delete this._ui.element._richTextAnimation;
            delete this._isInit;
            delete this._interval;
            delete this._isElementInViewport;
            delete this._loopAnimationCount;
            delete this._isObserving;
            delete this._observer;
            delete this._status;
            delete this._options;
            delete this._ui;
        },

        /**
         * Reload (reinitialize) library.
         *
         * @param  {Boolean} observe (optional) if not provided current state will be used
         * @return {Void}
         */
        reload: function(observe) {
            var element = this._ui.element,
                options = this._options,
                isObserving = this.isObserving();

            this.destroy();
            this._init(element, options);

            if (observe || (typeof observe === 'undefined' && isObserving))
                this.observe();
        },

        /**
         * Element unique selector used for stylesheet
         * rules.
         *
         * Info: using .class[data-rich-text-animation][data-rich-text-animation-id]
         * so the stylesheet selector will be stronger than
         * default on in css file.
         *
         * @return {String}
         */
        selector: function() {
            var type = this.DATA_ATTR,
                id = this._ui.element.getAttribute('data-rich-text-animation-id');

            return '.rich-text-animation[data-rich-text-animation="' + type + '"][data-rich-text-animation-id="' + id + '"]'
        },

        /**
         * Get option.
         *
         * @param  {String} key
         * @return {Mixed}
         */
        getOption: function(key) {
            if (!key)
                return null;

            key = this._toCamelCase(key);
            if (!this._options.hasOwnProperty(key))
                return null;

            var result = this._options[key];
            if (result !== null && typeof result === 'object' && !(result instanceof HTMLElement))
                result = result instanceof Array ? result.slice() : JSON.parse(JSON.stringify(result));

            return result;
        },

        /**
         * Set option.
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Void}
         */
        setOption: function(key, value) {
            // Validate.
            key = this._toCamelCase(key);
            value = this._validateOption(key, value);
            if (typeof value === 'undefined')
                return;

            // Check if changed.
            var valueBefore = this.getOption(key);
            if (valueBefore === value)
                return;

            // Set.
            this._options[key] = value;

            // Options to element data attribute.
            if (value !== null && !(value instanceof Node)) {
                var dataValue = value;
                if (typeof value === 'object')
                    dataValue = JSON.stringify(dataValue);

                this._ui.element.setAttribute('data-rich-text-animation-option-' + this._toSnakeCase(key, '-'), dataValue);
            }
            else
                this._ui.element.removeAttribute('data-rich-text-animation-option-' + this._toSnakeCase(key, '-'));

            // Emit.
            this._trigger('option', {
                key: key,
                value: value,
                valueBefore: valueBefore,
            });
        },

        /**
         * Select element (span wrapper).
         *
         * @return {Void}
         */
        select: function() {
            var range = this._ui.document.createRange();
            range.selectNodeContents(this._ui.element);

            var selection = this._ui.window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        },

        /**
         * Serialize (options as object).
         *
         * @return {Object}
         */
        serialize: function() {
            var result = {};
            Object.keys(this._options).forEach(function(key) {
                result[key] = this.getOption(key);
            }.bind(this));

            return result;
        },

        /**
         * Start intersection observer.
         *
         * @return {Void}
         */
        observe: function() {
            if (this.isObserving())
                return;

            this._isObserving = true;
            this._isElementInViewport = null;

            this._observer.observe(this._ui.element);
            this._trigger('observe');
        },

        /**
         * Stop intersection observer.
         *
         * @return {Void}
         */
        unobserve: function() {
            if (!this.isObserving())
                return;

            this._isObserving = false;
            this._isElementInViewport = null;

            this._observer.disconnect();
            this._trigger('unobserve');
        },

        /**
         * Is intersection observer observing.
         *
         * @return {Boolean}
         */
        isObserving: function() {
            return this._isObserving;
        },

        /**
         * Is animation pending.
         *
         * @return {Boolean}
         */
        isAnimating: function() {
            return this._getStatus() === 'pending';
        },

        /**
         * Start animation.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        animate: function(callback) {
            if (this.isAnimating())
                return;

            this._setStatus('pending');
            this._trigger('animatestart');
            this._loopAnimationCount++;

            var loop = function() {
                this._interval = null;

                // Element no longer on page, autodestruct.
                if (!this._ui.element.closest('body')) {
                    this.destroy();

                    return;
                }

                // Animate
                this._backward(function() {
                    this._forward(function() {
                        var inViewport = this._isElementInViewport,
                            loopMode = this.getOption('loop');

                        if (!loopMode) {
                            this._interval = null;

                            this._setStatus('idle');
                            this._callCallback(callback);
                            this._trigger('animate');
                        }
                        else if (!inViewport)
                            this._setStatus('paused');
                        else
                            this._interval = setTimeout(loop, this.getOption('loopDelay'));
                    }.bind(this));
                }.bind(this));
            }.bind(this);

            this._interval = setTimeout(loop, this.getOption('delay'));
        },

        /**
         * Get unique id.
         *
         * @return {String}
         */
        _uniqueId: function() {
            return ++_idCounter;
        },

        /**
         * Get defaults (default options inheritance).
         *
         * @return {Object}
         */
        _getDefaultOptions: function() {
            var parent = this.__proto__,
                result = {};
            while (true) {
                for (var key in parent.DEFAULT_OPTIONS) {
                    if (!result.hasOwnProperty(key))
                        result[key] = parent.DEFAULT_OPTIONS[key];
                }

                if (parent !== RichTextAnimationBase.prototype)
                    parent = parent.__proto__;
                else
                    break;
            }

            // Convert null options to current css value.
            if (result.transitionDuration === null) {
                var style = this._ui.window.getComputedStyle(this._ui.element),
                    css = style.getPropertyValue('transition-duration');
                if (/ms$/.test(css))
                    result.transitionDuration = parseFloat(css);
                else if (/s$/.test(css))
                    result.transitionDuration = parseFloat(css) * 1000;
            }

            return result;
        },

        /**
         * Get animation status.
         *
         * @return {String}
         */
        _getStatus: function() {
            return this._status;
        },

        /**
         * Set animation status.
         *
         * @param  {String} value
         * @return {Void}
         */
        _setStatus: function(value) {
            var valueBefore = this._getStatus();
            if (value === valueBefore)
                return;

            this._status = value;
            if (this.USE_DYNAMIC_DATA_ATTR)
                this._ui.element.setAttribute('data-rich-text-animation-status', this._status);

            this._trigger('status', {
                value: this._status,
                valueBefore: valueBefore,
            });
        },

        /**
         * Get element style.
         *
         * @param  {HTMLElement} element
         * @param  {String}      property
         * @return {String}
         */
        _getElementStyle: function(element, property) {
            var style = this._ui.window.getComputedStyle(element);
            return style.getPropertyValue(property);
        },

        /**
         * Set element style:
         * apply style by setting element style attribute
         * or stylesheet (in options).
         *
         * Note: to make apply style to stylesheet work we
         * need to define stylesheet rule for each element
         * (see _initStylesheet).
         *
         * @param  {HTMLElement|NodeList} element
         * @param  {Object}               styles
         * @param  {Boolean}              force    (optional)
         * @return {Void}
         */
        _setElementStyles: function(element, styles, force) {
            if (element instanceof NodeList || element instanceof Array) {
                element.forEach(function(element) {
                    this._setElementStyles(element, styles, force);
                }.bind(this));

                return;
            }

            var stylesheet = this.getOption('stylesheet'),
                transitionDuration,
                animationDuration;

            // Disable transition/animation.
            if (force) {
                transitionDuration = element.style.transitionDuration;
                animationDuration = element.style.animationDuration;

                element.style.transitionDuration = '0s';
                element.style.animationDuratio = '0s';
            }

            // Set styles.
            var rule = element;
            if (stylesheet)
                rule = element._richTextAnimationStylesheetRule;
            for (var prop in styles) {
                rule.style.setProperty(prop, styles[prop]);
            }

            // Enable transition/animation.
            if (force) {
                // Repaint.
                element.offsetHeight;

                element.style.transitionDuration = transitionDuration;
                element.style.animationDuration = animationDuration;

                if (!element.getAttribute('style'))
                    element.removeAttribute('style');
            }
        },

        /**
         * Set element style:
         * similar as above, but instead of providing style
         * object we use property/value arguments for
         * setting singe property.
         *
         * @param  {HTMLElement|NodeList} element
         * @param  {String}               property
         * @param  {String}               value
         * @param  {Boolean}              force    (optional)
         * @return {Void}
         */
        _setElementStyle: function(element, property, value, force) {
            var styles = {};
            styles[property] = value;

            this._setElementStyles(element, styles, force);
        },

        /**
         * Set element style (see above):
         * apply style by setting element style attribute
         * or stylesheet (in options).
         *
         * @param  {HTMLElement|NodeList} element
         * @param  {String}               property
         * @param  {String}               attr
         * @return {Void}
         */
        _setElementStyleFromAttr: function(element, property, attr) {
            if (element instanceof NodeList || element instanceof Array) {
                element.forEach(function(element) {
                    this._setElementStyleFromAttr(element, property, attr);
                }.bind(this));

                return;
            }

            var value = element.getAttribute(attr);
            this._setElementStyle(element, property, value);
        },

        /**
         * Define (empty) stylesheet rule for element.
         *
         * @param  {HTMLElement}  element
         * @param  {String}       selector
         * @return {CSSStyleRule}
         */
        _defineStylesheetRule: function(element, selector) {
            var stylesheet = this.getOption('stylesheet');
            if (!stylesheet)
                return;

            // Create empty stylesheet rule.
            var sheet = stylesheet.sheet || stylesheet.styleSheet;
            sheet.insertRule(selector + ' {}', sheet.cssRules.length);

            // Store rule to element's jQuery data for easier access.
            var rule = sheet.cssRules[sheet.cssRules.length - 1];
            element._richTextAnimationStylesheetRule = rule;
        },

        /**
         * Undefine (remove) stylesheet rule for element.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        _undefineStylesheetRule: function(element) {
            var stylesheet = this.getOption('stylesheet');
            if (!stylesheet)
                return;

            var rule = element._richTextAnimationStylesheetRule;
            if (!rule)
                return;

            var sheet = stylesheet.sheet || stylesheet.styleSheet,
                index = this._toArray(sheet.cssRules).indexOf(rule);
            sheet.deleteRule(index);

            delete element._richTextAnimationStylesheetRule;
        },

        /**
         * Animation backward: reset to initial state.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _backward: function(callback) {
            throw 'RichTextAnimation: can not animate on abstract class.';
        },

        /**
         * Animation forward: start animation.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _forward: function(callback) {
            throw 'RichTextAnimation: can not animate on abstract class.';
        },

        /**
         * Uppercase first letter in string.
         *
         * @param  {String} str
         * @return {String}
         */
        _uppercaseFirst: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        /**
         * Convert string to camel case.
         *
         * @param  {String} str
         * @return {String}
         */
        _toCamelCase: function(str) {
            return str.replace(/[-_][a-z]/g, function(match) {
                return match.charAt(1).toUpperCase();
            });
        },

        /**
         * Convert string to snake case.
         *
         * @param  {String} str
         * @param  {String} delimiter (optional)
         * @return {String}
         */
        _toSnakeCase: function(str, delimiter) {
            if (typeof delimiter === 'undefined')
                delimiter = '_';

            return str.replace(/[A-Z]/g, function(match) {
                return delimiter + match.toLowerCase();
            });
        },

        /**
         * Convert array-like object to array.
         *
         * @param  {Mixed} input
         * @return {Array}
         */
        _toArray: function(input) {
            return Array.prototype.slice.call(input);
        },

        /**
         * Validate option:
         * fix value by key (or return undefined on invalid).
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Mixed}
         */
        _validateOption: function(key, value) {
            var result = value;
            if (key === 'delay' || key === 'transitionDuration' || key === 'loopDelay') {
                result = result*1;
                result = Math.min(result, 10000);
                result = Math.max(result, 100);
            }
            else if (key === 'loop') {
                if (result === 'true')
                    result = true
                else if (result === 'false')
                    result = false
                else
                    result = !!result;
            }
            else if (key === 'stylesheet' && (result instanceof HTMLStyleElement) && !this._isInit) {
                // ok
            }
            else
                result = undefined;

            return result;
        },

        /**
         * Call callback.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _callCallback: function(callback) {
            if (typeof callback === 'function')
                callback.call(this._ui.element);
        },

        /**
         * Execute trigger method (if defined) and trigger event.
         *
         * Info: event will be triggered only if instance is
         * initialized.
         *
         * @param  {String}      eventName
         * @param  {Object}      data      (optional)
         * @return {customEvent}
         */
        _trigger: function(eventName, data) {
            if (!this._isInit)
                return;

            var hook = '_trigger' + this._uppercaseFirst(eventName);
            if (typeof this[hook] === 'function')
                this[hook](data);

            var event;
            eventName = 'richtextanimation' + eventName;
            if (typeof(CustomEvent) !== "function") {
                event = this.document.createEvent("CustomEvent");
                event.initCustomEvent(eventName, false, false, data);
            }
            else
                event = new CustomEvent(eventName, { detail: data });

            this._ui.element.dispatchEvent(event);

            return event;
        },

        /**
         * Init hook (executed on class initialization):
         * triggering event is disabled before initialization,
         * making sure option hook with current option values
         * is executed.
         *
         * @param  {Object} data
         * @return {Void}
         */
        _triggerInit: function(data) {
            for (var key in this._options) {
                this._triggerOption({
                    key: key,
                    value: this._options[key],
                    valueBefore: undefined,
                });
            }
        },

        /**
         * Option hook (executed when setOption is called):
         * apply options to DOM.
         *
         * @param  {Object} data
         * @return {Void}
         */
        _triggerOption: function(data) {
            if (data && data.key === 'loop')
                this._loopAnimationCount = 0;
        },

        /**
         * Observer callback:
         * if entire element is visible (in viewport) start
         * animation, if not stop it.
         *
         * @param  {Array} e
         * @return {Void}
         */
        _handleObserver: function(e) {
            var entry = e[0],
                ratio = entry.intersectionRatio,
                loop = this.getOption('loop'),
                count = this._loopAnimationCount;

            // Flag element in viewport, so the loop mode can
            // pause (if necessary).
            this._isElementInViewport = ratio > 0;

            // Start animation?
            if ((ratio === 1 && !count) || (ratio === 1 && loop))
                this.animate();
        },
    };

    // Class as result.
    return RichTextAnimationBase;
}));
