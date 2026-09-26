/**
 * OptimizePress3 property type
 * op3 property type datetime manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selectors
     *
     * @type {String}
     */
    var _selector = '[data-property-type="datetime"]';
    var _timeSelector = '[data-property-type="time"]';

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            $(this).flatpickr({
                appendTo: this.parentNode,
                clickOpens: false,
                enableTime: true,
                dateFormat: "Z",
                minDate: "today",
                altInput: true,
                altFormat: "Z",
                minuteIncrement: 1,
                onReady: _flatpickrReady,
                onValueUpdate: _flatpickrUpdate,
                onOpen: _flatpickrOpen,
                onClose: _flatpickrClose,
                allowInput: true,
                confirmText: "Done",
                op3Format: true,
            });
        });

        $(o.parent).find(_timeSelector).each(function() {
            $(this).flatpickr({
                appendTo: this.parentNode,
                clickOpens: false,
                noCalendar: true,
                enableTime: true,
                enableSeconds: true,
                time_24hr: true,
                defaultHour: 0,
                defaultMinute: 0,
                altInput: true,
                altFormat: "i:S",
                dateFormat: "i:S",
                minuteIncrement: 1,
                onReady: _flatpickrReady,
                onValueUpdate: _flatpickrUpdate,
                confirmText: "Done",
                op3Format: false,
            });
        });
    };

    /**
     * Clean:
     * destroy option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _clean = function(e, o) {
        $(o.parent)
            .find(_selector + "," + _timeSelector)
            .each(function() {
                if (this._flatpickr) {
                    this._flatpickr.destroy();
                    delete this._flatpickr;
                }
            });
    }

    var _format = function(str) {
        var date;
        if (typeof str === "string")
            date = new Date(str);
        else if (str instanceof Date)
            date = str;
        else
            throw "OP3 Error: error format"

        return ""
            + ("0" + date.getUTCDate()).slice(-2)
            + "-"
            + ("0" + (date.getUTCMonth() + 1)).slice(-2)
            + "-"
            + date.getUTCFullYear()
            + " "
            + ("0" + date.getUTCHours()).slice(-2)
            + ":"
            + ("0" + date.getUTCMinutes()).slice(-2);
    }

    /**
     * Flatpickr ready event handler
     *
     * @param  {Array}  selectedDates
     * @param  {String} dateStr
     * @param  {Object} instance
     * @return {Void}
     */
    var _flatpickrReady = function(selectedDates, dateStr, instance) {
        $(instance._createElement("div", "flatpickr-confirm", instance.config.confirmText))
            .attr("tabindex", "-1")
            .on("click", instance.close)
            .appendTo(instance.calendarContainer);

        // altInput has className copied from original input
        $(instance.altInput).removeClass("op3-element-options-property-input");

        // manualy controling click events
        $(instance.config.appendTo).on("click", _click.bind(instance));

        // refresh
        _flatpickrUpdate(selectedDates, dateStr, instance);

        // autoupdate
        $(instance.element)
            .on("change", _change);
    }

    /**
     * Flatpickr updateValue event handler
     *
     * @param  {Array}  selectedDates
     * @param  {String} dateStr
     * @param  {Object} instance
     * @return {Void}
     */
    var _flatpickrUpdate = function(selectedDates, dateStr, instance) {
        if (!selectedDates.length)
            return;

        instance.setDate(dateStr);
        if (instance.config.op3Format === true)
            dateStr = _format(dateStr);

        instance.altInput.value = dateStr;
    }

    /**
     * Flatpickr open event.
     *
     * Using this event to fix OP3-2338 problem
     * until https://github.com/flatpickr/flatpickr/pull/2252 is merged into new version.
     *
     * @param {Array} selectedDates
     * @param {String} dateStr
     * @param {Object} instance
     */
    var _flatpickrOpen = function(selectedDates, dateStr, instance) {
        // This as quick solution to OP3-2338
        //
        $(instance.altInput).prop('readonly', true);
    }

    /**
     * Flatpickr close event
     *
     * Using this event to fix OP3-2338 problem
     * until https://github.com/flatpickr/flatpickr/pull/2252 is merged into new version.
     *
     * @param {Array} selectedDates
     * @param {String} dateStr
     * @param {Object} instance
     */
    var _flatpickrClose = function(selectedDates, dateStr, instance) {
        var $input = $(instance.altInput);
        $input.prop('readonly', false);
        $input.blur();
    }

    var _change = function(e) {
        var node = e.target;
        var instance = node._flatpickr;
        var dateStr = node.value;
        var selectedDates = [null];

        _flatpickrUpdate(selectedDates, dateStr, instance);
    }

    /**
     * Flatpickr click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _click = function(e) {
        // toggle open/close on input click
        if ($(e.target).closest(".flatpickr-input").length) {
            if (this.isOpen)
                this.close();
            else
                this.open();
        }

        // close on non-calendar element click
        else if (!$(e.target).closest(".flatpickr-calendar").length && this.isOpen)
            this.close();
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

})(jQuery, window, document);
