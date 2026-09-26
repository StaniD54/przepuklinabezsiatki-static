/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.TabContentAnimation = OP3.defineClass({

        Name: "OP3.Property.TabContentAnimation",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "tabContentAnimation",

            _defaults: {
                label: function() {
                    return OP3._("Tab Content Animation");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "": "None" },
                    { "fade": "Fade In" },
                    { "scale-up": "Scale Up" },
                    { "scale-down": "Scale Down" },
                    { "slide-up": "Slide Up" },
                    { "slide-down": "Slide Down" },
                    { "slide-left": "Slide Left" },
                    { "slide-right": "Slide Right" },
                ],
                selector: " [data-op3-tab-content-animation]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-tab-content-animation") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-tab-content-animation", value);
            },

        },

    });

})(jQuery, window, document);
