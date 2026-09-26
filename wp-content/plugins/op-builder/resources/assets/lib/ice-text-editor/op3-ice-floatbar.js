;(function($, window, document, undefined) {
    /**
     * Strict mode.
     */
    "use strict";

    /**
     * ice_Floatbar constructor
     *
     * @param {Node}   element
     * @param {Object} options
     */
    var ice_Floatbar = function(element, options) {
        if (!(this instanceof ice_Floatbar))
            throw "ice.OP3.Floatbar: ice.OP3.Floatbar is a constructor";

        ice.Floatbar.apply(this, arguments);
    }

    /**
     * ice_Floatbar prototype
     *
     * @type {Object}
     */
    ice_Floatbar.prototype = $.extend(Object.create(ice.Floatbar.prototype), {
        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            parent: window.document.body,
            template: ''
                + '<div class="ice-floatbar-wrapper">'
                + '<div class="ice-floatbar-content">'
                + '<nav class="ice-floatbar-nav">'
                + '<ul class="ice-floatbar-hlist">'
                + '<li class="ice-floatbar-list-item-format-block"><a href="#" title="Format Block" data-ice-method="toggleDropdown" data-ice-args="[&quot;format-block&quot;]"><i class="op3-icon op3-icon-capitalize-2"></i></a></li>'
                + '<li class="ice-floatbar-list-item-font"><a href="#" title="Font Options" data-ice-method="toggleDropdown" data-ice-args="[&quot;font&quot;]"><i class="op3-icon op3-icon-text-2"></i></a></li>'
                + '<li class="ice-floatbar-list-item-align"><a href="#" title="Text Align" data-ice-method="toggleDropdown" data-ice-args="[&quot;align&quot;]"><i class="op3-icon op3-icon-align-center-2"></i></a></li>'
                + '<li class="ice-floatbar-list-item-link" data-ice-decoration="linkCount"><a href="#" title="Link" data-ice-method="toggleDropdown" data-ice-args="[&quot;link&quot;]" data-ice-pre-method="exec" data-ice-pre-args="[&quot;filterSelection&quot;,&quot;a&quot;]"><i class="op3-icon op3-icon-link-69-2"></i></a></li>'
                + '<li class="ice-floatbar-list-item-unlink" data-ice-decoration="linkCount"><a href="#" title="Unlink" data-ice-method="exec" data-ice-args="[&quot;unlink&quot;]" data-ice-post-method="_resetLink" data-ice-post-args="[]"><i class="op3-icon op3-icon-link-broken-70-2"></i></a></li>'
                + '<li class="ice-floatbar-list-item-animation" data-ice-decoration="animationCount"><a href="#" title="Animation Options" data-ice-method="toggleDropdown" data-ice-args="[&quot;animation&quot;]" data-ice-pre-method="exec" data-ice-pre-args="[&quot;filterSelection&quot;,&quot;span.op3-text-animation&quot;]"><i class="op3-icon op3-icon-animation"></i></a></li>'
                + '<li class="ice-floatbar-list-item-unanimation" data-ice-decoration="animationCount"><a href="#" title="Remove Animation" data-ice-method="exec" data-ice-args="[&quot;animationUnwrap&quot;]" data-ice-post-method="_resetAnimation" data-ice-post-args="[]"><i class="op3-icon op3-icon-animation-alt"></i></a></li>'
                + '<li class="ice-floatbar-list-item-fore-color"><a href="#" title="Text Colour" data-ice-method="toggleDropdown" data-ice-args="[&quot;fore-color&quot;]"><i class="op3-icon op3-icon-color-2"></i></a></li>'
                + '<li class="ice-floatbar-list-item-back-color"><a href="#" title="Background Colour" data-ice-method="toggleDropdown" data-ice-args="[&quot;back-color&quot;]"><i class="op3-icon op3-icon-paint-bucket-40-2"></i></a></li>'
                + '<li class="ice-floatbar-list-item-remove-format"><a href="#" title="Remove All Formatting" data-ice-method="exec" data-ice-args="[&quot;removeFormat&quot;]"><i class="op3-icon op3-icon-filter-remove-1"></i></a></li>'
                + '</ul>'
                + '</nav>'
                + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-format-block">'
                + '<ul class="ice-floatbar-vlist" data-ice-decoration="formatBlock">'
                + '<li><a href="#" title="Headline 1" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h1&quot;]">Headline 1</a></li>'
                + '<li><a href="#" title="Headline 2" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h2&quot;]">Headline 2</a></li>'
                + '<li><a href="#" title="Headline 3" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h3&quot;]">Headline 3</a></li>'
                + '<li><a href="#" title="Headline 4" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h4&quot;]">Headline 4</a></li>'
                + '<li><a href="#" title="Headline 5" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h5&quot;]">Headline 5</a></li>'
                + '<li><a href="#" title="Headline 6" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;h6&quot;]">Headline 6</a></li>'
                + '<li><a href="#" title="Paragraph" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;p&quot;]">Paragraph</a></li>'
                + '<li><a href="#" title="Code" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;pre&quot;]">Code</a></li>'
                + '<li><a href="#" title="Quote" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;blockquote&quot;]">Quote</a></li>'
                + '<li><a href="#" title="Ordered List" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;ol&quot;]">Ordered List</a></li>'
                + '<li><a href="#" title="Unordered List" data-ice-method="exec" data-ice-args="[&quot;formatBlock&quot;,&quot;ul&quot;]">Unordered List</a></li>'
                + '</ul>'
                + '</article>'
                + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-font">'
                + '<ul class="ice-floatbar-hlist">'
                + '<li data-ice-decoration="bold"><a href="#" title="Bold" data-ice-method="exec" data-ice-args="[&quot;bold&quot;]"><i class="op3-icon op3-icon-bold-2"></i></a></li>'
                + '<li data-ice-decoration="italic"><a href="#" title="Italic" data-ice-method="exec" data-ice-args="[&quot;italic&quot;]"><i class="op3-icon op3-icon-italic-2"></i></a></li>'
                + '<li data-ice-decoration="underline"><a href="#" title="Underline" data-ice-method="exec" data-ice-args="[&quot;underline&quot;]"><i class="op3-icon op3-icon-underline-2"></i></a></li>'
                + '<li data-ice-decoration="strikeThrough"><a href="#" title="Line Through" data-ice-method="exec" data-ice-args="[&quot;strikeThrough&quot;]"><i class="op3-icon op3-icon-strikethrough-2"></i></a></li>'
                + '</ul>'
                + '</article>'
                + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-align">'
                + '<ul class="ice-floatbar-hlist" data-ice-decoration="align">'
                + '<li><a href="#" title="Text Align Left" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;left&quot;]"><i class="op3-icon op3-icon-menu-left-1"></i></a></li>'
                + '<li><a href="#" title="Text Align Center" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;center&quot;]"><i class="op3-icon op3-icon-align-center-2"></i></a></li>'
                + '<li><a href="#" title="Text Align Right" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;right&quot;]"><i class="op3-icon op3-icon-menu-right-1"></i></a></li>'
                + '<li><a href="#" title="Text Align Justify" data-ice-method="exec" data-ice-args="[&quot;align&quot;,&quot;justify&quot;]"><i class="op3-icon op3-icon-align-justify-1"></i></a></li>'
                + '</ul>'
                + '</article>'
                + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-link" data-op-action="link">'
                + '<div class="ice-floatbar-dropdown-link-action">'
                + '<label title="Action">'
                + '<span class="label-text">Action</span>'
                + '<select class="ice-floatbar-link-action">'
                + '<option value="link">Link URL</option>'
                + '<option value="popoverlay">Show Popup Overlay</option>'
                + '<option value="closePopoverlay">Close Popup Overlay</option>'
                + '<option value="nextFunnelStep">Go to Next Funnel Page (Yes)</option>'
                + '<option value="prevFunnelStep">Go to Previous Funnel Page</option>'
                + '<option value="goToFunnelStep">Go to Specific Funnel Page</option>'
                + '<option value="noFunnelStep">Go to Next Funnel Page (No)</option>'
                + '</select>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-dropdown-link-href">'
                + '<label title="Link URL">'
                + '<input class="ice-floatbar-link-url" type="text" title="Link URL" placeholder="Link URL" value="" data-ice-empty-value="#" data-ice-method="exec" data-ice-args="[&quot;createLink&quot;,&quot;&dollar;value&quot;,null,null]" data-ice-decoration="linkURL" />'
                + '<a href="#" target="_parent|_blank" title="Open Link" data-ice-link-test=""><i class="op3-icon op3-icon-eye-17-2"></i></a>'
                + '</label>'
                + '<label class="inline" title="Open link in new tab">'
                + '<span class="label-text">Open link in new tab</span>'
                + '<div class="ice-floatbar-switch">'
                + '<input class="ice-floatbar-link-target" type="checkbox" value="_blank" data-ice-method="exec" data-ice-args="[&quot;createLink&quot;,null,&quot;&dollar;value&quot;,null]" data-ice-decoration="linkTarget" />'
                + '<span></span>'
                + '</div>'
                + '</label>'
                + '<label class="inline" title="No Follow">'
                + '<span class="label-text">No Follow</span>'
                + '<div class="ice-floatbar-switch">'
                + '<input class="ice-floatbar-link-rel-nofollow" type="checkbox" value="nofollow" data-ice-method="exec" data-ice-args="[&quot;createLink&quot;,null,null,&quot;&dollar;value&quot;]" data-ice-decoration="linkRel" />'
                + '<span></span>'
                + '</div>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-dropdown-link-popoverlay">'
                + '<label title="Pop Overlay Trigger">'
                + '<span class="label-text">Pop Overlay Trigger</span>'
                + '<select class="ice-floatbar-link-popoverlay-trigger">'
                + '<option value="none">None</option>'
                + '</select>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-dropdown-select-funnel-step">'
                + '<label title="Select Funnel Page">'
                + '<span class="label-text">Select Funnel Page</span>'
                + '<select class="ice-floatbar-select-funnel-step-trigger">'
                + '<option value="none">None</option>'
                + '</select>'
                + '</label>'
                + '</div>'
                + '</article>'
                + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-animation" data-op-type="draw" data-op-style="" data-op-loop="0">'
                + '<div class="ice-floatbar-animation-content-type">'
                + '<label class="inline" title="Animation Type">'
                + '<span class="label-text">Animation Type</span>'
                + '<select class="ice-floatbar-animation-type">'
                + '<option value="draw" selected>Drawing Line</option>'
                + '<option value="word">Rotating Text</option>'
                + '</select>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content-draw-style">'
                + '<label class="inline" title="Style">'
                + '<span class="label-text">Style</span>'
                + '<select class="ice-floatbar-animation-style ice-floatbar-animation-draw-style">'
                + '<option value="" selected>draw nothing</option>'
                + '</select>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content-word-style">'
                + '<label class="inline" title="Style">'
                + '<span class="label-text">Style</span>'
                + '<select class="ice-floatbar-animation-style ice-floatbar-animation-word-style">'
                + '<option value="" selected>word nothing</option>'
                + '</select>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content ice-floatbar-animation-content-draw-options">'
                + '<label class="inline" title="Colour">'
                + '<span class="label-text">Colour</span>'
                + '<input data-animation-option="color" type="text" value="" />'
                + '</label>'
                + '<label class="inline" title="Thickness">'
                + '<span class="label-text">Thickness</span>'
                + '<input data-animation-option="thickness" type="range" value="" min="1" max="10" />'
                + '</label>'
                + '<label class="inline" title="Rounded Edges">'
                + '<span class="label-text">Rounded Edges</span>'
                + '<div class="ice-floatbar-switch">'
                + '<input data-animation-option="rounded-edges" type="checkbox" value="1" />'
                + '<span></span>'
                + '</div>'
                + '</label>'
                + '<label class="inline" title="Bring to Front">'
                + '<span class="label-text">Bring to Front</span>'
                + '<div class="ice-floatbar-switch">'
                + '<input data-animation-option="bring-to-front" type="checkbox" value="1" />'
                + '<span></span>'
                + '</div>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content-word-options">'
                + '<label class="inline" title="Words">'
                + '<span class="label-text">Words</span>'
                + '<textarea data-animation-option="words"></textarea>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content ice-floatbar-animation-content-all-options">'
                + '<label class="inline" title="Animation Delay [ms]">'
                + '<span class="label-text">Animation Delay</span>'
                + '<input data-animation-option="delay" type="number" value="" min="100" max="10000" />'
                + '</label>'
                + '<label class="inline" title="Animation Duration [ms]">'
                + '<span class="label-text">Animation Duration</span>'
                + '<input data-animation-option="transition-duration" type="number" value="" min="100" max="10000" />'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content-word-options">'
                + '<label class="inline" title="Word Change Delay [ms]">'
                + '<span class="label-text">Word Change Delay</span>'
                + '<input data-animation-option="word-delay" type="number" value="" min="100" max="10000" />'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content ice-floatbar-animation-content-all-options">'
                + '<label class="inline" title="Loop">'
                + '<span class="label-text">Loop</span>'
                + '<div class="ice-floatbar-switch">'
                + '<input data-animation-option="loop" type="checkbox" value="1" />'
                + '<span></span>'
                + '</div>'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content ice-floatbar-animation-content-all-options ice-floatbar-animation-content-all-options-loop-delay">'
                + '<label class="inline" title="Loop Delay [ms]">'
                + '<span class="label-text">Loop Delay</span>'
                + '<input data-animation-option="loop-delay" type="number" value="" min="100" max="10000" />'
                + '</label>'
                + '</div>'
                + '<div class="ice-floatbar-animation-content ice-floatbar-animation-content-animate">'
                + '<a href="#"" title="Preview Animation">Animate</a>'
                + '</div>'
                + '</article>'
                + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-fore-color">'
                + '<p><input type="text" title="Text Color" placeholder="Text Colour" value="" data-ice-method="exec" data-ice-args="[&quot;foreColor&quot;,&quot;&dollar;value&quot;]" data-ice-decoration="foreColor" /></p>'
                + '</article>'
                + '<article class="ice-floatbar-dropdown ice-floatbar-dropdown-back-color">'
                + '<p><input type="text" title="Background Color" placeholder="Background Colour" value="" data-ice-method="exec" data-ice-args="[&quot;backColor&quot;,&quot;&dollar;value&quot;]" data-ice-decoration="backColor" /></p>'
                + '</article>'
                + '</div>'
                + '</div>',
            oninit: null,
            onready: null,
            onshow: null,
            onhide: null,
            ondropdown: null,
            onexec: null,
        },

        /**
         * Initialize input widgets.
         *
         * Note: this is called after iframe load.
         *
         * @return {Void}
         */
        _uniform: function() {
            this._uniformRange();
            this._uniformColorpicker();
            this._uniformAnimationColorpicker();
            this._uniformLinkAutocomplete();
        },

        /**
         * Initialize input widgets:
         * make range act as jQuery input range.
         *
         * @return {Void}
         */
        _uniformRange: function() {
            this._$ui.animation.options
                .filter('[type="range"]')
                .addClass("jquery-input-range-slider")
                .on("input op3icerefresh", function(e) {
                    var $this = $(this),
                        min = $this.attr("min") || 0,
                        max = $this.attr("max") || Infinity,
                        value = $this.val(),
                        css = (value*1 - min*1) / (max*1 - min*1) * 100 + "%";

                    $(this).css("--jquery-input-range-slider", css);
                });
        },

        /**
         * Initialize input widgets:
         * colorpicker.
         *
         * @return {Void}
         */
        _uniformColorpicker: function() {
            var floatbar = this;
            $(this.wrapper)
                .find('[data-ice-decoration="foreColor"],[data-ice-decoration="backColor"]')
                .on("colorpickerinit.op3-iceeditor-colorpicker", function(e, c) {
                    $(this).colorpicker("show");
                })
                .on("colorpickertab.op3-iceeditor-colorpicker", function(e, o) {
                    // show color-scheme settings in sidebar
                    if (o.tab === "edit") {
                        e.preventDefault();

                        // @todo - refacture this!!!
                        floatbar.editor.window.getSelection().removeAllRanges();
                        floatbar.hide();
                        OP3.LiveEditor.$ui.sidebarTabs.find('[data-tab="settings"]').click();
                        OP3.Designer.unfocus();
                    }
                })
                .on("colorpickerhide.op3-iceeditor-colorpicker", function(e, o) {
                    // do toggle dropdown...
                    floatbar.dropdown(null);

                    // ...instead of hidding colorpicker
                    e.preventDefault();
                })
                .on("colorpickermethod.op3-iceeditor-colorpicker", function(e, o) {
                    if (o.method !== "reset")
                        return;

                    // unset color...
                    var method = $(this).attr("data-ice-decoration");
                    floatbar.editor[method]("unset");
                    floatbar.refresh();

                    // ...instead of resetting (setting default one,
                    // which may vary)
                    e.preventDefault();
                })
                .colorpicker({
                    format: "rgb",
                    allowEmpty: true,
                    autoClose: false,
                    forceOpacity: true,
                    cssVarNode: OP3.Designer.$ui.parent,
                    schemeVars: [
                        "--op3-color-scheme-1",
                        "--op3-color-scheme-2",
                        "--op3-color-scheme-3",
                        "--op3-color-scheme-4",
                        "--op3-color-scheme-5",
                    ]
                });
        },

        /**
         * Initialize input widgets:
         * animation colorpicker.
         *
         * Since floatbar is iframe, we need to instance
         * animation colorpicker outside iframe, so it
         * can be properly displayed
         *
         * @return {Void}
         */
        _uniformAnimationColorpicker: function() {
            var le = this.window.parent.parent;
            le.$(this._$ui.animation.optionColor)
                .on("colorpickermethod.op3-iceeditor-colorpicker", function(e, o) {
                    if (o.method !== "reset")
                        return;

                    // set default color
                    le.$(this)
                        .val($(ice.Util.getSelectedNodes('span.rich-text-animation')).find("path").attr("stroke") || "red")
                        .trigger("change");

                    // ...instead of resetting (setting default one,
                    // which may vary)
                    e.preventDefault();
                })
                .colorpicker({
                    format: "rgb",
                    allowEmpty: true,
                    forceOpacity: true,
                    parent: le.OP3.LiveEditor.$ui.body,
                    cssVarNode: OP3.Designer.$ui.parent,
                });

            this._$ui.animation.optionColor
                .on("op3icerefresh", function(e) {
                    le.$(this).trigger("colorpickerrefreshrequest");
                });

            $(OP3.Designer.$ui.html.prop("ownerDocument"))
                .on("scroll", this._handleDesignerDocumentScroll.bind(this));
        },

        /**
         * Initialize input widgets:
         * link autocomplete.
         *
         * @return {Void}
         */
        _uniformLinkAutocomplete: function() {
            $.Autocomplete.defaults.ajaxSettings = {
               beforeSend: OP3.Ajax._beforeSend,
            }
            window.parent.$.Autocomplete.defaults.ajaxSettings = {
               beforeSend: OP3.Ajax._beforeSend,
            }

            var $linkURL = $(this.wrapper)
                .find('[data-ice-decoration="linkURL"]')
            $linkURL
                .autocomplete({
                    serviceUrl: function() {
                        return ""
                            + ((window.OP3 && OP3.Meta ? OP3.Meta.api : null) || "/wp-json/op3/v1")
                            + "/pages?type[]=post&type[]=page&_wpnonce="
                            + ((window.OP3 && OP3.Meta ? OP3.Meta.nonce : null) || "");
                    },
                    dataType: "json",
                    transformResult: function(response) {
                        return {
                            suggestions: $.map(response, function(data) {
                                return {
                                    value: data.post_title,
                                    data: data.post_title,
                                    permalink: data.permalink,
                                };
                            })
                        };
                    },
                    appendTo: $linkURL.parent(),
                    forceFixPosition: true,
                    maxHeight: 80,
                    onSearchStart: function(params) {
                        if (params.query.length <= 1)
                            return false;
                    },
                    onSelect: function(suggestion) {
                        if (this.value === suggestion.permalink)
                            return;

                        // jQuery doesn't bubble???
                        this.value = suggestion.permalink;
                        this.dispatchEvent(new Event("change", { bubbles: true }));
                    },
                });
        },

        /**
         * Get or set current dropdown
         *
         * @param  {String} value
         * @return {Mixed}
         */
        dropdown: function(value) {
            if (this.__disableDropdown && typeof value !== "undefined")
                return;

            return ice.Floatbar.prototype.dropdown.apply(this, arguments);
        },

        /**
         * Temporarily disable dropdown.
         *
         * Selection may change on changing some options,
         * making sure that we still have animation tab
         * active. Unfortunately we must use setTimeout,
         * cuz' Ice.Floatbar is poorly coded (says the
         * author of Ice.Floatbar ;-))
         *
         * @todo  - after all the code refactor this
         * should work without second setTimeout...
         *
         * @return {Void}
         */
        _disableDropdown: function() {
            this.__disableDropdown = true;
            setTimeout(function() {
                setTimeout(function() {
                    delete this.__disableDropdown;
                }.bind(this));
            }.bind(this));
        },

        /**
         * Get range rect:
         * on animated element selection can be outside
         * the element, we're adjusting that here...
         *
         * @param  {Range}   range
         * @param  {DOMRect} defaults
         * @return {Object}
         */
        _getSelectionRect: function(range, defaults) {
            var isAnimationFullSelected = true
                && range
                && range.commonAncestorContainer
                && range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
                && range.commonAncestorContainer === range.startContainer
                && $(range.commonAncestorContainer).is(".op3-text-animation");

            if (isAnimationFullSelected)
                return range.commonAncestorContainer.getBoundingClientRect();
            else if (!defaults)
                return range.getBoundingClientRect();
            else
                return defaults;
        },

        /**
         * Return the link element for the current
         * editor text selection.
         *
         * @return {Mixed}
         */
        _getSelectionLink: function() {
            var nodes = ice.Util.getSelectedNodes("a");
            if (!nodes || nodes.length === 0)
                return null;

            return nodes[0];
        },

        /**
         * Get funnel step from url
         *
         * @param  {String} url
         * @return {Mixed}
         */
        _getFunnelStep: function(url) {
            var base = OP3.Meta.siteUrl + "/op-funnel-step/" + OP3.Meta.pageId + "/",
                re = new RegExp("^" + OP3.$.escapeRegExp(base) + "(\\d+)$");

            return re.test(url) ? url.match(re)[1] : null;
        },

        /**
         * Return the link element for the current
         * editor text selection, or create link
         * from selection.
         *
         * @return {Mixed}
         */
        _selectionToLink: function() {
            var result = this._getSelectionLink();
            if (!result) {
                var href = this._$ui.link.url.attr("data-ice-empty-value") || "#";
                this.editor.createLink(href);

                result = this._getSelectionLink();
            }

            return result;
        },

        /**
         * Reposition floatbar element:
         * on animated element selection can be outside
         * the element, we're adjusting that here...
         *
         * @param  {Object} rect
         * @return {Void}
         */
        _reposition: function(rect) {
            if (!this.element || !this.wrapper || !this.editor)
                return;

            if (!rect) {
                var selection = this.editor.window.getSelection();
                if (!selection.rangeCount)
                    return;

                var range = selection.getRangeAt(0);
                rect = this._getSelectionRect(range);
            }

            return ice.Floatbar.prototype._reposition.call(this, rect);
        },

        _refreshFunnelList: function() {
            this._$ui.link.funnel
                .find('option:not([value="none"])')
                .remove();

            this._$ui.link.article
                .attr("data-op-funnel-next-page-id", "")
                .attr("data-op-funnel-prev-page-id", "")
                .attr("data-op-funnel-no-page-id", "")
                .attr("data-op-funnel-pages-count", "");

            var funnels = OP3.Funnels;
            if (!funnels || !funnels.pluginActive || !funnels.funnelId)
                return;

            this._$ui.link.article
                .attr("data-op-funnel-next-page-id", funnels.nextPageId || "")
                .attr("data-op-funnel-prev-page-id", funnels.prevPageId || "")
                .attr("data-op-funnel-no-page-id", funnels.noPageId ||"")
                .attr("data-op-funnel-pages-count", funnels.pages && funnels.pages.length || "");

            (funnels.pages || [])
                .forEach(function(page, index) {
                    $("<option />")
                        .attr("value", page.id)
                        .text(page.title)
                        .appendTo(this._$ui.link.funnel);
                }.bind(this));
        },

        _refreshPopoverlayList: function() {
            this._$ui.link.popoverlay
                .find('option:not([value="none"])')
                .remove();

            OP3.PopOverlay
                .forEach(function(config) {
                    $("<option />")
                        .attr("value", config.uuid)
                        .text(config.name)
                        .appendTo(this._$ui.link.popoverlay);
                }.bind(this));
        },

        _addToPopoverlayList: function(uuid) {
            OP3.PopOverlay
                .filter(function(config) {
                    return config.uuid === uuid;
                })
                .forEach(function(config) {
                    $("<option />")
                        .attr("value", config.uuid)
                        .text(config.name)
                        .appendTo(this._$ui.link.popoverlay);
                }.bind(this));
        },

        _removeFromPopoverlayList: function(uuid) {
            this._$ui.link.popoverlay
                .find('option[value="' + uuid + '"]')
                .remove();
        },

        _resetFont: function() {
            // @todo - c/p from op3-text-editor.js, not sure
            // what this does...
            //
            // refresh hover state decorations
            this.refresh();
        },

        _resetLink: function() {
            //this._$ui.link.article
            //    .attr("data-op-action", "link");

            this._refreshLink();
        },

        _refreshLink: function() {
            var link = this._getSelectionLink(),
                $link = $(link),
                href = $link.attr("href") || "#",
                target = $link.attr("target") || "",
                rel = $link.attr("rel") || "",
                action = ""
                    || $link.attr("data-op-action")
                    || $link.attr("data-op3-action")
                    || "link",
                popoverlay = ""
                    || $link.attr("data-op-popoverlay-trigger")
                    || $link.attr("data-op3-popoverlay-trigger")
                    || "none",
                funnelStep = (action === "goToFunnelStep" ? this._getFunnelStep(href) : "") || "none";

            // display action related options
            this._$ui.link.article
                .attr("data-op-action", action);

            // refresh inputs
            this._$ui.link.action
                .val(action);
            this._$ui.link.popoverlay
                .val(popoverlay);
            this._$ui.link.funnel
                .val(funnelStep);

            // value for url, target and rel will be automatically
            // set (using data-ice-decoration attribute)
        },

        _resetAnimation: function() {
            this._$ui.animation.article
                //.attr("data-op-loop", "0")
                .attr("data-op-style", "")
                .attr("data-op-type", "");

            this._refreshAnimation();
        },

        _refreshAnimation: function() {
            // Get type/style from user interface
            var wrapper = this.editor.select("span", "op3-text-animation"),
                type = this._$ui.animation.article.attr("data-op-type") || this._$ui.animation.type.val() || "draw",
                style = this._$ui.animation.article.attr("data-op-style") || "";

            // Get type/style from wrapper
            if (wrapper) {
                type = $(wrapper).attr("data-op3-text-animation-type") || "draw";
                style = $(wrapper).attr("data-op3-text-animation-style") || "";
            }

            // Set type/style
            this._$ui.animation.article
                //.attr("data-op-loop", "0")
                .attr("data-op-style", style)
                .attr("data-op-type", type);
            this._$ui.animation.type
                .val(type)
                .trigger("op3icerefresh");
            this._$ui.animation.drawStyle
                .val(type === "draw" ? style : "")
                .trigger("op3icerefresh");
            this._$ui.animation.wordStyle
                .val(type === "word" ? style : "")
                .trigger("op3icerefresh");

            if (!wrapper)
                return;

            // Reset all
            this._$ui.animation.options
                .filter(":checkbox")
                .prop("checked", false)
                .trigger("op3icerefresh");
            this._$ui.animation.options
                .not(":checkbox")
                .val("")
                .trigger("op3icerefresh");

            // Set only current type
            var options = this.editor.animationLibExec("serialize");
            this._$ui.animation.options
                .filter(function() {
                    return $(this)
                        .closest(".ice-floatbar-animation-content-all-options,.ice-floatbar-animation-content-" + type + "-options")
                        .length;
                })
                .each(function() {
                    var attr = $(this).attr("data-animation-option"),
                        key = attr.replace(/-[a-z]/g, function(match) {
                            return match.charAt(1).toUpperCase();
                        }),
                        value = options[key];

                    if (key === "words")
                        value = value.join("\n");

                    if ($(this).is(":checkbox"))
                        $(this)
                            .prop("checked", value)
                            .trigger("op3icerefresh");
                    else
                        $(this)
                            .val(value)
                            .trigger("op3icerefresh");
                });

            this._$ui.animation.article
                .attr("data-op-loop", options.loop ? "1" : "0");
        },

        /**
         * Trigger change on [contenteditable] element
         * so the op3 elementchange event triggers.
         *
         * @return {Void}
         */
        _applyChanges: function() {
            if (!this.editor || !this.editor.element)
                return;

            $(this.editor.element)
                .trigger("op3contenteditablechange");
        },

        _handleOnReady: function(e) {
            // Default open-sans font may be missing in stylesheets
            var style = this.element.ownerDocument.createElement("link");
            style.href = "https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=latin-ext";
            style.rel = "stylesheet";
            this.document.head.appendChild(style);

            this._$ui = {
                link: {},
                animation: {},
            };
            this._$ui.link.article = $(this.wrapper).find(".ice-floatbar-dropdown-link");
            this._$ui.link.action = this._$ui.link.article.find(".ice-floatbar-link-action");
            this._$ui.link.url = this._$ui.link.article.find(".ice-floatbar-link-url");
            //this._$ui.link.target = this._$ui.link.article.find(".ice-floatbar-link-target");
            //this._$ui.link.relNofollow = = this._$ui.link.article.find(".ice-floatbar-link-rel-nofollow");
            this._$ui.link.popoverlay = this._$ui.link.article.find(".ice-floatbar-link-popoverlay-trigger");
            this._$ui.link.funnel = this._$ui.link.article.find(".ice-floatbar-select-funnel-step-trigger");
            this._$ui.animation.article = $(this.wrapper).find(".ice-floatbar-dropdown-animation");
            this._$ui.animation.type = this._$ui.animation.article.find(".ice-floatbar-animation-type");
            this._$ui.animation.drawStyle = this._$ui.animation.article.find(".ice-floatbar-animation-draw-style");
            this._$ui.animation.wordStyle = this._$ui.animation.article.find(".ice-floatbar-animation-word-style");
            this._$ui.animation.options = this._$ui.animation.article.find("[data-animation-option]");
            this._$ui.animation.optionColor = this._$ui.animation.options.filter('[data-animation-option="color"]');

            // Store animate options
            this._animationDefaultOptions = {};

            // Uniform
            this._uniform();

            // @todo - off on destructor
            $(this.document)
                .on("change", ".ice-floatbar-link-action", this._handleChangeLinkAction.bind(this))
                .on("change", ".ice-floatbar-link-popoverlay-trigger", this._handleChangeLinkPopOverlay.bind(this))
                .on("change", ".ice-floatbar-select-funnel-step-trigger", this._handleChangeLinkFunnelStep.bind(this))
                .on("change", ".ice-floatbar-animation-type", this._handleChangeAnimationType.bind(this))
                .on("change", ".ice-floatbar-animation-style", this._handleChangeAnimationStyle.bind(this))
                .on("change", ".ice-floatbar-dropdown-animation [data-animation-option]", this._handleChangeAnimationOption.bind(this))
                .on("click", ".ice-floatbar-animation-content-animate a", this._handleChangeAnimationAnimate.bind(this))

            OP3.LiveEditor.$ui.html
                .on("mousedown", this._handleLiveEditorMouseDown.bind(this));

            OP3.bind("elementbeforeunfocus", this._handleElementBeforeUnfocus.bind(this));
            OP3.bind("loadelementtextanimations", this._handleLoadElementTextAnimations.bind(this));
            OP3.bind("ready", this._handleReadyFunnelInit.bind(this));
            OP3.bind("ready", this._handleReadyPopoverlayInit.bind(this));
        },

        _handleOnDropdown: function(e) {
            if (e.detail.to === "font")
                this._resetFont();
            else if (e.detail.to === "link")
                this._resetLink();
            else if (e.detail.to === "animation")
                this._resetAnimation();

            // Colorpicker recent color values are appended to
            // local storage on widget hide/show, and since our
            // widget is used as inline widget (always shown)
            // we need to manually store color.
            if (/^\w+-color$/.test(e.detail.from))
                $(this.wrapper)
                    .find(".ice-floatbar-dropdown.ice-floatbar-dropdown-" + e.detail.from + " .jquery-colorpicker")
                    .colorpicker("addToRecent");

            // Since we use colorpicker as inline widget we
            // need to refresh it on "show" (dropdown).
            if (/^\w+-color$/.test(e.detail.to))
                $(this.wrapper)
                    .find(".ice-floatbar-dropdown.ice-floatbar-dropdown-" + e.detail.to + " .jquery-colorpicker")
                    .colorpicker("refresh");
        },

        _handleOnReposition: function(e) {
            var le = this.window.parent.parent,
                $cp = le.$(this._$ui.animation.optionColor),
                $widget = $cp.data("jquery-colorpicker").$ui.widget;
            if (!$widget.is(".jquery-colorpicker-show"))
                return;

            // Unfortunately we can not call reposition, be cause
            // it will take current colorpicker link position, which
            // (if in transition) is invalid. So, let's move our
            // colorpicker widget using the same offset floatbar
            // does.
            //$cp.colorpicker("reposition");

            var offsetX = e.detail.to[0] - e.detail.from[0],
                offsetY = e.detail.to[1] - e.detail.from[1];
            $widget.css({
                left: "+=" + offsetX,
                top: "+=" + offsetY,
            });
        },

        _handleDesignerDocumentScroll: function(e) {
            var le = this.window.parent.parent,
                $cp = le.$(this._$ui.animation.optionColor),
                $widget = $cp.data("jquery-colorpicker").$ui.widget;
            if (!$widget.is(".jquery-colorpicker-show"))
                return;

            $cp.colorpicker("hide");
        },

        /**
         * Iceselect event handler (override):
         * on animated element selection can be outside
         * the element, we're adjusting that here...
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleSelect: function(e) {
            OP3.LiveEditor.$ui.html
                .removeClass("op3-icefloatbar")
                .addClass(e.detail.hasSelection ? "op3-icefloatbar" : "_ice-temp")
                .removeClass("_ice-temp");

            e.detail.rect = this._getSelectionRect(e.detail.range, e.detail.rect);

            ice.Floatbar.prototype._handleSelect.call(this, e);
        },

        /**
         * Iceunselect event handler:
         * toggle html class.
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleUnselect: function(e) {
            OP3.LiveEditor.$ui.html
                .removeClass("op3-icefloatbar");

            ice.Floatbar.prototype._handleUnselect.call(this, e);
        },

        _handleLoadElementTextAnimations: function(e, o) {
            var _render = function(type) {
                return ""
                    + '<option value="">None</option>'
                    + OP3.TextAnimations.data(type)
                        .map(function(item) {
                            return $("<option />")
                                .text(item.text)
                                .attr("value", item.id)
                                .attr("data-markup", item.markup || "")
                                .attr("data-library", item.library || "")
                                .prop("outerHTML");
                        })
                        .join("");
            }

            this._$ui.animation.drawStyle.html(_render("draw"));
            this._$ui.animation.wordStyle.html(_render("word"));
        },

        /**
         * Live editor document mousedown event handler:
         * blur active element and remove selection range.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleLiveEditorMouseDown: function(e) {
            // Click on designer triggers click on live-editor
            // (to make sure libraries like colorpicker hide
            // their widgets), skip if this is the case
            var isDesinerTrigger = !!OP3.LiveEditor.$ui.body.data("op3-mousedown");
            if (isDesinerTrigger)
                return;

            // We have colorpicker with LiveEditor parent,
            // so excluding every colorpicker
            if ($(e.target).closest(".jquery-colorpicker-widget").length)
                return;

            // Blur and remove range
            this.document.activeElement.blur();
            OP3.Designer.ownerDocument.defaultView.getSelection().removeAllRanges();
        },

        /**
         * Element beforeunfocus event handler:
         * blur active element.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleElementBeforeUnfocus: function(e, o) {
            this.document.activeElement.blur();
        },

        _handleChangeLinkAction: function(e) {
            var action = $(e.target).val();

            // display action related options
            this._$ui.link.article
                .attr("data-op-action", action);

            // select link
            var link = this._selectionToLink(),
                $link = $(link),
                href = $link.attr("href") || "#",
                target = $link.attr("target") || "",
                rel = $link.attr("rel") || "",
                popoverlay = "none",
                funnel = "none";

            // action to attributes
            if (action === "nextFunnelStep") {
                href = OP3.Meta.siteUrl + "/op-funnel-next-step/" + OP3.Meta.pageId;
                target = "";
                rel = "";
            }
            else if (action === "prevFunnelStep") {
                href = OP3.Meta.siteUrl + "/op-funnel-prev-step/" + OP3.Meta.pageId;
                target = "";
                rel = "";
            }
            else if (action === "noFunnelStep") {
                href = OP3.Meta.siteUrl + "/op-funnel-no-step/" + OP3.Meta.pageId;
                target = "";
                rel = "";
            }
            else if (action === "goToFunnelStep") {
                var step = this._getFunnelStep(href);
                if (step)
                    funnel = step;
                else
                    href = "#";

                target = "";
                rel = "";
            }
            else if (action === "popoverlay" || action === "closePopoverlay") {
                href = "#";
                target = "";
                rel = "";
            }

            // set link
            $link
                .removeAttr("data-op-popoverlay-trigger")
                .removeAttr("target")
                .removeAttr("rel")
                .attr("data-op-action", action)
                .attr("href", href)
                .attr(target ? "target" : "data-ice-temp", target)
                .attr(rel ? "rel" : "data-ice-temp", rel)
                .removeAttr("data-ice-temp");

            // refresh dropdowns
            this._$ui.link.popoverlay
                .val(popoverlay);
            this._$ui.link.funnel
                .val(funnel);
            // value for url, target and rel will be automatically
            // set (using data-ice-decoration attribute)

            // ...and apply changes
            this._applyChanges();

            // action changed, and new action related options are
            // shown, which means that the size may changed
            this.refresh();
        },

        _handleChangeLinkPopOverlay: function(e) {
            var link = this._selectionToLink(),
                action = "popoverlay",
                value = this._$ui.link.popoverlay.val(),
                href = "#";

            // set link
            $(link)
                .attr("data-op-popoverlay-trigger", value !== "none" ? value : "")
                .attr("data-op-action", action)
                .attr("href", href);

            // ...and apply changes
            this._applyChanges();
        },

        _handleChangeLinkFunnelStep: function(e) {
            var link = this._selectionToLink(),
                action = "goToFunnelStep",
                value = this._$ui.link.funnel.val(),
                href = value !== "none" ? OP3.Meta.siteUrl + "/op-funnel-step/" + OP3.Meta.pageId + "/" + value : "#";

            // set link
            $(link)
                .removeAttr("data-op-popoverlay-trigger")
                .attr("data-op-action", action)
                .attr("href", href);

            // ...and apply changes
            this._applyChanges();
        },

        _handleChangeAnimationType: function(e) {
            this._$ui.animation.article
                //.attr("data-op-loop", "0")
                .attr("data-op-style", "")
                .attr("data-op-type", e.target.value);

            // Selection may change, making sure that we still
            // have animation tab active.
            this._disableDropdown();

            // Unwrap
            this.editor.animationUnwrap();

            this._refreshAnimation();
            this._reposition();
        },

        _handleChangeAnimationStyle: function(e) {
            var $target = $(e.target),
                $option = $target.find(":selected"),
                type = $target.is(".ice-floatbar-animation-word-style") ? "word" : "draw",
                style = $target.val(),
                markup = $option.attr("data-markup") || null,
                library = $option.attr("data-library") || null;

            this._$ui.animation.article
                .attr("data-op-style", style)
                .attr("data-op-type", type);

            // Before anything store current options (if any)
            var options = this.editor.animationLibExec("serialize");
            if (options) {
                delete options.words;
                delete options.loop;

                this._animationDefaultOptions = options;
            }

            // Selection may change, making sure that we still
            // have animation tab active.
            this._disableDropdown();

            // Unwrap/wrap (preserve words/loop)
            this.editor.animationEdit(type, style, markup, library, $.extend({}, this._animationDefaultOptions, {
                words: this.editor.animationLibExec("getOption", "words"),
                loop: this.editor.animationLibExec("getOption", "loop"),
            }));

            this._refreshAnimation();
            this._reposition();
        },

        _handleChangeAnimationOption: function(e) {
            var $target = $(e.target),
                key = $target.attr("data-animation-option"),
                value = $target.val();

            // Selection may change, making sure that we still
            // have animation tab active.
            this._disableDropdown();

            // Input value to option
            if ($target.is(":checkbox"))
                value = $target.is(":checked");
            else if (key === "words")
                value = value.trim().split("\n");

            // Store to defaults object. Do not preserve words/loop,
            // we want that those options be default ones (we gonna
            // use current words/loop only on style change).
            if ([ "words", "loop" ].indexOf(key) === -1)
                this._animationDefaultOptions[key] = value;

            this.editor.animationLibExec("setOption", key, value);

            // Setting new words will remove selection, let's bring
            // it back.
            this.editor.animationLibExec("select");

            // Store loop to article data attribute, and start
            // animation
            if (key === "loop") {
                this._$ui.animation.article
                    .attr("data-op-loop", value ? "1" : "0");

                if (value)
                    this.editor.animationLibExec("animate");
            }
        },

        _handleChangeAnimationAnimate: function(e) {
            e.preventDefault();

            this.editor.animationLibExec("animate");
        },

        _handleReadyFunnelInit: function(e, o) {
            this._refreshFunnelList();
        },

        _handleReadyPopoverlayInit: function(e, o) {
            this._refreshPopoverlayList();

            // This should be binded at init, but handlers uses
            // Popoverlay.forEach iterator which list is refreshed
            // also on elementappend/elementdetach, so with delay
            // bind we're making sure that the iterator list will
            // be refreshed
            OP3.LiveEditor.ownerDocument.defaultView.OP3.bind("elementappend::popoverlay", this._handleElementAppendPopoverlay.bind(this));
            OP3.LiveEditor.ownerDocument.defaultView.OP3.bind("elementdetach::popoverlay elementremove::popoverlay", this._handleElementDetachPopoverlay.bind(this));
        },

        _handleElementAppendPopoverlay: function(e, o) {
            this._addToPopoverlayList(o.uuid);
        },

        _handleElementDetachPopoverlay: function(e, o) {
            this._removeFromPopoverlayList(o.uuid);
        },

    });

    // Globalize
    if (!ice.OP3)
        ice.OP3 = {};
    ice.OP3.Floatbar = ice_Floatbar;

})(window.jQuery, window, document, undefined);
