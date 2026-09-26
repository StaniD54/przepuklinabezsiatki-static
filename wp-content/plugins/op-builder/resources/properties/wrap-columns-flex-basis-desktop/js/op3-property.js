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
    OP3.Elements._extension.prop.WrapColumnsFlexBasisDesktop = OP3.defineClass({

        Name: "OP3.Property.WrapColumnsFlexBasisDesktop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "wrapColumnsFlexBasisDesktop",

            _defaults: {
                label: function() {
                    return OP3._("Min Column Width");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-min-percent": "0",
                    "data-max-px": "2000",
                    "data-max-percent": "100",
                    "data-step-px": "1",
                    "data-step-percent": "1",
                    "data-precision-px": "0",
                    "data-precision-percent": "0",
                },
                keywords: [
                    "auto",
                ],
                units: [
                    "px",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            _convert: function(unit_to, unit_from, value) {
                return this.proxy()._convert(unit_to, unit_from, value);
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // if column is selected, we want to check the
                // row's property value
                var element = OP3.$(this.element).closestHorizontal();

                // proxy property is property that has id as this
                // object (without keyword 'Desktop' at the end)
                var prop = this.id().replace(/Desktop$/, "");
                this._proxy = element.element().findProperty(prop);

                return this.proxy();
            },

            computed: function() {
                return this.proxy().computed();
            },

            getter: function(media) {
                media = OP3.LiveEditor.deviceMedia("desktop");
                return this.proxy().getter(media);
            },

            setter: function(value, media) {
                media = OP3.LiveEditor.deviceMedia("desktop");

                // not using proxy setter, we need to execute
                // element.setOption to make sure change is
                // added to history
                var proxy = this.proxy(),
                    element = proxy.element,
                    id = proxy.id();
                element.setOption(id, value, media);
            },
        },

    });

    // Refresh proxy property widget:
    // sync proxy property widget
    OP3.bind("elementchange::*::flexBasis", function(e, o) {
        if (o.id !== "wrapColumnsFlexBasis")
            return;

        var active = OP3.Designer.activeElement();
        if (active === OP3.Document || active.node() !== o.node)
            return;

        var prop = o.id + o.media.charAt(0).toUpperCase() + o.media.slice(1);
        OP3.transmit("elementoptionssyncrequest", [ prop ]);
    });

    // Refresh proxy property widget:
    // sync column property widget on row change (can occur on history)
    OP3.bind("elementchange::*::flexBasis", function(e, o) {
        if (o.id !== "wrapColumnsFlexBasis")
            return;

        var active = OP3.Designer.activeElement();
        if (active === OP3.Document || active.node() === o.node)
            return;
        if (!OP3.$(active).closestHorizontal().is(o.node))
            return;

        var prop = o.id + o.media.charAt(0).toUpperCase() + o.media.slice(1);
        OP3.transmit("elementoptionssyncrequest", [ prop ]);
    });

})(jQuery, window, document);
