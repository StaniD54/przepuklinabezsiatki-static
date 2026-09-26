/**
 * OptimizePress3 property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Gap = OP3.defineClass({

        Name: "OP3.Property.Gap",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "gap",

            _defaults: {
                label: function() {
                    return OP3._("Gap");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "50",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: [
                    "px",
                ],
                replace: [
                    { "0": "0px" },
                    { "": "0px" },
                    { "normal": "0px" },
                ],
                defaultUnit: "px",
            },

        },

    });

})(jQuery, window, document);
