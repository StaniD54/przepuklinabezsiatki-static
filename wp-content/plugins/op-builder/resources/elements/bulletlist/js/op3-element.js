/**
 * OptimizePress3 element type:
 * op3 element type bulletlist manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/color/js/op3-property.js
 *     - properties/height/js/op3-property.js
 *     - properties/opacity/js/op3-property.js
 *     - properties/text/js/op3-property-align.js
 *     - properties/transform-flip/js/op3-property.js
 *     - properties/transform-rotate/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.BulletList = OP3.defineClass({

        Name: "OP3.Element.BulletList",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "bulletlist",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.Action, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.Href, { selector: " a", serialize: false } ],
                    [ OP3.Elements._extension.prop.HrefFull, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.SelectMediaFile ],
                    [ OP3.Elements._extension.prop.Target, { selector: " a", label: OP3._("Link Target") } ],
                    [ OP3.Elements._extension.prop.RelNoFollow, { selector: " a", serialize: false } ],
                    [ OP3.Elements._extension.prop.RelNoFollowFull, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.PopOverlayTrigger, { selector: " a" } ],
                    [ OP3.Elements._extension.prop.CreateVideoPopoverlay ],
                    [ OP3.Elements._extension.prop.CreatePopoverlay ],
                    [ OP3.Elements._extension.prop.SelectHrefTarget ],
                    [ OP3.Elements._extension.prop.SmoothScroll ],
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Alignment"), options: [ { "normal": "Left" }, { "center": "Center" }, { "flex-end": "Right" } ] } ],

                    // Style Tab - Background
                    [ OP3.Elements._extension.prop.BackgroundColor ],

                    // Style tab - Typography
                    [ OP3.Elements._extension.prop.FontFamily ],
                    [ OP3.Elements._extension.prop.Color ],
                    [ OP3.Elements._extension.prop.FontSize, { label: OP3._("Bullet List Sizing (Media + Text)") } ],
                    [ OP3.Elements._extension.prop.LineHeight ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " [data-op3-contenteditable]" } ],

                    // Icon
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-icon", id: "iconColor", label: OP3._("Icon Colour") } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        selector: " .op3-icon, .op3-image",
                        id: "iconFontSize",
                        label: OP3._("Icon Size"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "%",
                            "data-min-percent": "0",
                            "data-max-percent": "200",
                            "data-step-percent": "1",
                            "data-precision-percent": "0",
                        },
                        units: [ "%" ],
                        defaultUnit: "%",
                    }],
                    [ OP3.Elements._extension.prop.MarginRight, {
                        label: OP3._("Icon Spacing"),
                        id: "iconSpacing",
                        selector: " .op3-icon, .op3-image",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "-20",
                            "data-max-px": "100",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                    }],
                    [ OP3.Elements._extension.prop.MarginTop, {
                        label: OP3._("Icon Vertical Position"),
                        id: "iconVerticalPosition",
                        selector: " .op3-icon, .op3-image",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "-20",
                            "data-max-px": "100",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                    }],

                    // Image
                    [ OP3.Elements._extension.prop.Src, { selector: " img", attr: { "data-property-type": "image-url-preview" } } ],
                    [ OP3.Elements._extension.prop.AttrWidth, { selector: " img" } ],
                    [ OP3.Elements._extension.prop.AttrHeight, { selector: " img" } ],
                    [ OP3.Elements._extension.prop.AttachmentId, { selector: " img" } ],

                    // Box Model
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom, {
                        label: OP3._("Bullet List Spacing"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "0",
                            "data-max-px": "150",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                        defaultUnit: "px"
                    } ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.PaddingDrag ],

                    // Border
                    [ OP3.Elements._extension.prop.BorderTopWidth ],
                    [ OP3.Elements._extension.prop.BorderTopStyle ],
                    [ OP3.Elements._extension.prop.BorderTopColor ],
                    [ OP3.Elements._extension.prop.BorderRightWidth ],
                    [ OP3.Elements._extension.prop.BorderRightStyle ],
                    [ OP3.Elements._extension.prop.BorderRightColor ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle ],
                    [ OP3.Elements._extension.prop.BorderBottomColor ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle ],
                    [ OP3.Elements._extension.prop.BorderLeftColor ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius ],

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

                    // Advanced tab - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.Html ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration ],

                    // Hover Tab - Typography
                    // [ OP3.Elements._extension.prop.Color, { selector: ":hover", id: "colorHover" } ],
                    // [ OP3.Elements._extension.prop.FontWeight, { selector: ":hover [data-op3-contenteditable]", id: "fontWeightHover" } ],
                    // [ OP3.Elements._extension.prop.FontStyle, { selector: ":hover [data-op3-contenteditable]", id: "fontStyleHover" } ],
                    // [ OP3.Elements._extension.prop.TextTransform, { selector: ":hover [data-op3-contenteditable]", id: "textTransformHover" } ],
                    // [ OP3.Elements._extension.prop.TextDecoration, { selector: ":hover [data-op3-contenteditable]", id: "textDecorationHover" } ],

                    // Hover Tab - Icon
                    [ OP3.Elements._extension.prop.Color, { selector: ":hover", id: "colorHover" } ],
                    [ OP3.Elements._extension.prop.Color, { selector: ":hover .op3-icon", id: "iconColorHover", label: OP3._("Icon Colour") } ],
                ];
            },

        },

    });

    // Set data-op3-parent-options-property-value attribute
    // (so we can hide some options with css).
    OP3.bind("elementoptionsformattach::bulletlist", function(e, o) {
        var element = OP3.$(o.node).parent();
        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-bulletblockMedia", element.getOption("bulletblockMedia", true));
    });

})(jQuery, window, document);
