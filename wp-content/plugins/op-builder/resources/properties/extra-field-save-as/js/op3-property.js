/**
 * OptimizePress3 ExtraFieldSaveAs property.
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
    OP3.Elements._extension.prop.ExtraFieldSaveAs = OP3.defineClass({

        Name: "OP3.Property.ExtraFieldSaveAs",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "extraFieldSaveAs",

            _defaults: {
                label: function() {
                    return OP3._("Extra Field Type");
                },
                tag: "select",
                options: [
                    { "custom_field": "Custom Field" },
                    { "tag": "Tag" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                var value = $(this.target()).attr("data-op3-extra-field-save-as");

                if (!value)
                    value = "0";

                return value;
            },

            setter: function(value, media) {
                if (!value)
                    value = "0";

                $(this.target()).attr("data-op3-extra-field-save-as", value);
            },

        },

    });

})(jQuery, window, document);
