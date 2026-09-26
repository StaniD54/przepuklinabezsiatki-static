/**
 * OptimizePress3 element.
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
    OP3.Elements._extension.prop.BorderWidth = OP3.defineClass({

        Name: "OP3.Property.BorderWidth",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderWidth",

            _defaults: {
                label: function() {
                    return OP3._("Border Width");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px,",
                    "data-min-px": "0",
                    "data-max-px": "72",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: [
                    "px",
                ],
                defaultUnit: "px",
            },

            /**
             * Get computed css property
             *
             * Override default computed function because
             * firefox browser has a problem to return
             * value of shorthand css rule like
             * border-width.
             *
             * @return {String}
             */
            computed: function() {
                var computed = $(this.target())
                    .css([
                        "borderTopWidth",
                        "borderRightWidth",
                        "borderBottomWidth",
                        "borderLeftWidth"
                    ]);

                var result = computed.borderTopWidth
                    + " " + computed.borderRightWidth
                    + " " + computed.borderBottomWidth
                    + " " + computed.borderLeftWidth;

                if (computed.borderTopWidth === computed.borderRightWidth && computed.borderRightWidth === computed.borderBottomWidth && computed.borderBottomWidth === computed.borderLeftWidth)
                    result = computed.borderTopWidth;
                else if (computed.borderTopWidth === computed.borderBottomWidth && computed.borderRightWidth === computed.borderLeftWidth)
                    result = computed.borderTopWidth + " " + computed.borderRightWidth;
                else if (computed.borderRightWidth === computed.borderLeftWidth)
                    result = computed.borderTopWidth + " " + computed.borderRightWidth + " " + computed.borderBottomWidth;

                return result;
            },

        },

    });

})(jQuery, window, document);
