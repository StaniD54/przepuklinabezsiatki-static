/**
 * OptimizePress3 audioDownlod property.
 *
 * Currently only chrome has build in download option for audio html5 tag.
 * That's reason why downlaod link is placed outside od <audio> html tag.
 * Point of this property is to make download of audio consistent in all browsers.
 *
 * Notes:
 * If this attribute is set to "No",
 * Audio.php afterRender method will remove download link.
 *
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.AudioDownload = OP3.defineClass({

        Name: "OP3.Property.AudioDownload",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "audioDownload",

            _defaults: {
                label: function() {
                    return OP3._("Download");
                },
                selector: " [data-op3-audio-download]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-audio-download") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-audio-download", value || "0");
            },

        },

    });

})(jQuery, window, document);
