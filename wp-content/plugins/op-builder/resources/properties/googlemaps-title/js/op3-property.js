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
    OP3.Elements._extension.prop.GoogleMapsTitle = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsTitle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsTitle",

            _defaults: {
                label: function() {
                    return OP3._("Info Window Title");
                },
                selector: " .google-maps-widget",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-googlemaps-title") || "";
            },

            setter: function(value, media) {
                value = (value || "")
                    .replace(/</, "")
                    .replace(/>/, "");

                $(this.target()).attr("data-op3-googlemaps-title", value);
            },

        },

    });

})(jQuery, window, document);
