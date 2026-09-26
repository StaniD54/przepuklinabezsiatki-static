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
    OP3.Elements._extension.prop.FontStyle = OP3.defineClass({

        Name: "OP3.Property.FontStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "fontStyle",

            _defaults: {
                label: function() {
                    return OP3._("Font Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "normal": "Normal" },
                    { "italic": "Italic" },
                ],
                replace: [
                    { "oblique": "italic" },
                ],
            },

            computed: function() {
                // If element is OP3.Document the result should not be target's
                // computed value, but dummy element's (element outside OP3
                // wrapper) computed value. Those values are alreay stored
                // in fontStyleDefaultHead and fontStyleDefaultBody
                // properties. This way we're making sure that we have real
                // computed value, not the value set on OP3 element.
                if (this.element === OP3.Document) {
                    var id = this.id(),
                        media = OP3.LiveEditor.deviceMedia();

                    if (id === "tcp_headings_fontStyle")
                        return false
                            || this.getter(media)
                            || OP3.Document.getOption("tcp_all_fontStyle", "all")
                            || OP3.Document.getOption("fontStyleDefaultHead", "all")
                            || "";
                    else if (id === "tcp_texts_fontStyle")
                        return false
                            || this.getter(media)
                            || OP3.Document.getOption("tcp_all_fontStyle", "all")
                            || OP3.Document.getOption("fontStyleDefaultBody", "all")
                            || "";
                    else if (id === "tcp_all_fontStyle")
                        return false
                            || this.getter(media)
                            || OP3.Document.getOption("fontStyleDefaultBody", "all")
                            || "";
                }

                return OP3.Elements._extension.prop.Default.prototype.computed.call(this);
            },

        },

    });

    // use normal/italic event though font does
    // not support it (let browser render font
    // style)
    return;

    /**
     * Default font style
     * option list
     *
     * @type {Array}
     */
    var fontStyleDefult = $.merge([], OP3.Elements._extension.prop.FontStyle.prototype._defaults.options);

    // dynamic options
    OP3.Elements._extension.prop.FontStyle.prototype._defaults.options = function() {
        var prop = this._id
            .replace(/fontStyle/, "fontFamily")
            .replace(/FontStyle/, "FontFamily");
        var family = "";

        try {
            family = this.element.getOption(prop, media || true);
        }
        catch(e) {
            return fontStyleDefult;
        }

        var font = OP3.Fonts.find(family);
        if (!font)
            return fontStyleDefult;

        var style = font.style;
        if (!style || !style.length)
            return fontStyleDefult;

        return style.map(function(item) {
            var map = {};
            var key = item;
            var val = fontStyleDefult[key];

            map[key] = val;
            return map;
        });
    }

})(jQuery, window, document);
