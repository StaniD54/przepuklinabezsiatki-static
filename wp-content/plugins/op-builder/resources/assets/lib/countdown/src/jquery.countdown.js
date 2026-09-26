/**
 * Define Countdown jQuery plugin.
 *
 * Dependencies:
 *     - jQuery.js
 *     - countdown.js
 */
;(function($, window, document) {
    var className = 'Countdown',
        classObject = Countdown,
        base = classObject.prototype,
        original = {
            _init: base._init,
            destroy: base.destroy,
        },
        store = 'jquery-countdown';

    /**
     * Override base constructor:
     * store this object to jQuery data.
     *
     * @return {Void}
     */
    base._init = function() {
        original._init.apply(this, arguments);

        $(this.element).data(store, this);
    }

    /**
     * Override base destructor:
     * clear this object from jQuery data.
     *
     * @return {Void}
     */
    base.destroy = function() {
        $(this.element).removeData(store);

        original.destroy.apply(this, arguments);
    }

    /**
     * jQuery Countdown plugin.
     *
     * @param  {Mixed} options
     * @return {Mixed}
     */
    $.fn.countdown = function(options) {
        var args = Array.prototype.slice.call(arguments, 1),
            $this = $(this);

        // Iterate all.
        $this.each(function() {
            // Get instance (or create new one).
            var instance = $(this).data(store);
            if (!instance)
                instance = new classObject(this, typeof options === 'object' ? options : {});

            // Access properties.
            if (typeof options === 'string') {
                var exists = options in instance,
                    isPrivate = options.substr(0, 1) === '_',
                    type = typeof instance[options];

                // Property is function, execute it.
                if (exists && !isPrivate && type === 'function' && instance[options] !== Object.prototype[options] && options !== 'constructor') {
                    var result = instance[options].apply(instance, args);

                    // Function returned result (non undefined), store
                    // result, exit loop.
                    if (typeof result !== 'undefined') {
                        $this = result;
                        return false;
                    }
                }

                // Property as getter (get, store result, exit loop).
                else if (exists && !isPrivate && type !== 'function' && !args.length) {
                    $this = instance[options];
                    return false;
                }

                // Property as setter (set, continue).
                else if (exists && !isPrivate && type !== 'function') {
                    instance[options] = args[0];
                }

                // Invalid option argument.
                else {
                    throw className + ': ' + options + ' is not a valid ' + className + ' property.';
                }
            }
        });

        // ...finally.
        return $this;
    };
})(window.jQuery, window, document);
