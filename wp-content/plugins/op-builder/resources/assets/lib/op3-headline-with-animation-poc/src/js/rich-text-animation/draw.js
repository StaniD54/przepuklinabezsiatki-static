;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.RichTextAnimationDraw = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * RichTextAnimationDraw
     * (extends RichTextAnimationBase).
     *
     * @param  {HTMLElement}           element HTML node
     * @param  {Object}                options see RichTextAnimationDraw.prototype.DEFAULT_OPTIONS
     * @return {RichTextAnimationDraw}
     */
    var RichTextAnimationDraw = function(element, options) {
        RichTextAnimationBase.apply(this, arguments);
    };

    /**
     * RichTextAnimationDraw prototype.
     *
     * @type {Object}
     */
    RichTextAnimationDraw.prototype = Object.assign(Object.create(RichTextAnimationBase.prototype), {
        /**
         * Default options.
         *
         * @type {Object}
         */
        DEFAULT_OPTIONS: {
            bringToFront: null,
            color: null,
            thickness: null,
            roundedEdges: null,
        },

        /**
         * Data attribute (selector for autoinit).
         *
         * @type {String}
         */
        DATA_ATTR: 'draw',

        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: RichTextAnimationDraw,

        /**
         * Initialize user interface.
         *
         * @param  {Element} element
         * @return {Void}
         */
        _initUi: function(element) {
            RichTextAnimationBase.prototype._initUi.apply(this, arguments);

            // Beside element, we need these as well.
            this._ui.svg = this._ui.element.querySelector('svg');
            this._ui.path = this._ui.svg.querySelectorAll('path');
        },

        /**
         * Initialize stylesheet:
         * create stylesheet rule for each element in ui
         * so it can be easily accessed when necessary.
         *
         * @return {Void}
         */
        _initStylesheet: function() {
            RichTextAnimationBase.prototype._initStylesheet.apply(this, arguments);

            var selector = this.selector();
            this._defineStylesheetRule(this._ui.svg, selector + ' svg');

            // We need to define stylesheet rule for each path
            // individually: each path element have it's index
            // data attrubute used as stylesheet selector.
            this._ui.path.forEach(function(element, index) {
                element.setAttribute('data-rich-text-animation-path-index', index);
                this._defineStylesheetRule(element, selector + ' svg path[data-rich-text-animation-path-index="' + index + '"]');

                // By setting stroke dashoffset/dasharray to the
                // path length we're actually "hidding" element.
                // And later animating stroke dashoffset to 0 we
                // have illusion that the stroke is being drawn...
                var length = element.getTotalLength();
                element.setAttribute('data-rich-text-animation-path-length', length);
                this._setElementStyle(element, 'stroke-dashoffset', length);
                this._setElementStyle(element, 'stroke-dasharray', length);
            }.bind(this));
        },

        /**
         * Destructor:
         * undefine (remove) stylesheet rules for svg/path
         * ui element.
         *
         * @param  {Boolean} clearAttrs (optional)
         * @return {Void}
         */
        destroy: function(clearAttrs) {
            this._undefineStylesheetRule(this._ui.svg);

            this._ui.path.forEach(function(element) {
                element.removeAttribute('data-rich-text-animation-path-length');
                element.removeAttribute('data-rich-text-animation-path-index');

                this._undefineStylesheetRule(element);
            }.bind(this));

            RichTextAnimationBase.prototype.destroy.apply(this, arguments);
        },

        /**
         * Animation backward: reset to initial state.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _backward: function(callback) {
            var style = this._ui.window.getComputedStyle(this._ui.path[0]);
            if (style.getPropertyValue('stroke-dashoffset') === style.getPropertyValue('stroke-dasharray')) {
                if (style.getPropertyValue('opacity') !== '1')
                    this._setElementStyle(this._ui.path, 'opacity', '1', true);

                this._callCallback(callback);

                return;
            }

            var transitionDuration = this.getOption('transitionDuration'),
                pathTransitionDuration = transitionDuration / this._ui.path.length;

            // Hide svg paths (fadeOut).
            this._fadeOut(function() {
                this._setElementStyle(this._ui.path, 'transition-duration', '0ms');
                this._setElementStyle(this._ui.path, 'opacity', '1');
                this._setElementStyleFromAttr(this._ui.path, 'stroke-dashoffset', 'data-rich-text-animation-path-length');

                setTimeout(function() {
                    this._setElementStyle(this._ui.path, 'transition-duration', pathTransitionDuration + 'ms');

                    this._callCallback(callback);
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
            this._drawIn(function() {
                this._callCallback(callback);
            }.bind(this));
        },

        /**
         * Animate fade in.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _fadeIn: function(callback) {
            this._animatePathOpacity(false, function() {
                this._callCallback(callback);
            }.bind(this));
        },

        /**
         * Animate fade out.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _fadeOut: function(callback) {
            this._animatePathOpacity(true, function() {
                this._callCallback(callback);
            }.bind(this));
        },

        /**
         * Animate draw in.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _drawIn: function(callback) {
            this._animatePathStrokeDash(false, function() {
                this._callCallback(callback);
            }.bind(this));
        },

        /**
         * Animate draw out.
         *
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _drawOut: function(callback) {
            this._animatePathStrokeDash(true, function() {
                this._callCallback(callback);
            }.bind(this));
        },

        /**
         * Animate path opacity.
         *
         * @param  {Boolean}  reverse
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _animatePathOpacity: function(reverse, callback) {
            var path = this._toArray(this._ui.path),
                method = !reverse ? 'shift' : 'pop',
                addEventListener = function(e) {
                    if (e)
                        e.target.removeEventListener('transitionend', addEventListener);

                    if (!path.length) {
                        this._callCallback(callback);

                        return;
                    }

                    var element = path[method](),
                        style = this._ui.window.getComputedStyle(element),
                        valueCurrent = style.getPropertyValue('opacity'),
                        valueTarget = !reverse ? '1' : '0',
                        transit = valueCurrent+'' !== valueTarget;
                    if (transit) {
                        element.addEventListener('transitionend', addEventListener);
                        this._setElementStyle(element, 'opacity', valueTarget);
                    }
                    else
                        addEventListener();
                }.bind(this);

            addEventListener();
        },

        /**
         * Animate path dash (drawing).
         *
         * @param  {Boolean}  reverse
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _animatePathStrokeDash: function(reverse, callback) {
            var path = this._toArray(this._ui.path),
                method = !reverse ? 'shift' : 'pop',
                addEventListener = function(e) {
                    if (e)
                        e.target.removeEventListener('transitionend', addEventListener);

                    if (!path.length) {
                        this._callCallback(callback);

                        return;
                    }

                    var element = path[method](),
                        style = this._ui.window.getComputedStyle(element),
                        dashoffset = style.getPropertyValue('stroke-dashoffset'),
                        dasharray = style.getPropertyValue('stroke-dasharray'),
                        transit = !reverse ? parseFloat(dashoffset) !== 0 : dashoffset !== dasharray;
                    if (transit) {
                        element.addEventListener('transitionend', addEventListener);
                        this._setElementStyle(element, 'stroke-dashoffset', !reverse ? '0' : element.getAttribute('data-rich-text-animation-path-length'));
                    }
                    else
                        addEventListener();
                }.bind(this);

            addEventListener();
        },

        /**
         * Get defaults (default options inheritance):
         * convert null options to current value from DOM.
         *
         * @return {Object}
         */
        _getDefaultOptions: function() {
            var result = RichTextAnimationBase.prototype._getDefaultOptions.apply(this, arguments);
            if (result.bringToFront === null)
                result.bringToFront = this._getElementStyle(this._ui.svg, 'z-index') !== "-1";
            if (result.roundedEdges === null)
                result.roundedEdges = this._getElementStyle(this._ui.path[0], 'stroke-linecap') === 'round';
            if (result.color === null)
                result.color = this._getElementStyle(this._ui.path[0], 'stroke');
            if (result.thickness === null)
                result.thickness = parseInt(this._getElementStyle(this._ui.path[0], 'stroke-width')) || 1;

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
            if (key === 'bringToFront' || key === 'roundedEdges') {
                if (result === 'true')
                    result = true
                else if (result === 'false')
                    result = false
                else
                    result = !!result;
            }
            else if (key === 'color' && typeof value === 'string') {
                // No validation.
            }
            else if (key === 'thickness') {
                result = result*1;
                result = Math.min(result, 10);
                result = Math.max(result, 1);
            }
            else
                result = undefined;

            return result;
        },

        /**
         * Init hook (executed on class initialization):
         * triggering event is disabled before initialization,
         * making sure option hook with current option values
         * is executed.
         *
         * Setting some options will cause animation at
         * initialization, and we don't want that.
         * Unfortunately we can not just disable and enable
         * transition (forcing repaing with offestHeight
         * doesn't work on SVG elements), so we're gonna use
         * a little hack here: detach svg element, and
         * reattach it back after all the options are appied
         * to DOM.
         *
         * @param  {Object} data
         * @return {Void}
         */
        _triggerInit: function(data) {
            var element = this._ui.svg,
                parent = element.parentElement;
            parent.removeChild(element);

            RichTextAnimationBase.prototype._triggerInit.apply(this, arguments);

            // Maybe it would be better to get element index
            // before detaching, but I think we can assume
            // that the SVG will allways be at the end... ?
            parent.appendChild(element);
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

            if (data.key === 'transitionDuration')
                this._setElementStyle(this._ui.path, 'transition-duration', data.value / this._ui.path.length + 'ms');
            else if (data.key === 'bringToFront')
                this._setElementStyle(this._ui.svg, 'z-index', data.value ? 'auto' : '-1');
            else if (data.key === 'color')
                this._setElementStyle(this._ui.path, 'stroke', data.value);
            else if (data.key === 'thickness')
                this._setElementStyle(this._ui.path, 'stroke-width', data.value + 'px');
            else if (data.key === 'roundedEdges') {
                this._setElementStyle(this._ui.path, 'stroke-linecap', data.value ? 'round' : 'square');
                this._setElementStyle(this._ui.path, 'stroke-linejoin', data.value ? 'round' : 'mitter');
            }
        },
    });

    // Class as result.
    return RichTextAnimationDraw;
}));
