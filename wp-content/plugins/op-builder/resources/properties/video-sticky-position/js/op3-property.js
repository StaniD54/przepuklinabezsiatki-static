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
    OP3.Elements._extension.prop.VideoStickyPosition = OP3.defineClass({

        Name: "OP3.Property.VideoStickyPosition",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "videoStickyPosition",

            _defaults: {
                label: function() {
                    return OP3._("Float Position");
                },
                tag: "select",
                selector: " [data-op3-video-sticky-position]",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    // { "none": "Select Source" },
                    { "topleft": "Top Left" },
                    { "topright": "Top Right" },
                    { "bottomleft": "Bottom Left" },
                    { "bottomright": "Bottom Right" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-video-sticky-position") || "topright";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-video-sticky-position", value || "topright");
            },

        },

    });

})(jQuery, window, document);
