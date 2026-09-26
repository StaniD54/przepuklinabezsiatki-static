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
    OP3.Elements._extension.prop.ProductSetupSource = OP3.defineClass({

        Name: "OP3.Property.ProductSetupSource",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "productSetupSource",

            _defaults: {
                label: function() {
                    return OP3._("Product Setup Source");
                },
                tag: "select",
                selector: ' [name="product-setup-source"]',
                options: [
                    { "": "None" },
                    { "opb": "OptimizeBuilder" },
                    { "opc": "OptimizeCheckout" },
                    { "opf": "OptimizeFunnel" },
                ],
            },

            _forceComputed: true,

            _validateValue: function(value) {
                value = value || "";

                var options = this._defaults.options,
                    valid = options.map(function(item) {
                        return Object.keys(item)[0];
                    }),
                    found = valid.indexOf(value) !== -1;

                return found ? value : valid[0];
            },

            computed: function() {
                var value = $(this.target()).val();
                value = this._validateValue(value);

                return value;
            },

            setter: function(value, media) {
                $(this.target()).val(this._validateValue(value));
            },

        },

    });

})(jQuery, window, document);
