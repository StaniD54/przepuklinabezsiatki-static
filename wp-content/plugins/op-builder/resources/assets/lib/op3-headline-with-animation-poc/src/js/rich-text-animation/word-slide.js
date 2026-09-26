;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationWordSlide = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * RichTextAnimationWordSlide
     * (extends RichTextAnimationWordBase).
     *
     * @param  {HTMLElement}                element HTML node
     * @param  {Object}                     options see RichTextAnimationWordSlide.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationWordSlide}
     */
    var RichTextAnimationWordSlide = function(element, options) {
        RichTextAnimationWordBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationWordSlide prototype.
     *
     * @type {Object}
     */
    RichTextAnimationWordSlide.prototype = Object.assign(Object.create(RichTextAnimationWordBase.prototype), {
        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'word-slide',

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationWordSlide,

        /**
         * Animate out.
         *
         * @param  {HTMLElement} element  word ui element
         * @param  {Function}    callback (optional)
         * @return {Void}
         */
        _animateOut: function(element, callback) {
            var size = this._getWordSize(element),
                width = size[0] + 'px',
                handler = function(e) {
                    e.target.removeEventListener('transitionend', handler);

                    this._setElementStyle(element, 'transform', 'translateX(-100%)', true);
                }.bind(this);

            this._setElementStyle(this._ui.element, 'width', width);

            element.addEventListener('transitionend', handler);

            this._setElementStyles(element, {
                position: 'absolute',
                opacity: '0',
                transform: 'translateX(100%)',
            });

            // We want out/in to animate at the same time, so we're
            // calling callback here, not in transitionend event as
            // we would normally do.
            setTimeout(function() {
                this._callCallback(callback);
            }.bind(this));
        },

        /**
         * Animate in.
         *
         * @param  {HTMLElement} element  word ui element
         * @param  {Function}    callback (optional)
         * @return {Void}
         */
        _animateIn: function(element, callback) {
            var size = this._getWordSize(element),
                width = size[0] + 'px',
                handler = function(e) {
                    e.target.removeEventListener('transitionend', handler);

                    this._setElementStyle(element, 'position', 'relative');

                    this._callCallback(callback);
                }.bind(this);

            this._setElementStyle(this._ui.element, 'width', width);

            element.addEventListener('transitionend', handler);

            this._setElementStyles(element, {
                opacity: '1',
                transform: 'none',
            });
        },
    });

    // Class as result.
    return RichTextAnimationWordSlide;
}));
