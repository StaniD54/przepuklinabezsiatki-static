/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.AttachmentId = OP3.defineClass({

        Name: "OP3.Property.AttachmentId",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "attachmentId",

            _defaults: {
                label: function() {
                    return OP3._("Media Attachment Id");
                },
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-attachment-id") || "";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-attachment-id", value);
            },

        },

    });

})(jQuery, window, document);
