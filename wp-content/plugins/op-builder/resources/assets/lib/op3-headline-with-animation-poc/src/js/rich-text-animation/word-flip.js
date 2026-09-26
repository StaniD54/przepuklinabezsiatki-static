;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationWordFlip = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * RichTextAnimationWordFlip
     * (extends RichTextAnimationWordBase).
     *
     * @param  {HTMLElement}               element HTML node
     * @param  {Object}                    options see RichTextAnimationWordFlip.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationWordFlip}
     */
    var RichTextAnimationWordFlip = function(element, options) {
        RichTextAnimationWordBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationWordFlip prototype.
     *
     * @type {Object}
     */
    RichTextAnimationWordFlip.prototype = Object.assign(Object.create(RichTextAnimationWordBase.prototype), {
        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'word-flip',

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationWordFlip,

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

                    this._setElementStyle(element, 'position', 'absolute');

                    this._callCallback(callback);
                }.bind(this);

            this._setElementStyle(this._ui.element, 'width', width);

            element.addEventListener('transitionend', handler);

            this._setElementStyles(element, {
                opacity: '0',
                transform: 'rotateX(90deg)',
            });
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
                    this._setElementStyle(this._ui.element, 'width', '');

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
    return RichTextAnimationWordFlip;
}));
