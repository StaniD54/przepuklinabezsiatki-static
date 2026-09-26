/**
 * OptimizePress3 element type
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.GoogleMapsSimple = OP3.defineClass({

        Name: "OP3.Element.GoogleMapsSimple",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "googlemapssimple",

            _props: function() {
                return [
                    // General
                    [ OP3.Elements._extension.prop.GoogleMapsZoom ],
                    [ OP3.Elements._extension.prop.GoogleMapsSearch ],
                    [ OP3.Elements._extension.prop.Src, { selector: " iframe" } ],

                    // Positioning
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
                    [ OP3.Elements._extension.prop.MaxWidth ],
                    [ OP3.Elements._extension.prop.Height, { label: OP3._("Height"), selector: " .google-maps-widget", attr: { "data-property-type": "range", "data-units": "px, vh", "data-min-px": "0", "data-min-vh": "0", "data-max-px": "2000", "data-max-vh": "200", "data-step-px": "1", "data-step-vh": "1", "data-precision-px": "0", "data-precision-vh": "0" }, units: [ "px", "vh" ] } ],

                    // Border
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .google-maps-widget" } ],

                    // Shadows
                    [ OP3.Elements._extension.prop.BoxShadow, {selector: " .google-maps-widget"} ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "boxShadowHover", selector: ":hover .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "boxShadowHoverAngle"} ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "boxShadowHoverDistance"} ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "boxShadowHoverBlur"} ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "boxShadowHoverSpread"} ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "boxShadowHoverColor"} ],

                     // Hover Transition / Borders
                     [ OP3.Elements._extension.prop.TransitionDuration, { selector: " .google-maps-widget" } ],
                     [ OP3.Elements._extension.prop.BorderTopWidth, { selector: ":hover .google-maps-widget", id: "borderTopWidthHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: ":hover .google-maps-widget", id: "borderTopStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: ":hover .google-maps-widget", id: "borderTopColorHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: ":hover .google-maps-widget", id: "borderRightWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: ":hover .google-maps-widget", id: "borderRightStyleHover" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: ":hover .google-maps-widget", id: "borderRightColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: ":hover .google-maps-widget", id: "borderBottomWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: ":hover .google-maps-widget", id: "borderBottomStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: ":hover .google-maps-widget", id: "borderBottomColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: ":hover .google-maps-widget", id: "borderLeftWidthHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: ":hover .google-maps-widget", id: "borderLeftStyleHover"  } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: ":hover .google-maps-widget", id: "borderLeftColorHover"  } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: ":hover .google-maps-widget", id: "borderTopLeftRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: ":hover .google-maps-widget", id: "borderTopRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: ":hover .google-maps-widget", id: "borderBottomRightRadiusHover" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: ":hover .google-maps-widget", id: "borderBottomLeftRadiusHover" } ],

                    // Filter Effects
                    [ OP3.Elements._extension.prop.Filter, { selector: " .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.Opacity, { selector: ' .google-maps-widget' } ],
                    [ OP3.Elements._extension.prop.Opacity100, { selector: ' .google-maps-widget' } ],
                    [ OP3.Elements._extension.prop.FilterBrightness, { attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "300", "data-step-percent": "1", "data-precision-percent": "0", }, } ],
                    [ OP3.Elements._extension.prop.FilterBlur ],
                    [ OP3.Elements._extension.prop.FilterContrast ],
                    [ OP3.Elements._extension.prop.FilterGrayscale ],
                    [ OP3.Elements._extension.prop.FilterSepia ],
                    [ OP3.Elements._extension.prop.FilterInvert ],
                    [ OP3.Elements._extension.prop.FilterSaturate ],
                    [ OP3.Elements._extension.prop.Filter, { id: "filterHover", selector: ":hover .google-maps-widget" } ],
                    [ OP3.Elements._extension.prop.Opacity, { id: "opacityHover", selector: ':hover .google-maps-widget' } ],
                    [ OP3.Elements._extension.prop.Opacity100, { id: "opacity100Hover", selector: ':hover .google-maps-widget' } ],
                    [ OP3.Elements._extension.prop.FilterBrightness, { id: "filterBrightnessHover", attr: { "data-property-type": "range", "data-units": "%", "data-min-percent": "0", "data-max-percent": "300", "data-step-percent": "1", "data-precision-percent": "0", }, } ],
                    [ OP3.Elements._extension.prop.FilterBlur, { id: "filterBlurHover" } ],
                    [ OP3.Elements._extension.prop.FilterContrast, { id: "filterContrastHover" } ],
                    [ OP3.Elements._extension.prop.FilterGrayscale, { id: "filterGrayscaleHover" } ],
                    [ OP3.Elements._extension.prop.FilterSepia, { id: "filterSepiaHover" } ],
                    [ OP3.Elements._extension.prop.FilterInvert, { id: "filterInvertHover" } ],
                    [ OP3.Elements._extension.prop.FilterSaturate, { id: "filterSaturateHover" } ],

                    // Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    // Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

    // Update map src on change
    OP3.bind("elementchange::googlemapssimple::googlemapsZoom elementchange::googlemapssimple::googlemapsSearch", function(e, o) {
        var element = OP3.Query(o.node).element();
        var src = "https://maps.google.com/maps?output=embed";
        var query = "&q=" + encodeURIComponent(element.getOption("googlemapsSearch", true));
        var zoom = "&z=" + element.getOption("googlemapsZoom", true);

        element.setOption('src', src + query + zoom);
    });

})(jQuery, window, document);
