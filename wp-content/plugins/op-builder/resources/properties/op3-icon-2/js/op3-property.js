/**
 * OptimizePress3 op3Icon3 property.
 */
;(function($, window, document) {

    "use strict";

    /**
     * OP3_Property constructor
     *
     * @param {Class}
     */
    OP3.Elements._extension.prop.Op3Icon2 = OP3.defineClass({

        Name: "OP3.Property.Op3Icon2",

        Extends: OP3.Elements._extension.prop.Default,

        Constructor: function(properties) {
            return OP3.Elements._extension.prop.Default.apply(this, arguments);
        },

        Prototype: {

            _name: "op3Icon2",

            _defaults: {
                label: function() {
                    return OP3._("Icon");
                },
                tag: "select",
                attr: {
                    "data-property-type": "select2",
                },
                options: [
                    // api request
                ],
            },

            _forceComputed: true,

            computed: function() {
                var $target = $(this.target());
                var result = $target.attr("data-op3-icon");

                if (!result) {
                    var className = $target.attr("class");
                    var match = className.match(/op3-icon-[a-zA-Z0-9-]+/);
                    result = match ? match[0] : "op3-icon-shape-star-2";
                }

                return result;
            },

            setter: function(value, media) {
                if (value !== "_empty" && this._validOptions().indexOf(value) === -1)
                    return;

                // not an css property, ignore media
                var $target = $(this.target());
                $target.each(function() {
                    var $this = $(this);

                    $this.attr("data-op3-icon", value);
                    if ($this.is(".op3-icon"))
                        $this
                            .attr("class", function(index, attr) {
                                return attr
                                    .replace(/\bop3-icon-\S+/g, "")
                                    .replace(/\s+/, " ")
                                    .trim();
                            })
                            .addClass(value);
                });
            },

        },

    });

    // load icons from api (redefine options argument)
    OP3.bind("loadelementicons", function(e, o) {
        var proto = OP3.Elements._extension.prop.Op3Icon2.prototype;
        proto._defaults.attr["data-property-type"] = "select2-paginate";
        proto._defaults.attr["data-filter-method"] = "OP3.Icons.filterByElementPath";
        proto._defaults.options = OP3.Icons.data();

        // select2-paginate needs to override default
        // _renderOptions method so it renders only
        // current value option
        proto._renderOptions = function(media) {
            var value = this.computed(),
                item = this._getOptions()
                    .filter(function(item) {
                        return item.id === value;
                    })
                    [0];

            return $("<option />")
                .attr("value", item.id)
                .attr("data-format", item.format || "")
                .text(item.text)
                .prop("outerHTML");
        };
    });

})(jQuery, window, document);
