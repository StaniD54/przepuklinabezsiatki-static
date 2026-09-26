/**
 * OptimizePress3 element type:
 * op3 element type form manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     .
 *     .
 *     .
 */
 ;(function($, window, document) {

    "use strict";

    OP3.Elements._extension.type.ContactForm = OP3.defineClass({

        Name: "OP3.Element.ContactForm",

        Extends: OP3.Elements._extension.type.Form,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Form.apply(this, arguments);
        },

        Prototype: {

            _type: "contactform",

            _props: function() {
                return OP3.Elements._extension.type.Form.prototype._props.apply(this, arguments).concat([
                    [ OP3.Elements._extension.prop.ContactMessageFromName ],
                    [ OP3.Elements._extension.prop.ContactMessageFromEmail ],
                    [ OP3.Elements._extension.prop.ContactMessageSubject ],
                    [ OP3.Elements._extension.prop.ContactMessageText ],
                    [ OP3.Elements._extension.prop.ContactConfirmationSend ],
                    [ OP3.Elements._extension.prop.ContactConfirmationFromName ],
                    [ OP3.Elements._extension.prop.ContactConfirmationFromEmail ],
                    [ OP3.Elements._extension.prop.ContactConfirmationSubject ],
                    [ OP3.Elements._extension.prop.ContactConfirmationText ],
                ]);
            },
        },

    });

    OP3.bind("elementchange::input::html elementchange::select::html elementchange::textarea::html", function(e, o) {
        var element = OP3.$(o.node);
        var parent = element.parent();
        if (OP3.Designer.activeElement().node() !== o.node
            || parent.type() !== "contactform"
            || element.getOption("extraField") != "1")
            return;

        var before = $(o.value.before).text();
        var after = $(o.value.after).text();
        var slugBefore = before.toLowerCase().replace(/ /g, "-");
        var slugAfter = after.toLowerCase().replace(/ /g, "-");
        var elements = ["contactMessageFromName", "contactMessageFromEmail", "contactMessageSubject", "contactMessageText", "contactConfirmationSend", "contactConfirmationFromName", "contactConfirmationFromEmail", "contactConfirmationSubject", "contactConfirmationText"];

        elements.forEach(function(option, index) {
            var oldValue = parent.getOption(option, o.media);
            var newValue = oldValue.replaceAll(slugBefore, slugAfter);
            parent.setOption(option, newValue, o.media);
        });

        element.setOption("name", slugAfter, o.media);
    });

})(jQuery, window, document);
