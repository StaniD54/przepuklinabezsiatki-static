/**
 * OptimizePress3 element type:
 * op3 element type cart manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - op3-designer.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     .
 *     .
 *     .
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Cart = OP3.defineClass({

        Name: "OP3.Element.Cart",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "cart",

            _props: function() {
                return [
                    // Toolbar: Checkout Options
                    [ OP3.Elements._extension.prop.ProductId, { selector: ' form > [name="opc_product_id[]"]', attr: { "data-property-type": "cart" } } ],
                    [ OP3.Elements._extension.prop.ProductSetupSource ],
                    [ OP3.Elements._extension.prop.CartPostAction ],
                    [ OP3.Elements._extension.prop.CartPostActionRedirectURL ],
                    [ OP3.Elements._extension.prop.CartPostActionFunnelStep ],

                    // Toolbar: Colour Options
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Toolbar: Cart Borders
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

                    // Toolbar: Cart Shadows
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Sidebar: Advanced Tab - Form Positioning
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
                    [ OP3.Elements._extension.prop.MaxWidth, { label: OP3._("Cart Width") } ],
                    [ OP3.Elements._extension.prop.MarginAlign ],

                    // Sidebar: Advanced Tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Sidebar: Advanced Tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Link Properties - Headline
                    [ OP3.Elements._extension.prop.FontFamily, { id: "titleFontFamily", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColor", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "titleFontSize", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "titleLineHeight", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "titleLetterSpacing", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeight", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyle", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransform", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecoration", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "titleTextAlign", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "titleTextShadow", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "titleBackgroundColorOverlay", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "titleMarginTop", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "titleMarginBottom", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "titleMarginLeft", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "titleMarginRight", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "titlePaddingTop", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "titlePaddingBottom", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "titlePaddingLeft", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "titlePaddingRight", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "titleMaxWidth", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "titleBorderTopWidth", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "titleBorderTopStyle", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "titleBorderTopColor", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "titleBorderRightWidth", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "titleBorderRightStyle", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "titleBorderRightColor", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "titleBorderBottomWidth", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "titleBorderBottomStyle", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "titleBorderBottomColor", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "titleBorderLeftWidth", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "titleBorderLeftStyle", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "titleBorderLeftColor", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "titleBorderTopLeftRadius", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "titleBorderTopRightRadius", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "titleBorderBottomRightRadius", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "titleBorderBottomLeftRadius", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] .op3-headline-wrapper' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "titleDisplayDeviceVisibility", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "titleTransitionDuration", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "titleColorHover", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "titleFontWeightHover", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "titleFontStyleHover", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "titleTextTransformHover", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "titleTextDecorationHover", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"]:hover [data-op3-contenteditable] > h6' } ],
                    [ OP3.Elements._extension.prop.Tag, { id: "titleTag", selector: ' form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h1, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h2, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h3, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h4, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h5, form > [data-op3-children] > .op3-element[data-op3-element-type="headline"] [data-op3-contenteditable] > h6' } ],

                    // Link Element - Button
                    [ OP3.Elements._extension.prop.Color, { id: "buttonColor", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { id: "buttonMaxWidth", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.Height, { id: "buttonHeight", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "buttonBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "buttonBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="button"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "buttonFontFamily", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonFontSize", selector: ' .op3-element[data-op3-element-type="button"] > a .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "buttonLineHeight", selector: ' .op3-element[data-op3-element-type="button"] > a .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "buttonLetterSpacing", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "buttonFontWeight", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "buttonFontStyle", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "buttonTextTransform", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "buttonTextDecoration", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.AlignItems, { id: "buttonButtonAlignText", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "buttonButtonTextAlign", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonSubtextDisplay", selector: ' .op3-element[data-op3-element-type="button"] .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "buttonFontWeightSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "buttonFontStyleSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "buttonTextTransformSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "buttonTextDecorationSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonFontSizeSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "buttonLetterSpacingSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonOffsetXSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "buttonOffsetYSubtext", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-subtext' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonDisplay", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon, .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-divider' } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { id: "buttonOp3Icon", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonIconColor", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "buttonIconSize", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "buttonIconDirection", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "buttonIconSpacing", selector: ' .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-divider' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "buttonBorderTopWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "buttonBorderTopStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "buttonBorderTopColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "buttonBorderRightWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "buttonBorderRightStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "buttonBorderRightColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "buttonBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "buttonBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "buttonBorderBottomColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "buttonBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "buttonBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "buttonBorderLeftColor", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "buttonBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "buttonBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "buttonBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "buttonBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadow", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadowInset", selector: ' .op3-element[data-op3-element-type="button"] > a [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "buttonTextShadow", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "buttonMarginTop", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "buttonMarginBottom", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonMarginLeft", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "buttonMarginRight", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "buttonPaddingTop", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "buttonPaddingBottom", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "buttonPaddingLeft", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "buttonPaddingRight", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "buttonHorizontalSpacingLeft", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "buttonHorizontalSpacingRight", selector: ' .op3-element[data-op3-element-type="button"] > a' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "buttonDisplayDeviceVisibility", selector: ' .op3-element[data-op3-element-type="button"]' } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "buttonTransitionDuration", selector: ' .op3-element[data-op3-element-type="button"] > a, .op3-element[data-op3-element-type="button"] > a > .op3-text-container > .op3-icon' } ],
                    [ OP3.Elements._extension.prop.Filter, { id: "buttonFilterHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonColorHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "buttonIconColorHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover > .op3-text-container > i' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "buttonBackgroundImageOverlayHover", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "buttonBackgroundColorOverlayHover", selector: ' .op3-element[data-op3-element-type="button"] [data-op3-background][data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "buttonBorderTopWidthHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "buttonBorderTopStyleHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "buttonBorderTopColorHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "buttonBorderRightWidthHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "buttonBorderRightStyleHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "buttonBorderRightColorHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "buttonBorderBottomWidthHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "buttonBorderBottomStyleHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "buttonBorderBottomColorHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "buttonBorderLeftWidthHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "buttonBorderLeftStyleHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "buttonBorderLeftColorHover" , selector: ' .op3-element[data-op3-element-type="button"] > a:hover [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "buttonBorderTopLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "buttonBorderTopRightRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "buttonBorderBottomRightRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "buttonBorderBottomLeftRadiusHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "buttonBoxShadowHover", selector: ' .op3-element[data-op3-element-type="button"] > a:hover' } ],

                    // Link Element - FormSection
                    [ OP3.Elements._extension.prop.MarginTop, { id: "formsectionMarginTop", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionMarginBottom", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "formsectionMarginLeft", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "formsectionMarginRight", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "formsectionPaddingTop", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "formsectionPaddingBottom", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "formsectionPaddingLeft", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "formsectionPaddingRight", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.Width, { id: "formsectionWidth", selector: ' .op3-element[data-op3-element-type="formsection"] ', }],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "formsectionGridGapGridMarginTop", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "formsectionGridGapGridMarginRight", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionGridGapGridMarginBottom", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "formsectionGridGapGridMarginLeft", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "formsectionGridGapGridPaddingTop", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "formsectionGridGapGridPaddingLeft", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children]', }],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "formsectionGridGapGridCellBorderRight", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children] > .op3-element', }],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "formsectionGridGapGridCellBorderBottom", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-children] > .op3-element', }],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "formsectionBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after', }],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "formsectionBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after', }],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "formsectionBorderTopWidth", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "formsectionBorderTopStyle", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "formsectionBorderTopColor", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "formsectionBorderRightWidth", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "formsectionBorderRightStyle", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "formsectionBorderRightColor", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "formsectionBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "formsectionBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "formsectionBorderBottomColor", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "formsectionBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "formsectionBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "formsectionBorderLeftColor", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "formsectionBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "formsectionBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "formsectionBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "formsectionBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "formsectionBoxShadow", selector: ' .op3-element[data-op3-element-type="formsection"] > [data-op3-element-container] > [data-op3-border]', }],

                    // Link Element - FormSection/Input
                    [ OP3.Elements._extension.prop.Display, { id: "formsectionInputLabelDisplay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionInputLabelSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "formsectionInputIconDisplay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionInputIconFontSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "formsectionInputIconFlexDirection", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "formsectionInputIconSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "formsectionInputFontFamily", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionInputFontSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "formsectionInputFontWeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "formsectionInputFontStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "formsectionInputLineHeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "formsectionInputLetterSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "formsectionInputTextTransform", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "formsectionInputTextDecoration", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "formsectionInputFieldFontFamily", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionInputFieldFontSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "formsectionInputFieldFontWeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "formsectionInputFieldFontStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "formsectionInputFieldLineHeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "formsectionInputFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "formsectionInputFieldTextTransform", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionInputColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionInputFieldColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionInputPlaceholderColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text::placeholder' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionInputIconColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "formsectionInputBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "formsectionInputBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "formsectionInputBorderTopWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "formsectionInputBorderTopStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "formsectionInputBorderTopColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "formsectionInputBorderRightWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "formsectionInputBorderRightStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "formsectionInputBorderRightColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "formsectionInputBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "formsectionInputBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "formsectionInputBorderBottomColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "formsectionInputBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "formsectionInputBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "formsectionInputBorderLeftColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "formsectionInputBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "formsectionInputBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "formsectionInputBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "formsectionInputBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "formsectionInputBoxShadow", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "formsectionInputWidth", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "formsectionInputMarginTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionInputMarginBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "formsectionInputMarginLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "formsectionInputMarginRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "formsectionInputPaddingTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "formsectionInputPaddingBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "formsectionInputPaddingLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "formsectionInputPaddingRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "formsectionInputInputMarginTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionInputInputMarginBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "formsectionInputInputMarginLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "formsectionInputInputMarginRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "formsectionInputInputPaddingTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "formsectionInputInputPaddingBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "formsectionInputInputPaddingLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "formsectionInputInputPaddingRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],

                    // Link Element - FormSection/Select
                    [ OP3.Elements._extension.prop.Display, { id: "formsectionSelectLabelDisplay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionSelectLabelSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "formsectionSelectFontFamily", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionSelectFontSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "formsectionSelectFontWeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "formsectionSelectFontStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "formsectionSelectLineHeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "formsectionSelectLetterSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "formsectionSelectTextTransform", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "formsectionSelectTextDecoration", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "formsectionSelectFieldFontFamily", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionSelectFieldFontSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "formsectionSelectFieldFontWeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "formsectionSelectFieldFontStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "formsectionSelectFieldLineHeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.Height, { id: "formsectionSelectFieldHeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "formsectionSelectFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "formsectionSelectFieldTextTransform", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionSelectColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionSelectFieldColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .select2-selection__placeholder, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .select2-selection ' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "formsectionSelectBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "formsectionSelectBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "formsectionSelectBorderTopWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "formsectionSelectBorderTopStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "formsectionSelectBorderTopColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "formsectionSelectBorderRightWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "formsectionSelectBorderRightStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "formsectionSelectBorderRightColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "formsectionSelectBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "formsectionSelectBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "formsectionSelectBorderBottomColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "formsectionSelectBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "formsectionSelectBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "formsectionSelectBorderLeftColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "formsectionSelectBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "formsectionSelectBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "formsectionSelectBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "formsectionSelectBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "formsectionSelectBoxShadow", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "formsectionSelectWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "formsectionSelectMarginTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionSelectMarginBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "formsectionSelectMarginLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "formsectionSelectMarginRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "formsectionSelectPaddingTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "formsectionSelectPaddingBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "formsectionSelectPaddingLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "formsectionSelectPaddingRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "formsectionSelectSelectMarginTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionSelectSelectMarginBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "formsectionSelectSelectMarginLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "formsectionSelectSelectMarginRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "formsectionSelectSelectPaddingTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "formsectionSelectSelectPaddingBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "formsectionSelectSelectPaddingLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "formsectionSelectSelectPaddingRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],

                    // Link Element - FormSection/Checkbox
                    [ OP3.Elements._extension.prop.Display, { id: "formsectionCheckboxIconDisplay", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionCheckboxIconFontSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.Width, { id: "formsectionCheckboxIconSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "formsectionCheckboxLabelSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label-spacing' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "formsectionCheckboxFontFamily", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionCheckboxFontSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "formsectionCheckboxFontWeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "formsectionCheckboxFontStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "formsectionCheckboxLineHeight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "formsectionCheckboxLetterSpacing", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "formsectionCheckboxTextTransform", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "formsectionCheckboxTextDecoration", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "formsectionCheckboxCheckmarkSize", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "formsectionCheckboxCheckmarkBackgroundColorUnchecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "formsectionCheckboxCheckmarkBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionCheckboxCheckmarkColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "formsectionCheckboxCheckmarkBorderTopWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "formsectionCheckboxCheckmarkBorderTopStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "formsectionCheckboxCheckmarkBorderTopColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "formsectionCheckboxCheckmarkBorderRightWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "formsectionCheckboxCheckmarkBorderRightStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "formsectionCheckboxCheckmarkBorderRightColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "formsectionCheckboxCheckmarkBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "formsectionCheckboxCheckmarkBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "formsectionCheckboxCheckmarkBorderBottomColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "formsectionCheckboxCheckmarkBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "formsectionCheckboxCheckmarkBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "formsectionCheckboxCheckmarkBorderLeftColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "formsectionCheckboxCheckmarkBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "formsectionCheckboxCheckmarkBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "formsectionCheckboxCheckmarkBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "formsectionCheckboxCheckmarkBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "formsectionCheckboxCheckmarkBorderTopWidthChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "formsectionCheckboxCheckmarkBorderTopStyleChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "formsectionCheckboxCheckmarkBorderTopColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "formsectionCheckboxCheckmarkBorderRightWidthChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "formsectionCheckboxCheckmarkBorderRightStyleChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "formsectionCheckboxCheckmarkBorderRightColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "formsectionCheckboxCheckmarkBorderBottomWidthChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "formsectionCheckboxCheckmarkBorderBottomStyleChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "formsectionCheckboxCheckmarkBorderBottomColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "formsectionCheckboxCheckmarkBorderLeftWidthChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "formsectionCheckboxCheckmarkBorderLeftStyleChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "formsectionCheckboxCheckmarkBorderLeftColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "formsectionCheckboxCheckmarkBorderTopLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "formsectionCheckboxCheckmarkBorderTopRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "formsectionCheckboxCheckmarkBorderBottomRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "formsectionCheckboxCheckmarkBorderBottomLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "formsectionCheckboxBackgroundColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-background]::before, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-background]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "formsectionCheckboxBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-background][data-op3-background="checked"]::before, .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-background][data-op3-background="checked"]::after' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionCheckboxColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionCheckboxColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] label input:checked ~ .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionCheckboxIconColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] label .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "formsectionCheckboxIconColorChecked", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] label input:checked ~ .op3-element-checkbox-content .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "formsectionCheckboxMarginTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "formsectionCheckboxMarginBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "formsectionCheckboxMarginLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "formsectionCheckboxMarginRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "formsectionCheckboxPaddingTop", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "formsectionCheckboxPaddingBottom", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "formsectionCheckboxPaddingLeft", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "formsectionCheckboxPaddingRight", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "formsectionCheckboxWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "formsectionCheckboxBorderTopWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "formsectionCheckboxBorderTopStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "formsectionCheckboxBorderTopColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "formsectionCheckboxBorderRightWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "formsectionCheckboxBorderRightStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "formsectionCheckboxBorderRightColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "formsectionCheckboxBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "formsectionCheckboxBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "formsectionCheckboxBorderBottomColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "formsectionCheckboxBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "formsectionCheckboxBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "formsectionCheckboxBorderLeftColor", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "formsectionCheckboxBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "formsectionCheckboxBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "formsectionCheckboxBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "formsectionCheckboxBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "formsectionCheckboxBoxShadow", selector: ' .op3-element[data-op3-element-type="formsection"] .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                ];
            },

        },

    });

    // Open cart wizard on element drop
    OP3.bind("elementdrop::cart", function(e, o) {
        if (typeof o.source !== "string" || !o.source.match(/^<_cart_template\W/))
            return;

        OP3.once("elementfocus::cart", function() {
            OP3.Cart.openWizard();
        });
    });

    // Set form elements readonly in LiveEditor
    OP3.bind("ready elementappend cartreset", function(e, o) {
        var parent = "cart",
            children = "input,checkbox,select,textarea",
            element = OP3.$(null);
        if (o && o.node)
            element = OP3.$(o.node);
        else
            element = OP3.$(parent);
        if (element.type() !== parent)
            element = element.find(parent);

        element
            .find(children)
                .jq()
                .find(children)
                    .attr("readonly", "readonly")
                    .attr("autocomplete", "off")
                    .attr("z-index", "-1")
                    .css("pointer-events", "none");
    });

    // Set summary values readonly in LiveEditor
    OP3.bind("ready elementappend cartreset", function(e, o) {
        var parent = "cart",
            children = '.op3-element[data-op3-element-type="descriptionlistitem"] .op3-descriptionlistitem-value [data-op3-contenteditable]',
            element = OP3.$(null);
        if (o && o.node)
            element = OP3.$(o.node);
        else
            element = OP3.$(parent);
        if (element.type() !== parent)
            element = element.find(parent);

        // no need to edit values (default is $0.00
        // and will be handled by opc plugin on
        // frontend)
        element
            .jq()
            .find(children)
            .each(function() {
               if (this.ice)
                    this.ice.destroy();
            });
    });

    // fix select node line-height issue
    OP3.bind("elementchange::cart::height", function(e, o) {
        if (o.id !== "formsectionSelectFieldHeight")
            return;

        OP3.$(o.node).setOption("formsectionSelectFieldLineHeight", o.value.after, o.media);
    });

    // sync colors
    OP3.bind("elementchange::cart", function(e, o) {
        var sync = [
            "formsectionCheckboxBackgroundColor",
            "formsectionCheckboxColor",
            "formsectionCheckboxIconColor",
            "formsectionCheckboxCheckmarkBorderTopWidth",
            "formsectionCheckboxCheckmarkBorderTopStyle",
            "formsectionCheckboxCheckmarkBorderTopColor",
            "formsectionCheckboxCheckmarkBorderRightWidth",
            "formsectionCheckboxCheckmarkBorderRightStyle",
            "formsectionCheckboxCheckmarkBorderRightColor",
            "formsectionCheckboxCheckmarkBorderBottomWidth",
            "formsectionCheckboxCheckmarkBorderBottomStyle",
            "formsectionCheckboxCheckmarkBorderBottomColor",
            "formsectionCheckboxCheckmarkBorderLeftWidth",
            "formsectionCheckboxCheckmarkBorderLeftStyle",
            "formsectionCheckboxCheckmarkBorderLeftColor",
            "formsectionCheckboxCheckmarkBorderTopLeftRadius",
            "formsectionCheckboxCheckmarkBorderTopRightRadius",
            "formsectionCheckboxCheckmarkBorderBottomRightRadius",
            "formsectionCheckboxCheckmarkBorderBottomLeftRadius",
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
            .replace(/^formsectionCheckbox(\w)/, function(match, group) {
                return group.toLowerCase();
            })
            + "Checked";
        prop = [ prop ];

        // label color changes icon color as well
        if (o.id === "formsectionCheckboxColor")
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

    // sync placeholderColor on fieldColor change
    OP3.bind("elementchange::cart::color", function(e, o) {
        if (o.id !== "formsectionInputFieldColor")
            return;

        var element = OP3.$(OP3.Designer.activeElement());
        if (!element.is("input") || !element.closest(o.node).length)
            return;
        if (OP3.$(o.node).getOption("formfieldInputPlaceholderColor", o.media))
            return;

        OP3.transmit("elementoptionssyncrequest", { property: [ "placeholderColor" ] });
    });

})(jQuery, window, document);
