/**
 * OptimizePress3 calendar object:
 * calendar link generator.
 *
 * Dependencies:
 *     - op3-core.js
 *     - op3-calendar.js
 */
;(function(window, document) {

    "use strict";

    // link (wrapper)
    OP3.bind("load::liveeditor", function(e, o) {
        if (window !== window.parent)
            window.parent.OP3.Calendar = window.OP3.Calendar;
    });

    // link (designer)
    OP3.bind("load::designer", function(e, o) {
        e.origin.Calendar = window.OP3.Calendar;
    });

})(window, document);
