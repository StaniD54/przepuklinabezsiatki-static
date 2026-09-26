/**
 * OptimizePress3 typography control panel element.
 *
 * An proxy for OP3.Document used in typography control
 * panel. This element is used on client side only, not
 * used by server side...
 *
 * Since this is a proxy element we won't define properties,
 * but use all the properties of OP3.Document that starts
 * with id tcp_all_... Every property change on this element
 * will be prevented and executed on OP3.Document...
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.TCP_All = OP3.defineClass({

        Name: "OP3.Element.TCP_All",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "tcp_all",

            _props: function() {
                return OP3.Document._props()

                    // All OP3.Document properties thats starts with tcp_all_
                    .filter(function(defs) {
                        var prop = defs[0],
                            options = defs[1];

                        return options && options.id && /^tcp_all_/.test(options.id);
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
                        [ OP3.Elements._extension.prop.TextShadowAngle, { id: "tcp_all_textShadowAngle" } ],
                        [ OP3.Elements._extension.prop.TextShadowDistance, { id: "tcp_all_textShadowDistance" } ],
                        [ OP3.Elements._extension.prop.TextShadowBlurRadius, { id: "tcp_all_textShadowBlurRadius" } ],
                        [ OP3.Elements._extension.prop.TextShadowColor, { id: "tcp_all_textShadowColor" } ],
                    ]);
            },

        },

    });

    /**
     * Reset each children options.
     *
     * @param  {String} propId
     * @param  {String} media
     * @return {Void}
     */
    var _resetChildrenOptions = function(propId, media) {
        [ "headings", "h1", "h2", "h3", "h4", "h5", "h6", "texts", "p", "li", "a", "blockquote" ].forEach(function(child) {
            OP3.Document.setOption("tcp_" + child + "_" + propId, null, media);
        });
    };

    // Reset each child.
    OP3.bind("elementchange::document elementchangeignored::tcp_all", function(e, o) {
        if (!/tcp_all_/.test(o.id))
            return;

        var prop = OP3.Document.findProperty(o.id),
            isProxy = prop.proxy() !== prop;
        if (isProxy)
            return;

        var propId = o.id.match(/^tcp_all_(.*)/)[1];
        _resetChildrenOptions(propId, o.media);
    });

})(jQuery, window, document);
