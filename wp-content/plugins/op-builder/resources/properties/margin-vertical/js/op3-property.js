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
    OP3.Elements._extension.prop.MarginVertical = OP3.defineClass({

        Name: "OP3.Property.MarginVertical",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "marginVertical",

            _defaults: {
                label: function() {
                    return OP3._("Line Spacing");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "em",
                    "data-min-em": "0",
                    "data-max-em": "5",
                    "data-step-em": "0.001",
                    "data-precision-em": "0.001",
                    "data-avoid-text-max": "1",
                },
                units: [
                    "em",
                ],
                defaultUnit: "em",
                serialize: false,
            },

            _prefix: function() {
                return this.id().replace(/Vertical$/, "");
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object ('Vertical' replaced
                // with 'Top')
                this._proxy = this.element.findProperty(this._prefix() + "Top");

                return this.proxy();
            },

            selector: function() {
                return this.proxy().selector();
            },

            target: function() {
                return this.proxy().target();
            },

            computed: function() {
                var prefix = this._prefix(),
                    marginTop = this.element.getOption(prefix + "Top", true),
                    marginBottom = this.element.getOption(prefix + "Bottom", true),
                    value = parseFloat(marginTop) > parseFloat(marginBottom) ? marginTop : marginBottom;

                value = this._fix(value);
                value = this._doReplace(value);
                value = this._validateUnit(value);

                return value;
            },

            getter: function(media) {
                var prefix = this._prefix(),
                    marginTop = this.element.getOption(prefix + "Top", media),
                    marginBottom = this.element.getOption(prefix + "Bottom", media),
                    value = parseFloat(marginTop) > parseFloat(marginBottom) ? marginTop : marginBottom;

                value = this._fix(value);
                value = this._doReplace(value);
                value = this._validateUnit(value);

                return value;
            },

            setter: function(value, media) {
                var prefix = this._prefix();

                this.element.setOption(prefix + "Top", value, media);
                this.element.setOption(prefix + "Bottom", value, media);
            },

        },

    });

})(jQuery, window, document);
