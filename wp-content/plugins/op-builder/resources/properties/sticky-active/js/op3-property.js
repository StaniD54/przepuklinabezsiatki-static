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
    OP3.Elements._extension.prop.StickyActive = OP3.defineClass({

        Name: "OP3.Property.StickyActive",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "stickyActive",

            _defaults: {
                label: function() {
                    return OP3._("Apply on");
                },
                tag: "select",
                attr: {
                    "readonly": "readonly",
                    "data-property-type": "device-sticky",
                },
            },

            serialize: false,

        },

    });

})(jQuery, window, document);
