;(function($, window, document) {

    "use strict";

    /**
     * Element selector
     *
     * @type {String}
     */
    var _selector = '[data-op3-element-type="select"]';

    /**
     * Handles custom search matching.
     *
     * @param {String} params
     * @param {Object} data
     * @return {Mixed}
     */
    var matcher = function(params, data) {
        if ($.trim(params.term) === "") {
            return data;
        }

        if (typeof data.text === 'undefined') {
            return null;
        }

        var index = data.text.toLowerCase().indexOf(params.term.toLowerCase());
        if (index > -1) {
            var modifiedData = $.extend({
                'htmlmatch': data.text.replace(new RegExp( "(" + params.term + ")","gi"), '<span class="select2-results__match">$1</span>')
            }, data, true);

            return modifiedData;
        }

        return null;
    }

    /**
     * Customizes the way that search results are rendered
     *
     * @param {Object} result
     * @return {String}
     */
    var templateResult = function(result) {
        return result.htmlmatch ? result.htmlmatch : result.text;
    }

    /**
     * Handles automatic escaping of content rendered by custom templates
     *
     * @param {String} markup
     * @return {String}
     */
    var escapeMarkup = function(markup) {
        return markup;
    }

    /**
     * Sort select2 options
     *
     * @param {Array} data
     * @return {Array}
     */
    var sorter = function(data) {
        var wanted = [ "US", "CA", "GB", "IE", "AU", "NZ" ];

        // Find wanted countries and put it on beginning of array
        data.some(function(item, index) {
            if (wanted.indexOf(item.id) !== -1) {
                data.unshift(
                    data.splice(index,1)[0]
                )
            }
        })

        return data;
    }

    // Init select2 to op3 select elements
    $(document)
        .ready(function() {
            var $elements = $(document.body).find(_selector + ' select');

            $elements.each(function() {
                var $this = $(this);

                // Disabling label because it's causing problem on select2
                // https://github.com/select2/select2/issues/5137
                $this
                    .closest("label")
                    .on("click", function(e) {
                        e.preventDefault();
                    });

                var options = {
                    width: "100%",
                    dropdownParent: $this.closest(".op3-element-select-wrapper"),
                    escapeMarkup: escapeMarkup,
                    templateResult: templateResult,
                    matcher: matcher,
                    placeholder: {
                        id: "",
                        text: "None",
                        selected:'selected'
                    },
                };

                var name = $this.attr("name") || "";
                // Special sorter for cart element country field
                if (name === "opc_country") {
                    options.sorter = sorter;
                }
                // Specific placeholder for everwebinar/webinarjam
                // integration schedule field
                else if (name === "schedule") {
                    options.placeholder.text = "Select time and date";
                }

                if ($this.attr("data-placeholder").length > 0) {
                    options.placeholder.text = $this.attr("data-placeholder");
                }

                $this
                    .one("select2:opening", function(e) {
                        var $this = $(this),
                            lib = $this.data("select2"),
                            $dropdown = lib.$dropdown,
                            css = $this.css([
                                "fontFamily",
                                "fontSize",
                                "fontWeight",
                                "fontStyle",
                                "lineHeight",
                                "height",
                                "letterSpacing",
                                "textTransform",
                                "color",
                            ]);

                        // set dropdown css (inherit from element itself)
                        $dropdown.css(css);
                    })
                    .select2(options);
            });
        });

})(jQuery, window, document);
