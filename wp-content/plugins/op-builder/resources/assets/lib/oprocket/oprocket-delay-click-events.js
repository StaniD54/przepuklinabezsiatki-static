/**
 * Delay click events until OPRocket load all scripts...
 */
;(function(window, document) {
    var delayedClickTargets = {},
        dispatchEvent = function(target, eventName) {
            var bubbles = true,
                cancelable = true,
                event;
            if (typeof Event !== "function") {
                event = document.createEvent("Event");
                event.initEvent(eventName, bubbles, cancelable);
            }
            else
                event = new Event(eventName, {
                    bubbles: bubbles,
                    cancelable: cancelable,
                });

            target.dispatchEvent(event);
        },
        handleOPRocketUserInteraction = function(e) {
            window.removeEventListener("oprocket-userInteraction", handleOPRocketUserInteraction);

            window.addEventListener("oprocket-allScriptsLoaded", handleOPRocketAllScriptsLoaded);
            document.addEventListener("click", handleClick);
            document.addEventListener("dblclick", handleClick);
        },
        handleOPRocketAllScriptsLoaded = function(e) {
            window.removeEventListener("oprocket-allScriptsLoaded", handleOPRocketAllScriptsLoaded);

            document.removeEventListener("dblclick", handleClick);
            document.removeEventListener("click", handleClick);

            for (var eventName in delayedClickTargets) {
                delayedClickTargets[eventName].forEach(function(target) {
                    dispatchEvent(target, eventName);
                });
            };
        },
        handleClick = function(e) {
            e.preventDefault();

            var type = e.type;
            if (!(type in delayedClickTargets))
                delayedClickTargets[type] = [];

            delayedClickTargets[type].push(e.target);
        };

    window.addEventListener("oprocket-userInteraction", handleOPRocketUserInteraction);
})(window, document);
