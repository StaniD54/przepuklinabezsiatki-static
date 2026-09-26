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
 */
;(function($, window, document) {

    "use strict";

    var that = window.OP3.LiveEditor;

    /**
     * Show sidebar
     *
     * @return {Void}
     */
    that.sidebarShow = function() {
        if (that.$ui.body.hasClass("sidebar"))
            return;

        var emit = { status: true };
        OP3.transmit("togglingsidebar", emit);

        var transition = !!parseFloat(that.$ui.sidebar.css("transition-duration"));
        var callback = function() { OP3.transmit("togglesidebar", emit); };

        if (transition)
            that.$ui.sidebar.one("transitionend", callback);

        that.$ui.body
            .addClass("sidebar");

        var $sidebarTab = OP3.LiveEditor.$ui.sidebar
            .find(".sidebar-tabs > .tab-content.selected");
        var tab = $sidebarTab
            .attr("data-tab");
        var $tab = OP3.LiveEditor.$ui.headerNav
            .find('.op3-tabs [data-tab="' + tab + '"]');

        // Unselect all
        OP3.LiveEditor.$ui.headerNav
            .find(".op3-tabs .selected")
            .removeClass("selected");

        // Element tab has categories & options subtabs,
        // and we only want to mark it as selected
        // when categores are showing
        if (tab !== "elements")
            $tab.addClass("selected");

        // If popoverlay is selected, we
        // want to mark it as active
        else if (OP3.Designer.activeElement().type() === "popoverlay")
            OP3.LiveEditor.$ui.headerNav
                .find(".op3-tabs .tab-button.popoverlay")
                .addClass("selected");

        if (!transition)
            callback();
    }

    /**
     * Hide sidebar
     *
     * @return {Void}
     */
    that.sidebarHide = function() {
        if (!that.$ui.body.hasClass("sidebar"))
            return;

        var emit = { status: false };
        OP3.transmit("togglingsidebar", emit);

        var transition = !!parseFloat(that.$ui.sidebar.css("transition-duration"));
        var callback = function() { OP3.transmit("togglesidebar", emit); };

        if (transition)
            that.$ui.sidebar.one("transitionend", callback);

        $("body")
            .removeClass("sidebar");

        // OP3.LocalStorage.set("sidebar.display", false);
        OP3.LiveEditor.$ui.headerNav
            .find(".op3-tabs .selected")
            .removeClass("selected");

        if (!transition)
            callback();
    }

    /**
     * Toggle (show/hide) sidebar
     *
     * @return {Void}
     */
    that.sidebarToggle = function() {
        if ($("body").hasClass("sidebar")) {
            that.sidebarHide();
        } else {
            that.sidebarShow();
        }
    }

    /**
     * Object initialization
     *
     * @return {Void}
     */
    var _init = function() {
        _ui();
        _bind();
    }

    /**
     * Init UI elements
     *
     * @return {Void}
     */
    var _ui = function() {
        that.$ui.sidebar = $("#sidebar");
        that.$ui.headerNav = $("#header .header-nav");
        that.$ui.headerTabs = that.$ui.headerNav.find(".op3-tabs");
        that.$ui.stylePicker = $("#style-picker-content");
        that.$ui.sidebarWrapper = that.$ui.sidebar.find(".wrapper").first();

        // Sidebar tabs navigation is also in haeder
        that.$ui.sidebarTabs = that.$ui.sidebar.add(that.$ui.headerNav);
    }

    /**
     * Bind tabs event handler
     *
     * @return {Void}
     */
    var _bind = function() {
        that.$ui.sidebarTabs.find(".op3-tabs").on("click", "[data-tab]", function(e) {
            e.preventDefault();

            var $this = $(this);
            var $tabs = $this.closest(".op3-tabs");
            var selector = $tabs.attr("data-tab-content");
            var $menu = $tabs.find("[data-tab], .popoverlay");
            var $content = $tabs.nextAll(".tab-content");
            var tab = $this.attr("data-tab");

            // Make sure the sidebar is opened
            that.sidebarShow();

            // Make sure sidebar is scrolled to the top
            that.$ui.sidebarWrapper.scrollTop(0);

            // Click on elements tab triggers unfocus
            // to show list of elements instead
            // of element settings
            if ($this.attr("data-unfocus")) {
                OP3.Designer.unfocus();
            }

            // Force elements search input focus on elements tab open
            if (tab === "elements") {
                OP3.LiveEditor.$ui.searchElements.parent().addClass("open");
                OP3.LiveEditor.$ui.searchElements.focus();
            }

            // If current menu is already selected,
            // don't do anything further
            if ($this.hasClass("selected"))
                return;

            // If tab has data-tab-content attribute set
            // use this value to find the tab content
            if (selector) {
                $content = $("." + selector + " > .tab-content");
            }

            $menu.removeClass("selected");
            $this.addClass("selected");

            $content
                .removeClass("selected")
                .filter('[data-tab="' + tab + '"]')
                    .addClass("selected");
        });

        OP3.LiveEditor.$ui.sidebar.find(".tab-heading-search-wrapper").on("click", ".tab-heading-search-icon", function(e) {
            var $target = $(e.delegateTarget),
                isOpen = $target
                    .toggleClass("open")
                    .hasClass("open");

            if (isOpen)
                $target.find("input").focus();
        });

        var $searchInput = OP3.LiveEditor.$ui.sidebar.find(".tab-heading-search-input");
        OP3.bind("elementdrop", function() {
            $searchInput
                .val("")
                .trigger("input")
                    .closest(".tab-heading-search-wrapper")
                    .removeClass("open");
        });
    }

    // autoinit
    $(function() {
        _init();
    });

})(jQuery, window, document);
