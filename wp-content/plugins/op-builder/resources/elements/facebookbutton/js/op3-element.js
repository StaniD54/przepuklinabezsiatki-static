/**
 * OptimizePress3 element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Element constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.type.FacebookButton = OP3.defineClass({

        Name: "OP3.Element.FacebookButton",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "facebookbutton",

            _props: function() {
                return [
                    // Style Tab
                    [ OP3.Elements._extension.prop.FacebookAction ],
                    [ OP3.Elements._extension.prop.FacebookLayout ],
                    [ OP3.Elements._extension.prop.FacebookWidth ],
                    [ OP3.Elements._extension.prop.FacebookSize ],
                    [ OP3.Elements._extension.prop.FacebookColorscheme ],
                    [ OP3.Elements._extension.prop.FacebookShare ],
                    [ OP3.Elements._extension.prop.FacebookShareProxy ],
                    [ OP3.Elements._extension.prop.FacebookFaces ],
                    [ OP3.Elements._extension.prop.FacebookFacesProxy ],
                    [ OP3.Elements._extension.prop.FacebookHrefType ],
                    [ OP3.Elements._extension.prop.FacebookHref ],

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
                    [ OP3.Elements._extension.prop.TextAlign, { label: OP3._("Alignment"), selector: " .op3-facebook-button" } ],

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

    OP3.bind("elementchange::facebookbutton::facebookAction elementchange::facebookbutton::facebookLayout elementchange::facebookbutton::facebookSize elementchange::facebookbutton::facebookColorscheme elementchange::facebookbutton::facebookShare elementchange::facebookbutton::facebookFaces elementchange::facebookbutton::facebookWidth", function(e, o) {
        OP3.Designer.Facebook.parse(o.node);
    });

    // // On href type change to "current",
    // // set facebookHref to ""
    // // because the API then interprets it as current page
    OP3.bind("elementchange::facebookbutton::facebookHrefType", function(e, o) {
        if (o.value.after !== "current")
            return;

        OP3.$(o.node).setOption("facebookHref", "");

        OP3.Designer.Facebook.parse(o.node);
    });

})(jQuery, window, document);
