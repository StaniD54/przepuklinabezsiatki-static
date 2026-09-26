/**
 * OptimizePress3 element type:
 * op3 property type device active manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="device-sticky"]';

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            // wrapper
            var $this = $(this);
            var $parent = $this.parent();
            var $widget = $("<div />")
                .addClass("jquery-select-buttons-widget")
                .appendTo($parent);

            // button for each device
            OP3.LiveEditor.forEachDevice(function(device, media) {
                var $button = $("<button />")
                    .addClass("jquery-select-buttons-option")
                    .attr("type", "button")
                    .attr("title", device.charAt(0).toUpperCase() + device.slice(1))
                    .attr("data-jquery-select-buttons-option-value", media)
                    .attr("data-jquery-select-buttons-option-media", media)
                    .attr("data-jquery-select-buttons-option-device", device)
                    .on("click", _click)
                    .appendTo($widget);
                $("<span />")
                    .addClass("jquery-select-buttons-option-text")
                    .text(device)
                    .appendTo($button);
                $("<span />")
                    .addClass("jquery-select-buttons-option-icon")
                    .appendTo($button);
            });

            // description
            $("<div />")
                .addClass("jquery-select-buttons-description")
                .text("None")
                .appendTo($parent);

            // hide properties
            $parent
                .closest(".op3-element-options-group")
                .find('div[data-op3-element-options-property-id="stickyActiveDesktop"], div[data-op3-element-options-property-id="stickyActiveTablet"], div[data-op3-element-options-property-id="stickyActiveMobile"]')
                .css("display", "none");

            // bind, hide and refresh
            $this
                .on("change", _change)
                .css("display", "none");
            _change.call(this);
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
     * Widget button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _click = function(e) {
        var element = OP3.Designer.activeElement();
        var device = $(this).attr("data-jquery-select-buttons-option-device");
        var prefix = "stickyActive";
        var id = prefix + (device.charAt(0).toUpperCase() + device.slice(1));
        var value = $(this).is(".jquery-select-buttons-option-selected") ? "0" : "1";

        element.setOption(id, value);
    }

    /**
     * Widget input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _change = function(e) {
        var element = OP3.Designer.activeElement();
        var $parent = $(this).parent();
        var $buttons = $parent.find(".jquery-select-buttons-option");
        var $desc = $parent.find(".jquery-select-buttons-description");
        var desc = [];

        $buttons.each(function() {
            $(this).removeClass("jquery-select-buttons-option-selected");

            var device = $(this).attr("data-jquery-select-buttons-option-device");
            var prefix = "stickyActive";
            var id = prefix + (device.charAt(0).toUpperCase() + device.slice(1));
            var selected = element.getOption(id, true);

            if (selected === "1") {
                $(this).addClass("jquery-select-buttons-option-selected");
                desc.push(device.charAt(0).toUpperCase() + device.slice(1));
            }
        });

        if (!desc.length)
            desc = "None";
        else if (desc.length === 1)
            desc = desc[0] + " Only";
        else
            desc = desc.join(" & ");
        $desc.text(desc);
    }

    /**
     * Widget input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _refresh = function(e, o) {
        $(o.parent).find(_selector).trigger("change");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

    // refresh
    OP3.bind("elementoptionssync::*::stickyActiveDesktop elementoptionssync::*::stickyActiveTablet elementoptionssync::*::stickyActiveMobile", _refresh);
})(jQuery, window, document);
