/**
 * OptimizePress3 property,
 * intended to be used on an element
 * whose parent has columnGap property.
 *
 * Proxy for align-items & text-align properties
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
    OP3.Elements._extension.prop.AlignItemsText = OP3.defineClass({

        Name: "OP3.Property.AlignItemsText",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "alignItemsText",

            _defaults: {
                label: function() {
                    return OP3._("Align Text");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "left": "Left" },
                    { "center": "Center" },
                    { "right": "Right" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            mapOption: function(option) {
                var options = {
                    left: "flex-start",
                    center: "center",
                    right: "flex-end",
                }

                return options[option];
            },

            computed: function() {
                return this.element.getOption("buttonTextAlign", true);
            },

            setter: function(value, media) {
                this.element.setOption("buttonTextAlign", value, media);
                this.element.setOption("buttonAlignText", this.mapOption(value), media);
            },

        },

    });

})(jQuery, window, document);
