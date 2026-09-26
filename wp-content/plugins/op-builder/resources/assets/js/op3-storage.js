;(function(window, document) {

    "use strict";

    /**
     * OP3_StorageBase constructor
     *
     * @return {OP3_StorageBase}
     */
    var OP3_StorageBase = function() {
        if (!(this instanceof OP3_StorageBase))
            throw "OP3_StorageBase: OP3_StorageBase is a constructor.";
    };

    /**
     * OP3_StorageBase prototype
     *
     * @type {Object}
     */
    OP3_StorageBase.prototype = {

        /**
         * Prefix
         *
         * @type {String}
         */
        _prefix: "op3",

        /**
         * Storage object
         *
         * @type {String}
         */
        _storageObject: "globalStorage",

        /**
         * Camelcase string
         *
         * @param  {String} key
         * @return {String}
         */
        _camelcase: function(key) {
            return key.replace(/[^A-Za-z0-9]+([A-Za-z0-9])/g, function($0, $1) {
                return $1.toUpperCase();
            });
        },

        /**
         * Get value from storage
         *
         * @param  {String} key (optional)
         * @return {Mixed}
         */
        get: function(key) {
            var data = this.toObject(),
                arr = key.split("."),
                prop;

            while (arr.length) {
                prop = this._camelcase(arr.shift());

                try {
                    data = data[prop];
                }
                catch(e) {
                    return;
                }
            }

            return data;
        },

        /**
         * Set value to storage
         *
         * @param  {String} key
         * @param  {Mixed}  value
         * @return {Void}
         */
        set: function(key, value) {
            var data = this.toObject(),
                res = data,
                arr = key.split("."),
                prop;

            while (arr.length - 1) {
                prop = this._camelcase(arr.shift());
                if (typeof res[prop] !== "object") {
                    res[prop] = {};
                }

                res = res[prop];
            }

            prop = this._camelcase(arr.shift());
            res[prop] = value;

            window[this._storageObject].setItem(this._prefix, JSON.stringify(data));
        },

        /**
         * Remove key from storage
         *
         * @param  {String} key
         * @return {Void}
         */
        del: function(key) {
            var data = this.toObject(),
                res = data,
                arr = key.split("."),
                prop;

            while (arr.length - 1) {
                prop = this._camelcase(arr.shift());

                try {
                    res = res[prop];
                }
                catch(e) {
                    res = undefined;
                    break;
                }
            }

            if (typeof res !== "undefined") {
                try {
                    prop = this._camelcase(arr.shift());
                    delete res[prop];
                }
                catch(e) {
                    // pass
                }
            }

            window[this._storageObject].setItem(this._prefix, JSON.stringify(data));
        },

        /**
         * Process raw string data and
         * convert it to object
         *
         * @return {Object}
         */
        toObject: function() {
            var result = {};
            try {
                result = JSON.parse(window[this._storageObject].getItem(OP3.prefix));
            }
            catch(e) {
                // pass
            }

            // result can be empty string
            if (!result || typeof result !== "object")
                result = {};

            return result;
        },

    };

    // re-assign constructor
    OP3_StorageBase.prototype.constructor = OP3_StorageBase;

    /**
     * OP3_StorageLocal constructor
     *
     * @return {OP3_StorageLocal}
     */
    var OP3_StorageLocal = function() {
        if (!(this instanceof OP3_StorageLocal))
            throw "OP3_StorageLocal: OP3_StorageLocal is a constructor.";
    };

    // extend class
    OP3_StorageLocal.prototype = Object.create(OP3_StorageBase.prototype);
    OP3_StorageLocal.prototype.constructor = OP3_StorageLocal;
    OP3_StorageLocal.prototype._storageObject = "localStorage";

    /**
     * OP3_StorageSession constructor
     *
     * @return {OP3_StorageSession}
     */
    var OP3_StorageSession = function() {
        if (!(this instanceof OP3_StorageSession))
            throw "OP3_StorageSession: OP3_StorageSession is a constructor.";
    };

    // extend class
    OP3_StorageSession.prototype = Object.create(OP3_StorageBase.prototype);
    OP3_StorageSession.prototype.constructor = OP3_StorageSession;
    OP3_StorageSession.prototype._storageObject = "sessionStorage";

    // globalize
    window.OP3 = window.OP3 || {};
    window.OP3.LocalStorage = new OP3_StorageLocal();
    window.OP3.SessionStorage = new OP3_StorageSession();

})(window, document);
