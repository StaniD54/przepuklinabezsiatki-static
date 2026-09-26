/**
 * OptimizePress3 editFinishText property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.EditFinishText = OP3.defineClass({

        Name: "OP3.Property.EditFinishText",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "editFinishText",

            _defaults: {
                label: function() {
                    return OP3._("Edit Finish Text");
                },
                selector: "",
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
                return $(this.target()).attr("data-op3-edit-finish-text") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-edit-finish-text", value || "0");
            },

        },

    });

})(jQuery, window, document);
