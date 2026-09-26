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
    OP3.Elements._extension.prop.BorderTopLeftRadius = OP3.defineClass({

        Name: "OP3.Property.BorderTopLeftRadius",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderTopLeftRadius",

            _defaults: {
                label: function() {
                    return OP3._("Border Top Left Radius");
                },
                units: [
                    "px",
                    "%",
                ],
                defaultUnit: "px",
                attr: {
                    "data-property-type": "range",
                    "data-units": "px, %",
                    "data-min-px": "0",
                    "data-min-percent": "0",
                    "data-max-px": "100",
                    "data-max-percent": "50",
                },
            },

        },

    });

})(jQuery, window, document);
