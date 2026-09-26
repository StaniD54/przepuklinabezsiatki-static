/**
 * OptimizePress3 creditcard element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.creditcard = OP3.defineClass({

        Name: "OP3.Element.creditcard",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "creditcard",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.CreditCardsStyle, { selector: ' > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.Width, {
                        selector: ' [data-op3-element-type="creditcarditem"]',
                        label: OP3._("Size"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px, %",
                            "data-min-px": "10",
                            "data-min-percent": "0",
                            "data-max-px": "200",
                            "data-max-percent": "100",
                            "data-step-px": "1",
                            "data-step-percent": "1",
                            "data-precision-px": "0",
                            "data-precision-percent": "0",
                        },
                        units: [
                            "px",
                            "%",
                        ],
                    }],
                    [ OP3.Elements._extension.prop.Color, { selector: ' [data-op3-element-type="creditcarditem"] svg' } ],

                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Credit Cards Spacing") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' [data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' [data-op3-element-type="creditcarditem"]' } ],

                    // We want all columns to be equal height,
                    // so we apply negative gutter to the
                    // parent to offset the impact of
                    // margin set on children
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", label: OP3._("Gutter Adjust Left"), selector: ' [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterAdjustRight", label: OP3._("Gutter Adjust Right"), selector: ' [data-op3-children]' } ],

                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.PaddingDrag ],
                    [ OP3.Elements._extension.prop.MarginAlign ],

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Link properties - CreditCardItem
                    [ OP3.Elements._extension.prop.MarginTop, { id: "creditCardItemMarginTop", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "creditCardItemMarginBottom", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "creditCardItemMarginLeft", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "creditCardItemMarginRight", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "creditCardItemPaddingTop", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "creditCardItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "creditCardItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "creditCardItemPaddingRight", selector: ' .op3-element[data-op3-element-type="creditcarditem"]' } ],
                ];
            },

        },

    });

    OP3.bind("elementchanging::creditcard::creditCardsStyle", function(e, o) {
        var creditcard = OP3.$(o.node);

        creditcard.children().toArray().forEach(function(element) {
            element = OP3.$(element);

            var svg = element.getOption("codeHtml", "all");
            var $domElement = $(svg);
            var type = $domElement.attr("data-op3-credit-card-type") || "";
            var style = o.value.after;

            (OP3.CreditCards.data() || [])
                .filter(function(item) {
                    return item.style === style && item.type === type;
                })
                .forEach(function(item) {
                    element.setOption("codeHtml", item.id, "all");
                });
        })
    });

})(jQuery, window, document);
