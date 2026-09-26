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
    OP3.Elements._extension.prop.FooterScript = OP3.defineClass({

        Name: "OP3.Property.FooterScript",

        Extends: OP3.Elements._extension.prop.BaseScript,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.BaseScript.apply(this, arguments);
        },

        Prototype: {

            _name: "footerScript",

            _defaults: {
                label: function() {
                    return OP3._("Footer Script");
                },
                desc: function() {
                    return OP3._("This will be added before the &lt;/body&gt; tag in your page code.");
                },
                selector: " .op3-footer-js",
                tag: "textarea",
                attr: {
                    wrap: "off",
                },
            },

            _allowedTags: "script,noscript,style,link,img,iframe",

        },

    });

    // This property used to change every DOM element in parsed property
    // value adding [type="script/op3"] attribute to it. This was very
    // difficult to control on server side, so we changed the way this
    // property stores its value. For backward compatibility we need
    // to check if element exists, and add it if not...
    OP3.bind("load::designer", function(e, o) {
        var proto = OP3.Elements._extension.prop.FooterScript.prototype,
            selector = proto._defaults.selector,
            $node = $(selector);
        if (!$node.length)
            $('<script class="' + selector.replace(/^[\s\.]+/g, "") + '" type="op3/script" />')
                .appendTo("body");
    });

})(jQuery, window, document);
