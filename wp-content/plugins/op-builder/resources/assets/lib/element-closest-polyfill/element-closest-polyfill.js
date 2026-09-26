if (!Element.prototype.closest)
    Element.prototype.closest = function(selectors) {
        var element = this;

        do {
            if (Element.prototype.matches.call(element, selectors))
                return element;

            element = element.parentElement || element.parentNode;
        }
        while (element !== null && element.nodeType === Node.ELEMENT_NODE);

        return null;
    };
