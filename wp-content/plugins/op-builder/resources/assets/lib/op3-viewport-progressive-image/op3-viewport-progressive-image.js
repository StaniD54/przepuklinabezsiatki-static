/**
 * OptimizePress3 viewport progressive image:
 * replace progressive image (small blured one) with original.
 *
 * To satisfy google's PageSpeed Insights we gonna wait for
 * user interaction before we do actual replacement. There
 * is a timeout of 5000ms defined (if there is no user
 * interaction until then, the scoring will be bad and there
 * is no need to wait no longer).
 */
;(function() {
    var win = window,
        doc = document,

        /**
         * User interaction events.
         *
         * @type {Array}
         */
        events = [ "keydown", "mousemove", "pointerover", "click", "scroll", "wheel", "resize" ],

        /**
         * Timeout (in milliseconds) to wait before we "force
         * user interaction".
         *
         * @type {Number}
         */
        timeout = 5000,

        /**
         * Set timeout interval.
         *
         * @type {Number}
         */
        interval = -1,

        /**
         * Loaded images count.
         *
         * @type {Number}
         */
        loaded = 0,

        /**
         * Jobs that needs to be done:
         *     - load image
         *     - wait for interaction
         *
         * @type {Number}
         */
        jobs = 2,

        /**
         * Link preload DOM elements.
         *
         * @type {Array}
         */
        links = Array.prototype.slice.call(doc.querySelectorAll("head link.op3-viewport-progressive-image-preload"))
            .filter(function(element) {
                if (element.media)
                    return window.matchMedia(element.media).matches;

                return true;
            }),

        /**
         * Render image:
         * if there are no more jobs, set html's data attribute
         * so the original image renders.
         *
         * @return {Void}
         */
        renderImage = function() {
            if (!jobs)
                doc.documentElement.removeAttribute("data-op3-viewport-progressive-image");
        },

        /**
         * Image load event handler:
         * increase loaded and render image (if ready).
         *
         * @return {Void}
         */
        handleImageLoad = function() {
            loaded++;

            if (loaded === links.length)
                jobs--;

            renderImage();
        },

        /**
         * User intaract event handler:
         * clear all and render image (if ready).
         *
         * @return {Void}
         */
        handlerInteract = function() {
            clearInterval(interval);

            events.forEach(function(event) {
                win.removeEventListener(event, handlerInteract);
            });

            jobs--;

            renderImage();
        };

    // Load each image from link elements.
    if (links.length)
        links.forEach(function(element) {
            var img = new Image();
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad;
            img.src = element.href;
        });
    else
        jobs--;

    // User intaraction to execute interact handler...
    events.forEach(function(event) {
        win.addEventListener(event, handlerInteract);
    });

    // ...or interval of 5000ms.
    interval = setTimeout(handlerInteract, timeout);
})();
