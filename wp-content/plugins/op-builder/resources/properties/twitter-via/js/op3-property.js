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
    OP3.Elements._extension.prop.TwitterVia = OP3.defineClass({

        Name: "OP3.Property.TwitterVia",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "twitterVia",

            _defaults: {
                label: function() {
                    return OP3._("Via");
                },
                attr: {
                    placeholder: "@",
                },
                selector: " [data-op3-twitter-via]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-twitter-via") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-twitter-via", value || "");
            },

        },

    });

})(jQuery, window, document);
