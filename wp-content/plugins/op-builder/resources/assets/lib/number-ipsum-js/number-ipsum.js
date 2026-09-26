;(function(window, document) {

    // strict mode
    "use strict";

    /**
     * NumberIpsum constructor
     *
     * @param  {Object} options see NumberIpsum.prototype._defaults
     * @return {Void}
     */
    var NumberIpsum = function(options) {
        if (!(this instanceof NumberIpsum))
            throw "NumberIpsum: NumberIpsum is a constructor.";

        var o = {};
        for (var key in this._defaults) {
            var value = this._defaults[key];
            if (options && (key in options))
                value = options[key];

            if ([ "min", "max", "digits" ].indexOf(key) !== -1 && typeof value !== "number") {
                value = value ? value*1 : this._defaults[key];
                value = isNaN(value) ? this._defaults[key] : value;
            }
            else if ([ "decimalPoint", "thousandSeparator", "prefix", "suffix" ].indexOf(key) !== -1 && typeof value !== "string")
                value = value ? value + "" : this._defaults[key];

            o[key] = value;
        }

        this._options = o;
    }

    /**
     * NumberIpsum prototype
     *
     * @type {Object}
     */
    NumberIpsum.prototype = {

        /**
         * Default options
         *
         * @type {Object}
         */
        _defaults: {
            min: 0,
            max: 10,
            digits: 0,
            decimalPoint: ".",
            thousandSeparator: "",
            prefix: "",
            suffix: "",
        },

        /**
         * Get random number as string
         *
         * @return {String}
         */
        toString: function() {
            var num = Math.random() * (this._options.max - this._options.min) + this._options.min,
                str = num.toFixed(this._options.digits)
                    .replace(/\./, this._options.decimalPoint)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, this._options.thousandSeparator),
                result = this._options.prefix + str + this._options.suffix;

            return result;
        },

    }

    // re-assign constructor
    NumberIpsum.prototype.constructor = NumberIpsum;

    // globalize
    window.NumberIpsum = NumberIpsum;

})(window, document);
