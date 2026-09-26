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
    OP3.Elements._extension.prop.VideoUrlSelfhosted = OP3.defineClass({

        Name: "OP3.Property.VideoUrlSelfhosted",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoUrlSelfhosted",

            _defaults: {
                label: function() {
                    return OP3._("URL");
                },
                attr: {
                    "type": "url",
                },
                selector: " > [data-op3-video-url-selfhosted]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-url-selfhosted") || "";
            },

            setter: function(value, media) {
                try {
                    new URL(value);
                } catch(e) {
                    // Allow empty string to remove video
                    if (value !== "")
                        return;
                }

                $(this.target()).attr("data-op3-video-url-selfhosted", value || "");
            },

        },

    });

})(jQuery, window, document);
