/**
 * OptimizePress3 CodeHtmlWebinarCalendarsType property.
 *
 * Proxy property for selecting webinar calendar type.
 * Svg-s are loaded from credit_cards config
 * via inital ajax api call and appended
 * to select2.
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.HtmlWebinarCalendarType = OP3.defineClass({

        Name: "OP3.Property.HtmlWebinarCalendarType",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "htmlWebinarCalendarType",

            _defaults: {
                label: function() {
                    return OP3._("Calendar");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: [],
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'Type' at end)
                this._proxy = this.element.findProperty(this.id().replace(/WebinarCalendarType$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var html = proxy.computed();
                if (!html)
                    return "";

                return html;
            },

            getter: function(media) {
                return this.proxy().getter(media);
            },

            setter: function(value, media) {
                var proxy = this.proxy();

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), value, media);
            },

        },

    });

    // load icons from api (redefine options argument)
    OP3.bind("loadelementwebinarcalendar", function(e, o) {
        OP3.Elements._extension.prop.HtmlWebinarCalendarType.prototype._defaults.options = OP3.WebinarCalendar.data();
    });

})(jQuery, window, document);
