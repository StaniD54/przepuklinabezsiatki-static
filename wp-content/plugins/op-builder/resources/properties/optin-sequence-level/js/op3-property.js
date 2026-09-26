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
    OP3.Elements._extension.prop.OptinSequenceLevel = OP3.defineClass({

        Name: "OP3.Property.OptinSequenceLevel",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "optinSequenceLevel",

            _defaults: {
                label: function() {
                    return OP3._("Using Sequence Level");
                },
                selector: ' [name="optin-sequence-level"]',
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
