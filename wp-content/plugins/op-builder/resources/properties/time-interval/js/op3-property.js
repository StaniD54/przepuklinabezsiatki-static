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
    OP3.Elements._extension.prop.TimeInterval = OP3.defineClass({

        Name: "OP3.Property.TimeInterval",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "timeInterval",

            _defaults: {
                label: function() {
                    return OP3._("Time Interval");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "5": "5 Min" },
                    { "10": "10 Min" },
                    { "15": "15 Min" },
                    { "20": "20 Min" },
                    { "30": "30 Min" },
                    { "60": "1 Hour" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-time-interval");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-time-interval", value);
            },

        },

    });

})(jQuery, window, document);
