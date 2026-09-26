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
    OP3.Elements._extension.prop.VideoStickyPreview = OP3.defineClass({

        Name: "OP3.Property.VideoStickyPreview",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoStickyPreview",

            _defaults: {
                label: function() {
                    return OP3._("Preview");
                },
                // selector: " [data-op3-video-sticky-preview]",
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                serialize: false,
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-sticky-preview") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-video-sticky-preview", value || "0");
            },

        },

    });

})(jQuery, window, document);
