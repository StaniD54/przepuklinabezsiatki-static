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
    OP3.Elements._extension.prop.BorderStyle = OP3.defineClass({

        Name: "OP3.Property.BorderStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderStyle",

            _defaults: {
                label: function() {
                    return OP3._("Border Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "none": "None" },
                    { "solid": "Solid" },
                    { "dashed": "Dashed" },
                    { "dotted": "Dotted" },
                ],
            },

            /**
             * Get computed css property
             *
             * Override default computed function because
             * firefox browser has a problem to return
             * value of shorthand css rule like
             * border-style.
             *
             * @return {String}
             */
            computed: function() {
                var computed = $(this.target())
                    .css([
                        "borderTopStyle",
                        "borderRightStyle",
                        "borderBottomStyle",
                        "borderLeftStyle"
                    ]);

                var result = computed.borderTopStyle
                    + " " + computed.borderRightStyle
                    + " " + computed.borderBottomStyle
                    + " " + computed.borderLeftStyle;

                if (computed.borderTopStyle === computed.borderRightStyle && computed.borderRightStyle === computed.borderBottomStyle && computed.borderBottomStyle === computed.borderLeftStyle)
                    result = computed.borderTopStyle;
                else if (computed.borderTopStyle === computed.borderBottomStyle && computed.borderRightStyle === computed.borderLeftStyle)
                    result = computed.borderTopStyle + " " + computed.borderRightStyle;
                else if (computed.borderRightStyle === computed.borderLeftStyle)
                    result = computed.borderTopStyle + " " + computed.borderRightStyle + " " + computed.borderBottomStyle;

                return result;
            },

        },

    });

})(jQuery, window, document);
