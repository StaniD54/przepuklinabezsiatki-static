;(function() {
    window.addEventListener("DOMContentLoaded", function(e) {
        var options = {
            useNative: OP3.Settings && OP3.Settings.lazyLoadAssets && OP3.Settings.lazyLoadAssets === "native+js",
        };

        (new OptimizeLazyLoader(options))
            .start();
    });
})();
