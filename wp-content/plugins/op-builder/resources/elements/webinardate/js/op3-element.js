/**
 * OptimizePress3 element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.WebinarDate = OP3.defineClass({

        Name: "OP3.Element.WebinarDate",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "webinardate",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " .op3-webinar-month-box" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " .op3-webinar-month-box" } ],

                    // Style tab - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " .op3-webinar-month-box"} ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    [ OP3.Elements._extension.prop.FontSize, { id: "monthFontSize", selector: " .op3-webinar-month" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "monthFontWeight", selector: " .op3-webinar-month" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "monthFontFamily", selector: " .op3-webinar-month" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "monthColor", selector: " .op3-webinar-month" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { selector: " .op3-webinar-month" } ],

                    [ OP3.Elements._extension.prop.FontSize, { id: "dayFontSize", selector: " .op3-webinar-day" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "dayFontWeight", selector: " .op3-webinar-day" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "dayFontFamily", selector: " .op3-webinar-day" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "dayColor", selector: " .op3-webinar-day" } ],

                    [ OP3.Elements._extension.prop.FontSize, { id: "dateFontSize", selector: " .op3-webinar-date" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "dateFontWeight", selector: " .op3-webinar-date" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "dateFontFamily", selector: " .op3-webinar-date" } ],

                    [ OP3.Elements._extension.prop.FontSize, { id: "timezoneFontSize", selector: " .op3-webinar-timezone" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "timezoneFontWeight", selector: " .op3-webinar-timezone" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "timezoneFontFamily", selector: " .op3-webinar-timezone" } ],
                    [ OP3.Elements._extension.prop.Html ],

                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-webinar-date, .op3-webinar-timezone" } ],

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
                    [ OP3.Elements._extension.prop.JustifyContent, { label: OP3._("Align Content"), selector: " [data-op3-element-container]", options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" } ] } ],

                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                ];

            },

        },

    });

    /**
     * Set element dummy data.
     *
     * @param  {Mixed} node
     * @return {Void}
     */
    var _setElementDummyData = function(node) {
        var $node = $(node),
            month = "February",
            day = "11",
            date = "Tue, 11 Feb, 2020",
            timezone = "10:00 AM Eastern Time (US & Canada)";

        $node.find(".op3-webinar-month").text(month);
        $node.find(".op3-webinar-day").text(day);
        $node.find(".op3-webinar-date").text(date);
        $node.find(".op3-webinar-timezone-value").text(timezone);
    }

    // Set dummy data on all elements on document
    OP3.bind("ready", function(e) {
        _setElementDummyData(OP3.$("webinardate").jq());
    });

    // Set dummy data on all newly created elements
    OP3.bind("elementappendfirst::webinardate elementwrap::webinardate", function(e, o) {
        _setElementDummyData(o.node);
    });

})(jQuery, window, document);
