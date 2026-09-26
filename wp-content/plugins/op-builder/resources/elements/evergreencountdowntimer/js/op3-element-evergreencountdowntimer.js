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
            var parent = element.closest(".op3-element");

            return {
                uuid: parent.getAttribute("data-op3-uuid") || "",
                type: parent.getAttribute('data-op3-element-type') || "",
                unitDay: element.getAttribute('data-op3-unit-day'),
                unitHour: element.getAttribute('data-op3-unit-hour'),
                unitMin: element.getAttribute('data-op3-unit-min'),
                unitSec: element.getAttribute('data-op3-unit-sec'),
                days: parseInt(element.getAttribute("data-op3-day")) || 0,
                hrs: parseInt(element.getAttribute("data-op3-hr")) || 0,
                mins: parseInt(element.getAttribute("data-op3-min")) || 0,
                secs: parseInt(element.getAttribute("data-op3-sec")) || 0,
                finishAction: element.getAttribute("data-op3-finish-action") || "",
                redirectUrl: element.getAttribute("data-op3-redirect-url") || "",
                text: element.getAttribute("data-op3-text") || "",
                shouldRestart: parseInt(element.getAttribute("data-op3-restart-timer")) || 0,
                restartDays: parseInt(element.getAttribute("data-op3-restart-day")) || 0,
                restartHrs: parseInt(element.getAttribute("data-op3-restart-hr")) || 0,
                linked: element.getAttribute("data-op3-link-evergreen") || "",
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

            // Restart timer?
            // We need to ignore restart period when counter reaches
            // final date and use it only on page restart. Why? User
            // can set restart period to be 0, and then the counter
            // will automatically restart on finish. We do not want
            // that.
            // So, instead of just checking shouldRestart property
            // (user set restart timer) we will check tick counter in
            // event as well. If counter is zero (template updated
            // only once) means that this event occured on page
            // refresh...
            if (props.shouldRestart && !e.detail.tick) {
                var restartAfter = (props.restartDays * 24 * 60 * 60 + props.restartHrs * 60 * 60) * 1000,
                    cookieName_depricated = props.type + ":" + OP3.Meta.pageId + ":" + props.uuid,
                    cookieName = "op3-" + props.type + "-" + OP3.Meta.pageId + "-" + props.uuid,
                    oldTime = OP3.Cookie.get(cookieName_depricated) || OP3.Cookie.get(cookieName),
                    now = new Date();

                // Start new countdown.
                if (now.getTime() > parseInt(oldTime) + restartAfter) {
                    var cookieValue = now.getTime() + (props.hrs * 60 * 60 + props.mins * 60 + props.secs) * 1000;
                    OP3.Cookie.set(cookieName, cookieValue, { expires: 365 });
                    OP3.Cookie.del(cookieName_depricated);

                    new Countdown(element, {
                        finalDate: cookieValue,
                    });

                    // Do we need this???
                    // element.show();

                    return;
                }
            }

            // Unbind countdown events.
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
    document.querySelectorAll('[data-op3-element-type="evergreencountdowntimer"] .op3-evergreen-countdown-timer').forEach(function(element) {
        element.addEventListener("countdownupdate", util.handleUpdate);
        element.addEventListener("countdownfinish", util.handleFinish);

        // The ":" character should not be used as cookie-name!
        // However, for backwards compatibility we will use it
        // (so the old version preserves it's functionality).
        var props = util.getProperties(element),
            cookieName_depricated = props.type + ":" + OP3.Meta.pageId + ":" + props.uuid,
            cookieName = "op3-" + props.type + "-" + OP3.Meta.pageId + "-" + props.uuid,
            cookieValue = new Date().getTime() + ((props.days * 24 * 60 * 60 + props.hrs * 60 * 60 + props.mins * 60 + props.secs) * 1000);
        if (props.linked !== "none")
            cookieValue = OP3.Cookie.get(props.type + ":" + props.linked) || OP3.Cookie.get("op3-" + props.type + "-" + props.linked.replace(/:/g, "-")) || cookieValue;

        // Store cookie (if not already done so).
        var oldCookie = OP3.Cookie.get(cookieName_depricated) || OP3.Cookie.get(cookieName);
        if (!oldCookie)
            OP3.Cookie.set(cookieName, cookieValue, { expires: 365 });

        // Instance Countdown on element with date from
        // cookie.
        new Countdown(element, {
            finalDate: oldCookie || cookieValue,
        });
    });
});
