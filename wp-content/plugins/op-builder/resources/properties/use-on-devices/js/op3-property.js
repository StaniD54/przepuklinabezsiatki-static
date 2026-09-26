/**
 * OptimizePress3 UseOnDevices property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.UseOnDevices = OP3.defineClass({

        Name: "OP3.Property.UseOnDevices",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "useOnDevices",

            _defaults: {
                label: function() {
                    return OP3._("Use on Devices");
                },
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
                return $(this.target()).attr("data-op3-use-on-devices") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-use-on-devices", value*1 ? "1" : "0");
            },

        },

    });

})(jQuery, window, document);
