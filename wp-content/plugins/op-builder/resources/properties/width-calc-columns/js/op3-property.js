/**
 * OptimizePress3 element.
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
    OP3.Elements._extension.prop.WidthCalcColumns = OP3.defineClass({

        Name: "OP3.Property.WidthCalcColumns",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "widthCalcColumns",

            _defaults: {
                label: function() {
                    return OP3._("Width Layout");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select-buttons",
                },
                options: [
                    { "1": "One Column" },
                    { "2": "Two Column" },
                    { "3": "Three Column" },
                    { "4": "Four Column" },
                ],
                serialize: false,
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has id as this object (without keyword
                // 'CalcColumns')
                this._proxy = this.element.findProperty(this.id().replace(/CalcColumns$/, ""));

                return this.proxy();
            },

            _parse: function(value) {
                var value = value && parseInt(value);
                if (!value)
                    return null;

                if (value === 25)
                    return "4";
                else if (value === 33)
                    return "3";
                else if (value === 50)
                    return "2";

                return "1";
            },

            computed: function() {
                var $el = $(this.element.node()),
                    value = ($el.outerWidth() / $el.parent().width()) * 100,
                    result = this._parse(value + "%"),
                    media = OP3.LiveEditor.deviceMedia();

                return result || this.getter(media) || "1";
            },

            getter: function(media) {
                var value = this.proxy().getter(media);
                var result = this._parse(value);

                return result;
            },

            setter: function(value, media) {
                var width;
                if (!value)
                    width = null;
                else if (value == 4)
                    width = "25%";
                else if (value == 3)
                    width = "33.3333%";
                else if (value == 2)
                    width = "50%";
                else if (value == 1)
                    width = "100%";
                else
                    return;

                this.element.setOption(this.proxy().id(), width, media);
            },

        },

    });

    // sync proxy properties
    /*
    OP3.bind("elementchange::*::width", function(e, o) {
        var proxy = OP3.$(o.node).element().findProperty(o.id + "CalcColumns");
        if (!proxy)
            return;

        var emit = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: proxy.id(),
            name: proxy.name(),
            selector: proxy._selector,
            serialize: proxy._serialize,
            forceComputed: proxy._forceComputed,
            important: o.important,
            historyPending: OP3.Designer.isHistoryPending(),
            value: {
                before: proxy._parse(o.value.before),
                after: proxy._parse(o.value.after),
            },
        }

        OP3.transmit("elementchanging", emit);
        OP3.transmit("elementchanging::" + emit.type, emit);
        OP3.transmit("elementchanging::*::" + emit.name, emit);
        OP3.transmit("elementchanging::" + emit.type + "::" + emit.name, emit);
        OP3.transmit("elementchange", emit);
        OP3.transmit("elementchange::" + emit.type, emit);
        OP3.transmit("elementchange::*::" + emit.name, emit);
        OP3.transmit("elementchange::" + emit.type + "::" + emit.name, emit);
    });
    */

})(jQuery, window, document);
