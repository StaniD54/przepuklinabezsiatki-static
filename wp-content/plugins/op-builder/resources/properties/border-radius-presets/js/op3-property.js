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
    OP3.Elements._extension.prop.BorderRadiusPresets = OP3.defineClass({

        Name: "OP3.Property.BorderRadiusPresets",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "borderRadiusPresets",

            _defaults: {
                label: function() {
                    return OP3._("Corner Style");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2-simple",
                },
                options: function() {
                    return [
                        { id: "", text: "Custom", disabled: true },
                        ...this._presets,
                    ];
                },
                units: [
                    "px",
                    "%",
                ],
                defaultUnit: "px",
                serialize: false,
            },

            _presets: [
                { "0px": "Square" },
                { "5px": "Slightly Rounded" },
                { "10px": "Rounded" },
                { "100px": "Fully Rounded" },
            ],

            _existsInPresets: function(value) {
                if (value && !this._presets.some(element => element[value]) || value === null)
                    return false;

                return true;
            },

            _getProxyId: function(direction) {
                direction = direction
                    // camelcase
                    .replace(/\-([a-z])/, function(match, group) {
                        return group.toUpperCase();
                    })
                    // uppercase first
                    .replace(/^[a-z]/, function(match) {
                        return match.toUpperCase();
                    })
                    // remove dashes
                    .replace(/\-+/, "");

                // remove Presets on end and replace
                // borderRadius with borderDirectionRadius
                var id = this.id(),
                    plain = id.replace(/Presets$/, ""),
                    result = plain.replace("borderRadius", "border" + direction + "Radius");

                return result;
            },

            _getPresetFromProxyValues: function(topLeft, topRight, bottomRight, bottomLeft, media) {
                if (topLeft === null)
                    topLeft = this.element.getOption(this._getProxyId("topLeft"), media);
                if (topRight === null)
                    topRight = this.element.getOption(this._getProxyId("topRight"), media);
                if (bottomRight === null)
                    bottomRight = this.element.getOption(this._getProxyId("bottomRight"), media);
                if (bottomLeft === null)
                    bottomLeft = this.element.getOption(this._getProxyId("bottomLeft"), media);

                var equal = true
                    && topLeft === topRight
                    && topLeft === bottomRight
                    && topLeft === bottomLeft;
                if (!equal || !this._existsInPresets(topLeft))
                    return "";

                return topLeft;
            },

            computed: function() {
                var $target = $(this.target()),
                    topLeft = $target.css("borderTopLeftRadius"),
                    topRight = $target.css("borderTopRightRadius"),
                    bottomRight = $target.css("borderBottomRightRadius"),
                    bottomLeft = $target.css("borderBottomLeftRadius");

                return this._getPresetFromProxyValues(topLeft, topRight, bottomRight, bottomLeft);
            },

            getter: function(media) {
                return this._getPresetFromProxyValues(null, null, null, null, media);
            },

            setter: function(value, media) {
                this.element.setOption(this._getProxyId("topLeft"), value, media);
                this.element.setOption(this._getProxyId("topRight"), value, media);
                this.element.setOption(this._getProxyId("bottomRight"), value, media);
                this.element.setOption(this._getProxyId("bottomLeft"), value, media);
            },
        },

    });

    OP3.bind("elementchange::*::borderTopLeftRadius elementchange::*::borderTopRightRadius elementchange::*::borderBottomRightRadius elementchange::*::borderBottomLeftRadius", function(e, o) {
        var query = OP3.$(o.node),
            element = query.element();
        if (!element && o.node === OP3.Document.node())
            element = OP3.Document;

        var key = o.id.replace(/border.*?Radius/, "borderRadiusPresets"),
            prop = element.findProperty(key);
        if (!prop || !prop._getPresetFromProxyValues)
            return;

        var topLeft, topRight, bottomRight, bottomLeft, valueBefore, valueAfter;
        topLeft = o.name === "borderTopLeftRadius" ? o.value.before : null;
        topRight = o.name === "borderTopRightRadius" ? o.value.before : null;
        bottomRight = o.name === "borderBottomRightRadius" ? o.value.before : null;
        bottomLeft = o.name === "borderBottomLeftRadius" ? o.value.before : null;
        valueBefore = prop._getPresetFromProxyValues(topLeft, topRight, bottomRight, bottomLeft, o.media);

        topLeft = o.name === "borderTopLeftRadius" ? o.value.after : null;
        topRight = o.name === "borderTopRightRadius" ? o.value.after : null;
        bottomRight = o.name === "borderBottomRightRadius" ? o.value.after : null;
        bottomLeft = o.name === "borderBottomLeftRadius" ? o.value.after : null;
        valueAfter = prop._getPresetFromProxyValues(topLeft, topRight, bottomRight, bottomLeft, o.media);

        if (valueBefore === valueAfter)
            return;

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
