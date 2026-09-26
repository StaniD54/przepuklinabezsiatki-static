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
    OP3.Elements._extension.prop.SmoothScroll = OP3.defineClass({

        Name: "OP3.Property.SmoothScroll",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "smoothScroll",

            _defaults: {
                label: function() {
                    return OP3._("Smooth Scroll");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                selector: " [data-op3-smooth-scroll]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-smooth-scroll") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-smooth-scroll", value);
            },

        },

    });

})(jQuery, window, document);
