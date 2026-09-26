/**
 * OptimizePress3 property.
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.AnimationLoop = OP3.defineClass({

        Name: "OP3.Property.AnimationLoop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "animationLoop",

            _defaults: {
                label: function() {
                    return OP3._("Loop Animation (on Scroll to)");
                },
                selector: " > [data-op-animation-loop]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-animation-loop") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-animation-loop", value);
            },

        },

    });

})(jQuery, window, document);
