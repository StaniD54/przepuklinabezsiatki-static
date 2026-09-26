;(function($, window, document, undefined) {
    /**
     * Scroller constructor.
     *
     * @return {Void}
     */
    var Scroller = function(size) {
        if (!(this instanceof Scroller))
            throw 'Scroller: Scroller is a constructor.';

        this._init(size*1 || 0);
    };

    /**
     * Scroller prototype.
     *
     * @type {Object}
     */
    Scroller.prototype = {
        /**
         * Reassign constructor.
         *
         * @type {Scroller}
         */
        constructor: Scroller,

        /**
         * Markup.
         *
         * @type {String}
         */
        MARKUP: ''
            + '<ul class="scroller">'
            +     '<li><a href="#" tabindex="-1" title="Scroll Up" data-action="up">Up</a></li>'
            +     '<li><a href="#" tabindex="-1" title="Scroll Down" data-action="down">Down</a></li>'
            + '</ul>',

        /**
         * Constructor.
         *
         * @param  {Number} size
         * @return {Void}
         */
        _init: function(size) {
            var $element = $(this.MARKUP)
                .on('click', '[data-action]', this._handleClick.bind(this))
                .appendTo(document.body);

            this._size = size;

            this._$ui = {
                element: $element,
                up: $element.find('[data-action="up"]'),
                down: $element.find('[data-action="down"]'),
            };

            this._intervalScroll = null;

            $(window).on('scroll.scroller resize.scroller', this._handleScroll.bind(this));

            this.refresh();
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            $(window).off('.scroller');

            this._$ui.remove();

            clearInterval(this._intervalScroll);

            delete this._intervalScroll;
            delete this._$ui;
        },

        /**
         * Element property getter.
         *
         * @return {Node}
         */
        get element() {
            return this._$ui.element.get(0);
        },

        /**
         * Size property getter.
         *
         * @return {Number}
         */
        get size() {
            return this._size;
        },

        /**
         * Refresh: enable/disable up/down.
         *
         * @return {Void}
         */
        refresh: function() {
            this._$ui.up
                .removeClass('disabled')
                .addClass(this.canUp() ? '_temp' : 'disabled')
                .removeClass('_temp');
            this._$ui.down
                .removeClass('disabled')
                .addClass(this.canDown() ? '_temp' : 'disabled')
                .removeClass('_temp');
        },

        /**
         * Can document be scrolled up.
         *
         * @return {Boolean}
         */
        canUp: function() {
            return this.size > 1 && $(document).scrollTop() > 0;
        },

        /**
         * Can document be scrolled down.
         *
         * @return {Boolean}
         */
        canDown: function() {
            return this.size > 1 && $(document).scrollTop() + $(window).height() < $(document).height();
        },

        /**
         * Scroll up document.
         *
         * @return {Void}
         */
        up: function() {
            var current = $(document).scrollTop(),
                height = $(window).height(),
                array = Array.apply(null, Array(this.size)).map(function(item, index) {
                    return index * height;
                }),
                position = array.filter(function(item) {
                    return item < current;
                }).pop();

            this._scrollTo(position);
        },

        /**
         * Scroll down document.
         *
         * @return {Void}
         */
        down: function() {
            var current = $(document).scrollTop(),
                height = $(window).height(),
                array = Array.apply(null, Array(this.size)).map(function(item, index) {
                    return index * height;
                }),
                position = array.filter(function(item) {
                    return item > current;
                }).shift();

            this._scrollTo(position);
        },

        /**
         * Scroll to position.
         *
         * @param  {Number} position
         * @return {Void}
         */
        _scrollTo: function(position) {
            var $parent = $(document.scrollingElement);
            if ($parent.scrollTop() === position)
                return;

            $parent.animate({ scrollTop: position }, 400);
        },

        /**
         * Click event handler:
         * scroll up/down.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleClick: function(e) {
            e.preventDefault();

            var action = $(e.currentTarget).blur().attr('data-action');
            if (action === 'up')
                this.up();
            else if (action === 'down')
                this.down();
        },

        /**
         * Scroll event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleScroll: function(e) {
            clearInterval(this._intervalScroll);
            this._intervalScroll = setTimeout(this._handleScrollInterval.bind(this), 50);
        },

        /**
         * Scroll interval event handler.
         *
         * @return {Void}
         */
        _handleScrollInterval: function() {
            this._intervalScroll = null;
            this.refresh();
        },
    };

    // Globalize Scroller
    window.Scroller = Scroller;
})(jQuery, window, document, undefined);
