/**
 * OptinHtml property.
 * Property used to store generated integration html code.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.OptinHtml = OP3.defineClass({

        Name: "OP3.Property.OptinHtml",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinHtml",

            _defaults: {
                label: function() {
                    return OP3._("Custom HTML");
                },
                selector: ' [data-op3-optin-html]',
            },

            computed: function() {
                var value = $(this.target()).attr("data-op3-optin-html") || "";

                value = value
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#x27;/g, "'")
                    .replace(/&#x60;'/g, '`');

                return value;
            },

            getter: function(value, media) {
                return $(this.target()).attr("data-op3-optin-html") || "";
            },

            setter: function(value, media) {

                // When setting a preset, the value here
                // is null and .replace sliently fails
                if (value === null) value = "";

                value = value
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;')
                    .replace(/`/g, '&#x60;');

                // not an css property, ignore media
                $(this.target()).attr("data-op3-optin-html", value);
            },

        },

    });

})(jQuery, window, document);
