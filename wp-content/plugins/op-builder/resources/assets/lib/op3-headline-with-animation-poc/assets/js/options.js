;(function(Ranger, $, window, document, undefined) {
    /**
     * Options constructor.
     *
     * @param  {Document} context (optional)
     * @return {Void}
     */
    var Options = function(context) {
        if (!(this instanceof Options))
            throw 'Options: Options is a constructor.';
        if (typeof context !== 'undefined' && !(context instanceof Document))
            throw 'Options: context argument must be of Document type.';

        this._init(context || document);
    };

    /**
     * Options prototype.
     *
     * @type {Object}
     */
    Options.prototype = {
        /**
         * Reassign constructor.
         *
         * @type {Options}
         */
        constructor: Options,

        /**
         * Markup.
         *
         * @type {String}
         */
        MARKUP: ''
            + '<form class="options">'
            +     '<nav>'
            +         '<ul>'
            +             '<li><a class="disabled" href="#options">Options</a></li>'
            +             '<li><a class="disabled" href="#clear">Clear</a></li>'
            +         '</ul>'
            +     '</nav>'
            +     '<section style="display: none;">'
            +         '<label>'
            +             '<span>Animation type</span>'
            +             '<select name="type">'
            +                 '<option value="draw">Drawing Line</option>'
            +                 '<option value="word">Rotating Text</option>'
            +             '</select>'
            +         '</label>'
            +         '<label>'
            +             '<span>Style</span>'
            +             '<select name="draw-style">'
            +                 '<option value="">None</option>'
            +                 '<option value="underline" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;M 5,67 C 74.059482,57.792517 151.92576,56.657276 202.90326,57.881481 241.61143,59.087749 245.73158,60.41179 251,67&quot; /&gt;&lt;/svg&gt;">Underline</option>'
            +                 '<option value="underline-2x" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;m 5.2160231,56.380198 c 15.4012059,-1.8984 69.6336469,-3.49706 89.5289739,-3.49706 59.181023,0 125.489053,2.048082 156.038983,3.496862&quot; /&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;m 18.681442,66.500489 c 27.823161,-3.04744 65.543489,-3.0974 83.822948,-2.99748 23.48053,0.0999 101.99193,1.898331 134.81417,3.496991&quot; /&gt;&lt;/svg&gt;">Underline 2x</option>'
            +                 '<option value="underline-zigzag" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;M 5,58.47215 C 29.858941,56.50418 81.139963,53.74903 105.84764,53.88023 167.31426,54.14262 204.4084,54.01128 251,58.472 194.92872,60.11197 91.325574,60.17772 35.25429,65.68803 76.904362,63.78566 162.97783,65.49123 204.17408,67&quot; /&gt;&lt;/svg&gt;">Underline Zigzag</option>'
            +                 '<option value="underline-curly" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;m 5,67 c 8.41292,-4.78912 16.284658,-10.88437 25.091166,-10.88437 7.674943,0 8.314522,10.34015 14.759507,10.34015 11.266426,0 17.760609,-9.79592 26.567116,-9.79592 8.41292,0 10.725244,9.2517 18.695378,9.2517 10.479253,0 16.137063,-9.79593 24.599193,-9.79593 10.87283,0 8.8557,10.34015 17.7114,10.34015 9.24929,0 17.9574,-8.70748 23.61522,-8.70748 10.03645,0 9.00329,7.61904 18.69537,7.61904 11.26643,0 18.2526,-10.34013 27.0591,-9.25171 8.70811,0.76192 6.19899,9.63267 19.18737,9.25171 C 230.42288,64.32446 234.55842,63.27619 251,57.748&quot; /&gt;&lt;/svg&gt;">Underline Curly</option>'
            +                 '<option value="strikethrough" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;M 5,40.529258 C 93.059352,39.477197 195.44239,33.230644 251,40.529&quot; /&gt;&lt;/svg&gt;">Strikethrough</option>'
            +                 '<option value="diagonal" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;M 8,66 C 84.364487,37.250598 157.13649,17.431781 251,8&quot; /&gt;&lt;/svg&gt;">Diagonal</option>'
            +                 '<option value="diagonal-reverse" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;m 5,15 c 102.92832,9.467013 200.0062,34.418403 237,52&quot; /&gt;&lt;/svg&gt;">Diagonal Reverse</option>'
            +                 '<option value="crossout" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;M 8,66 C 84.364487,37.250598 157.13649,17.431781 251,8&quot; /&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;m 5,15 c 102.92832,9.467013 200.0062,34.418403 237,52&quot; /&gt;&lt;/svg&gt;">Crossout</option>'
            +                 '<option value="circle" data-markup="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;256&quot; height=&quot;72&quot; viewBox=&quot;0 0 256 72&quot; preserveAspectRatio=&quot;none&quot;&gt;&lt;path fill=&quot;none&quot; stroke=&quot;red&quot; stroke-width=&quot;5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; d=&quot;M 159.73049,14.123407 C 114.54998,-0.1273836 60.715537,6.7141757 40.752786,12.051644 13.347127,19.364398 4.5735796,26.172822 5.0664872,35.839107 5.7565574,49.455957 3.970682,63.361635 61.552692,65.842099 95.240523,67.171797 188.28328,66.159688 229.31633,62.592019 261.42789,60.641933 253.57386,28.209307 233.05152,17.515559 192.45278,-2.8550208 68.748978,11.59889 42.575591,20.886929&quot; /&gt;&lt;/svg&gt;">Circle</option>'
            +             '</select>'
            +         '</label>'
            +         '<label>'
            +             '<span>Color</span>'
            +             '<input name="draw-color" type="text" value="" />'
            +         '</label>'
            +         '<label>'
            +             '<span>Thickness</span>'
            +             '<input name="draw-thickness" type="number" min="1" max="10" value="" />'
            +         '</label>'
            +         '<label class="toggle-switch">'
            +             '<input name="draw-rounded-edges" type="checkbox" value="" />'
            +             '<div class="toggle-switch-wrapper">'
            +                 '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
            +                     '<span class="toggle-switch-handle"></span>'
            +                 '</div>'
            +             '</div>'
            +             '<span>Rounded Edges</span>'
            +         '</label>'
            +         '<label class="toggle-switch">'
            +             '<input name="draw-bring-to-front" type="checkbox" value="" />'
            +             '<div class="toggle-switch-wrapper">'
            +                 '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
            +                     '<span class="toggle-switch-handle"></span>'
            +                 '</div>'
            +             '</div>'
            +             '<span>Bring to Front</span>'
            +         '</label>'
            +         '<label>'
            +             '<span>Style</span>'
            +             '<select name="word-style">'
            +                 '<option value="">None</option>'
            +                 '<option value="word-clip">Clip</option>'
            +                 '<option value="word-flip">Flip</option>'
            +                 '<option value="word-zoom">Zoom</option>'
            +                 '<option value="word-slide">Slide</option>'
            +                 '<option value="word-drop">Drop</option>'
            +             '</select>'
            +         '</label>'
            +         '<label>'
            +             '<span>Words</span>'
            +             '<textarea name="word-words"></textarea>'
            +         '</label>'
            +         '<label>'
            +             '<span>Animation Delay [ms]</span>'
            +             '<input name="delay" type="number" min="100" max="10000" value="" />'
            +         '</label>'
            +         '<label>'
            +             '<span>Transition Duration [ms]</span>'
            +             '<input name="transition-duration" type="number" min="100" max="10000" value="" />'
            +         '</label>'
            +         '<label>'
            +             '<span>Word Change Delay [ms]</span>'
            +             '<input name="word-delay" type="number" min="100" max="10000" value="" />'
            +         '</label>'
            +         '<label class="toggle-switch">'
            +             '<input name="loop" type="checkbox" value="" />'
            +             '<div class="toggle-switch-wrapper">'
            +                 '<div class="toggle-switch-content" data-toggle-switch-value-0="Off" data-toggle-switch-value-1="On">'
            +                     '<span class="toggle-switch-handle"></span>'
            +                 '</div>'
            +             '</div>'
            +             '<span>Loop</span>'
            +         '</label>'
            +         '<label>'
            +             '<span>Loop Delay [ms]</span>'
            +             '<input name="loop-delay" type="number" min="1000" max="60000" value="" />'
            +         '</label>'
            +         '<p>'
            +             '<a class="button" href="#animate">Animate</a>'
            +         '</p>'
            +     '</section>'
            +     '<button type="submit" disabled style="display: none" aria-hidden="true"></button>'
            + '</form>',

        /**
         * Constructor.
         *
         * @param  {Document} context
         * @return {Void}
         */
        _init: function(context) {
            this._document = context;

            this._ranger = new Ranger('span', 'ranger', '[contenteditable]', context);

            var $element = $(this.MARKUP)
                .appendTo(this.document.body);

            this._$ui = {
                wrapper: $(null),
                iframe: $(null),
                parent: $element,
                nav: {
                    parent: $element.find('nav'),
                    options: $element.find('nav a[href="#options"]'),
                    clear: $element.find('nav a[href="#clear"]'),
                },
                section: {
                    parent: $element.find('section'),
                    type: $element.find('section [name="type"]'),
                    delay: $element.find('section [name="delay"]'),
                    transitionDuration: $element.find('section [name="transition-duration"]'),
                    loop: $element.find('section [name="loop"]'),
                    loopDelay: $element.find('section [name="loop-delay"]'),
                    drawStyle: $element.find('section [name="draw-style"]'),
                    drawBringToFront: $element.find('section [name="draw-bring-to-front"]'),
                    drawColor: $element.find('section [name="draw-color"]'),
                    drawThickness: $element.find('section [name="draw-thickness"]'),
                    drawRoundedEdges: $element.find('section [name="draw-rounded-edges"]'),
                    wordStyle: $element.find('section [name="word-style"]'),
                    wordWords: $element.find('section [name="word-words"]'),
                    wordDelay: $element.find('section [name="word-delay"]'),
                    animate: $element.find('section a[href="#animate"]'),
                },
            };

            this._defaultOptions = {};

            if (context.readyState === 'complete')
                $(this.window).on('load.options', this._handleWindowLoad.bind(this));
            else
                this._handleWindowLoad();
        },

        /**
         * Destructor.
         *
         * @return {Void}
         */
        destroy: function() {
            $(null)
                .add(this.window)
                .add(this.document)
                //.add(this.element)
                .off('.options');

            this._$ui.element.remove();
            this.ranger.destroy();

            delete this._defaultOptions;
            delete this._$ui;
            delete this._ranger;
            delete this._document;
        },

        /**
         * Window property getter.
         *
         * @return {Window}
         */
        get window() {
            return this.document.defaultView;
        },

        /**
         * Document (context) property getter.
         *
         * @return {Document}
         */
        get document() {
            return this._document;
        },

        /**
         * Element property getter.
         *
         * @return {Node}
         */
        get element() {
            return this._$ui.parent.get(0);
        },

        /**
         * Ranger property getter.
         *
         * @return {Ranger}
         */
        get ranger() {
            return this._ranger;
        },

        /**
         * Wrap selection with ranger wrapper element.
         *
         * @param  {String} type    animation type
         * @param  {Object} options (optional) jQuery addon options
         * @param  {Object} data    (optional) only for draw type
         * @return {Void}
         */
        _wrap: function(type, options, data) {
            this.ranger.wrap();
            this._wrapperSelect();

            this._$ui.wrapper
                .attr('contenteditable', 'false')
                .attr('spellcheck', 'false');

            if (type === 'draw' && data)
                this._$ui.wrapper
                    .attr('data-rich-text-animation-draw', data.id)
                    .append($(data.markup).addClass('ranger-draw'));

            this._wrapperJQInit(type, options);
            this._wrapperSelect();
        },

        /**
         * Unwrap ranger wrapper element in selection.
         *
         * @return {Void}
         */
        _unwrap: function() {
            this._wrapperSelect();
            if (this._$ui.wrapper.is('[data-rich-text-animation]')) {
                this._wrapperJQExec('destroy');

                // Only for draw type.
                this._$ui.wrapper
                    .find('svg')
                    .remove();
            }

            this.ranger.unwrap();

            this._$ui.wrapper = $(null);
        },

        /**
         * Uppercase first letter in string.
         *
         * @param  {String} str
         * @return {String}
         */
        _uppercaseFirst: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        /**
         * Convert string to camel case.
         *
         * @param  {String} str
         * @return {String}
         */
        _toCamelCase: function(str) {
            return str.replace(/[-_][a-z]/g, function(match) {
                return match.charAt(1).toUpperCase();
            });
        },

        /**
         * Convert string to snake case.
         *
         * @param  {String} str
         * @param  {String} delimiter (optional)
         * @return {String}
         */
        _toSnakeCase: function(str, delimiter) {
            if (typeof delimiter === 'undefined')
                delimiter = '_';

            return str.replace(/[A-Z]/g, function(match) {
                return delimiter + match.toLowerCase();
            });
        },

        /**
         * Select ranger wrapper.
         *
         * @return {Void}
         */
        _wrapperSelect: function() {
            this._$ui.wrapper = $(this.ranger.select());
        },

        /**
         * Initialize jQuery rich-text-animation addon
         * on wrapper.
         *
         * @param  {String} method
         * @param  {Object} options (optional)
         * @return {Void}
         */
        _wrapperJQInit: function(type, options) {
            if (!this._$ui.wrapper.length)
                return;

            var method = 'richTextAnimation' + this._uppercaseFirst(this._toCamelCase(type));
            this._$ui.wrapper
                [method]($.extend({}, this._defaultOptions, options || {}))
                [method]('observe');
        },

        /**
         * Execute jQuery rich-text-animation addon method
         * on wrapper.
         *
         * @param  {String} method
         * @return {Mixed}
         */
        _wrapperJQExec: function(method) {
            if (!this._$ui.wrapper.length)
                return undefined;

            var lib = this._$ui.wrapper.data('jquery-rich-text-animation'),
                args = Array.prototype.slice.call(arguments, 1),
                result =  lib[method].apply(lib, args);

            if (method === 'getOption' && [ 'words', 'loop' ].indexOf(args[0]) === -1)
                this._defaultOptions[args[0]] = result;

            return result;
        },

        /**
         * Refresh UI.
         *
         * @return {Void}
         */
        refresh: function() {
            var isCollapsed = this.ranger.isCollapsed(),
                canToggle = !isCollapsed && this.ranger.canToggle(),
                canWrap = !isCollapsed && this.ranger.canWrap();
                canUnwrap = !isCollapsed && this.ranger.canUnwrap(),
                type = null;

            this._$ui.nav.options.addClass('disabled');
            if (canToggle)
                this._$ui.nav.options.removeClass('disabled');

            this._$ui.nav.clear.addClass('disabled');
            if (canUnwrap)
                this._$ui.nav.clear.removeClass('disabled');

            if (!canToggle && !canUnwrap && this._$ui.section.parent.css('display') !== 'none')
                this._$ui.section.parent.css('display', 'none');

            //this._$ui.section.type.val('');
            this._$ui.section.delay.val('');
            this._$ui.section.transitionDuration.val('');
            this._$ui.section.loop.prop('checked', false);
            this._$ui.section.loopDelay.val('');

            this._$ui.section.drawStyle.val('');
            this._$ui.section.drawBringToFront.prop('checked', false);
            this._$ui.section.drawColor.val('')
            this._$ui.section.drawThickness.val('');
            this._$ui.section.drawRoundedEdges.prop('checked', false);
            this._$ui.section.wordStyle.val('');
            this._$ui.section.wordWords.val('');
            this._$ui.section.wordDelay.val('');

            if (this._$ui.wrapper.length) {
                type = this._$ui.wrapper.attr('data-rich-text-animation').split('-')[0];
                this._$ui.section.type.val(type);
            }

            if (type) {
                this._$ui.section.delay.val(this._wrapperJQExec('getOption', 'delay'))
                this._$ui.section.transitionDuration.val(this._wrapperJQExec('getOption', 'transitionDuration'))
                this._$ui.section.loop.prop('checked', this._wrapperJQExec('getOption', 'loop'));
                this._$ui.section.loopDelay.val(this._wrapperJQExec('getOption', 'loopDelay'))
            }

            if (type === 'draw') {
                this._$ui.section.drawStyle.val(this._$ui.wrapper.attr('data-rich-text-animation-draw'));
                this._$ui.section.drawBringToFront.prop('checked', this._wrapperJQExec('getOption', 'bringToFront'));
                this._$ui.section.drawColor.val(this._wrapperJQExec('getOption', 'color'))
                this._$ui.section.drawThickness.val(this._wrapperJQExec('getOption', 'thickness'));
                this._$ui.section.drawRoundedEdges.prop('checked', this._wrapperJQExec('getOption', 'roundedEdges'));
            }
            else if (type === 'word') {
                this._$ui.section.wordStyle.val(this._$ui.wrapper.attr('data-rich-text-animation'));
                this._$ui.section.wordWords.val(this._wrapperJQExec('getOption', 'words').join('\n'));
                this._$ui.section.wordDelay.val(this._wrapperJQExec('getOption', 'word-delay'));
            }

            this._$ui.section.drawStyle
                .closest('label,p')
                .css('display', this._$ui.section.type.val() === 'draw' ? '' : 'none');
            $(null)
                .add(this._$ui.section.drawBringToFront.closest('label,p'))
                .add(this._$ui.section.drawColor.closest('label,p'))
                .add(this._$ui.section.drawThickness.closest('label,p'))
                .add(this._$ui.section.drawRoundedEdges.closest('label,p'))
                .css('display', this._$ui.section.type.val() === 'draw' && this._$ui.section.drawStyle.val() ? '' : 'none');
            this._$ui.section.wordStyle
                .closest('label,p')
                .css('display', this._$ui.section.type.val() === 'word' ? '' : 'none');
            $(null)
                .add(this._$ui.section.wordWords.closest('label,p'))
                .add(this._$ui.section.wordDelay.closest('label,p'))
                .css('display', this._$ui.section.type.val() === 'word' && this._$ui.section.wordStyle.val() ? '' : 'none');
            $(null)
                .add(this._$ui.section.delay.closest('label,p'))
                .add(this._$ui.section.transitionDuration.closest('label,p'))
                .add(this._$ui.section.loop.closest('label,p'))
                .css('display', this._$ui.section.drawStyle.val() || this._$ui.section.wordStyle.val() ? '' : 'none');
            this._$ui.section.loopDelay
                .closest('label,p')
                .css('display', (this._$ui.section.drawStyle.val() || this._$ui.section.wordStyle.val()) && this._$ui.section.loop.prop('checked') ? '' : 'none');
            this._$ui.section.animate
                .closest('label,p')
                .css('display', (this._$ui.section.drawStyle.val() || this._$ui.section.wordStyle.val()) && !this._$ui.section.loop.prop('checked') ? '' : 'none');

            this._$ui.iframe.css('height', this._$ui.iframe.get(0).contentDocument.body.offsetHeight + 'px');
        },

        /**
         * Window load event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleWindowLoad: function(e) {
            this._$ui.iframe = $('<iframe />')
                .on('load', this._handleIframeLoad.bind(this))
                .css('visibility', 'hidden')
                //.attr('src', 'about:blank')
                .insertBefore(this._$ui.parent);
        },

        /**
         * Iframe load event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleIframeLoad: function(e) {
            var sheets = Array.prototype.slice.apply(this.document.styleSheets),
                loaded = 0;
            sheets.forEach(function(sheet) {
                var style = sheet.ownerNode.cloneNode();
                style.onload = function() {
                    if (++loaded == sheets.length)
                        this._handleIframeLoaded(e);
                }.bind(this);

                e.target.contentDocument.head.appendChild(style);
            }.bind(this));

            this._$ui.parent
                .appendTo(e.target.contentDocument.body);

            $(this.document)
                .on('selectionchange.options', this._handleContextSelectionChange.bind(this))
                .on('mousedown.options', this._handleContextMouseDown.bind(this))
                .on('click.options', '[contenteditable] .ranger', this._handleWrapperClick.bind(this));
            this._$ui.parent
                .on('change.options', this._handleFormChange.bind(this))
                .on('click.options', this._handleFormClick.bind(this));

            $(e.target.contentDocument.documentElement)
                .css('height', '0px');
            $(e.target.contentDocument.body)
                .css('overflow', 'hidden');
        },

        _handleIframeLoaded: function(e) {
            this._$ui.iframe = $(e.target)
                .css('visibility', '');

            this.refresh();
        },

        /**
         * Context (document) selectionchange event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleContextSelectionChange: function(e) {
            this.refresh();
        },

        /**
         * Context (document) mousedown event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleContextMouseDown: function(e) {
            this._$ui.section.parent.css('display', 'none');

            this.refresh();
        },

        /**
         * Ranger wrapper element click event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleWrapperClick: function(e) {
            if (this.ranger.canSelect() && !this.ranger.isSelected())
                this.ranger.select();
        },

        /**
         * Form change event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFormChange: function(e) {
            var target = e.target,
                $target = $(target),
                action = $target.attr('name'),
                value = $target.is(':checkbox') ? $target.is(':checked') : $target.val();

            if (action === 'type')
                this._unwrap();
            else if (action === 'draw-style') {
                this._unwrap();

                if (value) {
                    var $option = $target.find('option[value="' + value + '"]'),
                        markup = ($option.length ? $option.attr('data-markup') : '') || null;

                    this._wrap('draw', {}, {
                        id: value,
                        markup: markup,
                    });
                    this._wrapperJQExec('animate');
                }
            }
            else if (action === 'delay')
                this._wrapperJQExec('setOption', 'delay', value);
            else if (action === 'transition-duration')
                this._wrapperJQExec('setOption', 'transitionDuration', value);
            else if (action === 'loop') {
                this._wrapperJQExec('setOption', 'loop', value);

                if (value)
                    this._wrapperJQExec('animate');
            }
            else if (action === 'loop-delay')
                this._wrapperJQExec('setOption', 'loopDelay', value);
            else if (action === 'draw-bring-to-front')
                this._wrapperJQExec('setOption', 'bringToFront', value);
            else if (action === 'draw-color')
                this._wrapperJQExec('setOption', 'color', value);
            else if (action === 'draw-thickness')
                this._wrapperJQExec('setOption', 'thickness', value);
            else if (action === 'draw-rounded-edges')
                this._wrapperJQExec('setOption', 'roundedEdges', value);
            else if (action === 'word-style') {
                this._defaultOptions.words = this._wrapperJQExec('getOption', 'words');

                this._unwrap();
                if (value)
                    this._wrap(value);

                delete this._defaultOptions.words;
            }
            else if (action === 'word-words') {
                if (value.split('\n').length) {
                    var loop = this._wrapperJQExec('getOption', 'loop');

                    this._wrapperJQExec('setOption', 'words', value.split('\n'));
                    this._wrapperSelect();

                    if (loop)
                        this._wrapperJQExec('animate');
                }
            }
            else if (action === 'word-delay')
                this._wrapperJQExec('setOption', 'wordDelay', value);

            this.refresh();
        },

        /**
         * Form click event handler.
         *
         * @param  {Event} e
         * @return {Void}
         */
        _handleFormClick: function(e) {
            var $target = $(e.target);
            if (!$target.is('a[href]'))
                return;

            var action = $target.attr('href');
            if (action === '#options') {
                if (this._$ui.section.parent.css('display') === 'none') {
                    this._wrapperSelect();

                    this._$ui.section.parent.css('display', '');
                }
                else
                    this._$ui.section.parent.css('display', 'none');
            }
            else if (action === '#clear') {
                this._unwrap();

                this._$ui.section.parent.css('display', 'none');
            }
            else if (action === '#animate')
                this._wrapperJQExec('animate');

            this.refresh();

            e.preventDefault();
        },
    };

    // Globalize Options
    window.Options = Options;
})(Ranger, jQuery, window, document, undefined);
