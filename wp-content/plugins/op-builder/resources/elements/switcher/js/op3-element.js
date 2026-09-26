/**
 * OptimizePress3 element type:
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Switcher = OP3.defineClass({

        Name: "OP3.Element.Switcher",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "switcher",

            _props: function() {
                return [
                    // Toolbar - Switcher
                    [ OP3.Elements._extension.prop.Width, { id: "sliderWidth", selector: " .header .widget .slider", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "32", "data-max-px": "150", "data-step-px": "2", "data-precision-px": "0", }, units: [ "px" ], defaultUnit: "px", } ],
                    [ OP3.Elements._extension.prop.Height, { id: "sliderHeight", selector: " .header .widget .slider", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "2", "data-precision-px": "0", }, } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", selector: " .widget" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", selector: " .widget" } ],
                    [ OP3.Elements._extension.prop.Gutter2, { label: OP3._("Labels Offset") } ],

                    // Toolbar - Switcher - Colour
                    [ OP3.Elements._extension.prop.BackgroundColor, { label: OP3._("Slider Bar Colour"), id: "sliderBackgroundColor", selector: ' .slider' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { label: OP3._("Active Slider Bar Colour"), id: "sliderBackgroundColorActive", selector: ' .widget' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { label: OP3._("Slider Handle Colour"), id: "boxBackgroundColorActive", selector: ' .box' } ],
                    [ OP3.Elements._extension.prop.Color, { label: OP3._("Labels Colour"), selector: " .header [data-op3-contenteditable] > p" } ],

                    // Toolbar - Font Options
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .header [data-op3-contenteditable] > p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " .header [data-op3-contenteditable] > p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .header [data-op3-contenteditable] > p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " .header [data-op3-contenteditable] > p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .header [data-op3-contenteditable] > p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .header [data-op3-contenteditable] > p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .header [data-op3-contenteditable] > p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .header [data-op3-contenteditable] > p" } ],

                    // Toolbar - Switcher - Box Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxBoxShadow", selector: " .header .widget .box" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxBoxShadowAngle" } ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxBoxShadowDistance" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxBoxShadowBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxBoxShadowSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxBoxShadowColor" } ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxBoxShadowInset" } ],

                    // Toolbar - Border - Switcher
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "sliderBorderTopWidth", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "sliderBorderTopStyle", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "sliderBorderTopColor", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "sliderBorderRightWidth", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "sliderBorderRightStyle", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "sliderBorderRightColor", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "sliderBorderBottomWidth", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "sliderBorderBottomStyle", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "sliderBorderBottomColor", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "sliderBorderLeftWidth", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "sliderBorderLeftStyle", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "sliderBorderLeftColor", selector: " .header .widget .slider" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "sliderBorderTopLeftRadius", selector: " .widget, .slider" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "sliderBorderTopRightRadius", selector: " .widget, .slider" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "sliderBorderBottomRightRadius", selector: " .widget, .slider" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "sliderBorderBottomLeftRadius", selector: " .widget, .slider" } ],

                    // Toolbar - Border - Box
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "boxBorderTopWidth", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "boxBorderTopStyle", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "boxBorderTopColor", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "boxBorderRightWidth", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "boxBorderRightStyle", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "boxBorderRightColor", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "boxBorderBottomWidth", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "boxBorderBottomStyle", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "boxBorderBottomColor", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "boxBorderLeftWidth", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "boxBorderLeftStyle", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "boxBorderLeftColor", selector: " .header .widget .box"} ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "boxBorderTopLeftRadius", selector: " .header .widget .box" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "boxBorderTopRightRadius", selector: " .header .widget .box" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "boxBorderBottomRightRadius", selector: " .header .widget .box" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "boxBorderBottomLeftRadius", selector: " .header .widget .box" } ],

                    // Toolbar - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],

                    // Toolbar - Background - Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "backgroundImageDisplay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl ],
                    [ OP3.Elements._extension.prop.Opacity, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100 ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],

                    // Toolbar - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Overlay Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", label: OP3._("Overlay Background Color"), selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle", label: OP3._("Overlay Angle") } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition", label: OP3._("Overlay Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor", label: OP3._("Overlay Start Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition", label: OP3._("Overlay Start Position") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor", label: OP3._("Overlay Stop Color") } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition", label: OP3._("Overlay Stop Position") } ],

                    // Toolbar - Border
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

                    // Toolbar - Box Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Sidebar - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Sidebar - Margins & Paddings
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
                    [ OP3.Elements._extension.prop.Width, { attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: [ "px", "%", ], }],

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
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                    [ OP3.Elements._extension.prop.Html, { selector: " .op3-html" } ],
                    [ OP3.Elements._extension.prop.Html2, { selector: " .op3-html2" } ],

                    // Sidebar - Hover - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]" } ],

                    // Sidebar - Hover - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBaseHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBaseHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBaseHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseHoverStopPosition" } ],

                    // Sidebar - Hover - Background - Image
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: 'backgroundImageHover', selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { id: "backgroundImageHoverUrl" } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "opacityHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.Opacity100, { id: "opacityHover100" }],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { id: "backgroundPositionHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { id: "backgroundAttachmentHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { id: "backgroundRepeatHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { id: "backgroundSizeHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="image"]' } ],

                    // Sidebar - Hover - Background - Overlay
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Sidebar - Hover - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderRightColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]", id: "borderLeftColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ":hover > [data-op3-element-container] > [data-op3-border]", id: "borderBottomLeftRadiusHover" } ],

                    // Sidebar - Hover - Box Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetX, { id: "boxShadowHoverOffsetX" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetY, { id: "boxShadowHoverOffsetY" } ],
                    //[ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle" } ],
                    //[ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor" } ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset" } ],

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
                ];
            },

        },

    });

    /**
     * Slider click event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _sliderClickHandler = function(e) {
        var $target = $(e.currentTarget);

        $target
            .toggleClass("active")
            .closest('[data-op3-element-type="switcher"]')
            .find('[data-op3-element-type="switchercontentitem"]')
            .toggleClass("active");

    }

    OP3.bind("load elementappendfirst", function(e, o) {
        $(o ? o.node : document)
            .find('.header .widget .slider')
            .on("click", _sliderClickHandler);
    });

})(jQuery, window, document);
