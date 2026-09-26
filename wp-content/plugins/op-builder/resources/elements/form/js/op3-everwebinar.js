
;(function($, window, document) {

    "use strict";

    /**
     * Get everwebinar schedules from API.
     *
     * @param {String} listId
     * @param {String} timezone
     * @param {Function} callback
     * @param {Void}
     */
    var getSchedules = function(listId, timezone, callback) {
        $.ajax({
            url: OP3.Meta.homeUrl + '/wp-json/op3/v1/optin/integrations/everwebinar/publicData',
            data: {
                integration: "everwebinar",
                timezone: timezone || "Europe/London",
                listId: listId  || "1",
            },
            success: function(data, textStatus, jqXHR) {
                if (typeof callback === "function")
                    return callback(data.data);

                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var message = jqXHR.responseJSON.message;
                throw "Optimizepress: " + message;
            },
        });
    };

    /**
     * Timezone dropdown change event handler.
     * Update webinar schedules dropdown with new dates.
     *
     * @param {Object} e
     * @return {Void}
     */
    var _timezoneDropdownChange = function(e) {
        var $target = $(e.target);
        var timezone = $target.val();
        var $form = $target.closest("form");
        var listId = $form.find('input[name="optin-list"]').val();
        var $scheduleDropdown = $form.find('[name="schedule"]');

        _updateTimezoneDropdown(listId, timezone, $scheduleDropdown);
    }

    /**
     * Schedule dropdown change event handler.
     * When schedule dropdown is changed update date input.
     *
     * @param {Object} e
     * @return {Void}
     */
    var _handleScheduleDropdownChange = function(e) {
        var $target = $(e.target);
        var $form = $target.closest("form");
        var $dateInput = $form.find('input[name="date"]');
        var date = $('option:selected', this).attr('data-webinar-date');

        $dateInput.val(date);
    }

    /**
     * Get new schedule date and append it to schedule dropdown
     *
     * @param {String} listId
     * @param {String} timezone
     * @param {Object} $scheduleDropdown
     * @return {Void}
     */
    var _updateTimezoneDropdown = function(listId, timezone, $scheduleDropdown) {
        getSchedules(listId, timezone, function(data) {
            $scheduleDropdown
                .find('option:not([value=""])')
                .remove();

            var locale = OP3 && OP3.Meta ? OP3.Meta.wpLocale.replace("_", '-') : "en-US";
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: true, minute: 'numeric' };

            // Update schedule select with new options
            $.each(data.webinar.schedules, function(key, value) {
                var type = value.comment.toLowerCase().replace(/\s/g, '');
                var date = new Date(value.date.replace(/-/g, "/"));
                var localizedDate = type === "instantreplay" ? "Watch yesterday's replay now" : date.toLocaleDateString(locale, options);

                $scheduleDropdown.append('<option value="' + value.schedule + '" data-webinar-date="' + value.date + '" data-webinar-type="' + type + '">' + localizedDate + '</option>');
            });

            // Autoselect first
            if (data.webinar && data.webinar.schedules && data.webinar.schedules[0]) {
                $scheduleDropdown
                    .val(data.webinar.schedules[0].schedule)
                    .trigger("change");
            }
        });
    }

    var $optinIntegrationInput = $('[data-op3-element-type="form"] input[value="everwebinar"]');

    // Check if there is op3 form with everwebinar integration
    if (!$optinIntegrationInput.length)
        return;

    $optinIntegrationInput.each(function() {
        var $form = $(this).closest("form");
        var listId = $form.find('input[name="optin-list"]').val();
        var userTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
        var $timezoneDropdown = $form.find('select[name="timezone"]');

        var $scheduleDropdown = $form.find('[name="schedule"]');
        _updateTimezoneDropdown(listId, userTimezone, $scheduleDropdown);

        // Set autodetected timezone
        if ($timezoneDropdown.length) {
            $timezoneDropdown
                .val(userTimezone)
                .on("change", _timezoneDropdownChange);
        }

        $scheduleDropdown.on("change", _handleScheduleDropdownChange)
    });


})(jQuery, window, document);
