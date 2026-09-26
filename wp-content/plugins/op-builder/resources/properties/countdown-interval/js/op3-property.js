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
    OP3.Elements._extension.prop.CountdownInterval = OP3.defineClass({

        Name: "OP3.Property.CountdownInterval",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "countdownInterval",

            _defaults: {
                label: function() {
                    return OP3._("Interval");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "5": "5 min" },
                    { "10": "10 min" },
                    { "15": "15 min" },
                    { "20": "20 min" },
                    { "30": "30 min" },
                    { "60": "1 hour" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-interval") || "";
            },

            setter: function(value, media) {
                return $(this.target()).attr("data-op3-interval", value || "");
            },

        },

    });

})(jQuery, window, document);
