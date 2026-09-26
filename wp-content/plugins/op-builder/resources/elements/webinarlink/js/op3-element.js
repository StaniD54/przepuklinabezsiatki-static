/**
 * OptimizePress3 element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.WebinarLink = OP3.defineClass({

        Name: "OP3.Element.WebinarLink",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "webinarlink",

            _props: function() {
                return [
                    // Style tab - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],
                    // Style tab - Background - Background Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "backgroundImageDisplay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl ],
                    [ OP3.Elements._extension.prop.Opacity, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100 ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    // Style tab - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Overlay Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", label: OP3._("Overlay Angle") } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", label: OP3._("Overlay Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", label: OP3._("Overlay Start Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", label: OP3._("Overlay Start Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", label: OP3._("Overlay Stop Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", label: OP3._("Overlay Stop Position") } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

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

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Link Properties - text
                    [ OP3.Elements._extension.prop.FontFamily, { id: "textFontFamily", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColor", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "textFontSize", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "textLineHeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "textLetterSpacing", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeight", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyle", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransform", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecoration", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "textTextAlign", selector: ' .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"] [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "textBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "textMarginTop", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "textMarginBottom", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "textMarginLeft", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "textMarginRight", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "textPaddingTop", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "textPaddingBottom", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "textPaddingLeft", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "textPaddingRight", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "textMaxWidth", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "textDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "textBorderTopWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "textBorderTopStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "textBorderTopColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "textBorderRightWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "textBorderRightStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "textBorderRightColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "textBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "textBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "textBorderBottomColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "textBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "textBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "textBorderLeftColor", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "textBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "textBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "textBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "textBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="text"] .op3-text-wrapper' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "textTransitionDuration", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeightHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyleHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransformHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecorationHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                ];

            },

        },

    });

    // Disable ice editor in LiveEditor
    // on text (webinar link)
    OP3.bind("ready elementappend", function(e, o) {
        var $context = $(o && o.node ? o.node : document);

        $context
            .find('.op3-element[data-op3-element-type="webinarlink"]')
            .add($context.is('.op3-element[data-op3-element-type="webinarlink"]') ? $context : null)
                .find('.op3-element[data-op3-element-type="text"][data-op3-element-spec="link"] [data-op3-contenteditable]')
                .each(function() {
                    if (this.ice)
                        this.ice.destroy();

                    $(this).attr("data-op3-contenteditable", "false");
                });
    });

})(jQuery, window, document);
