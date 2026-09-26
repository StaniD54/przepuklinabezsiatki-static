;(function($, window, document) {

    "use strict";


    var $dates = $('.op3-element[data-op3-element-type="date"]');

    $dates.each(function() {
        var $this = $(this);
        var $wrapper = $this.find("[data-op3-element-container]");
        var type = $wrapper.attr("data-op3-datetime-type");
        var intervalType = $wrapper.attr("data-op3-interval-type");
        var interval = $wrapper.attr("data-op3-date-interval");
        var deadline = null;

        if (type === "dynamic") {
            if (intervalType === "date") {
                interval = $wrapper.attr("data-op3-date-interval");

                if (interval === "custom")
                    interval = $wrapper.attr("data-op3-date-custom-interval");
            } else if (intervalType === "time") {
                interval = $wrapper.attr("data-op3-time-interval");
            } else if (intervalType === "day") {
                interval = $wrapper.attr("data-op3-day-interval");
            }

            deadline = new Deadline({ type: "dynamic", intervalType: intervalType, interval: interval });
        } else if (type === "specific") {
            var date = $wrapper.attr("data-op3-date-time");
            deadline = new Deadline({ type: "specific", date: date });
        }

        var dateFormat = $wrapper.attr("data-op3-date-format");
        var timeFormat = $wrapper.attr("data-op3-time-format");
        var lang = OP3 && OP3.Meta ? OP3.Meta.wpLocale.replace("_", '-') : "en-US";
        var deadlineDate = deadline.format(lang, dateFormat, timeFormat);

        $wrapper.find(".weekday").text(deadlineDate.weekday);
        $wrapper.find(".month").text(deadlineDate.month);
        $wrapper.find(".day").text(deadlineDate.day);
        $wrapper.find(".year").text(deadlineDate.year);
        $wrapper.find(".time").text(deadlineDate.time);
    });

})(jQuery, window, document);
