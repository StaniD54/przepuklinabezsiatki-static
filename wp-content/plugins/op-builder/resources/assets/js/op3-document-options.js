/**
 * OptimizePress3 element type
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-element-options.js
 */
;(function($, window, document) {

    "use strict";

    var that = {

        /**
         * Configuration
         * (this object is defined inside
         * op3-document-options-config.js)
         *
         * @type {Object}
         */
        _config: {

            /*
            // default is element type
            default: {
                // tab id (not used)
                id: "style",

                // tab label (not used)
                label: OP3._("Style"),

                // tab icon (not used)
                icon: "op3-icon-paint-37-2",

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
            */

        },

        /**
         * Not used
         *
         * @type {Object}
         */
        _template: {
            group: function() {
                return ''
                    +   '<div class="op3-element-options-group" data-op3-element-options-group-id="{id}">'
                    +      '<header class="op3-options-group-header op3-element-options-group-child-preserve">'
                    +           '{label}'
                    +           '<div class="op3-options-group-actions">'
                    +               '<i class="op3-options-group-actions-reset op3-options-group-actions-reset-{reset} op3-icon op3-icon-refresh-02-1" aria-hidden="true"></i>'
                    +               '<i class="op3-options-group-actions-toggle op3-icon op3-icon-stre-up"></i>'
                    +          '</div>'
                    +       '</header>'
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

            OP3.bind("loadlang", that._handleLoadLang);
            OP3.bind("workerready", that._handleWorkerReady);
            OP3.bind("elementappend elementdetach elementremove", that._handleElementChildrenCountChange);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementoptionssyncrequest", that._handleElementOptionsSyncRequest);
            OP3.bind("elementoptionsrefreshrequest", that._handleElementOptionsRefreshRequest);
            OP3.bind("devicechange", that._handleDeviceChange);
        },

        _render: function() {
            if (that.$ui.parent)
                return;

            that.element = OP3.Document;

            var element = that.element,
                node = element.node(),
                type = element.type(),
                path = element.path();

            that.$ui.parent = OP3.LiveEditor.$ui.sidebar
                .find('[data-tab="settings"]');

            that.$ui.form = that.$ui.parent
                .find("form")
                .attr("data-op3-user-role", OP3.Meta.userRole)
                .attr("data-op3-element-options-type", type)
                .attr("data-op3-element-options-enabled", "1")
                .attr("data-op3-element-options-uuid", "")
                .attr("data-op3-element-options-gid", "")
                .attr("data-op3-element-options-style", "")
                .attr("data-op3-element-options-spec", "")
                .attr("data-op3-element-options-path", path)
                //.attr("data-op3-element-options-path-full", "")
                .attr("data-op3-element-options-has-styles", "0")
                .attr("data-op3-element-options-has-presets", "0")
                .attr("data-op3-element-options-children-count", "0")
                .attr("data-op3-element-options-row-children-count", "0")
                .on("change", that._handleFormChange)
                .on("click", ".op3-element-options-group header", that._handleGroupToggle)
                .on("click", ".op3-options-group-actions .op3-options-group-actions-reset", that._handleGroupReset)
                .on("click", ".op3-element-options-property-reset", that._handlePropertyReset)
                .appendTo(that.$ui.parent);

            that.$ui.content = that.$ui.form
                .find(".tab-content");

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

        _renderContent: function() {
            var $content = $(null);
            (that._config.group || [])
                .forEach(function(item) {
                    $content = $content.add(that._renderGroup(item.id, item.label, item.reset));
                });

            that.$ui.content
                .html($content);
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
            var template = OP3.$.templating(that._template.group(), {
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
            var $result = $(null);

            (that._config.group || [])
                .filter(function(item) {
                    return item.id === groupId;
                })
                .forEach(function(item) {
                    if (item.prependHTML)
                        $result = $result.add(that._renderHtml(item.prependHTML));

                    (item.property || [])
                        .forEach(function(item) {
                            $result = $result.add(that._renderProperty(item));
                        });

                    if (item.appendHTML)
                        $result = $result.add(that._renderHtml(item.appendHTML));
                });

            return $result;
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
                        .children(":not(.op3-element-options-group-child-preserve)")
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
         * Set input values for form
         *
         * @param  {String} property (optional)
         * @return {Void}
         */
        _sync: function(property) {
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
            //var hoverDisabled = OP3.Designer.$ui.parent.hasClass("op3-disable-hover");
            //if (!hoverDisabled)
            //    OP3.Designer.$ui.parent.addClass("op3-disable-hover");

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
            //if (!hoverDisabled)
            //    OP3.Designer.$ui.parent.removeClass("op3-disable-hover");

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
         * execute preload
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleWorkerReady: function(e, o) {
            OP3.Worker.append(that._render);
            OP3.Worker.append(that._renderContent);

            OP3.Worker.append(function() {
                var emit = {
                    node: that.element.node(),
                    parent: that.$ui.form.get(0),
                    type: that.element.type(),
                }
                OP3.transmit("elementoptionsformrender", emit);
                OP3.transmit("elementoptionsformrender::" + emit.type, emit);

                //var groupId = that.$ui.form
                //    .find(".op3-element-options-group:first")
                //    .attr("data-op3-element-options-group-id");
                //that._activateGroup(groupId);
            });
        },

        /**
         * Element children count change event handler
         * (elementappend elementdetach elementremove):
         * sync changes with current form
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChildrenCountChange: function(e, o) {
            if (!o.parent || !that.element || !OP3.Designer.$ui.parent.is(o.parent))
                return;

            that.$ui.form
                .attr("data-op3-element-options-children-count", that.element.children().length);
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
            if (OP3.Designer.activeElement() !== that.element)
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
         * Deveice change event handler:
         * refresh
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
         * Refresh entire form or
         * single property on it
         *
         * @param  {String} property (optional)
         * @return {Void}
         */
        refresh: function(property) {
            that._sync(property);
        },

    }

    // globalize
    window.OP3.DocumentOptions = that;

    // autoinit
    $(function() {
        OP3.DocumentOptions._init();
    });

})(jQuery, window, document);
