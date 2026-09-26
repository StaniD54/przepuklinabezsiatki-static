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
    OP3.Elements._extension.prop.CartPostAction = OP3.defineClass({

        Name: "OP3.Property.CartPostAction",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "cartPostAction",

            _defaults: {
                label: function() {
                    return OP3._("Post Action");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "": "(None)" },
                    { "productSuccessUrl": "Product Success URL" },
                    { "redirect": "Redirect to URL" }
                ],
                selector: ' [name="cart-post-action"]',
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                $(this.target()).val(value || "");
            },

        },

    });

    // Add funnel option if needed
    OP3.bind("loadelementfunnels", function(e, o) {
        if (o && o.pluginActive && o.funnelId) {
            OP3.Elements._extension.prop.CartPostAction.prototype._defaults.options.push({
                "nextFunnelStep": "Go to Next Funnel Page"
            });
            OP3.Elements._extension.prop.CartPostAction.prototype._defaults.options.push({
                "goToFunnelStep": "Go to Specific Funnel PAge"
            });
       }
    });

})(jQuery, window, document);
