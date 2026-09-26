/**
 * OptimizePress3 designer extension:
 * text related stuff.
 *
 * Dependencies:
 *     - jQuery.js
 *     - ice-text-editor.js
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Floatbar object
     *
     * Note: all the floatbar handlers and logic
     * moved to op3-ice-floatbar.js (where it
     * belongs :-) )...
     *
     * @type {Object}
     */
    var _floatbar = null;

    /**
     * Autoinit editor
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _editor = function(e, o) {
        if (!_floatbar)
            _floatbar = new ice.OP3.Floatbar();

        $(o ? o.node : document)
            .find('[data-op3-contenteditable]:not([data-op3-contenteditable="false"])')
            .on("dragenter dragleave dragover drop", function(e) {
                e.originalEvent.dataTransfer.dropEffect = "none";
                e.preventDefault();
            })
            .each(function() {
                if (this.ice)
                    this.ice.destroy();

                // op3 element
                var $element = OP3.$.closest(this).jq();
                var type = OP3.$($element).type();
                var spec = OP3.$($element).spec();
                var path = OP3.$($element).path();

                // add additional data attribute to element
                // to be able to style it differently (OP3-1634)
                $element
                    .attr("data-op3-ice-editor", "");

                // add element type/spec/path to data attr, so
                // css can display different toolbar options
                // for different elements
                $(this)
                    .attr("data-floatbar-element-type", type)
                    .attr("data-floatbar-element-spec", spec)
                    .attr("data-floatbar-element-path", path);

                // default options, simple text editor
                var options = {
                    defaultTag: "div",
                    allowLineBreak: true,
                    allowHorizontalRule: false,
                    allowSplit: false,
                    allowedBlocks: [ "div", ],
                    autoSelectLink: true,
                    autoSelectAll: false
                }

                // advanced text editor
                if (type === "headline") {
                    options.defaultTag = "h2";
                    if (this.firstElementChild && this.firstElementChild.tagName.toLowerCase().substr(0, 1) === "h")
                        options.defaultTag = this.firstElementChild.tagName.toLowerCase();
                    options.allowedBlocks = [ "h1", "h2", "h3", "h4", "h5", "h6", ];
                } else if (type === "text") {
                    options.defaultTag = "p";
                    options.allowSplit = true;
                    options.allowedBlocks = [ "h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "blockquote", "ul", "ol", ];
                } else if ([ "faqitem", "contenttoggleitem" ].includes(type)) {
                    options.defaultTag = "p";
                    options.allowSplit = true;
                    options.allowedBlocks = [ "p" ];
                } else if ([ "socialsharingitem", "switcher", "date", "webinardate", "counter" ].includes(type)) {
                    options.defaultTag = "p";
                    options.allowLineBreak = false;
                    options.allowedBlocks = [ "p" ];
                } else if (type === "tweet") {
                    options.defaultTag = "p";
                    options.allowLineBreak = true;
                    options.allowedBlocks = [ "p" ];
                }

                // Fix for an issue in Firefox that prevents selection on inline text.
                // The bug is happening because firefox has by default draggable
                // enabled on all <a> elements, which breaks the
                // contenteditable from working properly.
                if ($(this).parent().is("a")) {
                    $(this).parent().attr("draggable", "false");
                }

                // instance ice editor
                new ice.OP3.Editor(this, options);
            });
    }

    /**
     * Replace loremipsum tag with
     * lorem ipsum text
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _loremIpsum = function(e, o) {
        $(o ? o.node : document)
            .find("loremipsum")
                .each(function() {
                    var ipsum = new LoremIpsum();
                    var method = $(this).attr("method") || "paragraph";
                    var min = $(this).attr("min")*1 || undefined;
                    var max = $(this).attr("max")*1 || undefined;
                    var slice = $(this).attr("slice")*1;
                    var text = ipsum[method](min, max);

                    if (slice)
                        text = text.slice(0, slice);

                    $(this).replaceWith(text);
                });
    }

    /**
     * Replace personipsum tag with
     * person ipsum text
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _personIpsum = function(e, o) {
        $(o ? o.node : document)
            .find("personipsum")
                .each(function() {
                    var ipsum = new PersonIpsum({
                        format: $(this).attr("format") || "",
                        gender: $(this).attr("gender") || "",
                    });
                    var text = ipsum.generate();

                    $(this).replaceWith(text);
                });
    }

    /**
     * Replace numberipsum tag with
     * number ipsum text
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _numberIpsum = function(e, o) {
        $(o ? o.node : document)
            .find("numberipsum")
                .each(function() {
                    var ipsum = new NumberIpsum({
                        min: $(this).attr("min"),
                        max: $(this).attr("max"),
                        digits: $(this).attr("digits"),
                        decimalPoint: $(this).attr("decimal-point"),
                        thousandSeparator: $(this).attr("thousand-separator"),
                        prefix: $(this).attr("prefix"),
                        suffix: $(this).attr("suffix"),
                    });
                    var text = ipsum.toString();

                    $(this).replaceWith(text);
                });
    }

    /**
     * Replace loremipsum tag with
     * lorem ipsum text
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _op3Ipsum = function(e, o) {
        $(o ? o.node : document)
            .find("op3ipsum")
                .each(function() {
                    var ipsum = new Op3Ipsum();
                    var method = $(this).attr("method") || "text";
                    var element = $(this).closest(".op3-element");
                    var response = ipsum[method]();

                    if (method === "icon") response = '<i class="op3-icon op3-icon-' + response + '"></i>';

                    $(this).replaceWith(response);
                });


        $(o ? o.node : document)
            .find("op3ipsumnew")
                .each(function() {
                    var element = $(this).closest(".op3-element");
                    var ipsum = new Op3Ipsum();
                    var method = $(this).attr("method") || "text";
                    var args = $(this).attr("arguments") || "";
                    try {
                        args = JSON.parse(args);
                    }
                    catch(e) {
                        args = [ args ] || [];
                    }
                    var response = ipsum[method].apply(ipsum, args);

                    $(this).replaceWith(response);
                });
    }

    /**
     * Replace steps tag with "Steps NR"
     * where NR is the number of the
     * current element item based
     * on the 'rel' relation
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _step = function(e, o) {
        $(o ? o.node : document)
            .find("steps")
                .each(function() {
                    var rel = $(this).attr("rel") || "";
                    var tag = $(this).attr("tag") || "";
                    var type = '[data-op3-element-type="' + rel + '"]';
                    var step = $(o.node).prevAll(type).length + 1;
                    var text = ""
                        + (tag ? "<" + tag + ">" : "")
                        + "Step " + step;
                        + (tag ? "</" + tag + ">" : "");

                    $(this).replaceWith(text);
                });
    }

    /**
     * Removing element form page can leave
     * floatbar below #op3-designer-element
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _detach = function(e, o) {
        var designerElement = OP3.Designer.$ui.parent.get(0);
        var designerTop = designerElement.offsetTop;
        var designerHeight = designerElement.offsetHeight;
        var floatbarElement = _floatbar.element;
        var floatbarTop = floatbarElement.offsetTop;
        var floatbarHeight = floatbarElement.offsetHeight;

        if (floatbarTop + floatbarHeight > designerTop + designerHeight)
            _floatbar.refresh();
    }

    // bind events
    $(function() {
        OP3.bind("load", _editor);
        OP3.bind("elementappendfirst", _numberIpsum);
        OP3.bind("elementappendfirst", _loremIpsum);
        OP3.bind("elementappendfirst", _personIpsum);
        OP3.bind("elementappendfirst", _op3Ipsum);
        OP3.bind("elementappendfirst", _step);
        OP3.bind("elementappendfirst", _editor);
        OP3.bind("elementstyle", _editor);
        OP3.bind("elementdetach elementremove", _detach);
    });

})(jQuery, window, document);
