/**
 * OptimizePress3 element type:
 */
; (function ($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.TabsHeaderItem = OP3.defineClass({

        Name: "OP3.Element.TabsHeaderItem",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function (arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "tabsheaderitem",

            _props: function () {
                return [
                    // Toolbar - tabsheaderitem Option
                    [ OP3.Elements._extension.prop.BlockDisplayMedia, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BlockLayoutDesktop, { label: OP3._("Layout"), selector: " [data-op3-element-container]", options: [{ "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], } ],
                    [ OP3.Elements._extension.prop.BlockLayoutTablet, { label: OP3._("Layout"), selector: " [data-op3-element-container]", options: [{ "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], } ],
                    [ OP3.Elements._extension.prop.BlockLayoutMobile, { label: OP3._("Layout"), selector: " [data-op3-element-container]", options: [{ "0": "Layout #1" }, { "1": "Layout #2" }, { "2": "Layout #3" }, { "3": "Layout #4" } ], } ],
                    [ OP3.Elements._extension.prop.Gap, { label: OP3._("Spacing"), selector: ' [data-op3-element-container]' } ],

                    // Toolbar - TabsHeaderItem - Icon
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "mediaSize", selector: " .op3-icon, .op3-image", label: OP3._("Size"), attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "200", "data-step-percent": "1", "data-precision-percent": "0", }, units: ["%"], defaultUnit: "%", } ],

                    // Toolbar - TabsHeaderItem - Image
                    [ OP3.Elements._extension.prop.Src, { selector: " img", attr: { "data-property-type": "image-url-preview" } } ],
                    [ OP3.Elements._extension.prop.AttrWidth, { selector: " img" } ],
                    [ OP3.Elements._extension.prop.AttrHeight, { selector: " img" } ],
                    [ OP3.Elements._extension.prop.AttachmentId, { selector: " img" } ],

                    // Toolbar - Typography
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.FontSize, { label: OP3._("Sizing (Media + Text)"), selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " [data-op3-contenteditable]" } ],

                    // Toolbar - Colour - Item - Active
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageActiveType", label: OP3._("Type"), options: [{ "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageActive", selector: '.jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,.jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after,.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorActive", selector: '.jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,.jquery-tabs-active > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after,.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageActiveAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageActivePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageActiveStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageActiveStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageActiveStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageActiveStopPosition" } ],

                    // Toolbar - Colour - Item - Inactive
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [{ "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],

                    // Toolbar - Colour - Item - Hover
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseHoverType", label: OP3._("Type"), options: [{ "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBaseHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBaseHover", selector: ':hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::before,:hover > [data-op3-element-container] > [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBaseHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseHoverStopPosition" } ],

                    // Toolbar - Colour - Text - Inactive
                    [ OP3.Elements._extension.prop.Color, { id: "textColor", selector: ' [data-op3-contenteditable]' } ],

                    // Toolbar - Colour - Text - Active
                    [ OP3.Elements._extension.prop.Color, { id: "textColorActive", selector: '.jquery-tabs-active [data-op3-contenteditable], .jquery-tabs-active:hover [data-op3-contenteditable]' } ],

                    // Toolbar - Colour - Text - Hover
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ':hover [data-op3-contenteditable]' } ],

                    // Toolbar - Colour - Icon - Inactive
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: ' .op3-icon' } ],

                    // Toolbar - Colour - Icon - Active
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorActive", selector: '.jquery-tabs-active .op3-icon, .jquery-tabs-active:hover .op3-icon' } ],

                    // Toolbar - Colour - Icon - Hover
                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ':hover .op3-icon' } ],

                    // Toolbar - Border - Active
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorActive", selector: ".jquery-tabs-active > [data-op3-element-container],.jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "borderTopLeftRadiusActive", selector: ".jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "borderTopRightRadiusActive", selector: ".jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "borderBottomRightRadiusActive", selector: ".jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "borderBottomLeftRadiusActive", selector: ".jquery-tabs-active > [data-op3-element-container] > [data-op3-border],.jquery-tabs-active:hover > [data-op3-element-container] > [data-op3-border]" } ],

                    // Toolbar - Border - Inactive
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

                    // Toolbar - Border - Active
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

                    // Toolbar - Shadow - Inactive
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowActive", selector: ".jquery-tabs-active > [data-op3-element-container] > [data-op3-border],:hover > [data-op3-element-container] > [data-op3-border]" } ],

                    // Sidebar - Active State - Shadow Styling
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowActiveAngle" } ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowActiveDistance" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowActiveBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowActiveSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowActiveColor" } ],

                    // Toolbar - Shadow - Inactive
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],

                    // Sidebar - Normal State - Shadow Styling
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],

                    // Toolbar - Shadow - Hover
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover > [data-op3-element-container] > [data-op3-border]" } ],

                    // Sidebar - Hover State - Shadow Styling
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor" } ],

                    // Toolbar - Advanced
                    [ OP3.Elements._extension.prop.Gutter, { label: OP3._("Tabs Header Item Gutter"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "-10", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px", ], defaultUnit: "px", serialize: false } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Text Align") } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { label: OP3._("Width"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "300", "data-step-px": "1", "data-precision-px": "0", }, units: ["px"], } ],

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
                    [ OP3.Elements._extension.prop.Html ],

                    // Sidebar - Hover - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]" } ],
                ];
            },

        },

    });

    /**
     * tabsheaderitem elementoptionsformattach event handler
     *
     *  @param {Object} e
     *  @param {Object} o
     *  @param {Void}
     */
    OP3.bind("elementoptionsformattach::tabsheaderitem", function (e, o) {
        var element = OP3.$(o.node);

        // Add toolbar form data attribute
        // to hide option with css
        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-blockDisplayMedia", element.getOption("blockDisplayMedia", true));
    });

    /**
     * tabsheaderitem elementoptionsformdetach event handler
     *
     *  @param {Object} e
     *  @param {Object} o
     *  @param {Void}
     */
    OP3.bind("elementoptionsformdetach::tabsheaderitem", function (e, o) {
        // Remove toolbar form data attribute
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-blockDisplayMedia");
    });

    /**
     * tabsheaderitem elementchange event handler
     *
     *  @param {Object} e
     *  @param {Object} o
     *  @param {Void}
     */
    OP3.bind("elementchange::tabsheaderitem::blockDisplayMedia", function (e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        // Update toolbar form data attribute
        // to hide option with css
        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-parent-options-property-value-" + o.name, o.value.after);
    });

})(jQuery, window, document);
