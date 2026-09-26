/**
 * OptimizePress3 designer extension:
 * facebook elements manipulation.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-designer.js
 */
;(function($, window, document) {

    "use strict";

    var OP3_Designer_Facebook = OP3.defineClass({

        Name: "OP3.Designer.Facebook",

        Constructor: function() {
            this._timeouts = [];
        },

        Prototype: {
            /**
             * EU visitors notice template.
             *
             * @type {String}
             */
            TEMPLATE: ''
                + '<div class="facebook-notice-wrapper">'
                + '<div class="facebook-notice-title">OptimizePress Admin Notice</div>'
                + '<div class="facebook-notice">'
                + 'Due to privacy changes at Facebook, any Facebook elements embedded on your pages will only show for EU visitors who are logged into Facebook who have excepted cookies and tracking.'
                // Click is prevented in op3 so we manually follow the link here
                + ' <a href="https://optimizelink.com/fbcomments-troubleshooting" target="_blank" onclick="window.open(this.href)">Learn more</a>'
                + '</div>'
                + '</div>',

            /**
             * Timeout used for parsing facebook element.
             *
             * @type {Number}
             */
            TIMEOUT: 400,

            /**
             * Facebook element type list.
             *
             * @return {Array}
             */
            type: function() {
                return [
                    "facebookbutton",
                    "facebookcomments",
                ];
            },

            /**
             * OP3.Query selector for facebook element types.
             *
             * @return {String}
             */
            selector: function() {
                return this.type().join(",");
            },

            /**
             * Get all facebook elements on target.
             *
             * @param  {Node}      target (opitonal)
             * @return {OP3_Query}
             */
            getElements: function(target) {
                var selector = this.selector();
                if (target) {
                    var result = OP3.$(target);
                    if (result.is(selector))
                        return result;

                    return result.find(selector);
                }

                return OP3.$(selector);
            },

            /**
             * Parse facebook element (API request).
             *
             * Wrapping this in setTimeout to ensure that
             * rerendering isn't triggered unnecessarily.
             *
             * @param  {Node} target (optional)
             * @return {Void}
             */
            parse: function(target) {
                this.getElements(target).each(function(index, node) {
                    // Skip parsing if element hasn't been appended to page yet.
                    var $node = $(node),
                        appendCount = $node.data("op3-element-append-count") || 0;
                    if (!appendCount)
                        return;

                    // Clear timeout for element.
                    var element = OP3.$(node),
                        uuid = element.uuid();
                    clearTimeout(this._timeouts[uuid]);

                    // Delay.
                    this._timeouts[uuid] = setTimeout(function() {
                        // Clear.
                        delete this._timeouts[uuid];

                        // Do parse.
                        FB.XFBML.parse(node, function() {
                            // Append EU visitors notice (if not already done so).
                            if (!$node.find(".facebook-notice-wrapper").length)
                                $node
                                    .find(".fb_iframe_widget")
                                    .before(this.TEMPLATE);
                        }.bind(this));
                    }.bind(this), this.TIMEOUT);
                }.bind(this));
            },
        },

    });

    // Globalize.
    window.OP3.Designer.Facebook = new OP3_Designer_Facebook();

    // Parse facebook elements on init (using delay so the
    // op3-element-append-count gets initialized).
    OP3.bind("load", function(e) {
        setTimeout(function() {
            OP3.Designer.Facebook.parse();
        });
    });

    // Parse facebook elements on element append.
    OP3.bind("elementappendfirst", function(e, o) {
        OP3.Designer.Facebook.parse(o.node);
    });

})(jQuery, window, document);
