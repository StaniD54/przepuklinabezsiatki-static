/**
 * OptimizePress3 WrapColumns property.
 *
 * Can be set to column and row, but
 * we manipulate it only on the row.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BulletblockMedia = OP3.defineClass({

        Name: "OP3.Property.BulletblockMedia",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "bulletblockMedia",

            _defaults: {
                label: function() {
                    return OP3._("Display Media");
                },
                selector: " [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "icon": "Icon" },
                    { "image": "Image" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-bulletblock-media") || "icon";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-bulletblock-media", value || "icon");
            },

        },

    });

})(jQuery, window, document);
