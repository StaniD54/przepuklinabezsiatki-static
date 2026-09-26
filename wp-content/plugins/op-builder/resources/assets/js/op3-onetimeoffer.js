/**
 * OptimizePress3 designer:
 * onetimeoffer.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-meta.js
 *     - op3-ajax.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    var OP3_OneTimeOffer_Wizard = OP3.defineClass({

        Name: "OP3.OneTimeOffer.Wizard",

        Extends: window.parent.OP3.Wizard,

        Constructor: function() {
            window.parent.OP3.Wizard.call(this, this._steps);

            this.$ui.element.addClass("op3-wizard-onetimeoffer");
            this.attach(window.parent.document.body);
        },

        Prototype: {

            /**
             * Current element getter
             *
             * @return {Object}
             */
            get element() {
                return this._element || null;
            },

            /**
             * Current element setter
             *
             * @param  {Object} value
             * @return {Void}
             */
            set element(value) {
                try {
                    value = OP3.$(value).element();
                    if (value.type() !== "onetimeoffer")
                        throw "";
                }
                catch(e) {
                    value = null;
                }

                this._element = value;
            },

            /**
             * Show wizard
             *
             * @return {Void}
             */
            show: function() {
                if (!this.element)
                    throw "OP3.Wizard.OneTimeOffer: cart element must be set before displaying wizard.";

                window.parent.OP3.Wizard.prototype.show.call(this);
            },

            /**
             * Close wizard
             *
             * @return {Void}
             */
            close: function() {
                window.parent.OP3.Wizard.prototype.close.call(this);
                this.element = null;
            },

            /**
             * Steps list for super class
             * initialization
             *
             * @type {Array}
             */
            _steps: [
                {
                    navTitle: "Product",
                    navIcon: "op3-icon-barcode-1",
                    title: "Select Product",
                    content: "",
                    buttons: [
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Accept Action",
                    navIcon: "op3-icon-simple-up",
                    title: "Accept (Yes) Action",
                    content: "",
                    buttons: [
                        {
                            label: "Go Back",
                            className: "op3-wizard-button-prev-step",
                            method: "prev",
                        },
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Decline Action",
                    navIcon: "op3-icon-simple-down",
                    title: "Decline (No) Action",
                    content: "",
                    buttons: [
                        {
                            label: "Go Back",
                            className: "op3-wizard-button-prev-step",
                            method: "prev",
                        },
                        {
                            label: "Next Step",
                            className: "op3-wizard-button-next-step",
                            method: "next",
                        },
                    ],
                },
                {
                    navTitle: "Complete",
                    navIcon: "op3-icon-check-bold-1",
                    title: "Configuration Complete",
                    content: "",
                    buttons: [
                        {
                            label: "Close",
                            className: "op3-wizard-button-complete",
                            method: "close",
                        },
                    ],
                },
            ],

            /**
             * Render each step
             *
             * @return {Void}
             */
            _renderSteps: function() {
                window.parent.OP3.Wizard.prototype._renderSteps.call(this);

                this._renderStep1();
                this._renderStep2();
                this._renderStep3();
                this._renderStep4();

                this.$ui.fields = this.$ui.steps.find("[name]");
                this.$ui.fieldSummary = this.$ui.steps.find("[data-field-summary]");
                this.$ui.valueSummary = this.$ui.steps.find("[data-value-summary]");
            },

            /**
             * Render step 1
             *
             * @return {Void}
             */
            _renderStep1: function() {
                var jq = window.parent.jQuery,
                    step = 1,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $header = $stepItem.find(".op3-wizard-steps-item-header"),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                       + '<p>' + OP3._("Select your product") + "</p>"
                       + '<input type="hidden" name="product-setup-source" value="" />'
                       + '<label class="label-group" data-field="product-id">'
                       + '<span class="field-label"">' + OP3._("Product") + '</span>'
                       + '<div class="select2-container">'
                       + '<select name="product-id"></select>'
                       + '</div>'
                       + '<div class="product-setup-source-message">'
                       + '<p data-product-setup-source-message="opb">' + OP3._("This product was set in") + " " + "<span>OptimizeBuilder</span>" + "</p>"
                       + '<p data-product-setup-source-message="opf">' + OP3._("This product was set in") + " " + "<span>OptimizeFunnel</span>" + "</p>"
                       + '<p data-product-setup-source-message="opc">' + OP3._("This product was set in") + " " + "<span>OptimizeCheckout</span>" + "</p>"
                       + '</div>'
                       + '</label>';

                jq(html)
                    .appendTo($content);

                jq("<a />")
                    .attr("href", OP3.Meta.adminUrl + "?page=op-checkouts-products")
                    .attr("target", "_blank")
                    .attr("class", "op3-wizard-cart-add-new")
                    .text(OP3._("Add New Product"))
                    .on("click", this._handleAddNewProductClick.bind(this))
                    .appendTo($header)

                $content
                    .find("select")
                    .select2({
                        width: "100%",
                        dropdownParent: $content.closest('.op3-wizard'),
                    });

                $content
                    .find('select[name="product-id"]')
                    .on("change", function(e) {
                        if ($(e.target).val() && $(e.target).val() === this.$ui.fields.filter('[name="bump-id"]').val())
                            this.$ui.fields.filter('[name="bump-id"]')
                                .val("")
                                .trigger("change");

                        $content
                            .find('select[name="bump-id"] option')
                            .prop("disabled", false)
                            .filter('[value="' + jq(e.target).val() + '"]')
                            .not('[value=""]')
                            .prop("disabled", true);
                    }.bind(this))
                    .trigger("change");
            },

            /**
             * Render step 2
             *
             * @return {Void}
             */
            _renderStep2: function() {
                 var jq = window.parent.jQuery,
                    step = 2,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<input type="hidden" name="product-name" value="" />'
                        + '<input type="hidden" name="product-description" value="" />'
                        + '<p>' + OP3._("Set the action when the upsell/downsell accept offer is clicked") + "</p>"
                        + '<select class="op3-wizard-select-image-picker" name="oto-upsell-action">'
                        + '<option value="productSuccessUrl" data-icon="op3-icon-link-69-2">' + OP3._("Product Success URL") + "</option>"
                        + '<option value="redirect" data-icon="op3-icon-link-69-2">' + OP3._("Redirect to URL") + "</option>"
                        + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="nextFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Next Funnel Page (Yes)") + "</option>" : '')
                        // + '<option value="prevFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Go to Previous Funnel Step") + "</option>"
                        + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="goToFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Specific Funnel Page") + "</option>" : '')
                        + '</select>'
                        + '<label data-field="oto-upsell-action-redirect-url" class="label-group">'
                        + '<span class="field-label">' + OP3._("URL") + "</span>"
                        + '<input type="url" name="oto-upsell-action-redirect-url" class="input-text" value="" required />'
                        + '</label>'
                        + '<label data-field="oto-upsell-action-funnel-step" class="label-group">'
                        + '<span class="field-label">' + OP3._("Select Specific Funnel Page") + "</span>"
                        + '<select name="oto-upsell-action-funnel-step" required>'
                        + '</select>'
                        + '</label>'

                jq(html)
                    .appendTo($content);
                $content
                    .find('select[name="oto-upsell-action"]')
                    .gridPicker({
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                icon = $node.attr("data-icon");

                            return ""
                                + '<a class="op3-element-options-thumb op3-wizard-onetimeoffer-thumb" href="#" title="' + label + '">'
                                + '<figure>'
                                + '<i class="op3-icon ' + icon + '"></i>'
                                + '</figure>'
                                + '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });
                $content
                    .find('select:not([name="oto-upsell-action"])')
                    .select2({
                        width: "100%",
                        dropdownParent: $content.closest(".op3-wizard"),
                    });

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            /**
             * Render step 3
             *
             * @return {Void}
             */
            _renderStep3: function() {
                var jq = window.parent.jQuery,
                   step = 3,
                   $stepItem = this.$ui.stepsItem.eq(step - 1),
                   $content = $stepItem.find(".op3-wizard-steps-item-content"),
                   html = ''
                       + '<p>' + OP3._("Set the action when the upsell/downsell decline offer is clicked (no thanks button)") + "</p>"
                       + '<select class="op3-wizard-select-image-picker" name="oto-downsell-action">'
                       + '<option value="link" data-icon="op3-icon-link-69-2">' + OP3._("Redirect to URL") + "</option>"
                       + '<option value="popoverlay" data-icon="op3-icon-select-1">' + OP3._("Show Pop Overlay") + "</option>"
                       + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="noFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Next Funnel Page (No)") + "</option>" : '')
                       + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="goToFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Specific Funnel Page") + "</option>" : '')
                       + '</select>'
                       + '<label data-field="oto-downsell-action-redirect-url" class="label-group">'
                       + '<span class="field-label">' + OP3._("URL") + "</span>"
                       + '<input type="url" name="oto-downsell-action-redirect-url" class="input-text" value="" required />'
                       + '</label>'
                       + '<label data-field="oto-downsell-action-popoverlay-trigger" class="label-group">'
                       + '<span class="field-label">' + OP3._("Pop Overlay Trigger") + "</span>"
                       + '<select name="oto-downsell-action-popoverlay-trigger" required>'
                       + '</select>'
                       + '</label>'
                       + '<label data-field="oto-downsell-action-funnel-step" class="label-group">'
                       + '<span class="field-label">' + OP3._("Select Specific Funnel Page") + "</span>"
                       + '<select name="oto-downsell-action-funnel-step" required>'
                       + '</select>'
                       + '</label>'

               jq(html)
                   .appendTo($content);
               $content
                   .find('select[name="oto-downsell-action"]')
                   .gridPicker({
                       render: function(node) {
                           var $node = jq(node),
                               label = $node.text(),
                               icon = $node.attr("data-icon");

                           return ""
                               + '<a class="op3-element-options-thumb op3-wizard-onetimeoffer-thumb" href="#" title="' + label + '">'
                               + '<figure>'
                               + '<i class="op3-icon ' + icon + '"></i>'
                               + '</figure>'
                               + '<span>' + label + '</span>'
                               + '</a>';
                       },
                   });
               $content
                   .find('select:not([name="oto-downsell-action"])')
                   .select2({
                       width: "100%",
                       dropdownParent: $content.closest(".op3-wizard"),
                   });

               this.$ui.element
                   .removeClass("op3-wizard-loading");
           },

            /**
             * Render step 3
             *
             * @return {Void}
             */
            _renderStep4: function() {
                var jq = window.parent.jQuery,
                    step = 4,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Here's your Upsell/Downsell setup") + '</p>'
                        + '<div class="op3-wizard-summary">'
                        + '<aside>'
                        + '<div class="op3-element-options-thumb op3-wizard-cart-thumb">'
                        + '<figure>'
                        + '<i class="op3-icon op3-icon-bag-time-1"></i>'
                        + '</figure>'
                        + '<span>' + OP3._("Upsell/Downsell") + '</span>'
                        + '</div>'
                        + '</aside>'
                        + '<article>'
                        + '<div class="op3-wizard-summary-desc">'
                        + '<dl data-field-summary="product-id">'
                        + '<dt>' + OP3._("Product ID:") + '</dt>'
                        + '<dd data-value-summary="product-id"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="product-name">'
                        + '<dt>' + OP3._("Product Name:") + '</dt>'
                        + '<dd data-value-summary="product-name"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="product-description">'
                        + '<dt>' + OP3._("Product Description:") + '</dt>'
                        + '<dd data-value-summary="product-description"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="oto-upsell-action">'
                        + '<dt>' + OP3._("Accept Action:") + '</dt>'
                        + '<dd data-value-summary="oto-upsell-action"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="oto-downsell-action">'
                        + '<dt>' + OP3._("Decline Action:") + '</dt>'
                        + '<dd data-value-summary="oto-downsell-action"></dd>'
                        + '</dl>'
                        + '</div>'
                        + '</article>'
                        + '</div>';

                jq(html)
                    .appendTo($content);
            },

            /**
             * Pre change event handler:
             * store some form data to data attributes
             * to enable/disable show/hide form
             * elements with css
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerChange: function(data) {
                if (data.disabled)
                    return;

                var props = [
                    "product-id",
                    "product-setup-source",
                    "oto-upsell-action",
                    "oto-upsell-action-redirect-url",
                    "oto-upsell-action-funnel-step",
                    "oto-downsell-action",
                    "oto-downsell-action-redirect-url",
                    "oto-downsell-action-funnel-step",
                    "oto-downsell-action-popoverlay-trigger",
                ];

                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-"), data.value || "");
            },

            /**
             * Pre step event handler:
             * execute _loadStep methods
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerStep: function(data) {
                if (data.stepBefore >= data.step)
                    return;

                var method = "_loadStep" + data.step;
                if (typeof this[method] === "function")
                    this[method](data);
            },

            _loadStep1: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                this._resetForm();
                that.getProducts(this._prepareStep1.bind(this));
            },

            _prepareStep1: function(data) {
                var $input, html,
                    product,
                    that = this;

                // Set selected product
                $input = this.$ui.fields.filter('[name="product-id"]').empty();
                html = [ { id: "", name: "(None)" } ]
                    .concat(data || [])
                    .map(function(item) {
                        return that._prepareProductDropdownOption(item, false);
                    });
                product = null
                    || this.$ui.steps.attr("data-product-id")
                    || this.element.getOption("productId", "all")
                    || "";
                product = this._getValidProductPricingPlanCombo(product, data);
                $input
                    .append(html)
                    .val(product || "")
                    .trigger("change");

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep2: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var product = this.$ui.steps.attr("data-product-id") || "";
                that.getProductDetail(product, this._prepareStep2.bind(this));
            },

            _prepareStep2: function(data) {
                var product = data && data[0] ? data[0] : null;

                this.$ui.fields.filter('[name="product-name"]').val(product.name);
                this.$ui.fields.filter('[name="product-description"]').val(product.description);

                var $input, value, html;
                // set post action
                $input = this.$ui.fields
                    .filter('[name="oto-upsell-action"]');
                value = null
                    || this.$ui.steps.attr("data-oto-upsell-action")
                    || this.element.getOption("cartPostAction", "all")
                    || "productSuccessUrl";
                $input
                    .val(value)
                    .trigger("change");

                // set redirect url
                $input = this.$ui.fields
                    .filter('[name="oto-upsell-action-redirect-url"]');
                value = null
                    || this.$ui.steps.attr("data-oto-upsell-action-redirect-url")
                    || this.element.getOption("cartPostActionRedirectURL", "all")
                    || "";
                $input
                    .val(value)
                    .trigger("change");

                if (OP3.Funnels && OP3.Funnels.pages) {
                    // set funnel step
                    $input = this.$ui.fields
                        .filter('[name="oto-upsell-action-funnel-step"]')
                        .empty();
                    html = [{id: "", title: "(Please select)"}]
                        .concat(OP3.Funnels.pages)
                        .map(function (item, index) {
                            return ''
                                + '<option value="' + (item.id ? item.id : '') + '">'
                                + (item.title)
                                + '</option>';
                        })
                        .join("");
                    $input
                        .append(html);
                    value = null
                        || this.$ui.steps.attr("data-oto-upsell-action-funnel-step")
                        || this.element.getOption("cartPostActionFunnelStep", "all")
                        || "";
                    if (value && !$input.find('option[value="' + value + '"]').length)
                        value = "";
                    $input
                        .val(value)
                        .trigger("change");
                }

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep3: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var product = this.$ui.steps.attr("data-product-id") || "";
                that.getProductDetail(product, this._prepareStep3.bind(this));
            },

            _prepareStep3: function(data) {

                // set downsell action
                var $input, value, html;
                var element = OP3.$(this.element).find('button[spec="downsell"]');

                // set downsell button action
                $input = this.$ui.fields
                    .filter('[name="oto-downsell-action"]');
                value = null
                    || this.$ui.steps.attr("data-oto-downsell-action")
                    || element.getOption("action", "all")
                    || "noFunnelStep";
                $input
                    .val(value)
                    .trigger("change");

                // set downsell button href
                $input = this.$ui.fields
                    .filter('[name="oto-downsell-action-redirect-url"]');
                value = null
                    || this.$ui.steps.attr("data-oto-downsell-action-redirect-url")
                    || element.getOption("href", "all")
                    || "";
                $input
                    .val(value)
                    .trigger("change");

                // set downsell button popOverlayTrigger
                $input = this.$ui.fields
                    .filter('[name="oto-downsell-action-popoverlay-trigger"]')
                    .empty();
                html = [ { uuid: "", name: "(Please select)" } ]
                    .concat(OP3.PopOverlay.toArray())
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.uuid + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                $input
                    .append(html);
                value = null
                    || this.$ui.steps.attr("data-oto-downsell-action-popoverlay-trigger")
                    || element.getOption("popOverlayTrigger", "all")
                    || "";
                if (value && !$input.find('option[value="' + value + '"]').length)
                    value = "";
                $input
                    .val(value)
                    .trigger("change");

                if (OP3.Funnels && OP3.Funnels.pages) {
                    // set funnel step
                    $input = this.$ui.fields
                        .filter('[name="oto-downsell-action-funnel-step"]')
                        .empty();
                    html = [{id: "", title: "(Please select)"}]
                        .concat(OP3.Funnels.pages)
                        .map(function (item, index) {
                            return ''
                                + '<option value="' + (item.id ? index : '') + '">'
                                + (item.title)
                                + '</option>';
                        })
                        .join("");
                    $input
                        .append(html);
                    value = null
                        || this.$ui.steps.attr("data-oto-downsell-action-funnel-step")
                        || element.getOption("selectFunnelStep", "all")
                        || "";
                    if (value && !$input.find('option[value="' + value + '"]').length)
                        value = "";
                    $input
                        .val(value)
                        .trigger("change");
                }

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep4: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                // for better user experience we gonna wait for
                // scroller element to finish transition (start
                // on step 3, not between steps 5 and 3) and
                // add little timeout before start rendering
                // form
                var callback = function() {
                    setTimeout(function() {
                        this._setForm();
                        this._prepareStep4();
                    }.bind(this), 400);
                }.bind(this);

                // wait step to finish transition
                var step = 4,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $scroller = $stepItem.closest(".op3-wizard-steps-scroller"),
                    hasTransition = !!parseFloat($scroller.css("transition-duration"));
                if (hasTransition)
                    $scroller.one("transitionend", callback);
                else
                    callback();
            },

            _prepareStep4: function(data) {
                var serialize = this.serialize();

                this.$ui.valueSummary
                    .filter('[data-value-summary="product-id"]')
                    .text(serialize["product-id"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="product-name"]')
                    .text(serialize["product-name"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="product-description"]')
                    .text(serialize["product-description"]);

                // Set post action options
                let postAction = serialize["oto-upsell-action"];
                let postActionText = OP3._('Redirect to product success URL');
                if (postAction === 'goToFunnelStep') {
                    var name = this.$ui.fields.filter('[name="oto-upsell-action-funnel-step"]').find('option[value="' + serialize["oto-upsell-action-funnel-step"] + '"]').text();
                    postActionText = OP3._('Go to specific funnel step - ') + (serialize["oto-upsell-action-funnel-step"] ? name : "None");
                } else if (postAction === 'nextFunnelStep') {
                    postActionText = OP3._('Go to next step in funnel (Yes)');
                } else if (postAction === 'redirect') {
                    postActionText = OP3._('Redirect to: ') + serialize["oto-upsell-action-redirect-url"];
                }
                this.$ui.valueSummary
                    .filter('[data-value-summary="oto-upsell-action"]')
                    .text(postActionText);

                // Set downsell action options
                let downsellAction = serialize["oto-downsell-action"];
                let downsellActionText = OP3._('Redirect to product success URL');
                if (downsellAction === 'goToFunnelStep') {
                    var name = this.$ui.fields.filter('[name="oto-downsell-action-funnel-step"]').find('option[value="' + serialize["oto-downsell-action-funnel-step"] + '"]').text();
                    downsellActionText = OP3._('Go to specific funnel step - ') + (serialize["oto-downsell-action-funnel-step"] ? name : "None");
                } else if (downsellAction === 'noFunnelStep') {
                    downsellActionText = OP3._('Go to next step in funnel (No)');
                } else if (downsellAction === 'link') {
                    downsellActionText = OP3._('Redirect to: ') + serialize["oto-downsell-action-redirect-url"];
                } else if (downsellAction === 'popoverlay') {
                    var name = this.$ui.fields.filter('[name="oto-downsell-action-popoverlay-trigger"]').find('option[value="' + serialize["oto-downsell-action-popoverlay-trigger"] + '"]').text();
                    downsellActionText = OP3._('Show Pop Overlay - ') + (serialize["oto-downsell-action-popoverlay-trigger"] ? name : "None");
                }
                this.$ui.valueSummary
                    .filter('[data-value-summary="oto-downsell-action"]')
                    .text(downsellActionText);

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _resetForm: function() {
                var element = this.element,
                    textElement = OP3.$(element).find("text").jq().find("[data-op3-contenteditable] a"),
                    data = {
                        "product-id": element.getOption("productId", "all") || "",
                        "product-setup-source": element.getOption("productSetupSource", "all") || "",
                        "product-name": "",
                        "oto-upsell-action": element.getOption("cartPostAction", "all") || "productSuccessUrl",
                        "oto-upsell-action-redirect-url": element.getOption("cartPostActionRedirectURL", "all") || "",
                        "oto-upsell-action-funnel-step": element.getOption("cartPostActionFunnelStep", "all") || "",
                        "oto-downsell-action": textElement.attr("data-op-action"),
                        "oto-downsell-action-redirect-url": textElement.attr("href"),
                        "oto-downsell-action-funnel-step": textElement.attr("data-op-funnel-step-trigger")
                    };

                // set fields to initial values
                for (var prop in data) {
                    this.$ui.fields
                        .filter('[name="' + prop + '"]')
                        .val(data[prop])
                        .trigger("change");
                }
            },

            _setForm: function() {
                var element = OP3.$(this.element),
                    data = this.serialize();

                // set form element properties
                element
                    .setOption("productId", data["product-id"], "all")
                    .setOption("productSetupSource", "opb", "all")
                    .setOption("cartPostAction", data["oto-upsell-action"] || "productSuccessUrl", "all")
                    .setOption("cartPostActionRedirectURL", data["oto-upsell-action-redirect-url"] || "", "all")
                    .setOption("cartPostActionFunnelStep", data["oto-upsell-action-funnel-step"] || "", "all")

                // Set downsell button element properties
                element
                    .find('button[spec="downsell"]')
                    .setOption("action", data["oto-downsell-action"], "all")
                    .setOption("popOverlayTrigger", data["oto-downsell-action-popoverlay-trigger"], "all")
                    .setOption("href", data["oto-downsell-action-redirect-url"], "all")
                    .setOption("selectFunnelStep", data["oto-downsell-action-funnel-step"], "all")

            },

            /**
             * Add new product click event handler
             *
             * @param  {Object} e
             * @return {Void}
             */
            _handleAddNewProductClick: function(e) {
                var node = this.$ui.element.get(0),
                    doc = node.ownerDocument,
                    jq = doc.defaultView.jQuery;

                // the link click will open new tab with products
                // to edit. we will reload our products when our
                // tab gets focus back. we need a little timeout to
                // make sure new tab is opened. not the ideal way
                // to handle products changes, but...
                setTimeout(function(wizard) {
                    if (doc.hidden)
                        jq(doc).one("visibilitychange", function(e) {
                            wizard.$ui.element
                                .addClass("op3-wizard-loading");

                            that.getProducts(wizard._prepareStep1.bind(wizard));
                        });
                }, 500, this);
            },

            /**
             * Create HTML <option> and <optgroup> markup from given product item.
             *
             * @param   {Object}  item
             * @param   {Bool}    onlyOneTimePlans
             *
             * @return  {String}
             */
            _prepareProductDropdownOption: function(item, onlyOneTimePlans = false) {
                // "None" does not have pricing plans so we cater to that as well
                if (typeof item.pricing_plans == "undefined") {
                    return ''
                        + '<option value="' + item.id + '">'
                        + (item.label || item.name || item.description)
                        + '</option>';
                }

                return ''
                    + '<optgroup label="' + (item.label || item.name || item.description) + '" data-group-product-id="' + item.id + '">'
                    + this.__prepareProductPricingPlansDropdownOptions(item, onlyOneTimePlans)
                    + '</optgroup>';
            },

            /**
             * Create HTML <option> elements with pricing plans for given product.
             *
             * @param   {Object}  item
             * @param   {Bool}    onlyOneTimePlans
             *
             * @return  {String}
             */
            __prepareProductPricingPlansDropdownOptions(item, onlyOneTimePlans) {
                if (item.pricing_plans.length === 0) {
                    return ''
                        + '<option disabled>Please create pricing plans for this product</option>';
                }

                return item.pricing_plans.map(function(plan) {
                    if (onlyOneTimePlans === true && plan.type !== 'one-time-fee') {
                        return '';
                    }

                    return ''
                        + '<option value="' + item.id + '-' + plan.id + '" data-parent-product-id="' + item.id + '" data-product-plan-id="' + plan.id + '">'
                        + (item.label || item.name || item.description) + ' - ' + plan.name + ' ' + plan.value
                        + '</option>';
                });
            },

            /**
             * Check that for given ID product and plan exist.
             *
             * This also serves as a compat layer to convert single component
             * key into multiple by selecting first (default) plan ID.
             *
             * @param   {String}  id
             * @param   {Array}  data
             *
             * @return  {String|null}
             */
            _getValidProductPricingPlanCombo: function(id, data) {
                // Check for empty ID or empty products list
                if (id === "" || (data || []).length === 0) {
                    return null;
                }

                var splitId = id.split("-"),
                    products, plans;

                if (splitId.length === 2) {
                    products = data.filter(function(item) {
                        return "" + item.id === splitId[0];
                    });

                    if (products.length === 0 || typeof products[0].pricing_plans == "undefined") {
                        return null;
                    }

                    plans = products[0].pricing_plans.filter(function(item) {
                        return "" + item.id === splitId[1];
                    });

                    if (plans.length === 0) {
                        return null;
                    }

                    return id;
                } else {
                    products = data.filter(function(item) {
                        return "" + item.id === splitId[0];
                    });

                    if (products.length === 0 || typeof products[0].pricing_plans == "undefined") {
                        return null;
                    }

                    return splitId[0] + "-" + products[0].pricing_plans[0].id;
                }
            }

        },

    });

    /**
     * window.OP3.OneTimeOffer object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Products API request
         *
         * @param  {Function} callback
         * @return {Void}
         */
        getProducts: function(callback) {
            OP3.Ajax.request({
                url: "cart/products",
                success: function(response, textStatus, jqXHR) {
                    that._callback(callback, [ response.data ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        /**
         * Product detail API request
         *
         * @param  {Number}   id
         * @param  {Function} callback
         * @return {Void}
         */
        getProductDetail: function(id, callback) {
            var url = "cart/products";
            if (id instanceof Array)
                url += "?id[]=" + id.join("&id[]=");
            else if (typeof id === "string" || typeof id === "number")
                url += "?id[]=" + id;
            else
                throw "OP3.OneTimeOffer: getProductDetail id argument must be of type number or list of numbers.";

            OP3.Ajax.request({
                url: url,
                success: function(response, textStatus, jqXHR) {
                    that._callback(callback, [ response.data ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        /**
         * OneTimeOffer wizard object
         *
         * @return {Object}
         */
        wizard: function() {
            if (!that._wizard)
                that._wizard = new OP3_OneTimeOffer_Wizard();

            return that._wizard;
        },

        /**
         * Open wizard for active element
         *
         * @return {Void}
         */
        openWizard: function() {
            var wizard = that.wizard();
            var element = OP3.Designer.activeElement();

            // Wizard cen be opened with upsell button (Onetimeoffer > Button)
            if (element.type() !== "onetimeoffer")
                element = OP3.$(element).closest("onetimeoffer").element();

            wizard.element = element;

            if (!wizard.element)
                return;

            wizard.step(0);
            wizard.step(1);
            wizard.show();
        },

        _callback: function(callback, args) {
            if (typeof callback !== "function")
                return;

            callback.apply(that, args || []);
        },

        _handleAjaxError: function(jqXHR, textStatus, errorThrown) {
            // @todo???
        },

    }

    // globalize (designer)
    window.OP3.OneTimeOffer = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.OneTimeOffer = that;
    });

    // show wizard on .op3-wizard-onetimeoffer-trigger click
    $(window.parent.document)
        .on("click", ".op3-wizard-onetimeoffer-trigger", function(e) {
            that.openWizard();
        });

})(jQuery, window, document);
