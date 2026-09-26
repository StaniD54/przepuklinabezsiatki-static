/**
 * OptimizePress3 rich text animation manipulation
 *
 */
;(function($, window, document) {

    "use strict";

    /**
     * Dynamically changed element markup is not written in
     * OP3.History and may cause some issues. While undo-ing
     * or redo-ing the history handler will add/remove
     * speciffic content to speciffic index. Those indexes
     * stored in history object are not the valid indexes,
     * since element markup is changed...
     *
     * There is a nice little feature in rich text animation
     * library called USE_DYNAMIC_DATA_ATTR, which is TRUE
     * by default. By setting this to FALSE no element
     * content will change once the animation is initialized
     * (things like status data attribute), and the history
     * will work as it should...
     *
     * @type {Boolean}
     */
    RichTextAnimationBase.prototype.USE_DYNAMIC_DATA_ATTR = false;

    /**
     * Option transitionDuration is null by default, which
     * means that the value will be determined from
     * element's css. Unfortunately in default opb element
     * we have defined rule
     *
     * .op3-element * { transition: all 0s ease; }
     *
     * ...which have stronger selector than the rule in
     * animation's base.css (and therefore the default
     * option is always zero). So, to "fix" this, let's use
     * real value for default transition duration, instead
     * of letting js get it from css...
     *
     * @type {Number}
     */
    RichTextAnimationBase.prototype.DEFAULT_OPTIONS.transitionDuration = 600;

    /**
     * Let's animate element by changing the stylesheet
     * instead of element markup (see above).
     *
     * @type {Node}
     */
    RichTextAnimationBase.prototype.DEFAULT_OPTIONS.stylesheet = $("<style />")
        .attr("class", "op3-designer-stylesheet-rich-text-animation")
        .attr("media", "all")
        .appendTo("head")
        .get(0);

    /**
     * Get unique id:
     * storing original method so we can decorate it
     * (see below).
     *
     * @return {String}
     */
    RichTextAnimationBase.prototype._uniqueId_original = RichTextAnimationBase.prototype._uniqueId;

    /**
     * Get unique id (decorated method):
     * use original result (number) as convert it to 36
     * radix string with leading zeros. With static length
     * ids we are making sure that the indexes in history
     * are valid ones.
     *
     * @return {String}
     */
    RichTextAnimationBase.prototype._uniqueId = function() {
        var result = this._uniqueId_original();
        result = result.toString(36);
        result = ("000000" + result).slice(-6);

        return result;
    }

    /**
     * Execute jQuery richTextAnimation.
     *
     * Note: any additional argument after method will
     * be passed to richTextAnimation as well.
     *
     * @param  {Mixed}  node   DOM node, jQuery element or string selector
     * @param  {String} method (optional) a method to execute
     * @return {Void}
     */
    var _execRichTextAnimation = function(node, method)  {
        var args = Array.prototype.slice.call(arguments, 2);

        $(node)
            .each(function() {
                var $this = $(this),
                    attr = $this.attr("data-rich-text-animation"),
                    ccAttr = attr.replace(/-[a-z]/, function(match) {
                        return match.charAt(1).toUpperCase();
                    }),
                    ucAttr = ccAttr.charAt(0).toUpperCase() + ccAttr.slice(1),
                    library = "richTextAnimation" + ucAttr;

                if (typeof method === "string")
                    $this[library].apply(this, [ method ].concat(args));
                else if (!method)
                    $this[library]();
                else
                    throw "Can not execute richTextAnimation: unknown method";
            });
    };

    /**
     * Refresh richTextAnimation word size.
     *
     * Any element property change that changes DOM element size
     * needs size re-calculation on rich text animation library,
     * and since this size is stored in jQuery.data all we
     * need is delete the data and let library re-calculates
     * the size again.
     *
     * @param  {Mixed} node DOM node, jQuery element, string selector, op3query object, op3element object
     * @return {Void}
     */
    var _refreshSizeRichTextAnimation = function(node)  {
        $(node)
            .css("width", "")
                .find("[data-rich-text-animation-word]")
                .removeData("rich-text-animation-word-size");
    };

    /**
     * Mutation observer handler:
     * We're gonna clean (destroy) each rich text animation
     * instance when span wrapper is removed from dom using
     * mutation observer.
     *
     * @param  {Array} e
     * @return {Void}
     */
    var _handleMutation = function(e) {
        e.forEach(function(record) {
            (record.removedNodes || []).forEach(function(node) {
                $(node)
                    .find('.op3-text-animation')
                    .add($(node).filter('.op3-text-animation'))
                    .filter(function() {
                        return !!$(this).data('jquery-rich-text-animation');
                    })
                    .each(function() {
                        _execRichTextAnimation(this, "destroy");
                    });
            });

            (record.addedNodes || []).forEach(function(node) {
                $(node)
                    .find('.op3-text-animation')
                    .add($(node).filter('.op3-text-animation'))
                    .filter(function() {
                        return !$(this).data('jquery-rich-text-animation');
                    })
                    .each(function() {
                        _execRichTextAnimation(this, "observe");
                    });
            });
        });
    }

    /*
     * Rich text animation autoinit is disabled on OP3 (be
     * cause we want animation to start on OP3 ready event,
     * not on designer document load), so we're gonna start
     * it manually here...
     */
    OP3.bind("ready", function(e, o) {
        _execRichTextAnimation("[data-rich-text-animation]", "observe");

        // Observe designer element's subtree.
        var observer = new MutationObserver(_handleMutation);
        observer.observe(document.getElementById('op3-designer-element'), {
            childList: true,
            subtree: true
        });
    });

    /*
     * Refresh richTextAnimation word size.
     */
    OP3.bind("elementchange::headline::tag elementchange::headline::fontFamily elementchange::headline::fontWeight elementchange::headline::fontSize elementchange::headline::lineHeight elementchange::headline::letterSpacing elementchange::headline::fontStyle elementchange::headline::textTransform elementchange::headline::textDecoration", function(e, o) {
        _refreshSizeRichTextAnimation($(o.node).find("[data-rich-text-animation]"))
    });

    /* --- */

})(jQuery, window, document);
