;(function($, window, document) {

    "use strict";

    // Loading Calendly script asyncronously
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');
    script.async = true;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    ref.parentNode.insertBefore(script, ref);

})(jQuery, window, document);
