;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationWordClip = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * RichTextAnimationWordClip
     * (extends RichTextAnimationWordBase).
     *
     * @param  {HTMLElement}               element HTML node
     * @param  {Object}                    options see RichTextAnimationWordClip.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationWordClip}
     */
    var RichTextAnimationWordClip = function(element, options) {
        RichTextAnimationWordBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationWordClip prototype.
     *
     * @type {Object}
     */
    RichTextAnimationWordClip.prototype = Object.assign(Object.create(RichTextAnimationWordBase.prototype), {
        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'word-clip',

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationWordClip,

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

            // Can not animate width ''->'0px' (bottom of
            // this method), we need to set current value,
            // re-render the element and then we will have
            // animation...
            this._setElementStyle(element, 'width', width);
            element.offsetHeight;

            element.addEventListener('transitionend', handler);

            this._setElementStyle(element, 'width', '0px');
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

                    this._callCallback(callback);
                }.bind(this);

            element.addEventListener('transitionend', handler);

            this._setElementStyles(element, {
                position: '',
                width: width,
            });
        },
    });

    // Class as result.
    return RichTextAnimationWordClip;
}));
