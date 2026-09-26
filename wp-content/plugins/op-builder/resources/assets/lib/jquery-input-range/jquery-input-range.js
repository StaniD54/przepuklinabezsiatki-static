;(function($, window, document) {

    // strict mode
    "use strict";

    // dependencies
    if (typeof $ === "undefined")
        throw "Missing dependency: jQuery" + "\n" + "https://code.jquery.com/";

    /**
     * Initialize InputRange
     *
     * @param  {Object} element HTML node
     * @param  {Object} options see InputRange.prototype._defaults
     * @return {Void}
     */
    var InputRange = function(element, options) {
        if (!(this instanceof InputRange))
            throw "InputRange: InputRange is a constructor.";

        this._element = element;
        this._options = options;

        this._init();
    }

    /**
     * InputRange prototype
     *
     * @type {Object}
     */
    $.extend(InputRange.prototype, {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            units: null,            // list of valid units, comma separated string
            min: null,              // min value (will be set as min attribute in widget's slider/text input)
            max: null,              // max value (will be set as max attribute in widget's slider/text input)
            step: null,             // step value (will be set as step attribute in widget's slider/text input)
            precision: null,        // round precision
            convert: null,          // convert method (see this.prototype._convert)
            data: null,             // dummy data (useful for convert method)
            avoidTextMin: false,    // will avoid min value for text input
            avoidTextMax: false,    // will avoid max value for text input
        },

        /**
         * Constructor
         *
         * @return {Void}
         */
        _init: function() {
            // dom node element
            var $element = $(this._element)
                .addClass("jquery-input-range")
                .on("change.jqueryinputrange", this._handleElementChange.bind(this))
                .data("jquery-input-range", this);
            this._element = $element.get(0);

            // extend options
            this._options = $.extend({}, this._defaults, this._options);
            Object.keys(this._options)
                .forEach(function(value) {
                    if (!this._defaults.hasOwnProperty(value))
                        delete this._options[value];
                }.bind(this));

            // inline options (from element attribute)
            ["min", "max", "step"]
                .forEach(function(value) {
                    if (this._options[value] === null)
                        this._options[value] = $element.attr(value) || null;

                    $element.removeAttr(value);
                }.bind(this));

            // inline options (from element data attribute)
            Object.keys(this._options)
                .forEach(function(value) {
                    if (this._options[value] === null)
                        this._options[value] = $element.attr("data-" + value.toLowerCase()) || null;
                }.bind(this));

            // fix options
            Object.keys(this._defaults)
                .forEach(function(value) {
                    this._fixOption(value);
                }.bind(this));

            // interface
            this._ui();

            // invalid initial unit
            var numeric = this.numeric(),
                unit = this.unit(),
                valid = this.options("units").split(",");
            if (numeric < this.options("min") && !this.options("avoidTextMin"))
                numeric = this.options("min");
            if (numeric > this.options("max") && !this.options("avoidTextMax"))
                numeric = this.options("max");
            if (valid.indexOf(unit) === -1)
                unit = valid[0];
            if (!unit)
                unit = "";

            // trigger ready event
            this._trigger("ready");

            // refresh ui
            if (this._$ui.element.val() != numeric + unit)
                this._$ui.element
                    .val(numeric + unit)
                    .trigger("change");
            else
                this._refresh();
        },

        /**
         * Destructor
         *
         * @return {Void}
         */
        destroy: function() {
            this._handleSliderMouseUp();

            this._$ui.element
                .off(".jqueryinputrange")
                .removeClass("jquery-input-range")
                .removeData("jquery-input-range");
            this._$ui.widget
                .remove();

            this._$ui = null;
            this._options = null;
            this._element = null;
        },

        /**
         * User interface
         *
         * @return {Void}
         */
        _ui: function() {
            this._$ui = {
                element: $(this._element),
            };

            var min = this.options("min"),
                max = this.options("max"),
                step = this.options("step"),
                avoidTextMin = this.options("avoidTextMin"),
                avoidTextMax = this.options("avoidTextMax"),
                numeric = this.numeric();

            this._$ui.widget = $("<div />")
                .addClass("jquery-input-range-widget")
                .insertAfter(this._element);
            this._$ui.slider = $("<input />")
                .addClass("jquery-input-range-slider")
                .attr("type", "range")
                .attr("min", min)
                .attr("max", max)
                .attr("step", step)
                .val(numeric)
                .on("input.jqueryinputrange", this._handleSliderInput.bind(this))
                .on("mousedown.jqueryinputrange", this._handleSliderMouseDown.bind(this))
                .appendTo(this._$ui.widget);
            this._$ui.text = $("<input />")
                .addClass("jquery-input-range-numeric")
                .attr("type", "number")
                .attr("min", min)
                .removeAttr(avoidTextMin ? "min" : "_temp")
                .attr("max", max)
                .removeAttr(avoidTextMax ? "max" : "_temp")
                .attr("step", step)
                .val(numeric)
                .on("change.jqueryinputrange", this._handleTextChange.bind(this))
                .appendTo(this._$ui.widget);
            this._$ui.unitContainer = $("<div />")
                .addClass("jquery-input-range-unit-container")
                .on("click.jqueryinputrange", ".jquery-input-range-unit-item:not(.jquery-input-range-unit-item-selected)", this._handleUnitClick.bind(this))
                .appendTo(this._$ui.widget);
            this._$ui.units = $(false);

            var parse = this._parse();
            (this.options("units") || "")
                .split(",")
                .filter(function(value) {
                    return value;
                })
                .forEach(function(value) {
                    var $el = $("<a />")
                        .addClass("jquery-input-range-unit-item")
                        .addClass(value === parse[1] ? "jquery-input-range-unit-item-selected" : "_temp")
                        .removeClass("_temp")
                        .attr("href", "#")
                        .attr("tabindex", "-1")
                        .text(value)
                        .appendTo(this._$ui.unitContainer);

                    this._$ui.units = this._$ui.units.add($el);
                }.bind(this));

            this._trigger("render");
        },

        /**
         * Fix option
         *
         * @param  {String} key
         * @return {Void}
         */
        _fixOption: function(key) {
            // numeric values
            if (["min", "max", "step", "precision"].indexOf(key) !== -1 && this._options[key] !== null)
                this._options[key] = this._options[key]*1;

            // boolean values
            if (["avoidTextMin", "avoidTextMax"].indexOf(key) !== -1)
                this._options[key] = !!this._options[key];

            // trim and filter units
            if (["units"].indexOf(key) !== -1)
                this._options[key] = (this.options("units") || "")
                    .split(",")
                    .filter(function(value) {
                        return value;
                    })
                    .map(function(value) {
                        return value.trim();
                    })
                    .join(",");

            // widget inputs min/max/step attributes
            if (!this._$ui)
                return;

            if (["min", "max", "step"].indexOf(key) !== -1) {
                var value = this.options(key);

                this._$ui.slider
                    .attr(key, value);
                this._$ui.text
                    .attr(key, value);
            }
            if (key === "min" && this.options("avoidTextMin"))
                this._$ui.text
                    .removeAttr(key);
            if (key === "max" && this.options("avoidTextMax"))
                this._$ui.text
                    .removeAttr(key);
            if (key === "avoidTextMin")
                this._$ui.text
                    .attr("min", this.options("min"))
                    .removeAttr(this.options("avoidTextMin") ? "min" : "_temp");
            if (key === "avoidTextMax")
                this._$ui.text
                    .attr("max", this.options("max"))
                    .removeAttr(this.options("avoidTextMax") ? "max" : "_temp");
        },

        /**
         * Get number/unit value
         *
         * @return {Array}
         */
        _parse: function(str) {
            if (typeof str === "undefined")
                str = this.value();

            var number = parseFloat(str) || 0,
                unit = str.replace(new RegExp("^" + number.toString().replace(".", "\\.")), ""),
                valid = this.options("units").split(",");
            if (valid.indexOf(unit) === -1)
                unit = valid[0];
            if (!unit)
                unit = "";

            return [ number, unit ];
        },

        /**
         * Default unit conversion function
         *
         * This is a backup method for converting
         * values from one unit to another (called
         * if no convert property is defined in
         * options). By default this method does
         * nothing (numeric part of value stays
         * the same). Use this method as guideline
         * for writing your own convert methods
         * (in options)...
         *
         *     if (oldUnit == newUnit)
         *         return {
         *             numeric: numeric*1,
         *         }
         *
         *     // some logic
         *
         *     return {
         *         numeric: numeric*1,
         *         unit: newUnit,
         *         min: this.options("min"),
         *         max: this.options("max"),
         *         step: this.options("step"),
         *         precision: this.options("precision"),
         *     }
         *
         * @param  {Number} numeric
         * @param  {String} oldUnit
         * @param  {String} newUnit
         * @return {Object}
         */
        _convert: function(numeric, oldUnit, newUnit) {
            return {
                numeric: numeric*1,
            }
        },

        /**
         * Refresh user interface
         *
         * @return {Void}
         */
        _refresh: function() {
            var min = this.options("min"),
                max = this.options("max"),
                parse = this._parse(),
                value = parse[0];

            this._$ui.slider
                .val(value);
            this._$ui.text
                .val(value);

            this._$ui.slider
                .css("--jquery-input-range-slider", (((value - min) / (max - min)) * 100) + "%");

            this._$ui.units
                .removeClass("jquery-input-range-unit-item-selected")
                .filter(function() {
                    return $(this).text() === parse[1];
                })
                .addClass("jquery-input-range-unit-item-selected");
        },

        /**
         * Execute hook and trigger event
         *
         * @param  {String} eventName
         * @return {Void}
         */
        _trigger: function(eventName) {
            var hook = this["_hook" + eventName.charAt(0).toUpperCase() + eventName.slice(1)];
            if (typeof hook === "function")
                hook.call(this);

            this._$ui.element
                .trigger("inputrange" + eventName.toLowerCase(), this);
        },

        /**
         * Render hook
         *
         * @return {Void}
         */
        _hookRender: function() {
            // pass
        },

        /**
         * Ready hook
         *
         * @return {Void}
         */
        _hookReady: function() {
            // pass
        },

        /**
         * Change hook
         *
         * @return {Void}
         */
        _hookChange: function() {
            // pass
        },

        /**
         * Get/set options property
         *
         * @param  {String} key
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        options: function(key, value) {
            if (!(key in this._options))
                throw "InputRange: invalid options key '" + key + "'";

            if (typeof value === "undefined")
                return this._options[key];

            // check values
            if (key === "units")
                throw "InputRange: unit list can be set only on init";
            else if (["min", "max", "step", "precision"].indexOf(key) !== -1 && isNaN(value))
                throw "InputRange: option '" + key + "' must be numeric value";
            else if (key === "step" && value <= 0)
                throw "InputRange: step can not be negative or zero value";
            //else if ((key === "min" && value == this._options.max) || (key === "max" && value == this._options.min))
            //    throw "InputRange: min and max can't have the same value";

            // set
            this._options[key] = value;

            // ...and fix
            this._fixOption(key);
        },

        /**
         * Get/set value
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        value: function(value) {
            if (typeof value === "undefined")
                return this._$ui.element.val();

            // validate
            var parse = this._parse(value);
            if (this.options("units").split(",").indexOf(parse[1]) === -1)
                return;
            if (parse[0] < this.options("min"))
                parse[0] = this.options("min");
            if (parse[0] > this.options("max"))
                parse[0] = this.options("max");

            // no change
            value = parse[0] + parse[1];
            if (value == this.value())
                return;

            // set
            this._$ui.element
                .val(value)
                .trigger("change");
        },

        /**
         * Get/set numeric part of value
         *
         * @param  {Number} value (optional)
         * @return {Mixed}
         */
        numeric: function(value) {
            var parse = this._parse();
            if (typeof value === "undefined")
                return parse[0];

            // validate
            value = value*1;
            if (isNaN(value))
                return;
            if (value < this.options("min"))
                value = this.options("min");
            if (value > this.options("max"))
                value = this.options("max");

            // no change
            if (value == parse[0])
                return;

            // set
            this._$ui.element
                .val(value*1 + parse[1])
                .trigger("change");
        },

        /**
         * Get/set unit part of value
         *
         * @param  {String} value (optional)
         * @return {Mixed}
         */
        unit: function(value) {
            var parse = this._parse();
            if (typeof value === "undefined")
                return parse[1];

            // validate
            if (this.options("units").split(",").indexOf(value) === -1)
                return;

            // convert
            var data, convert = this.options("convert");
            if (typeof convert === "function")
                data = convert.call(this, parse[0], parse[1], value);
            else
                data = this._convert(parse[0], parse[1], value);

            // check result
            if (!data || isNaN(data.numeric))
                return;

            // set new unit
            if (typeof data.unit === "undefined")
                data.unit = value;

            // set numeric types
            ["min", "max", "step", "precision"]
                .forEach(function(value) {
                    if (isNaN(data[value]))
                        data[value] = this.options(value);

                    data[value] *= 1;
                }.bind(this));

            // round to precision and balance min/max
            data.numeric = Math.round(data.numeric * Math.pow(10, data.precision)) / Math.pow(10, data.precision);
            if (data.numeric < data.min)
                data.numeric = data.min;
            if (data.numeric > data.max)
                data.numeric = data.max;

            // no change
            var noChange = true
                && (data.numeric + data.unit == this.value())
                && (data.min == this.options("min"))
                && (data.max == this.options("max"))
                && (data.step == this.options("step"))
                && (data.precision == this.options("precision"));
            if (noChange)
                return;

            // options
            this.options("min", data.min);
            this.options("max", data.max);
            this.options("step", data.step);
            this.options("precision", data.precision);

            // set
            this._$ui.element
                .val(data.numeric + data.unit)
                .trigger("change");
        },

        /**
         * Element change event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleElementChange: function(e) {
            // fix wrong unit
            var parse = this._parse();
            if ($(e.target).val() !== parse.join("")) {
                this._$ui.element
                    .val(parse.join(""))
                    .trigger("change");

                return;
            }

            // trigger inputrangechange event
            this._trigger("change");

            // refresh user interface
            this._refresh();
        },

        /**
         * Widget slider input event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleSliderInput: function(e) {
            this.numeric($(e.target).val());
        },

        /**
         * Widget slider mousedown event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleSliderMouseDown: function(e) {
            if (e.which !== 1)
                return;

            this.__dragging = true;
            this._trigger("dragstart");

            $(document)
                .on("mousemove.jqueryinputrange", this._handleSliderMouseMove.bind(this))
                .on("mouseup.jqueryinputrange", this._handleSliderMouseUp.bind(this));
        },

        /**
         * Widget slider mousemove event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleSliderMouseMove: function(e) {
            this._trigger("dragmove");
        },

        /**
         * Widget slider mouseup event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleSliderMouseUp: function(e) {
            if (!this.__dragging)
                return;

            $(document)
                .off(".jqueryinputrange");

            delete this.__dragging;

            this._trigger("dragstop");
        },

        /**
         * Widget text change event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleTextChange: function(e) {
            var value = $(e.target).val(),
                parse = this._parse();
            if (typeof value === "undefined")
                return parse[0];

            // validate
            value = value*1;
            if (isNaN(value))
                return;

            // no change
            if (value == parse[0])
                return;

            if (!this._options["avoidTextMin"] && value < this.options("min"))
                value = this.options("min");
            if (!this._options["avoidTextMax"] && value > this.options("max"))
                value = this.options("max");

            // set
            this._$ui.element
                .val(value*1 + parse[1])
                .trigger("change");
        },

        /**
         * Widget unit click event handler
         *
         * @param  {Object} e
         * @return {Void}
         */
        _handleUnitClick: function(e) {
            e.preventDefault();
            this.unit($(e.target).text());
        },

    });

    // jQuery plugin
    $.fn.inputRange = function(options) {
        var $this = $(this),
            args = Array.prototype.slice.call(arguments, 1);

        // iterate all
        $this.each(function() {
            // is init?
            var lib = $(this).data("jquery-input-range");

            // not init, create new instance
            if (!lib)
                lib = new InputRange(this, typeof options === "object" ? options : {});

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
                    throw "InputRange: no method named '" + options + "'";
            }
        });

        // ...finally
        return $this;
    };

})(window.jQuery, window, document);
