/**
 * OptimizePress3 element type
 *
 * Dependencies:
 *     - jQuery.js
 *     - flex-grid-cell-sizer.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - elements/default/js/op3-element.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Block layouts used for desktop/tablet/mobile
     */
    var _blockLayout = [
        { "0": "Layout #0" },
        { "1": "Layout #1" },
        { "2": "Layout #2" },
        { "3": "Layout #3" },
        { "4": "Layout #4" },
        { "5": "Layout #5" },
        { "6": "Layout #6" },
        { "7": "Layout #7" },
        { "8": "Layout #8" },
        { "9": "Layout #9" },
    ];

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.OrderBump = OP3.defineClass({

        Name: "OP3.Element.OrderBump",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "orderbump",

            _props: function() {
                return [
                    // Children display
                    [ OP3.Elements._extension.prop.BlockDisplayMedia, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayTitle, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.BlockDisplayText, { selector: " > [data-op3-element-container] > [data-op3-children]" } ],

                    // Block layout
                    [ OP3.Elements._extension.prop.BlockLayoutDesktop, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout } ],
                    [ OP3.Elements._extension.prop.BlockLayoutTablet, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout } ],
                    [ OP3.Elements._extension.prop.BlockLayoutMobile, { selector: " > [data-op3-element-container] > [data-op3-children]", options: _blockLayout } ],

                    // Grid template columns
                    [ OP3.Elements._extension.prop.GridTemplateColumns ],
                    [ OP3.Elements._extension.prop.GridTemplateColumnsImage ],

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
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]" } ],
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
                    [ OP3.Elements._extension.prop.Width ],

                    // Sidebar: Advanced Tab - Responsive
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

                    // Link Properties - Checkbox
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
                    [ OP3.Elements._extension.prop.CheckboxPosition, { selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op-checkbox-position]', serialize: false } ],

                    // Link Properties - Headline
                    [ OP3.Elements._extension.prop.FontFamily, { id: "headlineFontFamily", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "headlineColor", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "headlineFontSize", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "headlineLineHeight", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "headlineLetterSpacing", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "headlineFontWeight", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "headlineFontStyle", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "headlineTextTransform", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "headlineTextDecoration", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "headlineTextAlign", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "headlineTextShadow", selector: ' .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "headlineBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "headlineMarginTop", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "headlineMarginBottom", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "headlineMarginLeft", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "headlineMarginRight", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "headlinePaddingTop", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "headlinePaddingBottom", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "headlinePaddingLeft", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "headlinePaddingRight", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "headlineMaxWidth", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "headlineBorderTopWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "headlineBorderTopStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "headlineBorderTopColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "headlineBorderRightWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "headlineBorderRightStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "headlineBorderRightColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "headlineBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "headlineBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "headlineBorderBottomColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "headlineBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "headlineBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "headlineBorderLeftColor", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "headlineBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "headlineBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "headlineBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "headlineBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "headlineDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "headlineTransitionDuration", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "headlineColorHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "headlineFontWeightHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "headlineFontStyleHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "headlineTextTransformHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "headlineTextDecorationHover", selector: ' .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],

                    // Link Properties - Text
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
                    [ OP3.Elements._extension.prop.Display, { id: "textDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="text"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "textTransitionDuration", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textFontWeightHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textFontStyleHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTextTransformHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textTextDecorationHover", selector: ' .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h1, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h2, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h3, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h4, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h5, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > h6, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > p, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > pre, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > blockquote, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ol, .op3-element[data-op3-element-type="text"]:hover [data-op3-contenteditable] > ul' } ],

                    // Link Properties - Icon
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "iconLineHeight", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Padding, { id: "iconPadding", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "iconBorderTopWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "iconBorderRightWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "iconBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "iconBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "iconBackgroundColor", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "iconBorderColor", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "iconMarginTop", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "iconMarginBottom", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "iconMarginLeft", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "iconMarginRight", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "iconPaddingTop", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "iconPaddingBottom", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "iconPaddingLeft", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "iconPaddingRight", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "iconDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="icon"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "iconTransitionDuration", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container, .op3-element[data-op3-element-type="icon"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon', label: OP3._("Icon Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "iconBackgroundColorHover", selector: ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "iconBorderColorHover", selector: ' .op3-element[data-op3-element-type="icon"]:hover .op3-icon-container' } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon', serialize: false } ],
                    [ OP3.Elements._extension.prop.IconFrame, { selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container', serialize: false } ],
                    [ OP3.Elements._extension.prop.IconShape, { selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container', serialize: false } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "iconBoxShadow", selector: ' .op3-element[data-op3-element-type="icon"] .op3-icon-container' } ],

                    // Link Properties - Image
                    [ OP3.Elements._extension.prop.Width, { id: "imageWidth", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "imageOpacity", selector: ' .op3-element[data-op3-element-type="image"] img' } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "imageOpacityHover", selector: ' .op3-element[data-op3-element-type="image"]:hover img' } ],
                    [ OP3.Elements._extension.prop.Filter, { id: "imageFilter", selector: ' .op3-element[data-op3-element-type="image"] img' } ],
                    [ OP3.Elements._extension.prop.Filter, { id: "imageFilterHover", selector: ' .op3-element[data-op3-element-type="image"]:hover img' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "imageBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "imageBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="image"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "imageBorderTopWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "imageBorderTopStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "imageBorderTopColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "imageBorderRightWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "imageBorderRightStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "imageBorderRightColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "imageBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "imageBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "imageBorderBottomColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "imageBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "imageBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "imageBorderLeftColor", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "imageBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "imageBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "imageBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "imageBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "imageBoxShadow", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "imageMarginTop", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "imageMarginBottom", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "imageMarginLeft", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "imageMarginRight", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "imagePaddingTop", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "imagePaddingBottom", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "imagePaddingLeft", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "imagePaddingRight", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "imageMaxWidth", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "imageDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="image"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "imageTransitionDuration", selector: ' .op3-element[data-op3-element-type="image"] .op3-image-overlay-container, .op3-element[data-op3-element-type="image"] [data-op3-background], .op3-element[data-op3-element-type="image"] img' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "imageBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "imageBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="image"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "imageBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "imageBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "imageBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "imageBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "imageBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "imageBorderRightColorHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "imageBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "imageBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "imageBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "imageBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "imageBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "imageBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "imageBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "imageBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "imageBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "imageBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "imageBoxShadowHover", selector: ' .op3-element[data-op3-element-type="image"]:hover .op3-image-overlay-container' } ],
                ];
            },

            _blockLayoutPosition: {
                "2": "left",
                "4": "left",
                "6": "left",
                "8": "left",
                "3": "right",
                "5": "right",
                "7": "right",
                "9": "right",
            },
        },

    });

    // Change checkbox property checkboxPosition on orderbump
    // (prevent change on orderbump and execute change on checkbox)
    OP3.bind("elementchanging::orderbump::checkboxPosition elementchanging::orderbump::op3Icon elementchanging::orderbump::iconFrame elementchanging::orderbump::iconShape", function(e, o) {
        if (o.historyPending)
            return;

        var parent = OP3.$(o.node),
            child = parent.find("checkbox"),
            prop = o.id,
            value = o.value.after,
            media = o.media;
        child.setOption(prop, value, media);

        return false;
    })

    // sync colors
    OP3.bind("elementchange::orderbump", function(e, o) {
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

    // Set data-op3-parent-options-property-value attribute
    OP3.bind("elementoptionsformattach::orderbump elementoptionsformattach::image", function(e, o) {
        var keys = [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile" ];
        var element = OP3.$(o.node).closest("orderbump");
        if (element.length === 0)
            return;
        // var $element = $(element.node());
        var $parent = $(o.parent)
            .closest("form");
        keys.forEach(function(key) {
            var value = element.getOption(key, "all");

            // Tablet can inherit value from desktop, but not mobile,
            // since all presets have mobile layout defined
            if (key === "blockLayoutTablet" && value === "null")
                value = element.getOption("blockLayoutDesktop", "all");

            $parent.attr("data-op3-parent-options-property-value-" + key, value);
        });
    });

    OP3.bind("elementoptionsformdetach::orderbump elementoptionsformdetach::image", function(e, o) {
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-blockLayoutDesktop")
            .removeAttr("data-op3-parent-options-property-value-blockLayoutTablet")
            .removeAttr("data-op3-parent-options-property-value-blockLayoutMobile");
    });

    // Switch grid-template-columns based on image position in block layout
    OP3.bind("elementchange::orderbump::blockLayoutDesktop elementchange::orderbump::blockLayoutTablet elementchange::orderbump::blockLayoutMobile", function(e, o) {
        var layouts = OP3.$(o.node).element()._blockLayoutPosition;
        var layoutAfter = layouts[o.value.after];
        var layoutBefore = layouts[o.value.before];

        // No change
        if (layoutAfter === layoutBefore)
            return;

        OP3.$(o.node).find("orderbumpitem").each(function(index, el){
            var element = OP3.$(el).element();
            var value = element.getOption("gridTemplateColumns");

            // Tablet can inherit from desktop
            // (mobile doesn't since all mobile presets have defined blocklayout)
            if (value === null && o.id === "blockLayoutTablet" && OP3.LiveEditor.deviceMedia() === OP3.LiveEditor.deviceMedia('tablet')) {
                value = element
                    .getOption("gridTemplateColumns", "all");
            }

            if (value === null)
                return;

            var media = OP3.LiveEditor.deviceMedia('desktop');
            if (o.id === "blockLayoutTablet") media = OP3.LiveEditor.deviceMedia('tablet');
            if (o.id === "blockLayoutMobile") media = OP3.LiveEditor.deviceMedia('mobile')
            value = value.replace("minmax(0px, 100%)", '').trim();
            value = layoutAfter === "left" ? value + " minmax(0px, 100%)" : "minmax(0px, 100%) " + value;
            element.setOption("gridTemplateColumns", value, media);
        });
    });

    // On Order Bump we're forcing image to % and hiding px option,
    // so for backwards compatibility, we're force-switching
    // value to % (OP3-1666)
    OP3.bind("elementfocus::image", function(e, o) {
        var element = OP3.Query(o.node).element();
        if (element.path().indexOf("/orderbump/image") === -1)
            return;

        // Unlocked image
        var property = element.findProperty("width");
        var value = element.getOption("width", true);
        var parsedValue = property._parseValueUnit(value);
        var unit = parsedValue[1];
        value = parsedValue[0];
        if (unit === "px") {
            value = property._convert("%", "px", value);
            if (parseInt(value, 10) > 100) value = "100";
            element.setOption("width", value + "%");
        }

        // Linked elements
        var parent = $(o.node).closest('.op3-element[data-op3-element-type="orderbump"]');
        element = OP3.$(parent).element();
        property = element.findProperty("imageWidth");
        value = element.getOption("imageWidth", true);
        parsedValue = property._parseValueUnit(value);
        unit = parsedValue[1];
        value = parsedValue[0];
        if (unit === "px") {
            value = property._convert("%", "px", value);
            if (parseInt(value, 10) > 100) value = "100";
            element.setOption("imageWidth", value + "%");
        }
    });
})(jQuery, window, document);
