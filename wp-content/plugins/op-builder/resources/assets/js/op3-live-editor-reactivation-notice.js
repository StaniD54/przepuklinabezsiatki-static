/**
 * OptimizePress3 designer extension.
 *
 * Handle closing of reactivation notice bar in the footer.
  * template layout.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Object initialization
     *
     * @return {Void}
     */
    var _init = function() {
        _bind();
    }

    /**
     * Bind events
     *
     * @return {Void}
     */
    var _bind = function() {
        $(".opjs-dismiss-reactivation-notice").on("click", dismissReactivationNotice);
    }

    /**
     * Handle "hide reactivation notice" button click.
     *
     * @param   {Event}  event
     *
     * @return  {Void}
     */
    var dismissReactivationNotice = function(event) {
        event.preventDefault();

        hideReactivationNotice();

        OP3.Ajax.request({
            url: "notices/dismiss",
            data: JSON.stringify({
                "notice": "reactivation",
                "expiration": 30 * 86400, // expiration in seconds / default 0 for indefinite
            }),
            method: "POST",
        });
    }

    /**
     * Remove reactivation notice from the DOM
     *
     * @return {Void}
     */
    var hideReactivationNotice = function() {
        $("#opb_reactivation_bar").remove();
    }

    // autoinit
    $(function() {
        _init();
    });
})(jQuery, window, document);