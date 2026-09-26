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
    OP3.Elements._extension.prop.GoogleMapsPosition = OP3.defineClass({

        Name: "OP3.Property.GoogleMapsPosition",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "googlemapsPosition",

            _defaults: {
                label: function() {
                    return OP3._("<b>Marker Position</b> (lat,long)");
                },
                selector: " .google-maps-widget",

            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-googlemaps-position");
            },

            setter: function(value, media) {
                var obj = value.split(',');
                if (obj.length !== 2 || isNaN(parseFloat(obj[0])) || isNaN(parseFloat(obj[1])))
                    return;

                $(this.target()).attr("data-op3-googlemaps-position", value);
            },

        },

    });

})(jQuery, window, document);
