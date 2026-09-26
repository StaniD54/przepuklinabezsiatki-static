/**
 * OptimizePress3 dateTimeType property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.DateTimeType = OP3.defineClass({

        Name: "OP3.Property.DateTimeType",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "dateTimeType",

            _defaults: {
                label: function() {
                    return OP3._("Type");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "dynamic": "Dynamic Date/Time" },
                    { "specific": "Specific Date/Time" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-datetime-type");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-datetime-type", value);
            },

        },

    });

})(jQuery, window, document);
