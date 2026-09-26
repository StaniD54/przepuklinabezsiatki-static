/**
 * OptimizePress3 BlockLayout property
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.BlockLayoutDesktop = OP3.defineClass({

        Name: "OP3.Property.BlockLayoutDesktop",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "blockLayoutDesktop",

            _defaults: {
                label: function() {
                    return OP3._("Block Layout");
                },
                selector: " > [data-op3-children]",
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons-listed",
                },
                options: [
                    { "-1": "None" },
                    { "0": "Layout #0" },
                    { "1": "Layout #1" },
                    { "2": "Layout #2" },
                    { "3": "Layout #3" },
                    { "4": "Layout #4" },
                ],
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-block-layout-desktop") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-block-layout-desktop", this._validOptions(media).indexOf(value) === -1 ? "0" : value);
            },

        },

    });

    // Chrome doesn't render image (grid child) at
    // the right place while changing layout, so
    // let's repaint it.
    OP3.bind("elementchange::*::blockLayoutDesktop elementchange::*::blockLayoutMobile elementchange::*::blockLayoutTablet", function(e, o) {
        var element = OP3.$(o.node).element(),
            prop = element.findProperty("blockDisplayMedia");
        if (!prop)
            return;

        var $target = $(prop.target()),
            media = $target.attr("data-op3-block-display-media");
        if (!media)
            return;

        $target.attr("data-op3-block-display-media", "");
        $target.get(0).offsetHeight;
        $target.attr("data-op3-block-display-media", media);
    });

})(jQuery, window, document);
