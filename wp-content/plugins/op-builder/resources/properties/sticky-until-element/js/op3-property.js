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
    OP3.Elements._extension.prop.StickyUntilElement = OP3.defineClass({

        Name: "OP3.Property.StickyUntilElement",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "stickyUntilElement",

            _defaults: {
                label: function() {
                    return OP3._("Element class");
                },

                selector: " > [data-op3-sticky-until-element]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-sticky-until-element") || "";
            },

            _validate: function(className) {
                return (className || "")
                    .replace(/[^\w-\s]/g, "")               // allow only alphanum, underscore and hypern
                    .replace(/\s+/g, " ")                   // double space to single
                    .replace(/\b(\d|\-\d|\-\-)*/g, "")      // cannot start with a digit, two hyphens, or a hyphen followed by a digit
                    .replace(/^\s+|\s+$/g, "");             // trim it
            },

            setter: function(value, media) {
                var $el = $(this.target());

                // validate, allow only 1 class
                value = this._validate(value)
                    .split(" ")[0];

                // not an css property, ignore media
                $el.attr("data-op3-sticky-until-element", value);
            },

        },

    });

})(jQuery, window, document);
