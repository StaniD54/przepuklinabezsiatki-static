/**
 * OptimizePress3 property.
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
    OP3.Elements._extension.prop.OptinEmailSequence = OP3.defineClass({

        Name: "OP3.Property.OptinEmailSequence",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinEmailSequence",

            _defaults: {
                label: function() {
                    return OP3._("Using Email Sequence");
                },
                selector: ' [name="optin-email-sequence"]',
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
