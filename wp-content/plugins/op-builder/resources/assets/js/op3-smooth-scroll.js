;(function($, window, document) {
    $(function(){
        $('a[href^="#"]').on('click', function(event) {
            if (($(this).attr("data-op3-smooth-scroll") === "1")) {
                let hash = this.hash;

                $('html, body').animate({ scrollTop: $(hash).offset().top }, 1500, function()  {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });

                event.preventDefault();
            }
        });
    });
})(jQuery, window, document);