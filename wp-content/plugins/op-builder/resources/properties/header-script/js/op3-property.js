/**
 * OptimizePress3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.HeaderScript = OP3.defineClass({

        Name: "OP3.Property.HeaderScript",

        Extends: OP3.Elements._extension.prop.BaseScript,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.BaseScript.apply(this, arguments);
        },

        Prototype: {

            _name: "headerScript",

            _defaults: {
                label: function() {
                    return OP3._("Header Script");
                },
                desc: function() {
                    return OP3._("This will be added before the &lt;/head&gt; tag in your page code. Supported tags include &lt;script&gt;, &lt;noscript&gt;, &lt;meta&gt;, &lt;link&gt; and &lt;style&gt;. &lt;img&gt; tags will be stripped as they are not supported here.");
                },
                selector: " .op3-header-js",
                tag: "textarea",
                attr: {
                    wrap: "off",
                },
            },

            _allowedTags: "script,noscript,style,meta,link",

        },

    });

    // This property used to change every DOM element in parsed property
    // value adding [type="script/op3"] attribute to it. This was very
    // difficult to control on server side, so we changed the way this
    // property stores its value. For backward compatibility we need
    // to check if element exists, and add it if not...
    OP3.bind("load::designer", function(e, o) {
        var proto = OP3.Elements._extension.prop.HeaderScript.prototype,
            selector = proto._defaults.selector,
            $node = $(selector);
        if (!$node.length)
            $('<script class="' + selector.replace(/^[\s\.]+/g, "") + '" type="op3/script" />')
                .appendTo("head");
    });

})(jQuery, window, document);
