/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.DefaultActiveTab = OP3.defineClass({

        Name: "OP3.Property.DefaultActiveTab",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "defaultActiveTab",

            _defaults: {
                label: function() {
                    return OP3._("Default Active Tab");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: function() {
                    var $tabsHeaderItems = $(this.element._node)
                        .find('[data-op3-element-type="tabsheaderitem"]');

                    var options = ($tabsHeaderItems.toArray() || [])
                        .map(function(item, index) {
                            var $item = $(item);
                            var option = {};

                            option[index] = $item.text();

                            return option;
                        });

                    return options;
                },
                selector: " [data-op3-default-active-tab]",
                dataAttribute: "data-op3-default-active-tab",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr(this._defaults.dataAttribute);
            },

            setter: function(value, media) {
                $(this.target()).attr(this._defaults.dataAttribute, value);
            },

        },

    });

})(jQuery, window, document);
