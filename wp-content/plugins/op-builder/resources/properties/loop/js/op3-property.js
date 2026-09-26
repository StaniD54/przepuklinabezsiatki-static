/**
 * OptimizePress3 loop property.
 *
 * Property represent loop attribute in <audio> html tag.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Loop = OP3.defineClass({

        Name: "OP3.Property.Loop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "loop",

            _defaults: {
                label: function() {
                    return OP3._("Loop");
                },
                selector: " audio",
                tag: "select",
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                if ($(this.target()).is("[loop]"))
                    return "1";

                return "0";
            },

            setter: function(value, media) {
                if (value === "1")
                    $(this.target()).prop("loop", true);
                else
                    $(this.target()).prop("loop", false);
            },

        },

    });

})(jQuery, window, document);
