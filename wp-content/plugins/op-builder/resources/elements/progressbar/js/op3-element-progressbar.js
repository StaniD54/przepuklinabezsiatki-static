document.addEventListener("DOMContentLoaded", function(e) {
    // Find all the progressbar elements with animation
    // turned on.
    var elements = document.querySelectorAll('.op3-element[data-op3-element-type="progressbar"] .op3-progressbar-content[data-op-animation-toggle="1"]');
    if (!elements.length)
        return;

    // Define observer:
    // when element enters the viewport, we animate it
    // by removing no-animation class from html (see
    // progressbar/sass/op3-element.scss) and remove
    // the observe listener.
    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting)
                return;

            var element = entry.target;
            element.classList.remove("op3-progressbar-no-animaton");

            observer.unobserve(element);
        });
    });

    // Observe progressbar elements.
    elements.forEach(function(element) {
        observer.observe(element);
    });
});
