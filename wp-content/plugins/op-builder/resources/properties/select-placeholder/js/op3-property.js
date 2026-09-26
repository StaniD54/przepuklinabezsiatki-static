/**
 * OptimizePress3 selectPlaceholder property.
 *
 * Placeholder for select2,
 * stored as data-placeholder attribute
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
    OP3.Elements._extension.prop.SelectPlaceholder = OP3.defineClass({

        Name: "OP3.Property.SelectPlaceholder",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "selectPlaceholder",

            _defaults: {
                label: function() {
                    return OP3._("Placeholder");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-placeholder") || "";
            },

            setter: function(value, media) {
                value = OP3.$.escapeSpecialChars(value || "");

                $(this.target()).attr("data-placeholder", value);
            },

        },

    });

})(jQuery, window, document);
