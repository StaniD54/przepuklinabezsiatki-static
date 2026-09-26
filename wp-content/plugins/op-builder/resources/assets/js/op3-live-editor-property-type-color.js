/**
 * OptimizePress3 element type:
 * op3 property type color manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selector = '[data-property-type="color"]',
        _selector2 = '[data-property-type="color-simple"]';

    /**
     * Favorite colors list
     *
     * @type {Array}
     */
    var _favouriteColors = [];

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var defaults = {
            parent: o.parent,
            cssVarNode: OP3.Designer.$ui.html.get(0),
            defaultFavoriteColors: _favouriteColors,
        };

        // initialize colorpicker
        $(o.parent)
            .find(_selector + "," + _selector2)
                .on("colorpickerinit.op3colorpicker", _colorpickerInit)
                .on("colorpickertab.op3colorpicker", _colorpickerTab)
                .on("colorpickerhide.op3colorpicker", _colorpickerHide)
                .on("colorpickershow.op3colorpicker", _colorpickerShow)
                .on("colorpickershown.op3colorpicker", _colorpickerShown)
                .on("colorpickerdragstart.op3colorpicker", _colorpickerDragstart)
                .on("colorpickerdragstop.op3colorpicker", _colorpickerDragstop)
                .on("colorpickermethod.op3colorpicker", _colorpickerMethod)
                .each(function() {
                    var options = $.extend(true, {}, defaults, {
                        parent: $(this).closest(".jquery-colorpicker-widget-parent,[data-op3-element-options-type]").get(0) || o.parent,
                    });

                    $(this).colorpicker(options);
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
        var $colorpickers = $(o.parent)
            .find(_selector + "," + _selector2)
            .filter(".jquery-colorpicker");

        // Add selected color to recent colors
        // for inline color pickers
        $colorpickers.each(function() {
            if ($(this).closest(".op3-element-options-property").hasClass('jquery-colorpicker-inline'))
                $(this).colorpicker("addToRecent");
        });

        $colorpickers
            .colorpicker("destroy");
    }

    /**
     * Colorpicker widget init event handler:
     * widget class color/color-simple
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerInit = function(e, o) {
        var lib = $(this).data("jquery-colorpicker");
        lib.$ui.widget.addClass("jquery-colorpicker-type-" + $(this).attr("data-property-type"));

        // when colorpicker is only property in parent,
        // add inline class to propery wrapper. toolbar
        // will automatically open/close picker on tab
        // change (picker can not be always visible
        // 'cause then recent colors won't be saved
        // or refreshed)
        if ($(lib.options.parent).is('.jquery-colorpicker-widget-parent[data-op3-content-item-children-count="1"]')) {
            var $prop = $(lib.element).closest(".op3-element-options-property");
            if ($prop.is(":first-child") && $prop.next().is(lib.$ui.widget)) {
                $(null)
                    .add(lib.$ui.widget)
                    .add($prop)
                        .addClass("jquery-colorpicker-inline");

                lib.$ui.link
                    .attr("data-op3-tab-focus-trigger", "click")
                    .attr("data-op3-tab-unfocus-trigger", "click");

                lib._options.autoClose = false;
            }
        }
    }

    /**
     * Colorpicker widget tab event handler:
     * open settings
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerTab = function(e, o) {
        if (e.detail.tab !== "edit")
            return;

        // @todo - refacture this!!!
        OP3.LiveEditor.$ui.sidebarTabs.find('[data-tab="settings"]').click();
        OP3.Designer.unfocus();
        e.preventDefault();
    }

    /**
     * Colorpicker widget show event handler:
     * send stored favorite colors to api
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerHide = function(e, o) {
        var lib = $(this).data("jquery-colorpicker"),
            dataElement = $(this).data("op3-jquery-colorpicker-favorite-colors"),
            dataLib = lib.favorite();
        if (!dataLib || JSON.stringify(dataElement) === JSON.stringify(dataLib))
            return;

        OP3.Ajax.request({
            method: "POST",
            url: "favorite-colors",
            data: JSON.stringify({ colors: dataLib }),
        });
    }

    /**
     * Colorpicker widget show event handler:
     * store favorite colors and reposition widget
     * under/above
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerShow = function(e, o) {
        var lib = $(this).data("jquery-colorpicker");
        $(this).data("op3-jquery-colorpicker-favorite-colors", lib.favorite());

        // inline, no need for reposition
        if (lib.$ui.widget.hasClass("jquery-colorpicker-inline"))
            return;

        // get scrollParent on first show
        if (!lib.$ui.scrollParent)
            lib.$ui.scrollParent = lib.$ui.widget
                .parents()
                .filter(function() {
                    var $this = $(this),
                        position = $this.css("position"),
                        overflow = $this.css("overflow-y"),
                        match = /(auto|scroll)/;

                    return position !== "static" && match.test(overflow);
                })
                .eq(0);

        // scroll parent element
        var scrollParent = lib.$ui.scrollParent.get(0) || document.documentElement,
            scrollPosition = scrollParent.scrollTop,
            scrollBox = scrollParent.getBoundingClientRect();

        // fix html box
        if (scrollParent === document.documentElement) {
            scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
            scrollBox.height = $(window).height();
        }

        // default position
        lib._options.align = "bottom-right";
        var rect = lib._getRect();

        // compare DOMRect of widget and scrollParent:
        // ...no place below, put it above
        if (lib._options.align === "bottom-right" && rect._rect.parent.top + rect.top + rect.marginTop + rect.height + rect.marginBottom > scrollBox.top + scrollBox.height + scrollPosition) {
            //console.log("_colorpickerShow", 0);
            lib._options.align = "top-right";
            rect = lib._getRect();
        }

        // ...no place above, put it right
        if (lib._options.align === "top-right" && rect._rect.parent.top + rect.top < scrollBox.top + scrollPosition) {
            lib._options.align = "right";
            rect = lib._getRect();
        }

        // ...no place right, put it left
        if (lib._options.align === "right" && rect._rect.parent.left + rect.left + rect.marginLeft + rect.width + rect.marginBottom > scrollBox.left + scrollBox.width) {
            lib._options.align = "left";
            rect = lib._getRect();
        }

        // ...still not right
        if (lib._options.align === "left" || lib._options.align === "right") {
            if (rect._rect.parent.top + rect.top + rect.marginTop + rect.height + rect.marginBottom > scrollBox.top + scrollBox.height + scrollPosition) {
                lib._options.align += "-bottom";
                rect = lib._getRect();
            }
            if (rect._rect.parent.top + rect.top < scrollBox.top + scrollPosition) {
                lib._options.align += "-top";
                rect = lib._getRect();
            }

            // ...this widget can not be placed anywhere,
            // put it back below (default position,
            // colorpickershown event will handle
            // scrollParent scroll)
            if (scrollParent !== document.documentElement && rect._rect.parent.left + rect.left < scrollBox.left) {
                lib._options.align = "bottom right";
                //rect = lib._getRect();
            }
        }
    }

    /**
     * Colorpicker widget shown event handler:
     * scroll to viewport
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerShown = function(e, o) {
        var lib = $(this).data("jquery-colorpicker");
        if (lib.$ui.widget.hasClass("jquery-colorpicker-inline"))
            return;

        var $scrollParent = lib.$ui.scrollParent;
        if (!$scrollParent.length)
            return;

        var heightWindow = $(window).scrollTop() + $(window).height(),
            rectParent = $scrollParent.get(0).getBoundingClientRect(),
            rectWidget = lib.$ui.widget.get(0).getBoundingClientRect(),
            marginWidget = {
                top: parseInt(lib.$ui.widget.css("margin-top")),
                bottom: parseInt(lib.$ui.widget.css("margin-bottom")),
            };

        if (rectWidget.top + rectWidget.height + marginWidget.bottom > heightWindow)
            $scrollParent.animate({
                scrollTop: rectWidget.top + rectWidget.height + marginWidget.bottom - rectParent.top - rectParent.height + $scrollParent.scrollTop(),
            }, 200);
    }

    /**
     * Colorpicker widget dragstart event handler:
     * add custom class from element
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerDragstart = function(e, o) {
        OP3.LiveEditor.$ui.body
            .addClass("op3-live-editor-user-select-off")
            .addClass("op3-live-editor-pointer-events-off");
    }

    /**
     * Colorpicker widget dragstop event handler:
     * remove custom class from element
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerDragstop = function(e, o) {
        OP3.LiveEditor.$ui.body
            .removeClass("op3-live-editor-pointer-events-off")
            .removeClass("op3-live-editor-user-select-off");
    }

    /**
     * Colorpicker widget method event handler
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerMethod = function(e, o) {
        if (o.method === "reset")
            _colorpickerMethodReset.apply(this, arguments);
        //else if (o.method === "addToFavorite")
        //    _colorpickerMethodAddToFavorite.apply(this, arguments);
        //else if (o.method === "schemeOptions")
        //    _colorpickerMethodSchemeOptions.apply(this, arguments);
    }

    /**
     * Colorpicker widget method event handler:
     * rest op3 property to default
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _colorpickerMethodReset = function(e, o) {
        e.preventDefault();

        var key = $(this).attr("data-op3-element-options-property-id"),
            title = "Color Picker",
            message = "Are you sure you want to reset the color to default?",
            media = OP3.LiveEditor.deviceMedia(),
            element = OP3.Designer.activeElement(),
            style = element.style(),
            config = element.config(style),
            options = config.style ? config.style.options : config.options;

        OP3.UI.confirm(title, message, function () {
            // check if initial value is set in options style
            // and set the style to it or null
            var value = null;
            if (options && options[key])
                value = options[key];

            element.setOption(key, value, media);
            // console.log("Reset color property `" + key + "` to `" + value + "`.");
        });
    }

    /**
     * Builder loadajaxinit event handler:
     * set favorite color list
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _load = function(e, o) {
        _favouriteColors = o.favorite_colors;
    }

    /**
     * Builder loadlang event handler:
     * override default colorpicker widget options
     * (add translations and append done button)
     *
     * @param  {Event}  e
     * @param  {Object} o
     * @return {Void}
     */
    var _ready = function(e, o) {
        var $dummy = $("<input />"),
            lib = $dummy.colorpicker().data("jquery-colorpicker"),
            proto = lib.__proto__,
            $widget = $(proto._defaults.widget);

        $widget
            .find("[data-tab-open]")
            .each(function() {
                var $this = $(this);
                if ($this.is('[data-tab-open="recent"]'))
                    $this.text(OP3._("Recent"));
                else if ($this.is('[data-tab-open="favorite"]'))
                    $this.text(OP3._("Favourite"));
                else if ($this.is('[data-tab-open="scheme"]'))
                    $this.text(OP3._("Colour Scheme"));
            });
        $widget
            .find(".jquery-colorpicker-icon")
            .each(function() {
                var $this = $(this);
                if ($this.is('[data-method="reset"]'))
                    $this.attr("title", OP3._("Reset Colour"));
                else if ($this.is('[data-method="addToFavorite"]'))
                    $this.attr("title", OP3._("Add to Favourite"));
                else if ($this.is('[data-method="schemeOptions"]'))
                    $this.attr("title", OP3._("Colour Scheme Options"));
            });
        $widget
            .find(".jquery-colorpicker-label-opacity")
            .attr("title", OP3._("Opacity"));

        var button = ''
            +   '<div class="jquery-colorpicker-row jquery-colorpicker-row-done-button">'
            +       '<button type="button" data-method="hide">' + OP3._("Done") + '</button>'
            +   '</div>';
        $widget
            .append(button);

        // prototype defaults
        proto._defaults.widget = $widget.get(0).outerHTML;
        proto._defaults.format = "rgb";
        proto._defaults.forceOpacity = true;
        proto._defaults.anchorDistance = 8;
        proto._defaults.widgetOffset = 12;
        proto._defaults.defaultTab = "favorite";
        proto._defaults.defaultRecentColors = [ "#222", "#494949", "#7d7d7d", "#f0f0f0", "#0074ff", "#004ba5", "#143863", "#162a41" ];
        proto._defaults.defaultFavoriteColors = [ "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff" ];
        proto._defaults.schemeVars = [ "--op3-color-scheme-1", "--op3-color-scheme-2", "--op3-color-scheme-3", "--op3-color-scheme-4", "--op3-color-scheme-5" ];
    }

    // init
    OP3.bind("loadajaxinit", _load);
    OP3.bind("loadlang", _ready);
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

})(jQuery, window, document);
