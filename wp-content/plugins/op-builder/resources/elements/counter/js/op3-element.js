/**
 * OptimizePress3 element.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Counter = OP3.defineClass({

        Name: "OP3.Element.Counter",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "counter",

            _props: function() {
                return [
                    // Toolbar - Counter
                    [ OP3.Elements._extension.prop.CounterStart ],
                    [ OP3.Elements._extension.prop.CounterEnd ],
                    [ OP3.Elements._extension.prop.CounterAnimationDuration ],
                    [ OP3.Elements._extension.prop.CounterSeparator ],

                    // Toolbar - Counter - Layout
                    [ OP3.Elements._extension.prop.Display, { id: "displayPrefix", selector: " .op3-html2" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "visiblePrefix", label: OP3._("Number Prefix"), attr: { "data-property-type": "boolean", display: "inline-block" } } ],
                    [ OP3.Elements._extension.prop.Display, { id: "displaySuffix", selector: " .op3-html3" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "visibleSuffix", label: OP3._("Number Suffix"), attr: { "data-property-type": "boolean", display: "inline-block" } } ],
                    [ OP3.Elements._extension.prop.Display, { id: "displayTextAbove", selector: " .op3-html" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "visibleTextAbove", label: OP3._("Text Above Counter") } ],
                    [ OP3.Elements._extension.prop.Display, { id: "displayTextBelow", selector: " .op3-html4" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "visibleTextBelow", label: OP3._("Text Below Counter") } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "spacingPrefix", selector: " .op3-html2", label: OP3._("Prefix Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "250", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "spacingSuffix", selector: " .op3-html3", label: OP3._("Suffix Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "250", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "spacingTextAbove", selector: " .op3-html", label: OP3._("Text Above Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "250", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "spacingTextBelow", selector: " .op3-html4", label: OP3._("Text Below Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "250", "data-step-px": "1", "data-precision-px": "0", } } ],

                    // Toolbar - Color
                    [ OP3.Elements._extension.prop.Color, { id: "colorCounter", label: "Counter Colour" , selector: " .op3-counter" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorPrefix", label: "Prefix Colour" , selector: " .op3-html2" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorSuffix", label: "Suffix Colour" , selector: " .op3-html3" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorTextAbove", label: "Text Above Colour" , selector: " .op3-html" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorTextBelow", label: "Text Below Colour" , selector: " .op3-html4" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "colorIcon", label: "Icon Colour" , selector: " .op3-icon" } ],

                    // Background - Base
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageBaseType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageBase", selector: ' [data-op3-border] > [data-op3-background="base"]::before, [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorBase", selector: ' [data-op3-border] > [data-op3-background="base"]::before, [data-op3-border] > [data-op3-background="base"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageBaseAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageBasePosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageBaseStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageBaseStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageBaseStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageBaseStopPosition" } ],

                    // Toolbar - Font - Counter
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fontFamilyCounter", selector: " .op3-counter" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fontSizeCounter", selector: " .op3-counter", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "lineHeightCounter", selector: " .op3-counter", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "letterSpacingCounter", selector: " .op3-counter" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fontWeightCounter", selector: " .op3-counter" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fontStyleCounter", selector: " .op3-counter" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTransformCounter", selector: " .op3-counter" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textDecorationCounter", selector: " .op3-counter" } ],

                    // Toolbar - Font - Prefix
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fontFamilyPrefix", selector: " .op3-html2 p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fontSizePrefix", selector: " .op3-html2 p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "lineHeightPrefix", selector: " .op3-html2 p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "letterSpacingPrefix", selector: " .op3-html2 p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fontWeightPrefix", selector: " .op3-html2 p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fontStylePrefix", selector: " .op3-html2 p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTransformPrefix", selector: " .op3-html2 p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textDecorationPrefix", selector: " .op3-html2 p" } ],

                    // Toolbar - Font - Suffix
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fontFamilySuffix", selector: " .op3-html3 p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fontSizeSuffix", selector: " .op3-html3 p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "lineHeightSuffix", selector: " .op3-html3 p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "letterSpacingSuffix", selector: " .op3-html3 p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fontWeightSuffix", selector: " .op3-html3 p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fontStyleSuffix", selector: " .op3-html3 p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTransformSuffix", selector: " .op3-html3 p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textDecorationSuffix", selector: " .op3-html3 p" } ],

                    // Toolbar - Font - Text Above
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fontFamilyTextAbove", selector: " .op3-html p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fontSizeTextAbove", selector: " .op3-html p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "lineHeightTextAbove", selector: " .op3-html p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "letterSpacingTextAbove", selector: " .op3-html p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fontWeightTextAbove", selector: " .op3-html p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fontStyleTextAbove", selector: " .op3-html p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTransformTextAbove", selector: " .op3-html p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textDecorationTextAbove", selector: " .op3-html p" } ],

                    // Toolbar - Font - Text Below
                    [ OP3.Elements._extension.prop.FontFamily, { id: "fontFamilyTextBelow", selector: " .op3-html4 p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fontSizeTextBelow", selector: " .op3-html4 p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "lineHeightTextBelow", selector: " .op3-html4 p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "letterSpacingTextBelow", selector: " .op3-html4 p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "fontWeightTextBelow", selector: " .op3-html4 p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "fontStyleTextBelow", selector: " .op3-html4 p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "textTransformTextBelow", selector: " .op3-html4 p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "textDecorationTextBelow", selector: " .op3-html4 p" } ],

                    // Toolbar - Aligment
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.AlignItems, { selector: " .wrapper", label: OP3._("Text Align"), options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" } ] } ],

                    // Toolbar - Icon
                    [ OP3.Elements._extension.prop.Display, { id: "displayIcon", selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "visibleIcon", label: OP3._("Icon Visible"), attr: { "data-property-type": "boolean", display: "inline-block" } } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "marginRightIcon", label: OP3._("Spacing"), selector: " .op3-icon", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "250", "data-step-px": "1", "data-precision-px": "0", } } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "fontSizeIcon", label: OP3._("Icon Size"), selector: " .op3-icon" } ],

                    // Style tab - Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .wrapper, [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .wrapper, [data-op3-border]" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Sidebar - Positioning
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.PaddingDrag, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Sidebar - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

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
                    [ OP3.Elements._extension.prop.Html, { selector: " .op3-html[data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.Html2 ],
                    [ OP3.Elements._extension.prop.Html3 ],
                    [ OP3.Elements._extension.prop.Html4 ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

    /**
     * Counter library initialization
     *
     * @param {HTMLObject}
     * @return {Void}
     */
    var counter = function(element) {
        var $element = $(element);

        // Remove old instance before starting new one
        if (element._counter)
            element._counter.destroy();

        new Counter(element, {
            start: parseFloat($element.attr("data-op3-counter-start")),
            end: parseFloat($element.attr("data-op3-counter-end")),
            duration: parseFloat($element.attr("data-op3-counter-animation-duration")) * 1000,
            separator: $element.attr("data-op3-counter-separator"),
        });
    };

    /**
     * Reinitialize counter library on some property change
     *
     * @param {Object} e
     * @param {Object} o
     * @returns {Void}
     */
    OP3.bind("elementchange::counter::counterStart elementchange::counter::counterEnd elementchange::counter::counterAnimationDuration elementchange::counter::counterSeparator", function(e, o) {
        $(o.node)
            .find('.op3-counter')
            .each(function() {
                counter(this);
            });
    });

    /**
     * Initialize counter library on element first drop and op3 builder ready
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("ready elementappendfirst", function(e, o) {
        $(o ? o.node : document)
            .find('.op3-counter')
            .each(function() {
                counter(this);
            });
    });

    /**
     * elementoptionsformattach event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementoptionsformattach::counter", function(e, o) {
        var element = OP3.$(o.node);

        // Add properties value to toolbar form
        // so we can hide/show other properties with css
        $(o.parent)
            .closest("form")
            .attr("data-op3-options-property-value-displayicon", element.getOption("displayIcon", true))
            .attr("data-op3-options-property-value-displayprefix", element.getOption("displayPrefix", true))
            .attr("data-op3-options-property-value-displaysuffix", element.getOption("displaySuffix", true))
            .attr("data-op3-options-property-value-displaytextabove", element.getOption("displayTextAbove", true))
            .attr("data-op3-options-property-value-displaytextbelow", element.getOption("displayTextBelow", true));
    });

    /**
     * elementoptionsformdettach event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementoptionsformdetach::counter", function(e, o) {
        // Remove properties from toolbar form
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-options-property-value-displayicon")
            .removeAttr("data-op3-options-property-value-displayprefix")
            .removeAttr("data-op3-options-property-value-displaysuffix")
            .removeAttr("data-op3-options-property-value-displaytextabove")
            .removeAttr("data-op3-options-property-value-displaytextbelow");
    });

    /**
     * elementchange event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementchange::counter::display", function(e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        // update properties value on toolbar form attributes
        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-options-property-value-" + o.id, o.value.after);
    });

})(jQuery, window, document);
