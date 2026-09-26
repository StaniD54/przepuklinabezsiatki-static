/**
 * OptimizePress3 element type:
 * op3 element type bulletblock manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/height/js/op3-property.js
 *     - properties/opacity/js/op3-property.js
 *     - properties/text/js/op3-property-align.js
 *     - properties/transform-flip/js/op3-property.js
 *     - properties/transform-rotate/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.BulletBlock = OP3.defineClass({

        Name: "OP3.Element.BulletBlock",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "bulletblock",

            _props: function() {
                return [
                    // Style tab - Children
                    [ OP3.Elements._extension.prop.Children ],
                    [ OP3.Elements._extension.prop.BulletblockMedia ],

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

                   // Background - Base
                   [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                   [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > div > [data-op3-border] > [data-op3-background="base"]::before, > div > [data-op3-border] > [data-op3-background="base"]::after' } ],
                   [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > div > [data-op3-border] > [data-op3-background="base"]::before, > div > [data-op3-border] > [data-op3-background="base"]::after' } ],
                   [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                   [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],

                   // Background - Background Image
                   [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' > div > [data-op3-border] > [data-op3-background="image"]' } ],
                   [ OP3.Elements._extension.prop.Display, { id: "backgroundImageDisplay", selector: ' > div > [data-op3-border] > [data-op3-background="image"]' } ],
                   [ OP3.Elements._extension.prop.BackgroundImageUrl ],
                   [ OP3.Elements._extension.prop.Opacity, { selector: ' > div > [data-op3-border] > [data-op3-background="image"]' } ],
                   [ OP3.Elements._extension.prop.Opacity100 ],
                   [ OP3.Elements._extension.prop.BackgroundPosition, { selector: ' > div > [data-op3-border] > [data-op3-background="image"]' } ],
                   [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: ' > div > [data-op3-border] > [data-op3-background="image"]' } ],
                   [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: ' > div > [data-op3-border] > [data-op3-background="image"]' } ],
                   [ OP3.Elements._extension.prop.BackgroundSize, { selector: ' > div > [data-op3-border] > [data-op3-background="image"]' } ],

                   // Background - Overlay
                   [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Overlay Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                   [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > div > [data-op3-border] > [data-op3-background="overlay"]::before, > div > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                   [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' > div > [data-op3-border] > [data-op3-background="overlay"]::before, > div > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                   [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", label: OP3._("Overlay Angle") } ],
                   [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", label: OP3._("Overlay Position") } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", label: OP3._("Overlay Start Color") } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", label: OP3._("Overlay Start Position") } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", label: OP3._("Overlay Stop Color") } ],
                   [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", label: OP3._("Overlay Stop Position") } ],

                   // Border
                   [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > div > [data-op3-border]" } ],

                   // Shadow
                   [ OP3.Elements._extension.prop.BoxShadow, { selector: " > div > [data-op3-border]" } ],
                   [ OP3.Elements._extension.prop.BoxShadowAngle ],
                   [ OP3.Elements._extension.prop.BoxShadowDistance ],
                   [ OP3.Elements._extension.prop.BoxShadowBlur ],
                   [ OP3.Elements._extension.prop.BoxShadowSpread ],
                   [ OP3.Elements._extension.prop.BoxShadowColor ],
                   // [ OP3.Elements._extension.prop.BoxShadowInset ]

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

                    // // Hover Tab - General
                    // [ OP3.Elements._extension.prop.TransitionDuration, { selector: " .op3-element" } ],

                    // // Hover Tab - Typography
                    // [ OP3.Elements._extension.prop.Color, { selector: ":hover", id: "colorHover" } ],
                    // [ OP3.Elements._extension.prop.FontWeight, { selector: ":hover [data-op3-contenteditable]", id: "fontWeightHover" } ],
                    // [ OP3.Elements._extension.prop.FontStyle, { selector: ":hover [data-op3-contenteditable]", id: "fontStyleHover" } ],
                    // [ OP3.Elements._extension.prop.TextTransform, { selector: ":hover [data-op3-contenteditable]", id: "textTransformHover" } ],
                    // [ OP3.Elements._extension.prop.TextDecoration, { selector: ":hover [data-op3-contenteditable]", id: "textDecorationHover" } ],

                    // // Hover Tab - Icon
                    // [ OP3.Elements._extension.prop.Color, { selector: ":hover .op3-icon", id: "iconColorHover", label: OP3._("Colour") } ],

                    // Link Properties
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "bulletlistBackgroundColor", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "bulletlistFontFamily", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistColor", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "bulletlistFontSize", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "bulletlistLineHeight", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "bulletlistLetterSpacing", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "bulletlistFontWeight", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "bulletlistFontStyle", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "bulletlistTextTransform", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "bulletlistTextDecoration", selector: ' .op3-element [data-op3-contenteditable]', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistIconColor", selector: ' .op3-element .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "bulletlistIconFontSize", selector: ' .op3-element .op3-icon, .op3-element .op3-image', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "bulletlistIconSpacing", selector: ' .op3-element .op3-icon, .op3-element .op3-image' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "bulletlistIconVerticalPosition", selector: ' .op3-element .op3-icon, .op3-element .op3-image' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "bulletlistBottomSpacing", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "bulletlistTransitionDuration", selector: ' .op3-element', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistColorHover", selector: ' .op3-element:hover', } ],
                    [ OP3.Elements._extension.prop.Color, { id: "bulletlistIconColorHover", selector: ' .op3-element:hover .op3-icon', } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "bulletlistPaddingTop", selector: " .op3-element", } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "bulletlistPaddingBottom", selector: " .op3-element", } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "bulletlistPaddingLeft", selector: " .op3-element", } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "bulletlistPaddingRight", selector: " .op3-element", } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "bulletlistJustifyContent", selector: " .op3-element", label: OP3._("Alignment"), options: [ { "normal": "Left" }, { "center": "Center" }, { "flex-end": "Right" } ] } ],

                    // Link Properties - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "bulletlistBorderTopWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "bulletlistBorderTopStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "bulletlistBorderTopColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "bulletlistBorderRightWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "bulletlistBorderRightStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "bulletlistBorderRightColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "bulletlistBorderBottomWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "bulletlistBorderBottomStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "bulletlistBorderBottomColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "bulletlistBorderLeftWidth", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "bulletlistBorderLeftStyle", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "bulletlistBorderLeftColor", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "bulletlistBorderTopLeftRadius", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "bulletlistBorderTopRightRadius", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "bulletlistBorderBottomRightRadius", selector: ' .op3-element' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "bulletlistBorderBottomLeftRadius", selector: ' .op3-element' } ],
                ];
            },
        },

    });

})(jQuery, window, document);
