;(function($, window, document) {

    // @TODO: Refactor DRY!!!

    // Globalize
    OP3.Sticky = {};
    OP3.Sticky.elements = {};
    OP3.Sticky.isInitialized = false;

    // Cached
    var $wpadminbar;

    /**
     * Initialize event listeners & init sticky elements
     *
     * @return {Void}
     */
    var init = function () {
        var $elements = $('[data-op3-sticky="1"]');
        $wpadminbar = $("#wpadminbar");

        // There are no sticky elements on the page
        if ($elements.length === 0 && OP3.layer !== "designer") return;

        window.document.addEventListener('scroll', handleScroll, { passive: true });

        // Resize event is triggered on android when browser location bar
        // is hidden/shown uppon scrolling, so we use orientation event instead
        if (!window.matchMedia('screen and (max-width: 1024px)').matches) {
            window.addEventListener('resize', handleWindowResize, { passive: true });
        } else {
            try {
                // Add event listener to changing from portrait to landscape (for mobile)
                window.matchMedia("(orientation: portrait)")
                    .addListener(handleWindowResize);
            } catch(e) {}
        }

        if (window.ResizeObserver)
            OP3.Sticky.observer = new ResizeObserver(handleElementResize);

        // Only in builder
        if (OP3.bind)
            OP3.bind("paddingdragend", repositionSticky);

        $elements.each(function() {
            initializeSticky($(this));
        });
        OP3.Sticky.isInitialized = true;
    };

    /**
     * Get sticky config
     *
     * @param {Object} $node
     * @return {Void}
     */
    var getOptions = function($node) {
        var until;
        var uuid = $node.attr("data-op3-uuid");
        var $element = $node.find(" > [data-op3-sticky]");
        var $container;

        switch ($element.attr("data-op3-sticky-until")) {
            case "1":
                until = "container";
                $container = $node.parent().closest(".op3-element");

                // Section doesn't have a parent op3-element so
                // use #op3-designer-element's wrapper instead
                if ($container.length === 0) $container = $node.closest("[data-op3-children]");
                break;
            case "2":
                until = "element";
                break;
            default:
                until = "page";
        }

        var desktop = $element.attr("data-op3-sticky-active-desktop");
        var tablet = $element.attr("data-op3-sticky-active-tablet");
        var mobile = $element.attr("data-op3-sticky-active-mobile");
        var untilSelector = $element.attr("data-op3-sticky-until-element");
        var $untilElement = untilSelector ? $("." + $element.attr("data-op3-sticky-until-element")) : null;
        var topDesktop = parseInt($element.attr("data-op3-sticky-top-desktop"), 10) || 0;
        var topTablet = parseInt($element.attr("data-op3-sticky-top-tablet"), 10);
        var topMobile = parseInt($element.attr("data-op3-sticky-top-mobile"), 10);

        return {
            uuid: uuid,
            $element: $node,
            $container: $container,
            isFixed: false,
            desktop: (desktop === "1" || desktop === "") ? true : false,
            tablet: (tablet === "1" || tablet === "") ? true : false,
            mobile: mobile === "1" ? true : false,
            top: {
                desktop: topDesktop,
                tablet: isNaN(topTablet) ? "" : topTablet,
                mobile: isNaN(topMobile) ? "" : topMobile,
            },
            until: until,
            untilSelector: untilSelector,
            $untilElement: $untilElement,
            adjust: $wpadminbar.height() || 0,
        }
    }

    /**
     * Initialize sticky
     *
     * @param {Object} $node
     * @return {Void}
     */
    var initializeSticky = function($node) {
        var $element = $node.parent();
        var options = getOptions($element);

        options.blockSize = $element.outerHeight();

        // box: border-box is not working in chrome atm,
        // so we need to handle paddingdrag separately
        if (OP3.Sticky.observer)
            OP3.Sticky.observer.observe($element.get(0));

        OP3.Sticky.elements[options.uuid] = options;

        // intentionally calling scroll handler before intializing resize observer to prevent
        // the element from recurisvely repositioning itself
        handleScroll();
    };
    OP3.Sticky.init = initializeSticky;


    /**
     * Tracks setTimeout id to delay resizeObserver event
     */
    var timeout;

    /**
     * Trigger sticky elements refresh
     * when its size changes
     *
     * @param {Object} entries
     * @return {Void}
     */
    var handleElementResize = function(entries) {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            entries.forEach(function(entry) {
                var $element = $(entry.target);
                var type = $element.attr("data-op3-element-type");
                var uuid = $element.attr("data-op3-uuid");
                if ((type === "row" || type === "section") && OP3.Sticky.elements[uuid].blockSize !== $element.outerHeight()) {
                    OP3.Sticky.elements[uuid].blockSize = $element.outerHeight();
                    setTimeout(repositionSticky);
                }
            });
        }, 100);
    }

    /**
     * Reset inline styles set by sticky
     *
     * @param {Object} $element
     * @return {Void}
     */
    var resetPosition = function($element) {
        $element.next(".op3-sticky-filler")
            .remove();

        $element.css({
            position: "",
            top: "",
            left: "",
            zIndex: "",
            width: "",
            transform: "",
        });
    }

    /**
     * Destroy sticky
     *
     * @param {Object} $node
     * @return {Void}
     */
    var removeSticky = function($node) {
        var $element = $node.parent();
        var uuid = $element.attr("data-op3-uuid");

        resetPosition($element);

        if (OP3.Sticky.observer)
            OP3.Sticky.observer.unobserve($element.get(0));
        delete OP3.Sticky.elements[uuid];
    }
    OP3.Sticky.destroy = removeSticky;

    /**
     * Refresh sticky widget
     *
     * @param {Object} $node
     * @return {Void}
     */
    var refreshSticky = function($node) {
        removeSticky($node);
        initializeSticky($node);
    }
    OP3.Sticky.refresh = refreshSticky;


    /**
     * Reposition sticky widget
     *
     * @return {Void}
     */
    var repositionSticky = function() {
        handleScroll();
    }
    OP3.Sticky.reposition = repositionSticky;

    /**
     * Scroll handler
     *
     * @param {Object} e
     */
    var handleScroll = function(e) {
        var device = "mobile";
        if (window.matchMedia('screen and (min-width: 767px)').matches) device = "tablet";
        if (window.matchMedia('screen and (min-width: 1023px)').matches) device = "desktop";

        if (OP3.Sticky.isInitialized)
            sortElements();

        Object.keys(OP3.Sticky.elements).forEach(function(uuid, index) {
            var options = OP3.Sticky.elements[uuid];
            var isFixed = options.isFixed;
            var pageTop = window.pageYOffset;
            var elementTop = options.$element.offset().top;
            var adjust = options.adjust;
            var top = options.top.desktop + adjust;
            var topMargin = parseInt(options.$element.css("margin-top"), 10);
            var fillerTop = options.$filler ? options.$filler.offset().top : 0;

            // Tablet inherits from desktop and mobile inherits from tablet & desktop
            if (device === "tablet" && options.top.tablet !== "")
                top = options.top.tablet + adjust;

            if (device === "mobile" && options.top.mobile === "" && options.top.tablet)
                top = options.top.tablet + adjust;

            if (device === "mobile" && options.top.mobile !== "")
                top = options.top.mobile + adjust;

            // If sticky is not active for the current media query, destroy it
            if (!options[device]) {
                if (!options.isFixed) return;
                resetPosition(options.$element);
                options.isFixed = false;
                options.$filler = null;
                return;
            }

            if (!isFixed && pageTop >= elementTop - top) {
                // Set sticky

                var $filler = $('<div class="op3-sticky-filler" />')
                    .height(options.$element.outerHeight() + topMargin);

                options.$element.after($filler);

                // OP3-2099 - Set width only if element is visible
                if (options.$element.is(":visible"))
                    options.$element.css("width", options.$element.outerWidth() + "px");

                options.$element.css({
                    position: "fixed",
                    top: (top - topMargin) + "px",
                    left: options.$element.offset().left + "px",
                    // Reduce z-index for ever subsequent to enable sticky elements going under one another.
                    // z-index is set to 1000 to appear undeer the pop overlay
                    zIndex: 1000 - index,
                    transform: "",
                });

                options.$filler = $filler;
                options.isFixed = true;
                isFixed = true;

            } else if (isFixed && pageTop < fillerTop - top + topMargin) {
                // Remove sticky
                top = "";
                resetPosition(options.$element);
                options.isFixed = false;
                isFixed = false;
                options.$filler = null;
            }

            var offsetY = 0;
            var translateY = 0;
            var rectsContainer;
            var rectsElement;
            var storedY;

            // if the element is higher than screen height, reposition the
            // sticky when it goes out of the window
            if (isFixed && options.until === "page") {
                storedY = options.$element.data("translateY") || 0;
                var elementBottom = options.$element.offset().top + options.$element.outerHeight();

                if (elementBottom > document.body.clientHeight + storedY) {
                    offsetY = storedY - (elementBottom - document.body.clientHeight);
                    options.$element.data("translateY", offsetY);
                }
            }

            // stick until end of parent container
            if (isFixed && options.until === "container") {
                rectsContainer = options.$container.get(0).getClientRects();
                rectsElement = options.$element.get(0).getClientRects();
                storedY = options.$element.data("translateY") || 0;

                offsetY = storedY - (rectsElement[0].bottom - rectsContainer[0].bottom);
                if (offsetY > 0) offsetY = 0;
                options.$element.data("translateY", offsetY);
            }

            // stick until specific element
            if (isFixed && options.until === "element" && options.untilSelector && options.$untilElement.length > 0) {
                rectsElementUntil = options.$untilElement.get(0).getClientRects();
                rectsElement = options.$element.get(0).getClientRects();
                storedY = options.$element.data("translateY") || 0;

                offsetY = storedY - (rectsElement[0].bottom - rectsElementUntil[0].top);
                if (offsetY > 0) offsetY = 0;
                options.$element.data("translateY", offsetY);
            }

            if (isFixed)
                options.$element.css({
                    transform: "translateY(" + offsetY + "px)",
                });
        });
    }

    // @todo: throttle resize event
    var handleWindowResize = function(e) {
        Object.keys(OP3.Sticky.elements).forEach(function(uuid, index) {
            var options = OP3.Sticky.elements[uuid];
            resetPosition(options.$element);
            options.isFixed = false;
            options.$filler = null;
        });
        handleScroll();
    }

    // Sorting elements is necessary to properly set zIndex values,
    // particularly in builder where new
    // elements can be set as sticky
    var sortElements = function() {
        var $elements = $('[data-op3-sticky="1"]');
        var elementsSorted = {};

        $elements.each(function(index) {
            var uuid = $(this)
                .closest(".op3-element")
                .attr("data-op3-uuid");
            var options = OP3.Sticky.elements[uuid];

            elementsSorted[uuid] = OP3.Sticky.elements[uuid];
        });
        OP3.Sticky.elements = elementsSorted;
    }
    OP3.Sticky.sortElements = sortElements;

    $(document).ready(function() {
        init();
    })

})(jQuery, window, document);
