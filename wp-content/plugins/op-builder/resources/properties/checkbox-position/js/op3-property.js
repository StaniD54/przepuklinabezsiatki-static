/**
 * OptimizePress3 checked property.
 *
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
    OP3.Elements._extension.prop.CheckboxPosition = OP3.defineClass({

        Name: "OP3.Property.CheckboxPosition",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "checkboxPosition",

            _defaults: {
                label: function() {
                    return OP3._("Checkbox Position");
                },
                tag: "select",
                selector: " [data-op-checkbox-position]",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "left": "Left" },
                    { "right": "Right" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-checkbox-position") || "left";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-checkbox-position", value);
            },

        },

    });

})(jQuery, window, document);
