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
    OP3.Elements._extension.prop.CartPostActionRedirectURL = OP3.defineClass({

        Name: "OP3.Property.CartPostActionRedirectURL",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "cartPostActionRedirectURL",

            _defaults: {
                label: function() {
                    return OP3._("URL");
                },
                selector: ' [name="cart-post-action-redirect-url"]',
                attr: {
                    type: "url",
                }
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || window.location.href.split("?")[0];
            },

            setter: function(value, media) {
                // validate url
                try {
                    new URL(value);
                } catch(e) {
                    return;
                }

                // not an css property, ignore media
                $(this.target()).val(value);
            },

        },

    });

})(jQuery, window, document);
