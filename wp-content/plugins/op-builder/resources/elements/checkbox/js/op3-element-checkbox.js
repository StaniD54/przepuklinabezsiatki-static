;(function($, window, document) {

    "use strict";

    $(function() {
        $('[data-op3-element-type="checkbox"] label')
            .on("click", function(e) {
                $(this).closest(".op3-element-checkbox-checkmark").focus();
            });

        $('[data-op3-element-type="checkbox"] .op3-element-checkbox-checkmark')
            .on("onkeydown", function(e) {
                if (event.keyCode === 32)
                    return false;
            })
            .on("onkeyup", function(e) {
                if (event.keyCode === 32)
                    $(this).closest("label").click();
            });
    });

})(jQuery, window, document);
