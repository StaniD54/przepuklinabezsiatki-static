/**
 * OptimizePress3 alt property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.GoogleMapsSearch = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsSearch",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsSearch",

            _defaults: {
                label: function() {
                    return OP3._("Location");
                },
                selector: " .google-maps-widget",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-googlemaps-search") || "";
            },

            setter: function(value, media) {
                value = (value || "")
                    .replace(/</, "")
                    .replace(/>/, "");

                $(this.target()).attr("data-op3-googlemaps-search", value);
            },

        },

    });

})(jQuery, window, document);
