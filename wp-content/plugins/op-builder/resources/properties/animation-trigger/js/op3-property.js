/**
 * OptimizePress3 property.
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
    OP3.Elements._extension.prop.AnimationTrigger = OP3.defineClass({

        Name: "OP3.Property.AnimationTrigger",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "animationTrigger",

            _defaults: {
                label: function() {
                    return OP3._("Trigger");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "none": "None" },
                    { "load": "On Page Load" },
                    { "scroll": "On Scroll To" },
                    { "load_delay": "Delay After Page Load" },
                    { "scroll_delay": "Delay After Scroll To" },
                    //{ "exitintent": "Exit Intent" },
                ],
                selector: " > [data-op-animation-trigger]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-animation-trigger") || "none";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-animation-trigger", value);
            },

        },

    });

})(jQuery, window, document);
