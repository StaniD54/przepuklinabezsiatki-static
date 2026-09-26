/**
 * OptimizePress3 live editor extension:
 * handling pop overlay
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-popoverlay.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_PopOverlay constructor
     *
     * @return {OP3_PopOverlay}
     */
    var OP3_PopOverlay = OP3.PopOverlay.constructor;

    /**
     * Popup (open) modal (if cookies alowes to do so).
     *
     * Disable autotrigger modal in live-editor, we're
     * gonna handle this ourselves.
     *
     * @param  {Object} config
     * @return {Void}
     */
    OP3_PopOverlay.prototype._popup = function(config) {
        // pass
    };

    /**
     * Start op3 video element.
     *
     * Video can not be played in live-editor, so
     * overriding this method.
     *
     * @return {Void}
     */
    OP3_PopOverlay.prototype._videoStart = function() {
        // pass
    };

    /**
     * Stop op3 video element.
     *
     * Video can not be played in live-editor, so
     * overriding this method.
     *
     * @return {Void}
     */
    OP3_PopOverlay.prototype._videoStop = function() {
        // pass
    };

    /**
     * Start op3 soundcloud element.
     *
     * Soundcloud can not be played in live-editor, so
     * overriding this method.
     *
     * @return {Void}
     */
    OP3_PopOverlay.prototype._soundcloudStart = function() {
        // pass
    };

    /**
     * Stop op3 soundcloud element.
     *
     * Soundcloud can not be played in live-editor, so
     * overriding this method.
     *
     * @return {Void}
     */
    OP3_PopOverlay.prototype._soundcloudStop = function() {
        // pass
    };

    /**
     * Document body click event handler:
     * proxy for _handleClickOpen/_handleClickClose.
     *
     * Disable autotrigger modal in live-editor, we're
     * gonna handle this ourselves.
     *
     * @param  {Event} e
     * @return {Void}
     */
    OP3_PopOverlay.prototype._handleClick = function(e) {
        // pass
    };

    /**
     * Document body click event handler:
     * open popoverlay.
     *
     * Disable autotrigger modal in live-editor, we're
     * gonna handle this ourselves.
     *
     * @param  {Event} e
     * @return {Void}
     */
    OP3_PopOverlay.prototype._handleClickOpen = function(e) {
        // pass
    };

    /**
     * Document body click event handler:
     * close popoverlay.
     *
     * Disable autotrigger modal in live-editor, we're
     * gonna handle this ourselves.
     *
     * @param  {Event} e
     * @return {Void}
     */
    OP3_PopOverlay.prototype._handleClickClose = function(e) {
        // pass
    };

    /**
     * Get list of popoverlays on page
     *
     * @return {Array}
     */
    OP3_PopOverlay.prototype.toArray = function() {
        var elements = this._elements;

        return Object.keys(elements)
            .map(function(item) {
                return elements[item];
            })
            .sort(function(a, b) {
                if (a.index < b.index)
                    return -1;
                else if (a.index > b.index)
                    return 1;
                else
                    return 0;
            });
    };

    /**
     * Array filter functionality
     *
     * @param  {Function} callback
     * @return {Array}
     */
    OP3_PopOverlay.prototype.filter = function(callback) {
        return this.toArray().filter(callback);
    };

    /**
     * Array map functionality
     *
     * @param  {Function} callback
     * @return {Array}
     */
    OP3_PopOverlay.prototype.map = function(callback) {
        return this.toArray().map(callback);
    };

    /**
     * Array forEach functionality
     *
     * @param  {Function} callback
     * @return {Void}
     */
    OP3_PopOverlay.prototype.forEach = function(callback) {
        return this.toArray().forEach(callback);
    };

    /**
     * Event elementappend handler:
     * refresh elements
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3_PopOverlay.prototype._handleElementAppend = function(e, o) {
        this.addElement(o.node);
    };
    OP3.bind("elementappend::popoverlay", OP3.PopOverlay._handleElementAppend.bind(OP3.PopOverlay));

    /**
     * Event elementdetach handler:
     * refresh elements
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3_PopOverlay.prototype._handleElementDetach = function(e, o) {
        this.removeElement(o.node);
    };
    OP3.bind("elementdetach::popoverlay", OP3.PopOverlay._handleElementDetach.bind(OP3.PopOverlay));

    // link (designer)
    OP3.bind("load::designer", function(e, o) {
        /*
        // disable autotrigger modal in live-editor,
        // we're gonna handle this ourselves
        OP3.PopOverlay.unbind();

        // need to recreate elements object (elements
        // are in designer, not live-editor)
        OP3.PopOverlay._parent = e.origin.Designer.ownerDocument.defaultView;
        OP3.PopOverlay.refresh();
        */

        // set parent
        OP3.PopOverlay.parent = e.origin.Designer.ownerDocument.defaultView;

        // ...and now we can create link
        e.origin.PopOverlay = OP3.PopOverlay;
    });

    /**
     * Add controls to popoverlay element
     * (live-editor ui differs from frontend one)
     *
     * @param  {String} uuid
     * @return {Void}
     */
    OP3.LiveEditor._popoverlayAddControl = function(uuid) {
        var config = OP3.PopOverlay.getConfig(uuid);
        if (!config)
            return;

        var html = ''
            +   '<div class="op3-popoverlay-controls">'
            +       '<button class="op3-popoverlay-controls-btn" data-action="focus-element">'
            +           '<span class="op3-icon op3-icon-preferences-2"></span> '
            +           OP3._("Popup Settings")
            +       '</button>'
            +       '<button class="op3-popoverlay-controls-btn" data-action="close-popoverlay">'
            +           '<span class="op3-icon op3-icon-circle-remove-2"></span> '
            +           OP3._("Close Popup Editor")
            +       '</button>'
            +   '</div>';
        $(config.content)
            .append(html);
    };

    /**
     * Removes item to the Pop Overlay
     * menu in live editor header
     *
     * @param  {String} uuid
     * @return {Void}
     */
    OP3.LiveEditor._popoverlayRemoveControl = function(uuid) {
        var config = OP3.PopOverlay.getConfig(uuid);
        if (!config)
            return;

        $(config.content)
            .find(".op3-popoverlay-controls")
            .remove();
    };

    /**
     * Add menuitem to popoverlay element
     *
     * @param  {String} uuid
     * @return {Void}
     */
    OP3.LiveEditor._popoverlayAddMenuItem = function(uuid) {
        var config = OP3.PopOverlay.getConfig(uuid);
        if (!config)
            return;

        var name = config.name,
            index = config.index,
            template = ""
                +   '<li class="popoverlay-menu-item">'
                +       '<button data-target="{uuid}">' + OP3._("Edit") + ' {name}</button>'
                +   '</li>',
            data = {
                    uuid: uuid,
                    name: name,
                },
            html = OP3.$.templating(template, data),
            node = $(html).get(0),
            $nav = OP3.LiveEditor.$ui.headerNav.find(".popoverlay-menu li");

        if (index === 0)
            $nav.parent().prepend(node);
        else
            $(node).insertBefore($nav.eq(index));
    };

    /**
     * Removes item to the Pop Overlay
     * menu in live editor header
     *
     * @param  {String} uuid
     * @return {Void}
     */
    OP3.LiveEditor._popoverlayRemoveMenuItem = function(uuid) {
        OP3.LiveEditor.$ui.headerNav
            .find('.popoverlay-menu [data-target="' + uuid + '"]')
            .closest(".popoverlay-menu-item")
            .remove();
    };

    OP3.LiveEditor._handlePopoverlayMenuItemNewClick = function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (!OP3.LiveEditor.checkLicense())
            return;

        var target = OP3.$("<_popoverlay_template />");
        var position = OP3.Designer.$ui.parent
            .find('> [data-op3-children] [data-op3-element-type="popoverlay"]')
            .last();

        // Either append it to #op3-designer-element
        // or add it after the last
        // existing popoverlay
        if (!position.length)
            target.appendTo(OP3.Designer.$ui.parent);
        else
            target.insertAfter(position);

        target.focus();
    };

    OP3.LiveEditor._handlePopoverlayMenuItemNewBlankClick = function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (!OP3.LiveEditor.checkLicense())
            return;

        var target = OP3.$("<_blankpopoverlay_template />");
        var position = OP3.Designer.$ui.parent
            .find('> [data-op3-children] [data-op3-element-type="popoverlay"]')
            .last();

        // Either prepend it to #op3-designer-element
        // or add it after the last
        // existing popoverlay
        if (!position.length)
            target.prependTo(OP3.Designer.$ui.parent);
        else
            target.insertAfter(position);

        target.focus();
    };

    OP3.LiveEditor._handlePopoverlayMenuItemEditClick = function(e) {
        var uuid = $(e.currentTarget).attr("data-target");
        OP3.$("#" + uuid).focus();
    };

    OP3.LiveEditor._handlePopoverlayMenuItemCloseClick = function(e) {
        e.preventDefault();

        var element = OP3.Designer.activeElement(),
            active = element.focused(),
            uuid = element.uuid();
        if (!active || uuid !== OP3.PopOverlay.current)
            return;

        element.unfocus();
        OP3.PopOverlay.close();
    };

    /**
     * OP3 elementappendfirst::popoverlay event handler:
     * set overlay name
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3.LiveEditor._handlePopoverlayAppendfirst = function(e, o) {
        var element = OP3.$(o.node),
            uuid = o.uuid,
            name = "Overlay ",
            overlays = OP3.PopOverlay.toArray();

        // Set popoverlay name prefix
        // (video overlay or just overlay)
        if (element.spec() === "videopopoverlay")
            name = "Video Overlay ";

        // Set the popoverlay name to "Overlay X"
        // where X is the number of pop overlays
        name = name + (overlays.length + 1);
        while (overlays.some(function(item) { return item.name === name; }))
            name += ".1";
        element.setOption("text", name, "all");
    };
    OP3.bind("elementappendfirst::popoverlay", OP3.LiveEditor._handlePopoverlayAppendfirst);

    /**
     * OP3 elementappend::popoverlay event handler:
     * add live-editor ui
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3.LiveEditor._handlePopoverlayAppend = function(e, o) {
        var uuid = o.uuid;
        OP3.LiveEditor._popoverlayAddControl(uuid);
        OP3.LiveEditor._popoverlayAddMenuItem(uuid);
    };
    OP3.bind("elementappend::popoverlay", OP3.LiveEditor._handlePopoverlayAppend);

    /**
     * OP3 elementappend::popoverlay event handler:
     * remove live-editor ui
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3.LiveEditor._handlePopoverlayDetach = function(e, o) {
        var uuid = o.uuid;
        OP3.LiveEditor._popoverlayRemoveControl(uuid);
        OP3.LiveEditor._popoverlayRemoveMenuItem(uuid);
    };
    OP3.bind("elementdetach::popoverlay", OP3.LiveEditor._handlePopoverlayDetach);

    /**
     * Handle popoverlay element focus
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3.LiveEditor._handlePopoverlayFocus = function(e, o) {
        var open = function() {
            OP3.PopOverlay.open(o.uuid);

            var current = OP3.PopOverlay.current,
                config = OP3.PopOverlay.getConfig(current),
                element = config.element;
            $(element)
                .find('.op3-popoverlay-controls-btn[data-action="focus-element"]')
                .addClass("active");
        }

        var current = OP3.PopOverlay.current;
        if (current && current !== o.uuid)
            OP3.PopOverlay.close(open);
        else
            open();

        setTimeout(OP3.LiveEditor.sidebarShow);
    };
    OP3.bind("elementfocus::popoverlay", OP3.LiveEditor._handlePopoverlayFocus);

    /**
     * Handle popoverlay element unfocus
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3.LiveEditor._handlePopoverlayUnfocus = function(e, o) {
        var current = OP3.PopOverlay.current,
            config = OP3.PopOverlay.getConfig(current),
            element = config.element;
        $(element)
            .find('.op3-popoverlay-controls-btn[data-action="focus-element"]')
            .removeClass("active");
    };
    OP3.bind("elementunfocus::popoverlay", OP3.LiveEditor._handlePopoverlayUnfocus);

    /**
     * Handle popoverlay element name change
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3.LiveEditor._handlePopoverlayNameChange = function(e, o) {
        var current = OP3.PopOverlay.current;
        if (current !== o.uuid)
            return;

        // set new name in config
        var config = OP3.PopOverlay.getConfig(current);
        config.name = o.value.after;

        // set text in overlay dropdown
        OP3.LiveEditor.$ui.headerNav
            .find('[data-target="' + o.uuid + '"]')
            .text(OP3._("Edit") + " " + config.name);
    };
    OP3.bind("elementchange::popoverlay::text", OP3.LiveEditor._handlePopoverlayNameChange);

    /**
     * Handle popoverlay element animation change
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    OP3.LiveEditor._handlePopoverlayAnimationChange = function(e, o) {
        var current = OP3.PopOverlay.current;
        if (current !== o.uuid)
            return;

        // set element attributes
        var config = OP3.PopOverlay.getConfig(current);
        $(config.element)
            .removeClass(function(index, css) {
                return (css.match(/\bop3-popoverlay-effect-\S+/g) || []).join(" ");
            })
            .addClass("op3-popoverlay-effect-" + o.value.after);

        // reload config
        OP3.PopOverlay.refreshElement(config.element);
        //config = OP3.PopOverlay._getElementConfig(config.element);
        //OP3.PopOverlay._elements[current] = config;

        // animate
        if (config.animationDuration)
            OP3.PopOverlay.close(function() {
                setTimeout(function() {
                    OP3.PopOverlay.open(current);
                }, 250);
            });
    };
    OP3.bind("elementchange::popoverlay::animation", OP3.LiveEditor._handlePopoverlayAnimationChange);

    // bind popoverlay events to live-editor ui
    OP3.bind("ready", function(e) {
        OP3.LiveEditor.$ui.headerNav
            .on("click", ".popoverlay-create-new", OP3.LiveEditor._handlePopoverlayMenuItemNewClick)
            .on("click", ".popoverlay-create-new-blank", OP3.LiveEditor._handlePopoverlayMenuItemNewBlankClick)
            .on("click", "button[data-target]", OP3.LiveEditor._handlePopoverlayMenuItemEditClick);

        OP3.Designer.$ui.parent
            .on("click", '.op3-popoverlay-controls-btn[data-action="close-popoverlay"],.op3-popoverlay-close', OP3.LiveEditor._handlePopoverlayMenuItemCloseClick);
    });

    // set ui for existing popoverlay elements
    OP3.bind("ready", function(e) {
        OP3.$("popoverlay").each(function() {
            var element = OP3.$(this),
                uuid = element.uuid();

            OP3.LiveEditor._popoverlayAddControl(uuid);
            OP3.LiveEditor._popoverlayAddMenuItem(uuid);
        });
    });

    // We 're handling dropdown functionality with javascript,
    // because hover state in the browser is retained even
    // when the element is moved, so when switching from
    // full-size navbar to nav-breadcrumbs navbar
    // dropdown menu is not hidden properly if
    // css-only solution is used
    OP3.bind("ready", function(e) {
        OP3.LiveEditor.$ui.headerNav
            .on("click", ".popoverlay-menu button", function(e) {
                var $menu = $(e.currentTarget)
                    .closest(".popoverlay-menu")
                    .css("display", "none");
                setTimeout(function() {
                    $menu.css("display", "");
                });
            });
    });

})(jQuery, window, document);
