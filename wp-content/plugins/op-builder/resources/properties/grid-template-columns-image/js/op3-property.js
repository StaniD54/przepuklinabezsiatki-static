/**
 * OptimizePress3 property:
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.GridTemplateColumnsImage = OP3.defineClass({

        Name: "OP3.Property.GridTemplateColumnsImage",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "gridTemplateColumnsImage",

            _defaults: {
                label: function() {
                    return OP3._("Width");
                },
                selector: " [data-op3-children]",
                attr: {
                    "data-property-type": "range",
                    "data-units": "%",
                    "data-min-percent": "0",
                    "data-max-percent": "100",
                    "data-step-percent": "1",
                    "data-precision-percent": "0",
                },
                units: ["%"],
                serialize: false,
            },

            _forceComputed: true,

            proxy: function() {
                if (this.hasOwnProperty("_proxy"))
                    return this._proxy;

                this._proxy = this.element;
                if (!this._proxy.findProperty("gridTemplateColumns"))
                    this._proxy = OP3.$(this.element).parent().element();

                return this.proxy();
            },

            computed: function() {
                var value = this.proxy()
                    .getOption("gridTemplateColumns");

                if (value === null)
                    value = OP3.$(this.proxy()).parent().element()
                        .getOption("parentGridTemplateColumns");

                // Tablet can inherit from desktop
                // (mobile doesn't since all mobile presets have defined blocklayout)
                if (value === null && OP3.LiveEditor.deviceMedia() === "screen and (max-width: 1023px)") {
                    value = this.proxy()
                        .getOption("gridTemplateColumns", "all");

                    if (value === null)
                        value = OP3.$(this.proxy()).parent().element()
                            .getOption("parentGridTemplateColumns", "all");
                }

                // Default value set in CSS (getcomputedstyle returns value in px)
                if (value === null)
                    return "30%";

                return value.replace("minmax(0px, 100%)", '').trim()
            },

            setter: function(value, media) {
                var proxy = this.proxy();

                // On images that are not within an element with block layout,
                // this property won't be available
                if (!proxy.findProperty("gridTemplateColumns"))
                    return;

                // Check linked value if necessary
                var currentValue = proxy.getOption("gridTemplateColumns");
                if (currentValue === null)
                    currentValue = OP3.$(proxy).parent().element()
                        .getOption("parentGridTemplateColumns");

                // get device based on media
                var device = "desktop";
                if (media === "screen and (max-width: 1023px)")
                    device = "tablet";
                if (media === "screen and (max-width: 767px)")
                    device = "mobile"

                // find out if blocklayout is on parent or on proxy
                var parent = OP3.$(this.proxy()).parent().element();
                var blockLayoutElement = parent._blockLayoutPosition ? parent : OP3.$(this.proxy()).element();

                var layouts = blockLayoutElement._blockLayoutPosition;
                var layout = blockLayoutElement.getOption("blockLayout" + device.charAt(0).toUpperCase() + device.slice(1), true);
                if (device === "tablet" && layout === "null")
                    layout = blockLayoutElement.getOption("blockLayoutDesktop", true);

                if (layouts[layout] === "left")
                    value = value + " minmax(0px, 100%)";
                else
                    value = "minmax(0px, 100%) " + value;

                proxy.setOption("gridTemplateColumns", value, media);
            },
        },

    });

})(jQuery, window, document);
