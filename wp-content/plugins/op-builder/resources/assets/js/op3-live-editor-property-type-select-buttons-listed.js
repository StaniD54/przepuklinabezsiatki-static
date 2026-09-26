/**
 * OptimizePress3 element type:
 * buttons from select manipulation
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="select-buttons-listed"]';

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent)
            .find(_selector)
                .selectButtons()
                .each(function() {
                    $(this).data("jquery-select-buttons").$ui.widget.addClass("jquery-select-buttons-listed-widget");
                });
    }

    /**
     * Clean:
     * destroy option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _clean = function(e, o) {
        // pass
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

})(jQuery, window, document);
