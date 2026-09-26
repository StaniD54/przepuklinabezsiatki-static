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
    OP3.Elements._extension.prop.SelectHrefTarget = OP3.defineClass({

        Name: "OP3.Property.SelectHrefTarget",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "selectHrefTarget",

            _defaults: {
                label: function() {
                    return OP3._("Select Target");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-select-href-target-state") || "0";
            },

            setter: function(value, media) {
                if (value === "1") {
                    OP3.Designer.$ui.body.attr("data-op3-select-href-target", "1");
                    OP3.LiveEditor.$ui.body.attr("data-op3-select-href-target", "1");
                }

                return $(this.target()).attr("data-op3-select-href-target-state", value || "0");
            },

        },

    });

    OP3.bind("elementchange::*::selectHrefTarget", function(e, o) {
        if (o.value.after === "1")
            OP3.$(o.node).setOption(o.name, "0", "all");
    });

})(jQuery, window, document);
