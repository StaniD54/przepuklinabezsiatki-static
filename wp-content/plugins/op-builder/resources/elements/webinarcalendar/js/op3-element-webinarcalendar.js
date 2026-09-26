document.addEventListener("DOMContentLoaded", function(e) {
    var elements = document.querySelectorAll('[data-op3-element-type="webinarcalendar"]'),
        data = OP3.Cookie.get("op3-webinar-response"),
        webinarDate;

    // Get everwebinar date from response stored in cookie.
    try {
        data = data ? JSON.parse(data) : null;
        webinarDate = new Date(data.user.date.replace(/-/g, "/"));
    }
    catch(ex) {
        data = null;

        // For testing purpose you can set your cookie by executing
        // this code in console:
        // OP3.Cookie.set('op3-webinar-response', '{"user":{"date":"2030-01-01","live_room_url":"https://www.google.com"}}');
    }

    // No valid date in cookie, remove all elements.
    elements = Array.prototype.slice.call(elements);
    if (!data || !webinarDate || isNaN(webinarDate.getTime())) {
        elements.forEach(function(element) {
            element.parentElement.removeChild(element);
        });

        return;
    }

    // Iterate all elements and refresh element with data
    // from cookie.
    elements.forEach(function(element) {
        var svgs = element.querySelectorAll('svg');
        svgs = Array.prototype.slice.call(svgs);

        svgs.forEach(function(svg) {
            var method = svg.getAttribute("data-op3-calendar-type") || "",
                link = svg.closest("a"),
                href = OP3.Calendar[method].call(OP3.Calendar, {
                    title: "Webinar",
                    start: new Date(data.user.date.replace(" ", "T")),
                    duration: 60,
                    description: "Everwebinar " + data.user.live_room_url,
                });

            link.href = href;
        });

        element.querySelector("[data-op3-element-container]").classList.add("op3-active");
    });
});
