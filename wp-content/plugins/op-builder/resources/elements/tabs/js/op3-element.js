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
    OP3.Elements._extension.type.Tabs = OP3.defineClass({

        Name: "OP3.Element.Tabs",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "tabs",

            _props: function() {
                return [
                    // Toolbar - Tabs
                    [ OP3.Elements._extension.prop.DefaultActiveTab ],
                    [ OP3.Elements._extension.prop.TabContentAnimation ],

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
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorHover", selector: ":hover > [data-op3-element-container],:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "borderTopLeftRadiusHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "borderTopRightRadiusHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "borderBottomRightRadiusHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "borderBottomLeftRadiusHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],

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

                    // Link Properties - tabsheader
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "tabsheaderBackgroundImageBase", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tabsheaderBackgroundColorBase", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tabsheaderBorderTopWidth", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tabsheaderBorderTopStyle", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tabsheaderBorderTopColor", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tabsheaderBorderRightWidth", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tabsheaderBorderRightStyle", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tabsheaderBorderRightColor", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tabsheaderBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tabsheaderBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tabsheaderBorderBottomColor", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tabsheaderBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tabsheaderBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tabsheaderBorderLeftColor", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tabsheaderBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tabsheaderBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tabsheaderBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tabsheaderBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.FieldLayoutDesktop, { id: "tabsheaderFieldLayoutDesktop", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children]', serialize: false } ],
                    [ OP3.Elements._extension.prop.FieldLayoutTablet, { id: "tabsheaderFieldLayoutTablet", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children]', serialize: false } ],
                    [ OP3.Elements._extension.prop.FieldLayoutMobile, { id: "tabsheaderFieldLayoutMobile", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children]', serialize: false } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "tabsheaderJustifyContent", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.AlignItems, { id: "tabsheaderAlignItems", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tabsheaderBoxShadow", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tabsheaderGutterLeft", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="tabsheaderitem"]', }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tabsheaderGutterRight", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="tabsheaderitem"]', }],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tabsheaderGutterAdjustLeft", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tabsheaderGutterAdjustRight", selector: ' .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tabsheaderMarginTop", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tabsheaderMarginBottom", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tabsheaderMarginLeft", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tabsheaderMarginRight", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tabsheaderPaddingTop", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tabsheaderPaddingBottom", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tabsheaderPaddingLeft", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tabsheaderPaddingRight", selector: ' .op3-element[data-op3-element-type="tabsheader"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "tabsheaderTransitionDuration", selector: ' .op3-element[data-op3-element-type="tabsheader"], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheader"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "tabsheaderBackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tabsheaderBackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tabsheaderBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tabsheaderBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tabsheaderBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tabsheaderBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tabsheaderBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tabsheaderBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tabsheaderBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tabsheaderBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tabsheaderBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tabsheaderBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tabsheaderBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tabsheaderBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tabsheaderBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tabsheaderBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tabsheaderBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tabsheaderBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tabsheaderBoxShadowHover", selector: ' .op3-element[data-op3-element-type="tabsheader"]:hover > [data-op3-element-container] > [data-op3-border]' } ],

                    // Link Properties - tabscontent
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "tabscontentBackgroundImageBase", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tabscontentBackgroundColorBase", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tabscontentBorderTopWidth", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tabscontentBorderTopStyle", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tabscontentBorderTopColor", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tabscontentBorderRightWidth", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tabscontentBorderRightStyle", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tabscontentBorderRightColor", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tabscontentBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tabscontentBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tabscontentBorderBottomColor", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tabscontentBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tabscontentBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tabscontentBorderLeftColor", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tabscontentBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tabscontentBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tabscontentBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tabscontentBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tabscontentBoxShadow", selector: ' .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tabscontentMarginTop", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tabscontentMarginBottom", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tabscontentMarginLeft", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tabscontentMarginRight", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tabscontentPaddingTop", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tabscontentPaddingBottom", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tabscontentPaddingLeft", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tabscontentPaddingRight", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "tabscontentDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="tabscontent"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "tabscontentTransitionDuration", selector: ' .op3-element[data-op3-element-type="tabscontent"], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabscontent"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "tabscontentBackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tabscontentBackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tabscontentBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tabscontentBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tabscontentBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tabscontentBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tabscontentBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tabscontentBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tabscontentBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tabscontentBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tabscontentBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tabscontentBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tabscontentBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tabscontentBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tabscontentBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tabscontentBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tabscontentBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tabscontentBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tabscontentBoxShadowHover", selector: ' .op3-element[data-op3-element-type="tabscontent"]:hover > [data-op3-element-container] > [data-op3-border]' } ],

                    // Link Properties - tabsheaderitem
                    [ OP3.Elements._extension.prop.BlockLayoutDesktop, { id: "tabsheaderitemBlockLayoutDesktop", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-element-container]', options: [ { "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], serialize: false } ],
                    [ OP3.Elements._extension.prop.BlockLayoutTablet, { id: "tabsheaderitemBlockLayoutTablet", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-element-container]', options: [ { "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], serialize: false } ],
                    [ OP3.Elements._extension.prop.BlockLayoutMobile, { id: "tabsheaderitemBlockLayoutMobile", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-element-container]', options: [ { "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], serialize: false } ],
                    [ OP3.Elements._extension.prop.BlockDisplayMedia, { id: "tabsheaderitemBlockDisplayMedia", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-element-container]', serialize: false } ],
                    [ OP3.Elements._extension.prop.Gap, { id: "tabsheaderitemGap", label: OP3._("Spacing"), selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-element-container]' }],
                    [ OP3.Elements._extension.prop.FontFamily, { id:"tabsheaderitemFontFamily", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id:"tabsheaderitemFontSize", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-element-container]' }],
                    [ OP3.Elements._extension.prop.LineHeight, { id:"tabsheaderitemLineHeight", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id:"tabsheaderitemLetterSpacing", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id:"tabsheaderitemFontWeight", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id:"tabsheaderitemFontStyle", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id:"tabsheaderitemTextTransform", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id:"tabsheaderitemTextDecoration", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "tabsheaderitemBackgroundImageBase", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tabsheaderitemBackgroundColorBase", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "tabsheaderitemBackgroundImageActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after, .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tabsheaderitemBackgroundColorActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after, .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "tabsheaderitemBackgroundImageBaseHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tabsheaderitemBackgroundColorBaseHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tabsheaderitemTextColor", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tabsheaderitemTextColorActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active [data-op3-contenteditable],  .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tabsheaderitemTextColorHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tabsheaderitemIconColor", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tabsheaderitemIconColorActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active .op3-icon,  .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tabsheaderitemIconColorHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover .op3-icon' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tabsheaderitemBorderTopWidth", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tabsheaderitemBorderTopStyle", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tabsheaderitemBorderTopColor", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tabsheaderitemBorderRightWidth", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tabsheaderitemBorderRightStyle", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tabsheaderitemBorderRightColor", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tabsheaderitemBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tabsheaderitemBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tabsheaderitemBorderBottomColor", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tabsheaderitemBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tabsheaderitemBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tabsheaderitemBorderLeftColor", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tabsheaderitemBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tabsheaderitemBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tabsheaderitemBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tabsheaderitemBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tabsheaderitemBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tabsheaderitemBorderTopStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tabsheaderitemBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tabsheaderitemBorderRightWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tabsheaderitemBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tabsheaderitemBorderRightColorHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tabsheaderitemBorderBottomWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tabsheaderitemBorderBottomStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tabsheaderitemBorderBottomColorHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tabsheaderitemBorderLeftWidthHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tabsheaderitemBorderLeftStyleHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tabsheaderitemBorderLeftColorHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tabsheaderitemBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tabsheaderitemBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tabsheaderitemBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tabsheaderitemBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tabsheaderitemBorderTopWidthActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tabsheaderitemBorderTopStyleActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tabsheaderitemBorderTopColorActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tabsheaderitemBorderRightWidthActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tabsheaderitemBorderRightStyleActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tabsheaderitemBorderRightColorActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tabsheaderitemBorderBottomWidthActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tabsheaderitemBorderBottomStyleActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tabsheaderitemBorderBottomColorActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tabsheaderitemBorderLeftWidthActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tabsheaderitemBorderLeftStyleActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tabsheaderitemBorderLeftColorActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tabsheaderitemBorderTopLeftRadiusActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tabsheaderitemBorderTopRightRadiusActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tabsheaderitemBorderBottomRightRadiusActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tabsheaderitemBorderBottomLeftRadiusActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tabsheaderitemBoxShadow", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tabsheaderitemBoxShadowHover", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tabsheaderitemBoxShadowActive", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"].jquery-tabs-active > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"]:hover > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tabsheaderitemMarginTop", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tabsheaderitemMarginBottom", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tabsheaderitemMarginLeft", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tabsheaderitemMarginRight", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tabsheaderitemPaddingTop", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tabsheaderitemPaddingBottom", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tabsheaderitemPaddingLeft", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tabsheaderitemPaddingRight", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "tabsheaderitemMaxWidth", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "tabsheaderitemJustifyContent", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "tabsheaderitemTransitionDuration", selector: ' .op3-element[data-op3-element-type="tabsheaderitem"], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border], .op3-element[data-op3-element-type="tabsheaderitem"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background]' } ],
                ];
            },

        },

    });

    /**
     * Init jquery-tabs when live editor is loaded or tabs element is appended
     *
     * @param {Object} e
     * @param {Object} o
     * @param {Void}
     */
    OP3.bind("load elementappendfirst", function(e, o) {
        var $node = $(o ? o.node : document.body);

        $node
            .parent()
            .find('[data-op3-element-type="tabs"]')
            .each(function() {
                $(this).tabs({
                    headerItemSelector: ' > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabsheader"]  > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabsheaderitem"]',
                    contentItemSelector: ' > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabscontent"]  > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabscontentitem"]',
                })
            });
    });

    /**
     * When moving tabscontentitem or tabsheaderitem elementdrop event
     * will be triggered before elementdetach event.
     * Add flag so it can be recognize that element is moved or deleted.
     *
     * @param {Object} e
     * @param {Object} o
     * @param {Void}
     */
    OP3.bind("elementdrop::tabsheaderitem elementdrop::tabscontentitem", function(e, o) {
        var $element = $(o.source);
        $element.data("element-is-moved", true);

        var $linked = $element.data("tab-item-link");
        $linked.data("element-is-moved", true);
    });

    /**
     * Flag to stop elementdetach::tabsheaderitem and elementdetach::tabscontentitem recursion.
     * When tabsheaderitem is detached then corresponding tabscontentitem is detached and vice versa.
     *
     * @type {Boolean}
     */
    var _stopDetachRecursion = false;

    /**
     * When tabsheaderitem is deleted then delete corresponding tabscontentitem.
     *
     * This event is also triggered when tabsheaderitem is moved and in that
     * scenario we don't want to delete corresponding tabscontentitem.
     *
     * @param {Object} e
     * @param {Object} o
     * @param {Void}
     */
    OP3.bind("elementdetach::tabsheaderitem", function(e, o) {
        var lib = $(o.parent).closest('.op3-element[data-op3-element-type="tabs"]').data("jqueryTabs");

        if (o.historyPending) {
            return lib.refresh();
        }

        if (_stopDetachRecursion)
            return;

        _stopDetachRecursion = true;

        var $element = $(o.node);

        if (!$element.data("element-is-moved")) {
            // Remove corresponding tabscontentitem
            var $tabsContentItem = $element.data("tab-item-link");
            OP3.$($tabsContentItem).detach();
        }

        $element.data("element-is-moved", false);
        _stopDetachRecursion = false;
        lib.refresh();
    });

    /**
     * When tabscontentitem is deleted then delete corresponding tabsheaderitem.
     *
     * This event is also triggered when tabscontentitem is moved and in that
     * scenario we don't want to delete corresponding tabsheaderitem.
     *
     * @param {Object} e
     * @param {Object} o
     * @param {Void}
     */
    OP3.bind("elementdetach::tabscontentitem", function(e, o) {
        var lib = $(o.parent).closest('.op3-element[data-op3-element-type="tabs"]').data("jqueryTabs");

        if (o.historyPending) {
            return lib.refresh();
        }

        if (_stopDetachRecursion)
            return;

        _stopDetachRecursion = true;

        var $element = $(o.node);

        if (!$element.data("element-is-moved")) {
            // Remove corresponding tabsheaderitem
            var $tabsHeaderItem = $element.data("tab-item-link");
            OP3.$($tabsHeaderItem).detach();
        }

        $element.data("element-is-moved", false);
        _stopDetachRecursion = false;
        lib.refresh();
    });

    /**
     * Flag to stop elementappend::tabsheaderitem and elementappend::tabscontentitem recursion.
     * When tabsheaderitem is appended then corresponding tabscontentitem is added and vice versa.
     *
     * @type {Boolean}
     */
    var _stopAppendRecursion = false;

    /**
     * When tabsheaderitem is added/moved add corresponding tabscontentitem.
     *
     * @param {Object} e
     * @param {Object} o
     * @param {Void}
     */
    OP3.bind("elementappend::tabsheaderitem", function(e, o) {
        var lib = $(o.parent).closest('.op3-element[data-op3-element-type="tabs"]').data("jqueryTabs");

        if (o.historyPending) {
            return lib.refresh();
        }

        if (_stopAppendRecursion)
            return;

        _stopAppendRecursion = true;

        var $element = $(o.node);
        var $linked = $element.data("tab-item-link");
        var index = $element.index();
        var $tabsContentItems = $(o.parent)
            .closest('.op3-element[data-op3-element-type="tabs"]')
            .find('.op3-element[data-op3-element-type="tabscontentitem"]');

        // Move corresponding tabscontentitem to index
        if ($linked) {
            var $destination = $tabsContentItems.eq(index);
            var method = index > $linked.index() ? 'insertAfter' : 'insertBefore';
            OP3.$($linked)[method]($destination);
        // Create new corresponding tabscontentitem at index
        } else {
            var $destination = $tabsContentItems.eq(index - 1);
            OP3.$("<_tabscontentitem_template />").insertAfter($destination);
        }

        _stopAppendRecursion = false;
        lib.refresh();
        lib.active(index);
        OP3.$(o.node).focus();
    });

    /**
     * When tabscontentitem is added/moved add corresponding tabsheaderitem.
     *
     * @param {Object} e
     * @param {Object} o
     * @param {Void}
     */
    OP3.bind("elementappend::tabscontentitem", function(e, o) {
        var lib = $(o.parent).closest('.op3-element[data-op3-element-type="tabs"]').data("jqueryTabs");

        if (o.historyPending) {
            return lib.refresh();
        }

        if (_stopAppendRecursion)
            return;

        _stopAppendRecursion = true;

        var $element = $(o.node);
        var $linked = $element.data("tab-item-link");
        var index = $element.index();
        var $tabsHeaderItems = $(o.parent)
            .closest('.op3-element[data-op3-element-type="tabs"]')
            .find('.op3-element[data-op3-element-type="tabsheaderitem"]');

        // Move corresponding tabsheaderitem to index
        if ($linked) {
            var $destination = $tabsHeaderItems.eq(index);
            var method = index > $linked.index() ? 'insertAfter' : 'insertBefore';
            OP3.$($linked)[method]($destination);
        // Create new corresponding tabsheaderitem at index
        } else {
            var $destination = $tabsHeaderItems.eq(index - 1);
            OP3.$("<_tabsheaderitem_template />").insertAfter($destination);
        }

        _stopAppendRecursion = false;
        lib.refresh();
    });

    /**
     * Sync children non css properties
     * (those that are stored as an attribute)
     *
     * @param {Object} e
     * @param {Object} o
     * @param {Void}
     */
      OP3.bind("elementchanging::tabs::blockDisplayMedia elementchanging::tabs::blockLayoutDesktop elementchanging::tabs::blockLayoutTablet elementchanging::tabs::blockLayoutMobile elementchanging::tabs::iconShape elementchanging::tabs::iconFrame elementchanging::tabs::op3Icon", function(e, o) {
        var allowed = [
            'tabsheaderitemBlockDisplayMedia',
            'tabsheaderitemBlockLayoutDesktop',
            'tabsheaderitemBlockLayoutTablet',
            'tabsheaderitemBlockLayoutMobile',
            'iconIconFrame',
            'iconIconShape',
            'iconOp3Icon',
            'tabsheaderFieldLayoutDesktop',
            'tabsheaderFieldLayoutTablet',
            'tabsheaderFieldLayoutMobile',
        ];

        if (allowed.indexOf(o.id) === -1)
            return;

        // child property
        var selector = o.id.match(/^[a-z]+/)[0],
            key = o.id
                .replace(new RegExp("^" + selector, "g"), "")
                .replace(/^\w/, function(match) {
                    return match.toLowerCase();
                });

        // find element children and simulate linked-properties
        OP3.$(o.node)
            .find(selector)
            .each(function() {
                var child = OP3.$(this),
                    link = child.getOption("linkProperties", "all");
                child
                    .setOption("linkProperties", "0", "all")
                    .setOption(key, o.value.after, o.media)
                    .setOption("linkProperties", link, "all");
            });

        // prevent default
        return false;
    });

})(jQuery, window, document);
