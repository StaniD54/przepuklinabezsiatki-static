/**
 * OptimizePress3 ColumnsLayoutMobile property.
 *
 * This is a wrapper for WrapColumnsMobile and
 * StackColumnMobile properties. Instead two
 * toggle buttons we have one dropdown
 * property widget...
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ColumnsLayoutMobile = OP3.defineClass({

        Name: "OP3.Property.ColumnsLayoutMobile",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "columnsLayoutMobile",

            _defaults: {
                label: function() {
                    return OP3._("Mobile Columns");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "0": "Custom Size" },
                    { "1": "Wrap Columns" },
                    { "2": "Stack Columns" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                if (this.element.getOption("stackColumnsMobile", "all") === "1")
                    return "2"
                else if (this.element.getOption("wrapColumnsMobile", "all") === "1")
                    return "1"

                return "0";
            },

            setter: function(value, media) {
                var stack = "0",
                    wrap = "0";
                if (value == "2")
                    stack = "1";
                else if (value == "1")
                    wrap = "1";

                this.element.setOption("wrapColumnsMobile", wrap, media);
                this.element.setOption("stackColumnsMobile", stack, media);
            },

        },

    });

})(jQuery, window, document);
