/**
 * OptimizePress3 StickyActiveTablet property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.StickyActiveTablet = OP3.defineClass({

        Name: "OP3.Property.StickyActiveTablet",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "stickyActiveTablet",

            _defaults: {
                label: function() {
                    return OP3._("Apply on Tablet");
                },
                selector: " [data-op3-sticky-active-tablet]",
                tag: "select",
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-sticky-active-tablet") || "1";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-sticky-active-tablet", value);
            },

        },

    });

})(jQuery, window, document);
