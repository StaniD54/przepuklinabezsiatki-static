/**
 * OptimizePress3 property.
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
    OP3.Elements._extension.prop.AnimationStyle = OP3.defineClass({

        Name: "OP3.Property.AnimationStyle",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "animationStyle",

            _defaults: {
                label: function() {
                    return OP3._("Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [
                    { "": "None" },
                    { "fade": "Fade In" },
                    { "scale-up": "Scale Up" },
                    { "scale-down": "Scale Down" },
                    { "slide-up": "Slide Up" },
                    { "slide-down": "Slide Down" },
                    { "slide-left": "Slide Left" },
                    { "slide-right": "Slide Right" },
                    // { "grow": "Grow" },
                    // { "shrink": "Shrink" },
                ],
                selector: " > [data-op-animation-style]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op-animation-style") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op-animation-style", value);
            },

        },

    });

    // Show the animation when changed
    OP3.bind("elementchange::*::animationStyle", function(e, o) {
        var $node = $(o.node);
        $node.attr("data-op-animation-state", "enter");
        $node.attr("data-op-animation-style", o.value.after);

        setTimeout(function() {
            $node.attr("data-op-animation-state", "enter enter-active");
        }, 100);
    });

})(jQuery, window, document);
