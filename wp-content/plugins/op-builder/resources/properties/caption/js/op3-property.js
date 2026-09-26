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
    OP3.Elements._extension.prop.Caption = OP3.defineClass({

        Name: "OP3.Property.Caption",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "caption",

            _defaults: {
                label: function() {
                    return OP3._("Element Caption");
                },
                attr: {
                    maxlength: "64",
                },
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return this.element.caption();
            },

            setter: function(value, media) {
                this.element.caption(value || "");
            },

        },

    });

})(jQuery, window, document);
