/**
 * OptimizePress3 property
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.GoogleMapsZoom = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsZoom",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsZoom",

            _defaults: {
                label: function() {
                    return OP3._("Zoom");
                },
                selector: " .google-maps-widget",
                attr: {
                    "data-property-type": "range",
                    "data-units": "",
                    "data-min-": "0",
                    "data-max-": "18",
                    "data-step-": "1",
                    "data-precision-": "0",
                },
                units: [
                    "",
                ],
                defaultUnit: "",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-googlemaps-zoom");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-googlemaps-zoom", value);
            },

        },

    });

})(jQuery, window, document);
