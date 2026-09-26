/**
 * OptimizePress3 url property.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.CalendlyUrlBackgroundColor = OP3.defineClass({

        Name: "OP3.Property.CalendlyUrlBackgroundColor",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "calendlyUrlBackgroundColor",

            _defaults: {
                label: function() {
                    return OP3._("Calendly Background Colour");
                },
                attr: {
                    type: "text",
                    "data-property-type": "color",
                    queryStringName: "background_color",
                },
            },
            _forceComputed: true,
            serialize: false,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (without keyword
                // 'QueryString' at end)
                this._proxy = this.element.findProperty(this.id().replace(/BackgroundColor$/, ""));

                return this.proxy();
            },

            computed: function() {
                var proxy = this.proxy();
                var url = proxy.computed();

                try {
                    url = new URL(url);
                } catch (error) {
                    if (url !== "")
                        return;
                }

                if (url instanceof URL && url.search && url.searchParams.get(this._attr.queryStringName))
                    return url.searchParams.get(this._attr.queryStringName)

                return "#fff";
            },


            setter: function(value, media) {
                var proxy = this.proxy();
                var url = proxy.computed();

                if (this._attr["data-property-type"] && this._attr["data-property-type"] === "color")
                    value = new Color(value).toString("hex").replace("#", "");

                try {
                    url = new URL(url);
                    url.searchParams.set(this._attr.queryStringName, value);
                } catch (error) {
                    if (value !== "")
                        return;
                }

                // not using proxy.setter 'cuz not
                // all events will trigger, using
                // proxy.element.setOption instead
                proxy.element.setOption(proxy.id(), url.href, media);
            },


        },

    });

})(jQuery, window, document);
