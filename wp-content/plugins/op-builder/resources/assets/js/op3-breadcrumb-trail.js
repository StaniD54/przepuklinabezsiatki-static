/**
 * OptimizePress3 designer:
 * page builder.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-ajax.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Menus object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Data from API
         *
         * @type {Array}
         */
        _data: [],

        json: {
            page_id: OP3.Meta.pageId,
        },

        /**
         * Refresh data
         * (API request)
         *
         * @return {Void}
         */
        refresh: function() {
            that._data = [];

            OP3.Ajax.request({
                url: "breadcrumb-pages",
                data: JSON.stringify(json),
                success: that._handleAjax,
                pageId
            });
        },

        /**
         * Get data
         *
         * @return {Array}
         */
        data: function() {
            return that._data;
        },

        /**
         * Menu as NodeList (null on fail)
         *
         * IMPORTANT: if you're changing render
         * template here, make sure you do the
         * same in backend afterRender method
         * (src/Editor/Elements/TreeMenu.php)
         *
         * @return {Array}
         */
        renderTree: function(node) {
            var data = that._data;
            var $node = $(node);
            var html = "";

            var _build = function(item, parent, source) {
                if (!item)
                    return;

                var counter = 1;
                Object.keys(item).forEach(function(key) {
                    // item.forEach(function(child) {
                    var props = item[key];
                    html += ''
                        + '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">'
                        + '<a itemprop="item" href="' + props.permalink + '">'
                        + '<span itemprop="name">' + props.title + '</span>'
                        + '<meta itemprop="position" content="' + (counter++) + '" />'
                        + '</a>'
                        + '<span class="op3-icon op3-icon-small-right" data-op3-icon="op3-icon-small-right"></span>'
                        + '</li>'
                });

                $node
                    .find("ol")
                    .html(html);
            }

            var result = [];
            _build(data, null, result);

            return result;
        },

        /**
         * Ajax request success event handler
         *
         * @param  {Object} data
         * @param  {String} textStatus
         * @param  {Object} jqXHR
         * @return {Void}
         */
        _handleAjax: function(data, textStatus, jqXHR) {
            that._data = data.data;

            //OP3.transmit("loadelementmembershippages");
        },

    }

    // globalize (designer)
    window.OP3.BreadcrumbTrail = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.BreadcrumbTrail = that;
    });

    // import menus from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._handleAjax({ data: o.breadcrumb_pages });
    });

})(jQuery, window, document);
