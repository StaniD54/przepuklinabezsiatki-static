document.addEventListener("DOMContentLoaded", function(e) {
    // Find all the elements with animation trigger
    // option turned on.
    var observer, animation, elements = document.querySelectorAll('[data-op-animation-trigger]');
    if (!elements.length)
        return;

    // Define observer.
    observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            var element = entry.target,
                loopElement = element.querySelector("[data-op-animation-loop]"),
                isLoop = loopElement && loopElement.parentElement === element && loopElement.getAttribute("data-op-animation-loop") === "1",
                timeout = parseFloat(element.getAttribute("data-op-timeout")) || 0;

            if (!entry.isIntersecting) {
                // Reset animation to beginning if loop option is enabled
                // and element out of view &&
                // $element.attr("data-op-transition-state") !== "playing"
                if (isLoop && entry.intersectionRatio <= 0 && element.getAttribute("data-op-animation-state") === "enter enter-active") {
                    observer.unobserve(element);

                    element.setAttribute("data-op-animation-state", "enter");
                    element.setAttribute("data-op-visibility-hidden", 1);

                    // Transition duration config 700ms!?
                    setTimeout(function() {
                        observer.observe(element);
                    }, 700);
                }

                return;
            }

            // Only show the element if at least some of it is visible.
            // Commented out because it works strangely with slide-down
            // and slide-up animations in some cases.
            //if (entry.intersectionRatio < 0.2)
            //    return;

            setTimeout(function() {
                element.setAttribute("data-op-animation-state", "enter enter-active");
                element.setAttribute("data-op-visibility-hidden", "0");
            }, timeout);

            // Unbind observe event unless Loop animation option is
            // enabled.
            if (!isLoop)
                observer.unobserve(entry.target);
        });
    });

    // Define animation methods.
    animation = {
        /**
         * Load animation:
         * remove display:none and add data attributes
         * for animation.
         *
         * @param  {HTMLElement} element
         * @param  {Number}      timeout
         * @return {Void}
         */
        load: function(element, timeout) {
            setTimeout(function() {
                element.setAttribute("data-op-element-hidden", "0");

                // Repaint the element so the animation can be triggered.
                element.offsetHeight;

                element.setAttribute("data-op-animation-state", "enter");
                element.setAttribute("data-op-visibility-hidden", "0");

                // Repaint the element so the animation can be triggered
                element.offsetHeight;

                element.setAttribute("data-op-animation-state", "enter enter-active");
            }, timeout);
        },

        /**
         * Scroll animation:
         * observe element with interaction observer (the
         * animation logic is in observer's callback).
         *
         * @param  {HTMLElement} element
         * @param  {Number}      timeout (not used)
         * @return {Void}
         */
        scroll: function(element, timeout) {
            observer.observe(element);
        },
    };

    // Execute animation method on each element.
    elements.forEach(function(element) {
        var trigger = element.getAttribute("data-op-animation-trigger");
        if (!trigger || trigger === "none")
            return;

        // Timeout from data attributes: minutes and seconds
        // to miliseconds.
        var timeoutMin = parseFloat(element.getAttribute("data-op-timer-minutes")) || 0,
            timeoutSec = parseFloat(element.getAttribute("data-op-timer-seconds")) || 0,
            timeoutMsc = trigger.indexOf("delay") > -1 ? ((timeoutMin * 60) + timeoutSec) * 1000 : 0;

        // Prepare element (data attributes).
        var parent = element.closest(".op3-element");
        parent.setAttribute("data-op-animation-state", "enter");
        parent.setAttribute("data-op-animation-style", element.getAttribute("data-op-animation-style"));
        parent.setAttribute("data-op-timeout", timeoutMsc);

        // Call animation function (load/scroll).
        var method = trigger.indexOf("load") > -1 ? "load" : "scroll";
        animation[method](parent, timeoutMsc);

        // Initialize scroll event for onload when loop is
        // enabled, but not for the load_delay.
        if (trigger === "load" && element.getAttribute("data-op-animation-loop") === "1")
            animation.scroll(parent, timeoutMsc);
    });
});
