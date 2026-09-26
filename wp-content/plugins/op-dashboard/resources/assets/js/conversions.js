import flatpickr from "flatpickr";
import Chart from 'chart.js/auto';

export default class Conversions {

    /**
     * Constructor.
     *
     * @return {Void}
     */
    constructor() {
        this._$ui = {};
        this._flatpickr = null;
        var that = this;

        // Wait for DOM load and init all.
        jQuery(() => {
            that._$ui.perPageSelect = jQuery('select[name="per_pg"');
            that._$ui.dateRangeInput = jQuery('.opd_leads_date_range__field');
            that._$ui.dateRangeOffsets = jQuery('.opd-date-range-offsets a');
            that._$ui.conversionsPeriodSelect = jQuery('.opd-conversions-performance-period');
            that._$ui.conversionsReportSelect = jQuery('.opd-conversions-report');
            that._$ui.chartCanvas = jQuery('#opd-reporting-chart');

            // Add events
            that._$ui.perPageSelect.on('click', that._perPageSelectChange);
            that._$ui.dateRangeOffsets.on('click', that._dateRangeOffsetClick.bind(that));
            that._$ui.conversionsPeriodSelect.on('change', that._conversionPeriodSelectChange.bind(that));
            that._$ui.conversionsReportSelect.on('change', that._conversionReportSelectChange.bind(that));

            // Init libs
            that._initFlatpickr();
            that._initChartJs();
        });
    }

    /**
     * perPage select change event handler.
     * 
     * @param {Object} e 
     * @return {Void}
     */
    _perPageSelectChange(e) {
        var $target = jQuery(e.target);
        var value = $target.val();

        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set("pg", 1);
        searchParams.set("per_pg", value);
        window.location.search = searchParams.toString();
    }

    /**
     * Date range preset click event listener.
     * 
     * @param {Object} e 
     * @return {Void}
     */
    _dateRangeOffsetClick(e) {
        e.preventDefault();

        let offset = jQuery(e.currentTarget).attr('data-date-range-offset') || 0,
            dateEnd = new Date(),
            dateStart = new Date(dateEnd.getTime() - (offset * 24 * 60 * 60 * 1000));

        dateEnd.setHours(0,0,0,0);
        dateStart.setHours(0,0,0,0);

        this._flatpickr.setDate([ dateStart, dateEnd ], true);
    }

    /**
     * Conversion period select change event handler.
     * 
     * @param {Object} e 
     * @return {Void}
     */
    _conversionPeriodSelectChange(e) {
        var $target = jQuery(e.target);
        var value = $target.val();

        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set("period", value);
        window.location.search = searchParams.toString();
    }

    /**
     * Conversion report select change event handler.
     * 
     * @param {Object} e 
     * @return {Void}
     */
    _conversionReportSelectChange(e) {
        var $target = jQuery(e.target);
        var value = $target.val();

        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set("report", value);
        window.location.search = searchParams.toString();
    }

    /**
     * Get initial data from API and 
     * initialize chart.js on myChart canvas.
     * 
     * @return {Void}
     */
    _initChartJs() {
        if (!this._$ui.chartCanvas.length)
            return;

        var report = this._$ui.conversionsReportSelect.val();
        let startDate = this._$ui.dateRangeInput.attr('data-range-start');
        let endDate = this._$ui.dateRangeInput.attr('data-range-end');
        
        jQuery.ajax({
            method: "POST",
            url: OpsScriptData.opd_api_url + 'graph',
            data: {
                report: report,
                startDate: startDate,
                endDate: endDate,
                _wpnonce: window.OpsScriptData.nonce
            },
            success: (result) => {
                if (typeof result === 'undefined' || result.status !== 200) {
                    return;
                }

                var canvas = this._$ui.chartCanvas.get(0).getContext("2d");

                new Chart(canvas, {
                    type: 'line',
                    data: {
                        labels: Object.keys(result.data.graph),
                        datasets: [{
                            label: result.data.label,
                            data: Object.values(result.data.graph),
                            fill: true,
                            borderColor: '#4249ff',
                            borderWidth: 2,
                            backgroundColor: 'rgba(66, 73, 255, 0.1)',
                            tension: 0.3,
                        }],
                    },
                    options: result.data.options,
                });
            },
            error: () => {
                window.OPDashboard.Helpers.notify("Error occurred when trying to get conversions data!", "error");
            },
        });
    }

    /**
     * Initialize flatpickr library on leads date range.
     * 
     * @return {Void}
     */
    _initFlatpickr() {
        if (!this._$ui.dateRangeInput.length)
            return;

        let rangeStart = this._$ui.dateRangeInput.attr('data-range-start');
        let rangeEnd = this._$ui.dateRangeInput.attr('data-range-end');

        this._flatpickr = flatpickr(this._$ui.dateRangeInput, {
            mode: "range",
            dateFormat: "Y-m-d",
            maxDate: new Date(),
            onChange: (selectedDates, dateStr, instance) => {
                if (selectedDates.length !== 2)
                    return;

                var dates = dateStr.split(' to ');
                var searchParams = new URLSearchParams(window.location.search)
                searchParams.set("start_date", dates[0]);
                searchParams.set("end_date", dates[1] || dates[0]);
                window.location.search = searchParams.toString();
            }
        });

        this._flatpickr.setDate([rangeStart, rangeEnd], false);
    }
}

window.OPDashboard.Conversions = new Conversions;
