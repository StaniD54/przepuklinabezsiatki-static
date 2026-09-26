;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="integration"]';

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var $input = $(o.parent).find(_selector);
        if (!$input.length)
            return;

        var element = OP3.$(o.node),
            provider = element.getOption("optinIntegration", "all"),
            integration = OP3.Integrations.find(provider),
            image = integration ? integration.image : null,
            title = integration ? integration.title : null;

        $input
            .each(function() {
                var $select = $(this),
                    $wrapper = $select.closest(".op3-element-options-property");

                $wrapper
                    .css("display", "none");

                var html = ''
                    // @todo - OP3.Integration.createThumb()???
                    + '<div class="op3-element-options-thumb">'
                    + '<figure>'
                    + '<img src="' + image + '" alt="" />'
                    + '</figure>'
                    + '<span>' + title + '</span>'
                    + '<button type="button" class="op3-wizard-integration-trigger">Edit Integration</button>'
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

    /**
     * Option refresh
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _refresh = function(e, o) {
        var $property = $(o.input).closest(".op3-element-options-property"),
            $widget = $property.nextAll(".op3-element-options-thumb").first(),
            element = OP3.$(o.node),
            provider = element.getOption("optinIntegration", "all"),
            integration = OP3.Integrations.find(provider),
            image = integration ? integration.image : null,
            title = integration ? integration.title : null;

        $widget
            .find("img")
                .attr("src", image || "");
        $widget
            .find("span")
                .text(title || "");
    }

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);
    OP3.bind("elementoptionssync::*::optinIntegration", _refresh);

})(jQuery, window, document);
