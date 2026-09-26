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
    OP3.Elements._extension.prop.FilterIconShadow = OP3.defineClass({

        Name: "OP3.Property.FilterIconShadow",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "filterIconShadow",

            _defaults: {
                label: function() {
                    return OP3._("Icon Shadow");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                serialize: false,
            },

            _skipSetOptionChangeValidation: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'IconShadow' at end)
                this._proxy = this.element.findProperty(this.id().replace(/IconShadow$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var css = proxy.computed();

                if (css.indexOf('drop-shadow') > -1)
                    return "1";

                return "0";
            },

            setter: function(value, media) {
                var proxy = this.proxy();
                var result = null;

                if (value === "1")
                    result = "drop-shadow(rgba(0, 0, 0, 0.2) 0px 2px 6px)";

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), result, media);
            },


        },

    });

})(jQuery, window, document);
