
;(function($, window, document) {

    "use strict";

    $(function() {
        $('.op3-element[data-op3-element-type="tabs"]')
            .each(function() {
                var $element = $(this);
                var $container = $element.find(" > [data-op3-element-container]");

                $element.tabs({
                    headerItemSelector: ' > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabsheader"]  > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabsheaderitem"]',
                    contentItemSelector: ' > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabscontent"]  > [data-op3-element-container] > [data-op3-children] > .op3-element[data-op3-element-type="tabscontentitem"]',
                    active: $container.attr("data-op3-default-active-tab"),
                });
            });
    });

})(jQuery, window, document);
