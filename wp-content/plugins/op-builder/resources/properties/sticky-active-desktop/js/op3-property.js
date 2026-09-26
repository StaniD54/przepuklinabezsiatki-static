/**
 * OptimizePress3 StickyActiveDesktop property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.StickyActiveDesktop = OP3.defineClass({

        Name: "OP3.Property.StickyActiveDesktop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "stickyActiveDesktop",

            _defaults: {
                label: function() {
                    return OP3._("Apply on Desktop");
                },
                selector: " [data-op3-sticky-active-desktop]",
                tag: "select",
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-sticky-active-desktop") || "1";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-sticky-active-desktop", value);
            },

        },

    });

})(jQuery, window, document);
