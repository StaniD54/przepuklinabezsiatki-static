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
    OP3.Elements._extension.prop.GoogleMapsTheme = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsTheme",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsTheme",

            _defaults: {
                label: function() {
                    return OP3._("Map Theme Style");
                },
                selector: " .google-maps-widget",
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "standard": "Standard" },
                    { "silver": "Silver" },
                    { "retro": "Retro" },
                    { "dark": "Dark" },
                    { "night": "Night" },
                    { "aubergine": "Aubergine" },
                    { "flat": "Flat" },
                ],
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-googlemaps-theme");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-googlemaps-theme", value);
            },

        },

    });

})(jQuery, window, document);
