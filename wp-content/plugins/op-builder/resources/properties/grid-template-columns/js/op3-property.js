/**
 * OptimizePress3 property:
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.GridTemplateColumns = OP3.defineClass({

        Name: "OP3.Property.GridTemplateColumns",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "gridTemplateColumns",

            _defaults: {
                label: function() {
                    return OP3._("Grid Template Columns");
                },
                selector: " [data-op3-children]",
            },

        },

    });

})(jQuery, window, document);
