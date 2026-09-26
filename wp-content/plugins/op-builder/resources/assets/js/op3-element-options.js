/**
 * OptimizePress3 element options box.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    var that = {

        /**
         * Configuration for each element type
         * (this object is defined inside
         * op3-element-options-config.js)
         *
         * @type {Object}
         */
        _config: {

            /*
            // default is element type
            default: {
                // label written on top of sidebar
                // (usually element name)
                label: OP3._("Default"),

                // tabs (array of objects)
                tab: [
                    {
                        // tab id (not used)
                        id: "advanced",

                        // tab label (not used)
                        label: OP3._("Advanced"),

                        // tab icon (not used)
                        icon: "op3-icon-preferences-2",

                        // tab groups (accordions)
                        group: [
                            {
                                // group id (can be used for css targeting)
                                id: "cars",

                                // group label
                                label: OP3._("Cars"),

                                // display reset icon (reset settings to default)
                                reset: true,

                                // tab HTML (before properties)
                                prependHTML: "<p>Lorem ipsum is dummy text...</p>",

                                // list of properties in group
                                property: [ "volvo", "bmw" ],
                            },
                            {
                                // another group id
                                id: "another_cars",

                                // another group label
                                label: OP3._("Another Cars"),

                                // display reset icon (reset settings to default)
                                reset: true,

                                // list of properties in second group
                                property: [ "mercedes" ],

                                // tab HTML (after properties)
                                appendHTML: "<p>Dummy text lorem ipsum is...</p>",
                            }
                        ]
                    },
                ]
            },
            */

        },

        /**
         * Form template
         * (property is not string but function because
         * we do not have translations yet)
         *
         * @todo - get it from dom?
         *
         * @type {String}
         */
        _template: {
            form: function() {
                return ''
                    +   '<form>'
                    +       '<div id="tab-heading-element" class="tab-heading">'
                    +           '<h2 class="tab-heading-title">Unknown Element</h2>'
                    +           '<a class="op3-help" href="" target="_blank"><i class="op3-icon op3-icon-alert-circle-que-2"></i></a>'
                    +           '<div class="tab-heading-button-wrapper">'
                    +               '<button class="tab-heading-button active" data-op3-element-state="normal" type="button">' + OP3._("Normal") + '</button>'
                    +               '<button class="tab-heading-button" data-op3-element-state="active" type="button">' + OP3._("Active") + '</button>'
                    +               '<button class="tab-heading-button" data-op3-element-state="hover" type="button">' + OP3._("Hover") + '</button>'
                    +           '</div>'
                    +           '<div class="tab-heading-select-parent-element">'
                    +               '<button class="tab-heading-button" type="button">' + OP3._("Select Parent Element") + '</button>'
                    +           '</div>'
                    +       '</div>'
                    +       '<ul class="op3-tabs">'
                    +           '<li class="op3-tab" data-tab="design">'
                    +               '<button type="button">'
                    +                   '<span class="op3-icon op3-icon-wand-99-2"></span>'
                    +                   OP3._("Design")
                    +               '</button>'
                    +           '</li>'
                    +           '<li class="op3-tab" data-tab="style">'
                    +               '<button type="button">'
                    +                   '<span class="op3-icon op3-icon-paint-37-2"></span>'
                    +                   OP3._("Style")
                    +               '</button>'
                    +           '</li>'
                    +           '<li class="op3-tab" data-tab="advanced">'
                    +               '<button type="button">'
                    +                   '<span class="op3-icon op3-icon-preferences-2"></span>'
                    +                   OP3._("Advanced")
                    +               '</button>'
                    +           '</li>'
                    +           '<li class="op3-tab" data-tab="hover">'
                    +               '<button type="button">'
                    +                   '<span class="op3-icon op3-icon op3-icon-cursor-pointer"></span>'
                    +                   OP3._("Hover")
                    +               '</button>'
                    +           '</li>'
                    +           '<li class="op3-tab" data-tab="active">'
                    +               '<button type="button">'
                    +                   '<span class="op3-icon op3-icon op3-icon-light-3-1"></span>'
                    +                   OP3._("Active")
                    +               '</button>'
                    +           '</li>'
                    +           '<li class="op3-tab" data-tab="global-element">'
                    +               '<button type="button">'
                    +                   '<span class="op3-icon op3-icon-globe-1"></span>'
                    +                   OP3._("Global Element")
                    +               '</button>'
                    +           '</li>'
                    +       '</ul>'
                    +       '<div class="tab-content"></div>'
                    +       '<div class="tab-empty">' + OP3._("This element is disabled...") + '</div>'
                    +   '</form>';
            },
            globalElementDropdownContent: function() {
                return ''
                    +   '<div class="op3-element-options-container">'
                    +        '<p class="op3-options-group-notes">Global elements are synced elements you can save to use across site. Change a global element on any page and it will update across other instances of that element.<br><br>Use the Global Element Wizard to update an existing global element name or thumbnail.</p>'
                    +        '<button type="button" data-op3-global-element-action="wizard">' + OP3._("Global Element Wizard") + '</button>'
                    +   '</div>'
                    +   '<div class="op3-element-options-container">'
                    +        '<p class="op3-options-group-notes">Once an element is marked as global, you cannot change its content. If you wish to change the content, unlock the element first.</p>'
                    +        '<button type="button" data-op3-global-element-action="unlock">' + OP3._("Unlock Global Element") + '</button>'
                    +   '</div>'
                    +   '<div class="op3-element-options-container">'
                    +        '<p class="op3-options-group-notes">If you no longer want changes to this element to be synced to other instances of the element, you should unlink the element. Once an element is unlinked, you can no longer link it back to the other global elements of the same design.</p>'
                    +        '<button type="button" data-op3-global-element-action="unlink">' + OP3._("Unlink Global Element") + '</button>'
                    +   '</div>'
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

            OP3.bind("loadlang", that._handleLoadLang);
            OP3.bind("workerready", that._handleWorkerReady);
            OP3.bind("elementfocus", that._handleElementFocus);
            OP3.bind("elementunfocus", that._handleElementUnfocus);
            OP3.bind("elementgid", that._handleElementGid);
            OP3.bind("elementstyle", that._handleElementStyle);
            OP3.bind("elementdrop", that._handleElementDrop);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach elementremove", that._handleElementDetach);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementchange::*::linkProperties", that._handleElementChangeLinkProperties);
            OP3.bind("elementoptionssidebarshowrequest", that._handleElementOptionsSidebarShowRequest);
            OP3.bind("elementoptionssidebarhiderequest", that._handleElementOptionsSidebarHideRequest);
            OP3.bind("elementoptionssidebartogglerequest", that._handleElementOptionsSidebarToggleRequest);
            OP3.bind("elementoptionssyncrequest", that._handleElementOptionsSyncRequest);
            OP3.bind("elementoptionsrefreshrequest", that._handleElementOptionsRefreshRequest);
            OP3.bind("devicechange", that._handleDeviceChange);
            OP3.bind("globalelementeditor", that._handleGlobalElementEditor);
        },

        /**
         * Render sidebar
         *
         * @return {Void}
         */
        _render: function() {
            if (that.$ui.parent)
                return;

            that.$ui.parent = OP3.LiveEditor.$ui.sidebar
                .find('[data-tab="elements"] .options')
                .empty();

            that.$ui.form = $(that._template.form())
                .on("change", that._handleFormChange)
                .on("click", ".op3-tab[data-tab] button", that._handleTabClick)
                .on("click", ".tab-heading-button-wrapper .tab-heading-button", that._handleElementStateClick)
                .on("click", ".tab-heading-select-parent-element button", that._handleParentFocus)
                .on("click", ".op3-element-options-group header", that._handleGroupToggle)
                .on("click", ".op3-options-group-actions .op3-options-group-actions-reset", that._handleGroupReset)
                .on("click", ".op3-element-options-property-reset", that._handlePropertyReset)
                .on("click", ".op3-style-picker [data-style-id]", that._handleStyleClick)
                .on("click", ".op3-preset-picker [data-preset-index]", that._handlePresetClick)
                .appendTo(that.$ui.parent);

            that.$ui.title = that.$ui.form.find(".tab-heading-title");
            that.$ui.help = that.$ui.form.find(".op3-help");
            that.$ui.tabs = that.$ui.form.find(".op3-tabs");
            that.$ui.tabsItem = that.$ui.tabs.find(".op3-tab");
            that.$ui.stateWrapper = that.$ui.form.find(".tab-heading-button-wrapper");
            that.$ui.selectParent = that.$ui.form.find(".tab-heading-select-parent-element");
            that.$ui.content = that.$ui.form.find(".tab-content");

            var emit = {
                node: null,
                parent: that.$ui.form.get(0),
                type: null,
            }
            OP3.transmit("elementoptionsformrender", emit);
            OP3.transmit("elementoptionsformrender::" + emit.type, emit);
        },

        _renderTab: function() {
            that._activateGroup(null);

            that.$ui.content
                .empty();

            // render tab groups
            var activeTab = this.$ui.tabsItem.filter(".selected").attr("data-tab"),
                $content = $(null);
            if (activeTab === "global-element")
                $content = this._renderTabGlobalElement();
            else if (activeTab === "design")
                $content = this._renderTabDesign();
            else
                $content = this._renderTabFromConfig(activeTab);

            // append it to dom
            that.$ui.content
                .append($content);

            // activate first group
            that._activateGroup($content.eq(0).attr("data-op3-element-options-group-id"));
        },

        _renderTabGlobalElement: function() {
            var $result = $(null);
            if (that.element.gid())
                $result = $result.add(that._renderGroup("global-element", OP3._("Global Element")));

            return $result;
        },

        _renderTabDesign: function() {
            var config = that.element.config(),
                $result = $(null);
            if (config.styles && config.styles.length)
                $result = $result.add(that._renderGroup("style-picker", OP3._("Style Picker")));
            if (config.presets && config.presets.length)
                $result = $result.add(that._renderGroup("preset-picker", OP3._("Preset Picker")));

            return $result;
        },

        _renderTabFromConfig: function(id) {
            var element = that.element,
                type = element.type(),
                config = that._config[type],
                $result = $(null);

            (config.tab || [])
                .filter(function(item) {
                    return item.id === id;
                })
                .forEach(function(item) {
                    (item.group || [])
                        .forEach(function(item) {
                            $result = $result.add(that._renderGroup(item.id, item.label, item.reset));
                        });
                });

            return $result;
        },

        /**
         * Render group (dropdown)
         *
         * @param  {String}  groupId
         * @param  {String}  label
         * @param  {Boolean} reset (optional)
         * @return {Object}
         */
        _renderGroup: function(groupId, label, reset) {
            var template = OP3.$.templating(OP3.DocumentOptions._template.group(), {
                id: groupId,
                label: label,
                reset: !!reset,
            });

            return $(template);
        },

        /**
         * Render group (dropdown) content
         *
         * @param  {String} groupId
         * @return {Object}
         */
        _renderGroupContent: function(groupId) {
            var element = that.element,
                type = element.type(),
                config = that._config[type],
                tabId = that.$ui.tabsItem.filter(".selected").attr("data-tab"),
                $result = $("<div />");

            if (tabId === "design" && groupId === "style-picker")
                return that._renderGroupContentDesignStylePicker();
            else if (tabId === "design" && groupId === "preset-picker")
                return that._renderGroupContentDesignPresetPicker();
            else if (tabId === "global-element" && groupId === "global-element")
                return that._renderGroupContentGlobalElement();

            (config.tab || [])
                .filter(function(item) {
                    return item.id === tabId;
                })
                .forEach(function(item) {
                    (item.group || [])
                        .filter(function(item) {
                            return item.id === groupId;
                        })
                        .forEach(function(item) {
                            if (item.prependHTML)
                                $result.append(that._renderHtml(item.prependHTML));

                            (item.property || [])
                                .forEach(function(item) {
                                    $result.append(that._renderProperty(item));
                                });

                            (item.filter || []).forEach(function(item) {
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
                                                context: $result,
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

                            if (item.appendHTML)
                                $result.append(that._renderHtml(item.appendHTML));
                        });
                });

            return $result.children();
        },

        _renderGroupContentDesignStylePicker: function() {
            var element = that.element,
                type = element.type(),
                style = element.style(),
                config = element.config(),
                html = ''
                    + '<ul class="op3-style-picker" data-thumb-size="' + config.thumbSize + '">'
                    + (config.styles || [])
                        .map(function(item) {
                            return ''
                                + '<li class="op3-style-picker-item">'
                                + '<a href="#" draggable="false" data-style-id="' + item.id + '" title="' + item.title + '" class="' + (style === item.id ? "selected" : "") + '">'
                                + '<img src="' + item.thumb + '" alt="' + item.id + '" />'
                                + '</a>'
                                + '</li>';
                        })
                        .join("")
                    + '</ul>';

            return $(html);
        },

        _renderGroupContentDesignPresetPicker: function() {
            var element = that.element,
                type = element.type(),
                config = element.config(),
                html = ''
                    + '<ul class="op3-preset-picker" data-thumb-size="' + config.thumbSize + '">'
                    + (config.presets || [])
                        .map(function(item, index) {
                            return ''
                                + '<li class="op3-preset-picker-item">'
                                + '<a href="#" draggable="false" data-preset-index="' + index + '" title="' + item.title + '">'
                                + '<img src="' + item.thumb + '" alt="" />'
                                + '</a>'
                                + '</li>';
                        })
                        .join("")
                    + '</ul>';

            return $(html);
        },

        _renderGroupContentGlobalElement: function() {
            return $(that._template.globalElementDropdownContent());
        },

        _renderProperty: function(propertyId) {
            var prop = that.element.findProperty(propertyId);
            if (!prop)
                throw "OP3.Toolbar: unable to render property " + propertyId + " for element " + that.element.type + ". Property does not exist.";

            return prop.render();
        },

        _renderHtml: function(html) {
            return $('<div class="op3-element-options-custom-html" />')
                .html(html);
        },

        _prepareForm: function() {
            if (!that.element)
                return;

            var type = that.element.type(),
                config = that.element.config(),
                state = that.$ui.stateWrapper.find(".tab-heading-button.active").attr("data-op3-element-state") || "normal";

            if (that.__forceTabId) {
                state = that.__forceTabId;
            } else if (that.element.gid() && !OP3.GlobalElements.editor().element) {
                state = "global-element";
            } else if (state === "normal") {
                var tabs = that._config[type].tab
                    .find(function(item) {
                        return ![ "design", "hover", "active" ].includes(item.id);
                    });

                state =  tabs ? tabs.id : "advanced";
            }
            delete that.__forceTabId;

            // set active tab
            that.$ui.tabsItem
                .removeClass("selected")
                .filter('[data-tab="' + state + '"]')
                .addClass("selected");

            // select parent element button
            that.$ui.selectParent
                .removeClass("visible")
                .addClass(config.focusParentElementButton ? "visible" : "_temp")
                .removeClass("_temp")
                .find("button")
                    .text(config.focusParentElementButton || "");

            if (that.__forceSidebarShow)
                OP3.LiveEditor.sidebarShow();
            delete that.__forceSidebarShow;

            if (that.__forceSidebarHide)
                OP3.LiveEditor.sidebarHide();
            delete that.__forceSidebarHide;

            if (that.__forceSidebarToggle)
                OP3.LiveEditor.sidebarToggle();
            delete that.__forceSidebarToggle;

            that._renderTab();
        },

        _activateGroup: function(groupId) {
            var emit = {
                node: that.element.node(),
                parent: that.$ui.form.get(0),
                type: that.element.type(),
            }

            // clear current active group
            var $group = that.$ui.content.find(".op3-element-options-group.dropdown");
            if ($group.length) {
                if ($group.attr("data-op3-element-options-group-id") === groupId)
                    return;

                $group
                    .removeClass("dropdown");

                OP3.transmit("elementoptionsclear", emit);
                OP3.transmit("elementoptionsclear::" + emit.type, emit);

                if (!$group.is(".op3-element-options-group-child-preserve"))
                    $group
                        .children(":not(.op3-options-group-header)")
                        .remove();
            }

            if (!groupId)
                return;

            // find group
            $group = that.$ui.content.find('.op3-element-options-group[data-op3-element-options-group-id="' + groupId + '"]');
            if (!$group.length)
                return;

            // render properties from config, append it to
            // content and activate group
            $group
                .append(that._renderGroupContent(groupId))
                .addClass("dropdown");

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

            var isSyncing = !!that.__isSyncing;
            that.__isSyncing = true;

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
         * render sidebar
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
         * set element/form objects, prepare
         * and attach form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementFocus: function(e, o) {
            if (!that._config[o.type])
                return;

            if (that.__styling) {
                delete that.__styling;
                return;
            }

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
                linkPropertiesLength = OP3.LinkProperties._cousins ? OP3.LinkProperties._cousins.children.length : 0,
                tabs = that._getElementSidebarTabs(element).join(" ");

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
                .attr("data-op3-parent-options-property-length-linkproperties", linkPropertiesLength)
                .attr("data-op3-element-options-sidebar-tabs", tabs);


            that.$ui.title
                .text(that._config[type].label || config.title);
            that.$ui.help
                .attr("href", config.helpUrl || "");

            that._prepareForm();

            OP3.LiveEditor.$ui.sidebarTabs
                .find('[data-tab="elements"]')
                .addClass("selected")
                    .siblings()
                    .removeClass("selected");

            // Make sure Normal state tab is marked as active
            // by default on element focus and element drop
            OP3.LiveEditor.$ui.body
                .attr("data-op3-state", "normal")
                .addClass("sidebar-options");
            that.$ui.stateWrapper
                .find(".tab-heading-button")
                .removeClass("active")
                    .filter('[data-op3-element-state="normal"]')
                    .addClass("active");

            OP3.LiveEditor.$ui.propertyContainer = $(OP3.LiveEditor.$ui.propertyContainer)
                .add(that.$ui.form);

            var emit = {
                node: node,
                parent: that.$ui.form.get(0),
                type: type,
            }
            OP3.transmit("elementoptionsformattach", emit);
            OP3.transmit("elementoptionsformattach::" + emit.type, emit);
        },

        /**
         * ElementUnfocus event handler:
         * unbind and detach form, clear
         * form and element objects
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementUnfocus: function(e, o) {
            if (!that._config[o.type])
                return;

            if (that.__styling)
                return;

            // if we change form property input and click on
            // designer document to unfocus current element,
            // unfocus event it triggered before input change.
            // we need to force input change before we unbind
            // change event from form.
            if ($(document.activeElement).closest(that.$ui.form).length)
                document.activeElement.blur();

            // clear state
            that.$ui.stateWrapper
                .removeData("op3-element-options-normal-state-last-active-tab")
                .find(".tab-heading-button")
                .removeClass("active");
            OP3.LiveEditor.$ui.body
                .removeClass("sidebar-options")
                .removeAttr("data-op3-state");

            // remove old content
            that._activateGroup(null);
            that.$ui.content
                .empty();

            // clear ui
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
                .removeAttr("data-op3-parent-options-property-length-linkproperties")
                .removeAttr("data-op3-element-options-sidebar-tabs");

            // unset element
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

            that._prepareForm();
        },

        /**
         * ElementStyle event handler:
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementStyle: function(e, o) {
            if (!o.node || !that.element || that.element.node() !== o.node)
                return;

            that.$ui.form
                .attr("data-op3-element-options-style", o.value.after);

            // since we're not re-rendering form (see
            // _handleStyleClick) we must set active
            // style
            if (that.$ui.tabsItem.filter(".selected").attr("data-tab") === "design")
                that.$ui.form
                    .find(".op3-style-picker [data-style-id]")
                    .removeClass("selected")
                        .filter('[data-style-id="' + o.value.after + '"]')
                        .addClass("selected");
        },

        /**
         * ElementDrop event handler:
         * make sure that "design" tab is opened
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementDrop: function(e, o) {
            // sidebar drop only
            if (typeof o.source !== "string" || o.source.substr(0, 1) !== "<")
                return;

            // we should create temp element and get it's config.
            // if showStylePickerOnDrop is set to true we should
            // open sidebar and select design tab. creating element
            // takes too long sometimes, so we're using regex
            // to optimize this...
            var match = o.source.match(/[a-z]+/);
            if (!match)
                return;

            var config = OP3.Designer.config(match[0]);
            if (!config || !config.showStylePickerOnDrop)
                return;

            that.__forceTabId = "design";
            that.__forceSidebarShow = true;
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
                parentNode = OP3.$(o.node).parent().node();
            if (parentNode === element.node())
                that.$ui.form
                    .attr("data-op3-element-options-children-count", element.children().length);

            var row = element.closestHorizontal();
            if (parentNode === row.node())
                that.$ui.form
                    .attr("data-op3-element-options-row-children-count",  row.children().length);
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

            var element = OP3.$(that.element);
            if (o.parent === element.node())
                that.$ui.form
                    .attr("data-op3-element-options-children-count", element.children().length);

            var row = element.closestHorizontal();
            if (o.parent === row.node())
                that.$ui.form
                    .attr("data-op3-element-options-row-children-count",  row.children().length);
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
         * ElementOptionsSidebarShowRequest event handler:
         * open sidebar and select tab
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementOptionsSidebarShowRequest: function(e, o) {
            if (o && o.tab) {
                var activeTab = that.$ui.tabsItem.filter(".selected").attr("data-tab");

                if (o.tab !== activeTab) {
                    that.__forceTabId = o.tab;
                    that._prepareForm();
                }
            }

            OP3.LiveEditor.sidebarShow();
        },

        /**
         * ElementOptionsSidebarShowRequest event handler:
         * hide sidebar
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementOptionsSidebarHideRequest: function(e, o) {
            OP3.LiveEditor.sidebarHide();
        },

        /**
         * ElementOptionsSidebarShowRequest event handler:
         * toggle sidebar
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementOptionsSidebarToggleRequest: function(e, o) {
            if (!o || !o.tab)
                return OP3.LiveEditor.sidebarToggle();

            var activeTab = that.$ui.tabsItem.filter(".selected").attr("data-tab");
            if (o.tab === activeTab)
                return OP3.LiveEditor.sidebarToggle();

            var $activeTab = that.$ui.tabsItem.filter('.op3-tab[data-tab="' + o.tab + '"]');
            if (!$activeTab.length)
                return OP3.LiveEditor.sidebarToggle();

            return that._handleElementOptionsSidebarShowRequest(e, o);
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

            that.$ui.form
                .find(selector)
                .each(function() {
                    var $old = $(this),
                        key = $old.attr("data-op3-element-options-property-id"),
                        prop = element.findProperty(key),
                        widget = prop.render(),
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

                    // emit event
                    var emit = {
                        node: node,
                        type: type,
                        parent: widget,
                    };
                    OP3.transmit("elementoptionsrefreshing", emit);
                    OP3.transmit("elementoptionsrefreshing::" + emit.type, emit);
                    OP3.transmit("elementoptionsrefresh", emit);
                    OP3.transmit("elementoptionsrefresh::" + emit.type, emit);
                });
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
         * Form change event handler:
         * set element option
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
         * Focus parent element click
         * event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleParentFocus: function(e) {
            var element = OP3.Designer.activeElement();
            var parent = element.parent();

            OP3.$(parent).focus();
        },

        /**
         * Global element editor element change
         * event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleGlobalElementEditor: function(e, o) {
            if (!o.node)
                that._prepareForm();
        },

        /**
         * Tab click event handler:
         * hide/display tabs
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleTabClick: function(e) {
            that.$ui.tabsItem
                .removeClass("selected");
            $(e.target)
                .closest(".op3-tab[data-tab]")
                .addClass("selected");

            that._renderTab();

            e.preventDefault();
        },

        /**
         * Element state click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
         _handleElementStateClick: function(e) {
            e.preventDefault();

            var $target = $(e.target).closest(".tab-heading-button");
            if ($target.hasClass("active"))
                return;

            // get states
            var oldState = OP3.LiveEditor.$ui.body.attr("data-op3-state"),
                newState = $target.attr("data-op3-element-state"),
                activeTab = that.$ui.tabsItem.filter(".selected").attr("data-tab");

            // refresh ui
            that.$ui.stateWrapper
                .data(!["hover", "active"].includes(oldState) ? "op3-element-options-normal-state-last-active-tab" : "_temp-op3-element-options", activeTab)
                .removeData("_temp-op3-element-options")
                .find(".tab-heading-button")
                .removeClass("active");
            $target
                .addClass("active");

            OP3.LiveEditor.$ui.body.attr("data-op3-state", newState);
            OP3.LiveEditor.$ui.sidebarWrapper.scrollTop(0);

            if (!["hover", "active"].includes(newState)) {
                that.__forceTabId = that.$ui.stateWrapper.data("op3-element-options-normal-state-last-active-tab");
            }

            that._prepareForm();
        },

        /**
         * Group header click event handler:
         * toggle group
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleGroupToggle: function(e) {
            e.preventDefault();

            var $target = $(e.target);
            if ($target.closest(".op3-options-group-actions .op3-options-group-actions-reset").length)
                return;

            var $group = $target
                    .closest(".op3-element-options-group"),
                groupId = !$group.hasClass("dropdown") ? $group.attr("data-op3-element-options-group-id") : null;

            that._activateGroup(groupId);

            // Scroll to begining of accordion
            // when block category is long
            var scrollable = $group.closest(".wrapper"),
                top = this.parentNode.offsetTop - this.offsetHeight;
            scrollable.get(0).scrollTo({
                left: 0,
                top: top,
                behavior: "smooth"
            });
        },

        /**
         * Group reset click event handler:
         * reset group
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleGroupReset: function(e) {
            e.preventDefault();

            var element = that.element,
                media = OP3.LiveEditor.deviceMedia(),
                type = element.node() === OP3.Document.node() ? "document" : "element",
                $target = $(e.currentTarget),
                groupTitle = $target.closest(".op3-options-group-header").text(),
                title = "OptimizeBuilder",
                message = "Are you sure you want to reset the " + type + " " + groupTitle + " settings to default?"

            // confirm and iterate
            OP3.UI.confirm(title, message, function() {
                $target
                    .closest(".op3-element-options-group")
                    .find(".op3-element-options-property")
                    .each(function() {
                        var key = $(this).attr("data-op3-element-options-property-id");
                        element.resetOption(key, media);
                    });
            });
        },

        /**
         * Reset property click event handler
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
         * Style click event handler:
         * change element style
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleStyleClick: function(e) {
            e.preventDefault();

            var $target = $(e.currentTarget),
                style = $target.attr("data-style-id");

            // changing element style will unfocus/focus element,
            // which means that the form will be re-rendered. so
            // let's use flag to prevent form re-rendering.
            that.__styling = true;

            that.element.style(style);
        },

        /**
         * Preset click event handler:
         * apply preset
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handlePresetClick: function(e) {
            e.preventDefault();

            var $target = $(e.currentTarget),
                index = $(e.currentTarget).attr("data-preset-index")*1,
                config = that.element.config(),
                preset = config.presets ? config.presets[index] : null;
            if (!preset)
                return;

            that.element.unserializePreset(preset);
        },

        /**
         * Get elements sidebar tabs key names from configuration
         *
         * @param {Object} element
         * @returns {Array}
         */
        _getElementSidebarTabs: function(element) {
            if (!element)
                return [];

            var type = element.type();

            if (!that._config || !that._config[type] || !that._config[type].tab)
                return [];

            var tabs = that._config[type].tab
                .map(function(item) {
                    return item.id;
                });

            // For elements that have styles
            // or presets defined in config
            // add design tab (Presets Tab)
            var config =OP3.Designer.config(type);
            if (!tabs.includes("design") && (config.styles && config.styles.length || config.presets && config.presets.length)) {
                tabs.unshift("design");
            }

            return tabs;
        }
    }

    // globalize
    window.OP3.ElementOptions = that;

    // autoinit
    $(function() {
        OP3.ElementOptions._init();
    });

})(jQuery, window, document);
