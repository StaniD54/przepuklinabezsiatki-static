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
    OP3.Elements._extension.type.Date = OP3.defineClass({

        Name: "OP3.Element.Date",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "date",

            _props: function() {
                return [
                    // Toolbar - Date - Date Options
                    [ OP3.Elements._extension.prop.DateTimeType, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.IntervalType, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.TimeInterval, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.DateInterval, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.DateCustomInterval, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.DayInterval, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.DateFormat, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.TimeFormat, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.DateTime, { label: OP3._("Date"), selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.Display, { selector: " .weekday" } ],
                    [ OP3.Elements._extension.prop.Visible, { selector: " .weekday", label: OP3._("Show Weekday") } ],

                    // Toolbar - Date - Layout
                    [ OP3.Elements._extension.prop.Display, { id: "calendarDisplay", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "calendarVisible", label: OP3._("Calendar Visible"), selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.CalendarStackedLayout ],
                    [ OP3.Elements._extension.prop.DateStackedLayout ],
                    [ OP3.Elements._extension.prop.Display, { id: "timeDisplay", selector: " .wrapper" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "timeVisible", label: OP3._("Time Visible"), selector: " .wrapper", attr: { "data-property-type": "boolean", display: "flex" } } ],

                    // Toolbar - Date - Text Strings
                    [ OP3.Elements._extension.prop.MarginRight, { id: "gutterRight", selector: " .separator-wrapper" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "gutterLeft", selector: " .separator-wrapper" } ],
                    [ OP3.Elements._extension.prop.Gutter2, { label: OP3._("Text String Spacing") } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "timezoneMarginLeft", selector: " .timezone-wrapper", label: OP3._("Timezone Spacing"), attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "50", "data-step-px": "1", "data-precision-px": "0" }, units: [ "px" ] }],

                    // Toolbar - Font Options
                    [ OP3.Elements._extension.prop.FontFamily, { selector: " p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { selector: " p", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LineHeight, { label: OP3._("Line Height"), selector: " p", attr: { "data-property-type": "range", "data-units": "em", "data-min-em": "0.5", "data-max-em": "5", "data-step-em": "0.001", "data-precision-em": "0.001", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.LetterSpacing, { selector: " p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { selector: " p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { selector: " p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { selector: " p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { selector: " p" } ],
                    [ OP3.Elements._extension.prop.JustifyContent, { selector: " [data-op3-element-container], .date", label: OP3._("Text Align"), options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" } ] } ],
                    [ OP3.Elements._extension.prop.AlignItems, { selector: " [data-op3-element-container], .date", label: OP3._("Text Align"), options: [ { "flex-start": "Start" }, { "center": "Center" }, { "flex-end": "End" } ] } ],

                    // Toolbar - Color - Colour
                    [ OP3.Elements._extension.prop.Color, { selector: " p" } ],

                    // Toolbar - Color - Background Color
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlay", selector: ' [data-op3-background="overlay"]::before, [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayStopPosition" } ],

                    // Toolbar - Color - Calendar
                    [ OP3.Elements._extension.prop.BackgroundColor, { selector: ' .header' } ],

                    // Toolbar - Color - Icons
                    [ OP3.Elements._extension.prop.Color, { id: "iconColor", selector: ' .op3-icon' } ],

                    // Toolbar - Icon
                    [ OP3.Elements._extension.prop.Display, { id: "dateIconDisplay", selector: " .op3-date-icon" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "dateIconVisible", label: OP3._("Date Icon Visible"), selector: " .op3-date-icon" } ],
                    [ OP3.Elements._extension.prop.Op3Icon, { label: OP3._("Date Icon"), selector: " .op3-date-icon, .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.Display, { id: "timeIconDisplay",  selector: " .op3-time-icon" } ],
                    [ OP3.Elements._extension.prop.Visible, { id: "timeIconVisible", label: OP3._("Time Icon Visible"), selector: " .op3-time-icon" } ],
                    [ OP3.Elements._extension.prop.Op3Icon2, { label: OP3._("Time Icon"), selector: " .op3-time-icon, .op3-icon-container" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "iconSize", selector: " .op3-icon", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "8", "data-max-px": "72", "data-step-px": "1", "data-precision-px": "0", "data-avoid-text-max": "1" }, }],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "iconSpacing", label: OP3._("Spacing"), selector: " .op3-icon", attr: { "data-property-type": "range", "data-units": "px", "data-min-px": "0", "data-max-px": "100", "data-step-px": "1", "data-precision-px": "0", } } ],

                    // Toolbar - Border - Borders
                    [ OP3.Elements._extension.prop.BorderTopWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { selector: " [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { selector: " [data-op3-element-container], [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { selector: " [data-op3-element-container], [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { selector: " [data-op3-element-container], [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { selector: " [data-op3-element-container], [data-op3-background]" } ],

                    // Toolbar - Border - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { selector: " [data-op3-element-container]" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread ],
                    [ OP3.Elements._extension.prop.BoxShadowColor ],
                    // [ OP3.Elements._extension.prop.BoxShadowInset ],

                    // Toolbar - Border 2 - Borders
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "calendarBorderTopWidth", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "calendarBorderTopStyle", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "calendarBorderTopColor", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "calendarBorderRightWidth", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "calendarBorderRightStyle", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "calendarBorderRightColor", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "calendarBorderBottomWidth", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "calendarBorderBottomStyle", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "calendarBorderBottomColor", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "calendarBorderLeftWidth", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "calendarBorderLeftStyle", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "calendarBorderLeftColor", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "calendarBorderTopLeftRadius", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "calendarBorderTopRightRadius", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "calendarBorderBottomRightRadius", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "calendarBorderBottomLeftRadius", selector: " .calendar" } ],

                    // Toolbar - Border 2 - Shadow
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "calendarBoxShadow", selector: " .calendar" } ],
                    [ OP3.Elements._extension.prop.BoxShadowAngle, { id: "calendarBoxShadowAngle" } ],
                    [ OP3.Elements._extension.prop.BoxShadowDistance, { id: "calendarBoxShadowDistance" } ],
                    [ OP3.Elements._extension.prop.BoxShadowBlur, { id: "calendarBoxShadowBlur" } ],
                    [ OP3.Elements._extension.prop.BoxShadowSpread, { id: "calendarBoxShadowSpread" } ],
                    [ OP3.Elements._extension.prop.BoxShadowColor, { id: "calendarBoxShadowColor" } ],
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
                    [ OP3.Elements._extension.prop.MarginAlign ],
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
                    [ OP3.Elements._extension.prop.Html, { selector: " .op3-html1[data-op3-contenteditable]" } ],
                    [ OP3.Elements._extension.prop.Html2 ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],

                    // Sidebar - Hover - General
                    [ OP3.Elements._extension.prop.Color, { id: "colorHover", selector: ":hover p", label: OP3._("Colour") } ],

                    // Sidebar - Hover - Background
                    [ OP3.Elements._extension.prop.BackgroundImage, { id: "backgroundImageOverlayHover", selector: ':hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageType, { id: "backgroundImageOverlayHoverType", label: OP3._("Type"), options: [ { "none": "Background Colour" }, { "linear-gradient": "Linear Gradient" }, { "radial-gradient": "Radial Gradient" } ] } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "backgroundColorOverlayHover", selector: ':hover [data-op3-background="overlay"]::after' } ],
                    [ OP3.Elements._extension.prop.BackgroundImageAngle, { id: "backgroundImageOverlayHoverAngle" } ],
                    [ OP3.Elements._extension.prop.BackgroundImagePosition, { id: "backgroundImageOverlayHoverPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartColor, { id: "backgroundImageOverlayHoverStartColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStartPosition, { id: "backgroundImageOverlayHoverStartPosition" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopColor, { id: "backgroundImageOverlayHoverStopColor" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageStopPosition, { id: "backgroundImageOverlayHoverStopPosition" } ],

                    // Sidebar - Hover - Borders & Corners
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "borderTopWidthHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "borderTopStyleHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "borderTopColorHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "borderRightWidthHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "borderRightStyleHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "borderRightColorHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "borderBottomWidthHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "borderBottomStyleHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "borderBottomColorHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "borderLeftWidthHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "borderLeftStyleHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "borderLeftColorHover", selector: ":hover [data-op3-border]" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "borderTopLeftRadiusHover", selector: ":hover [data-op3-element-container], :hover [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "borderTopRightRadiusHover", selector: ":hover [data-op3-element-container], :hover [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "borderBottomRightRadiusHover", selector: ":hover [data-op3-element-container], :hover [data-op3-background]" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "borderBottomLeftRadiusHover", selector: ":hover [data-op3-element-container], :hover [data-op3-background]" } ],

                ];
            },

        },

    });

    /**
     * elementoptionsformattach event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementoptionsformattach::date", function(e, o) {
        var element = OP3.$(o.node);

        // Add dateTimeType property to toolbar form
        // so we can hide/show other properties with css
        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-datetimetype", element.getOption("dateTimeType", true))
            .attr("data-op3-parent-options-property-value-intervaltype", element.getOption("intervalType", true))
            .attr("data-op3-parent-options-property-value-calendardisplay", element.getOption("calendarDisplay", true))
            .attr("data-op3-parent-options-property-value-dateicondisplay", element.getOption("dateIconDisplay", true))
            .attr("data-op3-parent-options-property-value-timeicondisplay", element.getOption("timeIconDisplay", true))
            .attr("data-op3-parent-options-property-value-datestackedlayout", element.getOption("dateStackedLayout", true))
            .attr("data-op3-parent-options-property-value-calendarstackedlayout", element.getOption("calendarStackedLayout", true))
    });

    /**
     * elementoptionsformdettach event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementoptionsformdetach::date", function(e, o) {

        // Remove dateTimeType property from toolbar form
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-datetimetype")
            .removeAttr("data-op3-parent-options-property-value-intervalype")
            .removeAttr("data-op3-parent-options-property-value-calendardisplay")
            .removeAttr("data-op3-parent-options-property-value-dateicondisplay")
            .removeAttr("data-op3-parent-options-property-value-timeicondisplay")
            .removeAttr("data-op3-parent-options-property-value-dateStackedLayout")
            .removeAttr("data-op3-parent-options-property-value-calendarStackedLayout")
    });

    /**
     * elementchange event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementchange::date::dateTimeType elementchange::date::intervalType elementchange::date::display elementchange::date::dateStackedLayout elementchange::date::calendarStackedLayout", function(e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        // update properties value on toolbar form attributes
        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-parent-options-property-value-" + o.id, o.value.after);
    });

    /**
     * Initialize deadline to html element
     *
     * @param {HTMLObject} element
     */
    var deadline = function(element) {
        var element = OP3.$(element);
        var type = element.getOption("dateTimeType", "all");
        var deadline = null;

        if (type === "dynamic") {
            var intervalType = element.getOption("intervalType", "all");
            var interval = null;

            if (intervalType === "date") {
                interval = element.getOption("dateInterval", "all");

                if (interval === "custom")
                    interval = element.getOption("dateCustomInterval", "all");
            } else if (intervalType === "time") {
                interval = element.getOption("timeInterval", "all");
            } else if (intervalType === "day") {
                interval = element.getOption("dayInterval", "all");
            }

            deadline = new Deadline({ type: "dynamic", intervalType: intervalType, interval: interval });
        } else if (type === "specific") {
            var date = element.getOption("dateTime", "all");
            deadline = new Deadline({ type: "specific", date: date });
        }

        var dateFormat = element.getOption("dateFormat", "all");
        var timeFormat = element.getOption("timeFormat", "all");
        var lang = OP3 && OP3.Meta ? OP3.Meta.wpLocale.replace("_", '-') : "en-US";
        var deadlineDate = deadline.format(lang, dateFormat, timeFormat);

        var $element = element.jq();
        $element.find(".weekday").text(deadlineDate.weekday);
        $element.find(".month").text(deadlineDate.month);
        $element.find(".day").text(deadlineDate.day);
        $element.find(".year").text(deadlineDate.year);
        $element.find(".time").text(deadlineDate.time);
    }

    /**
     * intervalType and timeInterval property change event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @returns {Void}
     */
    OP3.bind("elementoptionssync::date::intervalType elementoptionssync::date::dateTimeType elementoptionssync::date::dateTime elementoptionssync::date::timeInterval elementoptionssync::date::dateInterval elementoptionssync::date::dateCustomInterval elementoptionssync::date::dateFormat elementoptionssync::date::timeFormat elementoptionssync::date::dayInterval", function(e, o) {
        deadline(o.node);
    });

    /**
     * op3 builder load event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("load elementappendfirst", function(e, o) {
        var $node = $(o ? o.node : document);

        if ($node.attr("data-op3-element-type") === "date") {
            return deadline($node);
        }

        $node
            .find('[data-op3-element-type="date"]')
            .each(function() {
                deadline(this);
            });
    });

    /**
     *
     * op3 builder load event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementchange::date::calendarStackedLayout", function(e, o) {
        var element = OP3.$(o.node);

        if (o.value.before === "0" && o.value.after === "1") {
            var value = element.getOption("justifyContent", true);
            element.setOption("alignItems", value, o.media);
        } else if (o.value.before === "1" && o.value.after === "0") {
            var value = element.getOption("alignItems", true);
            element.setOption("alignItems", "center", true);
            element.setOption("justifyContent", value, o.media);
        }
    });

})(jQuery, window, document);
