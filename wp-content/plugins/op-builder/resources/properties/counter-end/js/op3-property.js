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
    OP3.Elements._extension.prop.CounterEnd = OP3.defineClass({

        Name: "OP3.Property.CounterEnd",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "counterEnd",

            _defaults: {
                label: function() {
                    return OP3._("Ending Number");
                },
                tag: "input",
                selector: " [data-op3-counter-end]",
                attr: {
                    type: "number",
                    min: 0,
                },
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-counter-end");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-counter-end", value);
            },

        },

    });

})(jQuery, window, document);
