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
    OP3.Elements._extension.type.TabsHeader = OP3.defineClass({

        Name: "OP3.Element.TabsHeader",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "tabsheader",

            _props: function() {
                return [
                    // Toolbar - Colour - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],

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

                    // Toolbar - Alignment
                    [ OP3.Elements._extension.prop.FieldLayoutDesktop, { label: OP3._("Layout"), selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.FieldLayoutTablet, { label: OP3._("Layout"), selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.FieldLayoutMobile, { label: OP3._("Layout"), selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Alignment"), selector: " > [data-op3-element-container] > [data-op3-children]" } ],
                    [ OP3.Elements._extension.prop.AlignItems, { label: OP3._("Alignment"), selector: " > [data-op3-element-container] > [data-op3-children]" } ],

                    // Toolbar - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Toolbar - Advanced
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Tabs Header Item Gutter"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-10", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px", ], defaultUnit: "px", serialize: false }],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", label: OP3._("Gutter Left"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="tabsheaderitem"]', }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", label: OP3._("Gutter Right"), selector: ' > [data-op3-element-container] > [data-op3-children] > [data-op3-element-type="tabsheaderitem"]', }],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterAdjustLeft", label: OP3._("Gutter Adjust Left"), selector: ' > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterAdjustRight", label: OP3._("Gutter Adjust Right"), selector: ' > [data-op3-element-container] > [data-op3-children]', }],

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

                    // Sidebar - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Sidebar - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],

                    // Sidebar - Hover - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]" } ],

                    // Hover Tab - Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBaseHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBaseHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBaseHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseHoverStopPosition" } ],

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

                    // Sidebar - Hover - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetX, { id: "boxShadowHoverOffsetX"} ],
                    [ OP3.Elements._extension.prop.BoxShadowOffsetY, { id: "boxShadowHoverOffsetY"} ],
                    //[ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle"} ],
                    //[ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance"} ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur"} ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread"} ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor"} ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset, { id: "boxShadowHoverInset"} ],
                ];
            },

        },

    });

})(jQuery, window, document);
