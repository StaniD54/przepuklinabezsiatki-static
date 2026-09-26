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
    OP3.Elements._extension.prop.EffectStyle = OP3.defineClass({

        Name: "OP3.Property.EffectStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "effectStyle",

            _defaults: {
                label: function() {
                    return OP3._("Effect Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "": "None" },
                    { "bounce": "Bounce" },
                    { "rockingsmall": "Rocking (small)" },
                    { "rockinglarge": "Rocking (large)" },
                    { "pulsate": "Pulsate" },
                    { "heartbeat": "Heartbeat" },
                    { "vibrate": "Vibrate" },
                    { "blink": "Blink" },
                ],
                selector: " > [data-op-effect-style]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-effect-style") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-effect-style", value);
            },

        },

    });

})(jQuery, window, document);
