/**
 * OptimizePress3 typography control panel element.
 *
 * An proxy for OP3.Document used in typography control
 * panel. This element is used on client side only, not
 * used by server side...
 *
 * Since this is a proxy element we won't define properties,
 * but use all the properties of OP3.Document that starts
 * with id tcp_h5_... Every property change on this element
 * will be prevented and executed on OP3.Document...
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.TCP_H5 = OP3.defineClass({

        Name: "OP3.Element.TCP_H5",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "tcp_h5",

            _props: function() {
                return OP3.Document._props()

                    // All OP3.Document properties thats starts with tcp_h5_
                    .filter(function(defs) {
                        var prop = defs[0],
                            options = defs[1];

                        return options && options.id && /^tcp_h5_/.test(options.id);
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
                        [ OP3.Elements._extension.prop.BoxModel, { id: "tcp_h5_boxModel" } ],
                        [ OP3.Elements._extension.prop.TextShadowAngle, { id: "tcp_h5_textShadowAngle" } ],
                        [ OP3.Elements._extension.prop.TextShadowDistance, { id: "tcp_h5_textShadowDistance" } ],
                        [ OP3.Elements._extension.prop.TextShadowBlurRadius, { id: "tcp_h5_textShadowBlurRadius" } ],
                        [ OP3.Elements._extension.prop.TextShadowColor, { id: "tcp_h5_textShadowColor" } ],
                    ]);
            },

        },

    });

})(jQuery, window, document);
