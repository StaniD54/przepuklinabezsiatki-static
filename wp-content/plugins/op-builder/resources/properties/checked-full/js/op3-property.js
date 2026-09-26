/**
 * OptimizePress3 element.
 *
 * Acts similar as OP3.Elements._extension.prop.Checked:
 * getter returns full attribute name with value
 *
 * The point of this property is that we can use
 * element markup with or without attribute.
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
    OP3.Elements._extension.prop.CheckedFull = OP3.defineClass({

        Name: "OP3.Property.CheckedFull",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "checkedFull",

            _defaults: {
                label: function() {
                    return OP3._("Checked Full");
                },
                hidden: true,
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                // proxy property is property that has id as this
                // object (without keyword 'Full' at the end)
                var prop = this.id().replace(/Full$/, "");
                this._proxy = this.element.findProperty(prop);

                return this.proxy();
            },

            reset: function() {
                // preserve
            },

            computed: function (media) {
                var proxy = this.proxy(),
                    name = proxy.name(),
                    value = proxy.computed(media),
                    result = value === "1" ? 'checked="checked"' : "";

                return result;
            },

            setter: function (value, media) {
                if (value === "checked")
                    value = 'checked="checked"';

                var proxy = this.proxy(),
                    target  = proxy.target(),
                    result = (value || "").trim() === 'checked="checked"';

                if (result)
                    $(target).attr('checked', 'checked');
                else
                    $(target).removeAttr('checked');
            },

        },

    });

    // sync proxy properties
    OP3.bind("elementchange::*::checked", function(e, o) {
        var element = OP3.$(o.node).element() || OP3.Document;
        var prop = element.findProperty(o.id + "Full");
        if (!prop)
            return;

        var valueBefore = o.value.before === "1" ? 'checked="checked"' : "";
        var valueAfter = o.value.after === "1" ? 'checked="checked"' : "";

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
                before: valueBefore,
                after: valueAfter,
            },
        }

        // force elementchange be cause there is no difference
        // before/after inside hrefFull property (value already
        // changed by href property)
        prop.setter(valueAfter, o.media);

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
