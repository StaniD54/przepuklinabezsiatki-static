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
    OP3.Elements._extension.type.FacebookComments = OP3.defineClass({

        Name: "OP3.Element.FacebookComments",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            return OP3.Elements._extension.type.Default.apply(this, arguments);
        },

        Prototype: {

            _type: "facebookcomments",

            _props: function() {
                return [
                    // Style Tab
                    [ OP3.Elements._extension.prop.FacebookNumposts ],
                    [ OP3.Elements._extension.prop.FacebookOrderby ],
                    [ OP3.Elements._extension.prop.FacebookHrefType, { selector: " .fb-comments" } ],
                    [ OP3.Elements._extension.prop.FacebookHref, { selector: " .fb-comments" } ],
                    [ OP3.Elements._extension.prop.FacebookColorscheme, { selector: " .fb-comments" } ],
                    [ OP3.Elements._extension.prop.MaxWidth, { label: OP3._("Width") } ],

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

    // Re-parse on element change.
    OP3.bind("elementchange::facebookcomments::facebookNumposts elementchange::facebookcomments::facebookOrderby elementchange::facebookcomments::facebookHref elementchange::facebookcomments::facebookColorscheme", function(e, o) {
        // On element append, set url to the current page
        if (o.id === "facebookHref" && o.value.after === "__CURRENT_URL__") {
            OP3.$(o.node).setOption("facebookHref", OP3.Meta.pageUrl);
        }

        OP3.Designer.Facebook.parse(o.node);
    });

    // On href type change to "current", set
    // facebookHref to the actual page url.
    //
    // This is different from like button, since like button
    // interprets empty href as a current page, while
    // comments don't and need the full URL
    OP3.bind("elementchange::facebookcomments::facebookHrefType", function(e, o) {
        if (o.value.after !== "current")
            return;

        // TODO: find a way to handle this better for drafts (???)
        OP3.$(o.node).setOption("facebookHref", OP3.Meta.pageUrl);

        OP3.Designer.Facebook.parse(o.node);
    });

})(jQuery, window, document);
