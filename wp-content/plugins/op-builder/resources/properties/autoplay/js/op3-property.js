/**
 * OptimizePress3 autoplay property.
 *
 * Property represent autoplay attribute in <audio> html tag.
 * In Audio.php afterRender data-op3-audio-autoplay="" will be converted to autoplay,
 * this way we avoid autoplay in live editor
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Autoplay = OP3.defineClass({

        Name: "OP3.Property.Autoplay",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "autoplay",

            _defaults: {
                label: function() {
                    return OP3._("Autoplay");
                },
                desc: "Autoplay functionality may be limited depending on browser settings of your visor.",
                selector: " audio",
                tag: "select",
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-audio-autoplay") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-audio-autoplay", value || "0");
            },

        },

    });

})(jQuery, window, document);
