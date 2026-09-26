/**
 * OptimizePress3 property.
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Blink = OP3.defineClass({

        Name: "OP3.Property.Blink",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "blink",

            _defaults: {
                label: function() {
                    return OP3._("Blink (on frontend only)");
                },
                selector: " [data-op-blink]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-blink") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-blink", value);
            },

        },

    });

})(jQuery, window, document);
