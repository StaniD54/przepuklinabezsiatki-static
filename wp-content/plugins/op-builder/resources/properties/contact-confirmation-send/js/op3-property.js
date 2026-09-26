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
    OP3.Elements._extension.prop.ContactConfirmationSend = OP3.defineClass({

        Name: "OP3.Property.ContactConfirmationSend",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "contactConfirmationSend",

            _defaults: {
                label: function() {
                    return OP3._("Send Confirmation Message");
                },
                selector: ' [name="contact-confirmation-message-send"]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "0";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "0");

                $(this.target()).val(value);
            },

        },

    });

})(jQuery, window, document);
