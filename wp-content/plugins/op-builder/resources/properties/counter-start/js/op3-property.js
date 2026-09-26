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
    OP3.Elements._extension.prop.CounterStart = OP3.defineClass({

        Name: "OP3.Property.CounterStart",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "counterStart",

            _defaults: {
                label: function() {
                    return OP3._("Starting Number");
                },
                tag: "input",
                selector: " [data-op3-counter-start]",
                attr: {
                    type: "number",
                    min: 0,
                },
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-counter-start");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-counter-start", value);
            },

        },

    });

})(jQuery, window, document);
