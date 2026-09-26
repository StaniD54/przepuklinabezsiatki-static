;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationWordZoom = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * RichTextAnimationWordZoom
     * (extends RichTextAnimationWordBase).
     *
     * @param  {HTMLElement}               element HTML node
     * @param  {Object}                    options see RichTextAnimationWordZoom.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationWordZoom}
     */
    var RichTextAnimationWordZoom = function(element, options) {
        RichTextAnimationWordBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationWordZoom prototype.
     *
     * @type {Object}
     */
    RichTextAnimationWordZoom.prototype = Object.assign(Object.create(RichTextAnimationWordBase.prototype), {
        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'word-zoom',

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationWordZoom,

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
                transform: 'scale(0)',
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
    return RichTextAnimationWordZoom;
}));
