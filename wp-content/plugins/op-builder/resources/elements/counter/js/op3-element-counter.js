document.addEventListener("DOMContentLoaded", function(e) {
    document.querySelectorAll('[data-op3-element-type="counter"] .op3-counter').forEach(function(element) {
        element.addEventListener("counterfinished", function(e) {
            e.target._counter.destroy();
        });

        new Counter(element, {
            start: parseFloat(element.getAttribute("data-op3-counter-start")),
            end: parseFloat(element.getAttribute("data-op3-counter-end")),
            duration: parseFloat(element.getAttribute("data-op3-counter-animation-duration")) * 1000,
            separator: element.getAttribute("data-op3-counter-separator"),
        });
    });
});
