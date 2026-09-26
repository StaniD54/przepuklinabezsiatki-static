/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.VideoUrlUploaded = OP3.defineClass({

        Name: "OP3.Property.VideoUrlUploaded",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoUrlUploaded",

            _defaults: {
                label: function() {
                    return OP3._("URL");
                },
                attr: {
                    "type": "url",
                    "data-property-type": "video-url-preview",
                },
                selector: " > [data-op3-video-url-uploaded]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-url-uploaded") || "";
            },

            setter: function(value, media) {
                try {
                    new URL(value);
                } catch(e) {
                    // Allow empty string to remove video
                    if (value !== "")
                        return;
                }

                $(this.target()).attr("data-op3-video-url-uploaded", value || "");
            },

        },

    });

})(jQuery, window, document);
