/**
 * OptimizePress3 typography control panel element.
 *
 * An proxy for OP3.Document used in typography control
 * panel. This element is used on client side only, not
 * used by server side...
 *
 * Since this is a proxy element we won't define properties,
 * but use all the properties of OP3.Document that starts
 * with id tcp_pre_... Every property change on this element
 * will be prevented and executed on OP3.Document...
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.TCP_Pre = OP3.defineClass({

        Name: "OP3.Element.TCP_Pre",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "tcp_pre",

            _props: function() {
                return OP3.Document._props()

                    // All OP3.Document properties thats starts with tcp_pre_
                    .filter(function(defs) {
                        var prop = defs[0],
                            options = defs[1];

                        return options && options.id && /^tcp_pre_/.test(options.id);
                    })

                    // ...as Proxy property that points to OP3.Document
                    .map(function(defs) {
                        var prop = defs[0],
                            options = defs[1],
                            id = defs[1].id;

                        return [ OP3.Elements._extension.prop.Proxy, { element: OP3.Document, id: id } ];
                    })

                    // ...with additional properties for widget rendering.
                    .concat([
                        [ OP3.Elements._extension.prop.BoxModel, { id: "tcp_pre_boxModel" } ],
                        [ OP3.Elements._extension.prop.TextShadowAngle, { id: "tcp_pre_textShadowAngle" } ],
                        [ OP3.Elements._extension.prop.TextShadowDistance, { id: "tcp_pre_textShadowDistance" } ],
                        [ OP3.Elements._extension.prop.TextShadowBlurRadius, { id: "tcp_pre_textShadowBlurRadius" } ],
                        [ OP3.Elements._extension.prop.TextShadowColor, { id: "tcp_pre_textShadowColor" } ],
                        [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "tcp_pre_boxShadowAngle" } ],
                        [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "tcp_pre_boxShadowDistance" } ],
                        [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "tcp_pre_boxShadowBlur" } ],
                        [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "tcp_pre_boxShadowSpread" } ],
                        [ OP3.Elements._extension.prop.BoxShadowColor, { id: "tcp_pre_boxShadowColor" } ],
                    ]);
            },

        },

    });

})(jQuery, window, document);
