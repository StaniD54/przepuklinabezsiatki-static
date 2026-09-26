/**
 * OptimizePress3 element type:
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.SocialSharingItem = OP3.defineClass({

        Name: "OP3.Element.SocialSharingItem",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "socialsharingitem",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Width, { attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "150", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ], defaultUnit: "px", }],

                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-link, .op3-icon" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconFontSize", selector: " .op3-icon", label: OP3._("Icon Size"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "200", "data-step-px": "1", "data-precision-px": "0", }, units: ["px"], }],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "iconDirection", selector: " .op3-link", label: OP3._("Icon Position"), options: [ { "row": "Left" }, { "row-reverse": "Right" } ], attr: { "data-property-type": "select-buttons" } } ],
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: " .op3-icon", label: OP3._("Icon Colour") } ],
                    [ OP3.Elements._extension.prop.Width, { id: "iconSpacing", selector: " .op3-divider", label: OP3._("Icon Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "150", "data-step-px": "1", "data-precision-px": "0", }, units: [ "px" ], defaultUnit: "px", }],
                    [ OP3.Elements._extension.prop.IconFrame, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.IconShape, { selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.Padding, { id: "iconPadding", label: OP3._("Icon Padding"), selector: " .op3-icon-container", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0", }, }],
                    [ OP3.Elements._extension.prop.BorderWidth, { id: "iconBorderWidth", selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "iconBackgroundColor", selector: " .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.BorderColor, { id: "iconBorderColor", selector: " .op3-icon-container" } ],

                    [ OP3.Elements._extension.prop.FontFamily, { selector: " .op3-text p, .op3-count" } ],
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-text, .op3-count" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " .op3-text p, .op3-count", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { selector: " .op3-text p, .op3-count", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " .op3-text, .op3-count" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " .op3-text p, .op3-count" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " .op3-text, .op3-count" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " .op3-text, .op3-count" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " .op3-text, .op3-count" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "textMarginLeft", selector: " .op3-text, .op3-count" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "textMarginRight", selector: " .op3-text, .op3-count" } ],

                    [ OP3.Elements._extension.prop.Href, { selector: " .op3-link", } ],
                    [ OP3.Elements._extension.prop.Target, { selector: " .op3-link", label: OP3._("Link Target") } ],
                    [ OP3.Elements._extension.prop.RelNoFollow, { selector: " .op3-link", serialize: false } ],
                    [ OP3.Elements._extension.prop.RelNoFollowFull, { selector: " .op3-link" } ],

                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > a" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > a" } ],

                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > a" } ],
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
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " .op3-link" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " .op3-link" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " .op3-link" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " .op3-link" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " .op3-link" } ],

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.Html, { selector: ' .op3-text' } ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ', .op3-text, .op3-icon, .op3-count, [data-op3-background], [data-op3-border], > a' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ':hover [data-op3-background="overlay"]::before,:hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ':hover [data-op3-background="overlay"]::before,:hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorHover", selector: ":hover > a [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "borderTopLeftRadiusHover", selector: ":hover > a" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "borderTopRightRadiusHover", selector: ":hover > a" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "borderBottomRightRadiusHover", selector: ":hover > a" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "borderBottomLeftRadiusHover", selector: ":hover > a" } ],

                    [ OP3.Elements._extension.prop.Color, { id: "iconColorHover", selector: ":hover .op3-icon", label: OP3._("Icon Colour") } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textColorHover", selector: ":hover .op3-text, :hover .op3-count", label: OP3._("Text Colour") } ],
                ];
            },

        },

    });

    OP3.bind("elementchange::socialsharingitem::op3Icon", function(e, o) {
        var value = o.value.after;
        var href = "";
        var text = "";

        if (value.includes("fb") || value.includes("facebook")) {
            href = "https://www.facebook.com/share.php";
            text = "Share";
        } else if (value.includes("twitter")) {
            href = "https://twitter.com/share";
            text = "Tweet";
        } else if (value.includes("pinterest")) {
            href = "https://www.pinterest.com/pin/create/button";
            text = "Pin";
        } else if (value.includes("linkedin")) {
            href = "https://www.linkedin.com/sharing/share-offsite";
            text = "Share";
        }

        var $element = OP3.$(o.node);
        $element.setOption("href", href, "all");
        $element.setOption("html", text, "all");
    });

})(jQuery, window, document);
