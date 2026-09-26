;(function($, window, document) {

    "use strict";

    var apiKey;

    // SDK must be loaded both in LiveEditor and on the
    // frontend apiKey is in meta tag from OP Dashboard
    if (typeof OP3 === "object" && OP3.Meta)
        apiKey = OP3.Meta.googleMapsApiKey;
    else if (window.parent.OP3 && window.parent.OP3.Meta)
        apiKey = window.parent.OP3.Meta.googleMapsApiKey;

    // Loading Google Maps API asyncronously
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');
    script.async = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=OP3.GoogleMaps.init";
    ref.parentNode.insertBefore(script, ref);

})(jQuery, window, document);
