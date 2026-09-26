/**
 * OptimizePress3 live editor extension:
 * create op3 page or element's screenshot
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-meta.js
 *     - dom-to-image.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Document has changes
     *
     * We can not track OP3.Designer.changes()
     * because it records only changes in
     * history (and global elements edit mode
     * detaches the history). So we're using
     * our own flag here.
     *
     * @type {Boolean}
     */
    var _changed = false;

    OP3.bind("elementgidupdate", function(e, o) {
        _changed = true;
    });

    OP3.bind("save", function(e, o) {
        if (o.status)
            _changed = false;
    });

    /**
     * Parent class
     *
     * @type {OP3Screenshot}
     */
    var Super = window.parent.OP3General.Screenshot;

    /**
     * OP3.Screenshot
     *
     * @type {OP3_Screenshot}
     */
    var OP3_Screenshot = OP3.defineClass({

        Name: "OP3.Screenshot",

        Extends: Super,

        Constructor: function(options) {
            Super.apply(this, arguments);
        },

        Prototype: {

            /**
             * Document has changes
             *
             * @return {Boolean}
             */
            changed: function() {
                return (OP3.Designer && OP3.Designer.changed()) || _changed || false;
            },

            /**
             * Get page screenshot
             * (body)
             *
             * @return {Promise}
             */
            page: function() {
                return Super.prototype.page.apply(this, [ OP3.Meta.pagePreviewUrl ]);
            },

            /**
             * Get page thumbnail
             * (body)
             *
             * @return {Promise}
             */
            thumbPage: function() {
                return Super.prototype.thumbPage.apply(this, [ OP3.Meta.pagePreviewUrl ]);
            },

            /**
             * Get page screenshot (body)
             * with width and content-type
             * customization
             *
             * @param  {Number}  width
             * @param  {String}  contentType
             * @return {Promise}
             */
            customPage: function(width, contentType) {
                return Super.prototype.customPage.apply(this, [ OP3.Meta.pagePreviewUrl, width, contentType ]);
            },

            /**
             * Get template screenshot
             * (#op3-designer-element)
             *
             * @return {Promise}
             */
            template: function() {
                return Super.prototype.template.apply(this, [ OP3.Meta.pagePreviewUrl ]);
            },

            /**
             * Get template thumbnail
             * (#op3-designer-element)
             *
             * @return {Promise}
             */
            thumbTemplate: function() {
                return Super.prototype.thumbTemplate.apply(this, [ OP3.Meta.pagePreviewUrl ]);
            },

            /**
             * Get template screenshot (#op3-designer-element)
             * with width and content-type
             * customization
             *
             * @param  {Number}   width
             * @param  {String}   contentType
             * @param  {Function} success
             * @param  {Function} error       (optional)
             * @return {Void}
             */
            customTemplate: function(width, contentType) {
                return Super.prototype.customTemplate.apply(this, [ OP3.Meta.pagePreviewUrl, width, contentType ]);
            },

            /**
             * Get op3 element screenshot
             *
             * @param  {Mixed}   node
             * @return {Promise}
             */
            element: function(node) {
                // called from parent.thumbElement messes
                // the arguments list...
                if (arguments && arguments.length > 1 && arguments[0] === OP3.Meta.pagePreviewUrl)
                    node = arguments[1];

                return Super.prototype.element.apply(this, [ OP3.Meta.pagePreviewUrl, node ]);
            },

            /**
             * Get op3 element thumbnail
             *
             * @param  {Mixed}   node
             * @return {Promise}
             */
            thumbElement: function(node) {
                return Super.prototype.thumbElement.apply(this, [ OP3.Meta.pagePreviewUrl, node ]);
            },

            /**
             * Get op3 element screenshot
             * with width and content-type
             * customization
             *
             * @param  {Mixed}   node
             * @param  {Number}  width
             * @param  {String}  contentType
             * @return {Promise}
             */
            customElement: function(node, width, contentType) {
                return Super.prototype.customElement.apply(this, [ OP3.Meta.pagePreviewUrl, node, width, contentType ]);
            },

            /**
             * Get screenshot of current active element
             * and display it in new tab
             *
             * @return {Void}
             */
            popupThumbActiveElement: function() {
                var node = OP3.Designer.activeElement().node();
                if ($(node).is("html"))
                    throw "OP3.Screenshot - no elements active";

                var width = 256,
                    height = null,
                    margin = 16;

                return this.element(node)
                    .then(function(img) {
                        return this._imageResize(img, width, height);
                    }.bind(this))
                    .then(function(img) {
                        return this._imageCanvasResize(img, img.width + 2*margin, img.height + 2*margin, null, null);
                    }.bind(this))
                    .then(function(img) {
                        this.openImageInNewTab(img);
                    }.bind(this));
            },

            /**
             * Iframe ready event handler:
             * if current element is changed and page
             * not saved we need to clone it to iframe
             *
             * @param  {Object} response
             * @return {Void}
             */
            _handleFramePrepared_anElementRefresh: function(response) {
                // page not changed, nothing to do
                if (OP3.Meta.postType !== "op_global_element" && !this.changed())
                    return;

                // element to replace
                var $replace = $(null);
                if (response.method === "page" || response.method === "template")
                    $replace = OP3.Designer.$ui.parent;
                else
                    $replace = OP3.Designer.$ui.parent.find('.op3-element[data-op3-uuid="' + response.method + '"]');

                // replace section on which element is on
                if ($replace.is(".op3-element")) {
                    var $closest = $replace.parents(".op3-element").last();
                    if ($closest.length)
                        $replace = $closest;
                }

                // clone element
                var $ref = response.$("#" + $replace.attr("id")),
                    html = $replace.get(0).outerHTML,
                    $clone = response.$(html);

                // remove old section and append new one
                if ($ref.length) {
                    $clone.insertAfter($ref)
                    $ref.remove();
                }
                else
                    $clone.appendTo("#op3-designer-element > [data-op3-children]")

                // make sure new stylesheet is applied
                // (it would be nice if we could use style's
                // innerHTML property, but changing cssRules
                // does not trigger innerHTML change, so we
                // need to iterate rules and create our own
                // rules list...
                OP3.Designer.$ui.stylesheet.each(function() {
                    var sheet = response.document.createElement("style");
                    for (var i = 0; i < this.attributes.length; i++) {
                        var attr = this.attributes[i],
                            name = attr.name,
                            value = attr.value;

                        sheet.setAttribute(name, value);
                    }

                    var rules = "";
                    for (var i = 0; i < this.sheet.cssRules.length; i++) {
                        rules += this.sheet.cssRules[i].cssText + "\n";
                    }

                    response.$(sheet)
                        .html(rules)
                        .appendTo("head");
                });
            },

            /* --- */

        },

    });

    // globalize
    window.OP3.Screenshot = new OP3_Screenshot();

    // link designer
    OP3.bind("load::designer", function(e, o) {
        e.origin.Screenshot = OP3.Screenshot;
    });

    // set default options
    OP3.bind("ready", function(e, o) {
        OP3_Screenshot.prototype._defaults = $.extend({}, OP3_Screenshot.prototype._defaults, {
            assetsUrl: OP3.Meta.assets,
            proxyUrl: OP3.Meta.proxy,
        });

        // ...and fix current ones
        OP3.Screenshot._options.assetsUrl = OP3_Screenshot.prototype._defaults.assetsUrl;
        OP3.Screenshot._options.proxyUrl = OP3_Screenshot.prototype._defaults.proxyUrl;
    });

    // add screenshot methods to op3 element/document
    OP3.bind("ready", function(e, o) {
        var op3 = OP3.Designer.ownerDocument.defaultView.OP3;
        op3.Elements._extension.type.Default.prototype.screenshot = function() {
            if (this === OP3.Document)
                return OP3.Screenshot.template();
            else
                return OP3.Screenshot.element(this.node());
        }
        op3.Elements._extension.type.Default.prototype.thumbnail = function() {
            if (this === OP3.Document)
                return OP3.Screenshot.thumbTemplate();
            else
                return OP3.Screenshot.thumbElement(this.node());
        }
    });

})(jQuery, window, document);
