/**
 * OptimizePress3 toggleStatus property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ToggleStatus = OP3.defineClass({

        Name: "OP3.Property.ToggleStatus",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "toggleStatus",

            _defaults: {
                label: function() {
                    return OP3._("Toggle elements");
                },
                selector: " [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    { "": "Default" },
                    { "error": "Error" },
                    { "success": "Success" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-toggle-status") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-toggle-status", value || "");
            },

        },

    });

})(jQuery, window, document);
