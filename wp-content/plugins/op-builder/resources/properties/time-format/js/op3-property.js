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
    OP3.Elements._extension.prop.TimeFormat = OP3.defineClass({

        Name: "OP3.Property.TimeFormat",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "timeFormat",

            _defaults: {
                label: function() {
                    return OP3._("Time Format");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { 'hour12:true,hour:numeric,minute:numeric': "8:25 AM" },
                    { 'hour12:true,hour:numeric,minute:numeric,postmeridiem:dotted': "8:25 a.m." },
                    { 'hour12:false,hour:numeric,minute:numeric': "20:25" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-time-format");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-time-format", value);
            },

        },

    });

})(jQuery, window, document);
