/**
 * OptimizePress3 element type:
 * op3 element type featureblockItem manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - flex-grid-cell-sizer.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/align-self/js/op3-property.js
 *     - properties/background-color/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/text-align/js/op3-property.js
 *     - properties/width/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.TextWithIcon = OP3.defineClass({

        Name: "OP3.Element.TextWithIcon",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "textwithicon",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.BlockDisplayMedia, { selector: " [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.ColumnGap, { label: OP3._("Spacing"), selector: ' [data-op3-children]' }],
                    [ OP3.Elements._extension.prop.RowGap, { label: OP3._("Spacing"), selector: ' [data-op3-children]' }],
                    [ OP3.Elements._extension.prop.BlockLayoutDesktop, { selector: " [data-op3-children]", options: [ { "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], } ],
                    [ OP3.Elements._extension.prop.BlockLayoutTablet, { selector: " [data-op3-children]", options: [ { "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], } ],
                    [ OP3.Elements._extension.prop.BlockLayoutMobile, { selector: " [data-op3-children]", options: [ { "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], } ],
                    [ OP3.Elements._extension.prop.TextWithIconSize ],

                    // Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' [data-op3-border] > [data-op3-background="base"]::before, [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' [data-op3-border] > [data-op3-background="base"]::before, [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],

                    // Style tab - Background - Background Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "backgroundImageDisplay", selector: ' [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl ],
                    [ OP3.Elements._extension.prop.Opacity, { selector: ' [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100 ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: ' [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: ' [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: ' [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: ' [data-op3-border] > [data-op3-background="image"]' } ],
                    // Style tab - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Overlay Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-border] > [data-op3-background="overlay"]::before, [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' [data-op3-border] > [data-op3-background="overlay"]::before, [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", label: OP3._("Overlay Angle") } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", label: OP3._("Overlay Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", label: OP3._("Overlay Start Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", label: OP3._("Overlay Start Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", label: OP3._("Overlay Stop Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", label: OP3._("Overlay Stop Position") } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " [data-op3-border]" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced Tab - Positioning
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
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    [ OP3.Elements._extension.prop.AlignItems, { label: OP3._("Vertical Alignment"), selector: " [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Horizontal Alignment"), selector: " [data-op3-children]" } ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > .op3-background-parent > [data-op3-element-container], [data-op3-border], [data-op3-border] > [data-op3-background]" } ],

                    // Hover Tab - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBaseHover", selector: ' [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBaseHover", selector: ' [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBaseHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseHoverStopPosition" } ],

                    // Hover Tab - Background - Media - Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: 'backgroundImageHover', selector: ':hover [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { id: "backgroundImageHoverUrl" } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "opacityHover", selector: ':hover [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100, { id: "opacityHover100" }],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "backgroundPositionHover", selector: ':hover [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "backgroundAttachmentHover", selector: ':hover [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "backgroundRepeatHover", selector: ':hover [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "backgroundSizeHover", selector: ':hover [data-op3-border] > [data-op3-background="image"]' } ],

                    // Hover Tab - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ' [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ' [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Hover tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: ":hover,:hover [data-op3-border]", id: "borderTopWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ":hover,:hover [data-op3-border]", id: "borderTopStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ":hover,:hover [data-op3-border]", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ":hover,:hover [data-op3-border]", id: "borderRightWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ":hover,:hover [data-op3-border]", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ":hover,:hover [data-op3-border]", id: "borderRightColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ":hover,:hover [data-op3-border]", id: "borderBottomWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ":hover,:hover [data-op3-border]", id: "borderBottomStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ":hover,:hover [data-op3-border]", id: "borderBottomColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ":hover,:hover [data-op3-border]", id: "borderLeftWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ":hover,:hover [data-op3-border]", id: "borderLeftStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ":hover,:hover [data-op3-border]", id: "borderLeftColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ":hover [data-op3-border]", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ":hover [data-op3-border]", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ":hover [data-op3-border]", id: "borderBottomRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ":hover [data-op3-border]", id: "borderBottomLeftRadiusHover" } ],

                    // Hover Tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetX, { id: "boxShadowHoverOffsetX" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetY, { id: "boxShadowHoverOffsetY" } ],
                    //[ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle"} ],
                    //[ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance"} ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor" } ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset"} ],

                    // Link Element - Icon
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "iconOp3Icon", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon, .op3-element[data-op3-element-type="icon"] .op3-icon-container', serialize: false, } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon' }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "iconLineHeight", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.MarginAlign, { id: "iconMarginAlign", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "iconBoxShadow", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],

                    // Link Element - Text
                    [ OP3.Elements._extension.prop.FontSize, { id: "textFontSize", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' }],
                    [ OP3.Elements._extension.prop.Color, { id: "textColor", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "textLineHeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' }],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "textPaddingTop", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "textPaddingBottom", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "textPaddingLeft", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "textPaddingRight", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                ];
            },

        },

    });

})(jQuery, window, document);
