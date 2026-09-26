;(function($, window, document, undefined) {
    /**
     * Strict mode.
     */
    'use strict';

    /**
     * RichTextAnimationBase.
     *
     * @type {RichTextAnimationBase}
     */
    var RichTextAnimationBase = $('<span />').richTextAnimation().data('jquery-rich-text-animation').__proto__.constructor;

    /**
     * RichTextAnimationWord
     * (extends RichTextAnimationBase).
     *
     * @param  {Node}                       element HTML node
     * @param  {Object}                     options see RichTextAnimationWord.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationWord}
     */
    var RichTextAnimationWord = function(element, options) {
        RichTextAnimationBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationWord prototype.
     *
     * @type {Object}
     */
    RichTextAnimationWord.prototype = $.extend(Object.create(RichTextAnimationBase.prototype), {
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
         * @type {RichTextAnimationWord}
         */
        constructor: RichTextAnimationWord,

        /**
         * Initialize user interface.
         *
         * @param  {Element} element
         * @return {Void}
         */
        _initUi: function(element) {
            RichTextAnimationBase.prototype._initUi.apply(this, arguments);

            // Beside element, we need these as well
            this._$ui.words = $(null);
        },

        /**
         * Destructor.
         *
         * @param  {Boolean} clearAttrs (optional)
         * @return {Void}
         */
        destroy: function(clearAttrs) {
            // Remove word wrappers and leave only first word
            var word = this._$ui.words.eq(0).text().trim();
            this._undefineWords();
            this._$ui.element
                .html(word);

            RichTextAnimationBase.prototype.destroy.apply(this, arguments);
        },

        /**
         * Animation backward: reset to initial state.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _backward: function(callback) {
            var $current = this._$ui.words.filter(function() {
                return $(this).css('position') !== 'absolute';
            });
            if (!$current.index()) {
                this._callCallback(callback);
                return;
            }

            // Animate out/in current word, so the animation
            // (forward) can start from the first word.
            this._animateOut($current, function() {
                this._animateIn(this._$ui.words.eq(0), function() {
                    this._interval = setTimeout(function() {
                        this._interval = null;

                        this._callCallback(callback);
                    }.bind(this), this.getOption('wordDelay'));
                }.bind(this));
            }.bind(this));
        },

        /**
         * Animation forward: start animation.
         *
         * @param  {Function} callback
         * @return {Void}
         */
        _forward: function(callback) {
            var loop = function($word) {
                var $next = $word.next();
                this._animateOut($word, function() {
                    this._animateIn($next, function() {
                        if (!$next.next().length) {
                            this._callCallback(callback);
                            this._trigger('animate');

                            return;
                        }

                        this._interval = setTimeout(function() {
                            this._interval = null;

                            loop($next);
                        }, this.getOption('wordDelay'));
                    }.bind(this));
                }.bind(this));
            }.bind(this);

            // Animate out/in each word, starting from the
            // first one.
            loop(this._$ui.words.eq(0));
        },

        /**
         * Animate out.
         *
         * @param  {Node}     node     word ui element
         * @param  {Function} callback
         * @return {Void}
         */
        _animateOut: function(node, callback) {
            throw 'RichTextAnimationWord: can not animate abstract class.'
        },

        /**
         * Animate in.
         *
         * @param  {Node}     node     word ui element
         * @param  {Function} callback
         * @return {Void}
         */
        _animateIn: function(node, callback) {
            throw 'RichTextAnimationWord: can not animate abstract class.'
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
                result.words = this._$ui.element
                    .find('span')
                    .map(function() {
                        return $(this).text().trim();
                    })
                    .toArray();

                if (!result.words.length)
                    result.words = [ this._$ui.element.text().trim() ];
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

            // Fix value by key
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
                    result.push((this._$ui.words ? this._$ui.words.eq(0).text().trim() : null) || 'none');
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
                //this._setElementStyle(this._$ui.element, 'transition-duration', data.value + 'ms');

                this._setElementStyle(this._$ui.element, 'transition-property', 'width, opacity, transform');
                this._setElementStyle(this._$ui.element, 'transition-duration', data.value + 'ms');
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
                $('<span />')
                    // Wrapping word with newlines, so SEO doesn't
                    // interpret it (words) as single word.
                    .text('\n' + word + '\n')
                    .attr('data-rich-text-animation-word', function() {
                        return $(this).text().trim();
                    })
                    .attr('data-rich-text-animation-word-index', index)
                    .each(function(index_, element) {
                        this._defineStylesheetRule(element, selector + ' [data-rich-text-animation-word-index="' + index + '"]');
                    }.bind(this))
                    .appendTo(this._$ui.element);
            }.bind(this));

            // Store new elements
            this._$ui.words = this._$ui.element
                .find('[data-rich-text-animation-word]');
        },

        /**
         * Undefine words:
         * remove old words from DOM.
         *
         * @return {Void}
         */
        _undefineWords: function() {
            // Clean data
            this._$ui.words
                .off('.richtextanimation')
                .each(function(index, node) {
                    this._undefineStylesheetRule(node);
                }.bind(this))
                .remove();

            // Clear interval
            clearInterval(this._interval)
            this._interval = null;

            // Empty (remove glitches)
            this._$ui.element
                .empty();

            // Store new elements
            this._$ui.words = $(null);
        },

        /**
         * Get word size:
         * return size of element [width,height] from data
         * attribute (which is 10x faster that from css),
         * or from css if there's no data attribute.
         *
         * @param  {Node}  node word ui element
         * @return {Array}
         */
        _getWordSize: function(node) {
            var $node = $(node),
                result = $node.data('rich-text-animation-word-size');
            if (result)
                // Result from data
                return result;

            // Get current style object
            var style = $node.prop('style'),
                css = Array.prototype.slice.call(style).reduce(function(accumulator, current) {
                    accumulator[current] = style.getPropertyValue(current);
                    return accumulator;
                }, {});

            // ...disable animation/transition and make sure
            // element is visible
            $node
                .css({
                    transitionDuration: '0s',
                    animationDuration: '0s',
                    transform: 'none',
                    width: 'auto',
                    height: 'auto',
                    visibility: 'hidden',
                    display: 'inline-block',
                })
                // force re-render
                .prop('offsetHeight');

            // ...get the element size
            var rect = $node.get(0).getBoundingClientRect();
            result = [ rect.width, rect.height ];

            // ...revert css as it was
            $node
                .css({
                    transform: css.transform || '',
                    width: css.width || '',
                    height: css.height || '',
                    visibility: css.visibility || '',
                    display: css.display || '',
                })
                // force re-render
                .prop('offsetHeight');

            // ...and enable animation/transition
            $node
                .css({
                    transitionDuration: css.transitionDuration || css['transition-duration'] || '',
                    animationDuration: css.animationDuration || css['animation-duration'] || '',
                });

            // Remove empty style attribute
            if (!$node.attr('style'))
                $node.removeAttr('style');

            // Store size (only if current font is loaded)
            var doc = $node.prop('ownerDocument');
            if (doc.fonts && doc.fonts.check)
                try {
                    var font = $node.css('font-family').split(',').shift();
                    if (doc.fonts.check('1em ' + font)) {
                        $node.data('rich-text-animation-word-size', result);

                        if (this.USE_DYNAMIC_DATA_ATTR)
                            $node.attr('data-rich-text-animation-word-size', JSON.stringify(result));
                    }
                }
                catch(ex) {
                    // pass
                }

            return result;
        },

        /* --- */
    });

    /**
     * jQuery RichTextAnimationWord plugin.
     *
     * @param  {Mixed} options
     * @return {Mixed}
     */
    $.fn.richTextAnimationWord = function(options) {
        var classObject = RichTextAnimationWord,
            className = 'RichTextAnimationWord',
            store = 'jquery-rich-text-animation',
            args = Array.prototype.slice.call(arguments, 1),
            $this = $(this);

        // Iterate all
        $this.each(function() {
            // Get instance (or create new one).
            var instance = $(this).data(store);
            if (!instance)
                instance = new classObject(this, typeof options === 'object' ? options : {});

            // Access properties.
            if (typeof options === 'string') {
                var exists = options in instance,
                    isPrivate = options.substr(0, 1) === '_',
                    type = typeof instance[options];

                // Property is function, execute it.
                if (exists && !isPrivate && type === 'function' && instance[options] !== Object.prototype[options] && options !== 'constructor') {
                    var result = instance[options].apply(instance, args);

                    // Function returned result (non undefined), store
                    // result, exit loop.
                    if (typeof result !== 'undefined') {
                        $this = result;
                        return false;
                    }
                }

                // Property as getter (get, store result, exit loop).
                else if (exists && !isPrivate && type !== 'function' && !args.length) {
                    $this = instance[options];
                    return false;
                }

                // Property as setter (set, continue).
                else if (exists && !isPrivate && type !== 'function') {
                    instance[options] = args[0];
                }

                // Invalid option argument.
                else {
                    throw className + ': ' + options + ' is not a valid ' + className + ' property.';
                }
            }
        });

        // ...finally.
        return $this;
    };

    /**
     * Autoinit.
     */
    //$(function() {
    //    if (!window.RICH_TEXT_ANIMATION_AUTOINIT_DISABLE)
    //        $('.rich-text-animation[data-rich-text-animation="word"]').richTextAnimationWord('observe');
    //});
})(window.jQuery, window, document, undefined);
