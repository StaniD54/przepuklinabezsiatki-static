/**
 * OptimizePress3 element type:
 * op3 element type breadcrumbtrail manipulation.
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
    OP3.Elements._extension.type.BreadcrumbTrail = OP3.defineClass({

        Name: "OP3.Element.BreadcrumbTrail",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "breadcrumbtrail",

            _props: function() {
                return [
                    // Typography
                    [ OP3.Elements._extension.prop.FontFamily, { selector: ' a' } ],
                    [ OP3.Elements._extension.prop.Color, { selector: ' a' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorActive", selector: ' li:last-child a' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorHover", selector: ' li a:hover' } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: ' li' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: ' li' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: ' a' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: ' a' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: ' a' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: ' a' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: ' a' } ],

                    // Stacking
                    [ OP3.Elements._extension.prop.StackColumnsDesktop, { label: "Stack items on Desktop", selector: " > [data-op3-element-container]", } ],
                    [ OP3.Elements._extension.prop.StackColumnsTablet, { label: "Stack items on Tablet", selector: " > [data-op3-element-container]", } ],
                    [ OP3.Elements._extension.prop.StackColumnsMobile, { label: "Stack items on Mobile", selector: " > [data-op3-element-container]", } ],

                    // Icon
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-icon", id: "iconColor", label: OP3._("Icon Colour") } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " .op3-icon", id: "iconFontSize", label: OP3._("Icon Size"), attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "200", "data-step-percent": "1", "data-precision-percent": "0", }, units: [ "%" ], defaultUnit: "%", }],
                    [ OP3.Elements._extension.prop.MarginRight, { label: OP3._("Icon Spacing"), id: "iconSpacingRight", selector: " .op3-icon", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-20", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0", }, }],
                    [ OP3.Elements._extension.prop.MarginLeft, { label: OP3._("Icon Spacing"), id: "iconSpacingLeft", selector: " .op3-icon" }],
                    [ OP3.Elements._extension.prop.MarginTop, { label: OP3._("Icon Vertical Position"), id: "iconVerticalPosition", selector: " .op3-icon", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-20", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0", }, }],

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
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " ol, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " ol, [data-op3-border]" } ],

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
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    [ OP3.Elements._extension.prop.AlignItems, { label: OP3._("Vertical Alignment"), selector: " li" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Horizontal Alignment"), selector: " ol" } ],
                    [ OP3.Elements._extension.prop.AlignItems, { id: "alignItemsMobile", label: OP3._("Horizontal Alignment"), selector: " ol" } ],

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
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", [data-op3-border], [data-op3-border] > [data-op3-background], a" } ],
                ];
            },

        },

    });

    // wrapped with function so we bind
    // events after OP3.Map does
    $(function() {
        OP3.bind("elementdrop::breadcrumbtrail", function (e, o) {
            if (typeof o.source !== "string")
                return;

            var element = OP3.$(o.target);
            OP3.BreadcrumbTrail.renderTree(element.node());
        });

        // Init breadcrumb trail on ready (after editor refresh)
        OP3.bind("ready", function(e, o) {
            $(o ? o.node : document)
                .find('[data-op3-element-type="breadcrumbtrail"]')
                .each(function() {
                    var element = OP3.$(this);
                    OP3.BreadcrumbTrail.renderTree(element.node());
                });
        });

        // Sync left & right icon margin
        OP3.bind("elementchange::breadcrumbtrail::marginRight elementchange::breadcrumbtrail::marginLeft", function(e, o) {
            if (o.id !== "iconSpacingRight" && o.id !== "iconSpacingLeft")
                return;

            var element = OP3.Query(o.node).element();
            var prop = o.id === "iconSpacingRight" ? "iconSpacingLeft" : "iconSpacingRight";
            element.setOption(prop, o.value.after, o.media);
        });

        /**
         * Add data-op3-parent-options-property-stack-columns properties as attributes to toolbar
         *
         * @param {Object} e
         * @param {Object} o
         * @return {Void}
         */
        OP3.bind("elementoptionssync::breadcrumbtrail::stackColumnsDesktop elementoptionssync::breadcrumbtrail::stackColumnsTablet elementoptionssync::breadcrumbtrail::stackColumnsMobile", function(e, o) {
            var node = OP3.$(o.node);
            $(o.parent)
                .closest("form")
                .attr("data-op3-parent-options-property-value-stack-columns-desktop", node.getOption("stackColumnsDesktop", true))
                .attr("data-op3-parent-options-property-value-stack-columns-tablet", node.getOption("stackColumnsTablet", true))
                .attr("data-op3-parent-options-property-value-stack-columns-mobile", node.getOption("stackColumnsMobile", true));
        });
    });
})(jQuery, window, document);
