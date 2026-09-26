/**
 * OptimizePress3 element type:
 * op3 element type tweet manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Tweet = OP3.defineClass({

        Name: "OP3.Element.Tweet",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "tweet",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Html, { selector: " .tweet" } ],
                    [ OP3.Elements._extension.prop.Html2, { selector: " .label" } ],
                    [ OP3.Elements._extension.prop.TwitterVia ],
                    [ OP3.Elements._extension.prop.TwitterUrl ],

                    [ OP3.Elements._extension.prop.JustifyContent, { selector: " .label-wrapper", label: OP3._("Icon & Label Position"), options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" } ] } ],

                    [ OP3.Elements._extension.prop.Color, { selector: " .tweet p" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "labelColor", selector: " .label p" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: " .op3-icon" } ],

                    // Tweet - Link
                    [ OP3.Elements._extension.prop.Href, { selector: " a", serialize: false } ],
                    [ OP3.Elements._extension.prop.HrefFull, { selector: " a", } ],

                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .tweet p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " .tweet p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .tweet p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " .tweet p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .tweet p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .tweet p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .tweet p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .tweet p" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tweetMarginBottom", selector: " .tweet", label: OP3._("Tweet & Label Spacing") } ],
                    [ OP3.Elements._extension.prop.TextAlign, { selector: " .tweet", label: OP3._("Tweet Text Align") } ],

                    [ OP3.Elements._extension.prop.FontFamily, { id: "labelFontFamily", selector: " .label p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "labelFontSize", selector: " .label p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "labelLineHeight", selector: " .label p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "labelLetterSpacing", selector: " .label p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "labelFontWeight", selector: " .label p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "labelFontStyle", selector: " .label p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "labelTextTransform", selector: " .label p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "labelTextDecoration", selector: " .label p" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "labelMarginRight", selector: " .label", label: OP3._("Icon & Label Spacing"),  attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "250", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ] } ],

                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: " .op3-icon", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],

                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Overlay Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", label: OP3._("Overlay Angle") } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", label: OP3._("Overlay Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", label: OP3._("Overlay Start Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", label: OP3._("Overlay Start Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", label: OP3._("Overlay Stop Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", label: OP3._("Overlay Stop Position") } ],

                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " [data-op3-element-container] [data-op3-border]" } ],

                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " [data-op3-element-container] [data-op3-border]" } ],
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
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

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
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: " [data-op3-border], [data-op3-background], .tweet p, .label p, .op3-icon" } ],

                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ':hover [data-op3-background="overlay"]::before,:hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ':hover [data-op3-background="overlay"]::before,:hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "borderTopLeftRadiusHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "borderTopRightRadiusHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "borderBottomRightRadiusHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "borderBottomLeftRadiusHover", selector: ":hover [data-op3-element-container] [data-op3-border]" } ],

                    [ OP3.Elements._extension.prop.Color, { id: "tweetColorHover", selector: ":hover .tweet p", label: OP3._("Tweet Color") } ],
                    [ OP3.Elements._extension.prop.Color, { id: "labelColorHover", selector: ":hover .label p", label: OP3._("Label Color") } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ":hover .op3-icon", label: OP3._("Icon Color") } ],

                ];

            },

        },

    });

})(jQuery, window, document);
