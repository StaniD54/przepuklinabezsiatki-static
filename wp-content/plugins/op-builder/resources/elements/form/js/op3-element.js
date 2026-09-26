/**
 * OptimizePress3 element type:
 * op3 element type form manipulation.
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
    OP3.Elements._extension.type.Form = OP3.defineClass({

        Name: "OP3.Element.Form",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "form",

            _props: function() {
                return [
                    // Style Tab - Optin From Integration
                    [ OP3.Elements._extension.prop.OptinIntegration ],
                    [ OP3.Elements._extension.prop.AdminEmail ],
                    [ OP3.Elements._extension.prop.OptinTag ],
                    [ OP3.Elements._extension.prop.OptinGoal ],
                    [ OP3.Elements._extension.prop.OptinList ],
                    [ OP3.Elements._extension.prop.OptinEmailSequence ],
                    [ OP3.Elements._extension.prop.OptinSequenceLevel ],
                    [ OP3.Elements._extension.prop.OptinWebhookUrl ],
                    [ OP3.Elements._extension.prop.OptinForm ],
                    [ OP3.Elements._extension.prop.OptinFormId ],
                    [ OP3.Elements._extension.prop.OptinDoubleOptin ],
                    [ OP3.Elements._extension.prop.OptinAction ],
                    [ OP3.Elements._extension.prop.OptinPostAction ],
                    [ OP3.Elements._extension.prop.OptinPostActionNotificationText ],
                    [ OP3.Elements._extension.prop.OptinPostActionRedirectURL ],
                    [ OP3.Elements._extension.prop.OptinPostActionRedirectAutofill ],
                    [ OP3.Elements._extension.prop.OptinPostActionPopOverlayTrigger ],
                    [ OP3.Elements._extension.prop.OptinPostActionFunnelStep ],
                    [ OP3.Elements._extension.prop.OptinHtml ],

                    // Advanced Tab - Form Consent Features
                    [ OP3.Elements._extension.prop.OptinGdprActivate ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent1Visible ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent1Label ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent1TagConfirmed ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent1TagDeclined ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent1TagNotShown ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent2Visible ],
                    //[ OP3.Elements._extension.prop.OptinGdprConsent2Label ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent2TagConfirmed ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent2TagDeclined ],
                    [ OP3.Elements._extension.prop.OptinGdprConsent2TagNotShown ],
                    [ OP3.Elements._extension.prop.OptinGdprFieldNote ],

                    // Style Tab - Form Fields
                    [ OP3.Elements._extension.prop.Children ],

                    // Style Tab - Form Styling
                    [ OP3.Elements._extension.prop.OptinFieldLayout ],

                    [ OP3.Elements._extension.prop.Margin, {
                        label: OP3._("Field Gap"),
                        id: "spacing",
                        selector: ' [data-op3-children] > .op3-element, [data-op3-children] > .op3-element label, [data-op3-children] > .op3-element[data-op3-element-type="button"] > a',
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "0",
                            "data-max-px": "50",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                    }],

                    // Style Tab - Form Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::before, > [data-op3-element-container] > [data-op3-border] > [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Style Tab - Form Borders & Corners
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

                    // Style Tab - From Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " > [data-op3-element-container] > [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Advanced Tab - Form Positioning
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
                    [ OP3.Elements._extension.prop.Width, { label: OP3._("Optin Form Width") } ],
                    [ OP3.Elements._extension.prop.AlignItems, { label: OP3._("Field Alignment"), selector: ' [data-op3-children]' } ],

                    // Field sizing
                    [ OP3.Elements._extension.prop.Width, { id: "fieldWidth", selector: ' [data-op3-element-type="input"], [data-op3-element-type="select"], form > [data-op3-children] > [data-op3-element-type="checkbox"], [data-op3-element-type="fieldset"]', defaultUnit: "%", } ],
                    [ OP3.Elements._extension.prop.FieldWidthDefault ],
                    [ OP3.Elements._extension.prop.FieldWidthDefault, {
                        id: "fieldWidthDefaultInline",
                        options: [
                            { "null": "Custom", disabled: true },
                            { "50%": "50% (2 Columns)" },
                            { "33.33%": "33% (3 Columns)" },
                            { "25%": "25% (4 Columns)" },
                        ]
                    }],

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

                    // Hover Tab - General
                    [ OP3.Elements._extension.prop.TransitionDuration, { selector: ", > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container] > [data-op3-border] > [data-op3-background]"} ],

                    // Link Element - Fieldset
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "fieldsetFlexDirection", selector: ' .op3-element[data-op3-element-type="fieldset"] [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.AlignItems, { id: "fieldsetAlignItems", selector: ' .op3-element[data-op3-element-type="fieldset"] [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { id: "fieldsetJustifyContent", selector: ' .op3-element[data-op3-element-type="fieldset"] [data-op3-children]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "fieldsetChildWidth", selector: ' .op3-element[data-op3-element-type="fieldset"] .op3-element' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "fieldsetLabelDisplay", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "fieldsetLabelSpacing", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "fieldsetColor", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fieldsetFontFamily", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fieldsetFontSize", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fieldsetFontWeight", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fieldsetFontStyle", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "fieldsetLineHeight", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "fieldsetLetterSpacing", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "fieldsetTextTransform", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "fieldsetTextDecoration", selector: ' .op3-element[data-op3-element-type="fieldset"] legend' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "fieldsetBorderTopWidth", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "fieldsetBorderTopStyle", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "fieldsetBorderTopColor", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "fieldsetBorderRightWidth", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "fieldsetBorderRightStyle", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "fieldsetBorderRightColor", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "fieldsetBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "fieldsetBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "fieldsetBorderBottomColor", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "fieldsetBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "fieldsetBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "fieldsetBorderLeftColor", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border], > [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "fieldsetBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "fieldsetBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "fieldsetBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "fieldsetBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "fieldsetBoxShadow", selector: ' .op3-element[data-op3-element-type="fieldset"] > [data-op3-element-container] > [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "fieldsetMarginTop", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "fieldsetMarginBottom", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "fieldsetMarginLeft", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "fieldsetMarginRight", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "fieldsetPaddingTop", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "fieldsetPaddingBottom", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "fieldsetPaddingLeft", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "fieldsetPaddingRight", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { id: "fieldsetPaddingDrag", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "fieldsetWidth", selector: ' .op3-element[data-op3-element-type="fieldset"]' } ],

                    // Link Element - Input
                    [ OP3.Elements._extension.prop.Display, { id: "inputLabelDisplay", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputLabelSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "inputIconDisplay", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon, .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputIconFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "inputIconFlexDirection", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "inputIconSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "inputFontFamily", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "inputFontWeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "inputFontStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "inputLineHeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "inputLetterSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "inputTextTransform", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "inputTextDecoration", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "inputFieldFontFamily", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "inputFieldFontSize", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "inputFieldFontWeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "inputFieldFontStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "inputFieldLineHeight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "inputFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "inputFieldTextTransform", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputFieldColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputPlaceholderColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-text::placeholder' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "inputIconColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit-icon' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "inputBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "inputBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="input"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "inputBorderTopWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "inputBorderTopStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "inputBorderTopColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "inputBorderRightWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "inputBorderRightStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "inputBorderRightColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "inputBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "inputBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "inputBorderBottomColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "inputBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "inputBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "inputBorderLeftColor", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "inputBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "inputBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "inputBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "inputBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "inputBoxShadow", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "inputWidth", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "inputMarginTop", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputMarginBottom", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "inputMarginLeft", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "inputMarginRight", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "inputPaddingTop", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "inputPaddingBottom", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "inputPaddingLeft", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "inputPaddingRight", selector: ' .op3-element[data-op3-element-type="input"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "inputInputMarginTop", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "inputInputMarginBottom", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "inputInputMarginLeft", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "inputInputMarginRight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "inputInputPaddingTop", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "inputInputPaddingBottom", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "inputInputPaddingLeft", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "inputInputPaddingRight", selector: ' .op3-element[data-op3-element-type="input"] .op3-element-input-edit' } ],

                    //Link Element - Select
                    [ OP3.Elements._extension.prop.Display, { id: "selectLabelDisplay", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "selectLabelSpacing", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "selectFontFamily", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "selectFontSize", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "selectFontWeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "selectFontStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "selectLineHeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "selectLetterSpacing", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "selectTextTransform", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "selectTextDecoration", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label > div' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "selectFieldFontFamily", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "selectFieldFontSize", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "selectFieldFontWeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "selectFieldFontStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "selectFieldLineHeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.Height, { id: "selectFieldHeight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "selectFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "selectFieldTextTransform", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "selectColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "selectFieldColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit, .op3-element[data-op3-element-type="select"] .select2-selection__placeholder, .op3-element[data-op3-element-type="select"] .select2-selection' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "selectBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "selectBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="select"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "selectBorderTopWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "selectBorderTopStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "selectBorderTopColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "selectBorderRightWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "selectBorderRightStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "selectBorderRightColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "selectBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "selectBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "selectBorderBottomColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "selectBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "selectBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-element-container], .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "selectBorderLeftColor", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "selectBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "selectBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "selectBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "selectBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "selectBoxShadow", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "selectWidth", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "selectMarginTop", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "selectMarginBottom", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "selectMarginLeft", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "selectMarginRight", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "selectPaddingTop", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "selectPaddingBottom", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "selectPaddingLeft", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "selectPaddingRight", selector: ' .op3-element[data-op3-element-type="select"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "selectSelectMarginTop", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "selectSelectMarginBottom", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "selectSelectMarginLeft", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "selectSelectMarginRight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "selectSelectPaddingTop", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "selectSelectPaddingBottom", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "selectSelectPaddingLeft", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "selectSelectPaddingRight", selector: ' .op3-element[data-op3-element-type="select"] .op3-element-select-edit' } ],

                    // Link Element - Checkbox
                    [ OP3.Elements._extension.prop.Display, { id: "checkboxIconDisplay", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkboxIconFontSize", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.Width, { id: "checkboxIconSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "checkboxLabelSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label-spacing' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "checkboxFontFamily", selector: ' .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkboxFontSize", selector: ' .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "checkboxFontWeight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "checkboxFontStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "checkboxLineHeight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "checkboxLetterSpacing", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "checkboxTextTransform", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "checkboxTextDecoration", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "checkboxCheckmarkSize", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxCheckmarkBackgroundColorUnchecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxCheckmarkBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxCheckmarkColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkboxCheckmarkBorderTopWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkboxCheckmarkBorderTopStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkboxCheckmarkBorderTopColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkboxCheckmarkBorderRightWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkboxCheckmarkBorderRightStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkboxCheckmarkBorderRightColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkboxCheckmarkBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkboxCheckmarkBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkboxCheckmarkBorderBottomColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkboxCheckmarkBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkboxCheckmarkBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkboxCheckmarkBorderLeftColor", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkboxCheckmarkBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkboxCheckmarkBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkboxCheckmarkBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkboxCheckmarkBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkboxCheckmarkBorderTopWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkboxCheckmarkBorderTopStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkboxCheckmarkBorderTopColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkboxCheckmarkBorderRightWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkboxCheckmarkBorderRightStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkboxCheckmarkBorderRightColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkboxCheckmarkBorderBottomWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkboxCheckmarkBorderBottomStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkboxCheckmarkBorderBottomColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkboxCheckmarkBorderLeftWidthChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkboxCheckmarkBorderLeftStyleChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkboxCheckmarkBorderLeftColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkboxCheckmarkBorderTopLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkboxCheckmarkBorderTopRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkboxCheckmarkBorderBottomRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkboxCheckmarkBorderBottomLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxBackgroundColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-background]::before, .op3-element[data-op3-element-type="checkbox"] [data-op3-background]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "checkboxBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-background][data-op3-background="checked"]::before, .op3-element[data-op3-element-type="checkbox"] [data-op3-background][data-op3-background="checked"]::after' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxColor", selector: ' .op3-element[data-op3-element-type="checkbox"] label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] label input:checked ~ .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxIconColor", selector: ' .op3-element[data-op3-element-type="checkbox"] label .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "checkboxIconColorChecked", selector: ' .op3-element[data-op3-element-type="checkbox"] label input:checked ~ .op3-element-checkbox-content .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "checkboxMarginTop", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "checkboxMarginBottom", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "checkboxMarginLeft", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "checkboxMarginRight", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "checkboxPaddingTop", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "checkboxPaddingBottom", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "checkboxPaddingLeft", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "checkboxPaddingRight", selector: ' .op3-element[data-op3-element-type="checkbox"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "checkboxWidth", selector: ' .op3-element[data-op3-element-type="checkbox"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "checkboxBorderTopWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "checkboxBorderTopStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "checkboxBorderTopColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "checkboxBorderRightWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "checkboxBorderRightStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "checkboxBorderRightColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "checkboxBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "checkboxBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "checkboxBorderBottomColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "checkboxBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "checkboxBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "checkboxBorderLeftColor", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "checkboxBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "checkboxBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "checkboxBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "checkboxBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "checkboxBoxShadow", selector: ' .op3-element[data-op3-element-type="checkbox"] [data-op3-element-container] [data-op3-border]' } ],

                    // Link Element - Radiobutton
                    [ OP3.Elements._extension.prop.Display, { id: "radiobuttonIconDisplay", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-icon, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "radiobuttonIconFontSize", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.Width, { id: "radiobuttonIconSpacing", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-icon-spacing' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "radiobuttonLabelSpacing", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-label-spacing' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "radiobuttonFontFamily", selector: ' .op3-element[data-op3-element-type="radiobutton"] label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "radiobuttonFontSize", selector: ' .op3-element[data-op3-element-type="radiobutton"] label' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "radiobuttonFontWeight", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "radiobuttonFontStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "radiobuttonLineHeight", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "radiobuttonLetterSpacing", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "radiobuttonTextTransform", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "radiobuttonTextDecoration", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-label' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "radiobuttonCheckmarkSize", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "radiobuttonCheckmarkBackgroundColorUnchecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "radiobuttonCheckmarkBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "radiobuttonCheckmarkColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "radiobuttonCheckmarkBorderTopWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "radiobuttonCheckmarkBorderTopStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "radiobuttonCheckmarkBorderTopColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "radiobuttonCheckmarkBorderRightWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "radiobuttonCheckmarkBorderRightStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "radiobuttonCheckmarkBorderRightColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "radiobuttonCheckmarkBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "radiobuttonCheckmarkBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "radiobuttonCheckmarkBorderBottomColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "radiobuttonCheckmarkBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "radiobuttonCheckmarkBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "radiobuttonCheckmarkBorderLeftColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "radiobuttonCheckmarkBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "radiobuttonCheckmarkBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "radiobuttonCheckmarkBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "radiobuttonCheckmarkBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .unchecked, .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "radiobuttonCheckmarkBorderTopWidthChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "radiobuttonCheckmarkBorderTopStyleChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "radiobuttonCheckmarkBorderTopColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "radiobuttonCheckmarkBorderRightWidthChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "radiobuttonCheckmarkBorderRightStyleChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "radiobuttonCheckmarkBorderRightColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "radiobuttonCheckmarkBorderBottomWidthChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "radiobuttonCheckmarkBorderBottomStyleChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "radiobuttonCheckmarkBorderBottomColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "radiobuttonCheckmarkBorderLeftWidthChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "radiobuttonCheckmarkBorderLeftStyleChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "radiobuttonCheckmarkBorderLeftColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "radiobuttonCheckmarkBorderTopLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "radiobuttonCheckmarkBorderTopRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "radiobuttonCheckmarkBorderBottomRightRadiusChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "radiobuttonCheckmarkBorderBottomLeftRadiusChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-checkmark .checked.checked' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "radiobuttonBackgroundColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-background]::before, .op3-element[data-op3-element-type="radiobutton"] [data-op3-background]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "radiobuttonBackgroundColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-background][data-op3-background="checked"]::before, .op3-element[data-op3-element-type="radiobutton"] [data-op3-background][data-op3-background="checked"]::after' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "radiobuttonColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "radiobuttonColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] label input:checked ~ .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "radiobuttonIconColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] label .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "radiobuttonIconColorChecked", selector: ' .op3-element[data-op3-element-type="radiobutton"] label input:checked ~ .op3-element-checkbox-content .op3-element-checkbox-icon' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "radiobuttonMarginTop", selector: ' .op3-element[data-op3-element-type="radiobutton"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "radiobuttonMarginBottom", selector: ' .op3-element[data-op3-element-type="radiobutton"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "radiobuttonMarginLeft", selector: ' .op3-element[data-op3-element-type="radiobutton"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "radiobuttonMarginRight", selector: ' .op3-element[data-op3-element-type="radiobutton"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "radiobuttonPaddingTop", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "radiobuttonPaddingBottom", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "radiobuttonPaddingLeft", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "radiobuttonPaddingRight", selector: ' .op3-element[data-op3-element-type="radiobutton"] .op3-element-checkbox-content' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "radiobuttonWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "radiobuttonBorderTopWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "radiobuttonBorderTopStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "radiobuttonBorderTopColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "radiobuttonBorderRightWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "radiobuttonBorderRightStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "radiobuttonBorderRightColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "radiobuttonBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "radiobuttonBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "radiobuttonBorderBottomColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "radiobuttonBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "radiobuttonBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "radiobuttonBorderLeftColor", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border], .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "radiobuttonBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "radiobuttonBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "radiobuttonBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "radiobuttonBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "radiobuttonBoxShadow", selector: ' .op3-element[data-op3-element-type="radiobutton"] [data-op3-element-container] [data-op3-border]' } ],

                    // Link Element - Textarea
                    [ OP3.Elements._extension.prop.Rows, { id: "textareaRows", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "textareaLabelDisplay", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "textareaLabelSpacing", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Display, { id: "textareaIconDisplay", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-icon, .op3-element[data-op3-element-type="textarea"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "textareaIconFontSize", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-icon', units: [ "%" ], defaultUnit: "%" } ],
                    [ OP3.Elements._extension.prop.Top, { id: "textareaIconTop", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-icon' } ],
                    [ OP3.Elements._extension.prop.FlexDirection, { id: "textareaIconFlexDirection", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "textareaIconSpacing", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-divider' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "textareaFontFamily", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "textareaFontSize", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textareaFontWeight", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textareaFontStyle", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "textareaLineHeight", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "textareaLetterSpacing", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textareaTextTransform", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textareaTextDecoration", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label > div' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "textareaFieldFontFamily", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "textareaFieldFontSize", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "textareaFieldFontWeight", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "textareaFieldFontStyle", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "textareaFieldLineHeight", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "textareaFieldLetterSpacing", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textareaFieldTextTransform", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textareaColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-label' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textareaFieldColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textareaPlaceholderColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-text::placeholder' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "textareaIconColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit-icon' } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "textareaBackgroundImageOverlay", selector: ' .op3-element[data-op3-element-type="textarea"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="textarea"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "textareaBackgroundColorOverlay", selector: ' .op3-element[data-op3-element-type="textarea"] [data-op3-background="overlay"]::before, .op3-element[data-op3-element-type="textarea"] [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "textareaBorderTopWidth", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "textareaBorderTopStyle", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "textareaBorderTopColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "textareaBorderRightWidth", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "textareaBorderRightStyle", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "textareaBorderRightColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "textareaBorderBottomWidth", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "textareaBorderBottomStyle", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "textareaBorderBottomColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "textareaBorderLeftWidth", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "textareaBorderLeftStyle", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-element-container], .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "textareaBorderLeftColor", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "textareaBorderTopLeftRadius", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "textareaBorderTopRightRadius", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "textareaBorderBottomRightRadius", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "textareaBorderBottomLeftRadius", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "textareaBoxShadow", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit [data-op3-border]' } ],
                    [ OP3.Elements._extension.prop.Width, { id: "textareaWidth", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "textareaMarginTop", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "textareaMarginBottom", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "textareaMarginLeft", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "textareaMarginRight", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "textareaPaddingTop", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "textareaPaddingBottom", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "textareaPaddingLeft", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "textareaPaddingRight", selector: ' .op3-element[data-op3-element-type="textarea"]' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "textareaInputMarginTop", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "textareaInputMarginBottom", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "textareaInputMarginLeft", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "textareaInputMarginRight", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "textareaInputPaddingTop", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "textareaInputPaddingBottom", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "textareaInputPaddingLeft", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "textareaInputPaddingRight", selector: ' .op3-element[data-op3-element-type="textarea"] .op3-element-input-edit' } ],

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
                ];
            },

        },

    });

    /**
     * Resizes the fields and button based on
     * the number of form inputs and with
     * regard to form layout
     *
     * @param {Object} form
     * @return {Void}
     */
    var resizeFields = function(form) {
        var button = form.find("button").element();
        var layout = form.getOption("optinFieldLayout");

        // Get all visible fields, to adjust the value properly
        var $fields = $(form.node())
            .find("form [data-op3-children]")
            .children(":visible")
                .not('.op3-element[data-op3-element-type="button"]')
                .not('.op3-element[data-op3-element-spec="dummy"]')
                .not('.op3-element[data-op3-element-spec="gdpr1"]')
                .not('.op3-element[data-op3-element-spec="gdpr2"]');

        // include button
        var count = $fields.length + 1;

        // stacked width is always 100%
        var fieldWidth = "100%";
        if (layout === "inline") {
            // inline default field width is always 50%
            fieldWidth = "50%";
            if (count === 3)
                fieldWidth = "33%";

            if (count === 4)
                fieldWidth = "25%";
        }

        button.setOption("maxWidth", fieldWidth);

        // when switching to inline mode
        // make sure button has the same height as inputs
        button.setOption("height", $fields.find(".op3-element-input-edit").css("height"));
        form.setOption("fieldWidth", fieldWidth);
    };

    // !!! Quick Fix !!!
    // If width is changed on a child element, setting fieldWidth
    // on form will have no effect, that's why we reset the
    // child width values when switching  optin layout
    // or changing field width
    OP3.bind("elementchange::form::optinFieldLayout elementchange::form::width elementchange::contactform::optinFieldLayout elementchange::contactform::width", function(e, o) {
        if (o.id !== "fieldWidth" && o.id !== "optinFieldLayout")
            return;

        OP3.$(o.node).element().children().forEach(function(node, index) {
            var element = OP3.$(node).element();

            // Set the button maxWidth to match input field width
            if (element.type() === "button" && o.id === "fieldWidth")
                element.setOption("maxWidth", o.value.after);

            // Reset all input fields
            if (element.type() !== "button")
                element.setOption("width", null);
        });
    });

    // Reset button marginAlign
    OP3.bind("elementchange::form::alignItems elementchange::contactform::alignItems", function(e, o) {
        if (o.id !== "alignItems")
            return;

        var marginRight = "auto",
            marginLeft = "auto";
        if (o.value.after === "flex-start")
            marginLeft = "0px";
        else if (o.value.after === "flex-end")
            marginRight = "0px";

        OP3.$(o.node).setOption("buttonMarginRight", marginRight, "all");
        OP3.$(o.node).setOption("buttonMarginLeft", marginLeft, "all");
    });

    // Tweak child button node on style change
    // We reset all properties except for the
    // ones that need to be persistent to
    // ensure button looks good and is
    // aligned well on all styles
    OP3.bind("elementstyle::form elementstyle::contactform", function (e, o) {
        var element = OP3.$(o.node).element();
        if (element.getOption("optinFieldLayout", "all") === "inline") {
            var button = OP3.$(o.node).find("button").element();
            var email = OP3.$.closest('input[type="email"]', o.node);

            button.setOption("height", email.getOption("height", true), "all");
        }
    });

    OP3.bind("elementchange::form::optinFieldLayout elementchange::contactform::optinFieldLayout", function(e, o) {
        var value = o.value.after;
        var form = OP3.$(o.node);
        var button = form
            .find("button")
            .element();
        var $fields = $(o.node)
            .find("form [data-op3-children]")
            .children('.op3-element[data-op3-element-type="input"]:visible:first');
        var height = $fields.find(".op3-element-input-edit").css("height");

        // Adjust fields width based
        // on the field layout
        resizeFields(form);

        button.setOption("height", height);
    });

    // Set data-op3-parent-options-property-value attribute
    // (so we can hide some options with css).
    OP3.bind("elementoptionsformattach::form elementoptionsformattach::contactform", function(e, o) {
        var element = OP3.$(o.node);

        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-optinFieldLayout", element.getOption("optinFieldLayout", true));
    });

    OP3.bind("elementoptionsformdetach::form elementoptionsformdetach::contactform", function(e, o) {
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-optinFieldLayout");
    });

    OP3.bind("elementchange::form::optinFieldLayout elementchange::contactform::optinFieldLayout", function(e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-parent-options-property-value-optinFieldLayout", o.value.after);
    });

    // Set form elements readonly in LiveEditor
    OP3.bind("ready elementappend integrationformreset", function(e, o) {
        var parent = "form,contactform",
            children = "input,checkbox,radiobutton,select,textarea",
            element = OP3.$(null);
        if (o && o.node)
            element = OP3.$(o.node);
        else
            element = OP3.$(parent);

        if (!parent.split(",").includes(element.type()))
            element = element.find(parent);

        element
            .find(children)
                .jq()
                .find(children)
                    .attr("readonly", "readonly")
                    .attr("autocomplete", "off")
                    .attr("z-index", "-1")
                    .css("pointer-events", "none");

        // Reset checkbox size (in case inline option was selected before)
        element.setOption("checkboxWidth", "100%", "all");
        element.setOption("radiobuttonWidth", "100%", "all");
    });

    // sync placeholderColor on fieldColor change
    OP3.bind("elementchange::form::color elementchange::contactform::color", function(e, o) {
        if (o.id !== "inputFieldColor")
            return;

        var element = OP3.$(OP3.Designer.activeElement());
        if (!element.is("input") || !element.closest(o.node).length)
            return;
        if (OP3.$(o.node).getOption("inputPlaceholderColor", o.media))
            return;

        OP3.transmit("elementoptionssyncrequest", { property: [ "placeholderColor" ] });
    });

    // fix select node line-height issue
    OP3.bind("elementchange::form::height elementchange::contactform::height", function(e, o) {
        if (o.id !== "selectFieldHeight")
            return;

        OP3.$(o.node).setOption("selectFieldLineHeight", o.value.after, o.media);
    });

    // sync colors
    OP3.bind("elementchange::form elementchange::contactform", function(e, o) {
        var sync = [
            "checkboxBackgroundColor",
            "checkboxColor",
            "checkboxIconColor",
            "checkboxCheckmarkBorderTopWidth",
            "checkboxCheckmarkBorderTopStyle",
            "checkboxCheckmarkBorderTopColor",
            "checkboxCheckmarkBorderRightWidth",
            "checkboxCheckmarkBorderRightStyle",
            "checkboxCheckmarkBorderRightColor",
            "checkboxCheckmarkBorderBottomWidth",
            "checkboxCheckmarkBorderBottomStyle",
            "checkboxCheckmarkBorderBottomColor",
            "checkboxCheckmarkBorderLeftWidth",
            "checkboxCheckmarkBorderLeftStyle",
            "checkboxCheckmarkBorderLeftColor",
            "checkboxCheckmarkBorderTopLeftRadius",
            "checkboxCheckmarkBorderTopRightRadius",
            "checkboxCheckmarkBorderBottomRightRadius",
            "checkboxCheckmarkBorderBottomLeftRadius",
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
            .replace(/^checkbox(\w)/, function(match, group) {
                return group.toLowerCase();
            })
            + "Checked";
        prop = [ prop ];

        // label color changes icon color as well
        if (o.id === "checkboxColor")
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

})(jQuery, window, document);
