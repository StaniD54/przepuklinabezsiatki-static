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
    OP3.Elements._extension.prop.RowGap = OP3.defineClass({

        Name: "OP3.Property.RowGap",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "rowGap",

            _defaults: {
                label: function() {
                    return OP3._("Row Gap");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "50",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                replace: [
                    { "normal": "0px" },
                ],
                units: [
                    "px",
                ],
                defaultUnit: "px",
            },

        },

    });

})(jQuery, window, document);
