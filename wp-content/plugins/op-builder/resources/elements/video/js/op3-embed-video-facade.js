window.addEventListener("DOMContentLoaded", function(e) {
    var documentElement = document.documentElement,
        canUseWebp = documentElement.matches('[data-op3-support~="webp"]'),
        canUseAvif = documentElement.matches('[data-op3-support~="avif"]'),
        lazyLoad = typeof OP3 !== "undefined"
            && OP3.Settings
            && OP3.Settings.lazyLoadAssets
            && (OP3.Settings.lazyLoadAssets === "native+js" || OP3.Settings.lazyLoadAssets === "js");

    document.querySelectorAll("[data-embed-video-facade-src]").forEach(function(element) {
        // element.addEventListener("embedvideofacadeinit", function(e) {})
        // element.addEventListener("embedvideofacadedestroy", function(e) {})
        // element.addEventListener("embedvideofacadeposter", function(e) {})
        // element.addEventListener("embedvideofacadefetch", function(e) {})
        // element.addEventListener("embedvideofacadeconnect", function(e) {});

        // Get poster/interact element.
        var wrapper = element.closest(".op3-element"),
            posterElement = wrapper ? wrapper.querySelector(".op3-video-image-overlay") : null;

        // Instance EmbedVideoFacade.
        //
        // Note: if posterElement/interactElement is null, library
        // will default it to this.element (iframe).
        element._embedVideoFacade = new EmbedVideoFacade(element, {
            srcAttr: "data-embed-video-facade-src",
            lazyLoad: lazyLoad,
            posterElement: posterElement,
            interactElement: posterElement,
            canUseWebp: canUseWebp,
            canUseAvif: canUseAvif,
        });
    });
});
