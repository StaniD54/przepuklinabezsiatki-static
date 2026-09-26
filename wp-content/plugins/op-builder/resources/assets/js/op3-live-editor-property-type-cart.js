;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="cart"]';

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
                .each(function() {
                    var $select = $(this),
                        $wrapper = $select.closest(".op3-element-options-property");

                    $wrapper
                        .css("display", "none");

                    var html = ''
                        // @todo - OP3.Integration.createThumb()???
                        + '<div class="op3-element-options-thumb">'
                        + '<figure>'
                        + '<i class="op3-icon op3-icon-cart-in-9-1" />'
                        + '</figure>'
                        + '<span>Checkout Options</span>'
                        + '<button type="button" class="op3-wizard-cart-trigger">Checkout Options</button>'
                        + '</div>';
                    $(html)
                        .insertAfter($wrapper);
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
