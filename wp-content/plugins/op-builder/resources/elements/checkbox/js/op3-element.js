/**
 * OptimizePress3 element type:
 * op3 element type input checkbox manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/html/js/op3-property.js
 *     - properties/checked/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Checkbox = OP3.defineClass({

        Name: "OP3.Element.Checkbox",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "checkbox",

            _props: function() {
                return [
                    // Style Tab - General
                    [ OP3.Elements._extension.prop.TypeAttr, { selector: " input" } ],
                    [ OP3.Elements._extension.prop.Name, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Label, { selector: " .op3-element-checkbox-label", serialize: false } ],
                    [ OP3.Elements._extension.prop.Checked, { selector: " input", serialize: false, } ],
                    [ OP3.Elements._extension.prop.CheckedFull, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.CheckedLock, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Display ],
                    [ OP3.Elements._extension.prop.Visible ],
                    [ OP3.Elements._extension.prop.VisibleLock, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Required, { selector: " input", serialize: false  } ],
                    [ OP3.Elements._extension.prop.RequiredFull, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.RequiredLock, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.Value, { selector: " input", } ],
                    [ OP3.Elements._extension.prop.UrlMapping, { selector: " input",} ],
                    [ OP3.Elements._extension.prop.InputValidationMessage, { selector: " input",} ],

                    // Style Tab - Icon
                    [ OP3.Elements._extension.prop.Display, { id: "iconDisplay", selector: " .op3-element-checkbox-icon, .op3-element-checkbox-icon-spacing" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "iconVisible" } ],
                    [ OP3.Elements._extension.prop.Blink ],
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-element-checkbox-icon", } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: " .op3-element-checkbox-icon", attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "200", "data-step-percent": "1", "data-precision-percent": "0", }, units: [ "%" ], defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.Width, { id: "iconSpacing", selector: " .op3-element-checkbox-icon-spacing", label: OP3._("Icon Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "150", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ], defaultUnit: "px" } ],

                    // Style Tab - Label
                    [ OP3.Elements._extension.prop.Width, { label: "Label Spacing", id: "labelSpacing", selector: " .op3-element-checkbox-label-spacing", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0" }} ],

                    // Style Tab - Font
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " label" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " label", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .op3-element-checkbox-label" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .op3-element-checkbox-label" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .op3-element-checkbox-label", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " .op3-element-checkbox-label" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .op3-element-checkbox-label" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .op3-element-checkbox-label" } ],

                    // Checkmark position and color
                    [ OP3.Elements._extension.prop.CheckboxPosition ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkmarkSize", selector: " .op3-element-checkbox-checkmark", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "10", "data-max-px": "64", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ], defaultUnit: "px" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkmarkBackgroundColorUnchecked", selector: " .op3-element-checkbox-checkmark .unchecked", label: OP3._("Unchecked Background Colour") } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkmarkBackgroundColorChecked", selector: " .op3-element-checkbox-checkmark .checked", label: OP3._("Checked Background Colour") } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkmarkColor", selector: " .op3-element-checkbox-checkmark .checked", label: OP3._("Checkmark Colour") } ],

                    // Checkmark borders
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkmarkBorderTopWidth", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkmarkBorderTopStyle", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkmarkBorderTopColor", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkmarkBorderRightWidth", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkmarkBorderRightStyle", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkmarkBorderRightColor", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkmarkBorderBottomWidth", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkmarkBorderBottomStyle", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkmarkBorderBottomColor", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkmarkBorderLeftWidth", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkmarkBorderLeftStyle", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkmarkBorderLeftColor", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkmarkBorderTopLeftRadius", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkmarkBorderTopRightRadius", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkmarkBorderBottomRightRadius", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkmarkBorderBottomLeftRadius", selector: " .op3-element-checkbox-checkmark .unchecked, .op3-element-checkbox-checkmark .checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkmarkBorderTopWidthChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkmarkBorderTopStyleChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkmarkBorderTopColorChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkmarkBorderRightWidthChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkmarkBorderRightStyleChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkmarkBorderRightColorChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkmarkBorderBottomWidthChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkmarkBorderBottomStyleChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkmarkBorderBottomColorChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkmarkBorderLeftWidthChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkmarkBorderLeftStyleChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkmarkBorderLeftColorChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkmarkBorderTopLeftRadiusChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkmarkBorderTopRightRadiusChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkmarkBorderBottomRightRadiusChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkmarkBorderBottomLeftRadiusChecked", selector: " .op3-element-checkbox-checkmark .checked.checked" } ],

                    // Style Tab - Background
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColor", selector: ' [data-op3-background]::before, [data-op3-background]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorChecked", selector: ' [data-op3-background][data-op3-background="checked"]::before, [data-op3-background][data-op3-background="checked"]::after' } ],
                    // background image (gradients) doesn't work well on checked/unchecked status

                    // Style Tab - Color
                    [ OP3.Elements._extension.prop.Color, { id: "color", selector: " label" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorChecked", selector: " label input:checked ~ .op3-element-checkbox-content" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: " label .op3-element-checkbox-icon" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorChecked", selector: " label input:checked ~ .op3-element-checkbox-content .op3-element-checkbox-icon" } ],

                    // Advanced Tab - Element Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: ' .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: ' .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: ' .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: ' .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Width ],
                    [ OP3.Elements._extension.prop.WidthCalcColumns ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " [data-op3-element-container] [data-op3-border], [data-op3-element-container]" } ],
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

                    // Advanced tab - Responsive
                    //[ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    //[ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    //[ OP3.Elements._extension.prop.ForceVisibility ],
                    // @todo? - we already have display, should we add another hidden element???

                    // Advanced Tab - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    // Advanced Tab
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                ];
            },

            desc: function() {
                return ""
                    || this.getOption("label", "all")
                    || OP3.Elements._extension.type.Default.prototype.desc.call(this);
            },

        },

    });

    // Set data-op3-parent-options-property-value attribute
    // (so we can hide some options with css).
    OP3.bind("elementoptionsformattach::checkbox", function(e, o) {
        var element = OP3.$(o.node);

        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-iconVisible", element.getOption("iconVisible", true));
    });

    OP3.bind("elementoptionsformdetach::checkbox", function(e, o) {
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-iconVisible");
    });

    OP3.bind("elementchange::checkbox::visible", function(e, o) {
        if (o.id !== "iconVisible")
            return;
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-parent-options-property-value-" + o.id, o.value.after);
    });

    // Sync colors
    OP3.bind("elementchange::checkbox", function(e, o) {
        var sync = [
            "backgroundColor",
            "color",
            "iconColor",
            "checkmarkBorderTopWidth",
            "checkmarkBorderTopStyle",
            "checkmarkBorderTopColor",
            "checkmarkBorderRightWidth",
            "checkmarkBorderRightStyle",
            "checkmarkBorderRightColor",
            "checkmarkBorderBottomWidth",
            "checkmarkBorderBottomStyle",
            "checkmarkBorderBottomColor",
            "checkmarkBorderLeftWidth",
            "checkmarkBorderLeftStyle",
            "checkmarkBorderLeftColor",
            "checkmarkBorderTopLeftRadius",
            "checkmarkBorderTopRightRadius",
            "checkmarkBorderBottomRightRadius",
            "checkmarkBorderBottomLeftRadius",
        ];
        if (sync.indexOf(o.id) === -1)
            return;

        // element not focused, no need to sync
        var isActive = o.node === OP3.Designer.activeElement().node();
        if (!isActive)
            return;

        // properties to sync: current property
        // with Checked suffix
        var prop = o.id + "Checked";
        prop = [ prop ];

        // label color changes icon and border colors as well
        if (o.id === "color")
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
