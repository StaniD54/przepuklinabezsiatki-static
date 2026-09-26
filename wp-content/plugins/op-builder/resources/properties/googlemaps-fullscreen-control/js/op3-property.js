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
    OP3.Elements._extension.prop.GoogleMapsFullscreenControl = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsFullscreenControl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsFullscreenControl",

            _defaults: {
                label: function() {
                    return OP3._("Fullscreen Control");
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
                return $(this.target()).attr("data-op3-googlemaps-fullscreen-control");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-googlemaps-fullscreen-control", value);
            },

        },

    });

})(jQuery, window, document);
