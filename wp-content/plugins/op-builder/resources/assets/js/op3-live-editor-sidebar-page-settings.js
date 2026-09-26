/**
 * OptimizePress3 live editor extension:
 * Sidebar special properties for manipulating
 * page title, desc, template, status and featured image.
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

    /**
     * Registered wordpress templates
     *
     * @type {Object}
     */
    var templates = {
        "default": "Default",
        "op_builder_blank": "OP3 - Blank Template",
        "op_builder_full_width": "OP3 - Full Width Template",
    };

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _renderDocument = function(e, o) {
        var $group = $(OP3.$.templating(OP3.DocumentOptions._template.group(), {
                id: "page-settings",
                label: "Page Settings",
                reset: false,
            }))
            .addClass("op3-element-options-group-child-preserve")
            .attr("data-op3-element-options-property-page-template", OP3.Meta.pageTemplate);

        // Page Status
        var $statusWrapper = $(
            '<div class="op3-element-options-property" data-op3-element-options-property-id="pageStatus">' +
            '<div class="op3-element-options-label-group">' +
            '<label>Page Status</label>' +
            '<span class="alert"></span>' +
            '</div>' +
            '</div>')
            .appendTo($group);

        $('<select data-property-type="boolean">' +
            '<option value="0">Draft</option>' +
            '<option value="1">Published</option>' +
            '</select>')
            .val(OP3.Meta.pageStatus === "publish" ? "1" : "0")
            .on("change", _pageStatusChange)
            .appendTo($statusWrapper);

        // Page Template
        var $templateWrapper = $(
            '<div class="op3-element-options-property" data-op3-element-options-property-id="pageTemplate">' +
                '<div class="op3-element-options-label-group">' +
                    '<label>Page Template</label>' +
                '</div>' +
            '</div>')
            .appendTo($group);

        var $select = $("<select />");
        for (var key in templates) {
            $('<option value="' + key + '">' + templates[key] + '</option>')
                .appendTo($select);
        }

        $select
            .val(OP3.Meta.pageTemplate)
            .on("select2:selecting", _beforePageTemplateChange)
            .on("select2:select", _pageTemplateChange)
            .appendTo($templateWrapper)
            .select2({
                width: "100%",
                dropdownCssClass: "select2-simple",
                containerCssClass: "select2-simple",
            });

        // Page Title
        var $pageTitleWrapper = $(
            '<div class="op3-element-options-property" data-op3-element-options-property-id="pageTitle">' +
            '<div class="op3-element-options-label-group">' +
            '<label>Page Title</label>' +
            '<span class="alert"></span>' +
            '</div>' +
            '</div>')
            .appendTo($group);

        $('<input />')
            .val(OP3.Meta.pageTitle)
            .on("blur", _pageTitleBlur)
            .appendTo($pageTitleWrapper);

        // Page Description
        var $descriptionWrapper = $(
            '<div class="op3-element-options-property" data-op3-element-options-property-id="pageDescription">' +
            '<div class="op3-element-options-label-group">' +
            '<label>Page Description</label>' +
            '<span class="alert"></span>' +
            '</div>' +
            '</div>')
            .appendTo($group);

        $('<textarea>' +
            OP3.Meta.pageDescription +
            '</textarea>')
            .on("blur", _pageDescriptionBlur)
            .appendTo($descriptionWrapper);

        // Page Feature Image
        var $featuredImageWrapper = $(
            '<div class="op3-element-options-property" data-op3-element-options-property-id="pageFeaturedImage">' +
            '<div class="op3-element-options-label-group">' +
            '<label>Page Featured Image</label>' +
            '<span class="alert"></span>' +
            '</div>' +
            '</div>')
            .appendTo($group);

        $('<input data-property-type="image-url-preview" />')
            .val(OP3.Meta.pageFeaturedImage)
            .on("change", _pageFeaturedImageChange)
            .appendTo($featuredImageWrapper);

        // Append to sidebar
        $(o.parent)
            .find(".op3-element-options-group")
            .first()
            .before($group);
    }

    /**
     * Before template change event handler
     *
     * @param {Event} e
     */
    var _beforePageTemplateChange = function(e) {
        if (OP3.Designer.changed()) {
            e.preventDefault();
            return OP3.UI.alert("Template Change", "Your document has not been saved. Please make sure you save the page before template change.")
        }
    }

    /**
     * Page template change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _pageTemplateChange = function(e) {
        var $target = $(e.target);
        var template = $target.val();

        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/template",
            method: "post",
            data: JSON.stringify({
                "id": OP3.Meta.pageId,
                "template": template,
            }),
            success: function(data, textStatus, jqXHR) {
                // Reload LiveEditor iframe
                _alert($target, "success");
                window.frameElement.contentWindow.location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                _alert($target, "error");
            },
        });
    }

    /**
     * Page status change event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _pageStatusChange = function(e) {
        var $target = $(e.target);
        var value = $target.val();
        var status = "draft";

        if (value === '1')
            status = "publish";

        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/status",
            method: "post",
            data: JSON.stringify({
                "ID": OP3.Meta.pageId,
                "post_status": status,
            }),
            success: function(data, textStatus, jqXHR) {
                Object.defineProperty(OP3.Meta, "pageStatus", { value: status });
                OP3.LiveEditor.$ui.body.attr("data-op3-page-status", status);

                _alert($target, "success");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                _alert($target, "error");
            },
        });
    }

    /**
     * Page title blur event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _pageTitleBlur = function(e) {
        var $target = $(e.target);
        var title = $target.val();

        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/title",
            method: "post",
            data: JSON.stringify({
                "ID": OP3.Meta.pageId,
                "title": title,
            }),
            success: function(data, textStatus, jqXHR) {
                OP3.LiveEditor.$ui.body.attr("data-op3-page-title", title);
                _alert($target, "success");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                _alert($target, "error");
            },
        });
    }

    /**
     * Page description blur event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _pageDescriptionBlur = function(e) {
        var $target = $(e.target);
        var description = $target.val();

        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/description",
            method: "post",
            data: JSON.stringify({
                "ID": OP3.Meta.pageId,
                "description": description,
            }),
            success: function(data, textStatus, jqXHR) {
                OP3.LiveEditor.$ui.body.attr("data-op3-page-description", description);
                _alert($target, "success");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                _alert($target, "error");
            },
        });
    }

    /**
     * Page featured image change event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _pageFeaturedImageChange = function(e) {
        var $target = $(e.target);
        var url = $target.val();

        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/featured-image",
            method: "post",
            data: JSON.stringify({
                "ID": OP3.Meta.pageId,
                "attachmentUrl": url,
            }),
            success: function(data, textStatus, jqXHR) {
                OP3.LiveEditor.$ui.body.attr("data-op3-page-featured-image", url);
                _alert($target, "success");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                _alert($target, "error");
            },
        });
    }

    /**
     * Display response api message for page properties
     *
     * @param {Object} $node
     * @param {String} status
     * @return {Void}
     */
    var _alert = function($node, status) {
        var nodeClass = "alert-" + status;
        var $alert = $node
            .parent()
            .find('.alert')
            .addClass(nodeClass);
        setTimeout(function () {
            $alert.removeClass(nodeClass);
        }, 3000);
    }

    // init
    OP3.bind("elementoptionsformrender::document", _renderDocument);

    // import page templates from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        templates = o.page_templates;
    });

})(jQuery, window, document);
