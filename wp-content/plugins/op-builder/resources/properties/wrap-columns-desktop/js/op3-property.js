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
    OP3.Elements._extension.prop.WrapColumnsDesktop = OP3.defineClass({

        Name: "OP3.Property.WrapColumnsDesktop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "wrapColumnsDesktop",

            _defaults: {
                label: function() {
                    return OP3._("Wrap Columns Desktop");
                },
                selector: " > [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                // serialize: false,
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // if column is selected, we want to
                // check the parent's property value
                var element = OP3.$(this.element).closestHorizontal();
                if (!element.is(this.element))
                    this._proxy = element.element().findProperty(this._id);
                else
                    this._proxy = this;

                return this.proxy();
            },

            computed: function() {
                return $(this.proxy().target()).attr("data-op3-wrap-columns-desktop") || "0";
            },

            setter: function(value, media) {
                if (this.proxy() !== this)
                    return this.proxy().element.setOption(this.proxy().id(), value, media);

                $(this.proxy().target()).attr("data-op3-wrap-columns-desktop", value);
            },

        },

    });

    // Refresh proxy property widget:
    // sync column property widget on row change (can occur on history)
    OP3.bind("elementchange::*::wrapColumnsDesktop elementchange::*::wrapColumnsTablet elementchange::*::wrapColumnsMobile", function(e, o) {
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
