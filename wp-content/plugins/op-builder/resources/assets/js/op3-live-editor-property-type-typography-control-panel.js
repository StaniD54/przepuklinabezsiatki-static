/**
 * OptimizePress3 element type:
 * op3 element type boolean manipulation.
 *
 * Replacing select tag with 0/1 options
 * with switch toggle
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '.op3-element-options-group[data-op3-element-options-group-id="typography_control_panel"].dropdown';

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var template = ''
            +   '<div class="op3-element-options-property">'
            +       '<button type="button">' + OP3._("Typography Control Panel") + '</button>'
            +   '</div>';

        $(o.parent).find(_selector).each(function() {
            $(template)
                .on("click", "button", _handler)
                .appendTo(this);
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

    /**
     * Button click event handler
     *
     * @param  {Object} e [description]
     * @return {Void}   [description]
     */
    var _handler = function(e) {
        OP3.TypographyControlPanel.open();
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

})(jQuery, window, document);
