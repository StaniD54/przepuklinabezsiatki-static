;(function() {

    "use strict";

    /**
     * OP3.LinkProperties object
     *
     * @type {Object}
     */
    var that = {

        /**
         * Configuration for each element type
         * (this object is defined inside
         * op3-link-properties-config.js)
         *
         * @type {Object}
         */
        _config: {

            /*
            // column is element type
            column: [
                {
                    // element which will set css properties. this
                    // is usualy element's parent, but can be any
                    // element ancestor.
                    owner: "row",

                    // link properties only if condition is matched.
                    // this attribute is optional, usualy string,
                    // but can be function for advance usage.
                    condition: ":nth-child(1)",

                    // link element/parent or element/cousins
                    link: {
                        // link element/parent properties (used for css
                        // properties). in this example we would reset
                        // column's width/height (set to null) on
                        // column width/height change, and set
                        // row's columnWidth/columnHeight to
                        // new value.
                        parent: {
                            width: "columnWidth",
                            height: "columnHeight",
                        },

                        // link element/cousins properties (used for
                        // attribute properties). in this example we
                        // would set class to new value to all
                        // column cousins on element class
                        // property change
                        cousins: [
                            "class",
                        ],
                    },
                },
            ],
            */

        },

        /**
         * Active element's cousins object
         *
         * @type {Object}
         */
        _cousins: null,

        /**
         * Cached cousin elements
         *
         * @type {Object}
         */
        _cache: null,

        /**
         * Object initialization
         *
         * @return {Void}
         */
        _init: function() {
            //OP3.bind("elementstyling", that._handleElementStyling);
            OP3.bind("elementchanging", that._handleElementChanging);
            OP3.bind("elementchange", that._handleElementChange);
            OP3.bind("elementchange::*::linkProperties", that._handleElementChangeLinkProperties);
            OP3.bind("elementfocus", that._handleElementFocus);
            OP3.bind("elementunfocus", that._handleElementUnfocus);
            OP3.bind("elementappend", that._handleElementAppend);
            OP3.bind("elementdetach elementremove", that._handleElementDetach);
        },

        /**
         * Get node's cousin elements
         * defined in config
         *
         * @param  {Node}   node
         * @return {Object}
         */
        _getCousinsObjectSingle: function(node) {
            var result = null,
                element = OP3.$(node),
                type = element.type()
            if (!(type in that._config))
                return result;

            // iterate configuration for element type
            for (var i = 0; i < that._config[type].length; i++) {
                var item = that._config[type][i],
                    owner = element.parent().closest(item.owner);

                // no owner found
                if (!owner.length)
                    continue;

                // this is not the element we're looking for
                if (item.condition && !element.jq().is(item.condition))
                    continue;

                // no child elements found
                var selector = (item.condition || "") + '.op3-element[data-op3-element-type="' + type + '"]',
                    children = owner.jq().find(selector);
                if (!children.length)
                    continue;

                // all check
                result = {
                    element: element,
                    owner: owner,
                    //children: null,
                    //links: null,
                    config: item,
                };

                // ...exit loop
                break;
            };

            return result;
        },

        /**
         * Get node's cousin elements
         * defined in config
         *
         * @param  {Node}   node
         * @return {Object}
         */
        _getCousinsObjectRecursive: function(node) {
            var result = null,
                element = OP3.$(node),
                type = element.type();
            if (!(type in that._config))
                return result;

            // get cousings object for each element parent
            var cousins = [ this._getCousinsObjectSingle(element) ];
            while (cousins[cousins.length - 1]) {
                var item = cousins[cousins.length - 1];
                if (!that._isLinked(item.owner))
                    break;

                cousins.push(this._getCousinsObjectSingle(item.owner));
            };
            if (!cousins[cousins.length - 1])
                cousins.pop();
            if (!cousins.length)
                return result;

            // merge cousins list into result
            result = {
                element: element,
                owner: cousins[cousins.length - 1].owner,
                children: OP3.$(null),
                links: OP3.$(null),
                config: null,
            };

            // result children
            var selector = "";
            for (var i = cousins.length - 1; i >= 0; i--) {
                var item = cousins[i];
                selector += selector ? " " : "";
                selector += (item.config.condition || "") + '.op3-element[data-op3-element-type="' + item.element.type() + '"]';
            };
            result.children = result.owner.jq().find(selector);
            result.children = OP3.$(result.children);

            // result links
            if (that._isLinked(element)) {
                selector = "";
                for (var i = cousins.length - 1; i >= 0; i--) {
                    var item = cousins[i];
                    selector += selector ? " " : "";
                    selector += (item.config.condition || "") + '.op3-element[data-op3-element-type="' + item.element.type() + '"]:not([data-link-properties="0"])';
                };
                result.links = result.owner.jq().find(selector);
                result.links = OP3.$(result.links);
            }

            // result config
            result.config = {
                parent: $.extend({}, cousins[0].config.link.parent),
                cousins: $.extend([], cousins[0].config.link.cousins),
            };

            var props = Object.keys(result.config.parent);
            for (var i = 1; i < cousins.length; i++) {
                for (var j = 0; j < props.length; j++) {
                    var key = props[j],
                        value = result.config.parent[key];
                    if (!(value in cousins[i].config.link.parent))
                        throw "OP3.LinkProperties: invalid recursive configuration (" + key + "@" + type + " -> " + value + "@" + cousins[i].element.type() + ").";

                    result.config.parent[key] = cousins[i].config.link.parent[value];
                };
            };

            // it seams like we could use cousins list,
            // let's store it to our result
            result.config._tree = cousins;

            return result;
        },

        /**
         * Get node's cousin elements
         * defined in config
         *
         * @param  {Node}    node
         * @param  {Boolean} force (optional)
         * @return {Object}
         */
        _getCousinsObject: function(node, force) {
            var result = null,
                element = OP3.$(node),
                uuid = element.uuid(),
                type = element.type();
            if (!(type in that._config))
                return result;

            // clear cache
            if (force)
                that._cache = null;

            // active element
            else if (element.node() === OP3.Designer.activeElement().node())
                return that._cousins;

            // check cache object
            if (that._cache) {
                for (var key in that._cache) {
                    if (key === uuid)
                        return that._cache[key];
                }
            }

            // get new result
            result = this._getCousinsObjectRecursive(node);

            // store result to cache
            that._cache = that._cache || {};
            that._cache[uuid] = result;

            // ...temporary, clear it on next tick
            setTimeout(function() {
                that._cache = null;
            });

            return result;
        },

        /**
         * Get list of methods to execute while
         * changing property on node (or element)
         *
         * @param  {Node}   node
         * @param  {String} key
         * @param  {String} value
         * @param  {String} media
         * @return {Array}
         */
        _getCousinsMethodsList: function(node, key, value, media) {
            // nothing to do for linkProperties
            if (key === "linkProperties")
                return null;

            // get linked elements (cousins object),
            // should already be cached
            var cousins = that._getCousinsObject(node);
            if (!cousins || !cousins.links || !cousins.links.length)
                return null;

            // is there anything to do?
            var doChildren = !!(cousins.config.parent && (key in cousins.config.parent)),
                doLinks = !!(cousins.config.cousins && cousins.config.cousins.indexOf(key) !== -1),
                result = [];
            if (!doChildren && !doLinks)
                return null;

            // css properties
            if (doChildren) {
                // owner: set real value
                result.push([ cousins.owner, "setOption", [ cousins.config.parent[key], value, media ] ]);

                // linked elements: reset (set to null) so
                // it can inherit property from owner
                result.push([ cousins.links, "setOption", [ key, null, media ] ]);

                // linked elements ancestors: reset as well
                var linkKey = key;
                cousins.config._tree.forEach(function(item) {
                    var element = cousins.links
                        .closest(item.config.owner)
                        .not(cousins.owner);
                    if (!element.length)
                        return;

                    linkKey = item.config.link.parent[linkKey];
                    result.push([ element, "setOption", [ linkKey, null, media ] ]);
                });

                // elements that are not linked:
                // set current property on it
                cousins.children
                    .not(cousins.links)
                    .each(function() {
                        var child = OP3.$(this),
                            linkKey = key,
                            linkValue = null;

                        // element is linked means that the
                        // value should be written to it's
                        // ancastor, make sure it is (we
                        // may reset it before)
                        var isLinked = that._isLinked(child);
                        if (isLinked) {
                            var linkParent = child;
                            for (var i = 0; i < cousins.config._tree.length; i++) {
                                linkParent = linkParent.closest(cousins.config._tree[i].config.owner);
                                isLinked = that._isLinked(linkParent);
                                if (isLinked)
                                    continue;

                                linkKey = cousins.config._tree[i].config.link.parent[linkKey];
                                break;
                            }

                            // this should never happen (we should
                            // be able to find non-linked element),
                            // but let's just use this to make sure
                            // our logic is right
                            if (i === cousins.config._tree.length)
                                throw "OP3.LinkProperties: unable to find linked parent for element .";

                            // everythin fine, continue
                            child = linkParent;
                        }

                        // set value
                        linkValue = child.getOption(linkKey, true);
                        result.push([ child, "setOption", [ linkKey, linkValue, media ] ]);
                    });
            }

            // attr properties (this one's simple)
            if (doLinks) {
                result.push([ cousins.links, "setOption", [ key, value, media ] ]);
            }

            return result;
        },

        /**
         * Does element have linkProperties
         * turned on
         *
         * @param  {Node}    node
         * @return {Boolean}
         */
        _isLinked: function(node) {
            return !!(OP3.$(node).getOption("linkProperties", "all")*1);
        },

        /**
         * Get/set pending flag for
         * element(s)
         *
         * @param  {Mixed}   selector DOM node, jQuery element, string selector, op3query object, op3element object
         * @param  {Boolean} status   (optional)
         * @return {Mixed}
         */
        _isPending: function(selector, status) {
            var uuid = OP3.$(selector)
                .toArray()
                .map(function(item) {
                    return OP3.$(item).uuid();
                });

            // get staus for first node
            if (typeof status === "undefined")
                return uuid[0] in (that._pending || {});

            // set empty flag (if necessary)
            that._pending = that._pending || {};

            // set status
            uuid.forEach(function(item) {
                if (status)
                    that._pending[item] = true;
                else
                    delete that._pending[item];
            });

            // clear empty flag (if necessary)
            if ($.isEmptyObject(that._pending))
                delete that._pending;
        },

        /**
         * Elementstyling event handler
         *
         * @todo - never used, so never tested
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementStyling: function(e, o) {
            if (that._isPending(o.node))
                return;

            // get linked elements (cousins object)
            var cousins = that._getCousinsObject(o.node);
            if (!cousins || !cousins.links || !cousins.links.length)
                return;

            // flag pending to prevent recursion
            that._isPending(o.node, true);

            // set style
            cousins.children.style(o.value.after);

            // clear pending flag
            that._isPending(o.node, false);

            // prevent default
            return false;
        },

        /**
         * Elementchanging event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChanging: function(e, o) {
            var node = o.node,
                name = o.name,
                key = o.id,
                value = o.value.after,
                media = o.media,
                important = o.important;

            // skip if important
            if (important)
                return;

            // skip linkProperties
            if (name === "linkProperties")
                return;

            // element already being changed
            if (that._isPending(node))
                return;

            // what to do?
            var cousins = that._getCousinsObject(node),
                methods = that._getCousinsMethodsList(node, key, value, media);
            if (!methods || !methods.length)
                return;

            // flag pending to prevent recursion
            var pending = methods
                .map(function(item) {
                    return item[0];
                })
                .reduce(function(accumulator, currentValue) {
                    return accumulator.add(currentValue);
                });
            that._isPending(pending, true);

            // execute each method
            methods.forEach(function(item) {
                var element = item[0],
                    method = item[1],
                    args = item[2] || [];

                element[method].apply(element, args);
            });

            // clear pending flag
            that._isPending(pending, false);

            // prevent default
            return false;
        },

        /**
         * Elementchange event handler:
         * changing linked element property to null
         * won't trigger elementchange (null to null),
         * so we need to force property widget resync
         * on owner change
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChange: function(e, o) {
            var refresh = true
                && o.value.after === null
                && o.id !== "linkProperties"
                && that._cousins
                && that._cousins.config
                && that._cousins.config.parent
                && that._cousins.owner.is(o.node)
                && that._cousins.links.is(OP3.Designer.activeElement())
            if (!refresh)
                return;

            // find property key by value
            var key = Object.keys(that._cousins.config.parent)
                .filter(function(item) {
                    return that._cousins.config.parent[item] === o.id
                })[0];

            // ...and re-sync property widget
            if (key)
                OP3.transmit("elementoptionssyncrequest", { property: [ key ] });
        },

        /**
         * Elementchange::*::linkProperties
         * event handler:
         * re-sync property widgets
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementChangeLinkProperties: function(e, o) {
            var cousins = that._cousins;
            if (!cousins)
                return;

            if (cousins.children.jq().is(o.node)) {
                cousins.links.jq().removeClass("op3-link-properties");

                cousins.links = OP3.$(null);
                if (that._isLinked(o.node))
                    cousins.links = cousins.children.filter(function() {
                        return that._isLinked(this);
                    });

                cousins.links.jq().addClass("op3-link-properties");

                if (OP3.Designer.activeElement().node() === o.node)
                    OP3.transmit("elementoptionssyncrequest", { property: Object.keys(that._cousins.config.parent) });
            }
        },

        /**
         * Elementfocus event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementFocus: function(e, o) {
            that._cousins = that._getCousinsObject(o.node, true);

            if (that._cousins)
                that._cousins.links.jq().addClass("op3-link-properties");
        },

        /**
         * Elementunfocus event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementUnfocus: function(e, o) {
            if (that._cousins)
                that._cousins.links.jq().removeClass("op3-link-properties");

            that._cousins = null;
        },

        /**
         * Elementappend event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementAppend: function(e, o) {
            if (!that._cousins)
                return;

            // is appended element inside of cousins owner
            if (!OP3.$(o.node).closest(that._cousins.owner).length)
                return;

            // refresh and repaint
            that._cousins.links.jq().removeClass("op3-link-properties");
            that._cousins = that._getCousinsObject(that._cousins.element, true);
            if (that._cousins)
                that._cousins.links.jq().addClass("op3-link-properties");
        },

        /**
         * Elementdetach event handler
         *
         * @param  {Object} e
         * @param  {Object} o
         * @return {Void}
         */
        _handleElementDetach: function(e, o) {
            if (!that._cousins)
                return;

            // is detached element a part of cousin links
            if (!that._cousins.links.is(o.node))
                return;

            // refresh and repaint
            that._cousins.links.jq().removeClass("op3-link-properties");
            that._cousins = that._getCousinsObject(that._cousins.element, true);
            if (that._cousins)
                that._cousins.links.jq().addClass("op3-link-properties");
        },

    }

    // globalize
    window.OP3.LinkProperties = that;
    $(function() {
        window.parent.OP3.LinkProperties = that;
    });

    // autoinit
    $(function() {
        OP3.LinkProperties._init();
    });

    // set property computed decorator
    $(function() {
        // real computed method
        var propertyComputed = OP3.Elements._extension.prop.Default.prototype.computed;

        /**
         * Get computed css property
         *
         * Property computed decorator:
         * For example if we set margin auto on linked
         * property, we actually set it on it's parent,
         * and property.computed will give as real
         * (computed) value in px. We don't want
         * that, we want acctual value set on
         * parent...
         *
         * @return {String}
         */
        OP3.Elements._extension.prop.Default.prototype.computed = function() {
            if (this.element.getOption("linkProperties", "all")*1) {
                var result = null,
                    key = this.id(),
                    node = this.element.node(),
                    cousins = OP3.LinkProperties._cousins;
                if (node !== OP3.Designer.activeElement().node())
                    cousins = OP3.LinkProperties._getCousinsObject(node);

                // check if value is set to ancestors for
                // current media (or larger)
                if (cousins && cousins.config && cousins.config.parent && key in cousins.config.parent) {
                    var owners = cousins.config._tree.map(function(item) {
                            return item.owner;
                        }),
                        linkKey = key,
                        props = cousins.config._tree.map(function(item) {
                            linkKey = item.config.link.parent[linkKey];
                            return linkKey;
                        }),
                        mediaCurrent = OP3.LiveEditor.deviceMedia(),
                        mediaFound = false,
                        mediaList = [];

                    OP3.LiveEditor.forEachDevice(function(device, media) {
                        if (!mediaFound)
                            mediaList.push(media);
                        if (media === mediaCurrent)
                            mediaFound = true;
                    });
                    mediaList.reverse();

                    for (var i = 0; i < owners.length; i++) {
                        var currentOwner = owners[i],
                            currentProp = props[i],
                            currentMedia = null;

                        for (var j = 0; j < mediaList.length; j++) {
                            currentMedia = mediaList[j];
                            result = currentOwner.element().getOption(currentProp, currentMedia);

                            if (result !== null)
                                break;
                        };

                        if (result !== null)
                            break;
                    };
                };

                if (result !== null)
                    return result;
            }

            return propertyComputed.apply(this, arguments);
        }
    });

    // trigger elementoptionssyncrequest on linked
    // child while doing elementchange on parent
    OP3.bind("elementchange", function(e, o) {
        if (!OP3.LinkProperties._cousins)
            return;
        if (OP3.LinkProperties._cousins.owner.node() !== o.node)
            return;
        if (!OP3.LinkProperties._cousins.config.parent)
            return;

        var emit = { property: [] };
        for (var link in OP3.LinkProperties._cousins.config.parent) {
            if (OP3.LinkProperties._cousins.config.parent[link] === o.id)
                emit.property.push(link);
        }

        if (emit.property.length)
            OP3.transmit("elementoptionssyncrequest", emit);
    });

})();
