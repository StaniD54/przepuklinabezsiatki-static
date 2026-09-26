;(function(window, document) {
    // Invoke strict mode.
    "use strict";

    /**
     * OP3_TypographyControlPanel constructor.
     *
     * @return {Void}
     */
    var OP3_TypographyControlPanel = function() {
        if (!(this instanceof OP3_TypographyControlPanel))
            throw "OP3_TypographyControlPanel: OP3_TypographyControlPanel is a constructor.";

        this._init();
    }

    /**
     * OP3_TypographyControlPanel prototype.
     *
     * @type {Object}
     */
    OP3_TypographyControlPanel.prototype = {
        /**
         * Reasign constructor.
         *
         * @type {Function}
         */
        constructor: OP3_TypographyControlPanel,

        /**
         * Initialize.
         *
         * @return {Void}
         */
        _init: function() {
            var element = OP3.$("<_tcp_template />"),
                $element = element.jq();
            this._element = element.element();

            // Store each child...
            var children = {};
            element
                .find("*")
                .each(function() {
                    children[OP3.$(this).type()] = this;
                });
            this._children = children;

            // ...and other DOM elements for easier access.
            this._$ui = {
                element: $element,
                loading: $element.find(".op3-typography-control-panel--loading-target"),
                message: $element.find(".op3-typography-control-panel--message-target"),
                wrapper: $element.find(".op3-typography-control-panel--wrapper"),
                content: $element.find(".op3-typography-control-panel--content"),
                input: $element.find(".op3-typography-control-panel--input"),
            };

            // Bound handlers.
            this._boundHandleContentScroll = this._handleContentScroll.bind(this);
            this._boundHandleInputChange = this._handleInputChange.bind(this);
            this._boundHandleActionChange = this._handleActionChange.bind(this);
            this._boundHandleCloseClick = this._handleCloseClick.bind(this);
            this._boundHandleApplyClick = this._handleApplyClick.bind(this);
            this._boundHandleContentElementsClick = this._handleContentElementsClick.bind(this);
            this._boundHandleContentPresetsClick = this._handleContentPresetsClick.bind(this);
            this._boundHandleElementUnfocus = this._handleElementUnfocus.bind(this);
            this._boundHandleModalFocus = this._handleModalFocus.bind(this);
            this._boundHandleDeviceChange = this._handleDeviceChange.bind(this);
            this._boundHandleElementChange = this._handleElementChange.bind(this);
            this._boundHandleWorkerFrameRequest = this._handleWorkerFrameRequest.bind(this);
            this._boundHandleWorkerComplete = this._handleWorkerComplete.bind(this);

            // Bind DOM events.
            $element
                .on("input.op3tpcconstruct change.op3tpcconstruct select2:open.op3tpcconstruct", '.op3-typography-control-panel--input', this._boundHandleInputChange)
                .on("change.op3tpcconstruct", '.op3-typography-control-panel--input[name="action"]', this._boundHandleActionChange)
                .on("click.op3tpcconstruct", ".op3-typography-control-panel--click-close", this._boundHandleCloseClick)
                .on("click.op3tpcconstruct", ".op3-typography-control-panel--click-apply", this._boundHandleApplyClick)
                .on("click.op3tpcconstruct", ".op3-typography-control-panel--click-content-elements", this._boundHandleContentElementsClick)
                .on("click.op3tpcconstruct", ".op3-typography-control-panel--click-content-presets", this._boundHandleContentPresetsClick);
            this._$ui.content
                .on("scroll.op3tpcconstruct", this._boundHandleContentScroll);

            // Element unfocus logic.
            OP3.bind("elementunfocus", this._boundHandleElementUnfocus);

            // Show live-editor sidebar on tcp_modal focus.
            OP3.bind("elementfocus", this._boundHandleModalFocus);

            // Select2.
            $element
                .find(".op3-typography-control-panel--select2")
                .each(function() {
                    var $this = $(this),
                        options = {
                            width: "100%",
                            dropdownParent: $element.get(0),
                            dropdownCssClass: "op3-typography-control-panel--widget-select2-" + ($this.is('.op3-typography-control-panel--select2-search') ? "search" : "simple"),
                        };

                    $this.select2(options);
                });

            // Get list of all typography properties from OP3.Document
            // element (include only non-proxy properties that starts
            // with tcp_).
            this._properties = [];
            OP3.Document.forEachProperty(function(prop) {
                var propId = prop.id();
                if (/^tcp_/.test(propId) && prop.proxy() === prop)
                    this._properties.push(propId);
            }.bind(this));
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            this.close();

            OP3.unbind("elementfocus", this._boundHandleModalUnfocus);
            OP3.unbind("elementunfocus", this._boundHandleElementUnfocus);

            if (OP3.Worker.busy)
                OP3.Worker.clear();

            delete this._boundHandleWorkerComplete;
            delete this._boundHandleWorkerFrameRequest;
            delete this._boundHandleElementChange;
            delete this._boundHandleDeviceChange;
            delete this._boundHandleModalUnfocus;
            delete this._boundHandleElementUnfocus;
            delete this._boundHandleContentPresetsClick;
            delete this._boundHandleContentElementsClick;
            delete this._boundHandleApplyClick;
            delete this._boundHandleCloseClick;
            delete this._boundHandleActionChange;
            delete this._boundHandleInputChange;
            delete this._boundHandleContentScroll;
            delete this._$ui;
            delete this._children;
            delete this._element;
        },

        /**
         * Element property getter.
         *
         * @return {OP3_Element_TCP_Modal}
         */
        get element() {
            return this._element;
        },

        /**
         * Visible property getter:
         * is element attached to DOM.
         *
         * @return {Boolean}
         */
        get visible() {
            return this.element.attached();
        },

        /**
         * Is loading property getter (is API request pending).
         *
         * @return {Boolean}
         */
        get isLoading() {
            return this._getLoadingStatus();
        },

        /**
         * Open modal.
         *
         * @return {OP3_TypographyControlPanel}
         */
        open: function() {
            if (this.visible || this._$ui.element.hasClass("op3-typography-control-panel--show"))
                return this;

            OP3.PopOverlay.close();
            OP3.Designer.activeElement().unfocus();
            OP3.Designer.$ui.html.addClass("op3-typography-control-panel--active");

            // User interface.
            this._setContent("elements");
            this._setLoadingStatus(false);
            this._clearMessage();
            this._unflagInputError();
            OP3.LiveEditor.sidebarShow();

            // Prepend element and open modal. By prepending (not appending)
            // element we're making sure that elements on modal will be the
            // first elements in designer and that the styles will be
            // targeted to those elements.
            OP3.$(this.element)
                .prependTo(OP3.Document)
                .focus()
                .each(function() {
                    // Force repaint...
                    var $this = $(this);
                    $this.prop("offsetHeight");

                    // ...before we transit fade in.
                    $this.addClass("op3-typography-control-panel--show")
                });

            // Refresh modal stylesheet.
            this._refresh();

            // Bind OP3 events.
            OP3.bind("devicechange", this._boundHandleDeviceChange);
            OP3.bind("elementchange::document::marginTop elementchange::document::marginBottom", this._boundHandleElementChange);

            return this;
        },

        /**
         * Close modal.
         *
         * @return {OP3_TypographyControlPanel}
         */
        close: function() {
            if (!this.visible || !this._$ui.element.hasClass("op3-typography-control-panel--show"))
                return this;

            // Do not allow content change if API request pending.
            if (this.isLoading)
                return;

            // Unbind OP3 events.
            OP3.unbind("elementchange::document::marginTop elementchange::document::marginBottom", this._boundHandleElementChange);
            OP3.unbind("devicechange", this._boundHandleDeviceChange);

            // User interface.
            OP3.Designer.activeElement().unfocus();
            OP3.Designer.$ui.html.removeClass("op3-typography-control-panel--active");

            // Animate close.
            this._$ui.element
                .on("transitionend.op3tpctransitionend", function(e) {
                    if (e.target !== e.currentTarget || e.originalEvent.propertyName !== "visibility")
                        return;

                    $(e.currentTarget).off("transitionend.op3tpctransitionend");

                    this.element.detach();
                }.bind(this))
                .removeClass("op3-typography-control-panel--show");

            return this;
        },

        /**
         * Toggle modal.
         *
         * @return {OP3_TypographyControlPanel}
         */
        toggle: function() {
            if (this.visible)
                return this.close();

            return this.open();
        },

        /**
         * Reset (set to null) each typography control panel element
         * property. For better user experiance use resetAsync method
         * instead.
         *
         * We already have the logic in _workerJobsReset, so no need
         * to repeat ourselves: exectuting it synchronous.
         *
         * @param  {String}                     tagName
         * @return {OP3_TypographyControlPanel}
         */
        reset: function(tagName) {
            this._workerJobsReset(tagName).forEach(function(item) {
                var fn = item[0],
                    args = item[1],
                    weight = item[2];

                fn.apply(this, args);
            }.bind(this));

            return this;
        },

        /**
         * Execute reset method (see above) asynchronous (using OP3.Worker
         * and OP3.Loadinfo).
         *
         * @param  {String}                     tagName
         * @return {OP3_TypographyControlPanel}
         */
        resetAsync: function(tagName) {
            if (!OP3.Worker)
                throw "OP3.Query: can not execute async methods, OP3.Worker missing.";
            if (OP3.Worker.busy)
                throw "OP3.Worker: can not execute async methods, OP3.Worker busy.";

            // Prepare worker and show loadinfo (event workercomplete will hide
            // loadinfo and clean worker).
            this._prepareWorker("Reseting typography settings...");

            // Get job list, fill and start worker. For better user expirience
            // we're using next ticks (setTimeout)...
            setTimeout(function() {
                // Get jobs list.
                var jobs = this._workerJobsReset(tagName);

                // Fill worker with jobs.
                setTimeout(function() {
                    jobs.forEach(function(item) {
                        var fn = item[0],
                            args = item[1],
                            weight = item[2];

                        OP3.Worker.append(fn, args, weight);
                    });
                });

                // Start worker (using delay for better user expirience).
                setTimeout(function() {
                    OP3.Worker.start();
                }, 125);
            }.bind(this));

            return this;
        },

        /**
         * Override all element styling: remove styling and reset OP3
         * properties to make sure all settings are inharited from
         * typography control panel. For better user experiance use
         * overrideAsync method instead.
         *
         * We already have the logic in _workerJobsOverride, so no need
         * to repeat ourselves: exectuting it synchronous.
         *
         * @param  {String}                     tagName
         * @param  {Mixed}                      context (optional)
         * @return {OP3_TypographyControlPanel}
         */
        override: function(tagName, context) {
            this._workerJobsOverride(tagName, context).forEach(function(item) {
                var fn = item[0],
                    args = item[1],
                    weight = item[2];

                fn.apply(this, args);
            });

            return this;
        },

        /**
         * Execute override method (see above) asynchronous (using OP3.Worker
         * and OP3.Loadinfo).
         *
         * @param  {String}                     tagName
         * @param  {Mixed}                      context (optional)
         * @return {OP3_TypographyControlPanel}
         */
        overrideAsync: function(tagName, context) {
            if (!OP3.Worker)
                throw "OP3.Query: can not execute async methods, OP3.Worker missing.";
            if (OP3.Worker.busy)
                throw "OP3.Worker: can not execute async methods, OP3.Worker busy.";

            // Prepare worker and show loadinfo (event workercomplete will hide
            // loadinfo and clean worker).
            this._prepareWorker("Overriding typography for " + OP3.$(this._children["tcp_" + tagName]).title() + "...");

            // Get job list, fill and start worker. For better user expirience
            // we're using next ticks (setTimeout)...
            setTimeout(function() {
                // Get jobs list.
                var jobs = this._workerJobsOverride(tagName, context);

                // Fill worker with jobs.
                setTimeout(function() {
                    jobs.forEach(function(item) {
                        var fn = item[0],
                            args = item[1],
                            weight = item[2];

                        OP3.Worker.append(fn, args, weight);
                    });
                });

                // Start worker (using delay for better user expirience).
                setTimeout(function() {
                    OP3.Worker.start();
                }, 125);
            }.bind(this));

            return this;
        },

        /**
         * Get current preset configuration.
         *
         * @return {Object}
         */
        getPreset: function() {
            var validProps = this._properties,
                result = {};

            OP3.LiveEditor.forEachDevice(function(device, media) {
                // Add media to result.
                result[media] = {};

                // Iterate properties.
                validProps.forEach(function(prop) {
                    var value = OP3.Document.getOption(prop, media);
                    if (value === null)
                        return;

                    // Add property to media.
                    result[media][prop] = value;
                });
            });

            return result;
        },

        /**
         * Apply preset configuration.
         *
         * @param  {Object}                     data
         * @return {OP3_TypographyControlPanel}
         */
        applyPreset: function(data) {
            OP3.LiveEditor.forEachDevice(function(device, media) {
                this._properties.forEach(function(propId) {
                    var value = null;
                    if (data && (media in data) && (propId in data[media]))
                        value = data[media][propId];

                    OP3.Document.setOption(propId, value, media);
                });
            }.bind(this));

            return this;
        },

        /**
         * Refresh modal stylesheet.
         *
         * Top margin on <p> element is not applied to first-child. And
         * Bottom margin on <p> element is not applied to last-child.
         * Let's make sure that top/bottom margins on <p> is applied
         * to tcp_p OP3 element as well.
         * Addition: beside <p> same logic should be applied to
         * <ul/ol>, <blockquote> and <pre>.
         *
         * @return {Void}
         */
        _refresh: function() {
            this._refreshHeadings();
            this._refreshTexts();
            this._refreshPre();
        },

        /**
         * Refresh modal stylesheet for tcp_headings elements.
         *
         * @return {Void} [description]
         */
        _refreshHeadings: function() {
            this._refreshH1();
            this._refreshH2();
            this._refreshH3();
            this._refreshH4();
            this._refreshH5();
            this._refreshH6();
        },

        /**
         * Refresh modal stylesheet for tcp_texts elements.
         *
         * @return {Void} [description]
         */
        _refreshTexts: function() {
            this._refreshP();
            this._refreshLi();
            this._refreshBlockquote();
        },

        /**
         * Refresh modal stylesheet for tcp_h1 chld.
         *
         * @return {Void}
         */
        _refreshH1: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_h1, {
                marginTop: "tcp_h1_marginTop",
                marginBottom: "tcp_h1_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_h2 chld.
         *
         * @return {Void}
         */
        _refreshH2: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_h2, {
                marginTop: "tcp_h2_marginTop",
                marginBottom: "tcp_h2_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_h3 chld.
         *
         * @return {Void}
         */
        _refreshH3: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_h3, {
                marginTop: "tcp_h3_marginTop",
                marginBottom: "tcp_h3_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_h4 chld.
         *
         * @return {Void}
         */
        _refreshH4: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_h4, {
                marginTop: "tcp_h4_marginTop",
                marginBottom: "tcp_h4_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_h5 chld.
         *
         * @return {Void}
         */
        _refreshH5: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_h5, {
                marginTop: "tcp_h5_marginTop",
                marginBottom: "tcp_h5_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_h6 chld.
         *
         * @return {Void}
         */
        _refreshH6: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_h6, {
                marginTop: "tcp_h6_marginTop",
                marginBottom: "tcp_h6_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_p chld.
         *
         * @return {Void}
         */
        _refreshP: function() {
            this._applyDOMStylesheetToOP3Stylesheet([this._children.tcp_p,this._children.tcp_a], {
                marginTop: "tcp_p_marginTop",
                marginBottom: "tcp_p_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_li chld.
         *
         * @return {Void}
         */
        _refreshLi: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_li, {
                //marginTop: "tcp_li_itemMarginTop",
                //marginBottom: "tcp_li_itemMarginBottom",
                marginTop: "tcp_li_marginTop",
                marginBottom: "tcp_li_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_blockquote chld.
         *
         * @return {Void}
         */
        _refreshBlockquote: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_blockquote, {
                marginTop: "tcp_blockquote_marginTop",
                marginBottom: "tcp_blockquote_marginBottom",
            });
        },

        /**
         * Refresh modal stylesheet for tcp_pre chld.
         *
         * @return {Void}
         */
        _refreshPre: function() {
            this._applyDOMStylesheetToOP3Stylesheet(this._children.tcp_pre, {
                marginTop: "tcp_pre_marginTop",
                marginBottom: "tcp_pre_marginBottom",
            });
        },

        /**
         * Element type to CSS selector.
         *
         * @param  {String} elementType
         * @return {String}
         */
        _cssElementSelector: function(elementType) {
            return elementType
                .split(/\s*,\s*/)
                .map(function(item) {
                    return '.op3-element[data-op3-element-type="' + item + '"]';
                })
                .join(",");
        },

        /**
         * Apply DOM stylesheet to OP3 stylesheet.
         *
         * @param  {Element} node
         * @param  {Object}  props
         * @return {Void}
         */
        _applyDOMStylesheetToOP3Stylesheet: function(node, props) {
            var $node = $(node);
            Object.keys(props).forEach(function(prop) {
                var css = prop,
                    op3 = props[prop];

                $node.css(prop, OP3.Document.getOption(op3, true));
            });
        },

        /**
         * Find all OP3 elements on page that needs properties clear.
         *
         * @param  {String} tagName
         * @param  {String} propertyPrefix
         * @param  {Array}  additionalProperties
         * @return {Object}                      jQuery array-like object
         */
        _findOP3ElementPropertiesForClearing: function(tagName, propertyPrefix, additionalProperties) {
            var result = [];
            if (!tagName)
                return result;

            // Property regex pattern.
            var pattern = new RegExp("^tcp_(" + tagName.toLowerCase().split(/\s*,\s*/).join("|") + ")_(.+)");

            // Filter properties (match pattern above), remove tcp_ suffix
            // and append prefix.
            result = this._properties
                .filter(function(prop) {
                    // Properties margin/padding are targeting DOM element,
                    // not OP3 element wrapper.
                    if (/margin|padding/i.test(prop))
                        return false;

                    // Specific tag only.
                    if (!pattern.test(prop))
                        return false;

                    return true;
                })
                .map(function(prop) {
                    // Remove tcp_{tagName}_.
                    prop = prop.match(pattern)[2];

                    // Add prefix.
                    if (propertyPrefix)
                        prop = propertyPrefix + prop.charAt(0).toUpperCase() + prop.slice(1);

                    return prop;
                });

            // Append additional properties argument.
            (additionalProperties || []).forEach(function(propId) {
                var key = propId;
                if (propertyPrefix)
                    key = propertyPrefix + key.charAt(0).toUpperCase() + key.slice(1);

                result.push(key);
            });

            return result;
        },

        /**
         * Find all DOM elements on page that needs to be overriden.
         *
         * @param  {String} tagName
         * @param  {Mixed}  context
         * @return {Object}         jQuery array-like object
         */
        _findDOMElementsForOverriding: function(tagName, context) {
            var $context = $(context || OP3.Designer.$ui.babysitter),
                $element = $context.find(tagName);

            // Some special cases.
            if (tagName === "li")
                $element = $element.add($context.find('ul, ol, .op3-element[data-op3-element-type="bulletblock"], .op3-element[data-op3-element-type="bulletlist"]'));

            // Filter global element.
            var geElement = OP3.GlobalElements.editor().element,
                geUuid = geElement ? geElement.uuid() : null;
            $element = $element
                .filter(function() {
                    var $geParent = $(this).closest('.op3-element[data-op3-gid]:not([data-op3-gid=""])');
                    if (geUuid && $geParent.attr("data-op3-uuid") == geUuid)
                        return true;
                    else if (!geUuid && !$geParent.length)
                        return true;

                    return false;
                });

            // Remove typography modal elements.
            $element = $element
                .not(function() {
                    return $(this).closest('.op3-element[data-op3-element-type="tcp_modal"]').length;
                });

            return $element;
        },

        /**
         * Get reset (see this.reset method) each typography control panel
         * element property logic in chunked function list (prepared for
         * OP3.Worker).
         *
         * @param  {String} tagName (optional)
         * @return {Array}
         */
        _workerJobsReset: function(tagName) {
            var argsList = [],
                jobsPerFrame = 60,
                jobWeight = 1 / jobsPerFrame,
                jobFn = function(prop, media) {
                    OP3.Document.setOption(prop, null, media);
                };

            // Get arguments list (property id and media).
            this._properties
                .forEach(function(prop) {
                    // Specific tag only.
                    if (tagName) {
                        var pattern = new RegExp("^tcp_(" + tagName.toLowerCase().split(/\s*,\s*/).join("|") + ")_(.+)");
                        if (!pattern.test(prop))
                            return;
                    }

                    // Push arguments (property id and media) to argument list.
                    OP3.LiveEditor.forEachDevice(function(device, media) {
                        argsList.push([ prop, media ]);
                    });
                });

            // Map argument list suitable for OP3.Worker.
            return argsList.map(function(args) {
                return [ jobFn, args, jobWeight ];
            });
        },

        /**
         * Get override (see this.override method) logic in chunked function
         * list (prepared for OP3.Worker).
         *
         * @param  {String} tagName (optional)
         * @param  {Mixed}  context
         * @return {Array}
         */
        _workerJobsOverride: function(tagName, context) {
            tagName = tagName
                .toLowerCase()
                .trim();

            var result = [],
                $node = this._findDOMElementsForOverriding(tagName, context);
            if (!$node.length)
                return result;

            // Since there is textAlign set to center in headline element
            // CSS, we must force textAlign of tcp_hX element (don't leave
            // it as null) to make sure it will apply to headline element.
            if (/^h[1-6]$/.test(tagName)) {
                var element = OP3.Document,
                    propName = "tcp_" + tagName + "_textAlign",
                    jobsPerFrame = 30,
                    jobWeight = 1 / jobsPerFrame;
                if (!element.getOption(propName, "all"))
                    result.push([function(element, tagName, propName) {
                        // Add dummy element, get it's computed text-align and
                        // store it to OP3 property.
                        $('<' + tagName + '/>')
                            .css('display', 'none')
                            .prependTo(OP3.Designer.$ui.babysitter)
                            .each(function() {
                                // The target is stored into property object, we need to
                                // reset it and make sure that no headline element is
                                // targeted (we don't want it's default center).
                                element.findProperty(propName)._target = null;

                                var value = element.getOption(propName, true);
                                element.setOption(propName, value, "all");
                            })
                            .remove();
                    }, [ element, tagName, propName ], jobsPerFrame]);
            }

            // Fill job list with specific element settings.
            if (/^h[1-6]$/.test(tagName)) {
                result = result.concat(this._workerJobsClearOP3ElementProperties("headline", tagName, $node));
                result = result.concat(this._workerJobsClearDOMElementStyling("headline,text", tagName, $node));
            }
            else if (tagName === "p") {
                result = result.concat(this._workerJobsClearOP3ElementProperties("text", tagName, $node, null, [ "paragraphMarginTop", "paragraphMarginBottom" ]));
                result = result.concat(this._workerJobsClearDOMElementStyling("text", tagName, $node));
            }
            else if (tagName === "li") {
                result = result.concat(this._workerJobsClearOP3ElementProperties("bulletblock", tagName, $node, "bulletlist", [ "marginTop", "marginBottom", "marginLeft", "marginRight" ]));
                result = result.concat(this._workerJobsClearOP3ElementProperties("bulletlist", tagName, $node, null, [ "marginTop", "marginBottom", "marginLeft", "marginRight" ]));
                result = result.concat(this._workerJobsClearDOMElementStyling("text", "ul,ol,li", $node));
            }
            else if (tagName === "a") {
                result = result.concat(this._workerJobsClearDOMElementStyling("headline,text", tagName, $node));
            }
            else if ([ "blockquote", "pre" ].indexOf(tagName) !== -1) {
                result = result.concat(this._workerJobsClearDOMElementStyling("text", tagName, $node));
            }

            return result;
        },

        /**
         * Clear (set to null) OP3 element properties in chunked function
         * list (prepared for OP3.Worker).
         *
         * @param  {String} elementType
         * @param  {String} tagName
         * @param  {Mixed}  nodes
         * @param  {String} propertyPrefix       (optional)
         * @param  {Array}  additionalProperties (optional)
         * @return {Array}
         */
        _workerJobsClearOP3ElementProperties: function(elementType, tagName, nodes, propertyPrefix, additionalProperties) {
            var result = [],
                $nodes = $(nodes);
            if (!$nodes.length)
                return result;

            // Get properties for resetting.
            var props = this._findOP3ElementPropertiesForClearing(tagName, propertyPrefix, additionalProperties);
            if (!props.length)
                return result;

            // Find OP3 elements on page and reset the properties.
            $(nodes)
                .closest(this._cssElementSelector(elementType))
                .filter(function(index, element) {
                    var exclude = 'textwithicon,webinarcalendar';
                    return !$(element).closest(this._cssElementSelector(exclude)).length;
                }.bind(this))
                .each(function(index, node) {
                    var element = OP3.$(node);
                    if (!element.length)
                        return;

                    result = result.concat(this._workerJobsClearOP3ElementPropertiesHandler(element, props));
                }.bind(this));

            return result;
        },

        /**
         * This is a handler (logic) for method above.
         *
         * @param  {OP3_Element} element
         * @param  {Array}       props
         * @return {Array}
         */
        _workerJobsClearOP3ElementPropertiesHandler: function(element, props) {
            var result = [],
                elementType = element.type(),
                jobsPerFrame = 60,
                jobWeight = 1 / jobsPerFrame,
                jobFnLinkProperties = function(element, value) {
                    element.setOption("linkProperties", value ? "1" : "0", "all");
                },
                jobFnReset = function(element, prop, media) {
                    element.setOption(prop, null, media);
                };

            // Get link properties state and disable it.
            var linkProperties = !!(element.getOption("linkProperties")*1);
            if (linkProperties)
                result.push([ jobFnLinkProperties, [ element, false ], jobWeight ]);

            // Iterate properties and media, reset it.
            props.forEach(function(propId) {
                OP3.LiveEditor.forEachDevice(function(device, media) {
                    result.push([ jobFnReset, [ element, propId, media ], jobWeight ]);
                });
            });

            // Check link properties config (reset parent if element can
            // be linked).
            (OP3.LinkProperties._config[elementType] || []).forEach(function(config) {
                // Config condition matches.
                if (config.condition && !element.jq().is(config.condition))
                    return;

                // Find link element.
                var linkElement = element.closest(config.owner);
                if (!linkElement.length)
                    return;

                // Map link properties.
                var linkProps = props
                    .filter(function(propId) {
                        return Object.keys(config.link.parent).indexOf(propId) !== -1;
                    })
                    .map(function(propId) {
                        return config.link.parent[propId];
                    });
                if (!linkProps.length)
                    return;

                // Recursion.
                result = result.concat(this._workerJobsClearOP3ElementPropertiesHandler(linkElement, linkProps));
            }.bind(this));

            // Enable back link properties.
            if (linkProperties)
                result.push([ jobFnLinkProperties, [ element, true ], jobWeight ]);

            return result;
        },

        /**
         * Clear element styling (unwrap styling DOM elements and remove
         * style attribute) in chunked function list (prepared for
         * OP3.Worker).
         *
         * @param  {String} elementType
         * @param  {String} tagName
         * @param  {Mixed}  nodes
         * @return {Array}
         */
        _workerJobsClearDOMElementStyling: function(elementType, tagName, nodes) {
            var result = [];

            // Find DOM elements and filter element types.
            $(nodes)
                .closest(this._cssElementSelector(elementType))
                .each(function(index, node) {
                    var element = OP3.$(node);
                    if (!element.length)
                        return;

                    result = result.concat(this._workerJobsClearDOMElementStylingHandler(element, tagName));
                }.bind(this));

            return result;
        },

        /**
         * This is a handler (logic) for method above.
         *
         * @param  {OP3_Element} element
         * @param  {String}      tagName
         * @return {Array}
         */
        _workerJobsClearDOMElementStylingHandler: function(element, tagName) {
            var result = [],
                jobsPerFrameRemoveStyle = 40,
                jobWeightRemoveStyle = 1 / jobsPerFrameRemoveStyle,
                jobFnRemoveStyle = function(node) {
                    while (node.childNodes.length === 1) {
                        var $child = $(node.childNodes[0]);
                        if (!$child.is("span,b,strong,i,em,u,ins,s,strike,del"))
                            break;

                        $child.contents().unwrap();
                        $child.remove();
                    }

                    $(node).removeAttr("style");
                },
                jobsPerFrameTriggerChange = 50,
                jobWeightTriggerChange = 1 / jobsPerFrameTriggerChange,
                jobFnTriggerChange = function(element, $content, valueBefore) {
                    var valueAfter = $content.html();
                    if (valueBefore === valueAfter)
                        return;

                    $content.html(valueBefore);
                    element.setOption("html", valueAfter, "all");
                };

            // Curent HTML property.
            var $element = element.jq(),
                $content = $element.find(" [data-op3-contenteditable]"),
                valueBefore = $content.html();

            // Remove element styling on each node.
            $element
                .find(tagName)
                .each(function() {
                    result.push([ jobFnRemoveStyle, [ this ], jobWeightRemoveStyle ]);
                });

            // Revert old value and set it with OP3, making sure
            // that all the events will trigger.
            result.push([ jobFnTriggerChange, [ element, $content, valueBefore ], jobWeightTriggerChange ]);

            return result;
        },

        /**
         * Prepare OP3.Worker:
         * set message, status, display progress and bind events.
         *
         * @param  {Srting} message
         * @return {Void}
         */
        _prepareWorker: function(message) {
            OP3.Loadinfo.message(message);
            OP3.Loadinfo.start(0);
            OP3.Loadinfo.status(0);
            OP3.Loadinfo.stop(1);
            OP3.Loadinfo.display(true);

            OP3.bind("workerframerequest", this._boundHandleWorkerFrameRequest);
            OP3.bind("workercomplete", this._boundHandleWorkerComplete);
        },

        /**
         * Get current content (elements or presets).
         *
         * @return {String}
         */
        _getContent: function() {
            return this._$ui.element.attr("data-op3-typography-control-panel-content");
        },

        /**
         * Set current content (this will trigger css animation).
         *
         * @param  {String}   value
         * @param  {Function} callback (optional)
         * @return {Void}
         */
        _setContent: function(value, callback) {
            if (typeof callback === "function")
                this._$ui.content
                    .filter(".op3-typography-control-panel--content-" + this._getContent())
                    .on("transitionend.op3tpctransitionend", function(e) {
                        if (e.target !== e.currentTarget || e.originalEvent.propertyName !== "visibility")
                            return;

                        $(e.currentTarget).off("transitionend.op3tpctransitionend");

                        callback.apply(this);
                    }.bind(this));

            this._$ui.element
                .attr("data-op3-typography-control-panel-content", value);
        },

        /**
         * Get loading status.
         *
         * @return {Boolean}
         */
        _getLoadingStatus: function() {
            return this._$ui.element.hasClass("op3-typography-control-panel--loading");
        },

        /**
         * Set loading status.
         *
         * @param  {Boolean} value
         * @return {Void}
         */
        _setLoadingStatus: function(value) {
            this._$ui.element[value ? "addClass" : "removeClass"]("op3-typography-control-panel--loading")
        },

        /**
         * Clear dialog message.
         *
         * @return {Void}
         */
        _clearMessage: function() {
            this._$ui.element
                .removeClass("op3-typography-control-panel--message-error")
                .removeClass("op3-typography-control-panel--message");
            this._$ui.message
                .removeAttr("data-op3-typography-control-panel-message");
        },

        /**
         * Set dialog success message.
         *
         * @param  {String}
         * @return {Void}
         */
        _setSuccessMessage: function(value) {
            if (this.isLoading)
                return;

            this._$ui.message
                .attr("data-op3-typography-control-panel-message", value)
            this._$ui.element
                .removeClass("op3-typography-control-panel--message-error")
                .addClass("op3-typography-control-panel--message");
        },

        /**
         * Set dialog error message.
         *
         * @param  {String}
         * @return {Void}
         */
        _setErrorMessage: function(value) {
            if (this.isLoading)
                return;

            this._$ui.message
                .attr("data-op3-typography-control-panel-message", value)
            this._$ui.element
                .addClass("op3-typography-control-panel--message")
                .addClass("op3-typography-control-panel--message-error");
        },

        /**
         * Has error on any of input elements.
         *
         * @return {Boolean}
         */
        _hasInputErrors: function() {
            return !!this._$ui.input.filter(".op3-typography-control-panel--input-error:visible").length;
        },

        /**
         * Flag on error input element.
         *
         * @param  {Node} element
         * @return {Void}
         */
        _flagInputError: function(element) {
            var $element = $(element)
                .addClass("op3-typography-control-panel--input-error");

            if ($element.is(".select2-hidden-accessible"))
                $element = $element
                    .next(".select2-container")
                    .find(".select2-selection");

            $element.focus();
        },

        /**
         * Unflag on error input element.
         *
         * @param  {Node} element (optional)
         * @return {Void}
         */
        _unflagInputError: function(element) {
            var $element = $(element);
            if (!$element.length)
                $element = this._$ui.input;

            $element.removeClass("op3-typography-control-panel--input-error");
        },

        /**
         * Request wrapper (send API request).
         *
         * @param  {String}   url
         * @param  {String}   method
         * @param  {Object}   data    (optional)
         * @param  {Function} success (optional)
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _request: function(url, method, data, success, error) {
            OP3.Ajax.request({
                url: url,
                method: method,
                data: data ? JSON.stringify(data) : null,
                success: (function(response, textStatus, jqXHR) {
                    if (typeof success === "function")
                        success.apply(this, [ response, textStatus, jqXHR ]);
                }).bind(this),
                error: (function(jqXHR, textStatus, errorThrown) {
                    if (typeof error === "function")
                        error.apply(this, [ jqXHR, textStatus, errorThrown ]);
                }).bind(this),
            });
        },

        /**
         * Request list:
         * get list of all typography presets.
         *
         * @param  {Function} success (optional)
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _requestList: function(success, error) {
            this._request("typography-presets", "get", null, success, error);
        },

        /**
         * Request detail:
         * get detail of specific typography preset.
         *
         * @param  {Number}   id
         * @param  {Function} success (optional)
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _requestDetail: function(id, success, error) {
            this._request("typography-presets/" + id, "get", null, success, error);
        },

        /**
         * Request create:
         * create new typography preset.
         *
         * @param  {String}   title
         * @param  {Object}   data
         * @param  {Function} success (optional)
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _requestCreate: function(title, data, success, error) {
            this._request("typography-presets", "post", { title: title, data: data }, success, error);
        },

        /**
         * Request update:
         * update specific typography preset.
         *
         * @param  {Number}   id
         * @param  {String}   title
         * @param  {Object}   data
         * @param  {Function} success (optional)
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _requestUpdate: function(id, title, data, success, error) {
            this._request("typography-presets/" + id, "post", { title: title, data: data }, success, error);
        },

        /**
         * Request delete:
         * delete specific typography preset.
         *
         * Some hostings do not allow non GET/POST methods, so we're
         * deliberately using POST instead of DELETE method here.
         *
         * @param  {Number}   id
         * @param  {Function} success (optional)
         * @param  {Function} error   (optional)
         * @return {Void}
         */
        _requestDelete: function(id, success, error) {
            this._request("typography-presets/" + id + "/delete", "post", null, success, error);
        },

        /**
         * Content scroll event handler:
         * reposition toolbar.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleContentScroll: function(e) {
            var toolbar = parent.OP3.Toolbar;
            if (this._intervalContentScroll)
                clearInterval(this._intervalContentScroll);

            this._intervalContentScroll = setTimeout(function() {
                delete this._intervalContentScroll;

                toolbar.reposition();
            }.bind(this), 100);
        },

        /**
         * Input change event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleInputChange: function(e) {
            this._unflagInputError();
        },

        _handleActionChange: function(e) {
            this._$ui.element.attr("data-op3-typography-control-panel-action", $(e.target).val());
        },

        /**
         * Close click event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleCloseClick: function(e) {
            e.preventDefault();

            this.close();
        },

        /**
         * Apply click event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleApplyClick: function(e) {
            e.preventDefault();

            var $action = this._$ui.input.filter('[name="action"]'),
                action = $action.val(),
                $list = this._$ui.input.filter('[name="list"]'),
                list = $list.val(),
                $name = this._$ui.input.filter('[name="name"]'),
                name = $name.val();

            // Validate.
            if (action === "create" && !name.trim())
                this._flagInputError($name);
            else if (!list)
                this._flagInputError($list);
            if (this._hasInputErrors())
                return;

            // Show loading gif.
            this._setLoadingStatus(true);
            this._clearMessage();
            this._unflagInputError();

            // Define API request.
            var method = "_request" + action.charAt(0).toUpperCase() + action.slice(1),
                args = [];
            if (method === "_requestCreate")
                args = [ name, this.getPreset() ];
            else if (method === "_requestUpdate")
                args = [ list, null, this.getPreset() ];
            else if (method === "_requestDelete")
                args = [ list ];
            else if (method === "_requestDetail")
                args = [ list ];

            // API request success callback.
            args.push(function(response) {
                var message = response.message;
                if (!message && method === "_requestDetail") {
                    this.applyPreset(response.data.data);

                    message = "Preset successfully applied.";
                }
                if (!message)
                    message = "Request successfully sent.";

                this._setLoadingStatus(false);
                this._setSuccessMessage(message);
            }.bind(this));

            // API request error callback.
            args.push(function(response) {
                var message = response.message;
                if (!message)
                    message = "Request successfully sent.";

                this._setLoadingStatus(false);
                this._setErrorMessage(message);
            }.bind(this));

            // Send API request.
            this[method].apply(this, args);
        },

        /**
         * Set content to elements.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleContentElementsClick: function(e) {
            e.preventDefault();

            // Hide live-editor sidebar.
            OP3.LiveEditor.sidebarHide();

            // Set the content.
            this._setLoadingStatus(false);
            this._setContent("elements", function() {
                this._clearMessage();
                this._unflagInputError();
            }.bind(this));
        },

        /**
         * Set content to presets.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleContentPresetsClick: function(e) {
            e.preventDefault();

            // Request callbacks.
            var success = function(response) {
                    var $list = this._$ui.input
                        .filter('[name="list"]')
                        .empty();
                    response.data.forEach(function(preset) {
                        $("<option></option>")
                            .attr("value", preset.id)
                            .text(preset.title)
                            .appendTo($list);
                    });

                    // Reset presets form.
                    this._$ui.input
                        .filter('[name="action"]')
                        .val("create")
                        .trigger("change");
                    this._$ui.input
                        .filter('[name="list"]')
                        .val(response.data.length ? response.data[0].id : null)
                        .trigger("change");
                    this._$ui.input
                        .filter('[name="name"]')
                        .val("")
                        .trigger("change");

                    // Hide loading gif.
                    this._setLoadingStatus(false);
                }.bind(this),
                error = function(response) {
                    this._setErrorMessage(response.message || "Unknown error occurred.")
                }.bind(this);

            // Hide live-editor sidebar.
            OP3.LiveEditor.sidebarHide();

            // Set the content.
            this._setLoadingStatus(true);
            this._setContent("presets", function() {
                this._clearMessage();
                this._unflagInputError();

                // Get all presets from API.
                this._requestList(success, error);
            }.bind(this));
        },

        /**
         * Element elementunfocus event handler.
         *
         * Do not allow focus to get out of tcp element. Check
         * active element on next tick and make sure that only
         * allowed element has focus (element that type starts
         * with tcp_). Close modal if focus is not on tcp
         * element...
         *
         * @param  {Event}  e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementUnfocus: function(e, o) {
            var pattern = /^tcp_/;
            if (!pattern.test(o.type))
                return;

            setTimeout(function() {
                if (!pattern.test(OP3.Designer.activeElement().type()))
                    this.close();
            }.bind(this));
        },

        /**
         * Element tcp_modal elementfocus event handler:
         * show live-editor sidebar.
         *
         * @param  {Event}  e
         * @param  {Object} o
         * @return {Void}
         */
        _handleModalFocus: function(e, o) {
            if (!/^tcp_/.test(o.type))
                return;

            setTimeout(OP3.LiveEditor.sidebarShow);
        },

        /**
         * OP3 devicechange event handler:
         * refresh modal stylesheet.
         *
         * @param  {Event}  e
         * @param  {Object} o
         * @return {Void}
         */
        _handleDeviceChange: function(e, o) {
            this._refresh();
        },

        /**
         * OP3 elementchange event handler:
         * refresh modal stylesheet.
         *
         * @param  {Event}  e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChange: function(e, o) {
            var match = o.id.match(/tcp_(.+?)_(.+)/),
                tag = match[1],
                prop = match[2];

            if (tag === "all")
                this._refresh();
            else if (tag === "headings")
                this._refreshHeadings();
            else if (tag === "texts")
                this._refreshTexts();
            else if (tag === "h1")
                this._refreshH1();
            else if (tag === "h2")
                this._refreshH2();
            else if (tag === "h3")
                this._refreshH3();
            else if (tag === "h4")
                this._refreshH4();
            else if (tag === "h5")
                this._refreshH5();
            else if (tag === "h6")
                this._refreshH6();
            else if (tag === "p")
                this._refreshP();
            else if (tag === "li")
                this._refreshLi();
            else if (tag === "blockquote")
                this._refreshBlockquote();
            else if (tag === "pre")
                this._refreshPre();
        },

        /**
         * OP3 worker framerequest event handler:
         * set progress status.
         *
         * @param  {Event}  e
         * @param  {Object} o
         * @return {Void}
         */
        _handleWorkerFrameRequest: function(e, o) {
            OP3.Loadinfo.status(o.jobsComplete / o.jobsCount);
        },

        /**
         * OP3 worker complete event handler:
         * clean worker and unbind all event handlers.
         *
         * @param  {Event}  e
         * @param  {Object} o
         * @return {Void}
         */
        _handleWorkerComplete: function(e, o) {
            OP3.unbind("workercomplete", this._boundHandleWorkerComplete);
            OP3.unbind("workerframerequest", this._boundHandleWorkerFrameRequest);

            OP3.Loadinfo.clean();
            OP3.Loadinfo.display(false);
        },
    };

    // Globalize...
    window.OP3.TypographyControlPanel = null;
    window.parent.OP3.TypographyControlPanel = null;

    // ...when ready.
    OP3.bind("ready", function() {
        var tcp = new OP3_TypographyControlPanel();

        window.OP3.TypographyControlPanel = tcp;
        window.parent.OP3.TypographyControlPanel = tcp;
    });

})(window, document);
