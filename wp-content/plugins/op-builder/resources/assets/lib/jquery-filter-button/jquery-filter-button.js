;(function() {
    // Strict mode.
    "use strict";

    // Dependencies.
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize FilterButton.
     *
     * @param  {Node}   options
     * @param  {Object} options
     * @return {Void}
     */
    var FilterButton = function(element, options) {
        if (!(this instanceof FilterButton))
            throw "FilterButton: FilterButton is a constructor.";

        this._element = element;
        this._options = options;

        this._init(options);
    }

    /**
     * FilterButton prototype.
     *
     * @type {Object}
     */
    FilterButton.prototype = {
        /**
         * Reassign constructr.
         *
         * @type {Function}
         */
        constructor: FilterButton,

        /**
         * Constructor.
         *
         * @return {Void}
         */
        _init: function() {
            // Define empty UI.
            this._$ui = {
                element: $(this._element),
                item: $(null),
                content: $(null),
            };

            // Prepare element.
            this._element = this._$ui.element
                .addClass("jquery-filter-button")
                .data("jquery-filter-button", this)
                .on("click.jqueryfilterbutton", ".jquery-filter-button-item", this._handleItemClick.bind(this))
                .get(0);

            // Create items.
            this._options.forEach(function(options) {
                this._addItem(-1, options);
            }.bind(this));

            // Activate first item.
            this.active = 0;
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            this._$ui.item
                .remove();

            this._$ui.content
                .removeClass("jquery-filter-button-active")
                .removeClass("jquery-filter-button-hidden")
                .removeClass("jquery-filter-button-content")
                .removeData("jquery-filter-button-link", $item);

            this._$ui.element
                .removeClass("jquery-filter-button")
                .removeData("jquery-filter-button")
                .off(".jqueryfilterbutton");

            delete this._$ui;
            delete this._options;
            delete this._element;
        },

        /**
         * Element property getter.
         *
         * @return {Node}
         */
        get element() {
            return this._element;
        },

        /**
         * Active tab index property getter.
         *
         * @return {Number}
         */
        get active() {
            var $item = this._$ui.item
                .filter(".jquery-filter-button-active");

            return this._$ui.item.index($item);
        },

        /**
         * Active tab index property setter.
         *
         * @param  {Number} value
         * @return {Void}
         */
        set active(value) {
            if (!this._$ui.item.length)
                return;

            // Already active?
            value = this._fixIndex(value);
            if (value === this.active)
                return;

            // Find item.
            var $item = this._$ui.item.eq(value);

            // Hide all.
            this._$ui.item
                .removeClass("jquery-filter-button-active");
            this._$ui.content
                .addClass("jquery-filter-button-hidden")
                .removeClass("jquery-filter-button-active");

            // Show current.
            $item
                .addClass("jquery-filter-button-active")
                .data("jquery-filter-button-link")
                    .removeClass("jquery-filter-button-hidden")
                    .addClass("jquery-filter-button-active");
        },

        /**
         * Active tab label property getter.
         *
         * @return {String}
         */
        get label() {
            return this._$ui.item
                .filter(".jquery-filter-button-active")
                .find(".jquery-filter-button-item-label")
                .text();
        },

        /**
         * Attach element to DOM (before first content).
         *
         * @return {Void}
         */
        attach: function(method, ref) {
            this._$ui.element
                .insertBefore(this._$ui.content.first());
        },

        /**
         * Detach element from DOM.
         *
         * @return {Void}
         */
        detach: function() {
            this._$ui.element
                .detach();
        },

        /**
         * Refresh: reindex item/content.
         *
         * @return {Void}
         */
        refresh: function() {
            this._$ui.item.each(function(index, node) {
                var options = this._options[index];
                if (!options.context && !options.selector)
                    return;

                var $item = $(node),
                    isActive = $item.is(".jquery-filter-button-active"),
                    $oldContent = $item.data("jquery-filter-button-link")
                        .removeClass("jquery-filter-button-hidden")
                        .removeClass("jquery-filter-button-active")
                        .removeClass("jquery-filter-button-content")
                        .removeData("jquery-filter-button-link"),
                    $newContent = $(options.context || document.body).find(options.selector)
                        .addClass("jquery-filter-button-content")
                        .removeClass("jquery-filter-button-hidden")
                        .removeClass("jquery-filter-button-active")
                        .addClass(!isActive ? "jquery-filter-button-hidden" : "_temp")
                        .addClass(isActive ? "jquery-filter-button-active" : "_temp")
                        .removeClass("_temp");

                // Refresh links...
                $item.data("jquery-filter-button-link", $newContent);
                $newContent.data("jquery-filter-button-link", $item);

                // ...and UI.
                this._$ui.content = this._$ui.content
                    .not($oldContent)
                    .add($newContent);
            }.bind(this));
        },

        /**
         * Fix out of bounds index.
         *
         * @param  {Number} value
         * @return {Number}
         */
        _fixIndex: function(value) {
            value = value*1 || 0;
            while (value < 0)
                value += this._$ui.item.length + 1;
            // @todo - use math instead while...

            return value % (this._$ui.item.length + 1);
        },

        /**
         * Add new options.
         *
         * Options object can have label and icon properties, where
         * label is tab caption (string), and icon is class name
         * (string) of icon element in tab. The content property in
         * option is a list of elements that are "assigned" to the
         * item. So clicking (activating) current tab will show all
         * elements in content.
         *
         * The other way of defining content is to provide selector
         * (string) option. Selector will match all elements in
         * selector and "assign" it to the item. Default context
         * for searching elements against selector is body, but
         * you can add your own by providing context option.
         *
         * @param {Number} index
         * @param {Object} options
         * @return {Void}
         */
        _addItem: function(index, options) {
            // Create UI item.
            var $item = $("<button />")
                .attr("type", "button")
                .data("jquery-filter-button-element", this.element);
            if (options.icon)
                $("<span />")
                    .attr("class", "jquery-filter-button-item-icon")
                    .addClass(options.icon)
                    .appendTo($item);
            $("<span />")
                .attr("class", "jquery-filter-button-item-label")
                .text(options.label || "undefined")
                .appendTo($item);

            // Insert item to DOM.
            index = this._fixIndex(index);
            if (index < this._$ui.item.length)
                $item.insertBefore(this._$ui.item.eq(index));
            else
                $item.appendTo(this.element);

            // Define UI content.
            var $content = $(null);
            if (options.content)
                $content = $(options.content);
            else if (options.context || options.selector)
                $content = $(options.context || document.body).find(options.selector);
            else
                throw "FilterButton: please provide content option for item."

            // Set class list and link item/content.
            $item
                .addClass("jquery-filter-button-item")
                .data("jquery-filter-button-link", $content);
            $content
                .removeClass("jquery-filter-button-active")
                .addClass("jquery-filter-button-hidden")
                .addClass("jquery-filter-button-content")
                .data("jquery-filter-button-link", $item);

            // Add to UI.
            this._$ui.item = this._$ui.item
                .add($item);
            this._$ui.content = this._$ui.content
                .add($content);
        },

        /**
         * Item click event handler:
         * set active item/content.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleItemClick: function(e) {
            e.preventDefault();

            this.active = this._$ui.item.index(e.currentTarget);
        },
    };

    // jQuery plugin.
    $.fn.filterButton = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // Iterate all.
        $this.each(function() {
            // Is init?
            var lib = $(this).data("jquery-filter-button");

            // Not init, create new instance.
            if (!lib)
                lib = new FilterButton(this, typeof options === "object" ? options : []);

            // Global methods.
            if (typeof options === "string") {
                if (options.substr(0,1) !== "_" && options in lib && typeof lib[options] === "function") {
                    // Execute.
                    var result = lib[options].apply(lib, args);

                    // Result, exit loop.
                    if (typeof result !== "undefined") {
                        $this = result;
                        return false;
                    }
                }
                else
                    throw "FilterButton: no method named '" + options + "'.";
            }
        });

        // ...finally.
        return $this;
    };
})();
