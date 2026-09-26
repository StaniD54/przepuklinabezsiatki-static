/**
 * OptimizePress3 GridGap property:
 *
 * Usage:
 * https://codepen.io/fffilo/pen/ZEYRBJV
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.GridGap = OP3.defineClass({

        Name: "OP3.Property.GridGap",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "gridGap",

            _defaults: {
                label: function() {
                    return OP3._("Grid Gap");
                },
                selector: " .op3-element",
                attr: {
                    "data-property-type": "range",
                    "data-units": "px",
                    "data-min-px": "0",
                    "data-max-px": "64",
                    "data-step-px": "1",
                    "data-precision-px": "0",
                },
                units: ["px"],
                serialize: false,
            },

            computed: function() {
                return this.element.getOption("gridGapGridPaddingTop", true);
            },

            getter: function(media) {
                return this.element.getOption("gridGapGridPaddingTop", media);
            },

            setter: function(value, media) {
                var reverse = null;
                if (value)
                    reverse = "-" + value;

                this.element.setOption("gridGapGridMarginTop", reverse, media);
                this.element.setOption("gridGapGridMarginRight", reverse, media);
                this.element.setOption("gridGapGridMarginBottom", reverse, media);
                this.element.setOption("gridGapGridMarginLeft", reverse, media);
                this.element.setOption("gridGapGridPaddingTop", value, media);
                this.element.setOption("gridGapGridPaddingLeft", value, media);
                this.element.setOption("gridGapGridCellBorderRight", value, media);
                this.element.setOption("gridGapGridCellBorderBottom", value, media);
            },

        },

    });

    // sync proxy properties
    //OP3.bind("elementchange::*::gridGap", function(e, o) {
    //      @todo ???
    //});

})(jQuery, window, document);
