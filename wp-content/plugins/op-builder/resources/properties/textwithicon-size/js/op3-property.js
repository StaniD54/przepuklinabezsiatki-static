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
    OP3.Elements._extension.prop.TextWithIconSize = OP3.defineClass({

        Name: "OP3.Property.TextWithIconSize",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "textWithIconSize",

            _defaults: {
                label: function() {
                    return OP3._("Size");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": 8,
                    "data-max-px": 72,
                    "data-step-px": 1,
                    "data-precision-px": 0,
                },
                units: [
                    "px",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property are textwithicon child elements:
                // icon, text & image
                this._proxy = OP3.$(this.element.children());

                return this.proxy();
            },

            computed: function() {
                var size = this.element.getOption("textFontSize", true);
                if (!size)
                    return "";

                return size;
            },

            setter: function(value, media) {
                var proxy = this.proxy();
                this.element.setOption('textFontSize', value, media);
                this.element.setOption('iconFontSize', value, media);

                var image = proxy.filter('image');
                var $image = $(image.node()).find('img');
                var ratio = $image.width() / $image.height();
                var width = parseInt(value, 10) * ratio;
                if (width < 1)
                    return;

                image.setOption('width', width + "px", media);
            },

        },

    });

})(jQuery, window, document);
