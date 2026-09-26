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
    OP3.Elements._extension.prop.FilterBrightness = OP3.defineClass({

        Name: "OP3.Property.FilterBrightness",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "filterBrightness",

            _defaults: {
                label: function() {
                    return OP3._("Brightness");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "%",
                    "data-min-percent": "70",
                    "data-max-percent": "150",
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

                this._proxy = this.element.findProperty(this.id().replace(/Brightness/, ""));

                return this.proxy();
            },

            computed: function () {
                return this.proxy().computed();
            },

            // filter returns values in range unitless numbers
            getter: function (media) {
                var result = this.proxy().getter(media) || this.computed();
                var brightness = result.match(/brightness\(([\d\.]+)/);

                // If property isn't set, set it to 100%,
                // which means default brightness
                //
                // NOTE:
                // There is a bug in the system currently which animates
                // background when transition is set and makes it look
                // like brightness is changing--it isn't
                brightness = brightness ? brightness[1] : 1;

                return Math.round(brightness * 100);
            },

            setter: function (value, media) {
                var proxy = this.proxy();

                // The entire set of filters used on the image must be present,
                // because hover transition doesn't work otherwise
                var current = proxy.element.getOption(proxy.id(), media) || "sepia(0) grayscale(0) brightness(1) blur(0px) contrast(1) invert(0) saturate(1)";
                value = parseInt(value, 10) / 100;
                value = current.replace(/brightness\(([\d\.]+)\)/, 'brightness(' + value + ')');

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), value, media);
            },

        },

    });

})(jQuery, window, document);
