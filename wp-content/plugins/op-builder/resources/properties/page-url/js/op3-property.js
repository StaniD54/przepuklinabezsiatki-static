/**
 * OptimizePress3 Url property.
 *
 * Property used to save some url/link
 * in element attribute.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.PageUrl = OP3.defineClass({

        Name: "OP3.Property.PageUrl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "pageUrl",

            _defaults: {
                label: function() {
                    return OP3._("Page URL");
                },
                attr: {
                    placeholder: "https://",
                    type: "url",
                },
                selector: " [data-op3-url]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-url") || OP3.Meta.pageUrl;
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-url", value || "");
            },

        },

    });

})(jQuery, window, document);
