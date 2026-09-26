/**
 * OptimizePress3 toggleStatusError property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ToggleStatusError = OP3.defineClass({

        Name: "OP3.Property.ToggleStatusError",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "toggleStatusError",

            _defaults: {
                label: function() {
                    return OP3._("Toggle status error");
                },
                selector: " [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-toggle-status") === "error" ? "1" : "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-toggle-status", !value || value === "0" ? "" : "error");
            },

        },

    });

})(jQuery, window, document);
