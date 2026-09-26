/**
 * OptimizePress3 element.
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
    OP3.Elements._extension.prop.TimerSeconds = OP3.defineClass({

        Name: "OP3.Property.TimerSeconds",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "timerSeconds",

            _defaults: {
                label: function() {
                    return OP3._("Seconds");
                },
                selector: " > [data-op-timer-seconds]",
                attr: {
                    type: "number",
                    min: "0",
                }
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-timer-seconds") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-timer-seconds", value || "0");
            },

        },

    });

})(jQuery, window, document);
