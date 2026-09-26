/**
 * OptimizePress3 property type:
 * border-radius manipulation
 *
 * If we have radius properties one afte another (see
 * _selector), then border radius widget will be injected
 * before the first radius property (topLeft). With css
 * all the properties are hidden except the active one
 * (which we select in our widget). Visible property is
 * positioned absolute next to widget, so the users see
 * it as part of widget.
 *
 * Beside css border radius properties (topLeft, topRight,
 * bottomRight, bottomLeft) our widget has 'all' property
 * as well. If this one is active then first radius property
 * (topLeft) will be displayed, but the changes will be
 * applyed on all of them...
 */
;(function($, window, document) {

    "use strict";

    /**
     * Selector to match:
     *
     * It would be better to use plus sign instead
     * tilde, but it's possible to inject colorpicker
     * widget after property, so we need to use tilde.
     * That means we can not use two widgets on same
     * parent (tab).
     *
     * @type {String}
     */
    var _selector = ''
        + '.op3-element-options-property[data-op3-element-options-property-name="borderTopLeftRadius"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderTopRightRadius"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderBottomRightRadius"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderBottomLeftRadius"]';

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
                // dom elements
                var $this = $(this),
                    $props = $this
                        .add($this.prevAll(_selector.replace(/~/g, ","))),
                    $inputs = $props.find(".op3-element-options-property-input");

                // create widget
                var template = ''
                        +   '<div class="op3-element-options-property op3-element-options-border-radius-wrapper" data-property-link-active="all">'
                        +       '<div class="op3-element-options-label-group">'
                        +           '<label>' + OP3._("Border Radius") + '</label>'
                        +       '</div>'
                        +       '<div class="op3-element-options-corner-boxes">'
                        +           '<div class="op3-corner-box top-left" data-property-link="topLeft"></div>'
                        +           '<div class="op3-corner-box top-right" data-property-link="topRight"></div>'
                        +           '<div class="op3-corner-box bottom-right" data-property-link="bottomRight"></div>'
                        +           '<div class="op3-corner-box bottom-left" data-property-link="bottomLeft"></div>'
                        +           '<div class="op3-corner-box all" data-property-link="all"></div>'
                        +       '</div>'
                        +   '</div>',
                    $widget = $(template).insertBefore($props.first());

                // bind corner click
                $widget
                    .on("click", "[data-property-link]", function(e) {
                        var value = $(this).attr("data-property-link");
                        $widget.attr("data-property-link-active", value);
                    });

                // bind input change
                $inputs
                    .filter('[data-op3-element-options-property-name="borderTopLeftRadius"]')
                    .on("change", function(e) {
                        if ($widget.attr("data-property-link-active") !== "all")
                            return;

                        var value = $(this).val();
                        $inputs
                            .not(this)
                            .val(value)
                            .trigger("change");
                    });
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
