/**
 * OptimizePress3 element type:
 * op3 element type descriptionlist manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.DescriptionList = OP3.defineClass({

        Name: "OP3.Element.DescriptionList",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "descriptionlist",

            _props: function() {
                return [
                    // Sidebar: Advanced Tab - Form Positioning
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
                    [ OP3.Elements._extension.prop.Width, { label: OP3._("Description List Width") } ],
                    [ OP3.Elements._extension.prop.MarginAlign ],

                    // Sidebar: Advanced Tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Sidebar: Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Toolbar: Description List Styling
                    [ OP3.Elements._extension.prop.FieldLayoutDesktop ],
                    [ OP3.Elements._extension.prop.FieldLayoutTablet ],
                    [ OP3.Elements._extension.prop.FieldLayoutMobile ],
                    [ OP3.Elements._extension.prop.Width, { id: "split", selector: " .op3-descriptionlistitem-key", label: OP3._("Key/value Split") } ],
                    [ OP3.Elements._extension.prop.Width, { id: "indent", selector: " [data-op3-indent]", label: OP3._("Value Indent"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "320", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ], defaultUnit: "px" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "descriptionlistitemBottomSpacing", selector: " .op3-element", label: OP3._("Description List Item Spacing"), } ],

                    // Toolbar: Color Options
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Toolbar: Form Section Borders & Corners
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Link Properties - descriptionlistitem
                    [ OP3.Elements._extension.prop.FontSize, { id: "descriptionlistitemFontSize", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "descriptionlistitemFontWeight", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "descriptionlistitemFontFamily", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "descriptionlistitemFontStyle", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "descriptionlistitemLineHeight", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "descriptionlistitemLetterSpacing", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "descriptionlistitemTextTransform", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "descriptionlistitemTextDecoration", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "descriptionlistitemValueFontSize", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "descriptionlistitemValueFontWeight", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "descriptionlistitemValueFontFamily", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "descriptionlistitemValueFontStyle", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "descriptionlistitemValueLineHeight", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "descriptionlistitemValueLetterSpacing", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "descriptionlistitemValueTextTransform", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "descriptionlistitemValueTextDecoration", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "descriptionlistitemColor", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "descriptionlistitemValueColor", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "descriptionlistitemBackgroundColor", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "descriptionlistitemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "descriptionlistitemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "descriptionlistitemBorderTopColor", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "descriptionlistitemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "descriptionlistitemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "descriptionlistitemBorderRightColor", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "descriptionlistitemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "descriptionlistitemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "descriptionlistitemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "descriptionlistitemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "descriptionlistitemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "descriptionlistitemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "descriptionlistitemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "descriptionlistitemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "descriptionlistitemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "descriptionlistitemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "descriptionlistitemMarginTop", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "descriptionlistitemMarginBottom", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "descriptionlistitemMarginLeft", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "descriptionlistitemMarginRight", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "descriptionlistitemPaddingTop", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "descriptionlistitemPaddingBottom", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "descriptionlistitemPaddingLeft", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "descriptionlistitemPaddingRight", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { id: "descriptionlistitemPaddingDrag", selector: ' .op3-element[data-op3-element-type="descriptionlistitem"]' } ],
                ];
            },
        },

    });

})(jQuery, window, document);
