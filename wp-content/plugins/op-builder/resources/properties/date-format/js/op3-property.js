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
    OP3.Elements._extension.prop.DateFormat = OP3.defineClass({

        Name: "OP3.Property.DateFormat",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "dateFormat",

            _defaults: {
                label: function() {
                    return OP3._("Date Format");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { 'weekday:long,day:2-digit,month:long,year:numeric': "Monday 01 January 2025" },
                    { 'weekday:long,month:long,day:2-digit,year:numeric': "Monday January 01 2025" },
                    { 'weekday:long,month:long,day:numeric,year:numeric': "Monday January 1 2025" },
                    { 'weekday:long,day:numeric,month:long,year:numeric': "Monday 1 January 2025" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-date-format");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-date-format", value);
            },

        },

    });

})(jQuery, window, document);
