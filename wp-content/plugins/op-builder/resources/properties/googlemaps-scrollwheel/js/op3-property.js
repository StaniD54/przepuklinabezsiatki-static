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
    OP3.Elements._extension.prop.GoogleMapsScrollwheel = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsScrollwheel",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsScrollwheel",

            _defaults: {
                label: function() {
                    return OP3._("Scroll Wheel Zoom");
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
                return $(this.target()).attr("data-op3-googlemaps-scrollwheel");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-googlemaps-scrollwheel", value);
            },

        },

    });

})(jQuery, window, document);
