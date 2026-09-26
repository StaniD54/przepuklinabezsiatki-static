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
    OP3.Elements._extension.prop.TimerMinutes = OP3.defineClass({

        Name: "OP3.Property.TimerMinutes",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "timerMinutes",

            _defaults: {
                label: function() {
                    return OP3._("Minutes");
                },
                selector: " > [data-op-timer-minutes]",
                attr: {
                    type: "number",
                    min: "0",
                }
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-timer-minutes") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-timer-minutes", value || "0");
            },

        },

    });

})(jQuery, window, document);
