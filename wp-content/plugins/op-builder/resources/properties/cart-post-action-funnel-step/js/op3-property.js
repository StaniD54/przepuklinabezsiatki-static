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
    OP3.Elements._extension.prop.CartPostActionFunnelStep = OP3.defineClass({

        Name: "OP3.Property.CartPostActionFunnelStep",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "cartPostActionFunnelStep",

            _defaults: {
                label: function() {
                    return OP3._("Select Specific Page in Funnel");
                },
                selector: ' [name="cart-post-action-funnel-step"]',
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: []
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).val() || "";
            },

            setter: function(value, media) {
                $(this.target()).val(value);
            },

        },

    });

})(jQuery, window, document);
