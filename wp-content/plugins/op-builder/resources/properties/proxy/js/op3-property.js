/**
 * OptimizePress3 Proxy property.
 *
 * You can use this to change other element property. Just make sure
 * you provide element/id in properties argument on constructor.
 *
 * Example:
 * >>   OP3.defineClass({
 *          Name: "OP3.Element.NewElement",
 *          Extends: OP3.Elements._extension.type.Default,
 *          Constructor: function(arg) {
 *              return OP3.Elements._extension.type.Default.apply(this, arguments);
 *          },
 *          Prototype: {
 *              _type: "newElement",
 *              _props: function() {
 *                  return [
 *                      [ OP3.Elements._extension.prop.Proxy, { element: OP3.Document, id: "targetedPropertyId" } ],
 *                  ];
 *              },
 *          },
 *      });
 *
 * Important:
 * Changing element option on proxy element (element from constructor,
 * OP3.Document on example above) won't sync property widget on current
 * element (OP3.Element.NewElement on example above). Fix this by
 * adding something like this:
 * >>   OP3.bind("elementchange::document::targetedPropertyId", function(e, o) {
 *          if (OP3.Designer.activeElement().type() === "newElement")
 *              OP3.transmit("elementoptionssyncrequest", { property: [ o.id ] });
 *      });
 *
 * For more advanced usage see:
 * ./resources/elements/tcp_all/js/op3-element.js
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
    OP3.Elements._extension.prop.Proxy = OP3.defineClass({

        Name: "OP3.Property.Proxy",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            var result = OP3.Elements._extension.prop.Default.apply(this, arguments);

            // Validate.
            if (!properties || !properties.id)
                throw this.ns() + ": constructor properties argument (id key) is mandatory.";
            if (!properties.element)
                throw this.ns() + ": constructor properties argument (element key) is mandatory.";

            var id = properties.id;
            if (typeof id === "function")
                id = id().toString();
            if (!id)
                throw this.ns() + ": constructor properties argument (id key) is mandatory.";

            var element = properties.element;
            if (typeof element === "function")
                element = element();
            if (!element)
                throw this.ns() + ": constructor properties argument (element key) is mandatory.";
            if (element !== OP3.Document && !(element instanceof OP3.Elements._extension.type.Default))
                throw this.ns() + ": constructor properties argument (element key) must be of OP3_Element_Default instance.";

            // Store proxy property.
            var proxy = element.findProperty(id);
            if (!proxy)
                throw this.ns() + ": can not find property " + id + ".";
            this._proxy = proxy

            // Set protected properties from proxy.
            Object.keys(proxy).forEach(function(key) {
                if (key !== "_proxy")
                    this[key] = proxy[key];
            }.bind(this));

            return result;
        },

        Prototype: {

            _name: "proxy",

            _defaults: {
                serialize: false,
            },

            // ns: function() {
            //     var proxy = this.proxy();
            //     return proxy.ns.apply(proxy, arguments);
            // },

            // id: function() {
            //     var proxy = this.proxy();
            //     return proxy.id.apply(proxy, arguments);
            // },

            // name: function() {
            //     var proxy = this.proxy();
            //     return proxy.name.apply(proxy, arguments);
            // },

            selector: function() {
                var proxy = this.proxy();
                return proxy.selector.apply(proxy, arguments);
            },

            target: function() {
                var proxy = this.proxy();
                return proxy.target.apply(proxy, arguments);
            },

            proxy: function() {
                return this._proxy;
            },

            cssStyle: function(media, createOnFail) {
                var proxy = this.proxy();
                return proxy.cssStyle.apply(proxy, arguments);
            },

            isNull: function(media) {
                var proxy = this.proxy();
                return proxy.isNull.apply(proxy, arguments);
            },

            isDefault: function(media) {
                var proxy = this.proxy();
                return proxy.isDefault.apply(proxy, arguments);
            },

            prerender: function(media) {
                var proxy = this.proxy();
                return proxy.prerender.apply(proxy, arguments);
            },

            render: function(media) {
                var proxy = this.proxy();
                return proxy.render.apply(proxy, arguments);
            },

            reset: function() {
                var proxy = this.proxy();
                return proxy.reset.apply(proxy, arguments);
            },

            computed: function() {
                var proxy = this.proxy();
                return proxy.computed.apply(proxy, arguments);
            },

            getter: function(media) {
                var proxy = this.proxy();
                return proxy.getter.apply(proxy, arguments);
            },

            setter: function(value, media) {
                return this.proxy().element.setOption(this.id(), value, media);
            },

        },

    });

})(jQuery, window, document);
