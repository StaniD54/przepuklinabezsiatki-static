/**
 * OptimizePress3 live-editor extension
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-live-editor.js
 */
;(function($, window, document) {

    "use strict";

    var that = {

        /**
         * Configuration for each element type
         * (this object is defined inside
         * op3-live-editor-toolbar-config.js)
         *
         * @type {Object}
         */
        _config: {

            /*
            // default is element type
            default: {
                // label written on top of toolbar navigation
                // (usualy element name)
                label: OP3._("Default"),

                // nav or navigation (array of objects)
                nav: [
                    {
                        // nav id (can be used for css targeting)
                        id: "potato",

                        // navigation hover title
                        label: OP3._("Potato"),

                        // navigation icon
                        icon: "op3-icon-simple-up",

                        // navigation element class(es)
                        className: "",

                        // navigation element attributes
                        attr: {
                            "data-op3-is-potato": "1",
                        },

                        // action executed (this current example
                        // will execute _handleActionPotato)
                        action: "potato",

                        // optional context menu list (to display
                        // context menu action must be context)
                        context: [
                            {
                                // tab label
                                label: OP3._("Cars"),

                                // tab HTML (before properties)
                                prependHTML: "<p>Lorem ipsum is dummy text...</p>",

                                // list of properties on tab
                                property: [ "volvo", "bmw" ],
                            },
                            {
                                // another tab label
                                label: OP3._("Another Cars"),

                                // list of properties on second tab
                                property: [ "mercedes" ],

                                // tab HTML (after properties)
                                appendHTML: "<p>Dummy text lorem ipsum is...</p>",
                            },
                        ]
                    },

                    .
                    .
                    .
                ]
            },
            */

        },

        /**
         * Form template
         * (each property is not string but function because
         * we do not have translations yet)
         *
         * @todo - get it from dom?
         *
         * @type {Object}
         */
        _templates: {
            parent: function() {
                return ''
                    +   '<div id="toolbar" class="op3-toolbar op3-toolbar-sticky">'
                    +       '<form>'
                    +           '<div class="op3-toolbar-main">'
                    +               '<div class="op3-toolbar-wrapper">'
                    +                   '<header class="op3-toolbar-header">'
                    +                       '<span class="op3-toolbar-header-section op3-toolbar-header-section-left">'
                    +                           '<button type="button" class="op3-toolbar-header-button op3-toolbar-sticky" title="' + OP3._("Toggle Sticky Toolbar") + '">'
                    +                               '<span class="visually-hidden">' + OP3._("Toggle Sticky Toolbar") + '</span>'
                    +                               '<span class="op3-icon op3-icon-pin-2"></span>'
                    +                           '</button>'
                    +                       '</span>'
                    +                       '<span class="op3-toolbar-draggable" draggable="false"></span>'
                    +                       '<span class="op3-toolbar-header-section op3-toolbar-header-section-center op3-toolbar-header-section-element-title">'
                    +                           'Unknown Element'
                    +                       '</span>'
                    +                       '<span class="op3-toolbar-header-section op3-toolbar-header-section-center op3-toolbar-header-section-global-label">'
                    +                           OP3._("Global Element")
                    +                       '</span>'
                    +                       '<a class="op3-toolbar-header-section op3-help" href="" target="_blank"><i class="op3-icon op3-icon-alert-circle-que-2"></i></a>'
                    +                       '<span class="op3-toolbar-header-section op3-toolbar-header-section-right">'
                    +                           '<button type="button" class="op3-toolbar-header-button op3-toolbar-parent" title="' + OP3._("Focus Parent Element") + '">'
                    +                               '<span class="visually-hidden">' + OP3._("Focus Parent Element") + '</span>'
                    +                               '<span class="op3-icon op3-icon-minimal-up"></span>'
                    +                           '</button>'
                    +                           '<button type="button" class="op3-toolbar-header-button op3-toolbar-close" title="' + OP3._("Close Toolbar") + '">'
                    +                               '<span class="visually-hidden">' + OP3._("Close Toolbar") + '</span>'
                    +                               '<span class="op3-icon op3-icon-simple-remove-2"></span>'
                    +                           '</button>'
                    +                       '</span>'
                    +                   '</header>'
                    +                   '<nav class="op3-toolbar-content">'
                    +                       '<ul class="op3-toolbar-list op3-toolbar-icon-list"></ul>'
                    +                   '</nav>'
                    +               '</div>'
                    +           '</div>'
                    +           '<div class="op3-toolbar-context">'
                    +               '<div class="op3-toolbar-wrapper">'
                    +                   '<nav class="op3-toolbar-header">'
                    +                       '<ul class="op3-toolbar-list"></ul>'
                    +                   '</nav>'
                    +                   '<div class="op3-toolbar-content">'
                    +                   '</div>'
                    +               '</div>';
                    +           '</div>'
                    +       '</form>';
                    +   '</div>';
            },
            nav: function() {
                return ''
                    +   '<li class="op3-toolbar-list-item" data-op3-toolbar-nav-id="{id}">'
                    +       '<a href="#" class="op3-toolbar-link" data-op3-toolbar-action="{action}" data-op3-toolbar-args="{args}" title="{label}">'
                    +           '<i class="op3-icon {icon}"></i>'
                    +       '</a>'
                    +   '</li>';
            },
            contextNav: function() {
                return ''
                    +   '<li class="op3-toolbar-list-item">'
                    +       '<a href="#" class="op3-toolbar-link">{label}</a>'
                    +   '</li>';
            },
            contextContent: function() {
                return ''
                    +   '<div class="op3-toolbar-content-item jquery-colorpicker-widget-parent">'
                    +   '</div>';
            },
        },

        /**
         * Current focused element
         *
         * @type {Object}
         */
        element: null,

        /**
         * UI elements
         *
         * @type {Object}
         */
        $ui: null,

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            if (that.$ui)
                return;

            that.$ui = {};

            OP3.LiveEditor.$ui.propertyContainer = $(OP3.LiveEditor.$ui.propertyContainer);

            // bind OP3 events
            OP3.bind("loadlang", that._handleLoadLang);
            OP3.bind("workerready", that._handleWorkerReady);
            OP3.bind("elementfocus", that._handleElementFocus);
            OP3.bind("elementunfocus", that._handleElementUnfocus);
            OP3.bind("elementgid", that._handleElementGid);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach elementremove", that._handleElementDetach);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementchange::*::linkProperties", that._handleElementChangeLinkProperties);
            OP3.bind("elementoptionssyncrequest", that._handleElementOptionsSyncRequest);
            OP3.bind("elementoptionsrefreshrequest", that._handleElementOptionsRefreshRequest);
            OP3.bind("elementclipboardcopy", that._handleElementClipboardCopy);
            OP3.bind("devicechange", that._handleDeviceChange);
        },

        /**
         * Render toolbar
         *
         * @return {Void}
         */
        _render: function() {
            if (that.$ui.parent)
                return;

            that.$ui.parent = $(that._templates.parent())
                .on("click", ".op3-toolbar-header .op3-toolbar-close", that._handleCloseClick)
                .on("click", ".op3-toolbar-header .op3-toolbar-parent", that._handleParentClick)
                .on("click", ".op3-toolbar-header .op3-toolbar-sticky", that._handleStickyClick)
                .on("click", "[data-op3-toolbar-action]", that._handleActionClick)
                .on("click", ".op3-toolbar-context .op3-toolbar-link", that._handleTabClick)
                .on("click", ".op3-element-options-property-reset", that._handlePropertyReset)
                .on("draggablestart", that._handleDraggableStart)
                .on("draggablemove", that._handleDraggableMove)
                .on("draggablestop", that._handleDraggableStop)
                .draggable({
                    handle: ".op3-toolbar-draggable",
                })
                .on("mmdnddragstart", that._handleElementDragstart)
                .on("mmdnddragend", that._handleElementDragend)
                .on("submit", that._handleFormSubmit)
                .appendTo(OP3.LiveEditor.$ui.body);

            that.$ui.form = that.$ui.parent.find("form")
                .on("change", that._handleFormChange);

            that.$ui.main = that.$ui.form.find(".op3-toolbar-main");
            that.$ui.title = that.$ui.main.find(".op3-toolbar-header-section-element-title");
            that.$ui.help = that.$ui.main.find(".op3-help");
            that.$ui.list = that.$ui.main.find(".op3-toolbar-list");
            that.$ui.context = that.$ui.form.find(".op3-toolbar-context");
            that.$ui.contextNav = that.$ui.context.find(".op3-toolbar-list");
            that.$ui.contextContent = that.$ui.context.find(".op3-toolbar-content");

            // reposition toolbar on scroll
            var frame = OP3.LiveEditor.$ui.frame.get(0);
            $(null)
                .add(frame.ownerDocument.defaultView)
                .add(frame.ownerDocument)
                .add(frame.parentElement.parentElement)
                .add(frame.parentElement)
                .add(frame)
                .add(frame.contentWindow)
                .add(frame.contentDocument)
                    .on("resize scroll", that._handleReposition);

            var emit = {
                node: null,
                parent: that.$ui.form.get(0),
                type: null,
            }
            OP3.transmit("elementoptionsformrender", emit);
            OP3.transmit("elementoptionsformrender::" + emit.type, emit);
        },

        /**
         * Render toolbar navigation (horizontal icons)
         *
         * @return {Void}
         */
        _renderNav: function() {
            if (!that.element)
                return;

            var type = that.element.type(),
                config = that._config[type];
            if (!config.nav)
                return;

            that.$ui.list
                .empty();

            config.nav.forEach(function(nav) {
                // fix config defaults
                nav.className = "";
                nav.attr = nav.attr || {};
                nav.action = nav.action || "";
                nav.args = nav.args || [];
                nav.args = nav.args instanceof Array ? JSON.stringify(nav.args).replace(/"/g, "&quot;") : nav.args;

                // create dom element
                var template = OP3.$.templating(that._templates.nav(), nav),
                    $item = $(template);

                if (nav.className)
                    $item.addClass(nav.className);
                if (nav.attr)
                    for (var key in nav.attr) {
                        $item.attr(key, nav.attr[key]);
                    }

                if (nav.linkClassName || nav.linkAttr) {
                    var $link = $item.find(".op3-toolbar-link");
                    if (nav.linkClassName)
                        $link.addClass(nav.linkClassName);
                    if (nav.linkAttr)
                        for (var key in nav.linkAttr) {
                            $link.attr(key, nav.linkAttr[key]);
                        }
                }

                if (nav.iconClassName || nav.iconAttr) {
                    var $icon = $item.find(".op3-icon");
                    if (nav.iconClassName)
                        $icon.addClass(nav.iconClassName);
                    if (nav.iconAttr)
                        for (var key in nav.iconAttr) {
                            $icon.attr(key, nav.iconAttr[key]);
                        }
                }

                // ...and append it
                that.$ui.list.append($item);
            });
        },

        /**
         * Render toolbar context
         *
         * @return {Void}
         */
        _renderContext: function() {
            if (!that.element)
                return;

            var element = that.element,
                form = that.$ui.form.get(0),
                node = element.node(),
                type = element.type(),
                config = that._config[type],
                navIndex = that.$ui.parent.attr("data-op3-toolbar-nav-index")*1,
                tabIndex = that.$ui.parent.attr("data-op3-toolbar-context-tab-index")*1;

            var isSyncing = !!that.__isSyncing;
            that.__isSyncing = true;

            that.$ui.contextContent
                .empty();
            that.$ui.contextNav
                .empty();
            that.$ui.list
                .find(".op3-toolbar-list-item")
                .removeClass("op3-toolbar-active")
                .eq(navIndex)
                    .addClass("op3-toolbar-active");

            // render context tabs
            if (config.nav[navIndex] && config.nav[navIndex].context) {
                config.nav[navIndex].context.forEach(function(nav, index) {
                    var template = OP3.$.templating(that._templates.contextNav(), { label: nav.label }),
                        itemName = ""
                            + config.nav[navIndex].id
                            + "-"
                            + nav.label
                                .replace(/[^a-zA-Z]+/g, "-")
                                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                                .toLowerCase();

                    $(template)
                        .attr("data-op3-content-item-name", itemName)
                        .appendTo(that.$ui.contextNav);
                });
            }

            // item with tabIndex may be non-visible,
            // use next visible
            var $tabs = that.$ui.contextNav.find(".op3-toolbar-list-item"),
                newTabIndex = tabIndex;
            while ($tabs.eq(newTabIndex).css("display") === "none")
                newTabIndex++;
            if (newTabIndex === $tabs.length)
                while ($tabs.eq(newTabIndex).css("display") === "none")
                    newTabIndex--;
            if (newTabIndex < 0)
                newTabIndex = tabIndex;
            tabIndex = newTabIndex;
            $tabs.eq(tabIndex).addClass("op3-toolbar-active");
            that.$ui.parent.attr("data-op3-toolbar-context-tab-index", tabIndex);

            // render context content
            if (config.nav[navIndex] && config.nav[navIndex].context && config.nav[navIndex].context[tabIndex]) {
                var context = config.nav[navIndex].context[tabIndex],
                    childCount = 0
                        + (context.prependHTML ? 1 : 0)
                        + (context.property ? context.property.length : 0)
                        + (context.appendHTML ? 1 : 0),
                    template = OP3.$.templating(that._templates.contextContent()),
                    $content = $(template)
                        .attr("data-op3-content-item-children-count", childCount)
                        .appendTo(that.$ui.contextContent);

                // render properties
                (context.property || []).forEach(function(item) {
                    var prop = element.findProperty(item);
                    if (!prop)
                        throw "OP3.Toolbar: unable to render property " + item + " for element " + type + ". Property does not exist.";

                    var widget = prop.render(),
                        $input = $(widget).find(".op3-element-options-property-input");
                    $content.append(widget);
                });

                // render filter
                (context.filter || []).forEach(function(item) {
                    var lib = item.lib,
                        options = item.options,
                        tagName = item.lib === "filterDropdown" ? "select" : "div",
                        $filter = $("<" + tagName + " />")
                            [item.lib](item.options.map(function(option) {
                                var label = option.label,
                                    selector = option.property.map(function(id) {
                                            return '.op3-element-options-property[data-op3-element-options-property-id="' + id + '"]';
                                        })
                                        .join(",");

                                return {
                                    label: label,
                                    selector: selector,
                                    context: that.$ui.contextContent,
                                };
                            }))
                            [item.lib]("attach");

                    // wrap filter
                    var $widget = $filter
                        .wrap("<div />")
                        .parent()
                            .addClass("op3-element-options-property-filter");
                    $('<div class="op3-element-options-label-group"><label>' + item.label + '</label></div>')
                        .prependTo($widget);
                });

                // render prependHTML/appendHTML
                if (context.prependHTML)
                    $content.prepend('<div class="op3-element-options-custom-html">' + context.prependHTML + '</div>');
                if (context.appendHTML)
                    $content.append('<div class="op3-element-options-custom-html">' + context.appendHTML + '</div>');
            }

            if (!isSyncing)
                delete that.__isSyncing;

            var emit = {
                node: node,
                type: type,
                parent: form,
            };
            OP3.transmit("elementoptionsrefreshing", emit);
            OP3.transmit("elementoptionsrefreshing::" + emit.type, emit);
            OP3.transmit("elementoptionsrefresh", emit);
            OP3.transmit("elementoptionsrefresh::" + emit.type, emit);
        },

        /**
         * Set input values for current
         * attached form
         *
         * @param  {Mixed} property (optional)
         * @return {Void}
         */
        _sync: function(property) {
            if (!that.element)
                return;

            var element = that.element,
                node = element.node(),
                type = element.type(),
                media = OP3.LiveEditor.deviceMedia(),
                form = that.$ui.form.get(0),
                selector = "";

            if (property) {
                var className = "op3-element-options-property-input",
                    dataAttr = "data-op3-element-options-property-id",
                    propType = OP3.$.type(property);

                if (propType.match(/^html.*element$/))
                    selector = property;
                else if (propType === "object" && property.jquery)
                    selector = property;
                else if (propType === "object" && property.id)
                    selector += (selector ? "," : "") + "." + className + "[" + dataAttr + '="' + property.id + '"]';
                else if (propType === "string")
                    property.split(",").forEach(function(item) {
                        selector += (selector ? "," : "") + "." + className + "[" + dataAttr + '="' + item.trim() + '"]';
                    });
                else if (propType === "array")
                    property.forEach(function(item) {
                        selector += (selector ? "," : "") + "." + className + "[" + dataAttr + '="' + item.trim() + '"]';
                    });
            }
            selector = selector || ".op3-element-options-property-input";

            var isSyncing = !!that.__isSyncing;
            that.__isSyncing = true;

            // disable hovers
            var hoverDisabled = OP3.Designer.$ui.parent.hasClass("op3-disable-hover");
            if (!hoverDisabled)
                OP3.Designer.$ui.parent.addClass("op3-disable-hover");

            // iterate form inputs
            that.$ui.form
                .find(selector)
                .each(function() {
                    var key = $(this).attr("data-op3-element-options-property-id"),
                        name = $(this).attr("data-op3-element-options-property-name"),
                        value = element.getOption(key, media),
                        isNull = element.isOptionNull(key, media) ? "1" : "0",
                        isDefault = element.isOptionDefault(key, media) ? "1" : "0";

                    if (value === null)
                        value = element.getOption(key, true);
                    var trigger = $(this).val() != value;

                    $(this)
                        .closest(".op3-element-options-property")
                            .attr("data-op3-element-options-property-value", value)
                            .attr("data-op3-element-options-property-isnull", isNull)
                            .attr("data-op3-element-options-property-default", isDefault);
                    $(this)
                        .attr("data-op3-element-options-property-media", media)
                        .val(value)
                        .trigger(trigger ? "change" : "_op3nothing");

                    var emit = {
                        node: node,
                        parent: form,
                        input: this,
                        id: key,
                        name: name,
                        value: value,
                    }
                    OP3.transmit("elementoptionssync", emit);
                    OP3.transmit("elementoptionssync::" + type, emit);
                    OP3.transmit("elementoptionssync::*::" + emit.name, emit);
                    OP3.transmit("elementoptionssync::" + type + "::" + emit.name, emit);
                });

            // enable hovers
            if (!hoverDisabled)
                OP3.Designer.$ui.parent.removeClass("op3-disable-hover");

            if (!isSyncing)
                delete that.__isSyncing
        },

        /**
         * Get position/dimenzions of elements
         * needed for reposition
         *
         * @return {Object}
         */
        _getRepositionRect: function() {
            if (!that.element)
                return null;

            // force display block (can not getBoundingClientRect
            // elements with display: none)
            that.$ui.parent
                .css({
                    visibility: "hidden",
                    display: "block",
                });

            // do we have scrollbar
            var hasScroll = OP3.LiveEditor.$ui.frameWrapper.css("overflow-y") === "scroll";
            if (!hasScroll) {
                // frameWrapper element has no overflow-y, maybe
                // the scrollbar is inside frame's html element
                var scrollElement = OP3.Designer.$ui.html.get(0).ownerDocument.scrollingElement;
                hasScroll = scrollElement.scrollHeight > scrollElement.clientHeight;
            }

            // position and dimenzions
            var node = that.element.node(),
                result = {
                    scrollBar: [ 0, hasScroll ? (parseInt(window.scrollbarSize) || 17) : 0 ],
                    parent: that.$ui.parent.get(0).getBoundingClientRect(),
                    element: that.element.getOption('videoSticky') === "1" ? $(node).find('[data-op3-video-sticky]').get(0).getBoundingClientRect() : node.getBoundingClientRect(),
                    wrapper: OP3.LiveEditor.$ui.frameWrapper.get(0).getBoundingClientRect(),
                    frame: OP3.LiveEditor.$ui.frame.get(0).getBoundingClientRect(),
                };

            // viewport
            result.viewport = {
                left: result.wrapper.left,
                right: result.wrapper.right - result.scrollBar[1],
                top: 0,
                bottom: result.wrapper.bottom,
                width: result.wrapper.width - result.scrollBar[1],
                height: result.wrapper.bottom,
            }

            // target (focused element relative to live-editor)
            result.target = {
                left: result.frame.left + result.element.left,
                width: result.element.width,
                top: result.frame.top + result.element.top,
                height: result.element.height,
            }
            result.target.right = result.target.left + result.target.width;
            result.target.bottom = result.target.top + result.target.height;

            // toolbar main (no need getBoundingClientRect, only size)
            var props = [ "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft" ];
            result.main = that.$ui.main.css(props);
            Object.keys(result.main).forEach(function(value, index) {
                result.main[value] = parseFloat(result.main[value]);
            });
            result.main.outerWidth = result.main.marginLeft + result.main.width + result.main.marginRight;
            result.main.outerHeight = result.main.marginTop + result.main.height + result.main.marginBottom;

            // toolbar context (no need getBoundingClientRect, only size)
            result.context = that.$ui.context.css(props);
            Object.keys(result.context).forEach(function(value, index) {
                result.context[value] = parseFloat(result.context[value]);
            });
            result.context.outerWidth = result.context.marginLeft + result.context.width + result.context.marginRight;
            result.context.outerHeight = result.context.marginTop + result.context.height + result.context.marginBottom;

            // reset display
            that.$ui.parent
                .css({
                    visibility: "",
                    display: "",
                });

            return result;
        },

        /**
         * Reposition toolbar
         *
         * @return {Void}
         */
        reposition: function() {
            var rect = that._getRepositionRect();
            if (!rect)
                return;

            // defaults
            var isSticky = that.$ui.parent.hasClass("op3-toolbar-sticky"),
                point = "none",
                pointAdjust = "none",
                contextPosition = "right",
                contextOffset = 0,
                top = "auto",
                right = "auto",
                bottom = "auto",
                left = "auto";

            // valid toolbar positions
            var validPosition = that.element.config().validToolbarPosition;
            if (!validPosition || !validPosition.length)
                validPosition = [ "top", "bottom", "left", "right" ];

            // calculate toolbar position
            if (isSticky) {
                // position align: if top is set - set left, if left is set - set top
                var _setAlign = function(position) {
                    if (top !== "auto" && left === "auto" && (position === "top" || position === "bottom")) {
                        left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;

                        if (left < rect.viewport.left)
                            pointAdjust = "left";
                        if (left < rect.viewport.left)
                            left = rect.target.left - rect.main.marginLeft;
                        if (left < rect.viewport.left)
                            left = rect.target.left;
                        if (left < rect.viewport.left)
                            left = rect.viewport.left;

                        if (left + rect.main.outerWidth > rect.viewport.right)
                            pointAdjust = "right";
                        if (left + rect.main.outerWidth > rect.viewport.right)
                            left = rect.target.right - rect.main.outerWidth + rect.main.marginLeft;
                        if (left + rect.main.outerWidth > rect.viewport.right)
                            left = rect.target.right - rect.main.outerWidth;
                        if (left + rect.main.outerWidth > rect.viewport.right)
                            left = rect.viewport.right - rect.main.outerWidth;
                    }

                    if (left !== "auto" && top === "auto" && (position === "left" || position === "right")) {
                        top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;

                        if (top < rect.viewport.top)
                            pointAdjust = "top";
                        if (top < rect.viewport.top)
                            top = rect.target.top - rect.main.marginTop;
                        if (top < rect.viewport.top)
                            top = rect.target.top;
                        if (top < rect.viewport.top)
                            top = rect.viewport.top;

                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            pointAdjust = "bottom";
                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            top = rect.target.bottom - rect.main.outerHeight + rect.main.marginTop;
                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            top = rect.target.bottom - rect.main.outerHeight;
                        if (top + rect.main.outerHeight > rect.viewport.bottom)
                            top = rect.viewport.bottom - rect.main.outerHeight;
                    }
                }

                // set position object with methods to
                // position toolbar
                var _setPosition = {
                    // position toolbar outside element touching element border with middle align
                    outsideSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top - rect.main.outerHeight >= rect.viewport.top && rect.target.top <= rect.viewport.bottom && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.top - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom >= rect.viewport.top && rect.target.bottom + rect.main.outerHeight <= rect.viewport.bottom && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.bottom;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left - rect.main.outerWidth >= rect.viewport.left && rect.target.left <= rect.viewport.right && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.left - rect.main.outerWidth;
                            point = "right";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right >= rect.viewport.left && rect.target.right + rect.main.outerWidth <= rect.viewport.right && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.right;
                            point = "left";
                        }
                    },

                    // position toolbar outside element not touching element border with middle align
                    outsideNonSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.bottom <= rect.viewport.top && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.top;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.top >= rect.viewport.bottom - rect.main.outerHeight && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.right <= rect.viewport.left && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.left >= rect.viewport.right - rect.main.outerWidth && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                    },

                    // position toolbar inside element touching element border with middle align
                    insideSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top >= rect.viewport.top && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.top;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom <= rect.viewport.bottom && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.target.bottom - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left >= rect.viewport.left && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right <= rect.viewport.right && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.target.right - rect.main.outerWidth;
                            point = "right";
                        }
                    },

                    // position toolbar inside element not touching element border with middle align
                    insideNonSticked: function(position) {
                        if (top === "auto" && position === "top" && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.top;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft >= rect.viewport.left && rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft + rect.main.outerWidth <= rect.viewport.right) {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            left = rect.target.left + rect.target.width / 2 - rect.main.width / 2 - rect.main.marginLeft;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop > rect.viewport.top && rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.top + rect.target.height / 2 - rect.main.height / 2 - rect.main.marginTop;
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                    },

                    // position toolbar outside element touching element border with align adjust
                    outsideStickedAligned: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top - rect.main.outerHeight >= rect.viewport.top && rect.target.top <= rect.viewport.bottom) {
                            top = rect.target.top - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom >= rect.viewport.top && rect.target.bottom + rect.main.outerHeight <= rect.viewport.bottom) {
                            top = rect.target.bottom;
                            point = "top";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left - rect.main.outerWidth >= rect.viewport.left && rect.target.left <= rect.viewport.right) {
                            left = rect.target.left - rect.main.outerWidth;
                            point = "right";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right >= rect.viewport.left && rect.target.right + rect.main.outerWidth <= rect.viewport.right) {
                            left = rect.target.right;
                            point = "left";
                        }
                        else
                            return;

                        _setAlign(position);
                    },

                    // position toolbar outside element not touching element border with align adjust
                    outsideNonStickedAligned: function(position) {
                        if (top === "auto" && position === "top" && rect.target.bottom <= rect.viewport.top) {
                            top = rect.viewport.top;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.top >= rect.viewport.bottom - rect.main.outerHeight) {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.right <= rect.viewport.left) {
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.left >= rect.viewport.right - rect.main.outerWidth) {
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                        else
                            return;

                        _setAlign(position);
                    },

                    // position toolbar inside element touching element border with align adjust
                    insideStickedAligned: function(position) {
                        if (top === "auto" && position === "top" && rect.target.top >= rect.viewport.top) {
                            top = rect.target.top;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom" && rect.target.bottom <= rect.viewport.bottom) {
                            top = rect.target.bottom - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left" && rect.target.left >= rect.viewport.left) {
                            left = rect.target.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right" && rect.target.right <= rect.viewport.right) {
                            left = rect.target.right - rect.main.outerWidth;
                            point = "right";
                        }
                        else
                            return;

                        _setAlign(position);
                    },

                    // position toolbar inside element not touching element border with align adjust
                    insideNonStickedAligned: function(position) {
                        if (top === "auto" && position === "top") {
                            top = rect.viewport.top;
                            point = "top";
                        }
                        else if (top === "auto" && position === "bottom") {
                            top = rect.viewport.bottom - rect.main.outerHeight;
                            point = "bottom";
                        }
                        else if (left === "auto" && position === "left") {
                            left = rect.viewport.left;
                            point = "left";
                        }
                        else if (left === "auto" && position === "right") {
                            left = rect.viewport.right - rect.main.outerWidth;
                            point = "right";
                        }
                        else
                            return;

                        _setAlign(position);
                    },
                }

                var methodPosition = [ "outsideSticked", "outsideNonSticked", "insideSticked", "insideNonSticked", "outsideStickedAligned", "outsideNonStickedAligned", "insideStickedAligned", "insideNonStickedAligned" ];
                for (var i = 0; i < methodPosition.length; i++) {
                    var method = methodPosition[i];

                    for (var j = 0; j < validPosition.length; j++) {
                        var position = validPosition[j];

                        // for beeter ux lets skip some methods
                        if ((method === "insideNonSticked" || method === "insideNonStickedAligned") && position === "top" && validPosition.indexOf("bottom") !== -1)
                            continue;

                        _setPosition[method](position);
                        if (left !== "auto" && top !== "auto")
                            break;
                    }

                    if (left !== "auto" && top !== "auto")
                        break;
                }
            }
            else {
                // get current toolbar position
                top = rect.parent.top;
                right = "auto";
                bottom = "auto";
                left = rect.parent.left;

                // adjust to fit in viewport
                if (left + rect.parent.width > rect.viewport.right)
                    left = rect.viewport.right - rect.parent.width;
                if (top + rect.parent.height > rect.viewport.bottom)
                    top = rect.viewport.bottom - rect.parent.height;
            }

            // context opened
            if (rect.context.width && rect.context.height) {
                var validContextPosition = [];
                if (point === "right")
                    validContextPosition = [ "bottom", "top", "left", "right" ];
                else if (point === "left")
                    validContextPosition = [ "bottom", "top", "right", "left" ];
                else if (point === "top")
                    validContextPosition = [ "right", "left", "bottom", "top" ];
                else
                    validContextPosition = [ "right", "left", "top", "bottom" ];

                // find best position for context
                for (var i = 0; i < validContextPosition.length; i++) {
                    contextPosition = validContextPosition[i];

                    var inViewport = false
                        || (contextPosition === "bottom" && top + rect.main.outerHeight + rect.context.outerHeight <= rect.viewport.bottom)
                        || (contextPosition === "top" && top - rect.context.outerHeight >= rect.viewport.top)
                        || (contextPosition === "right" && left + rect.main.outerWidth + rect.context.outerWidth <= rect.viewport.right)
                        || (contextPosition === "left" && left - rect.context.outerWidth >= rect.viewport.left)
                    if (inViewport)
                        break;
                }

                // horizontaly adjust context
                if (contextPosition === "top" || contextPosition === "bottom") {

                }

                // vertically adjust context
                else {
                    if (top + rect.context.outerHeight > rect.viewport.bottom)
                        contextOffset = -1 * (rect.viewport.bottom - rect.context.outerHeight - top);
                }

                /*
                if (contextPosition === "right" && left + rect.main.outerWidth + rect.context.outerWidth > rect.viewport.right)
                    contextPosition = "left";
                if (contextPosition === "left" && left - rect.context.outerWidth < rect.viewport.left)
                    contextPosition = "right";

                // vertically adjust context
                if (top + rect.context.outerHeight > rect.viewport.bottom)
                    contextOffset = -1 * (rect.viewport.bottom - rect.context.outerHeight - top);
                */
            }

            // swap non-sticky left/right and top/bottom
            if (!isSticky) {
                if (rect.viewport.right - rect.parent.right + rect.scrollBar[1] < rect.parent.left) {
                    right = rect.viewport.right - rect.parent.right + rect.scrollBar[1];
                    left = "auto";
                }

                if (rect.viewport.bottom - rect.parent.bottom < rect.parent.top) {
                    bottom = rect.viewport.bottom - rect.parent.bottom;
                    top = "auto";
                }
            }

            // set toolbar position and reset display
            that.$ui.parent
                .attr("data-op3-toolbar-point", point)
                .attr("data-op3-toolbar-point-adjust", pointAdjust)
                .attr("data-op3-toolbar-context-position", contextPosition)
                .css({
                    "--context-offset": contextOffset + "px",
                    top: top,
                    left: left,
                    right: right,
                    bottom: bottom,
                });
        },

        /**
         * Show toolbar
         *
         * @return {Void}
         */
        show: function() {
            if (!that.element)
                return;

            that.$ui.parent
                .addClass("op3-toolbar-active");
            that.reposition();
        },

        /**
         * Hide toolbar
         *
         * @return {Void}
         */
        hide: function() {
            that.hideContext();

            that.$ui.parent
                .removeClass("op3-toolbar-active");
            //that.reposition();
            // hideContext did it, no need for another reposition
        },

        /**
         * Show context menu
         *
         * @param  {Number} navIndex
         * @param  {Number} tabIndex
         * @return {Void}
         */
        showContext: function(navIndex, tabIndex) {
            navIndex = navIndex || 0;
            tabIndex = tabIndex || 0;

            var oldNavIndex = that.$ui.parent.attr("data-op3-toolbar-nav-index")*1,
                oldTabIndex = that.$ui.parent.attr("data-op3-toolbar-context-tab-index")*1;
            oldNavIndex = isNaN(oldNavIndex) ? -1 : oldNavIndex;
            oldTabIndex = isNaN(oldTabIndex) ? -1 : oldTabIndex;
            if (oldNavIndex === navIndex*1 && oldTabIndex === tabIndex)
                return;

            that.hideContext();

            that.$ui.parent
                .attr("data-op3-toolbar-nav-index", navIndex)
                .attr("data-op3-toolbar-context-tab-index", tabIndex);

            that._renderContext();

            that.$ui.context
                .addClass("op3-toolbar-active");

            that.reposition();
        },

        /**
         * Hide context menu
         *
         * @return {Void}
         */
        hideContext: function() {
            if (!that.$ui.context.hasClass("op3-toolbar-active"))
                return;

            that.$ui.context
                .removeClass("op3-toolbar-active")

            var emit = {
                node: that.element.node(),
                parent: that.$ui.form.get(0),
                type: that.element.type(),
            }
            OP3.transmit("elementoptionsclear", emit);
            OP3.transmit("elementoptionsclear::" + emit.type, emit);

            var isSyncing = !!that.__isSyncing;
            that.__isSyncing = true;

            that.$ui.contextContent
                .empty();
            that.$ui.contextNav
                .empty();
            that.$ui.list
                .find(".op3-toolbar-list-item")
                .removeClass("op3-toolbar-active");

            that.$ui.parent
                .removeAttr("data-op3-toolbar-nav-index")
                .removeAttr("data-op3-toolbar-context-tab-index");

            if (!isSyncing)
                delete that.__isSyncing;

            that.reposition();
        },

        /**
         * Create new child type element and append it
         * to it's parent (relative to focused element)
         *
         * @param  {String} parent
         * @param  {String} child
         * @return {Void}
         */
        _actionAddElement: function(parent, child) {
            var element = that.element,
                rel = OP3.$(element),
                clone;
            if (rel.type() !== child)
                rel = OP3.$(element).closest(parent).children(child).last();

            // create new child-like element
            try {
                // this is dirty quickfix for bullet block icons
                // @todo refactor the element to have icons on the parent
                // then remove this !!!!
                if (parent === "bulletblock") {
                    clone = rel.clone();
                    clone.setOption("html", '<loremipsum method="paragraph" min="3" max="4" />')
                }
                else if (parent === "faq") {
                    clone = rel.clone();
                    clone.setOption("html", '<p><loremipsum method="paragraph" min="2" max="3" /></p>')
                }
                else if (parent === "creditcard") {
                    clone = rel.clone();
                }
                else if (parent === "contenttoggle") {
                    clone = OP3.$("<_" + child + "_template />");
                    clone.setOption("op3Icon", rel.getOption("op3Icon"), "all");
                    clone.setOption("op3Icon2", rel.getOption("op3Icon2"), "all");
                }
                else if (parent === "featureblock") {
                    clone = OP3.$("<_" + child + "_template />");
                    var icon = clone.find("icon");
                    setTimeout(function() {
                        icon.setOption("iconFrame", rel.find("icon").getOption("iconFrame"), "all")
                        icon.setOption("iconShape", rel.find("icon").getOption("iconShape"), "all");
                    })
                }
                else if (parent === "tabsheader") {
                    clone = OP3.$("<_" + child + "_template />");
                    clone.setOption("op3Icon", rel.getOption("op3Icon"), "all");
                    clone.setOption("blockDisplayMedia", rel.getOption("blockDisplayMedia"), "all");
                    clone.setOption("blockLayoutDesktop", rel.getOption("blockLayoutDesktop"), "all");
                    clone.setOption("blockLayoutTablet", rel.getOption("blockLayoutTablet"), "all");
                    clone.setOption("blockLayoutMobile", rel.getOption("blockLayoutMobile"), "all");
                    clone.setOption("src", OP3.Meta.assets + "/img/logo.svg", "all");

                }
                else {
                    clone = OP3.$("<_" + child + "_template />");
                }
            }
            catch (e) {
                clone = OP3.$("<" + child + " />");
            }

            // append it to dom
            clone.insertAfter(rel);
        },

        /**
         * LoadLang event handler
         * convert function config to object
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleLoadLang: function(e, o) {
            if (typeof that._config === "function")
                that._config = that._config();
        },

        /**
         * WorkerReady event handler
         * render toolbar
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleWorkerReady: function(e, o) {
            OP3.Worker.append(that._render);
        },

        /**
         * ElementFocus event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementFocus: function(e, o) {
            if (!that._config[o.type])
                return;

            var element = OP3.$(o.node),
                node = element.node(),
                $node = element.jq(),
                uuid = element.uuid(),
                gid = element.gid(),
                type = element.type(),
                style = element.style(),
                spec = element.spec(),
                path = element.path(),
                //fullPath = element.path(true),
                userRole = OP3.Meta.userRole,
                config = OP3.Designer.config(type),
                enabled = config.enabled,
                hasStyles = config && config.styles && config.styles.length ? 1 : 0,
                hasPresets = config && config.presets && config.presets.length ? 1 : 0,
                children = element.children(),
                childrenCount = children.length,
                isFirstChild = $node.is(":first-child"),
                isLastChild = $node.is(":last-child"),
                isFirstVisibleChild = isFirstChild || !$node.prevAll(".op3-element").filter(function() { return $(this).css("display") !== "none"; }).length,
                isLastVisibleChild = isLastChild || !$node.nextAll(".op3-element").filter(function() { return $(this).css("display") !== "none"; }).length,
                rowChildrenCount = element.closestHorizontal().children().length,
                linkPropertiesValue = element.getOption("linkProperties", "all"),
                linkPropertiesLength = OP3.LinkProperties._cousins ? OP3.LinkProperties._cousins.children.length : 0;

            that.element = element.element();

            that.$ui.form
                .attr("data-op3-user-role", userRole)
                .attr("data-op3-element-options-type", type)
                .attr("data-op3-element-options-enabled", enabled ? "1" : "0")
                .attr("data-op3-element-options-uuid", uuid)
                .attr("data-op3-element-options-gid", gid)
                .attr("data-op3-element-options-style", style)
                .attr("data-op3-element-options-spec", spec)
                .attr("data-op3-element-options-path", path)
                //.attr("data-op3-element-options-path-full", fullPath)
                .attr("data-op3-element-options-has-styles", hasStyles)
                .attr("data-op3-element-options-has-presets", hasPresets)
                .attr("data-op3-element-options-children-count", childrenCount)
                .attr("data-op3-element-options-row-children-count", rowChildrenCount)
                .attr("data-op3-element-options-is-first-child", isFirstChild ? "1" : "0")
                .attr("data-op3-element-options-is-last-child", isLastChild ? "1" : "0")
                .attr("data-op3-element-options-is-first-visible-child", isFirstVisibleChild ? "1" : "0")
                .attr("data-op3-element-options-is-last-visible-child", isLastVisibleChild ? "1" : "0")
                .attr("data-op3-parent-options-property-value-linkproperties", linkPropertiesValue)
                .attr("data-op3-parent-options-property-length-linkproperties", linkPropertiesLength);

            that.$ui.title
                .text(that._config[type].label || config.title);
            that.$ui.help
                .attr("href", config.helpUrl || "");

            that._renderNav();

            OP3.LiveEditor.$ui.propertyContainer = $(OP3.LiveEditor.$ui.propertyContainer)
                .add(that.$ui.form);

            var emit = {
                node: node,
                parent: that.$ui.form.get(0),
                type: type,
            }
            OP3.transmit("elementoptionsformattach", emit);
            OP3.transmit("elementoptionsformattach::" + emit.type, emit);

            that.show();
        },

        /**
         * ElementUnfocus event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementUnfocus: function(e, o) {
            if (!that._config[o.type])
                return;

            // if we change form property input and click on
            // designer document to unfocus current element,
            // unfocus event it triggered before input change.
            // we need to force input change before we unbind
            // change event from form.
            if ($(document.activeElement).closest(that.$ui.form).length)
                document.activeElement.blur();

            that.hide();

            that.$ui.list
                .empty();
            that.$ui.title
                .text("Unknown Element");

            that.$ui.form
                .removeAttr("data-op3-user-role")
                .removeAttr("data-op3-element-options-type")
                .removeAttr("data-op3-element-options-enabled")
                .removeAttr("data-op3-element-options-uuid")
                .removeAttr("data-op3-element-options-gid")
                .removeAttr("data-op3-element-options-style")
                .removeAttr("data-op3-element-options-spec")
                .removeAttr("data-op3-element-options-path")
                .removeAttr("data-op3-element-options-path-full")
                .removeAttr("data-op3-element-options-has-styles")
                .removeAttr("data-op3-element-options-has-presets")
                .removeAttr("data-op3-element-options-children-count")
                .removeAttr("data-op3-element-options-row-children-count")
                .removeAttr("data-op3-element-options-is-first-child")
                .removeAttr("data-op3-element-options-is-last-child")
                .removeAttr("data-op3-element-options-is-first-visible-child")
                .removeAttr("data-op3-element-options-is-last-visible-child")
                .removeAttr("data-op3-parent-options-property-value-linkproperties")
                .removeAttr("data-op3-parent-options-property-length-linkproperties");

            var element = that.element;
            that.element = null;

            OP3.LiveEditor.$ui.propertyContainer = $(OP3.LiveEditor.$ui.propertyContainer)
                .not(that.$ui.form);

            var emit = {
                node: element.node(),
                parent: that.$ui.form.get(0),
                type: element.type(),
            };
            OP3.transmit("elementoptionsformdetach", emit);
            OP3.transmit("elementoptionsformdetach::" + emit.type, emit);
        },

        /**
         * ElementGid event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementGid: function(e, o) {
            if (!o.node || !that.element || that.element.node() !== o.node)
                return;

            that.$ui.form
                .attr("data-op3-element-options-gid", o.value.after);
        },

        /**
         * ElementAppend event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementAppend: function(e, o) {
            if (!o.node || !that.element)
                return;

            var element = OP3.$(that.element),
                parentNode = OP3.$(o.node).parent().node(),
                reposition = false;
            if (parentNode === element.node()) {
                that.$ui.form
                    .attr("data-op3-element-options-children-count", element.children().length);

                reposition = true;
            }

            var row = element.closestHorizontal();
            if (parentNode === row.node())
                that.$ui.form
                    .attr("data-op3-element-options-row-children-count",  row.children().length);

            if (reposition)
                that.reposition();
        },

        /**
         * ElementDetach event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementDetach: function(e, o) {
            if (!o.parent || !that.element)
                return;

            var element = OP3.$(that.element),
                reposition = false;
            if (o.parent === element.node()) {
                that.$ui.form
                    .attr("data-op3-element-options-children-count", element.children().length);

                reposition = true;
            }

            var row = element.closestHorizontal();
            if (o.parent === row.node())
                that.$ui.form
                    .attr("data-op3-element-options-row-children-count",  row.children().length);

            if (reposition)
                that.reposition();
        },

        /**
         * ElementChange event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChange: function(e, o) {
            if (!o.node || !that.element || o.node !== that.element.node())
                return;
            if (!o.forceComputed && o.media !== OP3.LiveEditor.deviceMedia())
                return;

            that._sync(o.id);
            that._handleReposition();
        },

        /**
         * ElementChange for property linkProperties
         * event handler:
         * add data attribute to form so css can
         * show/hide lock icon
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChangeLinkProperties: function(e, o) {
            if (!o.node || !that.element || o.node !== that.element.node())
                return;

            that.$ui.form.attr("data-op3-parent-options-property-value-linkproperties", o.value.after);
        },

        /**
         * ElementOptionsSyncRequest event handler:
         * sync data
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementOptionsSyncRequest: function(e, o) {
            if (!that.element)
                return;

            var props = null;
            if (e.type === "op3elementoptionssyncrequest")
                props = o.property || null;

            that._sync(props);
        },

        /**
         * ElementOptionsRefreshRequest event handler:
         * re-render and replace form propertie(s)
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementOptionsRefreshRequest: function(e, o) {
            if (!that.element)
                return;

            var property = o.property;
            if (typeof property === "string")
                property = [ property ];
            if (property.length === 1 && property[0] === "*")
                property = that.$ui.form
                    .find(".op3-element-options-property[data-op3-element-options-property-id]")
                    .map(function() {
                        return $(this).attr("data-op3-element-options-property-id");
                    })
                    .toArray();

            if (OP3.$.type(property) !== "array")
                return;

            var element = that.element,
                node = element.node(),
                type = element.type(),
                selector = property
                    .map(function(item) {
                        return '.op3-element-options-property[data-op3-element-options-property-id="' + item + '"]';
                    })
                    .join(",");

            var isSyncing = !!that.__isSyncing;
            that.__isSyncing = true;

            that.$ui.form
                .find(selector)
                .each(function() {
                    var $old = $(this),
                        key = $old.attr("data-op3-element-options-property-id"),
                        prop = element.findProperty(key),
                        widget = prop.render(),
                        $input = $(widget).find(".op3-element-options-property-input"),
                        filterLink = $old.data("jquery-filter-button-link"),
                        filterElement = filterLink ? $(filterLink).data("jquery-filter-button-element") : null,
                        emit = {
                            node: node,
                            parent: this,
                            type: type,
                        };
                    OP3.transmit("elementoptionsclear", emit);
                    OP3.transmit("elementoptionsclear::" + emit.type, emit);

                    // replace old with new
                    $old
                        .after(widget)
                        .remove();

                    // refresh filter (if any)
                    if (filterElement)
                        $(filterElement).filterButton("refresh");

                    emit = {
                        node: node,
                        type: type,
                        parent: widget,
                    };
                    OP3.transmit("elementoptionsrefreshing", emit);
                    OP3.transmit("elementoptionsrefreshing::" + emit.type, emit);
                    OP3.transmit("elementoptionsrefresh", emit);
                    OP3.transmit("elementoptionsrefresh::" + emit.type, emit);
                });

            if (!isSyncing)
                delete that.__isSyncing;
        },

        /**
         * ElementClipboardCopy event handler:
         * set data attributes on that.form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementClipboardCopy: function(e, o) {
            that.$ui.form
                .attr("data-op3-element-options-allow-paste", "1");
        },

        /**
         * Device change event handler:
         * sync data
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDeviceChange: function(e, o) {
            that._handleElementOptionsSyncRequest(e, o);
        },

        /**
         * Event handler
         * (resize/scroll)
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleReposition: function(e) {
            if (!that.$ui.parent.hasClass("op3-toolbar-sticky"))
                return;

            if (that._intervalReposition)
                clearInterval(that._intervalReposition);

            // using interval to prevent repositionin on
            // every resize/scroll (do reposition on
            // stopped user interaction - resizeEnd/scrollEnd)
            that._intervalReposition = setTimeout(function() {
                // wait after the input (drag) is finished,
                // to avoid moving the toolbar when user
                // is using it
                if (OP3.LiveEditor.$ui.body.hasClass("op3-input-range-dragging")) {
                    that._handleReposition(e);
                    return;
                }

                delete that._intervalReposition;
                that.reposition();
            }, 100);
        },

        /**
         * Form change event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleFormChange: function(e) {
            if (that.__isSyncing)
                return;

            var $target = $(e.target),
                media = $target.attr("data-op3-element-options-property-media"),
                key = $target.attr("data-op3-element-options-property-id"),
                value = $target.val();

            that.element.setOption(key, value, media);

            // When entering invalid value into property widget the
            // elementchange op3 event is not triggered. Value you
            // entered is invalid, validator in setter refuses to
            // set value, so no elementchange event. In this case
            // we have invalid value in our widget. Lets make sure
            // that this is synced...
            var newValue = that.element.getOption(key, media);
            if (value !== newValue)
                that._sync(key);
        },

        /**
         * Click on close toolbar icon
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleCloseClick: function(e) {
            if (!that.element)
                return;

            that.element.unfocus();

            $(e.currentTarget).blur();
            e.preventDefault();
        },

        /**
         * Click on Focus Parent Element toolbar icon
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleParentClick: function(e) {
            if (!that.element)
                return;

            OP3.$(that.element)
                .parent()
                .focus();

            $(e.currentTarget).blur();
            e.preventDefault();
        },

        /**
         * Click on sticky toolbar icon
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleStickyClick: function(e) {
            that.$ui.parent.toggleClass("op3-toolbar-sticky");

            that.hideContext();
            that.reposition();

            $(e.currentTarget).blur();
            e.preventDefault();
        },

        /**
         * Element item action click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleActionClick: function(e) {
            e.preventDefault();

            var action = $(this).attr("data-op3-toolbar-action"),
                method = action
                    .replace(/[\W_]+/g, "-")
                    .replace(/\-(\w)/g, function(a, b) {
                        return b.toUpperCase();
                    });

            method = "_handleAction_" + method;
            if (typeof that[method] === "function")
                that[method].call(this, e);
        },

        /**
         * Element item action context click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleAction_context: function(e) {
            var $current = $(this).closest(".op3-toolbar-list-item"),
                oldNavIndex = that.$ui.parent.attr("data-op3-toolbar-nav-index")*1,
                newNavIndex = $current.index();

            if (!that.$ui.context.hasClass("op3-toolbar-active") || oldNavIndex !== newNavIndex)
                that.showContext(newNavIndex);
            else
                that.hideContext();
        },

        /**
         * Action toggle link properties
         * parse event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleAction_toggleLinkProperties: function(e) {
            that.hideContext();

            var element = that.element,
                key = "linkProperties",
                media = "all",
                linked = !!(element.getOption(key, media)*1);

            element.setOption(key, linked ? "0" : "1", media);
        },

        _handleAction_toggleSidebar: function(e) {
            that.hideContext();

            OP3.transmit("elementoptionssidebartogglerequest");
        },


        /**
         * Action toggle sidebar with design tab
         *
         * @param {Object} e
         */
        _handleAction_toggleSidebarDesign: function(e) {
            that.hideContext();

            OP3.transmit("elementoptionssidebartogglerequest", { tab: "design" });
        },

        /**
         * Action toggle sidebar with global-element tab
         *
         * @param {Object} e
         */
        _handleAction_toggleSidebarGlobalElement: function(e) {
            that.hideContext();

            OP3.transmit("elementoptionssidebartogglerequest", { tab: "global-element" });
        },

        /**
         * Action up parse event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleAction_up: function(e) {
            if (!OP3.LiveEditor.checkLicense())
                return;

            that.hideContext();

            var element = OP3.$(that.element),
                $rel = element.jq().prev();

            element
                .unfocus()
                .detach()
                .insertBefore($rel)
                .focus();
        },

        /**
         * Action down parse event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleAction_down: function(e) {
            if (!OP3.LiveEditor.checkLicense())
                return;

            that.hideContext();

            var element = OP3.$(that.element),
                $rel = element.jq().next();

            element
                .unfocus()
                .detach()
                .insertAfter($rel)
                .focus();
        },

        _handleAction_clone: function(e) {
            if (!OP3.LiveEditor.checkLicense())
                return;

            that.hideContext();

            var element = OP3.$(that.element),
                $rel = element.jq();

            element
                .unfocus()
                .clone()
                    .insertAfter($rel)
                    .focus();
        },

        _handleAction_addElement: function(e) {
            if (!OP3.LiveEditor.checkLicense())
                return;

            var args = [];
            try {
                args = JSON.parse($(e.currentTarget).closest("[data-op3-toolbar-args]").attr("data-op3-toolbar-args"));
            }
            catch(e) {
                // pass
            }

            that._actionAddElement.apply(this, args);
        },

        _handleAction_delete: function(e) {
            if (!OP3.LiveEditor.checkLicense())
                return;

            that.hideContext();
            OP3.transmit("elementrequestdetach", { node: that.element.node() });
        },

        _handleTabClick: function(e) {
            e.preventDefault();

            var $current = $(this).closest(".op3-toolbar-list-item"),
                oldNavIndex = that.$ui.parent.attr("data-op3-toolbar-nav-index")*1,
                //oldTabIndex = that.$ui.parent.attr("data-op3-toolbar-context-tab-index")*1,
                newNavIndex = oldNavIndex,
                newTabIndex = $current.index();

            that.showContext(newNavIndex, newTabIndex);
        },

        /**
         * Click on Reset Property icon
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handlePropertyReset: function(e) {
            e.preventDefault();

            var $widget = $(e.currentTarget).closest(".op3-element-options-property"),
                element = that.element,
                media = OP3.LiveEditor.deviceMedia(),
                key = $widget.attr("data-op3-element-options-property-id");
            element.resetOption(key, media);
        },

        /**
         * Draggable start event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDraggableStart: function(e, o) {
            that.hideContext();
            OP3.LiveEditor.sidebarHide();

            // do we have scrollbar
            var hasScroll = OP3.LiveEditor.$ui.frameWrapper.css("overflow-y") === "scroll";
            if (!hasScroll) {
                // frameWrapper element has no overflow-y, maybe
                // the scrollbar is inside frame's html element
                var scrollElement = OP3.Designer.$ui.html.get(0).ownerDocument.scrollingElement;
                hasScroll = scrollElement.scrollHeight > scrollElement.clientHeight;
            }

            // store scrollSize to event data
            var scrollSize = hasScroll ? (parseInt(window.scrollbarSize) || 17) : 0;
            o.scroll = [ scrollSize, 0 ];
        },

        /**
         * Draggable move event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDraggableMove: function(e, o) {
            var css = o.css,
                rect = o.rect,
                rel = o.element.rel,
                viewport = o.viewport,
                scroll = o.scroll,
                boundaries = {
                    top: rel[1],
                    right: rel[0] + viewport[2] - scroll[0],
                    bottom: rel[1] + viewport[3] - scroll[1],
                    left: rel[0],
                };

            // fix css object so element will fit to viewport
            if (rect.left < boundaries.left)
                css.left = boundaries.left + "px";
            if (rect.top < boundaries.top)
                css.top = boundaries.top + "px";
            if (rect.right > boundaries.right)
                css.left = boundaries.right - rect.width + "px";
            if (rect.bottom > boundaries.bottom)
                css.top = boundaries.bottom - rect.height + "px";
        },

        /**
         * Draggable stop event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDraggableStop: function(e, o) {
            that.reposition();
        },

        /**
         * Element dragstart event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleElementDragstart: function(e) {
            if (!that.element)
                return;

            var element = OP3.$(that.element),
                type = element.type(),
                source = element.node(),
                config = element.config(),
                template = OP3.$.templating(OP3.LiveEditor._templateSidebarCategoriesElement, config),
                parent = element.parent(),
                ancestor = "document",
                lock = parent.length && parent.config().dragLockChildren ? "#" + parent.uuid() : null,
                ghost = $(template).find(".op3-element-thumb");

            element.jq()
                .addClass("op3-drag-source");

            e.setData("type", type);
            e.setData("source", source);
            e.setData("destination", null);
            e.setData("method", null);
            e.setData("config", config);
            e.setData("ancestor", ancestor);
            e.setData("lock", lock);
            e.setData("grid", {});
            e.setGhostElement(ghost);

            element.unfocus();
        },

        /**
         * Element dragevent event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleElementDragend: function(e) {
            $(e.getData("source"))
                .removeClass("op3-drag-source");
        },

        /**
         * Toolbar form submit event handler
         *
         * @param {Object} e
         * @return {Void}
         */
        _handleFormSubmit: function(e) {
            // Toolbar form will never be submitted.
            e.preventDefault();
        }
    }

    // globalize
    window.OP3.Toolbar = that;

    // autoinit
    OP3.bind("load::designer", function(e,o) {
        that._init();
    });

    // bind
    OP3.bind("ready", function(e, o) {
        // make sure that all toolbar context is hidden
        // when iceeditor is focused OP3-585
        OP3.Designer.ownerDocument.addEventListener("iceselect", function(e) {
            OP3.Toolbar.hideContext();
        });

        // hide toolbar context on live-editor click
        $(OP3.LiveEditor.ownerDocument).on("click", function(e) {
            var $target = $(e.target);
            if ($target.closest("#toolbar").length || !$target.prop("isConnected"))
                return;

            // click event occurs after mousedown, so we can
            // not detect if this is dragend event (and we
            // don't want to hide context on dragend).
            // target should never be html element,
            // since there is always body above it.
            // if target is html that means that
            // body had pointer-events:none,
            // which is added on dragstart...
            if (!$target.is("html"))
                OP3.Toolbar.hideContext();
        });
    });

})(jQuery, window, document);
