/**
 * OptimizePress3 element type:
 * op3 property type uploaded video manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="video-url-preview"]';

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        $(o.parent).find(_selector).each(function() {
            var $this = $(this);
            var $widget = $("<div />")
                .addClass("op3-video-url-preview-widget")
                .insertAfter($this);
            $("<button />")
                .addClass("op3-video-url-preview-set")
                .attr("type", "button")
                .on("click", _clickSet)
                .appendTo($widget);
            $("<button />")
                .attr("type", "button")
                .addClass("op3-video-url-preview-clear")
                .text("Remove Video")
                .on("click", _clickClear)
                .appendTo($widget);

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
     * Widget input change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _change = function(e) {
        var value = $(this).val();
        var $widget = $(this).nextAll(".op3-video-url-preview-widget:first");

        if (value)
            $widget.addClass("op3-video-url-preview-show");
        else
            $widget.removeClass("op3-video-url-preview-show");

        $widget
            .find(".op3-video-url-preview-set")
                .attr("title", value)
                .text(value ? "Replace Video" : "Set Video");
    }

    /**
     * Widget set button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickSet = function(e) {
        var $input = $(this).closest(".op3-video-url-preview-widget").prevAll(_selector + ":first");
        var value = $input.val();

        OP3.Media.modalVideo(function(attach) {
            var url = attach.url;
            if (attach.settings && attach.settings.size && attach.sizes && attach.sizes[attach.settings.size] && attach.sizes[attach.settings.size].url)
                url = attach.sizes[attach.settings.size].url;

            if (url !== value)
                $input
                    .val(url)
                    .trigger("change");

            OP3.transmit("insertmedia", {
                node: OP3.Designer.activeElement().node(),
                property: $input.attr("data-op3-element-options-property-id"),
                attachment: attach,
            });
        });
    }

    /**
     * Widget clear button click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _clickClear = function(e) {
        var $input = $(this).closest(".op3-video-url-preview-widget").prevAll(_selector).first();
        var value = $input.val();

        if (value !== "")
            $input
                .val("")
                .trigger("change");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

})(jQuery, window, document);
