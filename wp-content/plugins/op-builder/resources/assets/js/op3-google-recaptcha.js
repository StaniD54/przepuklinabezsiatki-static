/**
 * Optimizepress google receptcha data
 */
;(function($, window, document) {

    "use strict";

    // globalize (designer)
    window.OP3.GoogleRecaptcha = null;

    // import google recaptcha credentials from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        OP3.GoogleRecaptcha = o.google_recaptcha;
    });

})(jQuery, window, document);
