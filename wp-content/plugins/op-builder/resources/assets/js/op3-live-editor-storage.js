/**
 * OptimizePress3 storage object:
 * local storage helper.
 *
 * Dependencies:
 *     - op3-core.js
 *     - op3-storage.js
 */
;(function(window, document) {

    "use strict";

    // link (wrapper)
    OP3.bind("load::liveeditor", function(e, o) {
        if (window !== window.parent) {
            window.parent.OP3.LocalStorage = window.OP3.LocalStorage;
            window.parent.OP3.SessionStorage = window.OP3.SessionStorage;
        }
    });

    // link (designer)
    OP3.bind("load::designer", function(e, o) {
        e.origin.LocalStorage = window.OP3.LocalStorage;
        e.origin.SessionStorage = window.OP3.SessionStorage;
    });

})(window, document);
