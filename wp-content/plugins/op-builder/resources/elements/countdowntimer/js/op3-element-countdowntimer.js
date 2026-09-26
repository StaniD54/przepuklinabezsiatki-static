document.addEventListener("DOMContentLoaded", function(e) {
    var util = {
        /**
         * Escape HTML: HTML entities encode.
         *
         * @param  {String} str
         * @return {String}
         */
        escapeHtml: function(str) {
            var text = document.createElement("textarea");
            text.innerText = str;

            return text.innerHTML;
        },

        /**
         * Get OP3 properties from element.
         *
         * @param  {HTMLElement} element
         * @return {Object}
         */
        getProperties: function(element) {
            return {
                dateTime: element.getAttribute("data-op3-date-time"),
                unitDay: element.getAttribute("data-op3-unit-day"),
                unitHour: element.getAttribute("data-op3-unit-hour"),
                unitMin: element.getAttribute("data-op3-unit-min"),
                unitSec: element.getAttribute("data-op3-unit-sec"),
                redirectUrl: element.getAttribute("data-op3-redirect-url"),
                finishAction: element.getAttribute("data-op3-finish-action"),
            };
        },

        /**
         * Countdown update event handler:
         * apply template to element.
         *
         * @param  {Event} e
         * @return {Void}
         */
        handleUpdate: function(e) {
            var element = e.target,
                strftime = e.detail.strftime,
                offsetDay = strftime("%D"),
                offestHour = strftime("%H"),
                offsetMin = strftime("%M"),
                props = util.getProperties(element),
                template = '',
                templateDay = ''
                    +   '<div class="wrapper day">'
                    +       '<span class="digits day">%D</span><span class="units day">' + util.escapeHtml(props.unitDay) + '</span>'
                    +   '</div>',
                templateHour = ''
                    +   '<div class="wrapper hr">'
                    +       '<span class="digits hr">%H</span><span class="units hr">' + util.escapeHtml(props.unitHour) + '</span>'
                    +   '</div>',
                templateMin = ''
                    +   '<div class="wrapper min">'
                    +       '<span class="digits min">%M</span><span class="units min">' + util.escapeHtml(props.unitMin) + '</span>'
                    +   '</div>',
                templateSec = ''
                    +   '<div class="wrapper sec">'
                    +       '<span class="digits sec">%S</span><span class="units sec">' + util.escapeHtml(props.unitSec) + '</span>'
                    +   '</div>';

            // Choose the right template...
            if (offsetDay == 0 && offestHour == 0 && offsetMin == 0)
                template = templateSec;
            else if (offestHour == 0 && offsetMin == 0)
                template = templateMin + templateSec;
            else if (offsetDay == 0)
                template = templateHour + templateMin + templateSec;
            else
                template = templateDay + templateHour + templateMin + templateSec;

            // ...and apply it to element.
            element.innerHTML = strftime(template);
        },

        /**
         * Countdown finish event handler:
         * apply finish action to element.
         *
         * @param  {Event} e
         * @return {Void}
         */
        handleFinish: function(e) {
            var element = e.target,
                props = util.getProperties(element);

            // No need for Countdown instance any more.
            element._countdown.destroy();
            element.removeEventListener("countdownupdate", util.handleUpdate);
            element.removeEventListener("countdownfinish", util.handleFinish);

            // Apply finish action.
            if (props.finishAction === "redirect") {
                if (props.redirectUrl)
                    window.location.replace(props.redirectUrl);
            }
            else if (props.finishAction === "text") {
                element.style.display = "none";
                element.closest(".op3-element").querySelector('.op3-element[data-op3-element-type="headline"]').style.display = "block";
            }
            else if (props.finishAction === "hide")
                element.style.display = "none";
        },
    };

    // Iterate each countdowntimer element and init
    // Countdown instance on it.
    document.querySelectorAll('[data-op3-element-type="countdowntimer"] .op3-countdown-timer').forEach(function(element) {
        element.addEventListener("countdownupdate", util.handleUpdate);
        element.addEventListener("countdownfinish", util.handleFinish);

        var props = util.getProperties(element);
        new Countdown(element, {
            finalDate: props.dateTime,
        });
    });
});
