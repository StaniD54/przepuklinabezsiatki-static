/**
 * OptimizePress3 element type:
 * op3 element type testimonialItem manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.WebinarCalendarItem = OP3.defineClass({

        Name: "OP3.Element.WebinarCalendarItem",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "webinarcalendaritem",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Html, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.HtmlWebinarCalendarType ],
                    [ OP3.Elements._extension.prop.Href, { selector: " a", serialize: false, } ],
                    [ OP3.Elements._extension.prop.HrefFull, { selector: " a", } ],
                    [ OP3.Elements._extension.prop.Target, { label: OP3._("Link Target"), selector: " a", } ],
                    [ OP3.Elements._extension.prop.Height, {
                        label: OP3._("Size"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "0",
                            "data-max-px": "200",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        selector: " svg",
                    }],

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

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > [data-op3-element-container] > [data-op3-border] " } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " [data-op3-element-container] > [data-op3-border]" } ],
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

                ];
            },

        },

    });

})(jQuery, window, document);
