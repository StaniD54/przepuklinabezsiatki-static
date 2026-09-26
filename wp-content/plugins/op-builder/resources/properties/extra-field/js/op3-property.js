/**
 * OptimizePress3 ExtraField property.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
; (function ($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ExtraField = OP3.defineClass({

        Name: "OP3.Property.ExtraField",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "extraField",

            _defaults: {
                label: function() {
                    return OP3._("Is Extra Field?");
                },
                tag: "select",
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                var value = $(this.target()).attr("data-op3-extra-field");

                if (!value)
                    value = "0";

                return value;
            },

            setter: function(value, media) {
                if (!value)
                    value = "0";

                $(this.target()).attr("data-op3-extra-field", value);
            },

        },

    });

})(jQuery, window, document);
