/**
 * OptimizePress3 FlexBasisSteps property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.WrapColumnsFlexBasisSteps = OP3.defineClass({

        Name: "OP3.Property.WrapColumnsFlexBasisSteps",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "wrapColumnsFlexBasisSteps",

            _defaults: {
                label: function() {
                    return OP3._("Columns");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: function() {
                    return [
                        { "none": "Custom" },
                        ...this._presets,
                    ];
                },
                serialize: false,
            },

            _presets: [
                { "100%": "1" },
                { "50%": "2" },
                { "33.33%": "3" },
                { "25%": "4" },
            ],

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has id as this object
                // (without keyword 'Steps')
                this._proxy = this.element.findProperty(this.id().replace(/Steps(.+)?/, ""));

                return this.proxy();
            },

            computed: function() {
                return this.proxy().computed();
            },

            getter: function(media) {
                var value = this.proxy().getter(media);
                if (!value)
                    value = this.computed();

                // Check if value is present in predefined presets
                if (!this._presets.some(element => element[value]))
                    return "none";

                return value;
            },

            setter: function(value, media) {
                var element = this.element,
                    id = this.proxy().id(),
                    mediaFound = false;
                OP3.LiveEditor.forEachDevice(function(dev, med) {
                    mediaFound = mediaFound || med === media;

                    // Set option for media provided in arguments
                    // and any media smaller
                    if (mediaFound)
                        element.setOption(id, value, med);
                });
            },

        },

    });

    // On disabling wrapColumns we need to fix wrapColumnsFlexBasis
    // to make sure our columns layout is set to specific number
    // of columns (1, 2, 3 or 4) rather than some in-between
    // value.
    OP3.bind("elementchange::*::wrapColumnsDesktop elementchange::*::wrapColumnsTablet elementchange::*::wrapColumnsMobile", function(e, o) {
        if (o.value.before !== "1" || o.value.after !== "0")
            return;

        var device = o.id.replace(/^wrapColumns/, ""),
            media = OP3.LiveEditor.deviceMedia(device.toLowerCase()),
            element = OP3.$(o.node),
            childrenCount = element.children().length,
            value = element.getOption("wrapColumnsFlexBasis" + device, "all"),
            valueFloat = parseFloat(value),
            presets = OP3.Elements._extension.prop.WrapColumnsFlexBasisSteps.prototype._presets,
            presetValues = presets
                .map(function(item) {
                    return Object.keys(item)[0];
                }),
            presetColumnCount = presets
                .map(function(item) {
                    return Object.values(item)[0];
                }),
            closest = null;

        // find preset closest to value
        presetValues.forEach(function(item) {
            var itemFloat = parseFloat(item),
                diffItem = Math.abs(itemFloat - valueFloat),
                diffClosest = Math.abs(closest - valueFloat);

            if (closest === null || diffItem < diffClosest)
                closest = itemFloat;
        });

        // make sure preset's current columns count doesn't
        // exceed current columns count
        var newValue = closest + "%";
        while (presetColumnCount[presetValues.indexOf(newValue)] > childrenCount) {
            newValue = presetValues[presetValues.indexOf(newValue) - 1];
        }

        // set as preset
        element.setOption("wrapColumnsFlexBasis", newValue, media);
    });

})(jQuery, window, document);
