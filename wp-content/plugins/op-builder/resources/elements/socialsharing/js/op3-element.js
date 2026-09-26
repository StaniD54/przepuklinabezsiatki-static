/**
 * OptimizePress3 socialsharing element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.SocialSharing = OP3.defineClass({

        Name: "OP3.Element.SocialSharing",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "socialsharing",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.FlexDirection, { label: OP3._("Stacking"), selector: " > [data-op3-element-container] [data-op3-children]", options: [ { "row": "Inline" }, { "column": "Stacked" } ], attr: { "data-property-type": "select-buttons" } } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id:"totalPosition", label: OP3._("Total Share Position"), selector: " > [data-op3-element-container]", options: [ { "row": "Left" }, { "row-reverse": "Right" } ], attr: { "data-property-type": "select-buttons" } } ],
                    [ OP3.Elements._extension.prop.SocialShareCount, { selector: " > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.SocialShareTotalCount, { selector: " > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PageUrl, { selector: " > [data-op3-element-container]" } ],

                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Items Spacing") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' [data-op3-element-type="socialsharingitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' [data-op3-element-type="socialsharingitem"]' } ],

                    // We want all columns to be equal height,
                    // so we apply negative gutter to the
                    // parent to offset the impact of
                    // margin set on children
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", label: OP3._("Gutter Adjust Left"), selector: ' [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterAdjustRight", label: OP3._("Gutter Adjust Right"), selector: ' [data-op3-children]' } ],

                    [ OP3.Elements._extension.prop.FontFamily, { id: "totalFontFamily", selector: " .op3-total-count, .op3-total-text" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "totalFontSize", selector: " .op3-total", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "totalLineHeight", selector: " .op3-total-count, .op3-total-text", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "totalLetterSpacing", selector: " .op3-total-count, .op3-total-text" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "totalFontWeight", selector: " .op3-total-count, .op3-total-text" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "totalFontStyle", selector: " .op3-total-count, .op3-total-text" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "totalTextTransform", selector: " .op3-total-count, .op3-total-text" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "totalTextDecoration", selector: " .op3-total-count, .op3-total-text" } ],

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

                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Link properties - socialSharingItem
                    [ OP3.Elements._extension.prop.Width, { id: "socialSharingItemWidth", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "socialSharingItemIconFontSize", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "socialSharingItemIconDirection", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-link'  } ],
                    [ OP3.Elements._extension.prop.Color, { id: "socialSharingItemIconColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "socialSharingItemIconSpacing", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-divider'  } ],
                    [ OP3.Elements._extension.prop.IconFrame, { id: "socialsharingitemIconFrame", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon-container', serialize: false } ],
                    [ OP3.Elements._extension.prop.IconShape, { id: "socialsharingitemIconShape", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon-container', serialize: false } ],
                    [ OP3.Elements._extension.prop.Padding, { id: "socialSharingItemIconPadding", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderWidth, { id: "socialSharingItemIconBorderWidth", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "socialSharingItemIconBackgroundColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "socialSharingItemIconBorderColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "socialSharingItemFontFamily", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text p, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "socialSharingItemTextMarginRight", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "socialSharingItemTextMarginLeft", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "socialSharingItemTextColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "socialSharingItemFontSize", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text p, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "socialSharingItemLineHeight", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text p, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "socialSharingItemLetterSpacing", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "socialSharingItemFontWeight", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text p, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "socialSharingItemFontStyle", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "socialSharingItemTextTransform", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "socialSharingItemTextDecoration", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "socialSharingItemBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="socialsharingitem"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "socialSharingItemBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="socialsharingitem"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id:"socialSharingItemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id:"socialSharingItemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id:"socialSharingItemBorderTopColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id:"socialSharingItemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id:"socialSharingItemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id:"socialSharingItemBorderRightColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id:"socialSharingItemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id:"socialSharingItemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id:"socialSharingItemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id:"socialSharingItemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id:"socialSharingItemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id:"socialSharingItemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id:"socialSharingItemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id:"socialSharingItemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id:"socialSharingItemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id:"socialSharingItemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id:"socialSharingItemBoxShadow", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] > a' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id:"socialSharingItemMarginTop", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id:"socialSharingItemMarginBottom", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id:"socialSharingItemMarginLeft", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id:"socialSharingItemMarginRight", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id:"socialSharingItemPaddingTop", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-link' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id:"socialSharingItemPaddingBottom", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-link' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id:"socialSharingItemPaddingLeft", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-link' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id:"socialSharingItemPaddingRight", selector: ' .op3-element[data-op3-element-type="socialsharingitem"] .op3-link' } ],

                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "socialSharingItemTransitionDuration", selector: ' .op3-element[data-op3-element-type="socialsharingitem"], .op3-element[data-op3-element-type="socialsharingitem"] .op3-text, .op3-element[data-op3-element-type="socialsharingitem"] .op3-icon, .op3-element[data-op3-element-type="socialsharingitem"] .op3-count, .op3-element[data-op3-element-type="socialsharingitem"] [data-op3-background], .op3-element[data-op3-element-type="socialsharingitem"] [data-op3-border], .op3-element[data-op3-element-type="socialsharingitem"] > a' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "socialSharingItemBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="socialsharingitem"]:hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "socialSharingItemBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="socialsharingitem"]:hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "socialSharingItemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "socialSharingItemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "socialSharingItemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "socialSharingItemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "socialSharingItemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "socialSharingItemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "socialSharingItemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "socialSharingItemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "socialSharingItemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "socialSharingItemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "socialSharingItemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "socialSharingItemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "socialSharingItemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "socialSharingItemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "socialSharingItemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "socialSharingItemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover > a' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "socialSharingItemIconColorHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "socialSharingItemTextColorHover", selector: ' .op3-element[data-op3-element-type="socialsharingitem"]:hover .op3-text, .op3-element[data-op3-element-type="socialsharingitem"]:hover .op3-count' } ],
                ];
            },

        },

    });

    // sync children attr properties
    OP3.bind("elementchanging::socialsharing::iconFrame elementchanging::socialsharing::iconShape", function(e, o) {
        if (o.historyPending)
            return;

        var parent = OP3.$(o.node),
            child = parent.find("socialsharingitem"),
            prop = o.id
                .replace(child.type(), "")
                .replace(/^\w/, function(match) {
                    return match.toLowerCase();
                }),
            value = o.value.after,
            media = o.media;
        child.setOption(prop, value, media);

        return false;
    });


    OP3.bind("elementoptionsformattach::socialsharing", function(e, o) {
        var element = OP3.$(o.node);

        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-total-count", element.getOption("socialShareTotalCount", true));
    });

    OP3.bind("elementoptionsformdetach::socialsharing", function(e, o) {
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-total-count");
    });

    OP3.bind("elementchange::socialsharing::socialShareTotalCount", function(e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-parent-options-property-value-total-count", o.value.after);
    });

})(jQuery, window, document);
