;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationWordDrop = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * RichTextAnimationWordDrop
     * (extends RichTextAnimationWordBase).
     *
     * @param  {HTMLElement}               element HTML node
     * @param  {Object}                    options see RichTextAnimationWordDrop.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationWordDrop}
     */
    var RichTextAnimationWordDrop = function(element, options) {
        RichTextAnimationWordBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationWordDrop prototype.
     *
     * @type {Object}
     */
    RichTextAnimationWordDrop.prototype = Object.assign(Object.create(RichTextAnimationWordBase.prototype), {
        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'word-drop',

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationWordDrop,

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

                    this._setElementStyle(element, 'transform', 'translateY(-100%)', true);
                }.bind(this);

            this._setElementStyle(this._ui.element, 'width', width);

            element.addEventListener('transitionend', handler);

            this._setElementStyles(element, {
                position: 'absolute',
                opacity: '0',
                transform: 'translateY(100%)',
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

                    this._setElementStyles(element, {
                        position: 'relative',
                        transform: 'none',
                    });

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
    return RichTextAnimationWordDrop;
}));
