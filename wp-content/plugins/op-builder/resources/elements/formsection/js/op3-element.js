/**
 * OptimizePress3 element type:
 * op3 element type formsection manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     .
 *     .
 *     .
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.FormSection = OP3.defineClass({

        Name: "OP3.Element.FormSection",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "formsection",

            _props: function() {
                return [
                    // Sidebar: Advanced Tab - Form Section Positioning
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

                    // Toolbar: Form Section Styling
                    [ OP3.Elements._extension.prop.Width, { label: OP3._("Form Section Width") } ],
                    [ OP3.Elements._extension.prop.GridGap, { label: OP3._("Field Gap") }],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "gridGapGridMarginTop", selector: " > [data-op3-element-container] > [data-op3-children]", }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gridGapGridMarginRight", selector: " > [data-op3-element-container] > [data-op3-children]", }],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "gridGapGridMarginBottom", selector: " > [data-op3-element-container] > [data-op3-children]", }],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gridGapGridMarginLeft", selector: " > [data-op3-element-container] > [data-op3-children]", }],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "gridGapGridPaddingTop", selector: " > [data-op3-element-container] > [data-op3-children]", }],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "gridGapGridPaddingLeft", selector: " > [data-op3-element-container] > [data-op3-children]", }],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "gridGapGridCellBorderRight", selector: " > [data-op3-element-container] > [data-op3-children] > .op3-element", }],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "gridGapGridCellBorderBottom", selector: " > [data-op3-element-container] > [data-op3-children] > .op3-element", }],

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

                    // Link Element - Input
                    [ OP3.Elements._extension.prop.Display, { id: "inputLabelDisplay", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputLabelSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "inputIconDisplay", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon, .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputIconFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "inputIconFlexDirection", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "inputIconSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "inputFontFamily", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "inputFontWeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "inputFontStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "inputLineHeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "inputLetterSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "inputTextTransform", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "inputTextDecoration", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "inputFieldFontFamily", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputFieldFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "inputFieldFontWeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "inputFieldFontStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "inputFieldLineHeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "inputFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "inputFieldTextTransform", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputFieldColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputPlaceholderColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text::placeholder' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputIconColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "inputBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "inputBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "inputBorderTopWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "inputBorderTopStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "inputBorderTopColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "inputBorderRightWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "inputBorderRightStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "inputBorderRightColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "inputBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "inputBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "inputBorderBottomColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "inputBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "inputBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "inputBorderLeftColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "inputBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "inputBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "inputBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "inputBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "inputBoxShadow", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "inputWidth", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "inputMarginTop", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputMarginBottom", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "inputMarginLeft", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "inputMarginRight", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "inputPaddingTop", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "inputPaddingBottom", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "inputPaddingLeft", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "inputPaddingRight", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "inputInputMarginTop", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputInputMarginBottom", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "inputInputMarginLeft", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "inputInputMarginRight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "inputInputPaddingTop", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "inputInputPaddingBottom", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "inputInputPaddingLeft", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "inputInputPaddingRight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],

                    // Link Element - Select
                    [ OP3.Elements._extension.prop.Display, { id: "selectLabelDisplay", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "selectLabelSpacing", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "selectFontFamily", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "selectFontSize", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "selectFontWeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "selectFontStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "selectLineHeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "selectLetterSpacing", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "selectTextTransform", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "selectTextDecoration", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "selectFieldFontFamily", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "selectFieldFontSize", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "selectFieldFontWeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "selectFieldFontStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "selectFieldLineHeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.Height, { id: "selectFieldHeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "selectFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "selectFieldTextTransform", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "selectColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "selectFieldColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit, .op3-element[data-op3-element-type="select"] .select2-selection__placeholder, .op3-element[data-op3-element-type="select"] .select2-selection' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "selectBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "selectBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "selectBorderTopWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "selectBorderTopStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "selectBorderTopColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "selectBorderRightWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "selectBorderRightStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "selectBorderRightColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "selectBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "selectBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "selectBorderBottomColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "selectBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "selectBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "selectBorderLeftColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "selectBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "selectBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "selectBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "selectBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "selectBoxShadow", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "selectWidth", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "selectMarginTop", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "selectMarginBottom", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "selectMarginLeft", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "selectMarginRight", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "selectPaddingTop", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "selectPaddingBottom", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "selectPaddingLeft", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "selectPaddingRight", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "selectSelectMarginTop", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "selectSelectMarginBottom", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "selectSelectMarginLeft", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "selectSelectMarginRight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "selectSelectPaddingTop", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "selectSelectPaddingBottom", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "selectSelectPaddingLeft", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "selectSelectPaddingRight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],

                    // Link Element - Checkbox
                    [ OP3.Elements._extension.prop.Display, { id: "checkboxIconDisplay", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkboxIconFontSize", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.Width, { id: "checkboxIconSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "checkboxLabelSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label-spacing' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "checkboxFontFamily", selector: ' .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkboxFontSize", selector: ' .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "checkboxFontWeight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "checkboxFontStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "checkboxLineHeight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "checkboxLetterSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "checkboxTextTransform", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "checkboxTextDecoration", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkboxCheckmarkSize", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxCheckmarkBackgroundColorUnchecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxCheckmarkBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxCheckmarkColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkboxCheckmarkBorderTopWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkboxCheckmarkBorderTopStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkboxCheckmarkBorderTopColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkboxCheckmarkBorderRightWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkboxCheckmarkBorderRightStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkboxCheckmarkBorderRightColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkboxCheckmarkBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkboxCheckmarkBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkboxCheckmarkBorderBottomColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkboxCheckmarkBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkboxCheckmarkBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkboxCheckmarkBorderLeftColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkboxCheckmarkBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkboxCheckmarkBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkboxCheckmarkBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkboxCheckmarkBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkboxCheckmarkBorderTopWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkboxCheckmarkBorderTopStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkboxCheckmarkBorderTopColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkboxCheckmarkBorderRightWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkboxCheckmarkBorderRightStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkboxCheckmarkBorderRightColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkboxCheckmarkBorderBottomWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkboxCheckmarkBorderBottomStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkboxCheckmarkBorderBottomColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkboxCheckmarkBorderLeftWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkboxCheckmarkBorderLeftStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkboxCheckmarkBorderLeftColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkboxCheckmarkBorderTopLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkboxCheckmarkBorderTopRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkboxCheckmarkBorderBottomRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkboxCheckmarkBorderBottomLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxBackgroundColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-background]::before, .op3-element[data-op3-element-type="checkbox"] [data-op3-background]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-background][data-op3-background="checked"]::before, .op3-element[data-op3-element-type="checkbox"] [data-op3-background][data-op3-background="checked"]::after' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxColor", selector: ' .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] label input:checked ~ .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxIconColor", selector: ' .op3-element[data-op3-element-type="checkbox"] label .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxIconColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] label input:checked ~ .op3-element-checkbox-content .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "checkboxMarginTop", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "checkboxMarginBottom", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "checkboxMarginLeft", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "checkboxMarginRight", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "checkboxPaddingTop", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "checkboxPaddingBottom", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "checkboxPaddingLeft", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "checkboxPaddingRight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "checkboxWidth", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkboxBorderTopWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkboxBorderTopStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkboxBorderTopColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkboxBorderRightWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkboxBorderRightStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkboxBorderRightColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkboxBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkboxBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkboxBorderBottomColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkboxBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkboxBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkboxBorderLeftColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkboxBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkboxBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkboxBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkboxBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "checkboxBoxShadow", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                ];
            },

        },

    });

    // sync placeholderColor on fieldColor change
    OP3.bind("elementchange::formsection::color", function(e, o) {
        if (o.id !== "inputFieldColor")
            return;

        var element = OP3.$(OP3.Designer.activeElement());
        if (!element.is("input") || !element.closest(o.node).length)
            return;
        if (OP3.$(o.node).getOption("inputPlaceholderColor", o.media))
            return;

        OP3.transmit("elementoptionssyncrequest", { property: [ "placeholderColor" ] });
    });

    // fix select node line-height issue
    OP3.bind("elementchange::formsection::height", function(e, o) {
        if (o.id !== "selectFieldHeight")
            return;

        OP3.$(o.node).setOption("selectFieldLineHeight", o.value.after, o.media);
    });

    // sync colors
    OP3.bind("elementchange::formsection", function(e, o) {
        var sync = [
            "checkboxBackgroundColor",
            "checkboxColor",
            "checkboxIconColor",
            "checkboxCheckmarkBorderTopWidth",
            "checkboxCheckmarkBorderTopStyle",
            "checkboxCheckmarkBorderTopColor",
            "checkboxCheckmarkBorderRightWidth",
            "checkboxCheckmarkBorderRightStyle",
            "checkboxCheckmarkBorderRightColor",
            "checkboxCheckmarkBorderBottomWidth",
            "checkboxCheckmarkBorderBottomStyle",
            "checkboxCheckmarkBorderBottomColor",
            "checkboxCheckmarkBorderLeftWidth",
            "checkboxCheckmarkBorderLeftStyle",
            "checkboxCheckmarkBorderLeftColor",
            "checkboxCheckmarkBorderTopLeftRadius",
            "checkboxCheckmarkBorderTopRightRadius",
            "checkboxCheckmarkBorderBottomRightRadius",
            "checkboxCheckmarkBorderBottomLeftRadius",
        ];
        if (sync.indexOf(o.id) === -1)
            return;

        // element not focused, no need to sync
        var isActive = true
            && OP3.$(OP3.Designer.activeElement()).is('checkbox')
            && !!OP3.$(OP3.Designer.activeElement()).closest(o.node).length;
        if (!isActive)
            return;

        // properties to sync: current property
        // without prefix and with Checked suffix
        var prop = o.id
            .replace(/^checkbox(\w)/, function(match, group) {
                return group.toLowerCase();
            })
            + "Checked";
        prop = [ prop ];

        // label color changes icon color as well
        if (o.id === "checkboxColor")
            prop = prop.concat([
                "iconColor",
                "borderTopColor",
                "borderRightColor",
                "borderBottomColor",
                "borderLeftColor",
                "iconColorChecked",
                "borderTopColorChecked",
                "borderRightColorChecked",
                "borderBottomColorChecked",
                "borderLeftColorChecked",
            ]);

        // request property widget sync
        OP3.transmit("elementoptionssyncrequest",  { property: prop });
    });

})(jQuery, window, document);
