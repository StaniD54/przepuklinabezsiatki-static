export default class Recaptcha {

    /**
     * Init recaptcha
     *
     * @returns {Void“}
     */
    init() {
        this.addEvents();
    }

    /**
     * Register events
     *
     * @returns {Void}
     */
    addEvents() {
        jQuery('.opd-recaptcha-connect').on('click', this.recaptchaConnectClick.bind(this));
        jQuery('.opd-recaptcha-disconnect').on('click', this.recaptchaDisconnectClick.bind(this));
    }

    /**
     * Google recaptch connect button click event handler
     *
     * @param {Object} e
     * @returns {Void}
     */
    recaptchaConnectClick(e) {
        e.preventDefault();

        let $target = jQuery(e.target);
        let $form = $target.closest('form');
        let secretKey = $form.find('input[name="opd_recaptcha_secret_key"]').val();
        let siteKey = $form.find('input[name="opd_recaptcha_site_key"]').val();

        $target.prop('disabled', true);

        Promise.all([
            this.verifyRecaptchaSiteKey(siteKey),
            this.verifyRecaptchaSecretKey(secretKey)
        ])
        .then(([isValidSiteKey, isValidSecretKey]) => {
            if (isValidSiteKey && isValidSecretKey) {
                jQuery.ajax({
                    url: OpsScriptData.ajax_url,
                    method: 'post',
                    data: {
                        action: 'opd_receptcha_connect',
                        opd_recaptcha_site_key: siteKey,
                        opd_recaptcha_secret_key: secretKey,
                        _wpnonce: OpsScriptData.nonce,
                    },
                    success: function (response) {
                        if (response['success']) {
                            window.OPDashboard.Helpers.notify("Google ReCaptcha Connected", "success");
                            location.reload();
                        }
                    },
                    error: function (response) {
                        window.OPDashboard.Helpers.notify("Error occurred while trying to connect ReCaptcha account.", "error");
                    }
                });
            }

            $target.prop('disabled', false);
        })
    }

    /**
     * Google recaptcha site key verification
     *
     * @param {String} siteKey
     * @returns {Boolean}
     */
    async verifyRecaptchaSiteKey(siteKey) {
        var that = this;
        return new Promise(function(resolve, reject) {
            that.loadRecaptchaScript(function() {
                // Validate site key
                if (typeof grecaptcha !== "undefined") {
                    grecaptcha.ready(function () {
                        try {
                            grecaptcha
                                .execute(siteKey, { action: 'op3Action' })
                                .then(function () {
                                    resolve(true);
                                });
                        } catch (error) {
                            window.OPDashboard.Helpers.notify("Invalid Google ReCaptcha v3 Site Key", "error");
                            resolve(false);
                        }
                    });
                }
            })
        });
    }

    /**
     * Google recaptcha secret key verification
     *
     * @param {String} secretKey
     * @returns {Boolean}
     */
    verifyRecaptchaSecretKey(secretKey) {
        return new Promise(function (resolve, reject) {
            jQuery.ajax({
                url: OpsScriptData.ajax_url,
                method: 'post',
                data: {
                    action: 'opd_receptcha_secret_key',
                    _wpnonce: OpsScriptData.nonce,
                    secret: secretKey,
                    response: '',
                },
                success: function (response) {
                    if (response.success && response.correct)
                        return resolve(true);

                    window.OPDashboard.Helpers.notify("Invalid Google ReCaptcha v3 Secret Key.", "error");

                    return resolve(false);
                },
                error: function (response) {
                    window.OPDashboard.Helpers.notify("Error occurred while trying to validate ReCaptcha secret key.", "error");
                    return false;
                }
            });
        });
    }

    /**
     * Load google recaptch js script asyncronously
     * We are loading recaptcha script because there is no other
     * way to validate site key
     *
     * @returns {Void}
     */
    loadRecaptchaScript(callback) {
        if (window.grecaptcha)
            window.grecaptcha = null;

        window.recaptchaLoaded = function() {
            callback();
        }

        let siteKey = jQuery('input[name="opd_recaptcha_site_key').val();
        let ref = document.getElementsByTagName('script')[0];
        let script = document.createElement('script');
        script.async = true;
        script.src = "https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded&render=" + siteKey;
        ref.parentNode.insertBefore(script, ref);
    }

    /**
     * Google recpatch disconnect button click event handler
     *
     * @param {Object} e
     * @returns {Void}
     */
    recaptchaDisconnectClick(e) {
        jQuery.ajax({
            url: OpsScriptData.ajax_url,
            method: 'get',
            data: {
                action: 'opd_receptcha_disconnect',
                _wpnonce: OpsScriptData.nonce,
            },
            success: function (response) {
                if (response['success']) {
                    window.OPDashboard.Helpers.notify("Google ReCaptcha Disconnected", "success");
                    location.reload();
                }
            },
            error: function (response) {
                window.OPDashboard.Helpers.notify("Error occurred while trying to disconnect ReCaptcha account.", "error");
            }
        });
    }
}

window.OPDashboard.Recaptcha = new Recaptcha;
jQuery(function() { window.OPDashboard.Recaptcha.init(); });
