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
    OP3.Elements._extension.prop.CounterAnimationDuration = OP3.defineClass({

        Name: "OP3.Property.CounterAnimationDuration",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "counterAnimationDuration",

            _defaults: {
                label: function() {
                    return OP3._("Animation Duration");
                },
                tag: "input",
                selector: " [data-op3-counter-animation-duration]",
                attr: {
                    "data-property-type": "range",
                    "data-units": "sec",
                    "data-min-sec": "0",
                    "data-max-sec": "60",
                    "data-step-sec": "0.1",
                    "data-precision-sec": "0",
                },
                units: [
                    "sec",
                ],
                defaultUnit: "sec",
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-counter-animation-duration");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-counter-animation-duration", value);
            },

        },

    });

})(jQuery, window, document);
