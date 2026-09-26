/**
 * OptimizePress3 document:
 * op3 document element manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-designer.js
 *     - elements/default/op3-element
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Document constructor
     *
     * @param {Class}
     */
    var OP3_Document = OP3.defineClass({

        Name: "OP3.Document",

        Extends: OP3.Elements._extension.type.Default,

        Constructor: function(arg) {
            //this._node = OP3.Designer.$ui.parent.get(0);
            this._node = OP3.Designer.$ui.html.get(0);
            this._options = this._options || this._props;

            this._init(arg);
        },

        Prototype: {

            _type: "document",

            _props: function() {
                return [
                    // color scheme
                    [ OP3.Elements._extension.prop.VarColorScheme1 ],
                    [ OP3.Elements._extension.prop.VarColorScheme2 ],
                    [ OP3.Elements._extension.prop.VarColorScheme3 ],
                    [ OP3.Elements._extension.prop.VarColorScheme4 ],
                    [ OP3.Elements._extension.prop.VarColorScheme5 ],

                    // background
                    [ OP3.Elements._extension.prop.BackgroundColor, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundImage, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundImageUrl, { group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundPosition, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundAttachment, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundRepeat, { selector: " body", group: "page-background" } ],
                    [ OP3.Elements._extension.prop.BackgroundSize, { selector: " body", group: "page-background" } ],

                    // Default Typography
                    [ OP3.Elements._extension.prop.FontFamilyDefaultHead ],
                    [ OP3.Elements._extension.prop.FontWeightDefaultHead ],
                    [ OP3.Elements._extension.prop.FontStyleDefaultHead ],
                    [ OP3.Elements._extension.prop.FontFamilyDefaultBody ],
                    [ OP3.Elements._extension.prop.FontWeightDefaultBody ],
                    [ OP3.Elements._extension.prop.FontStyleDefaultBody ],

                    // Typography Control Panel
                    //
                    // The ":not(a)" in selector is added for css specificity.
                    // This way we are making sure that (for example) tcp_h1_color
                    // property is "stronger" than "tcp_headings_color".
                    //
                    // If you change any of Typography Control Panel selector, make
                    // sure you change the selectors in /src/Editor/Page.php!!!
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_all_fontFamily", selector: ' #op3-designer-element h1, #op3-designer-element h2, #op3-designer-element h3, #op3-designer-element h4, #op3-designer-element h5, #op3-designer-element h6, [data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"] .op3-faqitem-header p, [data-op3-element-type="listmenu"] .op3-list-menu-title, [data-op3-element-type="numberblockitem"] .op3-numberblock-number, #op3-designer-element p, #op3-designer-element li, #op3-designer-element blockquote, [data-op3-element-type="bulletlist"], [data-op3-element-type="button"], [data-op3-element-type="checkbox"] label, [data-op3-element-type="radiobutton"] label, [data-op3-element-type="fieldset"] legend, [data-op3-element-type="countdowntimer"] .op3-countdown-timer, [data-op3-element-type="descriptionlist"], [data-op3-element-type="evergreencountdowntimer"] .op3-evergreen-countdown-timer, [data-op3-element-type="input"] .op3-element-input-edit, [data-op3-element-type="input"] .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"] .op3-interval-countdown-timer, [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="select"] .op3-element-select-edit, [data-op3-element-type="select"] .op3-element-select-label, [data-op3-element-type="textarea"] .op3-element-input-edit, [data-op3-element-type="textarea"] .op3-element-input-label, [data-op3-element-type="treemenu"], [data-op3-element-type="webinardate"] .op3-webinar-timezone, [data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_all_color", selector: ' #op3-designer-element h1, #op3-designer-element h2, #op3-designer-element h3, #op3-designer-element h4, #op3-designer-element h5, #op3-designer-element h6, [data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"] .op3-faqitem-header p, [data-op3-element-type="listmenu"] .op3-list-menu-title, [data-op3-element-type="numberblockitem"] .op3-numberblock-number, #op3-designer-element p, #op3-designer-element ul, #op3-designer-element blockquote, [data-op3-element-type="bulletlist"], [data-op3-element-type="button"], [data-op3-element-type="checkbox"] label, [data-op3-element-type="radiobutton"] label, [data-op3-element-type="fieldset"] legend, [data-op3-element-type="countdowntimer"] .op3-countdown-timer, [data-op3-element-type="descriptionlist"], [data-op3-element-type="evergreencountdowntimer"] .op3-evergreen-countdown-timer, [data-op3-element-type="input"] .op3-element-input-edit, [data-op3-element-type="input"] .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"] .op3-interval-countdown-timer, [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="select"] .op3-element-select-edit, [data-op3-element-type="select"] .op3-element-select-label, [data-op3-element-type="textarea"] .op3-element-input-edit, [data-op3-element-type="textarea"] .op3-element-input-label, [data-op3-element-type="treemenu"], [data-op3-element-type="webinardate"] .op3-webinar-timezone, [data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_all_textShadow", selector: ' #op3-designer-element h1, #op3-designer-element h2, #op3-designer-element h3, #op3-designer-element h4, #op3-designer-element h5, #op3-designer-element h6, [data-op3-element-type="contenttoggleitem"] .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"] .op3-faqitem-header p, [data-op3-element-type="listmenu"] .op3-list-menu-title, [data-op3-element-type="numberblockitem"] .op3-numberblock-number, #op3-designer-element p, #op3-designer-element li, #op3-designer-element blockquote, [data-op3-element-type="bulletlist"], [data-op3-element-type="button"], [data-op3-element-type="checkbox"] label, [data-op3-element-type="radiobutton"] label, [data-op3-element-type="fieldset"] legend, [data-op3-element-type="countdowntimer"] .op3-countdown-timer, [data-op3-element-type="descriptionlist"], [data-op3-element-type="evergreencountdowntimer"] .op3-evergreen-countdown-timer, [data-op3-element-type="input"] .op3-element-input-edit, [data-op3-element-type="input"] .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"] .op3-interval-countdown-timer, [data-op3-element-type="progressbar"] .op3-progressbar-label, [data-op3-element-type="select"] .op3-element-select-edit, [data-op3-element-type="select"] .op3-element-select-label, [data-op3-element-type="textarea"] .op3-element-input-edit, [data-op3-element-type="textarea"] .op3-element-input-label, [data-op3-element-type="treemenu"], [data-op3-element-type="webinardate"] .op3-webinar-timezone, [data-op3-element-type="tabsheaderitem"]' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_headings_fontFamily", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_headings_fontWeight", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_headings_fontStyle", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_headings_lineHeight", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_headings_letterSpacing", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_headings_textTransform", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_headings_textDecoration", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_headings_textAlign", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_headings_color", selector: ' #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6, [data-op3-element-type="contenttoggleitem"]:not(a) .op3-contenttoggleitem-header p, [data-op3-element-type="faqitem"]:not(a) .op3-faqitem-header p, [data-op3-element-type="listmenu"]:not(a) .op3-list-menu-title, [data-op3-element-type="numberblockitem"]:not(a) .op3-numberblock-number' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_headings_textShadow", selector: " #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_headings_marginTop", selector: " #op3-designer-element:not(a) h1:not(:first-child), #op3-designer-element:not(a) h2:not(:first-child), #op3-designer-element:not(a) h3:not(:first-child), #op3-designer-element:not(a) h4:not(:first-child), #op3-designer-element:not(a) h5:not(:first-child), #op3-designer-element:not(a) h6:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_headings_marginBottom", selector: " #op3-designer-element:not(a) h1:not(:last-child), #op3-designer-element:not(a) h2:not(:last-child), #op3-designer-element:not(a) h3:not(:last-child), #op3-designer-element:not(a) h4:not(:last-child), #op3-designer-element:not(a) h5:not(:last-child), #op3-designer-element:not(a) h6:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_headings_marginLeft", selector: " #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_headings_marginRight", selector: " #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_headings_paddingTop", selector: " #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_headings_paddingBottom", selector: " #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_headings_paddingLeft", selector: " #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_headings_paddingRight", selector: " #op3-designer-element:not(a) h1, #op3-designer-element:not(a) h2, #op3-designer-element:not(a) h3, #op3-designer-element:not(a) h4, #op3-designer-element:not(a) h5, #op3-designer-element:not(a) h6" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_h1_fontFamily", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_h1_fontWeight", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_h1_fontSize", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_h1_fontStyle", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_h1_lineHeight", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_h1_letterSpacing", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_h1_textTransform", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_h1_textDecoration", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_h1_textAlign", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_h1_color", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_h1_textShadow", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_h1_marginTop", selector: " #op3-designer-element:not(a):not(a) h1:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_h1_marginBottom", selector: " #op3-designer-element:not(a):not(a) h1:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_h1_marginLeft", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_h1_marginRight", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_h1_paddingTop", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_h1_paddingBottom", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_h1_paddingLeft", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_h1_paddingRight", selector: " #op3-designer-element:not(a):not(a) h1" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_h2_fontFamily", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_h2_fontWeight", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_h2_fontSize", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_h2_fontStyle", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_h2_lineHeight", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_h2_letterSpacing", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_h2_textTransform", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_h2_textDecoration", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_h2_textAlign", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_h2_color", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_h2_textShadow", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_h2_marginTop", selector: " #op3-designer-element:not(a):not(a) h2:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_h2_marginBottom", selector: " #op3-designer-element:not(a):not(a) h2:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_h2_marginLeft", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_h2_marginRight", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_h2_paddingTop", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_h2_paddingBottom", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_h2_paddingLeft", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_h2_paddingRight", selector: " #op3-designer-element:not(a):not(a) h2" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_h3_fontFamily", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_h3_fontWeight", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_h3_fontSize", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_h3_fontStyle", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_h3_lineHeight", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_h3_letterSpacing", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_h3_textTransform", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_h3_textDecoration", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_h3_textAlign", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_h3_color", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_h3_textShadow", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_h3_marginTop", selector: " #op3-designer-element:not(a):not(a) h3:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_h3_marginBottom", selector: " #op3-designer-element:not(a):not(a) h3:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_h3_marginLeft", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_h3_marginRight", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_h3_paddingTop", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_h3_paddingBottom", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_h3_paddingLeft", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_h3_paddingRight", selector: " #op3-designer-element:not(a):not(a) h3" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_h4_fontFamily", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_h4_fontWeight", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_h4_fontSize", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_h4_fontStyle", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_h4_lineHeight", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_h4_letterSpacing", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_h4_textTransform", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_h4_textDecoration", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_h4_textAlign", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_h4_color", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_h4_textShadow", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_h4_marginTop", selector: " #op3-designer-element:not(a):not(a) h4:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_h4_marginBottom", selector: " #op3-designer-element:not(a):not(a) h4:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_h4_marginLeft", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_h4_marginRight", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_h4_paddingTop", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_h4_paddingBottom", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_h4_paddingLeft", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_h4_paddingRight", selector: " #op3-designer-element:not(a):not(a) h4" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_h5_fontFamily", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_h5_fontWeight", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_h5_fontSize", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_h5_fontStyle", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_h5_lineHeight", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_h5_letterSpacing", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_h5_textTransform", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_h5_textDecoration", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_h5_textAlign", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_h5_color", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_h5_textShadow", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_h5_marginTop", selector: " #op3-designer-element:not(a):not(a) h5:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_h5_marginBottom", selector: " #op3-designer-element:not(a):not(a) h5:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_h5_marginLeft", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_h5_marginRight", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_h5_paddingTop", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_h5_paddingBottom", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_h5_paddingLeft", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_h5_paddingRight", selector: " #op3-designer-element:not(a):not(a) h5" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_h6_fontFamily", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_h6_fontWeight", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_h6_fontSize", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_h6_fontStyle", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_h6_lineHeight", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_h6_letterSpacing", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_h6_textTransform", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_h6_textDecoration", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_h6_textAlign", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_h6_color", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_h6_textShadow", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_h6_marginTop", selector: " #op3-designer-element:not(a):not(a) h6:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_h6_marginBottom", selector: " #op3-designer-element:not(a):not(a) h6:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_h6_marginLeft", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_h6_marginRight", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_h6_paddingTop", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_h6_paddingBottom", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_h6_paddingLeft", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_h6_paddingRight", selector: " #op3-designer-element:not(a):not(a) h6" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_texts_fontFamily", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a), [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_texts_fontWeight", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a) [data-op3-contenteditable], [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_texts_fontSize", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a), [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_texts_fontStyle", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a) [data-op3-contenteditable], [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_texts_lineHeight", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, .op3-element[data-op3-element-type="bulletlist"]:not(a), [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_texts_letterSpacing", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a) [data-op3-contenteditable], [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_texts_textTransform", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a) [data-op3-contenteditable], [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_texts_textDecoration", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a) [data-op3-contenteditable], [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_texts_textAlign", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_texts_color", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) ul, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a), [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_texts_textShadow", selector: ' #op3-designer-element:not(a) p, #op3-designer-element:not(a) li, #op3-designer-element:not(a) blockquote, [data-op3-element-type="bulletlist"]:not(a), [data-op3-element-type="button"]:not(a), [data-op3-element-type="checkbox"]:not(a) label, [data-op3-element-type="radiobutton"]:not(a) label, [data-op3-element-type="fieldset"]:not(a) legend, [data-op3-element-type="countdowntimer"]:not(a) .op3-countdown-timer, [data-op3-element-type="descriptionlist"]:not(a), [data-op3-element-type="evergreencountdowntimer"]:not(a) .op3-evergreen-countdown-timer, [data-op3-element-type="input"]:not(a) .op3-element-input-edit, [data-op3-element-type="input"]:not(a) .op3-element-input-label, [data-op3-element-type="intervalcountdowntimer"]:not(a) .op3-interval-countdown-timer, [data-op3-element-type="progressbar"]:not(a) .op3-progressbar-label, [data-op3-element-type="select"]:not(a) .op3-element-select-edit, [data-op3-element-type="select"]:not(a) .op3-element-select-label, [data-op3-element-type="textarea"]:not(a) .op3-element-input-edit, [data-op3-element-type="textarea"]:not(a) .op3-element-input-label, [data-op3-element-type="treemenu"]:not(a), [data-op3-element-type="webinardate"]:not(a) .op3-webinar-timezone' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_p_fontFamily", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_p_fontWeight", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_p_fontSize", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_p_fontStyle", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_p_lineHeight", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_p_letterSpacing", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_p_textTransform", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_p_textDecoration", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_p_textAlign", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_p_color", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_p_textShadow", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_p_marginTop", selector: " #op3-designer-element:not(a):not(a) p:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_p_marginBottom", selector: " #op3-designer-element:not(a):not(a) p:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_p_marginLeft", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_p_marginRight", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_p_paddingTop", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_p_paddingBottom", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_p_paddingLeft", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_p_paddingRight", selector: " #op3-designer-element:not(a):not(a) p" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_li_fontFamily", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_li_fontWeight", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a) [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_li_fontSize", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_li_fontStyle", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a) [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_li_lineHeight", selector: ' #op3-designer-element:not(a):not(a) li, .op3-element[data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_li_letterSpacing", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a) [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_li_textTransform", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a) [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_li_textDecoration", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a) [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_li_textAlign", selector: ' #op3-designer-element:not(a):not(a) li' } ], // { not applying to bulletblock (bulletblock uses justifyContent property) }
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_li_color", selector: ' #op3-designer-element:not(a):not(a) ul, [data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_li_textShadow", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a) [data-op3-contenteditable]' } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tcp_li_borderTopWidth", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tcp_li_borderTopStyle", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tcp_li_borderTopColor", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tcp_li_borderRightWidth", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tcp_li_borderRightStyle", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tcp_li_borderRightColor", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tcp_li_borderBottomWidth", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tcp_li_borderBottomStyle", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tcp_li_borderBottomColor", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tcp_li_borderLeftWidth", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tcp_li_borderLeftStyle", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tcp_li_borderLeftColor", selector: ' #op3-designer-element:not(a):not(a) ul, .op3-element[data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tcp_li_borderTopLeftRadius", selector: ' #op3-designer-element:not(a):not(a) ul, [data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tcp_li_borderTopRightRadius", selector: ' #op3-designer-element:not(a):not(a) ul, [data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tcp_li_borderBottomRightRadius", selector: ' #op3-designer-element:not(a):not(a) ul, [data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tcp_li_borderBottomLeftRadius", selector: ' #op3-designer-element:not(a):not(a) ul, [data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tcp_li_boxShadow", selector: ' #op3-designer-element:not(a):not(a) ul, [data-op3-element-type="bulletblock"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_li_marginTop", selector: ' #op3-designer-element:not(a):not(a) ul:not(:first-child)' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_li_marginBottom", selector: ' #op3-designer-element:not(a):not(a) ul:not(:last-child)' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_li_marginLeft", selector: ' #op3-designer-element:not(a):not(a) ul' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_li_marginRight", selector: ' #op3-designer-element:not(a):not(a) ul' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_li_paddingTop", selector: ' #op3-designer-element:not(a):not(a) ul' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_li_paddingBottom", selector: ' #op3-designer-element:not(a):not(a) ul' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_li_paddingLeft", selector: ' #op3-designer-element:not(a):not(a) ul' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_li_paddingRight", selector: ' #op3-designer-element:not(a):not(a) ul' } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_li_itemMarginTop", selector: ' #op3-designer-element:not(a):not(a) li:not(:first-child), .op3-element[data-op3-element-type="bulletlist"]:not(a):not(a):not(:first-child)' } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_li_itemMarginBottom", selector: ' #op3-designer-element:not(a):not(a) li:not(:last-child), .op3-element[data-op3-element-type="bulletlist"]:not(a):not(a):not(:last-child)' } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_li_itemMarginLeft", selector: ' #op3-designer-element:not(a):not(a) li, .op3-element[data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_li_itemMarginRight", selector: ' #op3-designer-element:not(a):not(a) li, .op3-element[data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_li_itemPaddingTop", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_li_itemPaddingBottom", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_li_itemPaddingLeft", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_li_itemPaddingRight", selector: ' #op3-designer-element:not(a):not(a) li, [data-op3-element-type="bulletlist"]:not(a):not(a)' } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_a_fontFamily", selector: " #op3-designer-element p a", serialize: false } ],   // we need this so tcp_a_fontWeight property widget knows which weights to render
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_a_fontWeight", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_a_fontStyle", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_a_textTransform", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_a_textDecoration", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_a_textAlign", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_a_color", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_a_textShadow", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.TransitionDuration, { id: "tcp_a_transitionDuration", selector: " #op3-designer-element:not(a):not(a) a" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_a_fontWeightHover", selector: " #op3-designer-element:not(a):not(a) a:hover" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_a_fontStyleHover", selector: " #op3-designer-element:not(a):not(a) a:hover" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_a_textTransformHover", selector: " #op3-designer-element:not(a):not(a) a:hover" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_a_textDecorationHover", selector: " #op3-designer-element:not(a):not(a) a:hover" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_a_textAlignHover", selector: " #op3-designer-element:not(a):not(a) a:hover" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_a_colorHover", selector: " #op3-designer-element:not(a):not(a) a:hover" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_blockquote_fontFamily", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_blockquote_fontWeight", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_blockquote_fontSize", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_blockquote_fontStyle", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_blockquote_lineHeight", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_blockquote_letterSpacing", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_blockquote_textTransform", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_blockquote_textDecoration", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_blockquote_textAlign", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_blockquote_color", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tcp_blockquote_backgroundColor", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_blockquote_textShadow", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tcp_blockquote_borderTopWidth", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tcp_blockquote_borderTopStyle", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tcp_blockquote_borderTopColor", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tcp_blockquote_borderRightWidth", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tcp_blockquote_borderRightStyle", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tcp_blockquote_borderRightColor", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tcp_blockquote_borderBottomWidth", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tcp_blockquote_borderBottomStyle", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tcp_blockquote_borderBottomColor", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tcp_blockquote_borderLeftWidth", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tcp_blockquote_borderLeftStyle", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tcp_blockquote_borderLeftColor", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tcp_blockquote_borderTopLeftRadius", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tcp_blockquote_borderTopRightRadius", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tcp_blockquote_borderBottomRightRadius", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tcp_blockquote_borderBottomLeftRadius", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tcp_blockquote_boxShadow", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_blockquote_marginTop", selector: " #op3-designer-element:not(a):not(a) blockquote:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_blockquote_marginBottom", selector: " #op3-designer-element:not(a):not(a) blockquote:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_blockquote_marginLeft", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_blockquote_marginRight", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_blockquote_paddingTop", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_blockquote_paddingBottom", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_blockquote_paddingLeft", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_blockquote_paddingRight", selector: " #op3-designer-element:not(a):not(a) blockquote" } ],
                    [ OP3.Elements._extension.prop.FontFamily, { id: "tcp_pre_fontFamily", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.FontWeight, { id: "tcp_pre_fontWeight", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.FontSize, { id: "tcp_pre_fontSize", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.FontStyle, { id: "tcp_pre_fontStyle", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.LineHeight, { id: "tcp_pre_lineHeight", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.LetterSpacing, { id: "tcp_pre_letterSpacing", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.TextTransform, { id: "tcp_pre_textTransform", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.TextDecoration, { id: "tcp_pre_textDecoration", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.TextAlign, { id: "tcp_pre_textAlign", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.Color, { id: "tcp_pre_color", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BackgroundColor, { id: "tcp_pre_backgroundColor", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.TextShadow, { id: "tcp_pre_textShadow", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderTopWidth, { id: "tcp_pre_borderTopWidth", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderTopStyle, { id: "tcp_pre_borderTopStyle", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderTopColor, { id: "tcp_pre_borderTopColor", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderRightWidth, { id: "tcp_pre_borderRightWidth", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderRightStyle, { id: "tcp_pre_borderRightStyle", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderRightColor, { id: "tcp_pre_borderRightColor", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderBottomWidth, { id: "tcp_pre_borderBottomWidth", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderBottomStyle, { id: "tcp_pre_borderBottomStyle", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderBottomColor, { id: "tcp_pre_borderBottomColor", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderLeftWidth, { id: "tcp_pre_borderLeftWidth", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderLeftStyle, { id: "tcp_pre_borderLeftStyle", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderLeftColor, { id: "tcp_pre_borderLeftColor", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderTopLeftRadius, { id: "tcp_pre_borderTopLeftRadius", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderTopRightRadius, { id: "tcp_pre_borderTopRightRadius", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderBottomRightRadius, { id: "tcp_pre_borderBottomRightRadius", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BorderBottomLeftRadius, { id: "tcp_pre_borderBottomLeftRadius", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.BoxShadow, { id: "tcp_pre_boxShadow", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.MarginTop, { id: "tcp_pre_marginTop", selector: " #op3-designer-element:not(a):not(a) pre:not(:first-child)" } ],
                    [ OP3.Elements._extension.prop.MarginBottom, { id: "tcp_pre_marginBottom", selector: " #op3-designer-element:not(a):not(a) pre:not(:last-child)" } ],
                    [ OP3.Elements._extension.prop.MarginLeft, { id: "tcp_pre_marginLeft", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.MarginRight, { id: "tcp_pre_marginRight", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.PaddingTop, { id: "tcp_pre_paddingTop", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.PaddingBottom, { id: "tcp_pre_paddingBottom", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.PaddingLeft, { id: "tcp_pre_paddingLeft", selector: " #op3-designer-element:not(a):not(a) pre" } ],
                    [ OP3.Elements._extension.prop.PaddingRight, { id: "tcp_pre_paddingRight", selector: " #op3-designer-element:not(a):not(a) pre" } ],

                    // Scripts
                    [ OP3.Elements._extension.prop.HeaderScript ],
                    [ OP3.Elements._extension.prop.BodyScript ],
                    [ OP3.Elements._extension.prop.FooterScript ],

                    // Custom CSS
                    [ OP3.Elements._extension.prop.Css, { id: "customCss", selector: " #op3-custom-css", group: "custom-css", label: "Enter CSS rules without style tags", attr: {wrap: "off"} } ],

                    // Export template
                    [ OP3.Elements._extension.prop.Export ],

                    // Mark page as funnel page template
                    [ OP3.Elements._extension.prop.FunnelPageTemplate, { selector: " #op3-designer-element" } ],
                    //[ OP3.Elements._extension.prop.FunnelPageTemplate, { id: "funnelPageTemplate", selector: " #op3-funnel-page-template", group: "funnel-page-template", label: "Funnel Page Template" } ],
                ];
            },

            _select: function(node) {
                // pass
            },

            _create: function(style) {
                // pass
            },

            _wrap: function() {
                // pass
            },

            _uuid: function() {
                return null
            },

            _ancestorsMap: function(skipCurrent) {
                return [];
            },

            _pasteObject: function() {
                if (!OP3.LocalStorage)
                    return null;

                var source = OP3.LocalStorage.get("clipboard");
                if (!source)
                    return null;

                // Element must be pasted before the
                // fist popoverlay on the page
                var destination = this.node();
                var method = "appendTo";
                if (this.type() === "document") {
                    var $popoverlay = $(this.node()).find('[data-op3-element-type="popoverlay"]').eq(0);
                    if ($popoverlay.length > 0) {
                        destination = $popoverlay;
                        method = "insertBefore";
                    }
                }

                return {
                    source: JSON.stringify(source),
                    destination: destination,
                    method: method,
                }
            },

            uuid: function() {
                return null;
            },

            gid: function() {
                return null;
            },

            type: function() {
                return this._type;
            },

            spec: function() {
                return null;
            },

            caption: function() {
                return null;
            },

            title: function() {
                return "Document";
            },

            style: function(value) {
                return null;
            },

            desc: function() {
                return this.title();
            },

            selector: function() {
                return "html[data-op3-layer]";
            },

            appendTo: function(node) {
                // pass
            },

            insertBefore: function(node) {
                // pass
            },

            insertAfter: function(node) {
                // pass
            },

            wrap: function(node) {
                // pass
            },

            remove: function() {
                // pass
            },

            detach: function() {
                // pass
            },

            focus: function(node) {
                // pass
            },

            unfocus: function() {
                // pass
            },

            config: function(style) {
                return {};
            },

            markup: function(style) {
                return null;
            },

            parent: function() {
                return null;
            },

            parents: function() {
                return [];
            },

        },
    });

    // autoinit
    OP3.bind("loadajaxinit", function() {
        OP3.Document = new OP3_Document();
        window.parent.OP3.Document = OP3.Document;
    });

    // initialize element append counter
    OP3.bind("load::designer", function(e, o) {
        OP3.Designer.$ui.html
            .data("op3-element-append-count", 1);
    });

})(jQuery, window, document);
