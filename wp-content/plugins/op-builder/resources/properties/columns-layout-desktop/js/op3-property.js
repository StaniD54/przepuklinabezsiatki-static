/**
 * OptimizePress3 ColumnsLayoutDesktop property.
 *
 * This is a wrapper for WrapColumnsDesktop and
 * StackColumnDesktop properties. Instead two
 * toggle buttons we have one dropdown
 * property widget...
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.ColumnsLayoutDesktop = OP3.defineClass({

        Name: "OP3.Property.ColumnsLayoutDesktop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "columnsLayoutDesktop",

            _defaults: {
                label: function() {
                    return OP3._("Desktop Columns");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "0": "Custom Size" },
                    { "1": "Wrap Columns" },
                    { "2": "Stack Columns" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                if (this.element.getOption("stackColumnsDesktop", "all") === "1")
                    return "2"
                else if (this.element.getOption("wrapColumnsDesktop", "all") === "1")
                    return "1"

                return "0";
            },

            setter: function(value, media) {
                var stack = "0",
                    wrap = "0";
                if (value == "2")
                    stack = "1";
                else if (value == "1")
                    wrap = "1";

                this.element.setOption("wrapColumnsDesktop", wrap, media);
                this.element.setOption("stackColumnsDesktop", stack, media);
            },

        },

    });

    // Refresh proxy property widget:
    // sync proxy property widget
    OP3.bind("elementchange::*::wrapColumnsDesktop elementchange::*::wrapColumnsTablet elementchange::*::wrapColumnsMobile elementchange::*::stackColumnsDesktop elementchange::*::stackColumnsTablet elementchange::*::stackColumnsMobile", function(e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        var prop = o.id.replace(/wrapColumns|stackColumns/, 'ColumnsLayout');
        OP3.transmit("elementoptionssyncrequest", [ prop ]);
    });

    // Refresh proxy property widget:
    // sync column property widget on row change (can occur on history)
    OP3.bind("elementchange::*::columnsLayoutDesktop elementchange::*::columnsLayoutTablet elementchange::*::columnsLayoutMobile", function(e, o) {
        var active = OP3.Designer.activeElement();
        if (active === OP3.Document)
            return;

        var parent = OP3.$(active).closestHorizontal();
        if (parent.is(active) || !parent.is(o.node))
            return;

        var prop = o.id;
        OP3.transmit("elementoptionssyncrequest", [ prop ]);
    });

})(jQuery, window, document);
