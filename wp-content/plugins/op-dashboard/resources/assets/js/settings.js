export default class Settings {

    /**
     * Init integrations
     */
    init() {
        this.addEvents();
    }

    /**
     * Register events
     *
     * @return {Void}
     */
    addEvents() {
        jQuery('.ops-js-clear-cache').on('click', this.clearCache);
        jQuery('.ops-js-clear-revisions').click('click', this.clearRevisions);
        jQuery('.opd-product-list-item-op-smart-theme3 .ops-button').on('click', this.smartThemeActivation);
    }

    /**
     * Clear cache button click event handler
     *
     * @param {Object} e
     * @returns {Void}
     */
    clearCache(e) {
        let $el = jQuery(this);
        let url = $el.data('url');
        let confirmMessage = $el.data('confirm') || "Are you sure you want to delete OptimizePress cache?";

        if (confirm(confirmMessage)) {
            let nonce = null
                || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : "")
                || (window.OpsScriptData && OpsScriptData.nonce ? OpsScriptData.nonce : "")
                || "";

            jQuery.ajax({
                url: url,
                method: 'post',
                data: { _wpnonce: nonce },
                success: function () {
                    window.OPDashboard.Helpers.notify("The cache was cleared.", "success");
                },
                error: function () {
                    window.OPDashboard.Helpers.notify("Error occurred when clearing the cache.", "error");
                }
            });
        }

        e.preventDefault();
    }

    /**
     * Clear revisions button click event handler
     *
     * @param {Object} e
     * @returns {Void}
     */
    clearRevisions(e) {
        let $el = jQuery(this);
        let url = $el.data('url');
        let confirmMessage = $el.data('confirm');

        if (confirm(confirmMessage)) {
            let nonce = null
                || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : "")
                || (window.OpsScriptData && OpsScriptData.nonce ? OpsScriptData.nonce : "")
                || "";

            jQuery.ajax({
                url: url,
                method: 'post',
                data: { _wpnonce: nonce },
                success: function (response) {
                    if (response.success) {
                        window.OPDashboard.Helpers.notify(response.data.message, "success");
                    } else {
                        window.OPDashboard.Helpers.notify(response.data.message, "error");
                    }
                },
                error: function () {
                    window.OPDashboard.Helpers.notify("Error occurred when clearing revisions.", "error");
                }
            });
        }

        e.preventDefault();
    }

    /**
     * Smart theme activation button click event handler
     *
     * @param {Object} e
     * @returns {Void}
     */
    smartThemeActivation(e) {
        let opsButton = jQuery(e.target);
        if (opsButton.hasClass("ops-transparent"))
            return;

        e.preventDefault();
        let dialogOptions = window.OP3General.dialogOptions;
        window.OP3General.confirm(
            Object.assign(dialogOptions, {
                theme: 'optimizepress,optimizepress-mini',
                title: 'Smart Theme v3',
                content: () => {
                    return '<p>Are you sure you want to activate Optimizepress Smart Theme v3? This will deactivate you current active WordPress theme.</p>'
                },
                buttons: {
                    confirm: {
                        text: "Confirm",
                        btnClass: 'btn-green',
                        action: function() {
                            let href = opsButton.attr("href");
                            window.location.href = href;
                        }
                    },
                    cancel: {
                        text: "Cancel",
                    }
                }
            })
        );
    }
}

window.OPDashboard.Settings = new Settings;
jQuery(function() { window.OPDashboard.Settings.init(); });
