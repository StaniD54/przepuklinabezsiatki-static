/**
 * OptimizePress3 element type:
 * op3 element type text-editor manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 *     - properties/default/js/op3-property.js
 *     - properties/html/js/op3-property.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Text = OP3.defineClass({

        Name: "OP3.Element.Text",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "text",

            _props: function() {
                return [
                    // Style tab - Typography
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],
                    [ OP3.Elements._extension.prop.Color, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],

                    [ OP3.Elements._extension.prop.FontSize, {
                        selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "72",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                            "data-avoid-text-max": "1"
                        },
                    }],
                    [ OP3.Elements._extension.prop.LineHeight, {
                        selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul",
                        attr: {
                            "data-property-type": "range",
                            "data-units": "em",
                            "data-min-em": "0.5",
                            "data-max-em": "5",
                            "data-step-em": "0.001",
                            "data-precision-em": "0.001",
                            "data-avoid-text-max": "1"
                        },
                    }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { selector: " [data-op3-contenteditable] > h1, [data-op3-contenteditable] > h2, [data-op3-contenteditable] > h3, [data-op3-contenteditable] > h4, [data-op3-contenteditable] > h5, [data-op3-contenteditable] > h6, [data-op3-contenteditable] > p, [data-op3-contenteditable] > pre, [data-op3-contenteditable] > blockquote, [data-op3-contenteditable] > ol, [data-op3-contenteditable] > ul" } ],

                    [ OP3.Elements._extension.prop.MarginTop, { id: "paragraphMarginTop", selector: " [data-op3-contenteditable] > p:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "paragraphMarginBottom", selector: " [data-op3-contenteditable] > p:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginVertical, { id: "paragraphMarginVertical", label: OP3._("Line Spacing (Paragraph)") } ],

                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: " .op3-text-wrapper", label: OP3._("Background Color") } ],

                    // Advanced Tab - Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Advanced Tab - Borders
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-text-wrapper" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-text-wrapper" } ],

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
                    [ OP3.Elements._extension.prop.Html ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ":hover [data-op3-contenteditable] > h1,:hover [data-op3-contenteditable] > h2,:hover [data-op3-contenteditable] > h3,:hover [data-op3-contenteditable] > h4,:hover [data-op3-contenteditable] > h5,:hover [data-op3-contenteditable] > h6,:hover [data-op3-contenteditable] > p,:hover [data-op3-contenteditable] > pre,:hover [data-op3-contenteditable] > blockquote,:hover [data-op3-contenteditable] > ol,:hover [data-op3-contenteditable] > ul" } ],

                    // Hover Tab - Typography
                    [ OP3.Elements._extension.prop.Color, { selector: ":hover [data-op3-contenteditable] > h1,:hover [data-op3-contenteditable] > h2,:hover [data-op3-contenteditable] > h3,:hover [data-op3-contenteditable] > h4,:hover [data-op3-contenteditable] > h5,:hover [data-op3-contenteditable] > h6,:hover [data-op3-contenteditable] > p,:hover [data-op3-contenteditable] > pre,:hover [data-op3-contenteditable] > blockquote,:hover [data-op3-contenteditable] > ol,:hover [data-op3-contenteditable] > ul", id: "colorHover" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: ":hover [data-op3-contenteditable] > h1,:hover [data-op3-contenteditable] > h2,:hover [data-op3-contenteditable] > h3,:hover [data-op3-contenteditable] > h4,:hover [data-op3-contenteditable] > h5,:hover [data-op3-contenteditable] > h6,:hover [data-op3-contenteditable] > p,:hover [data-op3-contenteditable] > pre,:hover [data-op3-contenteditable] > blockquote,:hover [data-op3-contenteditable] > ol,:hover [data-op3-contenteditable] > ul", id: "fontWeightHover" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: ":hover [data-op3-contenteditable] > h1,:hover [data-op3-contenteditable] > h2,:hover [data-op3-contenteditable] > h3,:hover [data-op3-contenteditable] > h4,:hover [data-op3-contenteditable] > h5,:hover [data-op3-contenteditable] > h6,:hover [data-op3-contenteditable] > p,:hover [data-op3-contenteditable] > pre,:hover [data-op3-contenteditable] > blockquote,:hover [data-op3-contenteditable] > ol,:hover [data-op3-contenteditable] > ul", id: "fontStyleHover" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: ":hover [data-op3-contenteditable] > h1,:hover [data-op3-contenteditable] > h2,:hover [data-op3-contenteditable] > h3,:hover [data-op3-contenteditable] > h4,:hover [data-op3-contenteditable] > h5,:hover [data-op3-contenteditable] > h6,:hover [data-op3-contenteditable] > p,:hover [data-op3-contenteditable] > pre,:hover [data-op3-contenteditable] > blockquote,:hover [data-op3-contenteditable] > ol,:hover [data-op3-contenteditable] > ul", id: "textTransformHover" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: ":hover [data-op3-contenteditable] > h1,:hover [data-op3-contenteditable] > h2,:hover [data-op3-contenteditable] > h3,:hover [data-op3-contenteditable] > h4,:hover [data-op3-contenteditable] > h5,:hover [data-op3-contenteditable] > h6,:hover [data-op3-contenteditable] > p,:hover [data-op3-contenteditable] > pre,:hover [data-op3-contenteditable] > blockquote,:hover [data-op3-contenteditable] > ol,:hover [data-op3-contenteditable] > ul", id: "textDecorationHover" } ],
                ];
            },

        },

    });

})(jQuery, window, document);
