/**
 * OptimizePress3 url property.
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
    OP3.Elements._extension.prop.CalendlyUrl = OP3.defineClass({

        Name: "OP3.Property.CalendlyUrl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "calendlyUrl",

            _defaults: {
                label: function() {
                    return OP3._("Calendly URL");
                },
                attr: {
                    placeholder: "https://calendly.com/username/meeting",
                    type: "url",
                }
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-url");
            },

            setter: function(value, media) {
                // Check if given string is real url
                try {
                    new URL(value);
                } catch(e) {
                    // Allow empty string to remove calendly
                    if (value !== "")
                        return;
                }

                // Match url string against regex
                if (!/https:\/\/calendly/.test(value))
                    value = "";

                $(this.target()).attr("data-url", value);
            },

        },

    });

})(jQuery, window, document);
