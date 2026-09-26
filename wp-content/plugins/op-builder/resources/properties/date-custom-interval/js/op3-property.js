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
    OP3.Elements._extension.prop.DateCustomInterval = OP3.defineClass({

        Name: "OP3.Property.DateCustomInterval",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "dateCustomInterval",

            _defaults: {
                label: function() {
                    return OP3._("Date Custom Interval");
                },
                attr: {
                    type: "number",
                    min: "1",
                    max: "30",
                }
            },
            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-date-custom-interval");
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-date-custom-interval", value);
            },

        },

    });

})(jQuery, window, document);
