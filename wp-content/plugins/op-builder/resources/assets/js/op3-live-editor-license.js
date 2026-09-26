/**
 * OptimizePress3 live editor extension:
 * adding elements to sidebar and binding
 * events to it.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-storage.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    var that = window.OP3.LiveEditor;
    var proxy = window.top.OP3General;

    /**
     * Check if OP3 license is valid.
     *
     * @return {Boolean}
     */
    that.isLicenseValid = function() {
        if (proxy && typeof proxy.isLicenseValid === "function")
            return proxy.isLicenseValid();

        return true;
    };

    /**
     * Check if OP3 license is valid, show popup modal
     * on invalid one.
     *
     * @return {Boolean}
     */
    that.checkLicense = function() {
        if (proxy && typeof proxy.checkLicense === "function")
            return proxy.checkLicense();

        return true;
    };

})(jQuery, window, document);
