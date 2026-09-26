/**
 * OptimizePress3 property.
 *
 * Optimizepress form elements are going to /op3/v1/optin/submit route.
 * Using this property we want to store form action for html integration
 * so we can redirect form data later (see HtmlIntegration.php optin method).
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.OptinAction = OP3.defineClass({

        Name: "OP3.Property.OptinAction",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinAction",

            _defaults: {
                label: function() {
                    return OP3._("Optin Action");
                },
                selector: ' [name="optin-action"]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).val(value);
            },

        },

    });

})(jQuery, window, document);
