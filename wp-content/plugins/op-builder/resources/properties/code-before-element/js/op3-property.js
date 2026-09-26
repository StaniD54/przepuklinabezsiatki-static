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
    OP3.Elements._extension.prop.CodeBeforeElement = OP3.defineClass({

        Name: "OP3.Property.CodeBeforeElement",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "codeBeforeElement",

            _defaults: {
                label: function() {
                    return OP3._("Code Before Element");
                },
                tag: "textarea"
            },

            _forceComputed: true,

            _encode: function(str) {
                return String(str)
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/\[/g, '&#91;')
                    .replace(/]/g, '&#93;');
            },

            _decode: function(str) {
                return OP3.Query.htmlEntitiesDecode(str);
            },

            /**
             *
             * @return {String}
             */
            computed: function() {
                return this._decode($(this.target()).attr("data-op3-code-before"));
            },

            /**
             * @param  {String} value
             * @param  {String} media
             * @return {Void}
             */
            setter: function(value, media) {
                return $(this.target()).attr("data-op3-code-before", this._encode(value));
            },

        },

    });

})(jQuery, window, document);
