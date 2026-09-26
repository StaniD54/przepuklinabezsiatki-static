/**
 * OptimizePress3 element type:
 * op3 element type descriptionlistitem manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - elements/default/js/op3-element.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.DescriptionListItem = OP3.defineClass({

        Name: "OP3.Element.DescriptionListItem",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "descriptionlistitem",

            _props: function() {
                return [
                    // Toolbar: Key Text Options
                    [ OP3.Elements._extension.prop.FontSize ],
                    [ OP3.Elements._extension.prop.FontWeight ],
                    [ OP3.Elements._extension.prop.FontFamily ],
                    [ OP3.Elements._extension.prop.FontStyle ],
                    [ OP3.Elements._extension.prop.LineHeight ],
                    [ OP3.Elements._extension.prop.LetterSpacing ],
                    [ OP3.Elements._extension.prop.TextTransform ],
                    [ OP3.Elements._extension.prop.TextDecoration ],

                    // Toolbar: Value Text Options
                    [ OP3.Elements._extension.prop.FontSize, { id: "valueFontSize", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "valueFontWeight", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "valueFontFamily", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "valueFontStyle", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "valueLineHeight", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "valueLetterSpacing", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "valueTextTransform", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "valueTextDecoration", selector: " .op3-descriptionlistitem-value" } ],

                    // Toolbar: Colour Options
                    [ OP3.Elements._extension.prop.Color ],
                    [ OP3.Elements._extension.prop.Color, { id: "valueColor", selector: " .op3-descriptionlistitem-value" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { selector: " [data-op3-border]" } ],

                    // Toolbar: Borders
                    [ OP3.Elements._extension.prop.BorderStyle ],
                    [ OP3.Elements._extension.prop.BorderColor ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " > [data-op3-element-container], > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],

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
                    [ OP3.Elements._extension.prop.Html, { selector: " .op3-descriptionlistitem-key [data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.Html2, { selector: " .op3-descriptionlistitem-value [data-op3-contenteditable]" } ],
                ];
            },
        },

    });

})(jQuery, window, document);
