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
    OP3.Elements._extension.prop.IntervalType = OP3.defineClass({

        Name: "OP3.Property.IntervalType",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "intervalType",

            _defaults: {
                label: function() {
                    return OP3._("Interval Type");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "date": "Date" },
                    { "time": "Time" },
                    { "day": "24 Hour Timer" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-interval-type");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-interval-type", value);
            },

        },

    });

})(jQuery, window, document);
