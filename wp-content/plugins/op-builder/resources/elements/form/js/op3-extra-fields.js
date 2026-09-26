;(function($, window, document) {

    /**
     * Checkbox extra field saved as tag change event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _handleCheckboxExtraFieldChange = function(e) {
        var $target = $(e.target);
        var $form = $target.closest("form");
        var $input = $form.find('input[name="optin-tag"]');
        var value = $(e.target).val();
        var values = [];

        if ($input.val()) {
            values = $input.val().split(",");
        }

        // Remove
        if (!$target.is(":checked")) {
            values = values.filter(function(item) {
                return item != value;
            });
        // Add
        } else {
            values.push(value);
        }

        $input.val(values.join(","));
    }

    /**
     * Select extra field saved as tag before change event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _handleSelectBeforeChange = function(e) {
        var $target = $(e.target),
            $input = $target.closest("form").find('input[name="optin-tag"]'),
            value = $(e.target).val(),
            values = [];

        if ($input.val())
            values = $input.val().split(",");

        // Remove
        values = values.filter(function(item) {
            return item != value;
        });

        $input.val(values.join(","));
    }

    /**
     * Select extra field saved as tag change event handler
     *
     * @param {Object} e
     * @return {Void}
     */
    var _handleSelectChange = function(e) {
        var $target = $(e.target),
            value = $(e.target).val(),
            $input = $target.closest("form").find('input[name="optin-tag"]'),
            values = [];

        if ($input.val())
            values = $input.val().split(",");

        // Add
        values.push(value);
        $input.val(values.join(","));
    }

    // initialize
    $(function() {
        $('[data-op3-element-type$="form"] form')
            .each(function() {
                $(this)
                    .find('[data-op3-extra-field="1"][data-op3-extra-field-save-as="tag"]')
                    .each(function() {
                        var $extraField = $(this);

                        $extraField
                            .find('[data-op3-element-type="checkbox"] input')
                            .on("change", _handleCheckboxExtraFieldChange)

                        $extraField
                            .find('select')
                            .on('select2:selecting', _handleSelectBeforeChange)
                            .on('select2:select', _handleSelectChange);
                    });
        })
    });

})(jQuery, window, document);
