/**
 * OptimizePress3 property.
 *
 * This is not an actual property. It is a proxy
 * property that sets left and right margins for
 * chosen selector at once.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Gutter2 = OP3.defineClass({

        Name: "OP3.Property.Gutter2",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "gutter2",

            _defaults: {
                label: function() {
                    return OP3._("Gutter");
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
                    "px",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            computed: function() {
                var left = this.element.getOption("gutterLeft", true);

                return left;
            },

            getter: function(media) {
                // @todo -> media is not optional!!!
                if (!media)
                    return this.computed();

                var result = "";

                // fallback
                try {
                    result = this.element.getOption("gutterLeft", true);
                } catch(e) {
                    return result;
                }

                // getter
                return result;
            },

            setter: function(value, media) {
                this.element.setOption("gutterLeft", value, media);
                this.element.setOption("gutterRight", value, media);
            },

        },

    });

})(jQuery, window, document);
