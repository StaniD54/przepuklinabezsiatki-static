;(function($, window, document, undefined) {
    /**
     * Strict mode.
     */
    "use strict";

    /**
     * ice_Editor constructor
     *
     * @param {Node}   element
     * @param {Object} options
     */
    var ice_Editor = function(element, options) {
        if (!(this instanceof ice_Editor))
            throw "ice.OP3.Editor: ice.OP3.Editor is a constructor";

        ice.Editor.apply(this, arguments);
    }

    /**
     * ice_Editor prototype
     *
     * @type {Object}
     */
    ice_Editor.prototype = $.extend(Object.create(ice.Editor.prototype), {
        /**
         * Can surround contents.
         *
         * @return {Boolean}
         */
        _canSurroundContents: function() {
            var selection = window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null,
                text = range ? range.toString() : null,
                result = true
                    && range
                    && range.startContainer.parentNode === range.endContainer.parentNode
                    && !!ice.Util.closest(range.endContainer.parentNode, this.element);

            // We can tweak (in wrap method) our selection
            // so the selected text won't change, but
            // allow surroundContents.
            if (range && !result)
                result = !!range
                    && range.startContainer !== range.endContainer
                    && range.startContainer.nodeType === Node.TEXT_NODE
                    && range.startContainer.textContent.slice(range.startOffset) === text;
            if (range && !result)
                result = !!range
                    && range.endContainer.nodeType === Node.TEXT_NODE
                    && range.endContainer.parentElement === range.startContainer
                    && range.startContainer === range.commonAncestorContainer
                    && range.startOffset === 0
                    && range.endContainer.textContent.slice(0, range.endOffset) === text;

            return result;
        },

        /**
         * Trigger change on [contenteditable] element
         * so the op3 elementchange event triggers.
         *
         * @return {Void}
         */
        _applyChanges: function() {
            $(this.element)
                .trigger("op3contenteditablechange");
        },

        /**
         * Document execCommand with styleWithCSS
         *
         * Remove [contenteditable="false"] attribute from
         * animation wrapper so the style can be applied.
         *
         * @param  {String}  key
         * @param  {Mixed}   value (optional)
         * @return {Boolean}
         */
        _execCommandStyleWithCSS: function(key, value) {
            var wrapper = ice.Util.getSelectedNodes('span.op3-text-animation[contenteditable="false"]');
            (wrapper || []).forEach(function(node) { node.removeAttribute("contenteditable"); })

            var result = ice.Editor.prototype._execCommandStyleWithCSS.apply(this, arguments);
            (wrapper || []).forEach(function(node) { node.setAttribute("contenteditable", "false"); })

            return result;
        },

        /**
         * Document execCommand without styleWithCSS
         *
         * Remove [contenteditable="false"] attribute from
         * animation wrapper so the style can be applied.
         *
         * @param  {String}  key
         * @param  {Mixed}   value (optional)
         * @return {Boolean}
         */
        _execCommandStyleWithoutCSS: function(key, value) {
            var wrapper = ice.Util.getSelectedNodes('span.op3-text-animation[contenteditable="false"]');
            (wrapper || []).forEach(function(node) { node.removeAttribute("contenteditable"); })

            var result = ice.Editor.prototype._execCommandStyleWithoutCSS.apply(this, arguments);
            (wrapper || []).forEach(function(node) { node.setAttribute("contenteditable", "false"); })

            return result;
        },

        /**
         * Set font weight bold on selection.
         *
         * Any element property change that changes DOM
         * element size needs size re-calculation on rich
         * text animation library, and since this size is
         * stored in jQuery.data all we need is delete the
         * data and let library re-calculates the size
         * again.
         *
         * @return {Boolean}
         */
        bold: function() {
            var result = ice.Editor.prototype.bold.apply(this, arguments);
            if (result)
                this._animationWidthReset();

            return result;
        },

        /**
         * Set font style italic on selection.
         *
         * Any element property change that changes DOM
         * element size needs size re-calculation on rich
         * text animation library, and since this size is
         * stored in jQuery.data all we need is delete the
         * data and let library re-calculates the size
         * again.
         *
         * @return {Boolean}
         */
        italic: function() {
            var result = ice.Editor.prototype.italic.apply(this, arguments);
            if (result)
                this._animationWidthReset();

            return result;
        },

        /**
         * Set link on selection
         *
         * Remove [contenteditable="false"] attribute from
         * animation wrapper so the style can be applied.
         *
         * @param  {String}  value  url
         * @param  {String}  target (optional)
         * @param  {String}  rel    (optional)
         * @return {Boolean}
         */
        createLink: function(value, target, rel) {
            var wrapper = ice.Util.getSelectedNodes('span.op3-text-animation[contenteditable="false"]');
            (wrapper || []).forEach(function(node) { node.removeAttribute("contenteditable"); })

            var result = ice.Editor.prototype.createLink.apply(this, arguments);
            (wrapper || []).forEach(function(node) { node.setAttribute("contenteditable", "false"); })

            this._applyChanges();

            return result;
        },

        /**
         * Unlink selection
         *
         * Remove [contenteditable="false"] attribute from
         * animation wrapper so the style can be applied.
         *
         * @return {Boolean}
         */
        unlink: function() {
            var wrapper = ice.Util.getSelectedNodes('span.op3-text-animation[contenteditable="false"]');
            (wrapper || []).forEach(function(node) { node.removeAttribute("contenteditable"); })

            var result = ice.Editor.prototype.unlink.apply(this, arguments);
            (wrapper || []).forEach(function(node) { node.setAttribute("contenteditable", "false"); })

            this._applyChanges();

            return result;
        },

        /**
         * Remove format on selection
         *
         * Since there is no official documentation for
         * execCommand API, every browser has it's own logic
         * for removeFormat. Firefox removes our animation
         * wrapper, and we don't want that. The fix for this
         * would be to code our own logic for removeFormat,
         * but that would take too much time, and would
         * probably be not very optimal. So let's just make
         * sure that every browser acts the same: remove
         * our animation wrapper...
         *
         * @return {Boolean}
         */
        removeFormat: function() {
            var wrapper = ice.Util.getSelectedNodes('span.op3-text-animation'),
                contents = null;
            (wrapper || []).forEach(function(node) {
                var $node = $(node),
                    library = $node.data("jquery-rich-text-animation")
                if (library)
                    library.destroy();

                $node
                    .find("svg")
                    .remove();

                contents = $node
                    .contents()
                    .unwrap()
                    .get(0);
            });

            // Execute removeFormat
            var result = ice.Editor.prototype.removeFormat.apply(this, arguments);

            // If only animation wrapper was selected, the selection
            // gets lost, so let's re-select wrapper's content
            var selection = this.window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null;
            if (contents && (!range || selection.isCollapsed)) {
                range = this.document.createRange();
                range.selectNode(contents);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            if (contents && contents.parentElement)
                contents.parentElement.normalize();

            this._applyChanges();

            return result || !!wrapper;
        },

        /**
         * Get selection decorations
         *
         * @return {Object}
         */
        decorations: function() {
            var result = ice.Editor.prototype.decorations.apply(this, arguments);
            if (result === null)
                return result;

            result.animationCount = ice.Util.getSelectedNodes("span.op3-text-animation").length;
            if (!result.animationCount) {
                var canSurroundContents = this._canSurroundContents();
                if (!canSurroundContents)
                    result.animationCount = null;
            }

            return result;
        },

        /**
         * Wrap selection with element
         *
         * @param  {String}  tagName
         * @param  {String}  className
         * @param  {Object}  attributes (optional)
         * @return {Boolean}
         */
        wrap: function(tagName, className, attributes) {
            var selection = this.window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null,
                text = range ? range.toString() : null;
            if (!range || !this._canSurroundContents())
                return false;

            // We can tweak our selection so the selected text
            // won't change, but allow surroundContents.
            var canTweak = true
                && range.startContainer !== range.endContainer
                && range.startContainer.nodeType === Node.TEXT_NODE
                && range.startContainer.textContent.slice(range.startOffset) === text;
            if (canTweak)
                range.setEnd(range.startContainer, range.startOffset + text.length);

            // Yet another selection tweak.
            canTweak = !canTweak
                && range.endContainer.nodeType === Node.TEXT_NODE
                && range.endContainer.parentElement === range.startContainer
                && range.startContainer === range.commonAncestorContainer
                && range.startOffset === 0
                && range.endContainer.textContent.slice(0, range.endOffset) === text;
            if (canTweak)
                range.setStart(range.endContainer, 0);

            var wrapper = this.document.createElement(tagName);
            wrapper.className = className.replace(/\s+/g, ' ').trim();
            for (var attr in (attributes || {})) {
                wrapper.setAttribute(attr, attributes[attr]);
            }

            range.surroundContents(wrapper);

            var firstChild = wrapper.firstChild,
                lastChild = wrapper.lastChild;
            if (firstChild) {
                range.setStart(firstChild, 0);
                range.setEnd(lastChild, lastChild.length);
            }
            else
                range.selectNodeContents(wrapper);

            selection.removeAllRanges();
            selection.addRange(range);

            return true;
        },

        /**
         * Unwrap selection with element
         *
         * @param  {String}  tagName
         * @param  {String}  className
         * @return {Boolean}
         */
        unwrap: function(tagName, className) {
            var selection = this.window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null;
            if (!range)
                return false;

            var wrappers = ice.Util.getSelectedNodes(tagName + "." + className.split(" ").join("."));
            if (!wrappers.length)
                return false;

            var wrapper = wrappers[0],
                parentNode = wrapper.parentNode,
                childNodes = Array.prototype.slice.call(wrapper.childNodes);

            while (wrapper.firstChild)
                wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
            wrapper.parentNode.removeChild(wrapper);

            var childNodes = childNodes.filter(function(node) {
                    return node.parentNode;
                }),
                firstChild = childNodes.length ? childNodes[0] : null,
                lastChild = childNodes.length ? childNodes[childNodes.length - 1] : null;

            if (firstChild) {
                range = this.document.createRange();
                range.setStartBefore(firstChild);
                range.setEndAfter(lastChild);
                selection.removeAllRanges();
                selection.addRange(range);
            }

            parentNode.normalize();

            return true;
        },

        /**
         * Select selection with element
         *
         * @param  {String}  tagName
         * @param  {String}  className
         * @return {Boolean}
         */
        select: function(tagName, className) {
            var wrappers = ice.Util.getSelectedNodes(tagName + "." + className.split(" ").join("."));
            if (!wrappers || !wrappers.length)
                return false;

            var selection = this.window.getSelection(),
                range = this.document.createRange(),
                wrapper = wrappers[0];

            range.selectNodeContents(wrapper);

            selection.removeAllRanges();
            selection.addRange(range);

            return wrapper;
        },

        /**
         * Wrap selection with animation wrapper logic.
         *
         * @param  {String}  tagName
         * @param  {String}  className
         * @param  {String}  markup    (optional)
         * @param  {String}  library   (optional)
         * @param  {Object}  options   (optional)
         * @return {Boolean}
         */
        _animationWrap: function(type, style, markup, library, options) {
            if (!this.active)
                return false;
            if (!type || !style)
                return false;

            // Wrap selection
            this.wrap("span", "op3-text-animation ice-preserve", {
                contenteditable: false,
                //spellcheck: false,
                "data-op3-text-animation-type": type,
                "data-op3-text-animation-style": style,
                "data-op3-text-animation-library": library,
            });

            // Get wrapper from selection
            var wrapper = this.select("span", "op3-text-animation");
            if (!wrapper)
                return false;

            // Append element to wrapper
            if (markup)
                $(markup)
                    .addClass("op3-text-animation-markup")
                    .attr("data-rich-text-animation-style", style)
                    .appendTo(wrapper);

            // Init and animate with jQuery
            this._animationLibExec(options || {});
            this._animationLibExec("observe");

            return true;
        },

        /**
         * Wrap selection with animation wrapper.
         *
         * @param  {String}  tagName
         * @param  {String}  className
         * @param  {String}  markup    (optional)
         * @param  {String}  library   (optional)
         * @param  {Object}  options   (optional)
         * @return {Boolean}
         */
        animationWrap: function(type, style, markup, library, options) {
            var result = this._animationWrap(type, style, markup, library);
            if (result) {
                this._applyChanges();

                // @todo:
                // Wrapper was created and observe (and therefore
                // animation as well) was executed. The changes
                // has been applied before animation execution.
                // This may be a problem with history. If we go
                // undo/redo we'll get to the point where
                // animation has not been triggered yet. This
                // is probably ok for word animations, but a
                // problem for draw animations (svg is not
                // visible).
            }

            return result;
        },

        /**
         * Unwrap animation wrapper on selection logic.
         *
         * @return {Boolean}
         */
        _animationUnwrap: function() {
            if (!this.active)
                return false;

            // Get wrapper from selection
            var wrapper = this.select("span", "op3-text-animation");
            if (!wrapper)
                return false;

            // Destruct jQuery library
            this._animationLibExec("destroy");

            // Remove element from wrapper
            $(wrapper)
                .find(".op3-text-animation-markup")
                .remove();

            // Unwrap
            return this.unwrap("span", "op3-text-animation");
        },

        /**
         * Unwrap animation wrapper on selection.
         *
         * @return {Boolean}
         */
        animationUnwrap: function() {
            var result = this._animationUnwrap();
            if (result)
                this._applyChanges();

            return result;
        },

        /**
         * Edit animation: unwrap/wrap.
         *
         * @param  {String}  tagName
         * @param  {String}  className
         * @param  {String}  markup    (optional)
         * @param  {String}  library   (optional)
         * @param  {Object}  options   (optional)
         * @return {Boolean}
         */
        animationEdit: function(tagName, className, markup, library, options) {
            var unwrap = this._animationUnwrap(),
                wrap = this._animationWrap(tagName, className, markup, library, options),
                result = unwrap || wrap;
            if (result)
                this._applyChanges();

            return result;
        },

        /**
         * Set option on animation wrapper (using jQuery
         * library) logic.
         *
         * @param  {Mixed} method
         * @return {Mixed}
         */
        _animationLibExec: function(method) {
            var wrapper = this.select("span", "op3-text-animation"),
                result = null;
            if (!wrapper)
                return result;

            // Destruct jQuery library instance
            var library = $(wrapper).data("jquery-rich-text-animation");
            if (!library) {
                // Init jQuery library instance
                library = $(wrapper).attr("data-op3-text-animation-library");
                library = $(wrapper)[library](typeof method === "object" ? method : {}).data("jquery-rich-text-animation");
            }

            // Apply to jQuery library
            if (typeof method === "string") {
                var args = Array.prototype.slice.call(arguments, 1);
                result = library[method].apply(library, args);
            }

            return result;
        },

        /**
         * Execute method on animation wrapper (using jQuery
         * library).
         *
         * @param  {Mixed} method
         * @return {Mixed}
         */
        animationLibExec: function(method) {
            var result = this._animationLibExec.apply(this, arguments);
            if (method === 'setOption')
                this._applyChanges();

            return result;
        },

        /**
         * Animation width reset.
         *
         * Any element property change that changes DOM
         * element size needs size re-calculation on rich
         * text animation library, and since this size is
         * stored in jQuery.data all we need is delete the
         * data and let library re-calculates the size
         * again.
         *
         * @return {Void}
         */
        _animationWidthReset: function() {
            $(ice.Util.getSelectedNodes("span.op3-text-animation"))
                .css("width", "")
                    .find("[data-rich-text-animation-word]")
                    .removeData("rich-text-animation-word-size");
        },
    });

    // Globalize.
    if (!ice.OP3)
        ice.OP3 = {};
    ice.OP3.Editor = ice_Editor;

    // Click select
    $(document).on("click", ".ice-editor[contenteditable] span.op3-text-animation", function(e) {
        var selection = window.getSelection(),
            range = document.createRange();

        range.selectNodeContents(e.currentTarget);

        selection.removeAllRanges();
        selection.addRange(range);
    });

})(window.jQuery, window, document, undefined);
