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
    OP3.Elements._extension.prop.DayInterval = OP3.defineClass({

        Name: "OP3.Property.DayInterval",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "dayInterval",

            _defaults: {
                label: function() {
                    return OP3._("24 Hour Timer Interval");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "24": "12am" },
                    { "1": "1am" },
                    { "2": "2am" },
                    { "3": "3am" },
                    { "4": "4am" },
                    { "5": "5am" },
                    { "6": "6am" },
                    { "7": "7am" },
                    { "8": "8am" },
                    { "9": "9am" },
                    { "10": "10am" },
                    { "11": "11am" },
                    { "12": "12pm" },
                    { "13": "1pm" },
                    { "14": "2pm" },
                    { "15": "3pm" },
                    { "16": "4pm" },
                    { "17": "5pm" },
                    { "18": "6pm" },
                    { "19": "7pm" },
                    { "20": "8pm" },
                    { "21": "9pm" },
                    { "22": "10pm" },
                    { "23": "11pm" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-day-interval");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-day-interval", value);
            },

        },

    });

})(jQuery, window, document);
