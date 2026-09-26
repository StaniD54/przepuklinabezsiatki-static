;(function(window, document) {

    "use strict";

    /**
     * OP3_Cookie constructor
     *
     * @return {OP3_Cookie}
     */
    var OP3_Cookie = function() {
        if (!(this instanceof OP3_Cookie))
            throw "OP3_Cookie: OP3_Cookie is a constructor.";
    };

    /**
     * OP3_Cookie prototype
     *
     * @type {Object}
     */
    OP3_Cookie.prototype = {

        /**
         * Cookie default options
         * used for setting cookie
         */
        _defaults: {
            expires: null,      // maximum lifetime of the cookie
            "max-age": null,    // number of seconds until the cookie expires
            domain: null,       // hosts to where the cookie will be sent
            path: "/",          // a path that must exist in the requested url, or the browser won't send the cookie header
            secure: null,       // a secure cookie is only sent to the server when a request is made with the https: scheme
            //httponly: null,     // forbids JavaScript from accessing the cookie
            samesite: null,     // asserts that a cookie must not be sent with cross-origin requests
        },

        /**
         * Encode cookie key
         *
         * A <cookie-name> can be any US-ASCII characters,
         * except control characters, spaces, or tabs. It
         * also must not contain a separator character
         * like the following:
         * ( ) < > @ , ; : \ " / [ ] ? = { }.
         *
         * @param  {String} value
         * @return {String}
         */
        _encodeKey: function(value) {
            //return value
            //    .replace(/[^\x00-\x7F]+/g, "")                      // allow only US-ASCII
            //    .replace(/[\x00-\x0F]+/g, "")                       // don't allow control characters (x00-x0F)
            //    .replace(/\x7F+/g, "")                              // don't allow control character del (x7F)
            //    .replace(/\x20+/g, "")                              // don't allow space (x20)
            //    .replace(/\x09+/g, "")                              // don't allow tab (x09)
            //    .replace(/[\(\)<>@,;:\\"\/\[\]\?={}]+/g, "");       // remove separator characters

            return value
                .replace(/[^\x10-\x7E]+/g, "")                      // allow only US-ASCII without control characters
                .replace(/[\x20\(\)<>@,;:\\"\/\[\]\?={}]+/g, "");   // remove spaces and separator characters
        },

        /**
         * Encode cookie value
         *
         * Many implementations perform URL encoding on cookie
         * values, however it is not required per the RFC
         * specification. It does help satisfying the
         * requirements about which characters are allowed
         * for <cookie-value> though.
         *
         * @param  {String} value
         * @return {String}
         */
        _encodeValue: function(value) {
            return encodeURIComponent(value);
        },

        /**
         * Decode cookie value
         *
         * @param  {String} value
         * @return {String}
         */
        _decodeValue: function(value) {
            return decodeURIComponent(value);
        },

        /**
         * Get cookie by key
         *
         * @param  {String} key
         * @return {Mixed}
         */
        get: function(key) {
            var cookies = this.toObject(),
                result = key in cookies ? cookies[key] : null;

            return result;
        },

        /**
         * Set cookie
         *
         * @param  {String} key
         * @param  {String} value
         * @param  {Object} options (optional)
         * @return {Void}
         */
        set: function(key, value, options) {
            if (typeof key === "undefined" || key === "")
                return;

            key = this._encodeKey(key);
            value = this._encodeValue(value);
            if (!key || !value)
                throw "OP3.Cookie: key/value arguments are mandatory.";

            // lowercase options keys and extend it
            // with defaults
            options = options || {};
            for (var prop in options) {
                var temp = options[prop];
                delete options[prop];

                options[prop.toLowerCase()] = temp;
            }
            for (var prop in this._defaults) {
                if (!(prop in options)) {
                    options[prop] = this._defaults[prop];
                }
            }

            // convert expires validation
            if (options.expires) {
                // expires is a number, add it to days of
                // current date
                if (!isNaN(options.expires*1)) {
                    var date = new Date;
                    date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);

                    options.expires = date;
                }

                // expires is a date, convert it to right format
                if (options.expires instanceof Date)
                    options.expires = options.expires.toUTCString();
            }

            // parse options
            var suffix = "";
            for (var prop in options) {
                if (options[prop] === null || options[prop] === false)
                    continue;

                // append ";key" or ";key=value" to suffix
                suffix += ";" + prop;
                if (options[prop] !== true)
                    suffix += "=" + options[prop];
            }

            document.cookie = key + "=" + value + suffix;
        },

        /**
         * Remove cookie
         *
         * @param  {String} key
         * @return {Void}
         */
        del: function(key) {
            this.set(key, "0", { expires: -1 });
        },

        /**
         * Process raw cookie data and
         * convert it to object
         *
         * @return {Object}
         */
        toObject: function() {
            var rawData = document.cookie ? document.cookie.split("; ") : [],
                result = {};

            rawData.forEach(function(cookie) {
                var parts = cookie.split("="),
                    key = parts[0],
                    value = parts.slice(1).join("=");

                // decode
                value = this._decodeValue(value);

                // remove double quotes
                value = value.replace(/^"(.*)"$/, "$1");

                result[key] = value;
            }.bind(this));

            return result;
        },

    };

    // re-assign constructor
    OP3_Cookie.prototype.constructor = OP3_Cookie;

    // globalize
    window.OP3 = window.OP3 || {};
    window.OP3.Cookie = new OP3_Cookie();

})(window, document);
