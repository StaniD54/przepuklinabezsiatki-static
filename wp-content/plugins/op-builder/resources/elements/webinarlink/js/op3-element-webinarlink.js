document.addEventListener("DOMContentLoaded", function(e) {
    var elements = document.querySelectorAll('[data-op3-element-type="webinarlink"]'),
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

    // Iterate all elements and refresh element with data
    // from cookie.
    elements.forEach(function(element) {
        var html = "<p>" + data.user.live_room_url + "</p>",
            href = data.user.live_room_url;

        element.querySelector('.op3-element[data-op3-element-type="text"][data-op3-element-spec="link"] [data-op3-contenteditable]').innerHTML = html;
        element.querySelector('.op3-element[data-op3-element-type="button"] a').href = href;

        element.querySelector("[data-op3-element-container]").classList.add("op3-active");
    });
});
