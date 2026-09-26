document.addEventListener("DOMContentLoaded", function(e) {
    var util = {
        /**
         * Get OP3 properties from element.
         *
         * @param  {HTMLElement} element
         * @return {Object}
         */
        getProperties: function(element) {
            var target = null;
            for (var i = 0; i < element.children.length; i++) {
                if (element.children[i].getAttribute("data-op3-sticky") !== "1")
                    continue;

                target = element.children[i];

                break;
            }

            return {
                stickyActiveDesktop: target.getAttribute("data-op3-sticky-active-desktop") || "1",
                stickyActiveTablet: target.getAttribute("data-op3-sticky-active-tablet") || "1",
                stickyActiveMobile: target.getAttribute("data-op3-sticky-active-mobile") || "1",
                stickyTopDesktop: target.getAttribute("data-op3-sticky-top-desktop") || "0",
                stickyTopTablet: target.getAttribute("data-op3-sticky-top-tablet") || "0",
                stickyTopMobile: target.getAttribute("data-op3-sticky-top-mobile") || "0",
                stickyUntil: target.getAttribute("data-op3-sticky-until") || "0",
                stickyUntilElement: target.getAttribute("data-op3-sticky-until-element") || "",
            };
        },

        /**
         * Convert element's OP3 properties to Stickify
         * options.
         *
         * @param  {HTMLElement} element
         * @return {Object}
         */
        getOptions: function(element) {
            var props = util.getProperties(element),
                devices = {
                    desktop: "screen and (min-width: 1024px)",
                    tablet: "screen and (max-width: 1023px) and (min-width: 768px)",
                    mobile: "screen and (max-width: 767px)",
                },
                device = null,
                result = {
                    matchMedia: "all",
                    stickUntilElement: null,
                    adjustOffset: 0,
                    stickyZIndex: 1000,
                };

            if (props) {
                for (var dev in devices) {
                    if (window.matchMedia(devices[dev]).matches)
                        device = dev;
                }

                result.matchMedia = "";
                for (var dev in devices) {
                    var prop = "stickyActive" + dev.charAt(0).toUpperCase() + dev.slice(1);;
                    if (props[prop] === "1")
                        result.matchMedia += ", " + devices[dev];
                }
                result.matchMedia = result.matchMedia ? result.matchMedia.replace(/^,\s/, "") : "none";

                if (props.stickyUntil === "1")
                    result.stickUntilElement = element.parentElement.closest(".op3-element, #op3-designer-element > [data-op3-children]");
                else if (props.stickyUntil === "2" && props.stickyUntilElement)
                    result.stickUntilElement = "." + props.stickyUntilElement;

                if (device === "mobile")
                    result.adjustOffset = props.stickyTopMobile;
                else if (device === "tablet")
                    result.adjustOffset = props.stickyTopTablet;
                else
                    result.adjustOffset = props.stickyTopDesktop;
                result.adjustOffset = parseInt(result.adjustOffset);

                var adminBar = util.getAdminBar();
                if (adminBar)
                    result.adjustOffset += adminBar.offsetHeight;

                result.stickyZIndex -= element.getAttribute("data-stickify-index")*1 || 0;
            }

            return result;
        },

        /**
         * Get #wpadminbar element.
         *
         * @return {HTMLElement}
         */
        getAdminBar: function() {
            if ("_adminBar" in util)
                return util._adminBar;

            util._adminBar = document.querySelector("#wpadminbar");

            return util.getAdminBar();
        },

        /**
         * Stickify resize event handler:
         * refresh element options.
         *
         * @param  {Event} e
         * @return {Void}
         */
        handleResize: function(e) {
            var target = e.target,
                instance = target._stickify,
                options = util.getOptions(target);

            for (var prop in options) {
                instance.setOption(prop, options[prop]);
            }
        },
    };

    // Iterate each sticky element and init Stickify
    // instance on it.
    document.querySelectorAll('[data-op3-sticky="1"]:not([data-op3-sticky-active-desktop="0"][data-op3-sticky-active-tablet="0"][data-op3-sticky-active-mobile="0"])').forEach(function(element, index) {
        var target = element.parentElement;
        target.setAttribute("data-stickify-index", index);
        target.addEventListener("stickifyresize", util.handleResize);

        new Stickify(target, util.getOptions(target));
    });
});
