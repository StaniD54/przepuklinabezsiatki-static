;(function($, window, document) {

    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize Tabs
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see Tabs.prototype._defaults
     * @return {Void}
     */
    var Tabs = function(element, options) {
        if (!(this instanceof Tabs))
            throw "Tabs: Tabs is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * Tabs prototype
     *
     * @type {Object}
     */
    $.extend(Tabs.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            /**
             * Tab element parent
             *
             * @type {String}
             */
            parent: null,

            /**
             * Tab header item selector
             *
             * @type {String}
             */
            headerItemSelector: '.tabs-header-item',

            /**
             * Tab content selector
             *
             * @type {String}
             */
            contentItemSelector: '.tabs-content-item',

            /**
             * Default tab to open first
             *
             * @type {Number}
             */
            active: 0,
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
             this._element = $(this._element)
                .addClass("jquery-tabs")
                .data("jquery-tabs", this)
                .get(0);

            // extend options
            this._options = $.extend(true, {}, this._defaults, this._options);
            for (var key in this._options) {
                if (!(key in this._defaults))
                    delete this._options[key];
            }

            var $element = $(this._element);
            var that = this;

            // Store content item pair to header item and vice versa.
            $element
                .find(this._options.headerItemSelector)
                .each(function() {
                    var $headerItem = $(this);
                    var $contentItem = $element.find(that._options.contentItemSelector).eq($headerItem.index())

                    $headerItem.data("tab-item-link", $contentItem);
                    $contentItem.data("tab-item-link", $headerItem);
                });

            // bind events
            $(this._element)
                .on("click.jquerytabs", this._options.headerItemSelector, this._handleHeaderItemClick.bind(this))
                .find(this._options.headerItemSelector)
                .eq(this._options.active)
                .trigger("click");

            $(this._element).trigger("jquerytabinit");
        },

        /**
         * Tabs header item click event handler
         *
         * @param {Event} e
         */
        _handleHeaderItemClick: function(e) {
            e.stopPropagation();
            var $target = $(e.currentTarget);

            $(this._element).trigger("jquerytabsbeforechange");

            $target
                .siblings()
                .removeClass("jquery-tabs-active")

            $target
                .addClass("jquery-tabs-active");

            $(this._element)
                .find(this._options.contentItemSelector)
                .removeClass("jquery-tabs-active");

            $target
                .data("tab-item-link")
                .addClass("jquery-tabs-active");

            $(this._element).trigger("jquerytabschanged");
        },

        /**
         * Set/get active tab index
         *
         * @param {Number} index
         * @return {Number|Void}
         */
        active: function(index) {
            if (typeof index === "undefined")
                return $(this._element)
                    .find(this._options.headerItemSelector + ".jquery-tabs-active")
                    .index();

            $(this._element)
                .find(this._options.headerItemSelector)
                .eq(index)
                .trigger("click");
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            $(this._element)
                .removeClass("jquery-tabs")
                .removeData("jquery-tabs")
                .off("click.jquerytabs")
                .trigger("jquerytabsdestroy");

            this._element = null;
            this._options = null;
        },

        /**
         * Reinitialize library
         *
         * @return {Void}
         */
        refresh: function() {
            var element = this._element;
            var options = this._options;

            this.destroy();

            this._options = options;
            this._element = element;

            this._init();
        },

        /**
         * Get/Set lib option
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Mixed}
         */
        options: function(key, value) {
            if (!(key in this._options))
                throw "Tabs: invalid options key '" + key + "'";

            // get
            if (typeof value === "undefined")
                return this._options[key];

            // set
            this._options[key] = value
        },

    });

    // jQuery plugin
    $.fn.tabs = function(options) {
        var $this = $(this);
        var args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init
            var lib = $(this).data("jquery-tabs");

            // create new instance
            if (!lib)
                lib = new Tabs(this, typeof options === "object" ? options : {});

            // global methods
            if (typeof options === "string") {
                if (options.substr(0,1) !== "_" && options in lib && typeof lib[options] === "function") {
                    // execute
                    var result = lib[options].apply(lib, args);

                    // result, exit loop
                    if (typeof result !== "undefined") {
                        $this = result;
                        return false;
                    }
                }
                else
                    throw "Tabs: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    }

})(window.jQuery, window, document);
