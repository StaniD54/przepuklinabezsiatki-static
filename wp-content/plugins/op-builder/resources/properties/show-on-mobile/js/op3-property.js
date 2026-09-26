/**
 * OptimizePress3 property
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ShowOnMobile = OP3.defineClass({

        Name: "OP3.Property.ShowOnMobile",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "showOnMobile",

            _defaults: {
                label: function() {
                    return OP3._("Show on Mobile");
                },
                selector: " [data-op3-show-on-mobile]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                // serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                var value = $(this.target()).attr("data-op3-show-on-mobile");
                if (value === "") value = "1";
                return value;
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-show-on-mobile", value);
            },

        },

    });

})(jQuery, window, document);
