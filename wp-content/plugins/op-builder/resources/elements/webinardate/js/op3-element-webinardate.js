document.addEventListener("DOMContentLoaded", function(e) {
    var elements = document.querySelectorAll('[data-op3-element-type="webinardate"]'),
        data = OP3.Cookie.get("op3-webinar-response"),
        webinarDate;

    // Get everwebinar date from response stored in cookie.
    try {
        data = data ? JSON.parse(data) : null;
        webinarDate = new Date(data.user.date.replace(/-/g, "/"));
    }
    catch(ex) {
        data = null;
    }

    // No valid date in cookie, remove all elements.
    elements = Array.prototype.slice.call(elements);
    if (!data || !webinarDate || isNaN(webinarDate.getTime())) {
        elements.forEach(function(element) {
            element.parentElement.removeChild(element);
        });

        return;
    }

    // Date format.
    var dayNumber = webinarDate.getDate(),
        monthName = webinarDate.toLocaleString("default", { month: "long" }),
        dayName = webinarDate.toLocaleDateString("default", { weekday: "long" }),
        dateFormated = dayName + ", " + dayNumber + " " + monthName + ", " + webinarDate.getFullYear();
        webinarMinutes = webinarDate.getMinutes(),
        webinarHours = webinarDate.getHours(),
        timezone = (webinarHours < 10 ? "0" : "") + webinarHours + ":" +  (webinarMinutes < 10 ? "0" : "") + webinarMinutes + " (" + data.user.timezone + ")";

    // Iterate all elements and refresh element with data
    // from cookie.
    elements.forEach(function(element) {
        element.querySelector(".op3-webinar-day").innerText = dayNumber;
        element.querySelector(".op3-webinar-month").innerText = monthName;
        element.querySelector(".op3-webinar-date").innerText = dateFormated;
        element.querySelector(".op3-webinar-timezone-value").innerText = timezone;

        element.querySelector("[data-op3-element-container]").classList.add("op3-active");
    });
});
