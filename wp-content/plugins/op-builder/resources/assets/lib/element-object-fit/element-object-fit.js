;(function(root, factory) {
    // AMD.
    if (typeof define === "function" && define.amd)
        define(factory);

    // Node, CommonJS-like.
    else if (typeof exports === "object")
        module.exports = factory();

    // Browser globals.
    else
        root.elementObjectFit = factory();
} (this, function() {
    // Invoke strict mode.
    "use strict";

    /**
     * Util object.
     *
     * @type {Object}
     */
    var util = {
        /**
         * Simulate object-fit contain or cover on element:
         * observe element with object observer and let it's
         * handler take care of the rest.
         *
         * @param  {HTMLElement} element
         * @param  {String}      fit     contain|cover
         * @param  {Object}      options (optional) adjustWidth|adjustHeight
         * @return {Void}
         */
        _init: function(element, fit, options) {
            // Already observing.
            if (util._observing.element.indexOf(element) !== -1)
                return;

            // Store contain|cover to data attribute.
            options = options || {};
            element.setAttribute("data-element-object-fit", fit);
            element.setAttribute("data-element-object-fit-ratio", element.offsetWidth / element.offsetHeight);
            if (("adjustWidth" in options) && options.adjustWidth*1)
                element.setAttribute("data-element-object-fit-adjust-width", options.adjustWidth*1);
            if (("adjustHeight" in options) && options.adjustHeight*1)
                element.setAttribute("data-element-object-fit-adjust-height", options.adjustHeight*1);

            // Append to observing object.
            var target = element.parentElement;
            util._observing.target.push(target);
            util._observing.element.push(element);

            // Observe and refresh.
            if (!util._observer)
                util._observer = new ResizeObserver(util._callback);
            util._observer.observe(target);
            util.refresh(element);
        },

        /**
         * Remove object-fit simulation for element:
         * reset, unobserve and refresh.
         *
         * @param  {HTMLElement} element
         * @return {Void}
         */
        destroy: function(element) {
            var index = util._observing.element.indexOf(element);
            if (index === -1)
                return;

            // Remove from observing object.
            util._observing.target.splice(index, 1);
            util._observing.element.splice(index, 1);

            // Remove data attribute.
            element.removeAttribute("data-element-object-fit-adjust-height");
            element.removeAttribute("data-element-object-fit-adjust-width");
            element.removeAttribute("data-element-object-fit-ratio");
            element.removeAttribute("data-element-object-fit");

            // Unobserve and refresh.
            var target = element.parentElement;
            util._observer.unobserve(target);
            util.refresh(element);
        },

        /**
         * Refresh element:
         * force width/height recalculation.
         *
         * @param  {HTMLElement} element
         * @param  {Object}      options (optional) parentWidth|parentHeight
         * @return {Void}
         */
        refresh: function(element, options) {
            options = options || {};

            var target = element.parentElement,
                fit = element.getAttribute("data-element-object-fit"),
                ratio = element.getAttribute("data-element-object-fit-ratio")*1,
                parentWidth = options.parentWidth*1 || target.offsetWidth,
                parentHeight = options.parentHeight*1 || target.offsetHeight,
                adjustWidth = options.adjustWidth || element.getAttribute("data-element-object-fit-adjust-width")*1 || null,
                adjustHeight = options.adjustHeight || element.getAttribute("data-element-object-fit-adjust-height")*1 || null,
                adjust = null,
                css = {
                    width: "",
                    height: "",
                };

            // Which property inherits size from it's parent and
            // which property to adjust.
            if (fit === "contain") {
                if (ratio > parentWidth / parentHeight)
                    adjust = "height";
                else
                    adjust = "width";
            }
            else if (fit === "cover") {
                if (ratio > parentWidth / parentHeight)
                    adjust = "width";
                else
                    adjust = "height";
            }

            // Adjust width/height by calculating size using default
            // element aspect ratio (let's increase initial odd
            // value by 1 making sure that translating element
            // -50% won't result with gap).
            if (adjust === "width") {
                css.height = parentHeight + (parentHeight % 2 === 0 ? 0 : 1);
                css.width = Math.ceil(css.height * ratio);
            }
            else if (adjust === "height") {
                css.width = parentWidth + (parentWidth % 2 === 0 ? 0 : 1);
                css.height = Math.ceil(css.width / ratio);
            }
            else {
                // Nothing to adjust, reset width/height.
            }

            // Additional width|height adjust (for YouTube videos, for
            // example, to cut off the title on top of the video).
            if (adjustWidth) {
                css.width = css.width + adjustWidth;
                css.height = Math.ceil(css.width / ratio);
            }
            if (adjustHeight) {
                css.height = css.height + adjustHeight;
                css.width = Math.ceil(css.height * ratio);
            }

            // Style element.
            element.style.width = css.width + "px";
            element.style.height = css.height + "px";
        },

        /**
         * Simulate object-fit:contain for element.
         *
         * @param  {HTMLElement} element
         * @param  {Object}      options (optional) adjustWidth|adjustHeight
         * @return {Void}
         */
        contain: function(element, options) {
            util._init(element, "contain", options);
        },

        /**
         * Simulate object-fit:cover for element.
         *
         * @param  {HTMLElement} element
         * @param  {Object}      options (optional) adjustWidth|adjustHeight
         * @return {Void}
         */
        cover: function(element, options) {
            util._init(element, "cover", options);
        },

        /**
         * Observing element object.
         *
         * Storing element and it's parent (target) so we can
         * link target/element by index (element is an DOM
         * element on which the object-fit is applied, target
         * is element we observe).
         *
         * @type {Object}
         */
        _observing: {
            target: [],
            element: [],
        },

        /**
         * Resize observer.
         *
         * @type {ResizeObserver}
         */
        _observer: null,

        /**
         * Resizer observer callback:
         * refresh element.
         *
         * @param  {ResizeObserverEntry} entries
         * @return {Void}
         */
        _callback: function(entries) {
            entries.forEach(function(entry) {
                var target = entry.target,
                    index = util._observing.target.indexOf(target);
                if (target === -1)
                    return;

                var element = util._observing.element[index],
                    width = entry.contentRect.width,
                    height = entry.contentRect.height;
                util.refresh(element);
            });
        },
    };

    /**
     * Element object-fit:
     * global method that simulates object-fit contain or
     * cover on element.
     *
     * @param  {HTMLElement} element
     * @param  {String}      method  contain|cover|refresh|destroy
     * @return {Void}
     */
    return function(element, method) {
        if (!(element instanceof HTMLElement))
            throw "Element object-fit: element argument must be of HTMLElement type.";

        // Is global method.
        var validMethods = Object.keys(util).filter(function(method) { return method[0] !== '_'; });
        if (validMethods.indexOf(method) === -1)
            throw "Element object-fit: invalid method '" + method + "' (valid methods: " + validMethods.join("|") + ").";

        // Parse arguments.
        var args = Array.prototype.slice.call(arguments);
        args.splice(1, 1);

        // Call util.
        util[method].apply(this, args);
    };
}));
