;(function($, window, document) {

    "use strict";

    // Initialize google recaptcha
    window.op3GrecaptchaInit = function() {
        var siteKey = OP3.GoogleRecaptcha.googleRecaptchaSiteKey;

        if (!siteKey)
            return;

        $('[data-op3-element-type$="form"] form')
            .each(function() {
                // adding Recaptcha token
                var that = $(this);
                grecaptcha.ready(function () {
                    try {
                        grecaptcha.execute(siteKey, {action: 'op3optin'}).then(function (token) {
                            // remove previous hidden field
                            that.find('[name="op3-grecaptcha-token"]').remove();
                            // append hidden field with google's token
                            $('<input>').attr({
                                type: 'hidden',
                                name: 'op3-grecaptcha-token',
                                value: token
                            }).appendTo(that);

                            // show Google badge as it is needed
                            var badge = $('.grecaptcha-badge');
                            badge.show();
                            badge.css("visibility", "visible");
                        });
                    } catch (error) {
                        that.find('[name="op3-grecaptcha-token"]').remove();
                        // append hidden field with google's token
                        $('<input>').attr({
                            type: 'hidden',
                            name: 'op3-grecaptcha-token',
                            value: 'invalid'
                        }).appendTo(that);

                        console.error(error);
                    }
                });
            });

        // refresh the token every 100 seconds, as it expires after 120 seconds
        setTimeout(op3GrecaptchaInit, 100000);
    };

    // initialize
    $(function() {
        // Loading google recaptcha asyncronously
        var siteKey = OP3.GoogleRecaptcha.googleRecaptchaSiteKey;

        if (siteKey && typeof grecaptcha === "undefined") {
            var ref = document.getElementsByTagName('script')[0];
            var script = document.createElement('script');
            script.async = true;
            script.src = "https://www.google.com/recaptcha/api.js?onload=op3GrecaptchaInit&render=" + siteKey;
            ref.parentNode.insertBefore(script, ref);
        } else {
            op3GrecaptchaInit();
        }
    });

})(jQuery, window, document);
