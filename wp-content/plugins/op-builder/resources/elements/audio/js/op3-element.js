/**
 * OptimizePress3 audio element.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Audio = OP3.defineClass({

        Name: "OP3.Element.Audio",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "audio",

            _props: function() {
                return [
                    [ OP3.Elements._extension.prop.Op3Icon, { selector: " .op3-icon" } ],

                    // Toolbar - Audio Player
                    [ OP3.Elements._extension.prop.Src, { selector: " audio", attr: { "data-property-type": "audio-url-preview" } } ],
                    [ OP3.Elements._extension.prop.Loop, { attr: { "data-property-type": "boolean" } }],
                    [ OP3.Elements._extension.prop.LoopFull ],
                    [ OP3.Elements._extension.prop.Autoplay, { attr: { "data-property-type": "boolean" } }],
                    [ OP3.Elements._extension.prop.AudioDownload ],

                    // Toolbar - Download
                    [ OP3.Elements._extension.prop.Color, { selector: " .op3-icon" } ],
                    [ OP3.Elements._extension.prop.FontSize, {
                        selector: " .op3-icon",
                        label: OP3._("Icon Size"),
                        attr: {
                            "data-property-type": "range",
                            "data-units": "px",
                            "data-min-px": "8",
                            "data-max-px": "50",
                            "data-step-px": "1",
                            "data-precision-px": "0",
                        },
                        units: ["px"],
                    }],

                    // Sidebar - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Sidebar - Margins & Paddings
                    [ OP3.Elements._extension.prop.BoxModel ],
                    [ OP3.Elements._extension.prop.MarginTop ],
                    [ OP3.Elements._extension.prop.MarginBottom ],
                    [ OP3.Elements._extension.prop.MarginLeft ],
                    [ OP3.Elements._extension.prop.MarginRight ],
                    [ OP3.Elements._extension.prop.PaddingTop ],
                    [ OP3.Elements._extension.prop.PaddingBottom ],
                    [ OP3.Elements._extension.prop.PaddingLeft ],
                    [ OP3.Elements._extension.prop.PaddingRight ],
                    [ OP3.Elements._extension.prop.PaddingDrag ],
                    [ OP3.Elements._extension.prop.MarginAlign ],
                    [ OP3.Elements._extension.prop.Width, { attr: { "data-property-type": "range", "data-units": "px, %", "data-min-px": "0", "data-min-percent": "0", "data-max-px": "2000", "data-max-percent": "100", "data-step-px": "1", "data-step-percent": "1", "data-precision-px": "0", "data-precision-percent": "0", }, units: [ "px", "%", ], }],

                    // Sidebar - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    // Sidebar - Advanced
                    [ OP3.Elements._extension.prop.Id ],
                    [ OP3.Elements._extension.prop.Uuid ],
                    [ OP3.Elements._extension.prop.Caption ],
                    [ OP3.Elements._extension.prop.Class ],
                    [ OP3.Elements._extension.prop.LinkProperties ],
                    [ OP3.Elements._extension.prop.ZIndex ],
                    [ OP3.Elements._extension.prop.CodeBeforeElement ],
                    [ OP3.Elements._extension.prop.CodeAfterElement ],
                ];
            },

        },

    });

    /**
     * Open media dialog on element drop
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementdrop::audio", function(e, o) {
        if (typeof o.source !== "string" || !o.source.match(/^<audio\W/))
            return;

        window.parent.OP3.Media.modalAudio(function(attach) {
            OP3.$(o.target).setOption("src", attach.url, "all"),

            OP3.transmit("insertmedia", {
                node: o.target,
                property: "src",
                attachment: attach,
            });
        });
    });


    /**
     * Add audioDownload property value as attribute in toolbar form
     * so download styling icon can be displayed/hidden.
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementoptionsformattach::audio", function(e, o) {
        $(o.parent)
            .closest("form")
            .attr("data-op3-parent-options-property-value-audiodownload", OP3.$(o.node).getOption("audioDownload", true));
    });

    /**
     * Remove audioDownload attribute in toolbar after elementoptionsformdetach event
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementoptionsformdetach::audio", function(e, o) {
        $(o.parent)
            .closest("form")
            .removeAttr("data-op3-parent-options-property-value-audiodownload");
    });

    /**
     * Update value of audioDownload attribute in toolbar form
     *
     * @param {Object} e
     * @param {Object} o
     * @return {Void}
     */
    OP3.bind("elementchange::audio::audioDownload", function(e, o) {
        if (OP3.Designer.activeElement().node() !== o.node)
            return;

        OP3.LiveEditor.$ui.propertyContainer
            .filter('[data-op3-element-options-type="' + o.type + '"]')
            .attr("data-op3-parent-options-property-value-" + o.name, o.value.after);
    });

})(jQuery, window, document);
