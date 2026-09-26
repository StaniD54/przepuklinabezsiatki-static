/**
 * Initialize RichTextAnimation instance on all DOM
 * elements with data-rich-text-animation attribute.
 */
;(function(document, window) {
    document.querySelectorAll('.rich-text-animation[data-rich-text-animation]').forEach(function(element) {
        var animation = element.getAttribute('data-rich-text-animation'),
            classSuffix = animation
                .replace(/-(\w)/g, function(subject, group) {
                    return group.toUpperCase();
                })
                .replace(/^\w/g, function(subject) {
                    return subject.toUpperCase();
                }),
            strClass = 'RichTextAnimation' + classSuffix;

        if (typeof window[strClass] === 'function')
            (new window[strClass](element)).observe();
    });
})(document, window);
