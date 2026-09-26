/**
 * OptimizePress3 url property.
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
    OP3.Elements._extension.prop.GoogleMapsZoomControl = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsZoomControl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsZoomControl",

            _defaults: {
                label: function() {
                    return OP3._("Zoom Control");
                },
                selector: " .google-maps-widget",
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
                return $(this.target()).attr("data-op3-googlemaps-zoom-control");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-googlemaps-zoom-control", value);
            },

        },

    });

})(jQuery, window, document);
