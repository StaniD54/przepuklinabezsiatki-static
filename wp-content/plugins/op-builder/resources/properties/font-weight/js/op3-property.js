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
    OP3.Elements._extension.prop.FontWeight = OP3.defineClass({

        Name: "OP3.Property.FontWeight",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "fontWeight",

            _defaults: {
                label: function() {
                    return OP3._("Font Weight");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "400": "Normal" },
                    { "700": "Bold" },
                ],
            },

            computed: function() {
                // If element is OP3.Document the result should not be target's
                // computed value, but dummy element's (element outside OP3
                // wrapper) computed value. Those values are alreay stored
                // in fontWeightDefaultHead and fontWeightDefaultBody
                // properties. This way we're making sure that we have real
                // computed value, not the value set on OP3 element.
                if (this.element === OP3.Document) {
                    var id = this.id(),
                        media = OP3.LiveEditor.deviceMedia();

                    if (id === "tcp_headings_fontWeight")
                        return false
                            || this.getter(media)
                            || OP3.Document.getOption("tcp_all_fontWeight", "all")
                            || OP3.Document.getOption("fontWeightDefaultHead", "all")
                            || "";
                    else if (id === "tcp_texts_fontWeight")
                        return false
                            || this.getter(media)
                            || OP3.Document.getOption("tcp_all_fontWeight", "all")
                            || OP3.Document.getOption("fontWeightDefaultBody", "all")
                            || "";
                    else if (id === "tcp_all_fontWeight")
                        return false
                            || this.getter(media)
                            || OP3.Document.getOption("fontWeightDefaultBody", "all")
                            || "";
                }

                // Get first value on fail.
                var result = OP3.Elements._extension.prop.Default.prototype.computed.call(this);
                var valid = this._validOptions();
                if (valid.indexOf(result) === -1)
                    result = valid[0];

                return result;
            },

        },

    });

    /**
     * Default font weight
     * option list
     *
     * @type {Array}
     */
    var fontWeightDefault = $.merge([], OP3.Elements._extension.prop.FontWeight.prototype._defaults.options);

    /**
     * Pair font weight numeric
     * keyword values with their
     * description
     *
     * @type {Object}
     */
    var fontWeightDesc = {
        "100": "Thin",
        "200": "Extra Light",
        "300": "Light",
        "400": "Normal",
        "500": "Medium",
        "600": "Semi Bold",
        "700": "Bold",
        "800": "Extra Bold",
        "900": "Black",
    };

    // dynamic options
    OP3.Elements._extension.prop.FontWeight.prototype._defaults.options = function(media) {
        var prop = this._id
            .replace(/fontWeight/, "fontFamily")
            .replace(/FontWeight/, "FontFamily");
        var family = "";

        try {
            family = this.element.getOption(prop, media || true);
        }
        catch(e) {
            return fontWeightDefault;
        }

        // When element is not attached we will
        // get empty family, allow all weights?
        if (!family)
            return Object.keys(fontWeightDesc).map(function(item) {
                var map = {};
                map[item] = fontWeightDesc[item];

                return map;
            });

        // Family is not google font, return
        // defaults
        var font = OP3.Fonts.find(family);
        if (!font)
            return fontWeightDefault;

        var weight = font.weight;
        if (!weight || !weight.length)
            return fontWeightDefault;

        // Browser renders faux bold if font
        // doesn't contain bold, so we're
        // forcing it here
        if (!weight.includes(700))
            weight.push(700);

        return weight.map(function(item) {
            var map = {};
            var key = item + "";
            map[key] = fontWeightDesc[key];
            return map;
        });
    }

})(jQuery, window, document);
