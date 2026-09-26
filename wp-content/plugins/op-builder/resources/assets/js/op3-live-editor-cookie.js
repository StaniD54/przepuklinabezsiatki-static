/**
 * OptimizePress3 cookie object:
 * cookie helper.
 *
 * Dependencies:
 *     - op3-core.js
 *     - op3-cookie.js
 */
;(function(window, document) {

    "use strict";

    // link (wrapper)
    OP3.bind("load::liveeditor", function(e, o) {
        if (window !== window.parent)
            window.parent.OP3.Cookie = window.OP3.Cookie;
    });

    // link (designer)
    OP3.bind("load::designer", function(e, o) {
        e.origin.Cookie = window.OP3.Cookie;
    });

})(window, document);
