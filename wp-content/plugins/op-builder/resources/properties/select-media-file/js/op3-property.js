/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.SelectMediaFile = OP3.defineClass({

        Name: "OP3.Property.SelectMediaFile",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "selectMediaFile",

            _defaults: {
                label: function() {
                    return OP3._("Select Media File");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-select-media-file-execute") || "0";
            },

            setter: function(value, media) {
                return $(this.target()).attr("data-op3-select-media-file-execute", value || "0");
            },

        },

    });

    OP3.bind("elementchange::*::selectMediaFile", function(e, o) {
        if (o.value.after !== "1")
            return;

        var element = OP3.$(o.node);
        element.setOption(o.name, "0", "all");

        window.parent.OP3.Media.modalSelect(function(attach) {
            element.setOption("href", attach.url, "all");
        });
    });

})(jQuery, window, document);
