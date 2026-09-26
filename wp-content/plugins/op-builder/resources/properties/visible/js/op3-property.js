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
    OP3.Elements._extension.prop.Visible = OP3.defineClass({

        Name: "OP3.Property.Visible",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "visible",

            _defaults: {
                label: function() {
                    return OP3._("Visible");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                    display: "block",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                serialize: false,
            },

            /**
             * Create option element suitable for live-editor sidebar.
             *
             * Check for requiredLock property on current element and make
             * input DOM element disabled if requiredLock property is "1"
             * on current element. No need for elementchange event listener
             * on requiredLock property since the property is defined by
             * integration, and once is set should be readonly.
             *
             * @param  {String} media (optional)
             * @return {Object}
             */
            prerender: function(media) {
                var result = OP3.Elements._extension.prop.Default.prototype.prerender.apply(this, arguments),
                    lockProperty = this.element.findProperty(this.id() + "Lock"),
                    lockValue = lockProperty ? !!(lockProperty.computed()*1) : false;

                if (lockValue)
                    $(result)
                        .find(".op3-element-options-property-input")
                        .attr("disabled", "disabled");

                return result;
            },

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has
                // id as this object (replacing keyword
                // 'Visible' with 'Display')
                var key = this.id()
                    .replace(/visible/, "display")
                    .replace(/Visible/, "Display");
                this._proxy = this.element.findProperty(key);

                return this.proxy();
            },

            getter: function(media) {
                var value = this.proxy().getter(media);
                if (!value)
                    value = this.proxy().computed();

                return value === "none" ? "0" : "1";
            },

            setter: function(value, media) {
                var key = this.proxy().id();
                value = value == 1 ? this._attr.display : "none";

                // using setOtpion instead setter so
                // all events trigger properly
                this.element.setOption(key, value, media);
            },

        },

    });

    // sync proxy properties
    OP3.bind("elementchange::*::display", function(e, o) {
        var element = OP3.$(o.node).element();
        var key = o.id
            .replace(/display/, "visible")
            .replace(/Display/, "Visible");
        var prop = element.findProperty(key);
        if (!prop)
            return;

        var before, after;
        if (o.value.before === null)
            before = null;
        else if (o.value.before === "none")
            before = "0";
        else
            before = "1";
        if (o.value.after === null)
            after = null;
        else if (o.value.after === "none")
            after = "0";
        else
            after = "1";

        var emit = {
            node: o.node,
            uuid: o.uuid,
            type: o.type,
            media: o.media,
            id: prop.id(),
            name: prop.name(),
            selector: prop._selector,
            serialize: prop._serialize,
            forceComputed: prop._forceComputed,
            important: o.important,
            historyPending: OP3.Designer.isHistoryPending(),
            value: {
                before: before,
                after: after,
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

})(jQuery, window, document);
