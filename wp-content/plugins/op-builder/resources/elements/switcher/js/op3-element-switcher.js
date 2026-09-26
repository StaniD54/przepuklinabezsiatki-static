
;(function($, window, document) {

    "use strict";

    /**
     * Slider click event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _sliderClickHandler = function(e) {
        var $target = $(e.currentTarget);

        $target
            .toggleClass("active")
            .closest('[data-op3-element-type="switcher"]')
            .find('[data-op3-element-type="switchercontentitem"]')
            .toggleClass("active");
    }

    $(function() {
        $('[data-op3-element-type="switcher"] .slider')
            .on("click", _sliderClickHandler);
    });

})(jQuery, window, document);
