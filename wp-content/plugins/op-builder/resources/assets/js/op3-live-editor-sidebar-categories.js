/**
 * OptimizePress3 live editor extension:
 * adding elements to sidebar and binding
 * events to it.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-storage.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    // extending window.OP3.LiveEditor
    var that = window.OP3.LiveEditor;

    /**
     * Favourite elements (Sidebar element category)
     *
     * @type {Object}
     */
    that.favouriteElements = [];

    /**
     * Element sidebar tab categories
     *
     * @type {Object}
     */
    that.$ui.categories = null;

    /**
     * Element sidebar tab category items
     *
     * @type {Object}
     */
    that.$ui.categoryItems = null;

    /**
     * Sidebar category template
     *
     * @type {String}
     */
    that._templateSidebarCategoriesGroup = ''
        + '<div class="category-item" data-op3-category-id="{id}">'
        + '<h5 class="category-item-title">{title}</h5>'
        + '<ul class="category-item-children"></ul>'
        + '</div>';

    /**
     * Sidebar element template
     *
     * @type {String}
     */
    that._templateSidebarCategoriesElement = ''
        + '<li class="element-item-wrapper">'
        + '<a href="#" class="element-item" data-op3-element-type="{type}" data-op3-element-order="{order}" data-op3-element-tags="{tags}" data-op3-element-category="{category}" title="{title}" data-jquery-mmdnd-draggable="op3-query">'
        + '<div class="op3-element-thumb">'
        + '<span class="op3-icon op3-icon-{thumb}"></span>'
        + '<span>{title}</span>'
        + '</div>'
        + '</a>'
        + '<a class="op3-help" href="{helpUrl}" target="_blank"><i class="op3-icon op3-icon-alert-circle-que-2 element-help"></i></a>'
        + '<i class="op3-icon op3-icon-shape-star-1 element-favourite"></i>'
        + '</li>';

    that._preloadWorkerJobSidebarCategoriesGroups = function() {
        // worker job - render groups
        var job = function(groups, $target) {
            this.data.op3 = this.data.op3 || {};
            this.data.op3.message = "Rendering elements";

            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var config = $target.data("op3-preload-config");
                var html = OP3.$.templating(that._templateSidebarCategoriesGroup, group);
                var $parent = $target;

                config[group.id] = $(html)
                    .appendTo($parent)
                    .find(".category-item-children");
            }
        }

        // list groups to render
        var $target = that.$ui.sidebar
            .find(".categories .content")
                .data("op3-preload-config", {})
                .empty();
        var list = OP3.Designer.categories();
        var size = 100;
        var chunks = OP3.$.splitList(list, size);

        // append job to worker
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(job, [ chunks[i], $target ]);
        }
    }

    that._preloadWorkerJobSidebarCategoriesElements = function() {
        // worker job - render elements
        var job = function(types, $target) {
            for (var i = 0; i < types.length; i++) {
                var type = types[i];
                if (!type.enabled)
                    continue;

                // Add element name and type to tags
                type.tags.push(type.category, type.title.toLowerCase());

                var category = type.category;
                var config = $target.data("op3-preload-config");
                var $parent = config[category];
                var html = OP3.$.templating(that._templateSidebarCategoriesElement, type);

                var $html = $(html)

                $html.appendTo($parent);

                if (that.favouriteElements.indexOf(type.type) !== -1)
                    $html
                        .clone()
                        .appendTo(config.favourites);
            }
        }

        // list types to render
        var $target = that.$ui.sidebar
            .find(".categories .content");
        var list = OP3.Designer.types().filter(function(item) {
            return item.category;
        });
        var size = 80;
        var chunks = OP3.$.splitList(list, size);

        // append job to worker
        for (var i = 0; i < chunks.length; i++) {
            OP3.Worker.append(job, [ chunks[i], $target ]);
        }
    }

    that._preloadWorkerJobSidebarCategoriesClean = function(e, o) {
        OP3.Worker.append(function() {
            that.$ui.sidebar
                .find(".categories .content")
                .removeData("op3-preload-config");

            OP3.transmit("sidebarrefresh");
        });
    }

    /**
     * WorkerReady event handler
     * execute preload
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    that._handleSidebarCategoriesWorkerReady = function(e, o) {
        //console.time("OP3.LiveEditorSidebarCategories._preload");

        that._preloadWorkerJobSidebarCategoriesGroups();
        that._preloadWorkerJobSidebarCategoriesElements();
        that._preloadWorkerJobSidebarCategoriesClean();

        //console.timeEnd("OP3.LiveEditorSidebarCategories._preload");
    }

    /**
     * Sidebar elements tab
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    that._handleSidebarElementsTab = function(e, o) {
        var $blocksTab = OP3.LiveEditor.$ui.sidebar.find(".elements");
        that.$ui.categories = $blocksTab.find(".category-item");
        that.$ui.categoryItems = that.$ui.categories.find(".element-item");
        that.$ui.searchElements = $blocksTab.find(".tab-heading-search-input");

        that.$ui.searchElements
            .on("input", that._handleElementsSearch);

        that.$ui.categoryItems
            .siblings(".element-favourite")
            .on("click", that._handleElementFavouriteClick);

        that._updateNumberOfElementsInCategory();
    }

    /**
     * Custom search for elements
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleElementsSearch = function(e) {
        var $target = $(e.target);
        var filter = $target.val().toUpperCase();

        // Set searching status
        if (filter) {
            that.$ui.categories.closest(".categories").attr("data-op3-search-status", "searching");
        } else {
            that.$ui.categories.closest(".categories").attr("data-op3-search-status", "not-searching");
            return;
        }

        // Display only founded elements
        that.$ui.categoryItems.each(function(index, item) {
            var $item = $(item);
            var text = $item.attr("data-op3-element-tags");

            if (text.toUpperCase().indexOf(filter) > -1)
                $item.parent().attr("data-op3-found", "1");
            else
                $item.parent().attr("data-op3-found", "0");
        });

        // Set number of founded elements
        that.$ui.categories.each(function(index, item) {
            var $item = $(item);
            var founded = $item.find('[data-op3-found="1"]');

            $item.attr("data-op3-founded", founded.length);
        });
    }

    /**
     * Sidebar element favourite click event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    that._handleElementFavouriteClick = function(e) {
        var $target = $(e.target);
        var $elementItem = $target.siblings(".element-item");
        var $elementItemWrapper = $elementItem.parent();
        var type = $elementItem.attr("data-op3-element-type");
        var elementCategory = $target
            .closest(".category-item")
            .attr("data-op3-category-id");
        var $favouriteCategory = that.$ui.categories
            .filter('[data-op3-category-id="favourites"]');

        // Move to favourite category
        if (elementCategory !== "favourites") {
            // Check if element is already in favourite category
            if ($favouriteCategory.find('[data-op3-element-type="' + type + '"]').length)
                return;

            var $destination = $favouriteCategory
                .find(".category-item-children");

            $elementItemWrapper
                .clone(true, true)
                .appendTo($destination);
        } else {
            $elementItemWrapper.remove();
        }

        that._updateNumberOfElementsInCategory();
        that.$ui.searchElements.trigger("input");
        that._saveElementToFavorites();
    }

    /**
     * Update categories number of elements
     *
     * @return {Void}
     */
    that._updateNumberOfElementsInCategory = function() {
        that.$ui.categories.each(function(index, category) {
            var $category = $(category);
            var $elements = $category.find('.element-item-wrapper');

            $category.attr("data-op3-elements", $elements.length);
        });
    }

    /**
     * Save favourite elements to database
     *
     * @return {Void}
     */
    that._saveElementToFavorites = function() {
        var $elementsInFavouriteCategory = that.$ui.categories
            .filter('[data-op3-category-id="favourites"]')
            .find(".element-item");

        var elements = $elementsInFavouriteCategory.map(function(index, item) {
            return $(item).attr("data-op3-element-type");
        }).toArray();

        OP3.Ajax.request({
            method: "POST",
            url: OP3.Meta.api + "/elements/favourites",
            data: JSON.stringify({
                elements,
            }),
        });
    }

    OP3.bind("workerready", that._handleSidebarCategoriesWorkerReady);
    OP3.bind("ready", that._handleSidebarElementsTab);

    // import favourite elements from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that.favouriteElements = o.element_favourites;
    });

})(jQuery, window, document);
