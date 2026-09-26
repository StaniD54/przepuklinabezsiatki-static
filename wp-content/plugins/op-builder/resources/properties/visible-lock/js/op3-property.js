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
    OP3.Elements._extension.prop.VisibleLock = OP3.defineClass({

        Name: "OP3.Property.VisibleLock",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "visibleLock",

            _defaults: {
                label: function() {
                    return OP3._("Visible Lock");
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                hidden: true,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-property-visible-lock")*1 ? "1" : "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-property-visible-lock", value*1 ? "1" : "0");
            },

        },

    });

})(jQuery, window, document);
