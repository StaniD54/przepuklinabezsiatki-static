;(function($, window, document) {

    // invoke strict mode
    "use strict";

    /**
     * Observe current element (this)
     *
     * @param  {String} fit
     * @return {Void}
     */
    var init = function(fit) {
        if (fit !== "contain" && fit !== "cover")
            throw "jQuery.objectFit: observer must be initialized with contain or cover argument.";

        // store contain|cover to data attribute
        $(this)
            .attr("data-object-fit", fit)
            .attr("data-object-ratio", this.offsetWidth / this.offsetHeight);

        // already observing
        var index = elementList.indexOf(this);
        if (index !== -1)
            return;

        // append to elementList
        elementList.push(this);

        // link child/parent and start observing
        if (observer) {
            var target = this.parentElement;
            $(target).data("jquery-object-fit-target", this);

            observer.observe(target);
        }

        // ...and refresh
        refresh.call(this);
    }

    /**
     * Unobserve current element (this)
     *
     * @return {Void}
     */
    var destroy = function() {
        // unlink child/parent and stop observing
        if (observer) {
            var target = this.parentElement;
            $(target)
                .removeData("jquery-object-fit-target")
                .removeData("jquery-object-fit-adjust-height");

            observer.unobserve(target);
        }

        // remove from elementList
        var index = elementList.indexOf(this);
        if (index !== -1)
            elementList.splice(index, 1);

        // remove data attribute
        $(this)
            .removeAttr("data-object-fit-ratio")
            .removeAttr("data-object-fit");

        // ...and refresh
        refresh.call(this);
    }

    /**
     * Refresh current element (this)
     *
     * @param  {Number} parentWidth  (optional)
     * @param  {Number} parentHeight (optional)
     * @return {Void}
     */
    var refresh = function(width, height) {
        var $this = $(this),
            fit = $this.attr("data-object-fit"),
            ratio = $this.attr("data-object-ratio")*1,
            parentWidth = parentWidth || this.parentElement.offsetWidth,
            parentHeight = parentHeight || this.parentElement.offsetHeight,
            adjust = null,
            css = {
                width: "",
                height: "",
            };

        // which property inherits size from it's parent
        // and which property to adjust
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

        // adjust width/height by calculating size using
        // default element aspect ratio (let's increase
        // initial odd value by 1 making sure that
        // translating element -50% won't result
        // with gap)
        if (adjust === "width") {
            css.height = parentHeight + (parentHeight % 2 === 0 ? 0 : 1);
            css.width = Math.ceil(css.height * ratio);
        }
        else if (adjust === "height") {
            css.width = parentWidth + (parentWidth % 2 === 0 ? 0 : 1);
            css.height = Math.ceil(css.width / ratio);
        }
        else {
            // nothing to adjust, reset width/height
        }

        // Additional height adjust (for YouTube videos, for example,
        // to cut off the title on top of the video)
        if ($this.data("jquery-object-fit-adjust-height")) {
            css.height = css.height + $this.data("jquery-object-fit-adjust-height");
            css.width = Math.ceil(css.height * ratio);
        }

        // style element and trigger event
        $this
            .css(css)
            .trigger("objectfit", {
                target: this.parentElement,
                fit: fit,
                ratio: ratio,
                width: css.width,
                height: css.height,
            });
    }

    /**
     * Simulate object-fit:contain for current
     * element (this)
     *
     * @return {Void}
     */
    var contain = function() {
        init.call(this, "contain");
    }

    /**
     * Simulate object-fit:cover for current
     * element (this)
     *
     * @return {Void}
     */
    var cover = function(node) {
        init.call(this, "cover");
    }

    /**
     * Window resize element handler
     * (event listener binded only if browser
     * doesn't support ResizeObserver)
     *
     * @param  {Event} e
     * @return {Void}
     */
    var handleWindowResize = function(e) {
        elementList.forEach(function(node) {
            refresh.call(node);
        });
    }

    /**
     * Element resize element handler
     * (event listener binded only if browser
     * does support ResizeObserver)
     *
     * @param  {ResizeObserverEntry} e
     * @return {Void}
     */
    var handleElementResize = function(e) {
        e.forEach(function(entry) {
            var target = $(entry.target).data("jquery-object-fit-target"),
                width = entry.width,
                height = entry.height;

            refresh.call(target, width, height);
        });
    }

    /**
     * Resize Observer
     * (null on no browser support)
     *
     * @type {ResizeObserver}
     */
    var observer = typeof window.ResizeObserver === "function" ? new ResizeObserver(handleElementResize) : null;

    /**
     * Observing elements list
     * (tracking observing elements so we can
     * refresh their size on window resize
     * event (if browser doesn't support
     * ResizeObserver)
     *
     * @type {Array}
     */
    var elementList = [];

    // Resize Observer fallback
    // (using window resize event)
    //
    // Important:
    // dynamically content change won't handle
    // refresh without ResizeObserver, we need
    // to call it manualy
    if (!observer) {
        $(window).on("resize", handleWindowResize);

        // Safari on iOS triggers resize before lib is initialized,
        // and this ensures videos are properly sized
        $(window).on("load", handleWindowResize);
    }

    // jQuery plugin
    $.fn.objectFit = function(method, adjustHeight) {
        if (method === "destroy")
            $(this).each(destroy);
        else if (method === "refresh")
            $(this).each(refresh);
        else if (method === "contain")
            $(this).each(contain);
        else if (method === "cover")
            $(this).each(cover);
        else if (method === "fill")
            throw "jQuery.objectFit: fill method not supported (use css instead).";
        else if (arguments.length === 0)
            throw "jQuery.objectFit: method missing (cover|contain|refresh|destroy)";
        else
            throw "jQuery.objectFit: unknown method " + method + ".";

        if (adjustHeight)
            $(this).each(function() {
                $(this).data("jquery-object-fit-adjust-height", adjustHeight);
            });
    }

})(window.jQuery, window, document);
