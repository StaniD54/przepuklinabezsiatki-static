/**
 * OptimizePress3 designer:
 * cart.
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

    var OP3_Cart_Wizard = OP3.defineClass({

        Name: "OP3.Cart.Wizard",

        Extends: window.parent.OP3.Wizard,

        Constructor: function() {
            window.parent.OP3.Wizard.call(this, this._steps);

            this.$ui.element.addClass("op3-wizard-cart");
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
                    if (value.type() !== "cart")
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
                    throw "OP3.Wizard.Cart: cart element must be set before displaying wizard.";

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
                    navTitle: "Checkout Form Fields",
                    navIcon: "op3-icon-edit-75-1",
                    title: "Checkout Form Fields",
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
                    navTitle: "Submit Action",
                    navIcon: "op3-icon-goal-65-1",
                    title: "Submit Action",
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
             * Form tree
             *
             * @type {Array}
             */
            _formTree: [
                {
                    type: "formsection",
                    spec: "contact",
                    title: "Contact Information",
                    options: {
                        marginLeft: "auto",
                        marginRight: "auto",
                    },
                    children: [
                        {
                            type: "input",
                            spec: "email-address",
                            options: {
                                attrType: "email",
                                name: "opc_email_address",
                                placeholder: OP3._("E-mail Address"),
                                html: "<div>" + OP3._("E-mail Address") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "1",
                                required: "1",
                                inputValidationMessage: OP3._("This field is required."),
                                iconDisplay: "block",
                                op3Icon: "op3-icon-email-83-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "email-address-confirm",
                            options: {
                                attrType: "email",
                                name: "opc_email_address_confirm",
                                placeholder: OP3._("Confirm E-mail Address"),
                                html: "<div>" + OP3._("Confirm E-mail Address") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-email-85-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "first-name",
                            options: {
                                attrType: "text",
                                name: "opc_first_name",
                                placeholder: OP3._("First Name"),
                                html: "<div>" + OP3._("First Name") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-single-01-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "last-name",
                            options: {
                                attrType: "text",
                                name: "opc_last_name",
                                placeholder: OP3._("Last Name"),
                                html: "<div>" + OP3._("Last Name") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-multiple-19-1",
                            },
                        },
                    ],
                },
                {
                    type: "formsection",
                    spec: "billing",
                    title: "Billing Address",
                    options: {
                        marginLeft: "auto",
                        marginRight: "auto",
                    },
                    children: [
                        {
                            type: "input",
                            spec: "company-name",
                            options: {
                                attrType: "text",
                                name: "opc_company_name",
                                placeholder: OP3._("Company Name"),
                                html: "<div>" + OP3._("Company Name") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-home-51-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "street-address",
                            options: {
                                attrType: "text",
                                name: "opc_street_address",
                                placeholder: OP3._("Street Address"),
                                html: "<div>" + OP3._("Street Address") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-home-minimal-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "city",
                            options: {
                                attrType: "text",
                                name: "opc_city",
                                placeholder: OP3._("City"),
                                html: "<div>" + OP3._("City") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-building-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "state-region",
                            options: {
                                attrType: "text",
                                name: "opc_state_region",
                                placeholder: OP3._("State/Region"),
                                html: "<div>" + OP3._("State/Region") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-world-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "zip",
                            options: {
                                attrType: "text",
                                name: "opc_zip",
                                placeholder: OP3._("Zip/Post Code"),
                                html: "<div>" + OP3._("Zip/Post Code") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-globe-2-1",
                            },
                        },
                        {
                            type: "select",
                            spec: "country",
                            options: {
                                name: "opc_country",
                                options: "<option>Country</option>",
                                html: "<div>" + OP3._("Country") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                            },
                        },
                        {
                            type: "input",
                            spec: "phone",
                            options: {
                                attrType: "text",
                                name: "opc_phone_number",
                                placeholder: OP3._("Phone Number"),
                                html: "<div>" + OP3._("Phone Number") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-phone-3-1",
                            },
                        },
                        {
                            type: "input",
                            spec: "company-vat",
                            options: {
                                attrType: "text",
                                name: "opc_company_vat",
                                placeholder: OP3._("VAT ID"),
                                html: "<div>" + OP3._("VAT ID") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-coins-1",
                            },
                        },
                        {
                            type: "checkbox",
                            spec: "different-country",
                            options: {
                                name: "opc_different_country_checkbox",
                                value: "1",
                                html: "<div>" + OP3._("I'm established, have my permanent address, or usually reside within {{country}}") + "</div>",
                                checked: "0",
                                visibleLock: "1",
                                requiredLock: "1",
                                required: "1",
                            },
                        },
                    ],
                },
                {
                    type: "formsection",
                    spec: "coupon",
                    title: "Coupon",
                    options: {
                        marginLeft: "auto",
                        marginRight: "auto",
                    },
                    children: [
                        {
                            type: "input",
                            spec: "coupon",
                            options: {
                                attrType: "text",
                                name: "opc_coupon_code[]",
                                placeholder: OP3._("Enter Coupon Code"),
                                html: "<div>" + OP3._("Enter Coupon Code") + "</div>",
                                labelDisplay: "none",
                                visibleLock: "1",
                                requiredLock: "0",
                                required: "0",
                                iconDisplay: "block",
                                op3Icon: "op3-icon-coupon-1",
                            },
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

                //this.$ui.desc = this.$ui.element.find(".description");
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
                       + '<p>' + OP3._("Select your product and order bump") + "</p>"
                       + '<input type="hidden" name="product-setup-source" value="" />'
                       + '<label class="label-group" data-field="product-id">'
                       + '<span class="field-label"">' + OP3._("Product") + '</span>'
                       + '<div class="select2-container">'
                       + '<select name="product-id"></select>'
                       + '</div>'
                       + '</label>'
                       + '<label class="label-group" data-field="bump-id">'
                       + '<span class="field-label">' + OP3._("Order Bump") + '</span>'
                       + '<div class="select2-container">'
                       + '<select name="bump-id"></select>'
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
                        var $selectedOption = jq(e.target).find('option:selected');

                        if (jq(e.target).val() && $selectedOption.val() === this.$ui.fields.filter('[name="bump-id"]').val()) {
                            this.$ui.fields.filter('[name="bump-id"]')
                                .val("")
                                .trigger("change");
                        }

                        $content
                            .find('select[name="bump-id"] optgroup')
                            .prop("disabled", false)
                            .filter('[data-group-product-id="' + $selectedOption.attr("data-parent-product-id") + '"]')
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
                        + '<p>' + OP3._("Choose your form fields") + "</p>"
                        //+ '<input type="hidden" name="product-id" value="" />'
                        + '<input type="hidden" name="product-name" value="" />'
                        + '<input type="hidden" name="product-description" value="" />'
                        + '<input type="hidden" name="product-thumb" value="" />'
                        + '<input type="hidden" name="net-price" value="" />'
                        + '<input type="hidden" name="discount" value="" />'
                        + '<input type="hidden" name="subtotal" value="" />'
                        + '<input type="hidden" name="tax-rate" value="" />'
                        + '<input type="hidden" name="tax-value" value="" />'
                        + '<input type="hidden" name="gross-price" value="" />'
                        //+ '<input type="hidden" name="bump-id" value="" />'
                        + '<input type="hidden" name="bump-name" value="" />'
                        + '<input type="hidden" name="bump-description" value="" />'
                        + '<input type="hidden" name="bump-thumb" value="" />'
                        + '<input type="hidden" name="bump-net-price" value="" />'
                        + '<input type="hidden" name="pricing" value="" />'
                        + '<select class="op3-wizard-select-simple-picker" name="fields" multiple>'
                        + '<option value="opc_product_id[]" selected data-required="1" data-condition="0" data-hidden="1">' + OP3._("Product ID") + '</option>'
                        + '<option value="opc_email_address" selected data-required="1" data-condition="0" data-hidden="0">' + OP3._("E-Mail Address") + '</option>'
                        + '<option value="opc_email_address_confirm" data-required="0" data-condition="0" data-hidden="0">' + OP3._("Confirm E-Mail Address") + '</option>'
                        + '<option value="opc_first_name" data-required="0" data-condition="0" data-hidden="0">' + OP3._("First Name") + '</option>'
                        + '<option value="opc_last_name" data-required="0" data-condition="0" data-hidden="0">' + OP3._("Last Name") + '</option>'
                        + '<option value="opc_company_name" data-required="0" data-condition="0" data-hidden="0">' + OP3._("Company Name") + '</option>'
                        + '<option value="opc_street_address" data-required="0" data-condition="0" data-hidden="0">' + OP3._("Street Address") + '</option>'
                        + '<option value="opc_city" data-required="0" data-condition="0" data-hidden="0">' + OP3._("City") + '</option>'
                        + '<option value="opc_state_region" data-required="0" data-condition="0" data-hidden="0">' + OP3._("State/Region") + '</option>'
                        + '<option value="opc_zip" selected data-required="1" data-condition="0" data-hidden="0">' + OP3._("Zip/Post Code") + '</option>'
                        + '<option value="opc_country" selected data-required="1" data-condition="0" data-hidden="0">' + OP3._("Country") + '</option>'
                        + '<option value="opc_phone_number" data-required="0" data-condition="0" data-hidden="0">' + OP3._("Phone Number") + '</option>'
                        + '<option value="opc_company_vat" selected data-required="1" data-condition="1" data-hidden="0">' + OP3._("VAT ID") + '</option>'
                        + '<option value="opc_different_country_checkbox" selected data-required="1" data-condition="1" data-hidden="0">' + OP3._("Different Country Checkbox") + '</option>'
                        + '<option value="opc_coupon_code[]" data-required="0" data-condition="0" data-hidden="0">' + OP3._("Coupon") + '</option>'
                        + '</select>'
                        + '<div class="op3-wizard-legend">'
                        + '<div class="op3-wizard-legend-item"><i class="op3-icon op3-icon-lock-circle-1"></i><span class="op3-wizard-legend-label">' + OP3._("Fields are required for this integration to work.") + "</span></div>"
                        + '<div class="op3-wizard-legend-item"><i class="op3-icon op3-icon-eye-18-2"></i><span class="op3-wizard-legend-label">' + OP3._("Fields will be shown only in certain conditions.") + "</span></div>"
                        + '<div class="op3-wizard-legend-item"><i class="op3-icon op3-icon-eye-ban-18-1"></i><span class="op3-wizard-legend-label">' + OP3._("Fields will not be shown.") + "</span></div>"
                        + '</div>';

                jq(html)
                    .appendTo($content);

                $content
                    .find("select")
                    .gridPicker({
                        canUnselect: function(node) {
                            return !(jq(node).attr("data-required")*1);
                        },
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                required = $node.attr("data-required"),
                                condition = $node.attr("data-condition"),
                                hidden = $node.attr("data-hidden");

                            return ""
                                + '<a href="#" title="' + label + '" data-required="' + required + '" data-condition="' + condition + '" data-hidden="' + hidden + '">'
                                +     '<i class="op3-wizard-select-simple-picker-icon op3-icon op3-icon-lock-circle-1 locked"></i>'
                                +     '<i class="op3-wizard-select-simple-picker-icon op3-icon op3-icon-eye-18-2 condition"></i>'
                                +     '<i class="op3-wizard-select-simple-picker-icon op3-icon op3-icon-eye-ban-18-1 hidden"></i>'
                                +     '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });
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
                        + '<p>' + OP3._("Set the action when form is submitted") + "</p>"
                        + '<select class="op3-wizard-select-image-picker" name="cart-post-action">'
                        + '<option value="productSuccessUrl" data-icon="op3-icon-chat-1">' + OP3._("Product Success URL") + "</option>"
                        + '<option value="redirect" data-icon="op3-icon-link-69-2">' + OP3._("Redirect to URL") + "</option>"
                        + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="nextFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Next Funnel Page") + "</option>" : '')
                        // + '<option value="prevFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Go to Previous Funnel Step") + "</option>"
                        + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="goToFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Specific Funnel Page") + "</option>" : '')
                        + '</select>'
                        + '<label data-field="cart-post-action-redirect-url" class="label-group">'
                        + '<span class="field-label">' + OP3._("URL") + "</span>"
                        + '<input type="url" name="cart-post-action-redirect-url" class="input-text" value="" required />'
                        + '</label>'
                        + '<label data-field="cart-post-action-funnel-step" class="label-group">'
                        + '<span class="field-label">' + OP3._("Select Specific Funnel Page") + "</span>"
                        + '<select name="cart-post-action-funnel-step" required>'
                        + '</select>'
                        + '</label>'

                jq(html)
                    .appendTo($content);
                $content
                    .find('select[name="cart-post-action"]')
                    .gridPicker({
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                icon = $node.attr("data-icon");

                            return ""
                                + '<a class="op3-element-options-thumb op3-wizard-cart-thumb" href="#" title="' + label + '">'
                                + '<figure>'
                                + '<i class="op3-icon ' + icon + '"></i>'
                                + '</figure>'
                                + '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });
                $content
                    .find('select:not([name="cart-post-action"])')
                    .select2({
                        width: "100%",
                        dropdownParent: $content.closest(".op3-wizard"),
                    });
            },

            /**
             * Render step 4
             *
             * @return {Void}
             */
            _renderStep4: function() {
                var jq = window.parent.jQuery,
                    step = 4,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Here's your form setup") + '</p>'
                        + '<div class="op3-wizard-summary">'
                        + '<aside>'
                        + '<div class="op3-element-options-thumb op3-wizard-cart-thumb">'
                        + '<figure>'
                        + '<img data-value-summary="product-thumb" src="" alt="" />'
                        + '</figure>'
                        + '<span>' + OP3._("Checkout Form") + '</span>'
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
                        + '<dl data-field-summary="net-price">'
                        + '<dt>' + OP3._("Net Price:") + '</dt>'
                        + '<dd data-value-summary="net-price"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="discount">'
                        + '<dt>' + OP3._("Discount:") + '</dt>'
                        + '<dd data-value-summary="discount"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="subtotal">'
                        + '<dt>' + OP3._("Subtotal:") + '</dt>'
                        + '<dd data-value-summary="subtotal"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="tax-rate">'
                        + '<dt>' + OP3._("Tax Rate:") + '</dt>'
                        + '<dd data-value-summary="tax-rate"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="tax-value">'
                        + '<dt>' + OP3._("Tax Value:") + '</dt>'
                        + '<dd data-value-summary="tax-value"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gross-price">'
                        + '<dt>' + OP3._("Gross Price:") + '</dt>'
                        + '<dd data-value-summary="gross-price"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="fields">'
                        + '<dt>' + OP3._("Fields:") + '</dt>'
                        + '<dd data-value-summary="fields">' + OP3._("My Fields") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="bump-name">'
                        + '<dt>' + OP3._("Order Bump:") + '</dt>'
                        + '<dd data-value-summary="bump-name"></dd>'
                        + '</dl>'
                        + '<dl data-field-summary="cart-post-action">'
                        + '<dt>' + OP3._("Post action:") + '</dt>'
                        + '<dd data-value-summary="cart-post-action"></dd>'
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
                    "bump-id",
                    "cart-post-action",
                    "cart-post-action-redirect-url",
                    "cart-post-action-funnel-step",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-"), data.value || "");

                props = [
                    "fields",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-") + "-count", data.value.length || 0);
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
                    product, orderBump,
                    that = this;

                // Set selected order bump
                $input = this.$ui.fields.filter('[name="bump-id"]').empty();
                html = [ { id: "", name: "(None)" } ]
                    .concat(data || [])
                    .map(function(item) {
                        return that._prepareProductDropdownOption(item, true);
                    });
                orderBump = null
                    || this.$ui.steps.attr("data-bump-id")
                    || OP3.$(this.element).find("orderbump checkbox").getOption("value", "all")
                    || "";
                orderBump = this._getValidProductPricingPlanCombo(orderBump, data);
                $input
                    .append(html)
                    .val(orderBump || "")
                    .trigger("change");

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

                var product = this.$ui.steps.attr("data-product-id") || "",
                    bump = this.$ui.steps.attr("data-bump-id") || "";
                that.getFormData(product, bump, this._prepareStep2.bind(this));
            },

            _prepareStep2: function(data) {
                var product = data.product,
                    bump = data.order_bump,
                    requiredFields = data.required_fields,
                    pricing = data.pricing,
                    element = OP3.$(this.element);

                this.$ui.fields.filter('[name="product-id"]').val(product.id);
                this.$ui.fields.filter('[name="product-name"]').val(product.name);
                this.$ui.fields.filter('[name="product-thumb"]').val(product.thumb);
                this.$ui.fields.filter('[name="product-description"]').val(product.description);
                this.$ui.fields.filter('[name="net-price"]').val(pricing.product);
                this.$ui.fields.filter('[name="discount"]').val(pricing.discount);
                this.$ui.fields.filter('[name="subtotal"]').val(pricing.subtotal);
                this.$ui.fields.filter('[name="tax-rate"]').val(pricing.tax_percentage);
                this.$ui.fields.filter('[name="tax-value"]').val(pricing.tax);
                this.$ui.fields.filter('[name="gross-price"]').val(pricing.total);
                this.$ui.fields.filter('[name="bump-id"]').val(bump ? bump.id : "");
                this.$ui.fields.filter('[name="bump-name"]').val(bump ? bump.name : "");
                this.$ui.fields.filter('[name="bump-description"]').val(bump ? bump.description : "");
                this.$ui.fields.filter('[name="bump-thumb"]').val(bump ? bump.thumb : "");
                this.$ui.fields.filter('[name="bump-net-price"]').val(bump ? pricing.order_bump : "");
                this.$ui.fields.filter('[name="pricing"]').val(JSON.stringify(pricing));

                var $select = this.$ui.fields.filter('[name="fields"]');
                $select
                    .find("option[value]")
                    .each(function() {
                        var $this = $(this),
                            name = $this.attr("value"),
                            index = requiredFields.indexOf(name),
                            selected = $this.prop("selected"),
                            required = index !== -1;

                        $this
                            .attr("data-required", required ? "1" : "0")
                            .prop("selected", selected || required);
                    });

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep3: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                // for better user experience we gonna wait for
                // scroller element to finish transition (start
                // on step 3, not between steps 5 and 3) and
                // add little timeout before start rendering
                // form
                var callback = function() {
                    setTimeout(function() {
                        this._prepareStep3();
                    }.bind(this), 400);
                }.bind(this);

                // wait step to finish transition
                var step = 3,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $scroller = $stepItem.closest(".op3-wizard-steps-scroller"),
                    hasTransition = !!parseFloat($scroller.css("transition-duration"));
                if (hasTransition)
                    $scroller.one("transitionend", callback);
                else
                    callback();
            },

            _prepareStep3: function() {
                var $input, value, html;

                $input = this.$ui.fields
                    .filter('[name="cart-post-action"]');
                value = null
                    || this.$ui.steps.attr("data-post-action")
                    || this.element.getOption("cartPostAction", "all")
                    || "productSuccessUrl";
                $input
                    .val(value)
                    .trigger("change");

                $input = this.$ui.fields
                    .filter('[name="cart-post-action-redirect-url"]');
                value = null
                    || this.$ui.steps.attr("data-cart-post-action-redirect-url")
                    || this.element.getOption("cartPostActionRedirectURL", "all")
                    || "";
                $input
                    .val(value)
                    .trigger("change");

                // Fill funnel pages
                if (OP3.Funnels && OP3.Funnels.pages) {
                    $input = this.$ui.fields
                        .filter('[name="cart-post-action-funnel-step"]')
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
                        || this.$ui.steps.attr("data-cart-post-action-funnel-step")
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
                this.$ui.valueSummary
                    .filter('[data-value-summary="product-thumb"]')
                    .attr("src", serialize["product-thumb"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="net-price"]')
                    .text(serialize["net-price"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="discount"]')
                    .text(serialize["discount"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="subtotal"]')
                    .text(serialize["subtotal"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="tax-rate"]')
                    .text(serialize["tax-rate"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="tax-value"]')
                    .text(serialize["tax-value"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gross-price"]')
                    .text(serialize["gross-price"]);
                this.$ui.valueSummary
                    .filter('[data-value-summary="bump-name"]')
                    .text(serialize["bump-name"] || OP3._("(None)"));

                var fieldList = "";
                this.$ui.fields
                    .filter('[name="fields"]')
                    .find("option:selected")
                    .each(function() {
                        fieldList += ""
                            + '<li data-required="' + $(this).attr("data-required") + '" data-condition="' + $(this).attr("data-condition") + '" data-hidden="' + $(this).attr("data-hidden") + '">'
                            +     '<span>' + $(this).text() + '</span>'
                            +     '<i class="op3-icon op3-icon-lock-circle-1 locked"></i>'
                            +     '<i class="op3-icon op3-icon-eye-18-2 condition"></i>'
                            +     '<i class="op3-icon op3-icon-eye-ban-18-1 hidden"></i>'
                            + '</li>'
                    });
                fieldList = fieldList ? "<ul>" + fieldList + "</ul>" : "";
                this.$ui.valueSummary
                    .filter('[data-value-summary="fields"]')
                    .html(fieldList);

                // Set post action options
                let postAction = serialize["cart-post-action"];
                let postActionText = OP3._('Redirect to product success URL');
                if (postAction === 'goToFunnelStep') {
                    postActionText = OP3._('Go to specific funnel step');
                } else if (postAction === 'nextFunnelStep') {
                    postActionText = OP3._('Go to next step in funnel');
                } else if (postAction === 'redirect') {
                    postActionText = OP3._('Redirect to: ') + serialize["cart-post-action-redirect-url"];
                }
                this.$ui.valueSummary
                    .filter('[data-value-summary="cart-post-action"]')
                    .text(postActionText);


                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _resetForm: function() {
                var element = this.element,
                    data = {
                        "product-id": element.getOption("productId", "all") || "",
                        "product-setup-source": element.getOption("productSetupSource", "all") || "",
                        "product-name": "",
                        "product-description": "",
                        "product-thumb": "",
                        "net-price": "",
                        "discount": "",
                        "subtotal": "",
                        "tax-rate": "",
                        "tax-value": "",
                        "gross-price": "",
                        "bump-id": OP3.$(this.element).find("orderbump checkbox").getOption("value", "all") || "",
                        "bump-name": "",
                        "bump-thumb": "",
                        "bump-net-price": "",
                        "pricing": "",
                        "cart-post-action": element.getOption("cartPostAction", "all") || "productSuccessUrl",
                        "cart-post-action-redirect-url": element.getOption("cartPostActionRedirectUrl", "all") || "",
                        "cart-post-action-funnel-step": element.getOption("cartPostActionFunnelStep", "all") || ""
                    };

                // get current element fields
                data.fields = OP3.$(element)
                    .find("input,checkbox,select,textarea")
                    .not('[spec="card-number"]')
                    .not('[spec="card-entry"]')
                    .toArray()
                        .map(function(item) {
                            return OP3.$(item).getOption("name", "all");
                        });

                // product_id is not an element (but it's required
                // field), lets prepend it to our array
                data.fields.unshift("opc_product_id[]");

                // set fields to initial values
                for (var prop in data) {
                    this.$ui.fields
                        .filter('[name="' + prop + '"]')
                        .val(data[prop])
                        .trigger("change");
                }
            },

            _setForm: function() {
                var element = this.element,
                    data = this.serialize();


                // set form element properties
                OP3.$(element)
                    .setOption("productId", data["product-id"], "all")
                    .setOption("productSetupSource", "opb", "all")
                    .setOption("cartPostAction", data["cart-post-action"] || "productSuccessUrl", "all")
                    .setOption("cartPostActionRedirectURL", data["cart-post-action-redirect-url"] || "", "all")
                    .setOption("cartPostActionFunnelStep", data["cart-post-action-funnel-step"] || "", "all")
                ;

                // rebuild form
                for (var i = 0; i < this._formTree.length; i++) {
                    var parentConfig = this._formTree[i],
                        parentSelector = parentConfig.type + '[spec="' + parentConfig.spec + '"]',
                        parentElement = OP3.$(element).find(parentSelector);

                    // iterate children
                    for (var j = 0; j < (parentConfig.children || []).length; j++) {
                        var childConfig = parentConfig.children[j],
                            childSelector = childConfig.type + '[spec="' + childConfig.spec + '"]',
                            childElement = parentElement.find(childSelector),
                            childChecked = data.fields.indexOf(childConfig.options.name) !== -1,
                            childExists = !!childElement.length;

                        // element not checked and exist, remove it
                        if (!childChecked && childExists) {
                            childElement.detach();
                        }

                        // element checked and does not exist, create it
                        else if (childChecked && !childExists) {
                            // create parent first
                            if (!parentElement.length) {
                                parentElement = OP3.$('<' + parentConfig.type + ' spec="' + parentConfig.spec + '" />');

                                var prevSelector = "";
                                for (var k = 0; k < i; k++) {
                                    prevSelector += (prevSelector ? "," : "") + this._formTree[k].type + '[spec="' + this._formTree[k].spec + '"]';
                                }

                                var prevLast = OP3.$(element).find(prevSelector).last();
                                if (prevLast.length)
                                    parentElement.insertAfter(prevLast);
                                else
                                    parentElement.prependTo(element);

                                OP3.$('<headline spec="' + parentConfig.spec + '" />')
                                    .setOption("html", "<h4>" + parentConfig.title + "</h4>", "all")
                                    .insertBefore(parentElement);
                            }

                            childElement = OP3.$('<' + childConfig.type + ' spec="' + childConfig.spec + '" />');
                            for (var option in childConfig.options) {
                                childElement.setOption(option, childConfig.options[option], "all");
                            }

                            var prevSelector = "";
                            for (var k = 0; k < j; k++) {
                                prevSelector += (prevSelector ? "," : "") + parentConfig.children[k].type + '[spec="' + parentConfig.children[k].spec + '"]';
                            }

                            var prevLast = parentElement.find(prevSelector).last();
                            if (prevLast.length)
                                childElement.insertAfter(prevLast);
                            else
                                childElement.prependTo(parentElement);
                        }

                        // nothing to do here
                        else {
                            // pass
                        }
                    }

                    // element empty, remove it
                    if (!parentElement.children().length) {
                        OP3.$(parentElement).prev("headline").detach();
                        parentElement.detach();
                    }
                }

                // required fields
                var requiredFeilds = this.$ui.fields
                    .filter('[name="fields"]')
                    .find('option[value][selected][data-required="1"]')
                    .map(function() {
                        return this.value;
                    })
                    .toArray();
                OP3.$(element)
                    .find("input,checkbox,select,textarea")
                    .each(function() {
                        var input = OP3.$(this),
                            name = input.getOption("name", "all"),
                            required = requiredFeilds.indexOf(name) !== -1;

                        if (required)
                            input
                                .setOption("required", "1", "all")
                                .setOption("requiredLock", "1", "all");
                        else
                            input
                                .setOption("requiredLock", "0", "all");
                    });

                // remove empty formsections
                // @todo

                var $orderSummarySection = OP3.$(element).find('descriptionlist[spec="summary"]');

                // order bump
                if (data["bump-id"]) {
                    var $bump = OP3.$(element).find('orderbump'),
                        bumpTitle = $bump.find("headline").getOption("html") || "<h4>" + OP3.$.htmlEntitiesEncode(data["bump-name"]) + "</h4>",
                        bumpDescription = $bump.find("text").getOption("html") || "<p>" + OP3.$.htmlEntitiesEncode(data["bump-description"]) + "</p>",
                        bumpImage = $bump.find("image").getOption("src") || data["bump-thumb"];

                    if (!$bump.length)
                        $bump = OP3.$('<_orderbump_template />')
                            .insertBefore(OP3.$(element).find('headline[spec="summary"]'));
                    $bump
                        .find("checkbox")
                        .setOption("value", data["bump-id"], "all");
                    $bump
                        .find("headline")
                        .setOption("html", bumpTitle, "all");
                    $bump
                        .find("image")
                        .setOption("src", bumpImage, "all");
                    if (data["bump-description"])
                        $bump
                            .find("text")
                            .setOption("html", bumpDescription, "all");

                    $bump = OP3.$(element).find('descriptionlistitem[spec="bump"]');
                    if (!$bump.length)
                        $bump = OP3.$('<descriptionlistitem spec="bump" />')
                            .insertAfter($orderSummarySection.find('descriptionlistitem[spec="product"]'));
                    $bump
                        .setOption("html", "<div>" + OP3.$.htmlEntitiesEncode(data["bump-name"]) + "</div>", "all")
                        .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(data["bump-net-price"]) + "</div>", "all")
                } else {
                    OP3.$(element)
                        .find('orderbump,descriptionlistitem[spec="bump"]')
                        .detach();
                }

                var pricing = JSON.parse(data.pricing);

                // Set order summary texts
                $orderSummarySection.find('descriptionlistitem[spec="product"]')
                    .setOption("html", "<div>" + OP3.$.htmlEntitiesEncode(data["product-name"]) + "</div>", "all")
                    .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.product) + "</div>", "all");
                $orderSummarySection.find('descriptionlistitem[spec="discount"]')
                    .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.discount) + "</div>", "all");
                $orderSummarySection.find('descriptionlistitem[spec="subtotal"]')
                    .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.subtotal) + "</div>", "all");
                $orderSummarySection.find('descriptionlistitem[spec="tax"]')
                    .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.tax) + "</div>", "all");
                $orderSummarySection.find('descriptionlistitem[spec="total"]')
                    .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.total) + "</div>", "all");

                // Show recurring pricing plan and product summary for plans
                // that require it
                if (pricing.pricing_plan_type === "one-time-fee") {
                    // Detach (remove) future payments headline and summary
                    OP3.$(element)
                        .find('[spec="future-payments"]')
                        .detach();
                } else {
                    var $futurePaymentSection = OP3.$(element).find('descriptionlist[spec="future-payments"]');

                    if ($futurePaymentSection.length === 0) {
                        $futurePaymentSection = OP3.$('<_descriptionlistfuturepayments_template />').insertAfter($orderSummarySection);
                    }

                    $futurePaymentSection.find('descriptionlistitem[spec="future-product"]')
                        .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.future_product) + "</div>", "all");
                    $futurePaymentSection.find('descriptionlistitem[spec="future-discount"]')
                        .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.future_discount) + "</div>", "all");
                    $futurePaymentSection.find('descriptionlistitem[spec="future-tax"]')
                        .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.future_tax) + "</div>", "all");
                    $futurePaymentSection.find('descriptionlistitem[spec="future-total"]')
                        .setOption("html2", "<div>" + OP3.$.htmlEntitiesEncode(pricing.future_total) + "</div>", "all");
                }

                // emit reset event
                OP3.transmit("cartreset", { node: element.node() });
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
     * window.OP3.Cart object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Settings API request
         *
         * @param  {Function} callback
         * @return {Void}
         */
        getSettings: function(callback) {
            OP3.Ajax.request({
                url: "cart/settings",
                success: function(response, textStatus, jqXHR) {
                    that._callback(callback, [ response.data ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

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
                throw "OP3.Cart: getProductDetail id argument must be of type number or list of numbers.";

            OP3.Ajax.request({
                url: url,
                success: function(response, textStatus, jqXHR) {
                    that._callback(callback, [ response.data ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        /**
         * Get data prepared for form
         *
         * @param  {Number}   productId
         * @param  {Number}   orderBump (optional)
         * @param  {Function} callback
         * @return {Void}
         */
        getFormData: function(productId, orderBump, callback) {
            var url = "cart/form";
            url += "?product-id=" + (productId || 0);
            if (orderBump)
                url += "&order-bump=" + (orderBump || 0);

            OP3.Ajax.request({
                url: url,
                success: function(response, textStatus, jqXHR) {
                    that._callback(callback, [ response.data ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        /**
         * Cart wizard object
         *
         * @return {Object}
         */
        wizard: function() {
            if (!that._wizard)
                that._wizard = new OP3_Cart_Wizard();

            return that._wizard;
        },

        /**
         * Open wizard for active element
         *
         * @return {Void}
         */
        openWizard: function() {
            var wizard = that.wizard();
            wizard.element = OP3.Designer.activeElement();
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
    window.OP3.Cart = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Cart = that;
    });

    // show wizard on .op3-wizard-cart-trigger click
    $(window.parent.document)
        .on("click", ".op3-wizard-cart-trigger", function(e) {
            that.openWizard();
        });

})(jQuery, window, document);
