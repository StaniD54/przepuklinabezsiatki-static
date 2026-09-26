/**
 * OptimizePress3 support:
 * add js|svg|webp|avif features to html's data-op3-support attribute.
 *
 * Source: https://avif.io/blog/tutorials/use-avif-in-css/
 * ...with a little tweak to reduce size and with js|svg feature.
 *
 * Note:
 * This small file (it should be minimized on production) is used on
 * every OPB frontend page. It is added as internal <script> inside
 * <head> DOM element.
 */
;(function() {
    var doc = document,
        docEl = doc.documentElement,
        attr = "data-op3-support",
        addSupport = function(feature) {
            docEl.setAttribute(attr, docEl.getAttribute(attr).replace(new RegExp("no-" + feature, "g"), feature));
        },
        loadImage = function(format, data) {
            var img = new Image();
            img.onload = function() {
                addSupport(format);
            };;
            img.src = "data:image/" + format + ";base64," + data;
        };

    addSupport("js");

    if (doc.createElementNS && doc.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)
        addSupport("svg");

    loadImage("webp", "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==");
    loadImage("avif", "AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA=");
})();
