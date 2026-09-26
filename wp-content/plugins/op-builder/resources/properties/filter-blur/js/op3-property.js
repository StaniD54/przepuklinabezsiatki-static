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
    OP3.Elements._extension.prop.FilterBlur = OP3.defineClass({

        Name: "OP3.Property.FilterBlur",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "filterBlur",

            _defaults: {
                label: function() {
                    return OP3._("Blur");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "100",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: [
                    "px"
                ],
                defaultUnit: "px",
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                this._proxy = this.element.findProperty(this.id().replace(/Blur/, ""));

                return this.proxy();
            },

            computed: function () {
                return this.proxy().computed();
            },

            // filter returns values in range unitless numbers
            getter: function (media) {
                var result = this.proxy().getter(media) || this.computed();
                var blur = result.match(/blur\(([\d\.]+)/);

                // If property isn't set, set it to 100%,
                // which means default blur
                //
                // NOTE:
                // There is a bug in the system currently which animates
                // background when transition is set and makes it look
                // like blur is changing--it isn't
                blur = blur ? blur[1] : 0;

                // return Math.round(blur * 100);
                return blur + "px";
            },

            setter: function (value, media) {
                var proxy = this.proxy();

                // The entire set of filters used on the image must be present,
                // because hover transition doesn't work otherwise
                var current = proxy.element.getOption(proxy.id(), media) || "sepia(0) grayscale(0) brightness(1) blur(0px) contrast(1) invert(0) saturate(1)";
                value = current.replace(/blur\(([\d\.]+)px\)/, 'blur(' + value + ')');

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), value, media);
            },

        },

    });

})(jQuery, window, document);
