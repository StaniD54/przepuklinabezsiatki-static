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
    OP3.Elements._extension.prop.Required = OP3.defineClass({

        Name: "OP3.Property.Required",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "required",

            _defaults: {
                label: function() {
                    return OP3._("Required");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
            },

            _forceComputed: true,

            /**
             * Create option element suitable for live-editor sidebar.
             *
             * Check for requiredLock property on current element and make
             * input DOM element disabled if requiredLock property is "1"
             * on current element. No need for elementchange event listener
             * on requiredLock property since the property is defined by
             * integration, and once is set should be readonly.
             *
             * @param  {String} media (optional)
             * @return {Object}
             */
            prerender: function(media) {
                var result = OP3.Elements._extension.prop.Default.prototype.prerender.apply(this, arguments),
                    lockProperty = this.element.findProperty(this.id() + "Lock"),
                    lockValue = lockProperty ? !!(lockProperty.computed()*1) : false;

                if (lockValue)
                    $(result)
                        .find(".op3-element-options-property-input")
                        .attr("disabled", "disabled");

                return result;
            },

            computed: function() {
                return $(this.target()).is("[required]") ? "1" : "0";
            },

            setter: function(value, media) {
                if (value === "1")
                    $(this.target()).attr("required", "required");
                else
                    $(this.target()).removeAttr("required");
            },

        },

    });

})(jQuery, window, document);
