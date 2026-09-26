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
    var _selector = '[data-property-type="select-buttons"]';

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

            // intercept "select already selected" event
            .on("jqueryselectbuttons:changeignore", function(e) {
                var $this = $(this),
                    element = OP3.Designer.activeElement(),
                    node = element.node(),
                    uuid = element.uuid(),
                    type = element.type(),
                    name = $this.attr("data-op3-element-options-property-name"),
                    emit = {
                        node: node,
                        uuid: uuid,
                        type: type,
                        media: $this.attr("data-op3-element-options-property-media"),
                        id: $this.attr("data-op3-element-options-property-id"),
                        name: name,
                        value: $this.val(),
                    };

                OP3.transmit("elementchangeignored", emit);
                OP3.transmit("elementchangeignored::" + emit.type, emit);
                OP3.transmit("elementchangeignored::*::" + emit.name, emit);
                OP3.transmit("elementchangeignored::" + emit.type + "::" + emit.name, emit);
            });
    }

    /**
     * Clean: destroy library
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
