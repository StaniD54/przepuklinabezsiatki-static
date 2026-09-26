document.addEventListener("DOMContentLoaded", function(e) {
    // Convert URL params to key/value object.
    var urlParams = window.location.search
        .slice(1)
        .split("&")
        .map(function(value) {
            var arr = value.split("=");
            while (arr.length < 2)
                arr.push("");

            var key = arr[0],
                value = arr.slice(1).join("=");

            return [ key, value ];
        })
        .reduce(function(obj, pair) {
            var arr = pair.map(decodeURIComponent),
                key = arr[0],
                value = arr[1],
                exists = key in obj;

            if (exists && typeof obj[key] === "string")
                obj[key] = [ obj[key], value ];
            else if (exists)
                obj[key].push(value);
            else
                obj[key] = value;

            return obj;
        }, {});

    // Iterate each URL param and build selector (optiomized
    // DOM query select).
    var selector = '';
    for (var key in urlParams) {
        if (key)
            selector += (selector ? ',' : '')
                + '.op3-element [data-op-url-mapping="' + key + '"]'
                + ':not(:disabled):not(input:read-only)';
    }
    if (!selector)
        return;

    // Find field from URL params and set its value.
    document.querySelectorAll(selector).forEach(function(element) {
        var key = element.getAttribute("data-op-url-mapping"),
            value = urlParams[key];

        // Validate value.
        if (element.matches("select")) {
            if (element.querySelector('option[value="' + value + '"]'))
                element.value = value;
        }
        else if (element.matches('input[type="checkbox"],input[type="radio"]'))
            element.checked = [ "false", "unchecked", "none", "0", "" ].indexOf(value) === -1;
        else
            element.value = value;
    });
});
