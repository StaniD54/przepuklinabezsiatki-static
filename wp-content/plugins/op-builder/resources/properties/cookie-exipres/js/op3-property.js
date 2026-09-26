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
    OP3.Elements._extension.prop.CookieExpires = OP3.defineClass({

        Name: "OP3.Property.CookieExpires",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "cookieExpires",

            _defaults: {
                label: function() {
                    return OP3._("Cookie Expires");
                },
                attr: {
                    "data-property-type": "range",
                    "data-units": "days",
                    "data-min-days": "0",
                    "data-max-days": "365",
                    "data-step-days": "1",
                    "data-precision-days": "0",
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-cookie-expires") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-cookie-expires", parseInt(value) || 0);
            },

        },

    });

})(jQuery, window, document);
