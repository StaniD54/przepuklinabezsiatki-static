jQuery(function($) {
    $(".wp-admin").on("click", ".ops-notice.is-dismissible .notice-dismiss", function(e) {
        var $notice = $(this).closest(".ops-notice");
        var dismissUrl = $notice.data("dismiss-url");
        var id = $notice.data('notice-id');

        $.ajax({
            method: 'get',
            url: dismissUrl,
            success: function(data) {},
            error: function(err) { console.error(err); }
        });

        e.preventDefault();
    });
});
