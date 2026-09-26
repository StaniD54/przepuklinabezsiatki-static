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
    OP3.Elements._extension.prop.CounterSeparator = OP3.defineClass({

        Name: "OP3.Property.CounterSeparator",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "counterSeparator",

            _defaults: {
                label: function() {
                    return OP3._("Thousands Separator");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "none": "None" },
                    { ",": "Comma" },
                    { ".": "Dot" },
                    { " ": "Space" },
                ],
                selector: " [data-op3-counter-separator]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-counter-separator") || "none";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-counter-separator", value);
            },

        },

    });

})(jQuery, window, document);
