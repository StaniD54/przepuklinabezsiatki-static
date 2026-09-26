/**
 * OptimizePress3 element type:
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
    OP3.Elements._extension.type.Fieldset = OP3.defineClass({

        Name: "OP3.Element.Fieldset",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "fieldset",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Label, { selector: " legend", serialize: false } ],
                    [ OP3.Elements._extension.prop.ExtraField, { selector: " fieldset" } ],
                    [ OP3.Elements._extension.prop.ExtraFieldSaveAs, { selector: " fieldset" } ],
                    [ OP3.Elements._extension.prop.Display ],
                    [ OP3.Elements._extension.prop.Visible ],
                    [ OP3.Elements._extension.prop.VisibleLock, { selector: " input" } ],

                    // Flexbox (field layout) options
                    [ OP3.Elements._extension.prop.FlexDirection, { selector: " [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.FlexDirectionVertical, { label: OP3._("Fields Direction") } ],
                    [ OP3.Elements._extension.prop.AlignItems, { selector: " [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { selector: " [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.Width, { id: "childWidth", selector: " .op3-element" } ],

                    // Toolbar - Fieldset
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "labelSpacing", selector: " legend" } ],
                    [ OP3.Elements._extension.prop.Display, { id: "labelDisplay", selector: " legend" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "labelVisible"} ],

                    // Toolbar - Color
                    [ OP3.Elements._extension.prop.Color, { selector: " legend" } ],

                    // Toolbar - Font
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " legend" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " legend", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " legend" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " legend" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " legend", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }} ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " legend" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " legend" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " legend" } ],

                    // Toolbar - Border
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

                    // Sidebar - Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.PaddingDrag ],
                    [ OP3.Elements._extension.prop.Width ],

                    // Toolbar - Border - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Sidebar - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    // Sidebar - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Html, { selector: " legend" } ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

            desc: function() {
                return ""
                    || this.getOption("label", "all")
                    || OP3.Elements._extension.type.Default.prototype.desc.call(this);
            },

        },

    });

    // Layout handler.
    OP3.bind("elementchange::*::flexDirection", function(e, o) {
        // Do not check o.node, check active elemetn type (property
        // can be linked, in which case o.node will be fileldset
        // parent).
        if (OP3.Designer.activeElement().type() !== "fieldset")
            return;

        // Prefix property ids.
        var childWidth = "childWidth",
            alignItems = "alignItems",
            justifyContent = "justifyContent";
        if (o.id === "fieldsetFlexDirection") {
            childWidth = "fieldsetChildWidth",
            alignItems = "fieldsetAlignItems",
            justifyContent = "fieldsetJustifyContent";
        }
        else if (o.id !== "flexDirection")
            return;

        // Set properties.
        var element = OP3.$(o.node).element(),
            media = "all";
        if (o.value.after === "row") {
            element.setOption(childWidth, "25%", media);
            element.setOption(alignItems, "flex-start", media);
            element.setOption(justifyContent, "flex-start", media);
        } else if (o.value.after === "column") {
            element.setOption(childWidth, "100%", media);
            element.setOption(alignItems, "center", media);
            element.setOption(justifyContent, "center", media);
        } else if (o.value.after === null) {
            element.setOption(childWidth, null, media);
            element.setOption(alignItems, null, media);
            element.setOption(justifyContent, null, media);
        }
    });

})(jQuery, window, document);
