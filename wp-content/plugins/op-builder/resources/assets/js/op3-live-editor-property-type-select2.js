/**
 * OptimizePress3 element type:
 * op3 property type select manipulation.
 */
;(function($, window, document) {

    "use strict";

    /**
     * Pagination default page size
     *
     * @type {Number}
     */
    var PAGINATE_PAGE_SIZE = 50;

    /**
     * CSS selector
     *
     * @type {String}
     */
    var _selectorDefault = '[data-property-type="select2"]',
        _selectorSimple = '[data-property-type="select2-simple"]',
        _selectorPaginate = '[data-property-type="select2-paginate"]',
        _selector = _selectorDefault
            + "," + _selectorSimple
            + "," + _selectorPaginate;

    /**
     * Render option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _render = function(e, o) {
        var defaults = {
                width: "100%",
                templateResult: _format,
                templateSelection: _format,
            };

        $(o.parent)
            .find(_selector)
            .each(function() {
                var $this = $(this),
                    $prop = $this.closest(".op3-element-options-property"),
                    propertyName = $prop.attr("data-op3-element-options-property-name"),
                    propertyId = $prop.attr("data-op3-element-options-property-id"),
                    propType = $this.attr("data-property-type");
                if (propType === "select2")
                    propType += "-default";

                var options = $.extend({}, defaults, {
                    dropdownParent: $(this).closest("[data-op3-element-options-type]"),
                    dropdownCssClass: propType + " " + propertyName + " " + propertyId,
                    containerCssClass: propType,
                });

                // paginate select2 doesn't use <options>, but
                // array from property, and it has pagination
                if (propType === "select2-paginate")
                    $.extend(options, {
                        ajax: {},
                        dataAdapter: $.fn.select2.amd.require("PaginateDataAdapter"),
                        dataSet: OP3.Designer.activeElement().findProperty(propertyId)._getOptions(),
                    });

                $this.select2(options);

                // intercept "select already selected" event
                var select2 = $this.data("select2");
                select2.$element
                    .on("op3transmitelementchangeignored", function(e) {
                        var element = OP3.Designer.activeElement(),
                            node = element.node(),
                            uuid = element.uuid(),
                            type = element.type(),
                            name = $this.attr("data-op3-element-options-property-name"),
                            emit = {
                                node: node,
                                uuid: uuid,
                                type: type,
                                media: $this.attr("data-op3-element-options-property-media"),
                                id: $this.attr("data-op3-element-options-property-id"),
                                name: name,
                                value: $this.val(),
                            };

                        OP3.transmit("elementchangeignored", emit);
                        OP3.transmit("elementchangeignored::" + emit.type, emit);
                        OP3.transmit("elementchangeignored::*::" + emit.name, emit);
                        OP3.transmit("elementchangeignored::" + emit.type + "::" + emit.name, emit);
                    });
                select2.$results
                    .on("mouseup", '.select2-results__option[aria-selected="true"]', function(e) {
                        $this.trigger("op3transmitelementchangeignored");
                    });
                select2.dropdown.$search.on("keydown", function(e) {
                    if (e.which === 13 && select2.dropdown.$dropdown.find('.select2-results__option.select2-results__option--highlighted[aria-selected="true"]').length)
                        $this.trigger("op3transmitelementchangeignored");
                });
            });
    }

    /**
     * Clean:
     * destroy option widget
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _clean = function(e, o) {
        $(o.parent)
            .find(_selector)
            .filter(".select2-hidden-accessible")
            .select2("destroy");
    }

    /**
     * Select2 template format
     *
     * @param  {Object} state
     * @param  {Object} element
     * @return {Void}
     */
    var _format = function(state, element) {
        var result = state.text;

        if (state && state.format) {
            result = state.format;
        }
        else if (state && state.element) {
            var format = state.element.getAttribute("data-format");
            if (format)
                result = format;
        }

        if (result.substr(0,1) === "<")
            result = $(result);

        return result;
    }

    // After changing the selected option, scrolling is not working
    // https://github.com/select2/select2/issues/3125
    // Currently can only be reproduced on Sections -> Categories change
    $.fn.select2.amd.require([
            "select2/dropdown/attachBody",
            "select2/utils"
        ],
        function (AttachBody, Utils) {
            AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
                var self = this;
                var scrollEvent = "scroll.select2." + container.id;
                var resizeEvent = "resize.select2." + container.id;
                var orientationEvent = "orientationchange.select2." + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);

                $watchers.each(function () {
                    $(this).data("select2-scroll-position", {
                        x: $(this).scrollLeft(),
                        y: $(this).scrollTop()
                    });
                });

                $watchers.on(scrollEvent, function (ev) {
                    var position = $(this).data("select2-scroll-position");
                    $(self).scrollTop(position.y); // patch: this => self
                });

                $(window).on(scrollEvent + " " + resizeEvent + " " + orientationEvent,
                    function (e) {
                        self._positionDropdown();
                        self._resizeDropdown();
                    }
                );
            }
        }
    );

    // Custom Adapter for paginating local data.
    $.fn.select2.amd.define("PaginateDataAdapter", [
            "select2/data/array",
            "select2/utils",
        ],
        function (ArrayData, Utils) {
            function PaginateDataAdapter($element, options) {
                PaginateDataAdapter.__super__.constructor.call(this, $element, options);
            }

            Utils.Extend(PaginateDataAdapter, ArrayData);

            PaginateDataAdapter.prototype.query = function(params, callback) {
                if (!("page" in params)) {
                    params.page = 1;
                }

                var $element = this.$element,
                    $form = $element.closest("form"),
                    results = this.options.options.dataSet;
                if (!results)
                    throw "OP3.select2: please use dataSet option in PaginateDataAdapter."

                // matcher (from data attribute)
                var matcher = $element.attr("data-filter-method");
                if (matcher) {
                    var fn = window,
                        arr = matcher.split(".");
                    while(fn && arr.length) {
                        fn = fn[arr.shift()];
                    }

                    matcher = typeof fn === "function" ? fn : null;
                }
                if (matcher)
                    results = results
                        .filter(function(item) {
                            return matcher.apply(null, [ $form.get(0), $element.get(0), item ]);
                        });

                // search
                if (params.term)
                    results = results
                        .filter(function(item) {
                            var pattern = OP3.$.escapeRegExp(params.term),
                                re = new RegExp(pattern, "i");

                            return re.test(item.text);
                        });

                callback({
                    results: results.slice((params.page - 1) * PAGINATE_PAGE_SIZE, params.page * PAGINATE_PAGE_SIZE),
                    pagination: {
                        more: results.length >= params.page * PAGINATE_PAGE_SIZE,
                    },
                });
            };

            PaginateDataAdapter.prototype.matcher = function(params, data) {
                return data;
            };

            return PaginateDataAdapter;
        }
    );

    // init
    OP3.bind("elementoptionsrefresh", _render);
    OP3.bind("elementoptionsclear elementoptionsformdetach", _clean);

})(jQuery, window, document);
