/**
 * OptimizePress3 element type
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.Calendly = OP3.defineClass({

        Name: "OP3.Element.Calendly",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "calendly",

            _props: function() {
                return [
                    // Style tab - General
                    [ OP3.Elements._extension.prop.CalendlyUrl, { selector: " .calendly-inline-widget" } ],
                    [ OP3.Elements._extension.prop.CalendlyUrlBackgroundColor ],
                    [ OP3.Elements._extension.prop.CalendlyUrlTextColor ],
                    [ OP3.Elements._extension.prop.CalendlyUrlButtonAndLinkColor ],

                    // Advanced Tab - Positioning
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
                    [ OP3.Elements._extension.prop.MaxWidth ],

                    // Advanced tab - Responsive
                    [ OP3.Elements._extension.prop.Display, { id: "displayDeviceVisibility" } ],
                    [ OP3.Elements._extension.prop.DeviceVisibility, { label: OP3._("Element Visible On") } ],
                    [ OP3.Elements._extension.prop.ForceVisibility ],

                    // Advanced Tab - Animation & Delay
                    [ OP3.Elements._extension.prop.AnimationTrigger ],
                    [ OP3.Elements._extension.prop.AnimationStyle ],
                    [ OP3.Elements._extension.prop.AnimationLoop ],
                    [ OP3.Elements._extension.prop.TimerMinutes ],
                    [ OP3.Elements._extension.prop.TimerSeconds ],

                    // Advanced Tab - Advanced
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
     * calendlyUrl property change event handler
     *
     * @param {Object} e
     * @param {Object} o
     * @returns {Void}
     */
    OP3.bind("elementchange::calendly::calendlyUrl", function(e, o) {
        var url = o.value.after;
        // Check if calendly-sdk.js is loaded
        if (!window.Calendly)
            return;

        var $widget = $(o.node).find(".calendly-inline-widget");
        if (!$widget.length)
            return;

        // Remove calendly iframe from dom
        $widget.empty();

        if (url)
            // Init calendly widget
            Calendly.initInlineWidget({
                url: url,
                parentElement: $widget,
            });

        // Sync proxy properties
        OP3.transmit("elementoptionssyncrequest", { property: [
            "calendlyUrlBackgroundColor",
            "calendlyUrlTextColor",
            "calendlayUrlButtonAndLinkColor"
        ] });
    });

})(jQuery, window, document);
