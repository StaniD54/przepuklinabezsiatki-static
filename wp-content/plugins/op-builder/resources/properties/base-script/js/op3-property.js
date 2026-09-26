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
    OP3.Elements._extension.prop.BaseScript = OP3.defineClass({

        Name: "OP3.Property.BaseScript",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "baseScript",

            _defaults: {
                label: function() {
                    return OP3._("Base Script");
                },
                desc: function() {
                    return OP3._("This will be added to your page.");
                },
                selector: " .op3-base-js",
                tag: "textarea",
                attr: {
                    wrap: "off",
                },
            },

            _forceComputed: true,

            _allowedTags: "script,noscript,style,meta,link,img,iframe",

            _parseHTML: function(html) {
                var allowedTags = this._allowedTags.split(/\s*,\s*/);

                return $.parseHTML(html, true)
                    // Filter only text nodes and allowed tags
                    .filter(function(item) {
                        return item.nodeName === "#text"
                            || allowedTags.includes(item.nodeName.toLowerCase());
                    })
                    // Convert DOM node to string. If node is text DOM element,
                    // wrap it's content with <script></script> (unless it's
                    // empty text node).
                    .map(function(item) {
                        if (item.nodeName === "#text") {
                            if (item.textContent.trim())
                                return item.textContent
                                    .replace(/^(\s*)(\S)/, "$1<script>$2")
                                    .replace(/(\S)(\s*)$/, "$1</script>$2");
                            else
                                return item.textContent;
                        }
                        else
                            return item.outerHTML;
                    })
                    // Join as HTML string.
                    .join("");
            },

            computed: function() {
                return OP3.$.htmlEntitiesDecode($(this.target()).html());
            },

            setter: function(value, media) {
                var parse = this._parseHTML(value),
                    html = OP3.$.htmlEntitiesEncode(parse);

                $(this.target()).html(html);
            },

        },

    });

})(jQuery, window, document);
