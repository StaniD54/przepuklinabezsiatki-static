/**
 * OptimizePress3 createPopoverlay property.
 *
 * Property used to create popoverlay.
 */
; (function ($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CreatePopoverlay = OP3.defineClass({

        Name: "OP3.Property.CreatePopoverlay",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function (properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "createPopoverlay",

            _defaults: {
                label: function () {
                    return OP3._("Create Opt-in Overlay");
                },
                attr: {
                    "data-property-type": "execute",
                },
                serialize: false,
            },

            computed: function () {
                return "0";
            },

            getter: function (media) {
                return this.computed();
            },

            setter: function (value, media) {
                setTimeout(function () {
                    // Trigger event and let live editor
                    // create video popoverlay
                    OP3.transmit("elementrequestcreatepopoverlay", {
                        node: this.element.node(),
                        media: media,
                    });
                }.bind(this));
            },

        },

    });

})(jQuery, window, document);
