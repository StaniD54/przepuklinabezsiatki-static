/**
 * OptimizePress3 designer:
 * integrations.
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

    var OP3_Integration = OP3.defineClass({

        Name: "OP3.Integration",

        Constructor: function(index) {
            this._index = index;
        },

        Prototype: {

            /**
             * Property exists getter
             *
             * @return {Mixed}
             */
            get exists() {
                return this._index !== -1;
            },

            /**
             * Property connected getter
             *
             * @return {Boolean}
             */
            get connected() {
                return that._data && that._data[this._index] ? that._data[this._index].connected : null;
            },

            /**
             * Property connect url getter
             *
             * @return {Boolean}
             */
            get connectURL() {
                return that._data && that._data[this._index] ? that._data[this._index].connect_url : null;
            },

            /**
             * Connect integration
             *
             * @return {Void}
             */
            connect: function() {
                that.connect(this.provider);
            },

            /**
             * Property uid getter
             *
             * @return {String}
             */
            get uid() {
                return that._data && that._data[this._index] ? that._data[this._index].uid : null;
            },

            /**
             * Property provider getter
             *
             * @return {String}
             */
            get provider() {
                return that._data && that._data[this._index] ? that._data[this._index].provider : null;
            },

            /**
             * Property title getter
             *
             * @return {String}
             */
            get title() {
                return that._data && that._data[this._index] ? that._data[this._index].title : null;
            },

            /**
             * Property list_copy getter
             *
             * @return {String}
             */
            get description() {
                return (that._data && that._data[this._index] ? that._data[this._index].list_copy : null) || null;
            },

            /**
             * Property image getter
             *
             * @return {String}
             */
            get image() {
                return that._data && that._data[this._index] ? that._data[this._index].image : null;
            },

            /**
             * Property has_tags getter
             *
             * @return {Boolean}
             */
            get hasTags() {
                return that._data && that._data[this._index] ? that._data[this._index].has_tags : null;
            },

            /**
             * Property multi_tags getter
             *
             * @return {Boolean}
             */
            get multiTags() {
                return that._data && that._data[this._index] ? that._data[this._index].multi_tags : null;
            },

            /**
             * Property new_tags getter
             *
             * @return {Boolean}
             */
            get newTags() {
                return that._data && that._data[this._index] ? that._data[this._index].new_tags : null;
            },

            /**
             * Property new_lists getter
             *
             * @return {Boolean}
             */
            get newLists() {
                return that._data && that._data[this._index] ? that._data[this._index].new_lists : null;
            },

            /**
             * Property has_lists getter
             *
             * @return {Boolean}
             */
            get hasLists() {
                return that._data && that._data[this._index] ? that._data[this._index].has_lists : null;
            },

            /**
             * Property has_forms getter
             *
             * @return {Boolean}
             */
            get hasForms() {
                return that._data && that._data[this._index] ? that._data[this._index].has_forms : null;
            },

            /**
             * Property has_webhook_url getter
             *
             * @return {Boolean}
             */
            get hasWebhookUrl() {
                return that._data && that._data[this._index] ? that._data[this._index].has_webhook_url : null;
            },

            /**
             * Property has_admin_email getter
             *
             * @return {Boolean}
             */
            get hasAdminEmail() {
                return that._data && that._data[this._index] ? that._data[this._index].has_admin_email : null;
            },

            /**
             * Property has_lead_options getter
             * (special integration options, not
             * implemented yet)
             *
             * @return {Boolean}
             */
            get hasLeadOptions() {
                return that._data && that._data[this._index] ? that._data[this._index].has_lead_options : null;
            },

            /**
             * Property has_extra_fields getter
             *
             * @return {Boolean}
             */
            get hasExtraFields() {
                return that._data && that._data[this._index] ? that._data[this._index].has_extra_fields : null;
            },

            /**
             * Property hide_extra_fields_save getter
             *
             * @return {Boolean}
             */
             get hideExtraFieldsSave() {
                return that._data && that._data[this._index] ? that._data[this._index].hide_extra_fields_save : null;
            },


            /**
             * Property has_gdpr getter
             *
             * @return {Boolean}
             */
            get hasGdpr() {
                return that._data && that._data[this._index] ? that._data[this._index].has_gdpr : null;
            },

            /**
             * Property has_gdpr getter
             *
             * @return {Boolean}
             */
            get hasGoals() {
                return that._data && that._data[this._index] ? that._data[this._index].has_goals : null;
            },

            /**
             * Property has_email_sequences getter
             *
             * @return {Boolean}
             */
            get hasEmailSequences() {
                return that._data && that._data[this._index] ? that._data[this._index].has_email_sequences : null;
            },

            /**
             * Property has_sequence_levels getter
             *
             * @return {Boolean}
             */
            get hasSequenceLevels() {
                return that._data && that._data[this._index] ? that._data[this._index].has_sequence_levels : null;
            },

            /**
             * Property has_gdpr getter
             *
             * @return {Boolean}
             */
            get hasFormId() {
                return that._data && that._data[this._index] ? that._data[this._index].has_form_id : null;
            },

            /**
             * Property has_double_optin getter
             *
             * @return {Boolean}
             */
            get hasDoubleOptin() {
                return that._data && that._data[this._index] ? that._data[this._index].has_double_optin : null;
            },

            /**
             * Property connection_requirements getter
             * (list, list_or_tag, none)
             *
             * @return {Mixed}
             */
            get connectionRequirements() {
                return that._data && that._data[this._index] ? (that._data[this._index].connection_requirements || "none") : null;
            },

            /**
             * Property gdpr_notes getter
             *
             * @return {String}
             */
            get gdprNotes() {
                var result = null;
                var valid = [ "fields" ];
                if (that._data && that._data[this._index] && that._data[this._index].gdpr_notes && valid.indexOf(that._data[this._index].gdpr_notes !== -1))
                    result = that._data[this._index].gdpr_notes;

                return result;
            },

            /**
             * Property gdpr_tag_source getter
             *
             * @return {String}
             */
            get gdprTagSource() {
                var result = null;
                var valid = [ "tags", "fields", "none", "text_input" ];
                if (that._data && that._data[this._index] && that._data[this._index].gdpr_tag_source) {
                    if (valid.indexOf(that._data[this._index].gdpr_tag_source !== -1))
                        result = that._data[this._index].gdpr_tag_source;
                    else
                        result = "none";
                }

                return result;
            },

            /**
             * Property admin_email_label getter
             *
             * @return {String}
             */
            get labelAdminEmail() {
                return (that._data && that._data[this._index] ? that._data[this._index].admin_email_label : null) || null;
            },

            /**
             * Property list_label getter
             *
             * @return {String}
             */
            get labelList() {
                return (that._data && that._data[this._index] ? that._data[this._index].list_label : null) || null;
            },

            /**
             * Property tag_label getter
             *
             * @return {String}
             */
            get labelTag() {
                return (that._data && that._data[this._index] ? that._data[this._index].tag_label : null) || null;
            },

            /**
             * Property goal_label getter
             *
             * @return {String}
             */
            get labelGoal() {
                return (that._data && that._data[this._index] ? that._data[this._index].goal_label : null) || null;
            },

            /**
             * Property form_id_label getter
             *
             * @return {String}
             */
            get labelFormId() {
                return (that._data && that._data[this._index] ? that._data[this._index].form_id_label : null) || null;
            },

            /**
             * Property webhook_url_label getter
             *
             * @return {String}
             */
            get labelWebhookUrl() {
                return (that._data && that._data[this._index] ? that._data[this._index].webhook_url_label : null) || null;
            },

            /**
             * Property double_optin_label getter
             *
             * @return {String}
             */
            get labelDoubleOptin() {
                return (that._data && that._data[this._index] ? that._data[this._index].double_optin_label : null) || null;
            },

            /**
             * Property gdpr_label getter
             *
             * @return {String}
             */
            get labelGdpr() {
                return (that._data && that._data[this._index] ? that._data[this._index].gdpr_label : null) || null;
            },

            /**
             * Get integration details
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getDetails: function(callback) {
                that.getDetails(this.provider, callback);
            },

            /**
             * Get integration details
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getDetailsNoCache: function(callback) {
                that.getDetailsNoCache(this.provider, callback);
            },

            /**
             * Get integration lists
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getLists: function(callback) {
                that.getLists(this.provider, callback);
            },

            /**
             * Get integration tags
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getTags: function(callback) {
                that.getTags(this.provider, callback);
            },

            /**
             * Get integration fields for
             * selected list and tag
             *
             * @param  {String}   list
             * @param  {String}   tag
             * @param  {Function} callback
             * @return {Void}
             */
            getFields: function(list, tag, callback) {
                that.getFields(this.provider, list, tag, callback);
            },

            /**
             * Get integration goals
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getGoals: function(callback) {
                that.getGoals(this.provider, callback);
            },

            /**
             * Get integration forms
             *
             * @param  {Function} callback
             * @return {Void}
             */
            getForms: function(list, callback) {
                that.getForms(this.provider, list, callback);
            },

            /**
             * Get email sequences
             *
             * @param  {String}   list
             * @param  {Function} callback
             * @return {Void}
             */
            getEmailSequences: function(list, callback) {
                that.getEmailSequences(this.provider, list, callback);
            },

            /**
             * Get sequence levels
             *
             * @param  {String}   list
             * @param  {String}   sequenceCode
             * @param  {Function} callback
             * @return {Void}
             */
            getSequenceLevels: function(list, sequenceCode, callback) {
                that.getSequenceLevels(this.provider, list, sequenceCode, callback);
            },

            /**
             * Get integration list detail
             *
             * @param  {String}   list
             * @param  {Function} callback
             * @return {Void}
             */
            getListDetails: function(list, callback) {
                return that.getListDetails(this.provider, list, callback);

                that.getLists(this.provider, function(data) {
                    for (var i = 0; i < (data || []).length; i++) {
                        if (list == data[i].id)
                            return that._callback(callback, [ data[i] ]);
                    }

                    return that._callback(callback, [ null ]);
                });
            },

            /**
             * Get integration tag detail
             *
             * @param  {String}   tag
             * @param  {Function} callback
             * @return {Void}
             */
            getTagDetails: function(tag, callback) {
                return that.getTagDetails(this.provider, tag, callback);

                that.getTags(this.provider, function(data) {
                    for (var i = 0; i < (data || []).length; i++) {
                        if (tag == data[i].id)
                            return that._callback(callback, [ data[i] ]);
                    }

                    return that._callback(callback, [ null ]);
                });
            },

            /**
             * Get integration field detail
             *
             * @param  {String}   list
             * @param  {String}   tag
             * @param  {String}   field
             * @param  {Function} callback
             * @return {Void}
             */
            getFieldDetails: function(list, tag, field, callback) {
                return that.getFieldDetails(this.provider, list, tag, field, callback);
            },

            /**
             * Get integration goal detail
             *
             * @param  {String}   goal
             * @param  {Function} callback
             * @return {Void}
             */
            getGoalDetails: function(goal, callback) {
                return that.getGoalDetails(this.provider, goal, callback);
            },

            /**
             * Get integration form detail
             *
             * @param  {String}   form
             * @param  {Function} callback
             * @return {Void}
             */
            getFormDetails: function(list, form, callback) {
                return that.getFormDetails(this.provider, list, form, callback);
            },

            /**
             * Get integration email sequence detail
             *
             * @param  {String}   list
             * @param  {String}   email_sequence
             * @param  {Function} callback
             * @return {Void}
             */
            getEmailSequenceDetails: function(list, email_sequence, callback) {
                return that.getEmailSequenceDetails(this.provider, list, email_sequence, callback);
            },

            /**
             * Get integration sequence level detail
             *
             * @param  {String}   list
             * @param  {String}   email_sequence
             * @param  {String}   sequence_level
             * @param  {Function} callback
             * @return {Void}
             */
            getSequenceLevelDetails: function(list, email_sequence, sequence_level, callback) {
                return that.getSequenceLevelDetails(this.provider, list, email_sequence, sequence_level, callback);
            },

        },

    });

    var OP3_Integrations_Wizard = OP3.defineClass({

        Name: "OP3.Integrations.Wizard",

        Extends: window.parent.OP3.Wizard,

        Constructor: function() {
            window.parent.OP3.Wizard.call(this, this._steps);

            this.$ui.element.addClass("op3-wizard-integration");
            this.$ui.steps.attr("data-is-funnel-page", OP3.Funnels && OP3.Funnels.pluginActive && OP3.Funnels.funnelId ? "1" : "0");
            this.attach(window.parent.document.body);
        },

        Prototype: {

            /**
             * Current form getter
             *
             * @return {Object}
             */
            get form() {
                return this._form || null;
            },

            /**
             * Current form setter
             *
             * @param  {Object} value
             * @return {Void}
             */
            set form(value) {
                try {
                    value = OP3.$(value).element();
                    if (value.type() !== "form" && value.type() !== "contactform")
                        throw "";
                }
                catch(e) {
                    value = null;
                }

                this._form = value;
            },

            /**
             * Show wizard
             *
             * @return {Void}
             */
            show: function() {
                if (!this.form)
                    throw "OP3.Wizard.Integration: form element must be set before displaying wizard.";

                window.parent.OP3.Wizard.prototype.show.call(this);
            },

            /**
             * Close wizard
             *
             * @return {Void}
             */
            close: function() {
                window.parent.OP3.Wizard.prototype.close.call(this);
                this.form = null;
            },

            /**
             * Steps list for super class
             * initialization
             *
             * @type {Array}
             */
            _steps: [
                {
                    navTitle: "Integration",
                    navIcon: "op3-icon-link-2-1",
                    title: "Select Integration",
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
                    navTitle: "Action",
                    navIcon: "op3-icon-tag-1",
                    title: "List, Tag, Form, Goal, Webhook and HTML Settings",
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
                    navTitle: "Form Fields",
                    navIcon: "op3-icon-edit-75-1",
                    title: "Form Fields",
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
                    navTitle: "Extra Fields",
                    navIcon: "op3-icon-code-editor",
                    title: "Extra Fields",
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
                    navTitle: "GDPR",
                    navIcon: "op3-icon-security-1",
                    title: "GDPR Settings",
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
                    navTitle: "Post Action",
                    navIcon: "op3-icon-goal-65-1",
                    title: "Optin Post Action",
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
                    navTitle: OP3._("Message"),
                    navIcon: "op3-icon-edit-73-1",
                    title: "Email Message Customization",
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
             * Filed aliases:
             * used for saving and restoring field
             * properties on integration change
             *
             * @type {Object}
             */
            _fieldAliases: {
                email: [ "inf_field_email" ],
                firstname: [ "first_name", "fname", "inf_field_firstname" ],
                lastname: [ "last_name", "lname", "inf_field_lastname" ],
            },

            /**
             * Default icon for each field
             *
             * @type {Object}
             */
            _fieldIcons: {
                email: "op3-icon-email-83-1",
                firstname: "op3-icon-single-01-1",
                lastname: "op3-icon-multiple-19-1",
                phone: "op3-icon-phone-call-1",
                tel: "op3-icon-phone-call-1",
                subject: "op3-icon-newsletter-1",
                text: "op3-icon-text-1",
                number: "op3-icon-pen-23-1-2",
                textarea: "op3-icon-chat-round-content-1",
            },

            /**
             * Get field name by alias
             *
             * @param  {String} fieldName
             * @return {String}
             */
            _getFieldNameByAlias: function(fieldName) {
                var result = fieldName.toString();
                for (var alias in this._fieldAliases) {
                    if (alias.toLowerCase() === result.toLowerCase()) {
                        result = alias;
                        break;
                    }

                    var aliasList = this._fieldAliases[alias]
                        .map(function(item) {
                            return item.toLowerCase();
                        });

                    if (aliasList.indexOf(result.toLowerCase()) !== -1) {
                        result = alias;
                        break;
                    }
                }

                return result;
            },

            /**
             * Get the icon based on the field type
             *
             * Tested integrations:
             *     - email
             *     - activecampaign
             *     - aweber
             *     - convertkit
             *     - demio
             *     - drip
             *     - emma
             *     - infusionsoft
             *     - mailchimp
             *     - ontraport
             *     - sendreach
             *     - sendlane
             *
             * @param  {String} fieldName
             * @return {String}
             */
            _getFieldIcon: function(fieldName) {
                fieldName = this._getFieldNameByAlias(fieldName);
                if (fieldName in this._fieldIcons)
                    return this._fieldIcons[fieldName];

                return "";
            },

            _extraFieldTemplate: ''
            +  '<div class="op3-wizard-extra-field" data-extra-field-label data-extra-field-save-as data-extra-field-type data-extra-field-custom-field data-extra-field-tags data-extra-field-number-of-custom-options>'
            +    '<div class="op3-wizard-extra-field-header">'
            +     '<div class="data">'
            +       '<span class="extra-field-label">{label}</span>'
            +       '<span class="extra-field-type">{type}</span>'
            +     '</div>'
            +     '<div class="actions">'
            +       '<i class="op3-icon op3-icon-settings-gear-63-2" data-action-type="edit"></i>'
            +       '<i class="op3-icon op3-icon-trash-simple-1" data-action-type="delete"></i>'
            +     '</div>'
            +   '</div>'
            +   '<div class="op3-wizard-extra-field-settings">'
            +     '<div class="label-group">'
            +       '<label data-field="extra_field_label">'
            +         '<span class="field-label">' + OP3._("Field Label") + '</span>'
            +         '<input class="input-text" type="text" name="extra_field_label" value="" />'
            +       '</label>'
            +       '<label data-field="extra_field_save_as">'
            +         '<span class="field-label">' + OP3._("Save As") + '</span>'
            +         '<select name="extra_field_save_as">'
            +           '<option value="">' + OP3._("None") + "</option>"
            +           '<option value="custom_field">' + OP3._("Custom Field") + "</option>"
            +           '<option value="tag">' + OP3._("Tag") + "</option>"
            +         '</select>'
            +       '</label>'
            +       '<label data-field="extra_field_custom_field">'
            +         '<span class="field-label">' + OP3._("Select Custom Field") + '</span>'
            +         '<div class="select2-container">'
            +           '<select name="extra_field_custom_field"></select>'
            +         '</div>'
            +       '</label>'
            +       '<label data-field="extra_field_merge_tag">'
            +         '<span class="field-label">' + OP3._("Merge Tag") + '</span>'
            +         '<input class="input-text" type="text" name="extra_field_merge_tag" value="" readonly />'
            +       '</label>'
            +     '</div>'
            +     '<div class="label-group">'
            +       '<label data-field="extra_field_type">'
            +         '<span class="field-label">' + OP3._("Field Type") + '</span>'
            +         '<div class="select2-container">'
            +           '<select name="extra_field_type">'
            +             '<option value="">' + OP3._("None") + "</option>"
            +             '<option value="select">' + OP3._("Dropdown") + "</option>"
            +             '<option value="checkbox">' + OP3._("Checkbox") + "</option>"

                          // Fields available when hideExtraFieldsSave is true
                          // are hidden/shown in CSS _op3-wizard-integrations.scss
            +             '<option value="radiobutton">' + OP3._("Radio") + "</option>"
            +             '<option value="input-text">' + OP3._("Text Input") + "</option>"
            +             '<option value="input-tel">' + OP3._("Phone") + "</option>"
            +             '<option value="input-number">' + OP3._("Number") + "</option>"
            +             '<option value="textarea">' + OP3._("Textarea") + "</option>"
            +             '<option value="input-hidden">' + OP3._("Hidden") + "</option>"
            +           '</select>'
            +         '</div>'
            +       '</label>'
            +       '<label data-field="extra_field_number_of_custom_options">'
            +         '<span class="field-label">' + OP3._("Number of custom options") + '</span>'
            +         '<div class="select2-container">'
            +           '<select name="extra_field_number_of_custom_options">'
            +              '<option value="">' + OP3._("None") + "</option>"
            +              '<option value="1">1</option>'
            +              '<option value="2">2</option>'
            +              '<option value="3">3</option>'
            +              '<option value="4">4</option>'
            +              '<option value="5">5</option>'
            +              '<option value="6">6</option>'
            +              '<option value="7">7</option>'
            +              '<option value="8">8</option>'
            +              '<option value="9">9</option>'
            +              '<option value="10">10</option>'
            +           '</select>'
            +         '</div>'
            +       '</label>'
            +       '<label data-field="extra_field_tags">'
            +         '<span class="field-label">' + OP3._("Select Tags") + '</span>'
            +         '<select name="extra_field_tags" multiple="multiple"></select>'
            +       '</label>'
            +     '</div>'
            +     '<div class="label-group option-titles"></div>'
            +     '<div class="label-group tag-labels"></div>'
            +     '<div class="label-group">'
            +       '<button type="button" class="op3-wizard-button" data-action-type="save">'
            +         OP3._("Save Field")
            +       "</button>"
            +     '</div>'
            +   '</div>'
            + '</div>',

            /**
             * Load form field element data
             * previously set (before the
             * integratoin was changed)
             *
             * @param  {Node} node
             * @return {Void}
             */
            _loadFieldData: function(node) {
                var $form = OP3.$(this._form).jq();
                var data = $form.data("op3-field-data");
                if (!data)
                    return;

                var element = OP3.$(node).element();
                var name = this._getFieldNameByAlias(element.getOption("name", "all"));
                var visibleLock = !!(element.getOption("visibleLock", "all")*1);
                data = data[name];

                for (var media in data) {
                    for (var prop in data[media]) {
                        if (visibleLock && prop === "visible")
                            continue;

                        element.setOption(prop, data[media][prop], media);
                    }
                }
            },

            /**
             * Store form field element data so we
             * can reapply it again on another
             * integration
             *
             * @param  {Node} node
             * @return {Void}
             */
            _saveFieldData: function(node) {
                var $form = OP3.$(this._form).jq();
                var data = $form.data("op3-field-data");
                if (!data) {
                    data = {};
                    $form.data("op3-field-data", data);
                }

                var element = OP3.$(node).element();
                var name = this._getFieldNameByAlias(element.getOption("name", "all"));
                var props = [ "visible", "html", "placeholder", "op3Icon", "iconDisplay", "value", "urlMapping", "inputValidationMessage" ];

                data[name] = {};
                OP3.LiveEditor.forEachDevice(function(device, media) {
                    props.forEach(function(key) {
                        var prop = element.findProperty(key);
                        if (!prop || (prop._forceComputed && media !== "all"))
                            return;

                        data[name][media] = data[name][media] || {};
                        data[name][media][key] = prop.getter(media);
                    });
                });
            },

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
                this._renderStep5();
                this._renderStep6();
                this._renderStep7();
                this._renderStep8();

                this.$ui.desc = this.$ui.element.find(".description");
                this.$ui.fields = this.$ui.steps.find("[name]");
                this.$ui.fieldSummary = this.$ui.steps.find("[data-field-summary]");
                this.$ui.valueSummary = this.$ui.steps.find("[data-value-summary]");

                this.$ui.fields
                    .filter('[name="list"]')
                    .on("change", this._handleListChange.bind(this));
                this.$ui.fields
                    .filter('[name="email_sequence"]')
                    .on("change", this._handleEmailSequenceChange.bind(this));
                this.$ui.fields
                    .filter('[name="html"]')
                    .on("change", this._handleHtmlTextareaChange.bind(this));
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
                        + '<p class="op3-warning op3-google-recaptcha-warning">' + OP3._("We recommend ") + '<a href="/wp-admin/admin.php?page=op-dashboard-settings&op-settings-group=recaptcha" target="_blank">' + OP3._("connecting") + '</a>' + OP3._(" your site to Google Recaptcha to reduce spam opt-ins on your forms. Follow the steps ") +  '<a href="https://docs.optimizepress.com/article/2039-google-recaptcha-integration" target="_blank">' + OP3._("here") + '</a>.</p>'
                        + '<p>' + OP3._("Select autoresponder or email service provider you want to send your form data to") + "</p>"
                        + '<select class="op3-wizard-select-image-picker" name="integration"></select>';

                jq(html)
                    .appendTo($content);
                $content
                    .find('[name="integration"]')
                    .gridPicker({
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                thumb = $node.attr("data-thumb");

                            return ""
                                + '<a class="op3-element-options-thumb op3-wizard-integration-thumb" href="#" title="' + label + '">'
                                + '<figure>'
                                + '<img src="' + thumb + '" alt="" />'
                                + '</figure>'
                                + '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });

                jq("<a />")
                    .attr("href", OP3.Meta.adminUrl + "?page=op-dashboard-integrations")
                    .attr("target", "_blank")
                    .attr("class", "op3-wizard-integration-add-new")
                    .text(OP3._("Add New Integration"))
                    .on("click", this._handleAddNewIntegrationClick.bind(this))
                    .appendTo($header)
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
                    $header = $stepItem.find(".op3-wizard-steps-item-header"),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),

                    html = ''
                        + '<p class="description"></p>'
                        + '<input type="hidden" name="connection_requirements" value="" />'
                        + '<input type="hidden" name="has_admin_email" value="" />'
                        + '<input type="hidden" name="has_lists" value="" />'
                        + '<input type="hidden" name="has_tags" value="" />'
                        + '<input type="hidden" name="has_forms" value="" />'
                        + '<input type="hidden" name="has_goals" value="" />'
                        + '<input type="hidden" name="has_email_sequences" value="" />'
                        + '<input type="hidden" name="has_sequence_levels" value="" />'
                        + '<input type="hidden" name="has_form_id" value="" />'
                        + '<input type="hidden" name="has_webhook_url" value="" />'
                        + '<input type="hidden" name="has_double_optin" value="" />'
                        + '<input type="hidden" name="has_gdpr" value="" />'
                        + '<input type="hidden" name="gdpr_notes" value="" />'
                        + '<input type="hidden" name="gdpr_tag_source" value="" />'
                        + '<div class="label-group">'
                        + '<label data-field="list">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using List/Form") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="list"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="tag">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="tag"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="goal">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Goal") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="goal"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="form">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Form") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="form"></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="email_sequence">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Email Sequence") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="email_sequence" disabled="disabled"><option value="" selected="selected">' + OP3._("(Please Select)") + '</option></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="sequence_level">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Sequence Levels") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="sequence_level" disabled="disabled"><option value="" selected="selected">' + OP3._("(Please Select)") + '</option></select>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="html">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Custom HTML") + '"></span>'
                        + '<textarea class="input-text" name="html" value="" placeholder="Insert your code here"></textarea>'
                        + '</label>'
                        + '<label data-field="form_id">'
                        + '<span class="field-label" data-label-default="' + OP3._("Use Form ID") + '"></span>'
                        + '<input class="input-text" type="text" name="form_id" value="" autocomplete="off" />'
                        + '</label>'
                        + '<label data-field="webhook_url">'
                        + '<span class="field-label" data-label-default="' + OP3._("Using Webhook URL") + '"></span>'
                        + '<input class="input-text" type="url" name="webhook_url" value="" autocomplete="off" />'
                        + '</label>'
                        + '<label data-field="double_optin" class="double-optin-toggle">'
                        + '<span class="field-label" data-label-default="'+ OP3._("Double Optin") + '"></span>'
                        + '<input type="hidden" name="double_optin" value="1" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="double_optin" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="admin_email">'
                        + '<span class="field-label" data-label-default="' + OP3._("Admin Email") + '"></span>'
                        + '<input class="input-text" type="email" name="admin_email" value="" />'
                        + '</label>'
                        + '<label data-field="action">'
                        + '<span class="field-label" data-label-default="' + OP3._("Optin Action") + '"></span>'
                        + '<input class="input-text" type="url" name="action" value="" />'
                        + '</label>'
                        + '</div>';

                jq(html)
                    .appendTo($content)
                    .find("select")
                    .select2({
                        placeholder: OP3._("(Please Select)"),
                        width: "100%",
                        dropdownParent: $content.closest('.op3-wizard')
                    });

                jq("<a />")
                    .attr("href", "#")
                    .attr("class", "op3-wizard-integration-refresh")
                    .text(OP3._("Refresh"))
                    .on("click", this._handleRefreshListTagsClick.bind(this))
                    .appendTo($header)
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
                        + '<p>' + OP3._("Choose your form fields") + "</p>"
                        + '<select class="op3-wizard-select-simple-picker" name="fields" multiple></select>'
                        + '<div class="op3-wizard-legend">'
                        +     '<div class="op3-wizard-legend-item"><i class="op3-icon op3-icon-lock-circle-1"></i><span class="op3-wizard-legend-label">' + OP3._("Fields are required for this integration to work.") + "</span></div>"
                        +     '<div class="op3-wizard-legend-item"><i class="op3-icon op3-icon-eye-ban-18-1"></i><span class="op3-wizard-legend-label">' + OP3._("Fields will not be shown.") + "</span></div>"
                        + '</div>';

                jq(html)
                    .appendTo($content);
                $content
                    .find('select[name="fields"]')
                    .gridPicker({
                        canUnselect: function(node) {
                            return !(jq(node).attr("data-required")*1);
                        },
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                required = $node.attr("data-required"),
                                hidden = $node.attr("data-hidden");

                            return ""
                                + '<a href="#" title="' + label + '" data-required="' + required + '" data-hidden="' + hidden + '">'
                                +     '<i class="op3-wizard-select-simple-picker-icon op3-icon op3-icon-lock-circle-1 locked"></i>'
                                +     '<i class="op3-wizard-select-simple-picker-icon op3-icon op3-icon-eye-ban-18-1 hidden"></i>'
                                +     '<span>' + label + '</span>'
                                + '</a>';
                        },
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
                    self = this,
                    html = ''
                        + '<p>' + OP3._("Add additional fields to your form for segmentation") + "</p>"
                        + '<div class="op3-wizard-extra-fields"></div>'
                        + '<p class="add-field-container">'
                        +   '<button type="button" class="op3-wizard-button op3-wizard-button-add">'
                        +     OP3._("Add Field")
                        +   "</button>"
                        + "</p>";

                jq(html)
                    .appendTo($content);


                // Save inputs/selects value as data-attributes
                $content
                    .on("change", 'input, select', function(e) {
                        var $target = $(e.target);
                        var name = $target.attr("name");

                        if (!name)
                            return;

                        name = name.replace(/_/g, "-");
                        $target
                            .closest(".op3-wizard-extra-field")
                            .attr("data-" + name, $target.val());
                    });

                // Delete extra field icon click event handler
                $content
                    .on("click", '[data-action-type="delete"]', function(e) {
                        $(e.target)
                            .closest(".op3-wizard-extra-field")
                            .remove();
                    });

                // Edit extra field icon click event handler
                $content
                    .on("click", '[data-action-type="edit"]', function(e) {
                        $(e.target)
                            .closest(".op3-wizard-extra-field")
                            .toggleClass("edit");
                    });

                // Save extra field button click event handler
                $content
                    .on("click", '[data-action-type="save"]', function(e) {
                        $(e.target)
                            .closest(".op3-wizard-extra-field")
                            .toggleClass("edit");
                    });

                // Extra field label change event handler
                $content
                    .on("change", '[name="extra_field_label"]', function(e) {
                        var $target = $(e.target);
                        $target
                            .closest(".op3-wizard-extra-field")
                            .find(".extra-field-label")
                            .text($target.val());

                        var provider = self.$ui.steps.attr("data-integration") || "";
                        var integration = that.find(provider);

                        if (integration.hideExtraFieldsSave) {
                            var value = $target
                                .val()
                                .toLowerCase()
                                .replace(/ /g, "-");

                            $target
                                .closest(".op3-wizard-extra-field")
                                .attr("data-extra-field-custom-field", value)
                                .find('[name="extra_field_custom_field"]')
                                .html('<option value="' + value + '">' + $target.val() + '</option>');

                            $target
                                .closest(".op3-wizard-extra-field")
                                .find('[name="extra_field_merge_tag"]')
                                .val('[' + value + ']');
                        }
                    });

                // Extra field number of options change event handler
                $content
                    .on("change", '[name="extra_field_number_of_custom_options"]', function(e) {
                        var $target = $(e.target),
                            value = $target.val(),
                            $optionTitlesWrapper = $target.closest(".op3-wizard-extra-field").find('.option-titles'),
                            $optionTitles = $optionTitlesWrapper.find('[data-field="extra_field_title"]');

                        var template = ''
                            +    '<label data-field="extra_field_title">'
                            +      '<span class="field-label">Label for {text}</span>'
                            +      '<input class="input-text" type="text" name="extra_field_option_title" value="{value}">'
                            +    '</label>';

                        for (var i = 0; i < value; i++) {
                            if (i < $optionTitles.length) {
                                continue;
                            } else {
                                var optionTitle = OP3.$.templating(template, {
                                    text: "Option " + (i+1),
                                    value: "Option " + (i+1)
                                });
                                $(optionTitle).appendTo($optionTitlesWrapper);
                            }
                        }
                        // Remove surplus
                        if (value)
                            $optionTitlesWrapper
                                .find('[data-field="extra_field_title"]:nth-child(' + value + ')')
                                .nextAll()
                                .remove();
                    });

                // Extra field type change event handler
                $content
                    .on("change", '[name="extra_field_type"]', function(e) {
                        var $target = $(e.target);
                        var value = $target.val();
                        var label = $target.find('[value="' + value + '"]').text();

                        $target
                            .closest(".op3-wizard-extra-field")
                            .find(".extra-field-type")
                            .text(label);
                    });

                // Tags dropdown unselect event handler
                $content
                    .on("select2:unselect", '[name="extra_field_tags"]', function(e) {
                        var $target = $(e.target);
                        var $tagLabel = $target
                            .closest(".op3-wizard-extra-field")
                            .find('.tag-labels input[data-tag-id="' + e.params.data.id + '"]');

                        if ($tagLabel.length)
                            $tagLabel
                                .parent()
                                .remove();
                    });

                // Tags dropdown select event handler
                $content
                    .on("select2:select", '[name="extra_field_tags"]', function(e, data) {
                        var $target = $(e.target);
                        var $tagLabels = $target
                            .closest(".op3-wizard-extra-field")
                            .find(".tag-labels");
                        var data = e.params && e.params.data ? e.params.data : data;
                        data.value = data.value ? data.value : data.text;

                        var template = ''
                        +    '<label data-field="extra_field_label">'
                        +      '<span class="field-label">Label for {text}</span>'
                        +      '<input class="input-text" type="text" name="extra_field_tag_label" data-tag-id="{id}" value="{value}">'
                        +    '</label>';

                        template = OP3.$.templating(template, data);

                        $(template).appendTo($tagLabels);
                    });

                // Add extra field button click event listener
                $content
                    .on("click", ".op3-wizard-button-add", function(e) {
                        var $extraFields = $content.find(".op3-wizard-extra-fields");
                        var jq = window.parent.jQuery;
                        var template = OP3.$.templating(this._extraFieldTemplate, {
                            label: "",
                            type: "dropdown",
                        });

                        var $template = jq(template)
                            .addClass("edit")
                            .appendTo($extraFields);

                        var provider = this.$ui.steps.attr("data-integration") || "";
                        var integration = that.find(provider);
                        var fields, tags;

                        integration.getTags(function(data) {
                            tags = data;
                        });

                        var list = this.$ui.steps.attr("data-list") || "";
                        var tag = this.$ui.steps.attr("data-tag") || "";
                        var serialize = this.serialize();

                        integration.getFields(list, tag, function(data) {
                            if (data === null) {
                                data = that._data[integration._index].fields;
                            }
                            fields = data;
                        });

                        // Prepare select options for extra_field_custom_field
                        var fieldOptions = [ { name: "", label: OP3._("None"), optin_id: "", id: "" } ]
                            .concat(fields)
                            .filter(function(item) {
                                // Remove field selected in step3
                                return serialize.fields.indexOf(item.id) === -1;
                            }).map(function(value) {
                                return '<option value="' + value.optin_id + '">' + value.label + '</option>';
                            }).join("");

                        // Fill extra_field_custom_field dropdown
                        $template
                            .find('[name="extra_field_custom_field"]')
                            .html(fieldOptions);

                        // Always use custom field when hideExtraFieldsSave
                        // on integration is set to trye
                        if (integration.hideExtraFieldsSave) {
                            $template
                                .find('[name="extra_field_save_as"]')
                                .val("custom_field")
                                .trigger("change");
                        }

                        // Disabel tag option in "Save As" dropdown
                        // if integration doesn't have tags
                        if (integration.gdprTagSource !== "tags" || integration.multiTags) {
                            $template
                                .find('[name="extra_field_save_as"] option[value="tag"]')
                                .prop("disabled", true);
                        } else {
                            // Prepare select options for extra_field_tags
                            var tagOptions = [ { id: "", name: OP3._("None") } ]
                                .concat(tags)
                                .filter(function(item) {
                                    return serialize.tag != item.id;
                                })
                                .map(function(value) {
                                    return '<option value="' + value.id + '">' + value.name + '</option>';
                                }).join("");

                            // Fill extra_field_tags dropdown
                            $template
                                .find('[name="extra_field_tags"]')
                                .html(tagOptions);
                        }

                        var options = {
                            width: "100%",
                            dropdownParent: $content.closest(".op3-wizard"),
                            placeholder: OP3._("(Please Select)"),
                        }

                        $template
                            .find("select")
                            .select2(options);
                    }.bind(this))
            },

            /**
             * Render step 5
             *
             * @return {Void}
             */
            _renderStep5: function() {
                var jq = window.parent.jQuery,
                    step = 5,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Form Consent Features") + "</p>"
                        + '<select name="gdpr_activate">'
                        + '<option value="off" data-icon="op3-icon-ban-2">' + OP3._("Off") + "</option>"
                        + '<option value="eu" data-icon="op3-icon-currency-euro-1">' + OP3._("Show to EU visitors only") + "</option>"
                        + '<option value="all" data-icon="op3-icon-globe-2-1">' + OP3._("Show to all visitors") + "</option>"
                        + '</select>'
                        + '<div class="label-group label-group-column">'
                        + '<div class="label-group">'
                        + '<label data-field="gdpr_consent1_visible" class="consent-toggle">'
                        + '<span class="field-label">' + OP3._("Consent 1") + "</span>"
                        + '<input type="hidden" name="gdpr_consent1_visible" value="0" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="gdpr_consent1_visible" value="1" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="gdpr_consent1_tag_confirmed">'
                        + '<span class="field-label" data-label-default="' + OP3._("Confirmed Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent1_tag_confirmed">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent1_tag_confirmed" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent1_tag_declined">'
                        + '<span class="field-label" data-label-default="' + OP3._("Declined Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent1_tag_declined">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent1_tag_declined" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent1_tag_not_shown">'
                        + '<span class="field-label" data-label-default="' + OP3._("Not Shown Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent1_tag_not_shown">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent1_tag_not_shown" value="" />'
                        + '</label>'
                        + '</div>'
                        + '<div class="label-group">'
                        + '<label data-field="gdpr_consent2_visible" class="consent-toggle">'
                        + '<span class="field-label">' + OP3._("Consent 2") + "</span>"
                        + '<input type="hidden" name="gdpr_consent2_visible" value="0" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="gdpr_consent2_visible" value="1" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="gdpr_consent2_tag_confirmed">'
                        + '<span class="field-label" data-label-default="' + OP3._("Confirmed Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent2_tag_confirmed">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent2_tag_confirmed" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent2_tag_declined">'
                        + '<span class="field-label" data-label-default="' + OP3._("Declined Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent2_tag_declined">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent2_tag_declined" value="" />'
                        + '</label>'
                        + '<label data-field="gdpr_consent2_tag_not_shown">'
                        + '<span class="field-label" data-label-default="' + OP3._("Not Shown Tag") + '"></span>'
                        + '<div class="select2-container">'
                        + '<select name="gdpr_consent2_tag_not_shown">'
                        + '</select>'
                        + '</div>'
                        + '<input class="input-text" type="text" name="gdpr_consent2_tag_not_shown" value="" />'
                        + '</label>'
                        + '</div>'
                        + '<div class="label-group">'
                        + '<label data-field="gdpr_field_note">'
                        + '<span class="field-label">' + OP3._("Field for GDPR note") + "</span>"
                        + '<div class="select2-container">'
                        + '<select name="gdpr_field_note">'
                        + '</select>'
                        + '</div>'
                        + '</label>'
                        + '</div>'
                        + '</div>';

                jq(html)
                    .appendTo($content);
                $content
                    .find('select[name="gdpr_activate"]')
                    .gridPicker({
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                icon = $node.attr("data-icon");

                            return ""
                                + '<a class="op3-element-options-thumb op3-wizard-integration-thumb" href="#" title="' + label + '">'
                                + '<figure>'
                                + '<i class="op3-icon ' + icon + '"></i>'
                                + '</figure>'
                                + '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });
                $content
                    .find('select:not([name="gdpr_activate"])')
                    .select2({
                        width: "100%",
                        dropdownParent: $content.closest(".op3-wizard"),
                    });
            },

            /**
             * Render step 6
             *
             * @return {Void}
             */
            _renderStep6: function() {
                var jq = window.parent.jQuery,
                    step = 6,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Set the action when form is submitted") + "</p>"
                        + '<select class="op3-wizard-select-image-picker" name="post_action">'
                        + '<option value="notification" data-icon="op3-icon-chat-1">' + OP3._("Notification") + "</option>"
                        + '<option value="redirect" data-icon="op3-icon-link-69-2">' + OP3._("Redirect to URL") + "</option>"
                        + '<option value="popoverlay" data-icon="op3-icon-select-1">' + OP3._("Show Pop Overlay") + "</option>"
                        + '<option value="hidePopoverlay" data-icon="op3-icon-select-1 op3-icon-rotate-270">' + OP3._("Hide Pop Overlay") + "</option>"
                        + ((OP3.Funnels && OP3.Funnels.nextPageId) ? '<option value="nextFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Next Funnel Page") + "</option>" : '')
                        // + '<option value="prevFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Go to Previous Funnel Step") + "</option>"
                        + '<option value="goToFunnelStep" data-icon="op3-icon-funnel-41-2">' + OP3._("Specific Funnel Page") + "</option>"
                        + '</select>'
                        + '<label data-field="post_action_notification_text" class="label-group">'
                        + '<span class="field-label">' + OP3._("Notification Text") + "</span>"
                        + '<input type="text" name="post_action_notification_text" class="input-text" value="' + OP3._("Thanks. You will receive email from us soon!") + '" required />'
                        + '</label>'
                        + '<label data-field="post_action_redirect_url" class="label-group">'
                        + '<span class="field-label">' + OP3._("URL") + "</span>"
                        + '<input type="url" name="post_action_redirect_url" class="input-text" value="" required />'
                        + '</label>'
                        + '<label data-field="post_action_redirect_autofill" class="label-group">'
                        + '<span class="field-label">' + OP3._("Autofill Form Fields") + "</span>"
                        + '<input type="hidden" name="post_action_redirect_autofill" value="0" />'
                        + '<div class="toggle-switch">'
                        + '<input type="checkbox" name="post_action_redirect_autofill" value="1" />'
                        + '<div class="toggle-switch-wrapper">'
                        + '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
                        + '<span class="toggle-switch-handle"></span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</label>'
                        + '<label data-field="post_action_popoverlay_trigger" class="label-group">'
                        + '<span class="field-label">' + OP3._("Pop Overlay Trigger") + "</span>"
                        + '<select name="post_action_popoverlay_trigger" required>'
                        + '</select>'
                        + '</label>'
                        + '<label data-field="post_action_funnel_step" class="label-group">'
                        + '<span class="field-label">' + OP3._("Select Specific Funnel Page") + "</span>"
                        + '<select name="post_action_funnel_step" required>'
                        + '</select>'
                        + '</label>'

                jq(html)
                    .appendTo($content);
                $content
                    .find('select[name="post_action"]')
                    .gridPicker({
                        render: function(node) {
                            var $node = jq(node),
                                label = $node.text(),
                                icon = $node.attr("data-icon");

                            return ""
                                + '<a class="op3-element-options-thumb op3-wizard-integration-thumb" href="#" title="' + label + '">'
                                + '<figure>'
                                + '<i class="op3-icon ' + icon + '"></i>'
                                + '</figure>'
                                + '<span>' + label + '</span>'
                                + '</a>';
                        },
                    });
                $content
                    .find('select:not([name="post_action"])')
                    .select2({
                        width: "100%",
                        dropdownParent: $content.closest(".op3-wizard"),
                    });
            },

            /**
             * Render step 7
             *
             * @return {Void}
             */
             _renderStep7: function() {
                var jq = window.parent.jQuery,
                    step = 7,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    self = this,
                    html = ''
                        // + '<p>' + OP3._("Email Messages Customization") + "</p>"
                        + '<div class="op3-wizard-extra-fields">'
                        +   '<div class="op3-wizard-extra-field op3-wizard-extra-field-message" data-extra-field-label data-extra-field-save-as data-extra-field-type data-extra-field-custom-field data-extra-field-tags data-extra-field-number-of-custom-options>'
                        +   '<div class="op3-wizard-extra-field-header">'
                        +     '<div class="data">'
                        +       '<span class="extra-field-label">' + OP3._("Primary Email") + '</span>'
                        // +       '<span class="extra-field-type">{type}</span>'
                        +     '</div>'
                        +     '<div class="actions">'
                        +       '<i class="op3-icon op3-icon-settings-gear-63-2" data-action-type="edit"></i>'
                        // +       '<i class="op3-icon op3-icon-trash-simple-1" data-action-type="delete"></i>'
                        +     '</div>'
                        +   '</div>'
                        +   '<div class="op3-wizard-extra-field-settings">'
                        +     '<p>' + OP3._("Primary Email") + '</p>'
                        +     '<div class="label-group-row">'
                        +       '<div class="label-group-column">'
                        +         '<div class="label-group">'
                        +           '<label data-field="extra_field_label">'
                        +             '<span class="field-label">' + OP3._("From Name") + '</span>'
                        +             '<input class="input-text" type="text" name="message_from_name" value="[first_name] [last_name]" />'
                        +           '</label>'
                        +           '<label data-field="extra_field_label">'
                        +             '<span class="field-label">' + OP3._("From Email") + '</span>'
                        +             '<input class="input-text" type="email" name="message_from_email" value="[email]" />'
                        +           '</label>'
                        +           '<label data-field="extra_field_label" class="fullwidth">'
                        +             '<span class="field-label">' + OP3._("Subject") + '</span>'
                        +             '<input class="input-text" type="text" name="message_subject" value="Contact from OptimizePress" />'
                        +           '</label>'
                        +           '<label data-field="extra_field_label" class="fullwidth">'
                        +             '<span class="field-label">' + OP3._("Message Text") + '</span>'
                        +             '<textarea class="input-textarea" rows="10" type="text" name="message_text">'
                        +               'A contact form was submitted with the following fields: \n\n[all_form_fields]'
                        +             '</textarea>'
                        +           '</label>'
                        +         '</div>'
                        +         '<div class="label-group">'
                        +           '<button type="button" class="op3-wizard-button" data-action-type="save">'
                        +             OP3._("Close Field")
                        +           "</button>"
                        +         '</div>'
                        +       '</div>'
                        +       '<div class="label-group label-group-block">'
                        +         '<span class="field-label">' + OP3._("Available Merge Tags") + '</span>'
                        +         '<label data-field="extra_field_label" class="fullwidth" data-field-content="merge_tags">'
                        +           '<input class="input-text" type="text" name="extra_field_label" readonly value="[all_form_fields]" />'
                        +           '<input class="input-text" type="text" name="extra_field_label" readonly value="[first_name]" />'
                        +         '</label>'
                        +       '</div>'
                        +     '</div>'
                        +   '</div>'
                        +   '</div>'

                        +   '<div class="op3-wizard-extra-field op3-wizard-extra-field-message" data-extra-field-label data-extra-field-save-as data-extra-field-type data-extra-field-custom-field data-extra-field-tags data-extra-field-number-of-custom-options>'
                        +   '<div class="op3-wizard-extra-field-header">'
                        +     '<div class="data">'
                        +       '<span class="extra-field-label">' + OP3._("Confirmation Email") + '</span>'
                        +       '<span class="extra-field-type extra-field-confirmation-email-status">{status}</span>'
                        +     '</div>'
                        +     '<div class="actions">'
                        +       '<i class="op3-icon op3-icon-settings-gear-63-2" data-action-type="edit"></i>'
                        // +       '<i class="op3-icon op3-icon-trash-simple-1" data-action-type="delete"></i>'
                        +     '</div>'
                        +   '</div>'
                        +   '<div class="op3-wizard-extra-field-settings">'
                        +     '<p>' + OP3._("Confirmation Email") + '</p>'
                        +     '<div class="label-group-row">'
                        +       '<label data-field="extra_field_label">'
                        +         '<span class="field-label">' + OP3._("Send Confirmation Email") + '</span>'
                        +         '<div class="toggle-switch">'
                        +           '<input type="hidden" name="confirmation_message_send" value="0" />'
                        +           '<input type="checkbox" name="confirmation_message_send_checkbox" value="" />'
                        +           '<div class="toggle-switch-wrapper">'
                        +             '<div class="toggle-switch-content" data-toggle-switch-value-0="No" data-toggle-switch-value-1="Yes">'
                        +               '<span class="toggle-switch-handle"></span>'
                        +             '</div>'
                        +           '</div>'
                        +         '</div>'
                        +       '</label>'
                        +     '</div>'
                        +     '<div class="label-group-row">'
                        +       '<div class="label-group-column">'
                        +         '<div class="label-group">'
                        +           '<label data-field="extra_field_label">'
                        +             '<span class="field-label">' + OP3._("From Name") + '</span>'
                        +             '<input class="input-text" type="text" name="confirmation_message_from_name" value="" />'
                        +           '</label>'
                        +           '<label data-field="extra_field_label">'
                        +             '<span class="field-label">' + OP3._("From Email") + '</span>'
                        +             '<input class="input-text" type="email" name="confirmation_message_from_email" value="adminemail" />'
                        +           '</label>'
                        +           '<label data-field="extra_field_label" class="fullwidth">'
                        +             '<span class="field-label">' + OP3._("Subject") + '</span>'
                        +             '<input class="input-text" type="text" name="confirmation_message_subject" value="We have received your message" />'
                        +           '</label>'
                        +           '<label data-field="extra_field_label" class="fullwidth">'
                        +             '<span class="field-label">' + OP3._("Message Text") + '</span>'
                        +             '<textarea class="input-textarea" rows="5" type="text" name="confirmation_message_text">'
                        +               'Thank you for sending us the message. We will write back as soon as we can. \n\nWarm regards!'
                        +             '</textarea>'
                        +           '</label>'
                        +         '</div>'
                        +       '</div>'
                        +       '<div class="label-group label-group-block">'
                        +         '<span class="field-label">' + OP3._("Available Merge Tags") + '</span>'
                        +         '<label data-field="extra_field_label" class="fullwidth" data-field-content="merge_tags">'
                        +           '<input class="input-text" type="text" name="extra_field_label" readonly value="[all_form_fields]" />'
                        +           '<input class="input-text" type="text" name="extra_field_label" readonly value="[first_name]" />'
                        +         '</label>'
                        +       '</div>'
                        +     '</div>'
                        +     '<div class="label-group">'
                        +       '<button type="button" class="op3-wizard-button" data-action-type="save">'
                        +         OP3._("Close Field")
                        +       "</button>"
                        +     '</div>'
                        +   '</div>'
                        +   '</div>'
                        + '</div>';

                jq(html)
                    .appendTo($content);

                // Delete extra field icon click event handler
                $content
                    .on("click", '[data-action-type="delete"]', function(e) {
                        $(e.target)
                            .closest(".op3-wizard-extra-field")
                            .remove();
                    });

                // Edit extra field icon click event handler
                $content
                    .on("click", '[data-action-type="edit"]', function(e) {
                        $(e.target)
                            .closest(".op3-wizard-extra-field")
                            .toggleClass("edit");
                    });

                // Save extra field button click event handler
                $content
                    .on("click", '[data-action-type="save"]', function(e) {
                        var $field = $(e.target)
                            .closest(".op3-wizard-extra-field");

                        $field
                            .find(".extra-field-confirmation-email-status")
                            .text($field.attr("data-confirmation-message-send") === "1" ? OP3._("(On)") : OP3._("(Off)"));

                        $field.removeClass("edit");
                    });

                $content
                    .on("click", '[data-field-content="merge_tags"] input', function(e) {
                        var $that = $(this);
                        window.parent.parent.OP3General.copyTextToClipboard($(this).val(), $);
                        $that.parent().addClass("input-text-container-copied");
                        setTimeout(function() {
                            $that.parent().removeClass("input-text-container-copied");
                        }, 500);
                    });

                // Save inputs/selects value as data-attributes
                $content
                    .on("change", 'input, select', function(e) {
                        var $target = $(e.target);
                        var name = $target.attr("name");
                        var value = $target.val();

                        if (!name)
                            return;

                        if (name.endsWith("_checkbox")) {
                            value = $(this).prop("checked") ? "1" : "0";
                            name = name.replace(/_checkbox$/, "");
                            $target.parent().find('[name="' + name + '"]').val(value);
                        }

                        name = name.replace(/_/g, "-");
                        $target
                            .closest(".op3-wizard-extra-field")
                            .attr("data-" + name, value);
                    });
            },

            /**
             * Render step 8
             *
             * @return {Void}
             */
            _renderStep8: function() {
                var jq = window.parent.jQuery,
                    step = 8,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    html = ''
                        + '<p>' + OP3._("Here's your form setup") + '</p>'
                        + '<div class="op3-wizard-summary">'
                        + '<aside>'
                        // @todo - OP3.Integration.createThumb()???
                        + '<div class="op3-element-options-thumb op3-wizard-integration-thumb">'
                        + '<figure>'
                        + '<img data-value-summary="thumb" src="" alt="" />'
                        + '</figure>'
                        + '<span data-value-summary="integration">' + OP3._("My Integration") + '</span>'
                        + '</div>'
                        + '</aside>'
                        + '<article>'
                        + '<div class="op3-wizard-summary-desc">'
                        + '<dl data-field-summary="provider">'
                        + '<dt>' + OP3._("Provider:") + '</dt>'
                        + '<dd data-value-summary="provider">' + OP3._("My Provider") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="admin_email">'
                        + '<dt>' + OP3._("Admin Email:") + '</dt>'
                        + '<dd data-value-summary="admin_email">' + OP3._("My Admin Email") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="list">'
                        + '<dt>' + OP3._("Submit to form:") + '</dt>'
                        + '<dd data-value-summary="list">' + OP3._("My List") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="tag">'
                        + '<dt>' + OP3._("Tags to add:") + '</dt>'
                        + '<dd data-value-summary="tag">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="goal">'
                        + '<dt>' + OP3._("Goal") + ':</dt>'
                        + '<dd data-value-summary="goal">' + OP3._("My Goal") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="form">'
                        + '<dt>' + OP3._("Form") + ':</dt>'
                        + '<dd data-value-summary="form">' + OP3._("My Form") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="email_sequence">'
                        + '<dt>' + OP3._("Email Sequence") + ':</dt>'
                        + '<dd data-value-summary="email_sequence">' + OP3._("My Email Sequence") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="sequence_level">'
                        + '<dt>' + OP3._("Sequence Level") + ':</dt>'
                        + '<dd data-value-summary="sequence_level">' + OP3._("My Sequence Level") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="form_id">'
                        + '<dt>' + OP3._("Submit to form id:") + '</dt>'
                        + '<dd data-value-summary="form_id">' + OP3._("My Form Id") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="webhook_url">'
                        + '<dt>' + OP3._("Submit to webhook:") + '</dt>'
                        + '<dd data-value-summary="webhook_url">' + OP3._("My Webhook URL") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="double_optin">'
                        + '<dt>' + OP3._("Double Optin:") + '</dt>'
                        + '<dd data-value-summary="double_optin">' + OP3._("My Double Optin") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="fields">'
                        + '<dt>' + OP3._("Fields:") + '</dt>'
                        + '<dd data-value-summary="fields">' + OP3._("My Fields") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="extra_fields">'
                        + '<dt>' + OP3._("Extra Fields:") + '</dt>'
                        + '<dd data-value-summary="extra_fields">' + OP3._("My Extra Fields") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_activate">'
                        + '<dt>' + OP3._("Activate GDPR Features:") + '</dt>'
                        + '<dd data-value-summary="gdpr_activate">' + OP3._("My GDPR") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_visible">'
                        + '<dt>' + OP3._("Consent 1:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_visible">' + OP3._("On/Off") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_tag_confirmed">'
                        + '<dt>' + OP3._("Consent 1 Confirmed Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_tag_confirmed">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_tag_declined">'
                        + '<dt>' + OP3._("Consent 1 Declined Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_tag_declined">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent1_tag_not_shown">'
                        + '<dt>' + OP3._("Consent 1 Not Shown Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent1_tag_not_shown">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_visible">'
                        + '<dt>' + OP3._("Consent 2:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_visible">' + OP3._("On/Off") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_tag_confirmed">'
                        + '<dt>' + OP3._("Consent 2 Confirmed Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_tag_confirmed">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_tag_declined">'
                        + '<dt>' + OP3._("Consent 2 Declined Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_tag_declined">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_consent2_tag_not_shown">'
                        + '<dt>' + OP3._("Consent 2 Not Shown Tag:") + '</dt>'
                        + '<dd data-value-summary="gdpr_consent2_tag_not_shown">' + OP3._("My Tag") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="gdpr_field_note">'
                        + '<dt>' + OP3._("Field for GDPR note:") + '</dt>'
                        + '<dd data-value-summary="gdpr_field_note">' + OP3._("My Field") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action">'
                        + '<dt>' + OP3._("Optin Form Post Action:") + '</dt>'
                        + '<dd data-value-summary="post_action">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_notification_text">'
                        + '<dt>' + OP3._("Notification Text:") + '</dt>'
                        + '<dd data-value-summary="post_action_notification_text">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_redirect_url">'
                        + '<dt>' + OP3._("Redirect to URL:") + '</dt>'
                        + '<dd data-value-summary="post_action_redirect_url">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_redirect_autofill">'
                        + '<dt>' + OP3._("Autofill Form Fields:") + '</dt>'
                        + '<dd data-value-summary="post_action_redirect_autofill">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_popoverlay_trigger">'
                        + '<dt>' + OP3._("Pop Overlay Trigger:") + '</dt>'
                        + '<dd data-value-summary="post_action_popoverlay_trigger">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="post_action_funnel_step">'
                        + '<dt>' + OP3._("Specific Funnel Page:") + '</dt>'
                        + '<dd data-value-summary="post_action_funnel_step">' + OP3._("My Post Action") + '</dd>'
                        + '</dl>'
                        + '<dl data-field-summary="confirmation_email">'
                        + '<dt>' + OP3._("Confirmation Email:") + '</dt>'
                        + '<dd data-value-summary="confirmation_email">' + OP3._("On/Off") + '</dd>'
                        + '</dl>'
                        + '</div>'
                        + '</article>'
                        + '</div>';

                jq(html)
                    .appendTo($content);
            },

            /**
             * List dropdown change event handler.
             *
             * @param {Object} e
             * @return {Void}
             */
            _handleListChange: function(e) {
                var provider = this.$ui.steps.attr("data-integration") || "";

                if (!provider)
                    return false;

                var $target = $(e.target),
                    value = $target.val(),
                    integration = that.find(provider);

                if (integration.hasSequenceLevels) {
                    this._fillSequenceLevelsDropdownWithNewOptions.call(this, value, integration);
                } else if (integration.hasForms) {
                    this._fillFormsDropdownWithNewOptions.call(this, value, integration);
                }
            },

            /**
             * Generate or remove options and append it in sequenceLevels dropdown.
             *
             * @param {String} value
             * @param {Object} integration
             * @return {Void}
             */
            _fillSequenceLevelsDropdownWithNewOptions: function(value, integration) {
                // Remove options
                if (!value) {
                    this.$ui.steps
                        .find('[name="email_sequence"], [name="sequence_level"]')
                        .prop("disabled", true)
                        .find('option:not([value=""])')
                        .remove();

                    return;
                }

                var $input = this.$ui.steps.find('[name="email_sequence"]');

                // Generate options
                integration.getEmailSequences(value, function(data) {
                    var html = data
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.SequenceCode + '">'
                                +   (item.label || item.SequenceName)
                                + '</option>';
                        })
                        .join("");

                    var element = that.wizard().form;
                    var changed = integration.provider !== element.getOption("optinIntegration", "all");
                    value = changed ? "" : element.getOption("optinEmailSequence", "all");

                    $input
                        .empty()
                        .append(html)
                        .val(value)
                        .trigger("change");

                    $input.prop("disabled", false);
                });
            },

            /**
             * Generate options and append it in forms dropdown.
             *
             * @param {String} value
             * @param {Object} integration
             * @return {Void}
             */
            _fillFormsDropdownWithNewOptions: function(value, integration) {
                if (!value)
                    return;

                var $input = this.$ui.steps.find('[name="form"]');

                // Generate options
                integration.getForms(value, function(data) {
                    var html = data
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.id + '">'
                                +   (item.label || item.name)
                                + '</option>';
                        })
                        .join("");

                    var element = that.wizard().form;
                    var changed = integration.provider !== element.getOption("optinIntegration", "all");
                    var defaultList = data.find(function(item) {
                        return item.default === "1";
                    });
                    var formId = defaultList ? defaultList.id : "";
                    value = changed ? formId : element.getOption("optinForm", "all");

                    $input
                        .empty()
                        .append(html)
                        .val(value)
                        .trigger("change");
                });
            },

            /**
             * Email Sequence dropdown change event handler.
             * Update sequence level dropdown with new options.
             *
             * @param {Object} e
             * @return {Void}
             */
            _handleEmailSequenceChange: function(e) {
                var provider = this.$ui.steps.attr("data-integration") || "";
                if (provider !== "leadlovers") {
                    return;
                }

                var $target = $(e.target);
                var value = $target.val();
                if (value) {
                    var $input = this.$ui.steps.find('[name="sequence_level"]');
                    var list = this.$ui.steps.find('[name="list"]');
                    var integration = that.find(provider);

                    integration.getSequenceLevels(list.val(), value, function(data) {
                        var html = data
                            .map(function(item) {
                                return ''
                                    + '<option value="' + item.Sequence + '">'
                                    +   (item.label || item.Subject)
                                    + '</option>';
                            })
                            .join("");

                        var element = that.wizard().form;
                        var changed = provider !== element.getOption("optinIntegration", "all");
                        value = changed ? "" : element.getOption("optinSequenceLevel", "all");

                        $input
                            .empty()
                            .append(html)
                            .val(value)
                            .trigger("change");

                        $input.prop("disabled", false);
                    });
                }
                else if (!value) {
                    this.$ui.steps
                        .find('[name="sequence_level"]')
                        .prop("disabled", true)
                        .find('option:not([value=""])')
                        .remove();
                }
            },

            /**
             * Html textarea change event handler.
             *
             * @param {Event} e
             * @return {Void}
             */
            _handleHtmlTextareaChange: function(e) {
                var $target = $(e.target);
                var value = $target.val();
                var isValid = this._validateHtmlTextareaCode(value);

                this.$ui.steps.attr("data-html-invalid", isValid ? "0" : "1");
            },

            /**
             * Custom validator html code that user can paste for html integration.
             * Code is valid if it have form and input html tags
             *
             * @param {String} code
             * @return {Boolean}
             */
            _validateHtmlTextareaCode: function(code) {
                try {
                    code = $.parseHTML('<div>' + code + '</div>');
                } catch (error) {
                    return false;
                }

                var $code = $(code);
                var $form = $code.find("form");
                var $inputs = $form.find("input, select");
                var action = $form.attr("action");

                if ($form.length && OP3.$.isValidHttpUrl(action) && $inputs.length) {
                    this.$ui.fields
                        .filter('[name="action"]')
                        .val(action);

                    return true;
                }

                return false;
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
                    "integration",
                    "connection_requirements",
                    "has_lists",
                    "has_webhook_url",
                    "has_tags",
                    "has_forms",
                    "has_goals",
                    "has_email_sequences",
                    "has_sequence_levels",
                    "has_gdpr",
                    "has_form_id",
                    "has_double_optin",
                    "has_admin_email",
                    "gdpr_notes",
                    "gdpr_tag_source",
                    "list",
                    "webhook_url",
                    "form_id",
                    "double_optin",
                    "admin_email",
                    "tag",
                    "goal",
                    "form",
                    "email_sequence",
                    "sequence_level",
                    "html",
                    "gdpr_activate",
                    "gdpr_consent1_visible",
                    "gdpr_consent1_tag_confirmed",
                    "gdpr_consent1_tag_declined",
                    "gdpr_consent1_tag_not_shown",
                    "gdpr_consent2_visible",
                    "gdpr_consent2_tag_confirmed",
                    "gdpr_consent2_tag_declined",
                    "gdpr_consent2_tag_not_shown",
                    "gdpr_field_note",
                    "action",
                    "post_action",
                    "post_action_notification_text",
                    "post_action_redirect_url",
                    "post_action_redirect_autofill",
                    "post_action_popoverlay_trigger",
                    "post_action_funnel_step",
                    "message_from_name",
                    "message_from_email",
                    "message_subject",
                    "message_text",
                    "confirmation_message_send",
                    "confirmation_message_from_name",
                    "confirmation_message_from_email",
                    "confirmation_message_subject",
                    "confirmation_message_text",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-"), data.value || "");

                props = [
                    "fields",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-") + "-count", data.value.length || 0);

                props = [
                    "webhook_url",
                    "admin_email",
                    "post_action_notification_text",
                    "post_action_redirect_url",
                    "post_action_popoverlay_trigger",
                    "post_action_funnel_step",
                ];
                if (props.indexOf(data.key) !== -1)
                    this.$ui.steps.attr("data-" + data.key.replace(/[\W_]+/g, "-") + "-invalid", data.invalid ? "1" : "0");
            },

            /**
             * Pre stepping event handler:
             * skip some steps
             *
             * @param  {Object} data
             * @return {Void}
             */
            _preEventHandlerStepping: function(data) {
                var provider = this.$ui.steps.attr("data-integration") || "",
                    integration = that.find(provider);

                // There step 1 is skipped on contact from, as there is only one integration avaialble
                if (data.step === 1 && data.stepBefore === 2 && this.$ui.steps.attr("data-integration") === "contact") {
                    return !!this.step(2);
                }

                if (data.step === 2 && data.stepBefore < data.step && integration.connectionRequirements === "none") {
                    this._prepareStep2();
                    return !!this.step(3);
                }
                if (data.step === 2 && data.stepBefore > data.step && integration.connectionRequirements === "none")
                    return !!this.step(1);

                // extra fields
                if (data.step === 4 && data.stepBefore < data.step && !integration.hasExtraFields) {
                    return !!this.step(5);
                }
                if (data.step === 4 && data.stepBefore > data.step && !integration.hasExtraFields) {
                    return !!this.step(3);
                }

                if (data.step === 5 && data.stepBefore < data.step && !integration.hasGdpr) {
                    this._prepareStep5();
                    return !!this.step(6);
                }
                if (data.step === 5 && data.stepBefore > data.step && !integration.hasGdpr)
                    return !!this.step(4);

                // Skip message step for when using contact form
                if (data.step === 7 && data.stepBefore < data.step && !integration.hideExtraFieldsSave) {
                    return !!this.step(8);
                }
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
                this._prepareStep1();
            },

            _prepareStep1: function() {
                var jq = window.parent.jQuery,
                    $input = this.$ui.fields
                        .filter('[name="integration"]'),
                    html = that.data()
                        .filter(function(item) {
                            return item.connected;
                        })
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.provider + '" data-thumb="' + item.image + '">'
                                + item.title
                                + '</option>';
                        })
                        .join(""),
                    value = null
                        || this.$ui.steps.attr("data-integration")
                        || this.form.getOption("optinIntegration", "all")
                        || "";

                $input
                    .empty()
                    .append(html)
                    .val(value)
                    .trigger("change");

                // Google recaptcha warning
                if (OP3.GoogleRecaptcha && !OP3.GoogleRecaptcha.connected)
                    this.$ui.steps
                        .find(".op3-google-recaptcha-warning")
                        .css("display", "block");

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep2: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    integration = that.find(provider);

                integration.getDetails(this._prepareStep2.bind(this));
            },

            _prepareStep2: function() {
                var jq = window.parent.jQuery,
                    provider = this.$ui.steps.attr("data-integration") || "",
                    integration = that.find(provider),
                    changed = provider !== this.form.getOption("optinIntegration", "all"),
                    lists = null,
                    tags = null,
                    goals = null,
                    forms = null;

                this.$ui.fields
                    .filter('[name="admin_email"],[name="list"],[name="tag"],[name="goal"],[name="form"],[name="form_id"],[name="webhook_url"],[name="double_optin"],[name="email_sequence"],[name="sequence_level"],[name="html"]')
                    .each(function() {
                        var $field = $(this).closest("[data-field]"),
                            field = $field.attr("data-field"),
                            $label = $field.find(".field-label"),
                            label = $label.attr("data-label-default"),
                            prop = ("label_" + field).replace(/_[a-z]/g, function(match) {
                                return match.substr(1).toUpperCase();
                            });

                        $label.text(integration[prop] || label);
                    });

                this.$ui.fields
                    .filter('[name="connection_requirements"]')
                    .val(integration.connectionRequirements)
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_admin_email"]')
                    .val(integration.hasAdminEmail ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_lists"]')
                    .val(integration.hasLists ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="new_lists"]')
                    .val(integration.newLists ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_tags"]')
                    .val(integration.hasTags ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_forms"]')
                    .val(integration.hasForms ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="multi_tags"]')
                    .val(integration.multiTags ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="new_tags"]')
                    .val(integration.newTags ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_goals"]')
                    .val(integration.hasGoals ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_email_sequences"]')
                    .val(integration.hasEmailSequences ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_sequence_levels"]')
                    .val(integration.hasSequenceLevels ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_form_id"]')
                    .val(integration.hasFormId ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_webhook_url"]')
                    .val(integration.hasWebhookUrl ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_double_optin"]')
                    .val(integration.hasDoubleOptin ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="has_gdpr"]')
                    .val(integration.hasGdpr ? "1" : "0")
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="gdpr_notes"]')
                    .val(integration.gdprNotes)
                    .trigger("change");
                this.$ui.fields
                    .filter('[name="gdpr_tag_source"]')
                    .val(integration.gdprTagSource)
                    .trigger("change");

                // we already fetched details so this won't
                // act as async function
                integration.getLists(function(data) {
                    lists = data;
                });
                integration.getTags(function(data) {
                    tags = data;
                });
                integration.getGoals(function(data) {
                    goals = data;
                });

                // Prepare labels and text
                var desc  = integration.description ? integration.description : OP3._("Depending on your integrated service, you can specify to which list, tag, campaign or webhook your data is sent to.");
                this.$ui.desc
                    .html(desc);

                // set select/input options and value - list
                var $input, html, value;
                $input = this.$ui.fields
                    .filter('[name="list"]')
                    .empty();
                html = [ { id: "", name: "(Please select)" } ]
                    .concat(lists || [])
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                value = changed ? "" : this.form.getOption("optinList", "all");
                $input
                    .append(html)
                    .val(value)
                    .trigger("change");

                // Rebuild the select2 dropdown for lists
                if (integration.newLists) {
                    $input.select2('destroy');
                    $input.select2({
                        placeholder: OP3._("(Enter list ID and press enter)"),
                        width: "100%",
                        dropdownParent: $input.closest('.op3-wizard'),
                        tags: true,
                        multiple: true,
                        maximumSelectionLength: 1,
                        data: [{id: value, text: value}]
                    });
                    $input.empty().trigger("change");
                    if (value) {
                        $input.append('<option value="' + value + '">' + value + '</option>');
                        $input.val(value).trigger('change');
                    }
                } else {
                    // Rebuild select2 in case user returns to a previous
                    // step and selects a different integraiton (OP3-2169)
                    $input.select2('destroy');
                    $input.select2({
                        placeholder: OP3._("(Please Select)"),
                        width: "100%",
                        dropdownParent: $input.closest('.op3-wizard'),
                        multiple: false,
                    });
                }

                // set select/input options and value - tag
                $input = this.$ui.fields
                    .filter('[name="tag"]')
                    .empty();
                html = (integration.multiTags ? [] : [ { id: "", name: "(Please select)" } ])
                    .concat(tags || [])
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                value = changed ? "" : this.form.getOption("optinTag", "all");

                // Rebuild the select2 dropdown for tags
                $input.select2('destroy');
                $input.select2({
                    placeholder: integration.multiTags ? OP3._("(Enter tag name and press enter)") : OP3._("(Please Select)"),
                    width: "100%",
                    dropdownParent: $input.closest('.op3-wizard'),
                    tags: !! integration.multiTags,
                    multiple: !! integration.multiTags,
                });
                $input.append(html);

                // For integrations with new tag capability
                // We need to add those values
                if (integration.newTags && value) {
                    var tagValues = value.split(",");

                    if (tagValues) {
                        tagValues.forEach(function(tagItem) {
                            $input.append(new Option(tagItem, tagItem, false, false));
                        });
                    }

                    $input.val(tagValues).trigger("change");
                } else {
                    $input.val(value).trigger("change");
                }

                // set select/input options and value - goal
                $input = this.$ui.fields
                    .filter('[name="goal"]')
                    .empty();
                html = [ { id: "", name: "(Please select)" } ]
                    .concat(goals || [])
                    .map(function(item) {
                        return ''
                            + '<option value="' + item.id + '">'
                            + (item.label || item.name)
                            + '</option>';
                    })
                    .join("");
                value = changed ? "" : this.form.getOption("optinGoal", "all");
                $input
                    .append(html)
                    .val(value)
                    .trigger("change");

                // set select/input options and value - webhookUrl
                $input = this.$ui.fields
                    .filter('[name="webhook_url"]')
                    .empty();
                value = changed ? "" : this.form.getOption("optinWebhookUrl", "all");
                $input
                    .val(value)
                    .trigger("change");

                $input= this.$ui.fields
                    .filter('[name="form_id"]')
                    .empty();
                value = changed ? "" : this.form.getOption("optinFormId", "all");
                $input
                    .val(value)
                    .trigger("change");

                // set select/input options and value - doubleOptin
                $input = this.$ui.fields
                    .filter('input[type="checkbox"][name="double_optin"]')
                    .on("change", function() {
                        var $input = $(this)
                            .closest('[data-field="double_optin"]')
                            .find('[name="double_optin"]');
                        var checked = $(this).prop("checked") ? "1" : "0";

                        $input.val(checked);
                    });
                value = changed ? "0" : this.form.getOption("optinDoubleOptin", "all");
                $input
                    .prop("checked", !!parseInt(value, 10))
                    .trigger("change");

                // set select/input options and value - adminEmail
                $input= this.$ui.fields
                    .filter('[name="admin_email"]')
                    .empty();
                value = changed ? this.form.config().options.all.adminEmail : this.form.getOption("adminEmail", "all");
                $input
                    .val(value)
                    .trigger("change");

                // set custom integration html
                $input= this.$ui.fields
                    .filter('[name="html"]')
                    .empty();
                value = integration.provider === "html" ?  this.form.findProperty("optinHtml").computed() : null;
                $input
                    .val(value)
                    .trigger("change");

                // set input options and value - optinAction
                $input= this.$ui.fields
                    .filter('[name="action"]')
                    .empty();
                value = changed ? "" : this.form.getOption("optinAction", "all");
                $input
                    .val(value)
                    .trigger("change");

                // remove loading info
                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep3: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider);

                integration.getFields(list, tag, function(fields) {
                    this._prepareStep3(fields);
                }.bind(this));
            },

            _prepareStep3: function(fields) {
                // get active element fields
                var oldFields = this.form.children()
                    .filter(function(item) {
                        var $item = OP3.$(item),
                            type = $item.type(),
                            spec = $item.spec(),
                            isExtraField = $item.getOption("extraField", "all"),
                            invalid = false
                                || type === "button"
                                || spec === "dummy"
                                || spec === "gdpr1"
                                || spec === "gdpr2"
                                || isExtraField === "1";

                        return !invalid;
                    })
                    .map(function(item) {
                        var $item = OP3.$(item),
                            name = $item.getOption("name", "all"),
                            alias = this._getFieldNameByAlias(name);

                        return alias;
                    }.bind(this));

                var $input = this.$ui.fields
                        .filter('[name="fields"]'),
                    html = (fields || [])
                        .sort(function(current, next) {
                            return current.order - next.order;
                        })
                        .map(function(item) {
                            var selected = false
                                || item.required
                                || (!selected && oldFields.indexOf(this._getFieldNameByAlias(item.id)) !== -1);

                            return ''
                                + '<option value="' + item.id + '" data-required="' + (item.required ? "1" : "0") + '"' + (selected ? " selected" : "") + ' data-hidden="' + (item.type === "hidden" ? "1" : "0") + '">'
                                + (item.label || item.name)
                                + '</option>';
                        }.bind(this));
                $input
                    .empty()
                    .append(html)
                    .trigger("change");

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep4: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider);

                integration.getFields(list, tag, this._prepareStep4.bind(this));
            },

            _prepareStep4: function() {
                var jq = window.parent.jQuery,
                    serialize = this.serialize(),
                    step = 4,
                    provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider),
                    fields = null,
                    tags = null,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    element = this.form,
                    changed = provider !== this.form.getOption("optinIntegration", "all");

                // we already fetched details so callback
                // will be executed before code bellow
                integration.getTags(function(data) {
                    tags = data;
                });

                integration.getFields(list, tag, function(data) {
                    if (data === null) {
                        data = that._data[integration._index].fields;
                    }
                    fields = data;
                });

                // Attribute is used to show/hide neccessary fields in CSS
                if (integration.hideExtraFieldsSave) {
                    this.$ui.element
                        .attr("data-hide-extra-fields-save", "true");

                    // TODO: This doesn't work for some reason, so the workaround is in CSS _op3-wizard-integrations.scss:440
                    // $content.find('[name="extra_field_type"]')
                    //     .find('option[value^="input-"], option[value="textarea"]')
                    //     .prop("disabled", false)
                    //     .parent()
                    //     .trigger("change");
                } else {
                    this.$ui.element
                        .removeAttr("data-hide-extra-fields-save");

                    // $content.find('[name="extra_field_type"]')
                    //     .find('option[value^="input-"], option[value="textarea"]')
                    //     .prop("disabled", true)
                    //     .parent()
                    //     .trigger("change");
                }

                var $extraFields = $content.find(".op3-wizard-extra-fields")
                    .empty();

                this.form.children()
                    .filter(function(item) {
                        var $item = OP3.$(item),
                            isExtraField = $item.getOption("extraField", "all");

                        return isExtraField === "1";
                    }).forEach(function(element) {
                        var $element = OP3.$(element);
                        var template = OP3.$.templating(this._extraFieldTemplate, {});
                        var $template = jq(template)
                            .appendTo($extraFields);

                        // Set extra_field_label
                        $template
                            .find('[name="extra_field_label"]')
                            .val($element.getOption("label", "all"))
                            .trigger("change");

                        // Set extra_field_save_as
                        var extraFieldSaveAs = $element.getOption("extraFieldSaveAs", "all");
                        $template
                            .find('[name="extra_field_save_as"]')
                            .val(extraFieldSaveAs)
                            .trigger("change");

                        // Disable tag option in "Save As" dropdown
                        // if integration doesn't have tags
                        if (integration.gdprTagSource !== "tags" || integration.multiTags === true) {
                            $template
                                .find('[name="extra_field_save_as"] option[value="tag"]')
                                .prop("disabled", true)
                                .prop("selected", false)
                                .parent()
                                .trigger("change");
                        // Set extra_field_tag
                        } else {
                            // Prepare select options for extra_field_tags
                            var tagsOptions = [ { name: "", label: OP3._("None") } ]
                                .concat(tags)
                                .filter(function(item) {
                                    // Remove tag selected in step1
                                    return serialize.tag != item.id;
                                }).map(function(value) {
                                    return '<option value="' + value.id + '">' + value.name + '</option>';
                                }).join("");

                            // Fill extra_field_custom_tags dropdown
                            var $extraFieldCustom = $template
                                .find('[name="extra_field_tags"]')
                                .html(tagsOptions);

                            if (extraFieldSaveAs === "tag") {
                                var options = $element.getOption("options", "all") || $element.children();
                                $(options).each(function(index, value) {
                                    var $option = $(value);
                                    var value = $option.attr("value") || OP3.$(value).getOption("value", "all");
                                    var label = $option.text() || OP3.$(value).getOption("label", "all");
                                    var tag = tags.find(function(item) {
                                        return item.id == value;
                                    });

                                    if (!value || !tag)
                                        return true;

                                    $extraFieldCustom
                                        .val($extraFieldCustom.val().concat(value))
                                        .trigger("select2:select", [{id: value, text: tag ? tag.name : "", value: label}])
                                        .trigger("change");
                                });
                            }
                        }

                        // Set extra_field_type (different for radio & checkbox)
                        var type = $element.type();
                        if (type === "fieldset") {
                            type = $($element)
                                .find(".op3-element")
                                .attr("data-op3-element-type");
                        }

                        // Input type is appended directly to the input option value
                        if (integration.hideExtraFieldsSave && type === "input") {
                            type = type + "-" + $element.getOption("typeAttr", "all");
                        }

                        $template
                            .find('[name="extra_field_type"]')
                            .val(type)
                            .trigger("change");

                        var options = $element.getOption("options", "all") || $element.children();
                        var $options = $(options);
                        var numberOfOptions = $options.length || "";

                        if (type === "select")
                            numberOfOptions = numberOfOptions - 1;

                        // Set extra_field_number_of_options
                        $template
                            .find('[name="extra_field_number_of_custom_options"]')
                            .val(numberOfOptions)
                            .trigger("change");

                        if (extraFieldSaveAs === "custom_field") {
                            var $optionTitles = $template.find('[name="extra_field_option_title"]');
                            $options.each(function(index, value) {
                                var $option = $(value);
                                var value = $option.attr("value") || OP3.$(value).getOption("label", "all");

                                // Because of "None" option
                                if (type === "select")
                                    index = index - 1;

                                if (!value)
                                    return true;

                                $($optionTitles[index])
                                    .val(value)
                                    .trigger("change");
                            });
                        }

                        // Prepare select options for extra_field_custom_field
                        var fieldOptions = [ { name: "", label: OP3._("None"), optin_id: "", id: "" } ]
                            .concat(fields)
                            .filter(function(item) {
                                // Remove field selected in step3
                                return serialize.fields.indexOf(item.id) === -1;
                            }).map(function(value) {
                                return '<option value="' + value.optin_id + '">' + value.label + '</option>';
                            }).join("");

                        var name = $element.getOption("name", "all");
                        if (!name) {
                            var child = $element.children()[0];
                            name = OP3.$(child).getOption("name", "all");
                        }

                        // fieldOptions is automatically created
                        // based on the label of the input field
                        if (integration.hideExtraFieldsSave) {
                            var label = $element.getOption("label", "all");
                            var slug = label.toLowerCase().replace(/ /g, "-")

                            fieldOptions = ""
                                + '<option value="' + slug + '">'
                                + label
                                + '</option>';

                            $template
                                .find('[name="extra_field_merge_tag"]')
                                .val('[' + slug + ']')
                                .attr("data-old-value", '[' + slug + ']');

                            // Regenerate "Select Custom Field"
                            $template
                                .find('[name="extra_field_label"]')
                                .attr('data-old-value', slug)
                                .trigger("change");

                        }

                        // Fill and set extra_field_custom_field dropdown
                        $template
                            .find('[name="extra_field_custom_field"]')
                            .html(fieldOptions)
                            .val(name)
                            .trigger("change");

                        var select2Options = {
                            width: "100%",
                            dropdownParent: $content.closest(".op3-wizard"),
                            placeholder: OP3._("(Please Select)"),
                        }

                        $template
                            .find("select")
                            .select2(select2Options);
                    }.bind(this));

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep5: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                this._prepareStep5();
            },

            _prepareStep5: function() {
                var provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider),
                    tags = null,
                    fields = null;

                // we already fetched details so callback
                // will be executed before code bellow
                integration.getTags( function(data) {
                    tags = data;
                });
                integration.getFields(list, tag, function(data) {
                    if (data === null) {
                        data = that._data[integration._index].fields;
                    }
                    fields = data;
                });

                var html = "",
                    source = null;
                if (integration.gdprTagSource === "tags")
                    source = tags;
                else if (integration.gdprTagSource === "fields")
                    source = fields;
                if (source)
                    html = [ { id: "", name: "(Please select)" } ]
                        .concat(source)
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.id + '">'
                                + (item.label || item.name)
                                + '</option>';
                        })
                        .join("");
                // @todo - source filter current selected fields only???

                this.$ui.fields
                    .filter('select[name^="gdpr_consent1_tag_"],select[name^="gdpr_consent2_tag_"]')
                    .html(html);
                this.$ui.fields
                    .filter('[name^="gdpr_consent1_tag_"],[name^="gdpr_consent2_tag_"]')
                    .each(function() {
                        var $field = $(this).closest("[data-field]"),
                            $label = $field.find(".field-label"),
                            label = $label.attr("data-label-default"),
                            prop = "labelGdpr";

                        if (integration[prop]) {
                            var temp = label.split(" ");
                            label = temp[0] + " " + integration[prop];
                        }

                        $label.text(label);
                    });

                if (source !== fields)
                    html = [ { id: "", name: "(Please select)" } ]
                        .concat(fields)
                        .map(function(item) {
                            return ''
                                + '<option value="' + item.id + '">'
                                + (item.label || item.name)
                                + '</option>';
                        })
                        .join("");
                this.$ui.fields
                    .filter('[name="gdpr_field_note"]')
                    .html(html);

                // gdpr consent tags from input or select
                this.$ui.fields
                    .filter('input[name^="gdpr_consent1_tag_"],input[name^="gdpr_consent2_tag_"]')
                    .removeAttr("disabled")
                    .attr(!source ? "data-disabled" : "disabled", "")
                    .removeAttr("data-disabled");

                // set default gdpr-activate property
                var value = null;
                if (integration.hasGdpr && !value)
                    value = this.$ui.steps.attr("data-gdpr-activate");
                if (integration.hasGdpr && !value)
                    value = this.form.getOption("optinGdprActivate", "all");
                if (!value)
                    value = "off";
                this.$ui.fields
                    .filter('[name="gdpr_activate"]')
                    .val(value)
                    .trigger("change");

                // set default field/tag properties
                if (value !== "off") {
                    var widget = this;

                    var props = [
                        "gdpr_consent1_visible",
                        "gdpr_consent2_visible",
                    ];
                    props.forEach(function(item) {
                        widget.$ui.fields
                            .filter('input[type="checkbox"][name="' + item + '"]')
                            .prop("checked", function() {
                                var keyData = "data-" + item.replace(/_/g, "-"),
                                    keyOption = "optin" + item.charAt(0).toUpperCase() + item.slice(1).replace(/_([a-z])/g, function(match, group) {
                                        return group.toUpperCase();
                                    });

                                value = null;
                                if (value === null)
                                    value = widget.$ui.steps.is("[" + keyData + "]") ? !!(widget.$ui.steps.attr(keyData)*1) : null;
                                if (value === null)
                                    value = !!
                                        OP3.$(widget.form)
                                            .children()
                                            .filter(function() {
                                                return OP3.$(this).spec() === "gdpr" + item.replace(/\D*/g, "");
                                            })
                                            .length;

                                return value || false;
                            })
                            .trigger("change");
                    });

                    props = [
                        "gdpr_consent1_tag_confirmed",
                        "gdpr_consent1_tag_declined",
                        "gdpr_consent1_tag_not_shown",
                        "gdpr_consent2_tag_confirmed",
                        "gdpr_consent2_tag_declined",
                        "gdpr_consent2_tag_not_shown",
                        "gdpr_field_note",
                    ]
                    props.forEach(function(item) {
                        widget.$ui.fields
                            .filter('select[name="' + item + '"]')
                            .val(function() {
                                var keyData = "data-" + item.replace(/_/g, "-"),
                                    keyOption = "optin" + item.charAt(0).toUpperCase() + item.slice(1).replace(/_([a-z])/g, function(match, group) {
                                        return group.toUpperCase();
                                    });

                                value = "";
                                if (!$(this).is(":disabled")) {
                                    if (!value)
                                        value = widget.$ui.steps.attr(keyData);
                                    if (value && !$(this).find('option[value="' + value + '"]').length)
                                        value = "";
                                    if (!value)
                                        value = widget.form.getOption(keyOption, "all");
                                    if (value && !$(this).find('option[value="' + value + '"]').length)
                                        value = "";
                                }

                                return value;
                            })
                            .trigger("change");
                    });
                    props.forEach(function(item) {
                        widget.$ui.fields
                            .filter('input[name="' + item + '"]')
                            .val(function() {
                                var keyData = "data-" + item.replace(/_/g, "-"),
                                    keyOption = "optin" + item.charAt(0).toUpperCase() + item.slice(1).replace(/_([a-z])/g, function(match, group) {
                                        return group.toUpperCase();
                                    });

                                value = "";
                                if (!$(this).is(":disabled")) {
                                    if (value === "")
                                        value = widget.$ui.steps.attr(keyData);
                                    if (value === "")
                                        value = widget.form.getOption(keyOption, "all");
                                }

                                return value;
                            })
                            .trigger("change");
                    });
                }
                else {
                    this.$ui.fields
                        .filter('input[type="checkbox"][name="gdpr_consent1_visible"],input[type="checkbox"][name="gdpr_consent2_visible"]')
                        .prop("checked", false)
                        .trigger("change");
                    this.$ui.fields
                        .filter('select[name^="gdpr_consent1_tag_"],select[name^="gdpr_consent2_tag_"]')
                        .val("")
                        .trigger("change");
                    this.$ui.fields
                        .filter('input[name^="gdpr_consent1_tag_"],input[name^="gdpr_consent2_tag_"]')
                        .val("")
                        .trigger("change");
                    this.$ui.fields
                        .filter('[name="gdpr_field_note"]')
                        .val("")
                        .trigger("change");
                }

                // Contact integration has fixed gdpr fields
                // Docs: https://optimizepress.notion.site/Contact-Form-Element-94063f25ce7f441188d7dd1cd337a5a7
                if (provider === "contact") {
                    // value = item;
                    var props = [
                        "gdpr_consent1_tag_confirmed",
                        "gdpr_consent1_tag_declined",
                        "gdpr_consent1_tag_not_shown",
                        "gdpr_consent2_tag_confirmed",
                        "gdpr_consent2_tag_declined",
                        "gdpr_consent2_tag_not_shown",
                    ];
                    var fields = this.$ui.fields;
                    props.forEach(function(item) {
                        fields
                            .filter('input[name="' + item + '"]')
                            .val(item)
                            .trigger("change");
                    });
                }

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep6: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                this._prepareStep6();
            },

            _prepareStep6: function() {
                // Optin form and Contact form should have sepparate integration
                // wizards, but since we're using same logic for both we need to
                // set the title here :(
                var title = OP3._("Form Post Action");
                if (this.form.type() === "form")
                    title = OP3._("Optin Post Action");
                this.$ui.stepsItem.eq(6 - 1).find(".op3-wizard-steps-item-header h2")
                    .text(title);

                var $input, value, html,
                    provider = this.$ui.steps.attr("data-integration") || "",
                    changed = provider !== this.form.getOption("optinIntegration", "all");

                $input = this.$ui.fields
                    .filter('[name="post_action"]');
                value = null
                    || this.$ui.steps.attr("data-post-action")
                    || this.form.getOption("optinPostAction", "all")
                    || "notification";
                $input
                    .val(value)
                    .trigger("change");

                $input = this.$ui.fields
                    .filter('[name="post_action_notification_text"]');
                value = null
                    || this.$ui.steps.attr("data-post-action-notification-text")
                    || this.form.getOption("optinPostActionNotificationText", "all")
                    || "";
                $input
                    .val(value)
                    .trigger("change");

                $input = this.$ui.fields
                    .filter('[name="post_action_redirect_url"]');
                value = null
                    || this.$ui.steps.attr("data-post-action-redirect-url")
                    || this.form.getOption("optinPostActionRedirectURL", "all")
                    || "";
                $input
                    .val(value)
                    .trigger("change");

                $input = this.$ui.fields
                    .filter('[type="checkbox"][name="post_action_redirect_autofill"]');
                value = this.$ui.steps.is("[data-post-action-redirect-autofill]") ? !!(this.$ui.steps.attr("data-post-action-redirect-autofill")*1) : !!(this.form.getOption("optinPostActionRedirectAutofill", "all")*1);
                $input
                    .prop("checked", value)
                    .trigger("change");

                // set select/input options and value - post action redirect autofill
                $input = this.$ui.fields
                    .filter('input[type="checkbox"][name="post_action_redirect_autofill"]')
                    .on("change", function() {
                        var $input = $(this)
                            .closest('[data-field="post_action_redirect_autofill"]')
                            .find('[name="post_action_redirect_autofill"]');
                        var checked = $(this).prop("checked") ? "1" : "0";

                        $input.val(checked);
                    });
                value = changed ? "0" : this.form.getOption("optinPostActionRedirectAutofill", "all");
                $input
                    .prop("checked", !!parseInt(value, 10))
                    .trigger("change");

                // Fill popoverlay triggers
                $input = this.$ui.fields
                    .filter('[name="post_action_popoverlay_trigger"]')
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
                    || this.$ui.steps.attr("data-post-action-popoverlay-trigger")
                    || this.form.getOption("optinPostActionPopOverlayTrigger", "all")
                    || "";
                if (value && !$input.find('option[value="' + value + '"]').length)
                    value = "";
                $input
                    .val(value)
                    .trigger("change");

                // Fill funnel pages
                if (OP3.Funnels && OP3.Funnels.pages) {
                    $input = this.$ui.fields
                        .filter('[name="post_action_funnel_step"]')
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
                        || this.$ui.steps.attr("data-post-action-funnel-step")
                        || this.form.getOption("optinPostActionFunnelStep", "all")
                        || "";
                    if (value && !$input.find('option[value="' + value + '"]').length)
                        value = "";
                    $input
                        .val(value)
                        .trigger("change");
                }

                // Show "Hide Pop Overlay" option if form is in pop overlay
                if (this.form.path().match(/^\/popoverlay/))
                    this.$ui.element
                        .addClass("op3-wizard-hide-popoverlay-action");
                else
                    this.$ui.element
                        .removeClass("op3-wizard-hide-popoverlay-action");

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep7: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider);

                integration.getFields(list, tag, this._prepareStep7.bind(this));
            },

            _prepareStep7: function() {
                var jq = window.parent.jQuery,
                    serialize = this.serialize(),
                    step = 7,
                    provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider),
                    fields = null,
                    tags = null,
                    merge_tags = ['[all_form_fields]', '[admin_email]', ],
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $content = $stepItem.find(".op3-wizard-steps-item-content"),
                    element = this.form,
                    changed = provider !== this.form.getOption("optinIntegration", "all");

                // we already fetched details so callback
                // will be executed before code bellow
                integration.getTags(function(data) {
                    tags = data;
                });

                integration.getFields(list, tag, function(data) {
                    if (data === null) {
                        data = that._data[integration._index].fields;
                    }
                    fields = data;
                });

                var basicFields = this.$ui.
                    stepsItem
                    .eq(2)
                    .find(".op3-wizard-select-simple-picker")
                    .val();
                basicFields.forEach(function(value) {
                    merge_tags.push('[' + value + ']');
                });

                var $extraFields = this.$ui.stepsItem.eq(3).find(".op3-wizard-extra-field");
                $extraFields.each(function() {
                    var $field = $(this).find('[name="extra_field_merge_tag"]');
                    var value = $field.val();
                    var oldValue = $field.attr("data-old-value");

                    // Update merge tags in input fields
                    if (oldValue && value !== oldValue) {
                        $content.find("input, textarea, select").each(function() {
                            $(this).val($(this).val().replaceAll(oldValue, value));
                        });
                        $field.attr("data-old-value", value);
                    }

                    merge_tags.push(value);
                });

                var merge_tags_html = '';
                merge_tags.forEach(function(value) {
                    merge_tags_html += ''
                        + '<div class="input-text-container">'
                        + '<input class="input-text" type="text" name="extra_field_label" readonly value="' + value + '">'
                        + '</div>';
                });
                $stepItem.find('[data-field-content="merge_tags"]').html(merge_tags_html)

                if (serialize.confirmation_message_send === "1") {
                    $stepItem
                        .find('[name="confirmation_message_send_checkbox"]')
                        .prop('checked', true)
                        .trigger("change");
                    // $stepItem.find('[name="confirmation_message_send"]').val("1");
                }

                // initial values...
                if (!serialize.message_from_name) {
                    var value = '';
                    if (serialize.fields.includes("first_name"))
                        value += '[first_name] ';
                    if (serialize.fields.includes("last_name"))
                        value += '[last_name] ';

                    value = value.trim();

                    if (!value)
                        value = '[email]';

                    $stepItem
                        .find('[name="message_from_name"]')
                        .val(value);
                }

                if (!serialize.message_from_email)
                    $stepItem
                        .find('[name="message_from_email"]')
                        .val('[email]');

                if (!serialize.message_subject) {
                    var value = OP3._('Contact from OptimizePress');

                    if (serialize.fields.includes("subject"))
                        value = '[subject]';

                    $stepItem
                        .find('[name="message_subject"]')
                        .val(value);
                }

                if (!serialize.message_text)
                    $stepItem.find('[name="message_text"]').val(OP3._('A contact form was submitted with the following fields:') + ' \n\n[all_form_fields]');

                // Confirmation message data
                if (!serialize.confirmation_message_from_name)
                    $stepItem
                        .find('[name="confirmation_message_from_name"]')
                        .val('[admin_email]');

                if (!serialize.confirmation_message_from_email)
                    $stepItem
                        .find('[name="confirmation_message_from_email"]')
                        .val('[admin_email]');

                if (!serialize.confirmation_message_subject)
                    $stepItem
                        .find('[name="confirmation_message_subject"]')
                        .val(OP3._('We have received your message'));

                if (!serialize.confirmation_message_text)
                    $stepItem
                        .find('[name="confirmation_message_text"]')
                        .val(OP3._('Thank you for sending us the message. We will write back as soon as we can.')
                            + ' \n\n'
                            + OP3._('Warm regards!'));

                $stepItem
                    .find(".extra-field-confirmation-email-status")
                    .text(serialize.confirmation_message_send === "1" ? OP3._("(On)") : OP3._("(Off)"));

                $stepItem.find('input,select:not([name="extra_field_label"])').trigger("change");

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _loadStep8: function(data) {
                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    integration = that.find(provider);

                // for better user experience we gonna wait for
                // scroller element to finish transition (start
                // on step 6, not between steps 5 and 6) and
                // add little timeout before start rendering
                // form
                var callback = function() {
                    setTimeout(function() {
                        integration.getFields(list, tag, function(fields) {
                            this._setForm(fields);
                            this._prepareStep8(fields);
                        }.bind(this));
                    }.bind(this), 400);
                }.bind(this);

                // wait step to finish transition
                var step = 7,
                    $stepItem = this.$ui.stepsItem.eq(step - 1),
                    $scroller = $stepItem.closest(".op3-wizard-steps-scroller"),
                    hasTransition = !!parseFloat($scroller.css("transition-duration"));
                if (hasTransition)
                    $scroller.one("transitionend", callback);
                else
                    callback();
            },

            _prepareStep8: function(fields) {
                var serialize = this.serialize(),
                    provider = this.$ui.steps.attr("data-integration") || "",
                    list = this.$ui.steps.attr("data-list") || "",
                    tag = this.$ui.steps.attr("data-tag") || "",
                    goal = this.$ui.steps.attr("data-goal") || "",
                    form = this.$ui.steps.attr("data-form") || "",
                    email_sequence = this.$ui.steps.attr("data-email-sequence") || "",
                    sequence_level = this.$ui.steps.attr("data-sequence-level") || "",
                    integration = OP3.Integrations.find(provider),
                    thumb = integration.image,
                    webhookUrl = serialize.webhook_url,
                    formId = serialize.form_id,
                    doubleOptin = serialize.double_optin,
                    adminEmail = serialize.admin_email,
                    gdprActivate = serialize.gdpr_activate,
                    gdprConsent1Visible = serialize.gdpr_consent1_visible,
                    gdprConsent1TagConfirmed = serialize.gdpr_consent1_tag_confirmed,
                    gdprConsent1TagDeclined = serialize.gdpr_consent1_tag_declined,
                    gdprConsent1TagNotShown = serialize.gdpr_consent1_tag_not_shown,
                    gdprConsent2Visible = serialize.gdpr_consent2_visible,
                    gdprConsent2TagConfirmed = serialize.gdpr_consent2_tag_confirmed,
                    gdprConsent2TagDeclined = serialize.gdpr_consent2_tag_declined,
                    gdprConsent2TagNotShown = serialize.gdpr_consent2_tag_not_shown,
                    gdprFieldNote = serialize.gdpr_field_note,
                    postAction = serialize.post_action,
                    postActionNotificationText = serialize.post_action_notification_text,
                    postActionRedirectUrl = serialize.post_action_redirect_url,
                    postActionRedirectAutofill = serialize.post_action_redirect_autofill,
                    postActionPopOverlayTrigger = serialize.post_action_popoverlay_trigger,
                    postActionFunnelStep = serialize.post_action_funnel_step,
                    confirmationEmail = serialize.confirmation_message_send,
                    $extraFields = this.$ui.stepsItem.eq(3).find(".op3-wizard-extra-field");

                // get data from integration (convert id to name)
                provider = integration.title;
                integration.getSequenceLevelDetails(list, email_sequence, sequence_level, function(data) {
                    sequence_level = (data ? data.Subject : null) || "";
                });
                integration.getEmailSequenceDetails(list, email_sequence, function(data) {
                    email_sequence = (data ? data.SequenceName : null) || "";
                });
                integration.getFormDetails(list, form, function(data) {
                    form = (data ? data.name : null) || "";
                });
                integration.getListDetails(list, function(data) {
                    list = (data ? data.name : null) || "";
                });
                integration.getTagDetails(tag, function(data) {
                    var newTags = "";

                    // Append tags not in the list
                    if (integration.newTags) {
                        var tags = tag.split(",");

                        newTags = tags.join(", ");
                    }

                    // Then add rest of tags
                    tag = ((data ? data.name : null) || "") + newTags;
                });
                integration.getGoalDetails(goal, function(data) {
                    goal = (data ? data.name : null) || "";
                });

                gdprActivate = this.$ui.fields.filter('[name="gdpr_activate"]').find('option[value="' + gdprActivate + '"]').text();
                gdprConsent1Visible = gdprConsent1Visible*1 ? "On" : "Off";
                if (gdprConsent1TagConfirmed && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent1TagConfirmed, function(data) {
                        gdprConsent1TagConfirmed = (data ? data.name : null) || "";
                    });
                else if (gdprConsent1TagConfirmed && serialize.gdpr_tag_source === "fields")
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprConsent1TagConfirmed, function(data) {
                        gdprConsent1TagConfirmed = (data ? data.label : null) || "";
                    });
                if (gdprConsent1TagDeclined && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent1TagDeclined, function(data) {
                        gdprConsent1TagDeclined = (data ? data.name : null) || "";
                    });
                else if (gdprConsent1TagDeclined && serialize.gdpr_tag_source === "fields")
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprConsent1TagDeclined, function(data) {
                        gdprConsent1TagDeclined = (data ? data.label : null) || "";
                    });
                if (gdprConsent1TagNotShown && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent1TagNotShown, function(data) {
                        gdprConsent1TagNotShown = (data ? data.name : null) || "";
                    });
                else if (gdprConsent1TagNotShown && serialize.gdpr_tag_source === "fields")
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprConsent1TagNotShown, function(data) {
                        gdprConsent1TagNotShown = (data ? data.label : null) || "";
                    });
                gdprConsent2Visible = gdprConsent2Visible*1 ? "On" : "Off";
                if (gdprConsent2TagConfirmed && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent2TagConfirmed, function(data) {
                        gdprConsent2TagConfirmed = (data ? data.name : null) || "";
                    });
                if (gdprConsent2TagDeclined && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent2TagDeclined, function(data) {
                        gdprConsent2TagDeclined = (data ? data.name : null) || "";
                    });
                if (gdprConsent2TagNotShown && serialize.gdpr_tag_source === "tags")
                    integration.getTagDetails(gdprConsent2TagNotShown, function(data) {
                        gdprConsent2TagNotShown = (data ? data.name : null) || "";
                    });
                if (gdprFieldNote)
                    integration.getFieldDetails(serialize.list, serialize.tag, gdprFieldNote, function(data) {
                        gdprFieldNote = (data ? data.label : null) || "";
                    });
                postAction = this.$ui.fields.filter('[name="post_action"]').find('option[value="' + postAction + '"]').text();
                if (postActionRedirectUrl)
                    postActionRedirectUrl = '<a target="_blank" href="' + postActionRedirectUrl + '">' + postActionRedirectUrl + '</a>';
                postActionRedirectAutofill = postActionRedirectAutofill*1 ? "On" : "Off";
                if (postActionPopOverlayTrigger)
                    postActionPopOverlayTrigger = this.$ui.fields.filter('[name="post_action_popoverlay_trigger"]').find('option[value="' + postActionPopOverlayTrigger + '"]').text();
                if (postActionFunnelStep)
                    postActionFunnelStep = this.$ui.fields.filter('[name="post_action_funnel_step"]').find('option[value="' + postActionFunnelStep + '"]').text();

                this.$ui.valueSummary
                    .filter('[data-value-summary="thumb"]')
                    .attr("src", thumb);
                this.$ui.valueSummary
                    .filter('[data-value-summary="integration"],[data-value-summary="provider"]')
                    .text(provider);
                this.$ui.valueSummary
                    .filter('[data-value-summary="list"]')
                    .text(list);
                this.$ui.valueSummary
                    .filter('[data-value-summary="tag"]')
                    .text(tag);
                this.$ui.valueSummary
                    .filter('[data-value-summary="goal"]')
                    .text(goal);
                this.$ui.valueSummary
                    .filter('[data-value-summary="form"]')
                    .text(form);
                this.$ui.valueSummary
                    .filter('[data-value-summary="email_sequence"]')
                    .text(email_sequence);
                this.$ui.valueSummary
                    .filter('[data-value-summary="sequence_level"]')
                    .text(sequence_level);
                this.$ui.valueSummary
                    .filter('[data-value-summary="webhook_url"]')
                    .html('<a href="' + webhookUrl + '" target="_blank">' + webhookUrl + '</a>');
                this.$ui.valueSummary
                    .filter('[data-value-summary="form_id"]')
                    .text(formId);
                this.$ui.valueSummary
                    .filter('[data-value-summary="double_optin"]')
                    .text(doubleOptin === "1" ? OP3._("On") : OP3._("Off"));
                this.$ui.valueSummary
                    .filter('[data-value-summary="admin_email"]')
                    .html('<a href="mailto:' + adminEmail + '">' + adminEmail + '</a>');
                this.$ui.valueSummary
                    .filter('[data-value-summary="fields"]')
                    .html(function() {
                        var result = "";
                        fields
                            .filter(function(item) {
                                return serialize.fields.indexOf(item.id) !== -1;
                            })
                            .forEach(function(item) {
                                result += ""
                                    + '<li data-required="' + (item.required ? "1" : "0") + '" data-hidden="' + (item.type === "hidden" ? "1" : "0") + '">'
                                    +     '<span>' + (item.label || item.name) + '</span>'
                                    +     '<i class="op3-icon op3-icon-lock-circle-1 locked"></i>'
                                    +     '<i class="op3-icon op3-icon-eye-ban-18-1 hidden"></i>'
                                    + '</li>'
                            });
                        if (result)
                            result = "<ul>" + result + "</ul>";

                        return result;
                    });

                this.$ui.steps.attr("data-number-of-extra-fields", $extraFields.length);
                this.$ui.fieldSummary
                    .find('[data-value-summary="extra_fields"]')
                    .html(function() {
                        var result = "";
                        $extraFields.each(function() {
                            var label = $(this)
                                .attr("data-extra-field-label")
                            result += '<li><span>' + label + '</span></li>';
                        });
                        if (result)
                            result = "<ul>" + result + "</ul>";

                        return result;
                    });
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_activate"]')
                    .text(gdprActivate);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_visible"]')
                    .text(gdprConsent1Visible);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_tag_confirmed"]')
                    .text(gdprConsent1TagConfirmed);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_tag_declined"]')
                    .text(gdprConsent1TagDeclined);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent1_tag_not_shown"]')
                    .text(gdprConsent1TagNotShown);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_visible"]')
                    .text(gdprConsent2Visible);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_tag_confirmed"]')
                    .text(gdprConsent2TagConfirmed);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_tag_declined"]')
                    .text(gdprConsent2TagDeclined);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_consent2_tag_not_shown"]')
                    .text(gdprConsent2TagNotShown);
                this.$ui.valueSummary
                    .filter('[data-value-summary="gdpr_field_note"]')
                    .text(gdprFieldNote);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action"]')
                    .text(postAction);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_notification_text"]')
                    .text(postActionNotificationText);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_redirect_url"]')
                    .html(postActionRedirectUrl);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_redirect_autofill"]')
                    .text(postActionRedirectAutofill);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_popoverlay_trigger"]')
                    .text(postActionPopOverlayTrigger);
                this.$ui.valueSummary
                    .filter('[data-value-summary="post_action_funnel_step"]')
                    .text(postActionFunnelStep);
                this.$ui.valueSummary
                    .filter('[data-value-summary="confirmation_email"]')
                    .text(confirmationEmail === "1" ? OP3._("On") : OP3._("Off"));

                this.$ui.element
                    .removeClass("op3-wizard-loading");
            },

            _renderError: function(data) {
                throw data;
            },

            _resetForm: function() {
                var element = this.form,
                    data = {
                        integration: element.getOption("optinIntegration", "all"),
                        admin_email: element.getOption("adminEmail", "all"),
                        list: element.getOption("optinList", "all"),
                        tag: element.getOption("optinTag", "all"),
                        goal: element.getOption("optinGoal", "all"),
                        webhook_url: element.getOption("optinWebhookUrl", "all"),
                        form_id: element.getOption("optinFormId", "all"),
                        double_optin: element.getOption("optinDoubleOptin", "all"),
                        action: element.getOption("optinAction", "all"),
                        post_action: element.getOption("optinPostAction", "all"),
                        email_sequence: null,
                        sequence_level: null,
                        post_action_notification_text: element.getOption("optinPostActionNotificationText", "all"),
                        post_action_redirect_url: element.getOption("optinPostActionRedirectURL", "all"),
                        post_action_redirect_autofill: element.getOption("optinPostActionRedirectAutofill", "all"),
                        post_action_popoverlay_trigger: element.getOption("optinPostActionPopOverlayTrigger", "all"),
                        post_action_funnel_step: element.getOption("optinPostActionFunnelStep", "all"),
                        gdpr_activate: element.getOption("optinGdprActivate", "all"),
                        gdpr_consent1_tag_confirmed: element.getOption("optinGdprConsent1TagConfirmed", "all"),
                        gdpr_consent1_tag_declined: element.getOption("optinGdprConsent1TagDeclined", "all"),
                        gdpr_consent1_tag_not_shown: element.getOption("optinGdprConsent1TagNotShown", "all"),
                        gdpr_consent2_tag_confirmed: element.getOption("optinGdprConsent2TagConfirmed", "all"),
                        gdpr_consent2_tag_declined: element.getOption("optinGdprConsent2TagDeclined", "all"),
                        gdpr_consent2_tag_not_shown: element.getOption("optinGdprConsent2TagNotShown", "all"),
                        gdpr_field_note: element.getOption("optinGdprFieldNote", "all"),
                        message_from_name: element.getOption("contactMessageFromName", "all"),
                        message_from_email: element.getOption("contactMessageFromEmail", "all"),
                        message_subject: element.getOption("contactMessageSubject", "all"),
                        message_text: element.getOption("contactMessageText", "all"),
                        confirmation_message_send: element.getOption("contactConfirmationSend", "all"),
                        confirmation_message_from_name: element.getOption("contactConfirmationFromName", "all"),
                        confirmation_message_from_email: element.getOption("contactConfirmationFromEmail", "all"),
                        confirmation_message_subject: element.getOption("contactConfirmationSubject", "all"),
                        confirmation_message_text: element.getOption("contactConfirmationText", "all"),
                    };

                if (data.integration === "leadlovers") {
                    data.email_sequence = element.getOption("optinEmailSequence", "all");
                    data.sequence_level = element.getOption("optinSequenceLevel", "all");
                }

                // set fields to initial values
                for (var prop in data) {
                    this.$ui.fields
                        .filter('[name="' + prop + '"]')
                        .val(data[prop])
                        .trigger("change");
                }

                this.$ui.stepsItem
                    .eq(3)
                    .find(".op3-wizard-extra-fields")
                    .empty();
            },

            _setForm: function(fields) {
                var element = this.form,
                    data = this.serialize(),
                    provider = data.integration,
                    integration = that.find(provider),
                    tags = null;

                integration.getTags(function(data) {
                    tags = data;
                });

                // Convert tags
                if (Array.isArray(data.tag)) {
                    data.tag = data.tag.join(",");
                }

                // Convert lists
                if (Array.isArray(data.list)) {
                    data.list = data.list.join(",");
                }

                // set form element properties
                OP3.$(element)
                    .setOption("optinIntegration", data.integration, "all")
                    .setOption("adminEmail", data.admin_email, "all")
                    .setOption("optinList", data.list, "all")
                    .setOption("optinTag", data.tag, "all")
                    .setOption("optinGoal", data.goal, "all")
                    .setOption("optinForm", data.form, "all")
                    .setOption("optinEmailSequence", data.email_sequence, "all")
                    .setOption("optinSequenceLevel", data.sequence_level, "all")
                    .setOption("optinWebhookUrl", data.webhook_url, "all")
                    .setOption("optinFormId", data.form_id, "all")
                    .setOption("optinDoubleOptin", data.double_optin, "all")
                    .setOption("optinAction", data.action, "all")
                    .setOption("optinPostAction", data.post_action, "all")
                    .setOption("optinPostActionNotificationText", data.post_action_notification_text, "all")
                    .setOption("optinPostActionRedirectURL", data.post_action_redirect_url, "all")
                    .setOption("optinPostActionRedirectAutofill", data.post_action_redirect_autofill, "all")
                    .setOption("optinPostActionPopOverlayTrigger", data.post_action_popoverlay_trigger || "", "all")
                    .setOption("optinPostActionFunnelStep", data.post_action_funnel_step || "", "all")
                    .setOption("optinGdprActivate", data.gdpr_activate, "all")
                    .setOption("optinGdprConsent1TagConfirmed", data.gdpr_consent1_tag_confirmed, "all")
                    .setOption("optinGdprConsent1TagDeclined", data.gdpr_consent1_tag_declined, "all")
                    .setOption("optinGdprConsent1TagNotShown", data.gdpr_consent1_tag_not_shown, "all")
                    .setOption("optinGdprConsent2TagConfirmed", data.gdpr_consent2_tag_confirmed, "all")
                    .setOption("optinGdprConsent2TagDeclined", data.gdpr_consent2_tag_declined, "all")
                    .setOption("optinGdprConsent2TagNotShown", data.gdpr_consent2_tag_not_shown, "all")
                    .setOption("contactMessageFromName", data.message_from_name, "all")
                    .setOption("contactMessageFromEmail", data.message_from_email, "all")
                    .setOption("contactMessageSubject", data.message_subject, "all")
                    .setOption("contactMessageText", data.message_text, "all")
                    .setOption("contactConfirmationSend", data.confirmation_message_send, "all")
                    .setOption("contactConfirmationFromName", data.confirmation_message_from_name, "all")
                    .setOption("contactConfirmationFromEmail", data.confirmation_message_from_email, "all")
                    .setOption("contactConfirmationSubject", data.confirmation_message_subject, "all")
                    .setOption("contactConfirmationText", data.confirmation_message_text, "all")
                    .setOption("optinGdprFieldNote", data.gdpr_field_note, "all")
                    .setOption("optinHtml", data.html, "all");

                // empty form (leave button)
                OP3.$(element)
                    .children()
                    .each(function(index, node) {
                        var $item = OP3.$(node);
                        if ($item.type() === "button" || $item.spec() === "dummy")
                            return;

                        if ($item.type() !== "fieldset")
                            this._saveFieldData(node);

                        $item.detach();
                    }.bind(this));

                // prepend gdpr fields
                if (data.gdpr_activate !== "off") {
                    if (!!(data.gdpr_consent2_visible*1)) {
                        var field = OP3.$('<checkbox spec="gdpr2" />')
                            .prependTo(element)
                            .setOption("typeAttr", "checkbox", "all")
                            .setOption("visible", "1", "all")
                            .setOption("visibleLock", "1", "all")
                            .setOption("required", "0", "all")
                            //.setOption("requiredLock", "1", "all")
                            .setOption("name", "optin-gdpr-consent-2", "all")
                            .setOption("html", "<div>GDPR Consent 2 Message</div>", "all")
                            .setOption("value", "1", "all");

                        this._loadFieldData(field);
                    }
                    if (!!(data.gdpr_consent1_visible*1)) {
                        var field = OP3.$('<checkbox spec="gdpr1" />')
                            .prependTo(element)
                            .setOption("typeAttr", "checkbox", "all")
                            .setOption("visible", "1", "all")
                            .setOption("vis ibleLock", "1", "all")
                            .setOption("required", "0", "all")
                            //.setOption("requiredLock", "1", "all")
                            .setOption("name", "optin-gdpr-consent-1", "all")
                            .setOption("html", "<div>GDPR Consent 1 Message</div>", "all")
                            .setOption("value", "1", "all");

                        this._loadFieldData(field);
                    }
                }

                // Extra fields
                var $extraFieldsStep = this.$ui.stepsItem.eq(3);
                var $extraFields = $extraFieldsStep.find(".op3-wizard-extra-field:not(.op3-wizard-extra-field-message)");

                $extraFields
                    .toArray()
                    .reverse()
                    .forEach(function(value) {
                        var $field = $(value);
                        var props = [];

                        $field
                            .find("[name]")
                            .each(function(index, value) {
                                var $element = $(value);
                                var name = $element.attr("name");
                                props[name] = $element.val();
                            });

                        if (!props.extra_field_label || !props.extra_field_save_as || !props.extra_field_type) {
                            $field.remove();
                            return true;
                        }

                        if (props.extra_field_type === "select") {
                            var name = props.extra_field_save_as === "custom_field" ? props.extra_field_custom_field : "";
                            // Create select element
                            var field = OP3.$("<" + props.extra_field_type + " />")
                                .prependTo(element)
                                .setOption("extraField", "1", "all")
                                .setOption("extraFieldSaveAs", props.extra_field_save_as, "all")
                                .setOption("name", name, "all")
                                .setOption("html", "<div>" + props.extra_field_label + "</div>", "all")
                                .setOption("selectPlaceholder", props.extra_field_label, "all")

                            // Add options to select element
                            var placeholder = name === "schedule" ? OP3._("Select time and date") : OP3._("None");
                            var options = '<option value="">' + placeholder + '</option>';
                            if (props.extra_field_save_as === "custom_field") {
                                $field
                                    .find('[name="extra_field_option_title')
                                    .each(function() {
                                        var $input = $(this),
                                            value = $input.val();

                                        options += '<option value="' + value + '">' + value + '</option>';
                                    });
                            } else if (props.extra_field_save_as === "tag" && props.extra_field_tags) {
                                $field
                                    .find('[name="extra_field_tag_label"]')
                                    .each(function(index, value) {
                                        var $input = $(this);
                                        options += '<option value="' + $input.attr("data-tag-id") + '">' + $input.val() + '</option>';
                                    });
                            }
                            field.setOption("options", options, "all");
                        } else if (props.extra_field_type === "checkbox" || props.extra_field_type === "radiobutton") {
                            // Create fieldset element to wrap checkbox elements
                            var fieldset = OP3.$("<fieldset />")
                                .setOption("extraField", "1", "all")
                                .setOption("extraFieldSaveAs", props.extra_field_save_as, "all")
                                .setOption("html", props.extra_field_label, "all");

                            var name = props.extra_field_save_as === "custom_field" ? props.extra_field_custom_field : "";
                            if (props.extra_field_save_as === "custom_field") {
                                $field
                                    .find('[name="extra_field_option_title')
                                    .each(function() {
                                        var $input = $(this),
                                            value = $input.val();

                                        OP3.$("<" + props.extra_field_type + " />")
                                            .appendTo(fieldset)
                                            .setOption("extraField", "1", "all")
                                            .setOption("name", name, "all")
                                            .setOption("html", "<div>" + value + "</div>", "all")
                                            .setOption("value", value, "all");
                                    });
                            } else if (props.extra_field_save_as === "tag" && props.extra_field_tags) {
                                $field
                                    .find('[name="extra_field_tag_label"]')
                                    .each(function(index, value) {
                                        var $input = $(this);
                                        OP3.$("<" + props.extra_field_type + " />")
                                            .appendTo(fieldset)
                                            .setOption("extraField", "1", "all")
                                            .setOption("name", name, "all")
                                            .setOption("html", "<div>" + $input.val() + "</div>", "all")
                                            .setOption("value", $input.attr("data-tag-id"), "all");
                                    });
                            }

                            fieldset
                                .prependTo(element);
                        } else if (props.extra_field_type.indexOf("input-") === 0) {
                            var name = props.extra_field_save_as === "custom_field" ? props.extra_field_custom_field : "";

                            // Input type is extracted from the option name
                            // eg. input-number becomes <input type="number" />
                            var types = props.extra_field_type.split("-");
                            var fieldType = types[0];
                            var typeAttr = types[1];

                            // Create input element
                            var field = OP3.$("<" + fieldType + " />")
                                .prependTo(element)
                                .setOption("extraField", "1", "all")
                                .setOption("extraFieldSaveAs", props.extra_field_save_as, "all")
                                .setOption("name", name, "all")
                                .setOption("html", "<div>" + props.extra_field_label + "</div>", "all")
                                .setOption("placeholder", props.extra_field_label, "all")
                                .setOption("op3Icon", this._getFieldIcon(typeAttr), "all")
                                .setOption("typeAttr", typeAttr, "all");

                            if (typeAttr === "hidden") {
                                field.setOption("display", "none", "all");
                            }
                        } else if (props.extra_field_type == "textarea") {
                            var name = props.extra_field_save_as === "custom_field" ? props.extra_field_custom_field : "";

                            // Create textarea element
                            var field = OP3.$("<" + props.extra_field_type + " />")
                                .prependTo(element)
                                .setOption("extraField", "1", "all")
                                .setOption("extraFieldSaveAs", props.extra_field_save_as, "all")
                                .setOption("name", name, "all")
                                .setOption("html", "<div>" + props.extra_field_label + "</div>", "all")
                                .setOption("op3Icon", this._getFieldIcon("textarea"), "all")
                                .setOption("placeholder", props.extra_field_label, "all");
                        }
                    }.bind(this));

                // filter selected, sort, reverse, iterate
                // and prepend fields to form
                fields
                    .filter(function(item) {
                        return data.fields.indexOf(item.id) !== -1;
                    })
                    .sort(function(a, b) {
                        return a.order - b.order;
                    })
                    .reverse()
                    .forEach(function(item) {
                        // @todo - child type
                        // (only input, checkbox, select for now)
                        var selector = null;
                        var type = "text";
                        if (item.type === "hidden")
                            selector = 'input spec="hidden"';
                        else if (item.type === "text")
                            selector = "input";
                        else if (item.type === "email") {
                            selector = "input";
                            type = "email";
                        }
                        else if (item.type === "checkbox") {
                            selector = "checkbox";
                            type = "checkbox";
                        }
                        else if (item.type === "radiobutton") {
                            selector = "radiobutton";
                            type = "radio";
                        }
                        else if (item.type === "select") {
                            selector = "select";
                            type = "select";
                        }
                        else if (item.type === "date") {
                            selector = "input";
                            type = "date";
                        }
                        else if (item.type === "tel") {
                            selector = "input";
                            type = "tel";
                        }
                        else if (item.type === "textarea") {
                            selector = "textarea";
                            type = "textarea";
                        }
                        if (!selector)
                            return;

                        // prepend new field and set properties
                        var field = OP3.$("<" + selector + " />");
                        this._loadFieldData(field);

                        field
                            .prependTo(element)
                            .setOption("typeAttr", type, "all")
                            .setOption("visible", item.type !== "hidden" ? "1" : "0", "all")
                            .setOption("visibleLock", item.required ? "1" : "0", "all")
                            .setOption("required", item.required ? "1" : "0", "all")
                            .setOption("requiredLock", item.required ? "1" : "0", "all")
                            .setOption("name", (item.id || ""), "all")
                            .setOption("html", "<div>" + (item.label || "<br />") + "</div>", "all")
                            .setOption("placeholder", ("Enter your " + (item.label ? item.label.toLowerCase() : "")), "all")
                            .setOption("op3Icon", this._getFieldIcon(item.id), "all")
                            .setOption("value", (item.value || ""), "all")

                        // Get select options and fill element with it
                        if (item.type === "select" && item.values) {
                            var placeholder = item.id === "schedule" ? OP3._("Select time and date") : OP3._("None");
                            var html = '<option value="" default selected>' + placeholder + '</option>';
                            item.values.forEach(function(option) {
                                html += '<option value="' + option.value + '">' + option.label + '</option>';
                            });
                            field.setOption("options", html, "all");
                        }

                    }.bind(this));

                OP3.transmit("elementoptionsrefreshrequest", { property: [ "children" ] });
                OP3.transmit("integrationformreset", { node: element.node() });
            },

            _handleAddNewIntegrationClick: function(e) {
                var node = this.$ui.element.get(0),
                    doc = node.ownerDocument,
                    jq = doc.defaultView.jQuery;

                // the link click will open new tab with integrations
                // to edit. we will reload our integrations when our
                // tab gets focus back. we need a little timeout to
                // make sure new tab is opened. not the ideal way
                // to handle integration changes, but...
                setTimeout(function(wizard) {
                    if (doc.hidden)
                        jq(doc).one("visibilitychange", function(e) {
                            wizard.$ui.element
                                .addClass("op3-wizard-loading");

                            that.refresh(wizard._prepareStep1.bind(wizard));
                        });
                }, 500, this);
            },

            _handleRefreshListTagsClick: function(e) {
                e.preventDefault();

                this.$ui.element
                    .addClass("op3-wizard-loading");

                var provider = this.$ui.steps.attr("data-integration") || "",
                    step = this.step(),
                    integration = that.find(provider),
                    callback = this["_prepareStep" + step].bind(this);

                integration.getDetailsNoCache(callback);
            },
        },
    });

    /**
     * window.OP3.Integrations object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Integration data
         *
         * @type {Object}
         */
        _data: null,

        /**
         * Pending flag
         *
         * @type {Boolean}
         */
        _pending: false,

        /**
         * Query jobs
         *
         * @type {Array}
         */
        _queue: [],

        _appendToQueue: function(method, args, callback) {
            var queue = [ method, args, callback ];
            that._queue.push(queue);

            that._startQueueJob();
        },

        _startQueueJob: function() {
            if (!that._queue.length || that._pending)
                return;

            that._pending = true;

            var queue = that._queue.shift(),
                method = queue[0],
                args = queue[1],
                callback = queue[2],
                decorator = function() {
                    that._pending = false;
                    that._startQueueJob();

                    that._callback(callback, arguments);
                };

            args.push(decorator);
            if (typeof that[method] === "function")
                that[method].apply(that, args);
            else
                that._callback(callback);
        },

        _callback: function(callback, args) {
            if (typeof callback !== "function")
                return;

            callback.apply(that, args || []);
        },

        _requestInitial: function(callback) {
            that._data = [];

            return OP3.Ajax.request({
                url: "optin/integrations/all/" + OP3.Meta.pageId,
                success: function(response, textStatus, jqXHR) {
                    that._data = response.data;
                    that._callback(callback, [ that.data() ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestConnected: function(callback) {
            return OP3.Ajax.request({
                url: "optin/integrations/connected",
                success: function(response, textStatus, jqXHR) {
                    var providers = response.data
                        .filter(function(item) {
                            return item.connected;
                        })
                        .map(function(item) {
                            return item.provider;
                        });

                    // iterate integration and find connected status changes
                    that._data.forEach(function(item, index) {
                        var newIndex = providers.indexOf(item.provider);

                        // integration disconnected
                        if (newIndex === -1 && item.connected)
                            that._data[index].connected = false;

                        // integration connected
                        else if (newIndex !== -1 && !item.connected)
                            that._data[index].connected = true;
                    });

                    that._callback(callback, [ that.data() ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestRefresh: function(callback) {
            if (that._data)
                return that._requestConnected(callback)
            else
                return that._requestInitial(callback)
        },

        _requestDetails: function(provider, noCache, callback) {
            var integration = that.find(provider);
            if (!integration.exists)
                return that._callback(callback, [ null ]);

            var data = that._data[integration._index],
                url = "optin/integrations/" + provider;
            if (noCache) {
                if (data.has_lists && data.lists)
                    data.lists = null;
                if (data.has_tags && data.tags)
                    data.tags = null;
                if (data.has_forms && data.forms)
                    data.forms = null;
                if (data.has_goals && data.goals)
                    data.goals = null;

                url += "?no-cache=1";
            }

            var request = false
                || ((data.connection_requirements || "none") === "none" && !data.fields)
                || ((data.connection_requirements || "none") === "admin_email" && !data.fields)
                || (data.has_lists && !data.lists)
                || (data.has_tags && !data.tags)
                || (data.has_forms && !data.forms)
                || (data.has_goals && !data.goals)
                || (data.has_webhook_url);
            if (!request)
                return that._callback(callback, [ integration ]);

            return OP3.Ajax.request({
                url: url,
                success: function(response, textStatus, jqXHR) {
                    that._data[integration._index] = response.data;
                    that._callback(callback, [ integration ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestListDetails: function(provider, list, callback) {
            var index = this.index(provider, list);

            if (index[0] === -1 || index[1] === -1)
                return that._callback(callback, [ null ]);

            var data = this._data[index[0]].lists[index[1]].fields;
            if (data)
                return that._callback(callback, [ data ]);

            return OP3.Ajax.request({
                url: "optin/integrations/" + provider + "/fields/" + list,
                success: function(response, textStatus, jqXHR) {
                    that._data[index[0]].lists[index[1]].fields = response.data;
                    that._callback(callback, [ that._data[index[0]].lists[index[1]].fields ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        /**
         * Request fields details
         *
         * @param {String} provider
         * @param {String} data (optional) provide some data to getFields method
         * @param {Boolean} noCache
         * @param {Function} callback
         * @returns {Void}
         */
        _requestFieldsDetails: function(provider, data, noCache, callback) {
            var index = this.index(provider);

            if (index[0] === -1)
                return that._callback(callback, [ null ]);

            var cache = this._data[index].fields;
            if (cache && !noCache)
                return that._callback(callback, [ cache ]);

            return OP3.Ajax.request({
                method: "POST",
                url: "optin/integrations/" + provider + "/fields",
                data: JSON.stringify({
                    list: data,
                    noCache: noCache || false,
                }),
                success: function(response, textStatus, jqXHR) {
                    that._data[index].fields = response.data;
                    that._callback(callback, [ that._data[index].fields ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestFields: function(provider, list, tag, callback) {
            that._requestDetails(provider, false, function(item) {
                if (item.connectionRequirements === "none")
                    return that._callback(callback, [ that._data[item._index].fields ]);
                // Avoiding cache for hubspot because user choose only form
                // fresh data from hubspot api must be served
                else if (provider === "hubspot")
                    return that._requestFieldsDetails(provider, list, true, callback);
                else if (item.connectionRequirements === "admin_email")
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "list" && list && item.newLists)
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "list" && list)
                    return that._requestListDetails(provider, list, callback);
                else if (item.connectionRequirements === "list_or_tag" && list)
                    return that._requestListDetails(provider, list, callback);
                else if (item.connectionRequirements === "list_or_tag" && !list && tag)
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "list_and_tag" && list && tag)
                    return that._requestListDetails(provider, list, callback);
                else if (item.connectionRequirements === "list_and_emailSequence_and_sequenceLevel" && list)
                    return that._requestListDetails(provider, list, callback);
                else if (item.connectionRequirements === "tag" && tag)
                    return that._callback(callback, [ that._data[item._index].fields ]);
                else if (item.connectionRequirements === "webhook_url")
                    return that._requestFieldsDetails(provider, "all", false, callback);
                else if (item.connectionRequirements === "html") {
                    var html = this._wizard.$ui.fields.filter('[name="html"]').val();
                    return that._requestFieldsDetails(provider, html, true, callback);
                } else
                    return that._callback(callback, [ null ]);
            });
        },

        _requestForms: function(provider, list, callback) {
            var index = this.index(provider, list);
            if (index[0] === -1 || index[1] === -1)
                return that._callback(callback, [ null ]);

            var data = this._data[index[0]].lists[index[1]];
            if (data.forms)
                return that._callback(callback, [ data.forms ]);

            return OP3.Ajax.request({
                url: "optin/integrations/" + provider + "/forms?listId=" + list,
                success: function(response, textStatus, jqXHR) {
                    that._data[index[0]].lists[index[1]].forms = response.data;
                    that._callback(callback, [ that._data[index[0]].lists[index[1]].forms ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },


        _requestEmailSequences: function(provider, list, callback) {
            var index = this.index(provider, list);
            if (index[0] === -1 || index[1] === -1)
                return that._callback(callback, [ null ]);

            var data = this._data[index[0]].lists[index[1]];
            if (data.emailSequences)
                return that._callback(callback, [ data.emailSequences ]);

            return OP3.Ajax.request({
                url: "optin/integrations/" + provider + "/emailSequences?listId=" + list,
                success: function(response, textStatus, jqXHR) {
                    that._data[index[0]].lists[index[1]].emailSequences = response.data;
                    that._callback(callback, [ that._data[index[0]].lists[index[1]].emailSequences ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        _requestSequenceLevels: function(provider, list, sequenceCode, callback) {
            var index = this.index(provider, list);
            if (index[0] === -1 || index[1] === -1)
                return that._callback(callback, [ null ]);

            var data = this._data[index[0]].lists[index[1]];
            var found = (data.emailSequences || []).find(function(item) {
                return item.SequenceCode == sequenceCode;
            });

            if (found && found.sequenceLevel)
                return that._callback(callback, [ found.sequenceLevel ]);

            return OP3.Ajax.request({
                url: "optin/integrations/" + provider + "/sequenceLevels?listId=" + list + "&sequenceCode=" + sequenceCode,
                success: function(response, textStatus, jqXHR) {
                    found.sequenceLevel = response.data;
                    that._callback(callback, [ found.sequenceLevel ]);
                },
                error: that._handleAjaxError.bind(that),
            });
        },

        /**
         * Get list of OP3_Integration objects
         *
         * @return {Array}
         */
        data: function() {
            if (!that._data)
                return that._data;

            return that._data.map(function(item, index) {
                return new OP3_Integration(index);
            });
        },

        /**
         * Search for integration (from config)
         * by it's uid/provider/title and return it's
         * _config index
         *
         * Addition: list argument (result is array
         * of integration/list indexes)
         *
         * @param  {String} provider (optional)
         * @param  {String} list        (optional)
         * @return {Number}
         */
        index: function(provider, list) {
            var re = /[\W_]+/g;
            var id = provider ? provider.toString().replace(re, "_").toLowerCase() : null;
            var result = -1;

            if (that._data && provider) {
                for (var i = 0; i < that._data.length; i++) {
                    if (that._data[i].uid !== null && that._data[i].uid.toString().trim().replace(re, "_").toLowerCase() == id) {
                        result = i; break;
                    }
                    if (that._data[i].provider !== null && that._data[i].provider.toString().trim().replace(re, "_").toLowerCase() == id) {
                        result = i; break;
                    }
                    if (that._data[i].title !== null && that._data[i].title.toString().trim().replace(re, "_").toLowerCase() == id) {
                        result = i; break;
                    }
                }
            }
            if (that._data && provider && list) {
                result = [ result, -1 ];
                if (that._data[result[0]].lists)
                    for (var i = 0; i < that._data[result[0]].lists.length; i++) {
                        if (that._data[result[0]].lists[i].id == list) {
                            result[1] = i;
                            break;
                        }
                    }
            }

            return result;
        },

        /**
         * Search for integration (from
         * that._data) by it's id/title
         * and return  OP3_Integration
         * object
         *
         * @param  {String} provider
         * @return {Object}
         */
        find: function(provider) {
            return new OP3_Integration(that.index(provider));
        },

        /**
         * Get integration list
         *
         * @param  {Function} callback
         * @return {Void}
         */
        refresh: function(callback) {
            that._appendToQueue("_requestRefresh", [], callback);
        },

        /**
         * Get integration details
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getDetails: function(provider, callback) {
            that._appendToQueue("_requestDetails", [ provider, false ], callback);
        },

        /**
         * Get integration details
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getDetailsNoCache: function(provider, callback) {
            that._appendToQueue("_requestDetails", [ provider, true ], callback);
        },

        /**
         * Get integration lists
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getLists: function(provider, callback) {
            that.getDetails(provider, function(item) {
                var data = that._data[item._index].lists || null;
                that._callback(callback, [ data ]);
            });
        },

        /**
         * Get integration tags
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getTags: function(provider, callback) {
            that.getDetails(provider, function(item) {
                var data = that._data[item._index].tags || null;
                that._callback(callback, [ data ]);
            });
        },

        /**
         * Get integration goals
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getGoals: function(provider, callback) {
            that.getDetails(provider, function(item) {
                var data = that._data[item._index].goals || null;
                that._callback(callback, [ data ]);
            });
        },

        /**
         * Get integration forms
         *
         * @param  {String}   provider
         * @param  {Function} callback
         * @return {Void}
         */
        getForms: function(provider, list, callback) {
            that._requestForms(provider, list, callback);
        },

        /**
         * Get integration emailSequences
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {Function} callback
         * @return {Void}
         */
        getEmailSequences: function(provider, list, callback) {
            that._requestEmailSequences(provider, list, callback);
        },

        /**
         * Get integration sequence levels
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {Function} callback
         * @return {Void}
         */
        getSequenceLevels: function(provider, list, sequenceCode, callback) {
            that._requestSequenceLevels(provider, list, sequenceCode, callback);
        },

        /**
         * Get integration fields for
         * selected list and tag
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {String}   tag
         * @param  {Function} callback
         * @return {Void}
         */
        getFields: function(provider, list, tag, callback) {
            that._appendToQueue("_requestFields", [ provider, list, tag ], callback);
        },

        /**
         * Get integration list detail
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {Function} callback
         * @return {Void}
         */
        getListDetails: function(provider, list, callback) {
            that.getLists(provider, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (list == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration tag detail
         *
         * @param  {String}   provider
         * @param  {String}   tag
         * @param  {Function} callback
         * @return {Void}
         */
        getTagDetails: function(provider, tag, callback) {
            that.getTags(provider, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (tag == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration field detail
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {String}   tag
         * @param  {String}   field
         * @param  {Function} callback
         * @return {Void}
         */
        getFieldDetails: function(provider, list, tag, field, callback) {
            that.getFields(provider, list, tag, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (field == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration goal detail
         *
         * @param  {String}   provider
         * @param  {String}   goal
         * @param  {Function} callback
         * @return {Void}
         */
        getGoalDetails: function(provider, goal, callback) {
            that.getGoals(provider, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (goal == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration form detail
         *
         * @param  {String}   provider
         * @param  {String}  form
         * @param  {Function} callback
         * @return {Void}
         */
        getFormDetails: function(provider, list, form, callback) {
            if (!list || !form) {
                return that._callback(callback, [ null ]);
            }

            that.getForms(provider, list, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (form == data[i].id)
                        return that._callback(callback, [ data[i] ]);
                }

                return that._callback(callback, [ null ]);
            });
        },

        /**
         * Get integration email sequence details
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {String}   email_sequence
         * @param  {Function} callback
         * @return {Void}
         */
        getEmailSequenceDetails: function(provider, list, email_sequence, callback) {
            if (provider !== "leadlovers" || !list || !email_sequence) {
                return that._callback(callback, [ null ]);
            }

            that.getEmailSequences(provider, list, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (email_sequence == data[i].SequenceCode)
                        return that._callback(callback, [ data[i] ]);
                }
            });
        },

        /**
         * Get integration sequence level details
         *
         * @param  {String}   provider
         * @param  {String}   list
         * @param  {String}   email_sequence
         * @param  {String}   sequence_level
         * @param  {Function} callback
         * @return {Void}
         */
        getSequenceLevelDetails: function(provider, list, email_sequence, sequence_level, callback) {
            if (provider !== "leadlovers" || !list || !email_sequence || !sequence_level) {
                return that._callback(callback, [ null ]);
            }

            that.getSequenceLevels(provider, list, email_sequence, function(data) {
                for (var i = 0; i < (data || []).length; i++) {
                    if (sequence_level == data[i].Sequence)
                        return that._callback(callback, [ data[i] ]);
                }
            });
        },

        /**
         * Ajax request error event handler:
         * emit error
         *
         * @param  {Object} jqXHR
         * @param  {String} textStatus
         * @param  {String} errorThrown
         * @return {Void}
         */
        _handleAjaxError: function(jqXHR, textStatus, errorThrown) {
            // @todo???
        },

        /**
         * Integration wizard object
         *
         * @return {Object}
         */
        wizard: function() {
            if (!that._wizard)
                that._wizard = new OP3_Integrations_Wizard();

            return that._wizard;
        },

        /**
         * Open wizard for active element
         *
         * @return {Void}
         */
        openWizard: function() {
            var wizard = that.wizard();
            wizard.form = OP3.Designer.activeElement();
            if (!wizard.form)
                return;

            // Clean up the cached integration
            // (in case another element is opened)
            wizard.$ui.steps.attr("data-integration", "");

            wizard.step(0);
            wizard.step(1);

            // Skip step 1 when using Contact Form
            if (wizard.$ui.steps.attr("data-integration") === "contact") {
                wizard.$ui.element.addClass("op3-wizard-contact");
                wizard.step(2);
            } else {
                wizard.$ui.element.removeClass("op3-wizard-contact");
            }

            wizard.show();
        },

    }

    // globalize (designer)
    window.OP3.Integrations = that;

    // link (live-editor)
    OP3.bind("domcontentloaded::designer", function(e, o) {
        window.parent.OP3.Integrations = that;
    });

    // import integrations from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        that._data = o.integrations;
    });

    // show wizard on .op3-wizard-integration-trigger click
    $(window.parent.document)
        .on("click", ".op3-wizard-integration-trigger", function(e) {
            that.openWizard();
        });

})(jQuery, window, document);
