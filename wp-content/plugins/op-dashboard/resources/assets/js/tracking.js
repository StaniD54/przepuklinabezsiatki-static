;(function($, window, document) {

    "use strict";

    var $forms = null;

    /**
     * Register pageview.
     *
     * @param {String} pageId
     * @returns {Void}
     */
    const track = (pageId) => {
        $.ajax({
            method: "POST",
            url: window.OPDashboardStats.rest_url,
            data: {
                pid: pageId,
                referer: document.referrer,
                currentUrl: window.location.href,
                _wpnonce: window.OPDashboardStats.nonce
            }
        }).done((result) => {
            if (typeof result === 'undefined' || result.status !== 200) {
                return;
            }

            $forms
                .each(function() {
                    $('<input>').attr({
                        type: 'hidden',
                        id: 'pageview_record_id',
                        name: 'pageview_record_id',
                        value: result.data.pageview_record_id
                    }).appendTo($(this));
                });

            window.OPDashboardStats.pageview_record_id = result.data.pageview_record_id;
        });
    }

    $(document).ready(function() {
        $forms = $('.op3-element[data-op3-element-type="form"] form, form[data-op3-form="op3-smart-form"], .op3-element[data-op3-element-type="contactform"] form');
        
        // Register pageview only if there is op3 or smart-theme-3 form on page
        if ($forms.length && OPDashboardStats && OPDashboardStats.pid) {
            track(OPDashboardStats.pid);
        }
    });

})(jQuery, window, document);