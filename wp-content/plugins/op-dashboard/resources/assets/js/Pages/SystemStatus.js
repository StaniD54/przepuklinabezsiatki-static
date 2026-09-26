class OPDSystemStatus {
    constructor() {
        /**
         * Copy to clipboard button
         *
         * @type {jQuery}
         */
        this.$copyToClipboardButton = null;

        /**
         * System status table
         *
         * @type {jQuery}
         */
        this.$systemStatusTable = null;

        this['jQueryInit']();
    }

    /**
     * jQuery initialization
     */
    ['jQueryInit']() {
        let _this = this;

        (function ($) {
            $(document).ready(() => {
                _this.$copyToClipboardButton = $('.opd-system-status-copy-to-clipboard')
                    .on('click', _this.copyToClipboardButtonClick.bind(_this));

                _this.$systemStatusTable = $('.opd-system-status-table');

                // Display copy to clipboard button
                // only if site has ssl certificate
                // because Clipoard js api is only available then
                if (location.protocol === "https:") {
                    $('.opd-system-status-copy-to-clipboard').show();
                }
            });
        })(jQuery);
    }

    /**
     * Copy system status table to clipboard
     *
     * @param {Object} e
     */
    copyToClipboardButtonClick(e) {
        if (typeof navigator.clipboard === "undefined") {
            return window.OPDashboard.Helpers.notify("Clipboard API not available!", "error");
        }

        if (navigator.clipboard.writeText) {
            var textToCopy = [];
            var that = this;

            (function ($) {
                that.$systemStatusTable
                    .find("tr")
                    .each(function(index, value) {
                        var $tr = $(value),
                            $label = $tr.find(".label"),
                            $message = $tr.find(".message");

                        textToCopy.push($label.text() + ": " + $message.text() + "\r\n");
                    });
            })(jQuery);

            navigator.clipboard
                .writeText(textToCopy.join(""))
                .then(function() {
                    window.OPDashboard.Helpers.notify("Copied to clipboard.", "success");
                })
                .catch(function(error) {
                    return  window.OPDashboard.Helpers.notify("Something went wrong while copying to clipboard!", "error");
                })
        }
    }

}

export default OPDSystemStatus