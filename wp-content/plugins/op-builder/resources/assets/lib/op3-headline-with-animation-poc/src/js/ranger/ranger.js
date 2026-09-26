;(function(root, factory) {
    // AMD.
    if (typeof define === 'function' && define.amd)
        define(factory);

    // Node, CommonJS-like
    else if (typeof exports === 'object')
        module.exports = factory();

    // Browser globals.
    else
        root.Ranger = factory();
} (this, function() {
    // Strict mode.
    'use strict';

    /**
     * Ranger constructor.
     *
     * @param  {String}   tagName
     * @param  {String}   className
     * @param  {Mixed}    parent    (optional)
     * @param  {Document} context   (optional)
     * @return {Void}
     */
    var Ranger = function(tagName, className, parent, context) {
        tagName = tagName || 'span';
        className = className || '';
        parent = parent || null;
        context = context || document;

        if (!(this instanceof Ranger))
            throw 'Ranger: Ranger is a constructor.';
        if (typeof tagName !== 'string')
            throw 'Ranger: tagName argument must be of String type.';
        if (typeof className !== 'string')
            throw 'Ranger: className argument must be of String type.';
        if (!(context instanceof Document))
            throw 'Ranger: context argument must be of Document type.';

        this._init(tagName, className, parent, context);
    };

    /**
     * Ranger prototype.
     *
     * @type {Object}
     */
    Ranger.prototype = {
        /**
         * Reassign constructor.
         *
         * @type {Function}
         */
        constructor: Ranger,

        /**
         * Constructor.
         *
         * @param  {String}   tagName
         * @param  {String}   className
         * @param  {Mixed}    parent    (optional)
         * @param  {Document} context
         * @return {Void}
         */
        _init: function(tagName, className, parent, context) {
            this._tagName = tagName;
            this._className = className;
            this._parent = parent;
            this._document = context;
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            delete this._document;
            delete this._parent;
            delete this._className;
            delete this._tagName;
        },

        /**
         * Parent property getter.
         *
         * @return {Mixed}
         */
        get parent() {
            return this._parent;
        },

        /**
         * Window property getter.
         *
         * @return {Window}
         */
        get window() {
            return this.document.defaultView;
        },

        /**
         * Document (context) property getter.
         *
         * @return {Document}
         */
        get document() {
            return this._document;
        },

        /**
         * Tag name property getter.
         *
         * @return {String}
         */
        get tagName() {
            return this._tagName;
        },

        /**
         * Class name property getter.
         *
         * @return {String}
         */
        get className() {
            return this._className;
        },

        /**
         * Selector property getter.
         *
         * @return {String}
         */
        get selector() {
            return this.tagName + (this.className ? '.' + this.className : '');
        },

        /**
         * Wrap selection with ranger wrapper element logic
         * (useful for overriding on extended classes).
         *
         * @param  {Range} range
         * @return {Node}
         */
        _wrap: function(range) {
            var wrapper = this.document.createElement(this.tagName);
            wrapper.className = this.className;

            range.surroundContents(wrapper);

            return wrapper;
        },

        /**
         * Wrap selection with ranger wrapper element.
         *
         * Warning: this method doesn't have any validator.
         * Before calling it do check if selectin can be
         * wrapped.
         *
         * @return {Void}
         */
        wrap: function() {
            var selection = this.window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null;
            if (!range)
                return;

            var wrapper = this._wrap(range),
                firstChild = wrapper.firstChild,
                lastChild = wrapper.lastChild;
            if (firstChild) {
                range.setStart(firstChild, 0);
                range.setEnd(lastChild, lastChild.length);
            }
            else
                range.selectNodeContents(wrapper);

            selection.removeAllRanges();
            selection.addRange(range);
        },

        /**
         * Unwrap ranger wrapper element in selection logic
         * (useful for overriding on extended classes).
         *
         * @param  {Node} node
         * @return {Void}
         */
        _unwrap: function(node) {
            while (node.firstChild)
                node.parentNode.insertBefore(node.firstChild, node);

            node.parentNode.removeChild(node);
        },

        /**
         * Unwrap ranger wrapper element in selection.
         *
         * @return {Void}
         */
        unwrap: function() {
            var wrapper = this._getSelectedNodes(this.selector);
            if (!wrapper || !wrapper.length)
                return;

            wrapper = wrapper[0];
            var parentNode = wrapper.parentNode,
                childNodes = Array.prototype.slice.call(wrapper.childNodes);

            this._unwrap(wrapper);

            var childNodes = childNodes.filter(function(node) {
                    return node.parentNode;
                }),
                firstChild = childNodes.length ? childNodes[0] : null,
                lastChild = childNodes.length ? childNodes[childNodes.length - 1] : null;

            if (firstChild) {
                var selection = this.window.getSelection(),
                    range = this.document.createRange();
                range.setStartBefore(firstChild);
                range.setEndAfter(lastChild);
                selection.removeAllRanges();
                selection.addRange(range);
            }

            parentNode.normalize();
        },

        /**
         * Toggle wrap/unwrap.
         *
         * @return {Mixed}
         */
        toggle: function() {
            if (this._selectionHasWrapper())
                return this.unwrap();
            else
                return this.wrap();
        },

        /**
         * Find first ranger wrapper element in selection and
         * select it.
         *
         * @return {Node}
         */
        select: function() {
            var wrapper = this._getSelectedNodes(this.selector);
            if (!wrapper || !wrapper.length)
                return null;

            var selection = this.window.getSelection(),
                range = this.document.createRange();

            wrapper = wrapper[0];
            //var childNodes = wrapper.childNodes;
            //if (childNodes.length) {
            //    range.setStart(childNodes[0], 0);
            //    range.setEnd(childNodes[childNodes.length - 1], childNodes[childNodes.length - 1].length);
            //}
            //else
            //    range.selectNodeContents(wrapper);
            range.selectNodeContents(wrapper);

            selection.removeAllRanges();
            selection.addRange(range);

            return wrapper;
        },

        /**
         * Is selection collapsed.
         *
         * @return {Boolean}
         */
        isCollapsed: function() {
            return this.window.getSelection().isCollapsed;
        },

        /**
         * Can selection be wrapped with ranger wrapper element.
         *
         * @return {Boolean}
         */
        canWrap: function() {
            return this._canSurroundContents();
        },

        /**
         * Can ranger wrapper element in selection be unwrapped.
         *
         * @return {Boolean}
         */
        canUnwrap: function() {
            return this._selectionHasWrapper();
        },

        /**
         * Can toggle wrap/unwrap.
         *
         * @return {Boolean}
         */
        canToggle: function() {
            return this._selectionHasWrapper() ? this.canUnwrap() : this.canWrap();
        },

        /**
         * Can ranger wrapper element in selection be selected.
         *
         * @return {Void}
         */
        canSelect: function() {
            return this._selectionHasWrapper();
        },

        /**
         * Is entire ranger wrapper element selected.
         *
         * @return {Void}
         */
        isSelected: function() {
            return this._selectionIsWrapper();
        },

        /**
         * Can surroundContents method be executed on range.
         *
         * @return {Boolean}
         */
        _canSurroundContents: function() {
            var selection = this.window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null;
            if (!range)
                return false;

            var result = !range.collapsed && range.startContainer.parentNode === range.endContainer.parentNode;
            if (result && this.parent)
                result = !!this._closest(range.endContainer.parentNode, this.parent);

            return result;
        },

        /**
         * Is entire ranger wrapper element selected.
         *
         * @return {Boolean}
         */
        _selectionIsWrapper: function() {
            var selection = this.window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null;
            if (!range)
                return false;

            var result = range.startContainer === range.endContainer;
            if (result && this.parent)
                result = !!this._is(range.startContainer, this.parent);

            return result;
        },

        /**
         * Is there ranger wrapper element in selection range.
         *
         * @return {Boolean}
         */
        _selectionHasWrapper: function() {
            return !!(this._getSelectedNodes(this.selector) || [])
                .filter(function(node) {
                    return this.parent ? !!this._closest(node, this.parent) : true;
                }.bind(this))
                .length;
        },

        /**
         * Get all nodes in selected range.
         * https://stackoverflow.com/questions/667951/how-to-get-nodes-lying-inside-a-range-with-javascript#answer-28150191
         *
         * @param  {String} selector (optional)
         * @return {Array}
         */
        _getSelectedNodes: function(selector) {
            var selection = this.window.getSelection(),
                range = selection.rangeCount ? selection.getRangeAt(0) : null;
            if (!range)
                return null;

            var result = [],
                startContainer = range.startContainer.childNodes[range.startOffset] || range.startContainer,
                endContainer = range.endContainer.childNodes[range.endOffset] || range.endContainer,
                commonAncestor = range.commonAncestorContainer,
                node;

            // Start/end fix.
            if (startContainer && range.startOffset === startContainer.length || endContainer && range.endOffset && range.endOffset === 0) {
                if (startContainer && range.startOffset === startContainer.length && startContainer.nextSibling) {
                    startContainer = startContainer.nextSibling;

                    while (startContainer.childNodes && startContainer.childNodes.length)
                        startContainer = startContainer.childNodes[0];
                }

                if (endContainer && range.endOffset === 0 && endContainer.previousSibling) {
                    endContainer = endContainer.previousSibling;

                    while (endContainer.childNodes && endContainer.childNodes.length)
                        endContainer = endContainer.childNodes[endContainer.childNodes.length - 1];
                }

                range = this.document.createRange();
                range.setStart(startContainer, 0);
                range.setEnd(endContainer, endContainer.length);
                commonAncestor = range.commonAncestorContainer;
            }

            // Walk parent nodes from startContainer to commonAncestor.
            for (node = startContainer; node; node = node.parentNode) {
                result.unshift(node);

                if (node === commonAncestor)
                    break;
            }

            // Walk children and siblings from startContainer until
            // endContainer is found.
            for (node = startContainer; node; node = this._nextNode(node)) {
                if (!this._closest(node.parentNode, commonAncestor))
                    break;
                if (result.indexOf(node) === -1)
                    result.push(node);
                if (node === endContainer)
                    break;
            }

            // Select parent elements.
            var parents = [];
            for (var i = 0; i < result.length; i++) {
                node = result[i].parentElement;

                while (node)
                    if (result.indexOf(node) !== -1)
                        break;
                    else if (parents.indexOf(node) === -1)
                        parents.push(node);
                    else
                        node = node.parentElement;
            }

            // Filter selector.
            return result
                .concat(parents)
                .filter(function(node) {
                    return selector ? this._is(node, selector) : true;
                }.bind(this));
        },

        /**
         * Get next node while searching through children and
         * parent elements.
         *
         * @param  {Node}  node
         * @return {Mixed}
         */
        _nextNode: function(node) {
            if (node.firstChild)
                return node.firstChild;

            while (node) {
                if (node.nextSibling)
                    return node.nextSibling;

                node = node.parentNode;
            }

            return node;
        },

        /**
         * Check if node matched selector.
         *
         * @param  {Mixed}   selector
         * @return {Boolean}
         */
        _is: function(node, selector) {
            if (typeof selector === 'string' && typeof node.matches === 'function')
                return node.matches(selector);
            else if (selector instanceof Node)
                return node === selector;

            return false;
        },

        /**
         * Get the first element that matches the selector by
         * testing the node itself and traversing up through
         * its ancestors in the DOM tree.
         *
         * @param  {Node}  node
         * @param  {Mixed} selector
         * @return {Mixed}
         */
        _closest: function(node, selector) {
            while (node && !this._is(node, selector))
                node = node.parentElement;

            return node;
        },

        /* --- */
    };

    // Class as result.
    return Ranger;
}));
