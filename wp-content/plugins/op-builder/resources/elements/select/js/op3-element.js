/**
 * OptimizePress3 element type:
 * op3 element type select manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/html/js/op3-property.js
 *     - properties/value/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Select = OP3.defineClass({

        Name: "OP3.Element.Select",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "select",

            _props: function() {
                return [
                    // Style Tab - General
                    [ OP3.Elements._extension.prop.Name, { selector: " select", } ],
                    [ OP3.Elements._extension.prop.Label, { selector: " .op3-element-select-label", serialize: false } ],
                    [ OP3.Elements._extension.prop.SelectPlaceholder, { selector: " select", } ],
                    [ OP3.Elements._extension.prop.Display ],
                    [ OP3.Elements._extension.prop.Visible ],
                    [ OP3.Elements._extension.prop.VisibleLock, { selector: " select", } ],
                    [ OP3.Elements._extension.prop.Required, { selector: " select", serialize: false  } ],
                    [ OP3.Elements._extension.prop.RequiredFull, { selector: " select", } ],
                    [ OP3.Elements._extension.prop.RequiredLock, { selector: " select", } ],
                    [ OP3.Elements._extension.prop.Value, { selector: " select", } ],
                    [ OP3.Elements._extension.prop.UrlMapping, { selector: " select",} ],
                    [ OP3.Elements._extension.prop.InputValidationMessage, { selector: " select",} ],
                    [ OP3.Elements._extension.prop.Options ],
                    [ OP3.Elements._extension.prop.OptionsSelect ],
                    [ OP3.Elements._extension.prop.ExtraField, { selector: " .op3-element-select-wrapper" } ],
                    [ OP3.Elements._extension.prop.ExtraFieldSaveAs, { selector: " .op3-element-select-wrapper" } ],

                    // Style Tab - Label
                    [ OP3.Elements._extension.prop.Display, { id: "labelDisplay", selector: " .op3-element-select-label" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "labelVisible"} ],
                    [ OP3.Elements._extension.prop.MarginBottom, { label: OP3._("Label Spacing"), id: "labelSpacing", selector: " .op3-element-select-label" , attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0" }} ],

                    // Style Tab - Label Font
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .op3-element-select-label > div" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " .op3-element-select-label > div", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .op3-element-select-label > div" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .op3-element-select-label > div" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .op3-element-select-label > div", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " .op3-element-select-label > div" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .op3-element-select-label > div" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .op3-element-select-label > div" } ],

                    // Style Tab - Field Font
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fieldFontFamily", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fieldFontSize", selector: " .op3-element-select-edit", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fieldFontWeight", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fieldFontStyle", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "fieldLineHeight", selector: " .op3-element-select-edit", defaultUnit: "em", units: [ "em" ], attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.Height, { id: "fieldHeight", selector: " .op3-element-select-edit-text", defaultUnit: "em", units: [ "em" ], attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "fieldLetterSpacing", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "fieldTextTransform", selector: " .op3-element-select-edit" } ],

                    // Style Tab - Color
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-element-select-label" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "fieldColor", label: OP3._("Text Colour"), selector: ' .op3-element-select-edit, .select2-selection__placeholder, .select2-selection' } ],

                    // Style Tab - Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Background Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-element-select-edit [data-op3-element-container], .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-element-select-edit [data-op3-border]" } ],

                    // Style Tab - Field Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " .op3-element-select-edit [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced Tab - Element Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.Width ],
                    [ OP3.Elements._extension.prop.WidthCalcColumns ],

                    // Advanced Tab - Select Positioning
                    [ OP3.Elements._extension.prop.BoxModel, { id: "selectBoxModel", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "selectMarginTop", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "selectMarginBottom", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "selectMarginLeft", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "selectMarginRight", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "selectPaddingTop", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "selectPaddingBottom", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "selectPaddingLeft", selector: " .op3-element-select-edit" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "selectPaddingRight", selector: " .op3-element-select-edit" } ],

                    // Advanced tab - Responsive
                    //[ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    //[ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    //[ OP3.Elements._extension.prop.ForceVisibility ],
                    // @todo? - we already have display, should we add another hidden element???

                    // Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],

                    /*
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],
                    */
                ];
            },

            desc: function() {
                return ""
                    || this.getOption("label", "all")
                    || OP3.Elements._extension.type.Default.prototype.desc.call(this);
            },

        },

    });

    // fix select node line-height issue
    OP3.bind("elementchange::select::height", function(e, o) {
        if (o.id !== "fieldHeight")
            return;

        OP3.$(o.node).setOption("fieldLineHeight", o.value.after, o.media);
    });

    // Update placeholder
    OP3.bind("elementchange::select::selectPlaceholder", function(e, o) {
        $(o.node).find("option:first").text(o.value.after);
    });

    // Set placeholder to correct value on load
    OP3.bind("load", function(e, o) {
        $("select").each(function() {
            var placeholder;

            placeholder = $(this).attr("data-placeholder");
            if (!placeholder && $(this).attr("name") === "schedule")
                placeholder = OP3._("Select time and date");

            if (placeholder)
                $(this).find("option:first").text(placeholder);
        });
    });

})(jQuery, window, document);
