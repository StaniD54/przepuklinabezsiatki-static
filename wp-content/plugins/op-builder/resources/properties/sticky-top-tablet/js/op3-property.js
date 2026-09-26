/**
 * OptimizePress3 property.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.StickyTopTablet = OP3.defineClass({

        Name: "OP3.Property.StickyTopTablet",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "stickyTopTablet",

            _defaults: {
                label: function() {
                    return OP3._("Distance from top of screen");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px,",
                    "data-min-px": "0",
                    "data-max-px": "500",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: [
                    "px",
                ],
                defaultUnit: "px",
                selector: " > [data-op3-sticky-top-tablet]",
            },

            _forceComputed: true,

            // Tablet inherits from desktop
            computed: function() {
                var $target = $(this.target());
                var value = $target.attr("data-op3-sticky-top-tablet");

                if (value === "")
                    value = $target.attr("data-op3-sticky-top-desktop") || "0";
                if (value === "0")
                    value = "0px";

                return value;
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-sticky-top-tablet", value);
            },

        },

    });

})(jQuery, window, document);
