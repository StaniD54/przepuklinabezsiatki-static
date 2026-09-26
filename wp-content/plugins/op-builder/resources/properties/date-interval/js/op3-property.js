/**
 * OptimizePress3 url property.
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
    OP3.Elements._extension.prop.DateInterval = OP3.defineClass({

        Name: "OP3.Property.DateInterval",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "dateInterval",

            _defaults: {
                label: function() {
                    return OP3._("Date Interval");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "0": "Today" },
                    { "1": "Tommorow" },
                    { "2": "+2 Days" },
                    { "3": "+3 Days" },
                    { "4": "+4 Days" },
                    { "5": "+5 Days" },
                    { "6": "+6 Days" },
                    { "7": "+7 Days" },
                    { "custom": "Custom" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-date-interval");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-date-interval", value);
            },

        },

    });

})(jQuery, window, document);
