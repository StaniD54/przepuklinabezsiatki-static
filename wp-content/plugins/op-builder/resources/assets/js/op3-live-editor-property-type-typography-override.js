/**
 * OptimizePress3 element type:
 * op3 element type boolean manipulation.
 *
 * Replacing select tag with 0/1 options
 * with switch toggle
 */
;(function($, window, document) {

    "use strict";

    /**
     * CSS selector.
     *
     * @type {String}
     */
    var _selector = '.op3-element-options-group[data-op3-element-options-group-id="typography_override"].dropdown';

    /**
     * Render option widget.
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var $group = $(o.parent).find(_selector);
        if (!$group.length)
            return;

        var element = OP3.Designer.activeElement(),
            children = [ "h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "a", "blockquote", "pre" ];

        // If using Typography Control Panel element, use current
        // element and all it's children types only.
        if (/^tcp_/.test(element.type()))
            children = OP3.$(element)
                .find("*")
                .add(element)
                .filter(function() {
                    return !OP3.$(this).children().length;
                })
                .toArray()
                .map(function(node) {
                    return OP3.$(node).type().replace(/^tcp_/, "");
                });

        // Map children as object (with type and title).
        children = children.map(function(tagName) {
            var type = "tcp_" + tagName,
                title = OP3.Designer.config(type).title;

            return {
                type: type,
                title: title,
                tagName: tagName,
            };
        });

        // Render <ul> with <li> children containing text title
        // and override button.
        $group.each(function() {
            var override = OP3._("Override"),
                template = ''
                    + '<ul class="op3-options-group-button-list">'
                    + children
                        .map(function(child) {
                            return ''
                                + '<li>'
                                + child.title
                                + ' <button type="button" value="' + child.tagName + '">' + override + '</button>'
                                + '</li>';
                        })
                        .join("")
                    + '</ul>';

            $(template)
                .on("click", "button", _handler)
                .appendTo(this);
        });
    }

    /**
     * Clean:
     * destroy option widget.
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _clean = function(e, o) {
        // pass
    }

    /**
     * Button click event handler.
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _handler = function(e) {
        var element = OP3.Designer.activeElement(),
            node = !element || element === OP3.Document || /^tcp_/.test(element.type()) ? null : element.node(),
            tagName = $(e.target).val();

        OP3.TypographyControlPanel.overrideAsync(tagName, node);
    }

    // Init.
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

})(jQuery, window, document);
