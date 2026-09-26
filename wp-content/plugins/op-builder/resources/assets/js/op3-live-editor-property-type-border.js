/**
 * OptimizePress3 property type:
 * border (width/style/color) manipulation
 *
 * If we have border properties one afte another (see
 * _selector), then border widget will be injected
 * before the first border property (topWidth). With css
 * all the properties are hidden except the active one
 * (which we select in our widget). Visible properties
 * are positioned absolute next to widget, so the users
 * see them as part of widget.
 *
 * Beside css border property groups (top, right, bottom,
 * left) our widget has 'all' property group as well. If
 * this one is active then first property group (top) will
 * be displayed, but the changes will be applyed on all of
 * them...
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
        + '.op3-element-options-property[data-op3-element-options-property-name="borderTopWidth"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderTopStyle"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderTopColor"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderRightWidth"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderRightStyle"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderRightColor"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderBottomWidth"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderBottomStyle"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderBottomColor"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderLeftWidth"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderLeftStyle"]'
        + ' ~ .op3-element-options-property[data-op3-element-options-property-name="borderLeftColor"]';

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
                        +   '<div class="op3-element-options-property op3-element-options-border-wrapper" data-property-link-active="all">'
                        +       '<div class="op3-element-options-label-group">'
                        +           '<label>' + OP3._("Border Active") + '</label>'
                        +       '</div>'
                        +       '<div class="op3-element-options-corner-boxes">'
                        +           '<div data-property-link="top"></div>'
                        +           '<div data-property-link="right"></div>'
                        +           '<div data-property-link="bottom"></div>'
                        +           '<div data-property-link="left"></div>'
                        +           '<div data-property-link="all"></div>'
                        +       '</div>'
                        +   '</div>',
                    $widget = $(template).insertBefore($props.first());

                // bind corner click: set active property group
                $widget
                    .on("click", "[data-property-link]", function(e) {
                        var value = $(this).attr("data-property-link");
                        $widget.attr("data-property-link-active", value);
                    });

                // bind input change: link properties
                $inputs
                    .filter('[data-op3-element-options-property-name^="borderTop"]')
                    .on("change", function(e) {
                        if ($widget.attr("data-property-link-active") !== "all")
                            return;

                        var name = $(this).attr("data-op3-element-options-property-name"),
                            prefix = "border",
                            suffix = name.match(/[A-Z][a-z]*$/)[0],
                            value = $(this).val();
                        $inputs
                            .filter('[data-op3-element-options-property-name^="' + prefix + '"][data-op3-element-options-property-name$="' + suffix + '"]')
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

    /**
     * Change:
     * auto set border-color and border-width
     * on border-style change
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _change = function(e, o) {
        var element = OP3.$(o.node),
            media = o.media,
            propWidthId = o.id.replace(/Style/, "Width"),
            propWidthDefault = "0px",
            propWidthValue = element.getOptionClosest(propWidthId, media);
        if (!propWidthValue)
            propWidthValue = element.getOption(propWidthId, true) || propWidthDefault;

        // force border-width to 1px and border-color
        // to black when border-style is changed from
        // none to something else
        if ((o.value.before === "none" || o.value.before === null) && o.value.after !== "none" && propWidthValue === propWidthDefault) {
            element.setOption(propWidthId, "1px", media);

            var propColorId = o.id.replace(/Style/, "Color"),
                propColorValue = element.getOptionClosest(propColorId, media);
            if (!propColorValue)
                propColorValue = element.getOption(propColorId, true);

            // force opacity
            var color = new Color(propColorValue);
            if (color && color._a === 0) {
                color._a = 1;
                propColorValue = color.toString();

                element.setOption(propColorId, propColorValue, media);
            }
        }

        // remove border-width if border-style is set
        // to none
        else if (o.value.after === "none")
            element.setOption(propWidthId, propWidthDefault, media);
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);
    OP3.bind("elementchange::*::borderTopStyle elementchange::*::borderBottomStyle elementchange::*::borderLeftStyle elementchange::*::borderRightStyle", _change);

})(jQuery, window, document);
