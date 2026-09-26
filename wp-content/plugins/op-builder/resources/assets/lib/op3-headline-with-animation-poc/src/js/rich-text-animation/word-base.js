;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationWordBase = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * RichTextAnimationWordBase
     * (extends RichTextAnimationBase).
     *
     * @param  {HTMLElement}           element HTML node
     * @param  {Object}                options see RichTextAnimationWordBase.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationWordBase}
     */
    var RichTextAnimationWordBase = function(element, options) {
        RichTextAnimationBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationWordBase prototype.
     *
     * @type {Object}
     */
    RichTextAnimationWordBase.prototype = Object.assign(Object.create(RichTextAnimationBase.prototype), {
        /**
         * Default options.
         *
         * @type {Object}
         */
        DEFAULT_OPTIONS: {
            words: null,
            wordDelay: 2500,
        },

        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'word',

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationWordBase,

        /**
         * Initialize user interface.
         *
         * @param  {Element} element
         * @return {Void}
         */
        _initUi: function(element) {
            RichTextAnimationBase.prototype._initUi.apply(this, arguments);

            // Beside element, we need these as well.
            this._ui.words = [];
        },

        /**
         * Destructor.
         *
         * @param  {Boolean} clearAttrs (optional)
         * @return {Void}
         */
        destroy: function(clearAttrs) {
            // Remove word wrappers and leave only first word.
            var word = this._ui.words[0].innerText.trim();
            this._undefineWords();
            this._ui.element.innerText = word;

            RichTextAnimationBase.prototype.destroy.apply(this, arguments);
        },

        /**
         * Animation backward: reset to initial state.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _backward: function(callback) {
            var delay = this.getOption('wordDelay'),
                words = this._toArray(this._ui.words),
                current = words.filter(function(element) {
                    return this._getElementStyle(element, 'position') !== 'absolute';
                }.bind(this))
                [0];
            if (!current || !words.indexOf(current)) {
                this._callCallback(callback);
                return;
            }

            // Animate out/in current word, so the animation
            // (forward) can start from the first word.
            this._animateOut(current, function() {
                this._animateIn(this._ui.words[0], function() {
                    this._interval = setTimeout(function() {
                        this._interval = null;

                        this._callCallback(callback);
                    }.bind(this), delay);
                }.bind(this));
            }.bind(this));
        },

        /**
         * Animation forward: start animation.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _forward: function(callback) {
            var delay = this.getOption('wordDelay'),
                words = this._toArray(this._ui.words),
                loop = function(word) {
                    var index = words.indexOf(word),
                        next = words[index + 1];

                    this._animateOut(word, function() {
                        this._animateIn(next, function() {
                            if (index + 2 === words.length) {
                                this._callCallback(callback);
                                this._trigger('animate');

                                return;
                            }

                            this._interval = setTimeout(function() {
                                this._interval = null;

                                loop(next);
                            }, delay);
                        }.bind(this));
                    }.bind(this));
                }.bind(this);

            // Animate out/in each word, starting from the
            // first one.
            loop(words[0]);
        },

        /**
         * Animate out.
         *
         * @param  {HTMLElement} element  word ui element
         * @param  {Function}    callback (optional)
         * @return {Void}
         */
        _animateOut: function(element, callback) {
            throw 'RichTextAnimationWordBase: can not animate abstract class.'
        },

        /**
         * Animate in.
         *
         * @param  {HTMLElement} element  word ui element
         * @param  {Function}    callback (optional)
         * @return {Void}
         */
        _animateIn: function(element, callback) {
            throw 'RichTextAnimationWordBase: can not animate abstract class.'
        },

        /**
         * Get defaults (default options inheritance):
         * convert null options to current value from DOM.
         *
         * @return {Object}
         */
        _getDefaultOptions: function() {
            var result = RichTextAnimationBase.prototype._getDefaultOptions.apply(this, arguments);
            if (result.words === null) {
                result.words = this._toArray(this._ui.element.querySelectorAll('span')).map(function(element) {
                    return element.innerText.trim();
                });

                if (!result.words.length)
                    result.words = [ this._ui.element.innerText.trim() ];
            }

            return result;
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
            var result = RichTextAnimationBase.prototype._validateOption.apply(this, arguments);
            if (typeof result !== 'undefined')
                return result;

            // Fix value by key.
            result = value;
            if (key === 'words') {
                if (typeof result === 'string') {
                    try {
                        result = JSON.parse(result);
                    }
                    catch(e) {
                        result = [ result ];
                    }
                }

                if (!(result instanceof Array))
                    return undefined;

                result = result.filter(function(word) {
                    return !!word;
                });

                if (!(result.length))
                    result.push((this._ui.words ? this._ui.words[0].innerText.trim() : null) || 'none');
                if (result.length === 1)
                    result.push(result[0]);
            }
            else if (key === 'wordDelay') {
                result = result*1;
                result = Math.min(result, 10000);
                result = Math.max(result, 100);
            }

            return result;
        },

        /**
         * Option hook (executed when setOption is called):
         * apply options to DOM.
         *
         * @param  {Object} data
         * @return {Void}
         */
        _triggerOption: function(data) {
            RichTextAnimationBase.prototype._triggerOption.apply(this, arguments);

            if (data.key === 'transitionDuration') {
                // Can not just set transition-duration css, this will
                // animate everything: for example changing font-size
                // in optimizebuilder. To prevent that we're gonna
                // set transition-duration all to 0s, and ONLY the
                // properties we use in word animations to speciffic
                // duration from options.
                //this._setElementStyle(this._ui.element, 'transition-duration', data.value + 'ms');

                this._setElementStyle(this._ui.element, 'transition-property', 'width, opacity, transform');
                this._setElementStyle(this._ui.element, 'transition-duration', data.value + 'ms');
            }
            else if (data.key === 'words') {
                this._setStatus('idle');
                this._defineWords(data.value);

                if (this.getOption('loop') && this._isElementInViewport)
                    this.animate();
            }
        },

        /**
         * Define words:
         * remove old and add new words to DOM.
         *
         * @param  {Array} value
         * @return {Void}
         */
        _defineWords: function(value) {
            this._undefineWords();

            // Append new elements
            var selector = this.selector();
            value.forEach(function(word, index) {
                word = word.trim();

                // Create element: wrapping word with newlines, so
                // SEO doesn't interpret it (words) as single word.
                var element = this._ui.document.createElement('span');
                element.innerText = word;
                element.innerHTML = '\n' + element.innerHTML + '\n';
                element.setAttribute('data-rich-text-animation-word', element.innerText.trim());
                element.setAttribute('data-rich-text-animation-word-index', index);
                this._defineStylesheetRule(element, selector + ' [data-rich-text-animation-word-index="' + index + '"]');

                this._ui.element.appendChild(element);
            }.bind(this));

            // Store new elements.
            this._ui.words = this._ui.element.querySelectorAll('[data-rich-text-animation-word]');
        },

        /**
         * Undefine words:
         * remove old words from DOM.
         *
         * @return {Void}
         */
        _undefineWords: function() {
            this._ui.words.forEach(function(element) {
                this._undefineStylesheetRule(element);
                element.parentElement.removeChild(element);

                delete element._richTextAnimationWordSize;

                //    .off('.richtextanimation')
                // @todo?
            }.bind(this));

            // Clear interval
            clearInterval(this._interval)
            this._interval = null;

            // Empty (remove glitches).
            this._ui.element.innerHTML = '';

            // Store new elements.
            this._ui.words = [];
        },

        /**
         * Get word size:
         * return size of element [width,height] from data
         * attribute (which is 10x faster that from css),
         * or from css if there's no data attribute.
         *
         * @param  {HTMLElement} element word ui element
         * @return {Array}
         */
        _getWordSize: function(element) {
            var result = element._richTextAnimationWordSize;
            if (result)
                // Result from data.
                return result;

            // Get current style object.
            var style = element.style,
                css = this._toArray(style).reduce(function(accumulator, current) {
                    accumulator[current] = style.getPropertyValue(current);
                    return accumulator;
                }, {});

            // Disable animation/transition and make sure element
            // is visible.
            element.style.transitionDuration = '0s';
            element.style.animationDuration = '0s';
            element.style.transform = 'none';
            element.style.width = 'auto';
            element.style.height = 'auto';
            element.style.visibility = 'hidden';
            element.style.display = 'inline-block';

            // Force re-render.
            element.offsetHeight;

            // Get the element size.
            var rect = element.getBoundingClientRect();
            result = [ rect.width, rect.height ];

            // Revert css as it was.
            element.style.transform = css.transform || '',
            element.style.width = css.width || '',
            element.style.height = css.height || '',
            element.style.visibility = css.visibility || '',
            element.style.display = css.display || '',

            // Force re-render.
            element.offsetHeight;

            // Enable animation/transition.
            element.style.transitionDuration = css.transitionDuration || css['transition-duration'] || '';
            element.style.animationDuration = css.animationDuration || css['animation-duration'] || '';

            // Remove empty style attribute.
            if (!element.getAttribute('style'))
                element.removeAttribute('style');

            // Store size (only if current font is loaded).
            var doc = this._ui.document;
            if (doc.fonts && doc.fonts.check)
                try {
                    var font = this._getElementStyle(element, 'font-family').split(',').shift();
                    if (doc.fonts.check('1em ' + font)) {
                        element._richTextAnimationWordSize = result;

                        if (this.USE_DYNAMIC_DATA_ATTR)
                            element.setAttribute('data-rich-text-animation-word-size', JSON.stringify(result));
                    }
                }
                catch(ex) {
                    // pass
                }

            return result;
        },
    });

    // Class as result.
    return RichTextAnimationWordBase;
}));
