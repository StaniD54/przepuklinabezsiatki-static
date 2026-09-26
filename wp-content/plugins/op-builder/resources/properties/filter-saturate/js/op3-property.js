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
    OP3.Elements._extension.prop.FilterSaturate = OP3.defineClass({

        Name: "OP3.Property.FilterSaturate",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "filterSaturate",

            _defaults: {
                label: function() {
                    return OP3._("Saturation");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "%",
                    "data-min-percent": "0",
                    "data-max-percent": "300",
                    "data-step-percent": "1",
                    "data-precision-percent": "0",
                },
                units: [
                    "%"
                ],
                defaultUnit: "%",
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                this._proxy = this.element.findProperty(this.id().replace(/Saturate/, ""));

                return this.proxy();
            },

            computed: function () {
                return this.proxy().computed();
            },

            // filter returns values in range unitless numbers
            getter: function (media) {
                var result = this.proxy().getter(media) || this.computed();
                var saturate = result.match(/saturate\(([\d\.]+)/);

                // If property isn't set, set it to 100%,
                // which means default saturate
                //
                // NOTE:
                // There is a bug in the system currently which animates
                // background when transition is set and makes it look
                // like saturate is changing--it isn't
                saturate = saturate ? saturate[1] : 1;

                return Math.round(saturate * 100);
            },

            setter: function (value, media) {
                var proxy = this.proxy();

                // The entire set of filters used on the image must be present,
                // because hover transition doesn't work otherwise
                var current = proxy.element.getOption(proxy.id(), media) || "sepia(0) grayscale(0) brightness(1) blur(0px) contrast(1) invert(0) saturate(1)";
                value = parseInt(value, 10) / 100;
                value = current.replace(/saturate\(([\d\.]+)\)/, 'saturate(' + value + ')');

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), value, media);
            },

        },

    });

})(jQuery, window, document);
