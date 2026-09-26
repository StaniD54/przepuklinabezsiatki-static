/**
 * OptimizePress3 CreditCardsStyle property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CreditCardsStyle = OP3.defineClass({

        Name: "OP3.Property.CreditCardsStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "creditCardsStyle",

            _defaults: {
                label: function() {
                    return OP3._("Credit Cards Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons-listed",
                },
                options: [
                    { "colored": "Colored" },
                    { "glyph": "Glyph" },
                    { "outlined": "Outlined" },
                ],
                serialize: false,
            },


            getter: function(media) {
                return $(this.target()).attr("data-op3-credit-card-style") || "";
            },

            setter: function(value, media) {
                return $(this.target()).attr("data-op3-credit-card-style", value || "");
            },

        },

    });

})(jQuery, window, document);
