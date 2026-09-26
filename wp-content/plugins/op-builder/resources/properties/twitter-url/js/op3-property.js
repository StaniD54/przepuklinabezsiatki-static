/**
 * OptimizePress3 TwitterUrl property.
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
    OP3.Elements._extension.prop.TwitterUrl = OP3.defineClass({

        Name: "OP3.Property.TwitterUrl",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "twitterUrl",

            _defaults: {
                label: function() {
                    return OP3._("Custom Share URL");
                },
                attr: {
                    placeholder: "https://",
                    type: "url",
                },
                selector: " [data-op3-twitter-url]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-twitter-url") || OP3.Meta.pageUrl;
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-twitter-url", value);
            },

        },

    });

})(jQuery, window, document);
