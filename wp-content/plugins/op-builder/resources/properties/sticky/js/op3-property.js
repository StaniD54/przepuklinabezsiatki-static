/**
 * OptimizePress3 property.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-elements.js
 *     - stickify.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Sticky = OP3.defineClass({

        Name: "OP3.Property.Sticky",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "sticky",

            _defaults: {
                label: function() {
                    return OP3._("Set Sticky");
                },
                tag: "select",
                attr: {
                    "data-property-type": "boolean",
                },
                options: [
                    { "0": "No" },
                    { "1": "Yes" },
                ],
                selector: " > [data-op3-sticky]",
            },

            _forceComputed: true,

            computed: function() {
                return $(this.target()).attr("data-op3-sticky") || "0";
            },

            setter: function(value, media) {
                $(this.target()).attr("data-op3-sticky", value);
            },

        },

    });

    /**
     * Stickify elements object.
     *
     * @return {Object}
     */
    var _$stickifyElements = $(null);

    /**
     * Get Stickify options for element.
     *
     * @param  {HTMLElement} target
     * @return {Object}
     */
    var _getStickifyOptions = function(target) {
        var $target = $(target),
            $options = $target.find('>[data-op3-sticky="1"]'),
            device = OP3.LiveEditor.device(),
            stickyActiveDesktop = $options.attr("data-op3-sticky-active-desktop") || "1",
            stickyActiveTablet = $options.attr("data-op3-sticky-active-tablet") || "1",
            stickyActiveMobile = $options.attr("data-op3-sticky-active-mobile") || "1",
            stickyTopDesktop = $options.attr("data-op3-sticky-top-desktop") || "0",
            stickyTopTablet = $options.attr("data-op3-sticky-top-tablet") || "0",
            stickyTopMobile = $options.attr("data-op3-sticky-top-mobile") || "0",
            stickyUntil = $options.attr("data-op3-sticky-until") || "0",
            stickyUntilElement = $options.attr("data-op3-sticky-until-element") || "",
            options = {
                matchMedia: "all",
                stickUntilElement: null,
                adjustOffset: 0,
                stickyZIndex: 1000,
            };

        options.matchMedia = "";
        if (stickyActiveDesktop === "1")
            options.matchMedia += ", screen and (min-width: 1024px)"
        if (stickyActiveTablet === "1")
            options.matchMedia += ", screen and (max-width: 1023px) and (min-width: 768px)"
        if (stickyActiveMobile === "1")
            options.matchMedia += ", screen and (max-width: 767px)"
        options.matchMedia = options.matchMedia ? options.matchMedia.replace(/^,\s/, "") : "none";

        if (stickyUntil === "1")
            options.stickUntilElement = $target
                .parent()
                .closest(".op3-element, #op3-designer-element > [data-op3-children]")
                .get(0);
        else if (stickyUntil === "2" && stickyUntilElement)
            options.stickUntilElement = "." + stickyUntilElement;

        if (device === "mobile")
            options.adjustOffset = stickyTopMobile;
        else if (device === "tablet")
            options.adjustOffset = stickyTopTablet;
        else
            options.adjustOffset = stickyTopDesktop;
        options.adjustOffset = parseInt(options.adjustOffset);

        options.stickyZIndex -= _$stickifyElements.index(target);

        return options;
    };

    /**
     * Set Stickify options from element.
     *
     * @param  {HTMLElement} target
     * @return {Void}
     */
    var _setStickifyOptions = function(target) {
        var instance = target._stickify,
            options = _getStickifyOptions(target);

        for (var prop in options) {
            instance.setOption(prop, options[prop]);
        }
    };

    /**
     * Refresh Stickify.
     *
     * @param  {HTMLElement} target
     * @param  {Boolean}     force  (optional)
     * @return {Void}
     */
    var _refreshStickify = function(target, force) {
        var instance = target._stickify;
        if (instance)
            instance.refresh(force);
    };

    /**
     * Init Stickify instance.
     *
     * @param  {HTMLElement} target
     * @return {Void}
     */
    var _initStickify = function(target) {
        $(target)
            .on("stickifyscroll stickifyresize", function(e) {
                _setStickifyOptions(e.target);
            });

        // Store and observe.
        _$stickifyElements = _$stickifyElements.add(target);
        _stickyResizeObserver.observe(target);

        // Init instance.
        new Stickify(target, _getStickifyOptions(target));

        // Reindex all stickify elements after target.
        let index = _$stickifyElements.index(target);
        _$stickifyElements
            .slice(index + 1)
            .each(function() {
                _setStickifyOptions(this);
            });
    }

    /**
     * Destroy Stickify instance.
     *
     * @param  {HTMLElement} target
     * @return {Void}
     */
    var _destroyStickify = function(target) {
        $(target)
            .off("stickifyscroll stickifyresize");

        // Unstore and unobserve.
        let index = _$stickifyElements.index(target);
        _stickyResizeObserver.unobserve(target);
        _$stickifyElements = _$stickifyElements.not(target);

        // Destroy instance.
        var instance = target._stickify;
        instance.destroy();

        // Reindex all stickify elements after target.
        _$stickifyElements
            .slice(index)
            .each(function() {
                _setStickifyOptions(this);
            });
    }

    /**
     * Stickify ResizeObserver:
     * refresh Stickify instance (placeholder height) on
     * element size change (in live-editor only).
     *
     * @return {ResizeObserver}
     */
    var _stickyResizeObserver = new ResizeObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.target && entry.target._stickify)
                _refreshStickify(entry.target);
        });
    });

    // Init Stickify instance.
    OP3.bind("load elementappend", function(e, o) {
        $(o ? o.node : document)
            .find('[data-op3-sticky="1"]')
            .parent()
            .each(function() {
                _initStickify(this);
            });
    });

    // Destroy Stickify instance.
    OP3.bind("elementdetach", function(e, o) {
        $(o.node)
            .find('[data-op3-sticky="1"]')
            .parent()
            .each(function() {
                _destroyStickify(this);
            });
    });

    // Init or destroy Stickify instance.
    OP3.bind("elementchange::*::sticky", function(e, o) {
        if (o.value.after !== "0")
            _initStickify(o.node);
        else
            _destroyStickify(o.node);
    });

    // Refresh Stickify options on element's sticky options
    // change.
    OP3.bind("elementchange::*::stickyActiveDesktop elementchange::*::stickyActiveTablet elementchange::*::stickyActiveMobile elementchange::*::stickyTopDesktop elementchange::*::stickyTopTablet elementchange::*::stickyTopMobile elementchange::*::stickyUntil elementchange::*::stickyUntilElement", function(e, o) {
        _setStickifyOptions(o.node);
    });

    // Refresh Stickify:
    // ResizeObserver reports changes to the dimensions of an
    // Element's content or border box, which means that we
    // need to deal with margins/paddings changes separately.
    OP3.bind("elementchange::section::marginTop elementchange::section::marginRight elementchange::section::marginBottom elementchange::section::marginLeft elementchange::section::paddingTop elementchange::section::paddingRight elementchange::section::paddingBottom elementchange::section::paddingLeft elementchange::row::marginTop elementchange::row::marginRight elementchange::row::marginBottom elementchange::row::marginLeft elementchange::row::paddingTop elementchange::row::paddingRight elementchange::row::paddingBottom elementchange::row::paddingLeft", function(e, o) {
        _refreshStickify(o.node, /^margin/.test(o.id));
    });

})(jQuery, window, document);
