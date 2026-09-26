/**
 * OptimizePress3 screenshot object
 *
 * Create any op3 page screenshot by creating temporary
 * non-visible iframe with page frontend content. The
 * screenshot is taken using dom-to-image.js. The
 * library is not in dependencies list be cause it is
 * appended to iframe (which means that this class
 * doesn't use this library, but the frontend page
 * does).
 *
 * The library downloads resources from frontend page
 * and creates svg image by using foreignObject tag.
 * The image is later converted to PNG, but can be
 * converted to any other image type. It can also be
 * resized and cropped...
 *
 * Usage:
 * >> (new OP3Screenshot())
 * >>     .page('/page-url')
 * >>     .then((img) => {
 * >>         console.log(img);
 * >>     })
 * >>     .catch((e) => {
 * >>         throw e;
 * >>     });
 *
 * Dependencies:
 *     - jQuery.js
 */
class OP3Screenshot {
    /**
     * Constructor
     *
     * @param  {Object}        options (optional)
     * @return {OP3Screenshot}
     */
    constructor(options) {
        this._options = this.$.extend(true, {}, this._defaults, options || {});

        // remove invalid options
        for (let prop in this._options) {
            if (!(prop in this._defaults))
                delete this._options[prop];
        }

        // fix relative urls
        this._options.assetsUrl = new URL(this._options.assetsUrl, this.window.location.origin + this.window.location.pathname).href;
        this._options.proxyUrl = new URL(this._options.proxyUrl, this.window.location.origin + this.window.location.pathname).href;
    }

    /**
     * Destructor
     *
     * @return {Void}
     */
    destroy() {
        // pass
    }

    /**
     * String representing the object
     *
     * @return {String}
     */
    toString() {
        return '[object OP3Screenshot]';
    }

    /**
     * Is debug mode
     *
     * @return {Boolean}
     */
    isDebugMode() {
        return !!(this.window && this.window.top && this.window.top.hasOwnProperty('OP3_SCREENSHOT_DEBUG') && this.window.top.OP3_SCREENSHOT_DEBUG);
    }

    /**
     * Get option by key
     *
     * @param  {String} key
     * @return {Mixed}
     */
    option(key) {
        return this._options[key];
    }

    /**
     * Window property getter
     *
     * @return {Window}
     */
    get window() {
        return window;
    }

    /**
     * Document property getter
     *
     * @return {HTMLDocument}
     */
    get document() {
        return window.document;
    }

    /**
     * jQuery property getter
     *
     * @return {Function}
     */
    get jQuery() {
        return window.jQuery;
    }

    /**
     * jQuery proxy
     *
     * @return {Function}
     */
    get $() {
        return this.jQuery;
    }

    /**
     * Create placeholder image
     *
     * @param  {Number}  width
     * @param  {String}  contentType
     * @return {Promise}
     */
    placeholder(width, contentType) {
        return this._loadImage(this._placeholderURL())
            .then(((img) => {
                img.width = width;
                img.height = width;

                return this._imageConvert(img, contentType);
            }).bind(this));
    }

    /**
     * Get page screenshot
     * (body)
     *
     * @param  {String} url
     * @return {Promise}
     */
    page(url) {
        return this._screenshot('page', url);
    }

    /**
     * Get page thumbnail
     * (body)
     *
     * @param  {String} url
     * @return {Promise}
     */
    thumbPage(url) {
        let width = this.option('thumbPageWidth'),
            height = this.option('thumbPageHeight'),
            margin = this.option('thumbPageMargin');

        return this.page(url)
            .then(((img) => {
                let w = width ? width - 2*margin : null,
                    h = height ? height - 2*margin : null;

                return this._imageResize(img, w, h);
            }).bind(this))
            .then(((img) => {
                let w = img.width + 2*margin,
                    h = img.height + 2*margin;

                return this._imageCanvasResize(img, w, h, null, null);
            }).bind(this));
    }

    /**
     * Get page screenshot (body)
     * with width and content-type
     * customization
     *
     * @param  {String}  url
     * @param  {Number}  width
     * @param  {String}  contentType
     * @return {Promise}
     */
    customPage(url, width, contentType) {
        return this.page(url)
            .then(((img) => {
                return this._imageResize(img, Math.min(width, img.width), null);
            }).bind(this))
            .then(((img) => {
                return this._imageConvert(img, contentType);
            }).bind(this));
    }

    /**
     * Get template screenshot
     * (#op3-designer-element)
     *
     * @param  {String} url
     * @return {Promise}
     */
    template(url) {
        return this._screenshot('template', url);
    }

    /**
     * Get template thumbnail
     * (#op3-designer-element)
     *
     * @param  {String} url
     * @return {Promise}
     */
    thumbTemplate(url) {
        let width = this.option('thumbTemplateWidth'),
            height = this.option('thumbTemplateHeight'),
            margin = this.option('thumbTemplateMargin');

        return this.template(url)
            .then(((img) => {
                let w = width ? width - 2*margin : null,
                    h = height ? height - 2*margin : null;

                return this._imageResize(img, w, h);
            }).bind(this))
            .then(((img) => {
                let w = img.width + 2*margin,
                    h = img.height + 2*margin;

                return this._imageCanvasResize(img, w, h, null, null);
            }).bind(this));
    }

    /**
     * Get template screenshot (#op3-designer-element)
     * with width and content-type
     * customization
     *
     * @param  {String}  url
     * @param  {Number}  width
     * @param  {String}  contentType
     * @return {Promise}
     */
    customTemplate(url, width, contentType) {
        return this.template(url)
            .then(((img) => {
                return this._imageResize(img, Math.min(width, img.width), null);
            }).bind(this))
            .then(((img) => {
                return this._imageConvert(img, contentType);
            }).bind(this));
    }

    /**
     * Get op3 element screenshot
     *
     * @param  {String}  url
     * @param  {Mixed}   node
     * @return {Promise}
     */
    element(url, node) {
        let uuid = this.$(node)
            .closest('.op3-element')
            .attr('data-op3-uuid');
        if (!uuid)
            throw new Error('OP3Screenshot: invalid node argument for element method.');

        return this._screenshot(uuid, url);
    }

    /**
     * Get op3 element thumbnail
     *
     * @param  {String}  url
     * @param  {Mixed}   node
     * @return {Promise}
     */
    thumbElement(url, node) {
        let width = this.option('thumbElementWidth'),
            height = this.option('thumbElementHeight'),
            margin = this.option('thumbElementMargin');

        return this.element(url, node)
            .then(((img) => {
                let w = width ? width - 2*margin : null,
                    h = height ? height - 2*margin : null;

                return this._imageResize(img, w, h);
            }).bind(this))
            .then(((img) => {
                let w = img.width + 2*margin,
                    h = img.height + 2*margin;

                return this._imageCanvasResize(img, w, h, null, null);
            }).bind(this));
    }

    /**
     * Get op3 element screenshot
     * with width and content-type
     * customization
     *
     * @param  {String}  url
     * @param  {Mixed}   node
     * @param  {Number}  width
     * @param  {String}  contentType
     * @return {Promise}
     */
    customElement(url, node, width, contentType) {
        return this.element(url, node)
            .then(((img) => {
                return this._imageResize(img, Math.min(width, img.width), null);
            }).bind(this))
            .then(((img) => {
                return this._imageConvert(img, contentType);
            }).bind(this));
    }

    /**
     * Open image in new bowser tab
     *
     * @param  {Mixed} src Image object or image data url
     * @return {Void}
     */
    openImageInNewTab(src) {
        this.window.open(this._imageToBlobUrl(src), '_blank');
    }

    /**
     * Placeholder image data URL
     *
     * Info: the ht+tp part in xmlns attribute is deliberately
     * splited to prevent "automatic https rewrites" services
     * to alter this file on request and change our xmls
     *
     * @return {String}
     */
    _placeholderURL() {
        let xmlns = 'ht+tp://www.w3.org/2000/svg'.replace(/\+/, ''),
            xml = ''
                + '<svg xmlns="' + xmlns + '" viewBox="0 0 32 32" width="32" height="32">'
                + '<g fill="none" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="2" stroke="#999">'
                + '<rect x="1" y="1" width="30" height="30" /><polygon points="5,26 10,17 15,21 20,14 27,26" />'
                + '<circle cx="14" cy="9" r="3" />'
                + '</g>'
                + '</svg>';

        return 'data:image/svg+xml;base64,' + btoa(xml);
    }

    /**
     * Image data URL parser
     *
     * @param  {Mixed}  src Image object or image data url
     * @return {Object}
     */
    _imageDataUrlParse(src) {
        let img = this._getImage(src),
            dataUrl = img.src,
            re = /^data\:(.*?),(.*)/,
            match = dataUrl.match(re);

        if (!match)
            throw new Error('OP3Screenshot: invalid src argument (provide valid image data url or Image object with valid image data url as source).');

        return {
            dataUrl: dataUrl,
            contentType: match[1],
            contentData: match[2],
        }
    }

    /**
     * Convert image to blob object
     *
     * @param  {Mixed} src Image object or image data url
     * @return {Blob}      Blob object
     */
    _imageToBlob(src) {
        let parse = this._imageDataUrlParse(src),
            contentType = parse.contentType,
            contentData = parse.contentData,
            byteCharacters = contentData,
            sliceSize = 512,
            byteArrays = [];

        // encode/decode
        if (/;base64/.test(contentType))
            byteCharacters = atob(byteCharacters)
        else
            byteCharacters = byteCharacters
                .replace(/%([0-9A-F]{2})/gi, (match, group) => {
                    return String.fromCharCode(parseInt(group, 16));
                });

        // bytes to array
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        // create new blob object
        return new Blob(byteArrays, { type: contentType.replace(/;base64/, '') });
    }

    /**
     * Convert image to blob url
     *
     * @param  {Mixed}  src Image object or image data url
     * @return {String}     blob url
     */
    _imageToBlobUrl(src) {
        let blob = this._imageToBlob(src),
            url = this.window.URL.createObjectURL(blob);

        return url;
    }

    /**
     * Resize image
     *
     * @param  {Mixed}   src     Image object or image data url
     * @param  {Number}  width   new image size (null for auto-size)
     * @param  {Number}  height  new image size (null for auto-size)
     * @return {Promise}
     */
    _imageResize(src, width, height) {
        return this._loadImage(src)
            .then(((img) => {
                // @todo: handle svg

                let ratio = img.width / img.height;
                if (!width)
                    width = height * ratio;
                if (!height)
                    height = width / ratio;

                let canvas = this.document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                let ctx = canvas.getContext('2d');
                ctx.fillStyle = this.option('backgroundColor');
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);

                return this._loadImage(canvas.toDataURL(this.option('contentType')));
            }).bind(this))
    }

    /**
     * Resize image canvas
     *
     * @param  {Mixed}   src    Image object or image data url
     * @param  {Number}  width  new image size
     * @param  {Number}  height new image size
     * @param  {Number}  x      source image position (null for center)
     * @param  {Number}  y      source image position (null for center)
     * @return {Promise}
     */
    _imageCanvasResize(src, width, height, x, y, success, error) {
        return this._loadImage(src)
            .then(((img) => {
                // @todo: handle svg

                if (x === null)
                    x = (width - img.width) / 2
                if (y === null)
                    y = (height - img.height) / 2;

                let canvas = this.document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                let ctx = canvas.getContext('2d');
                ctx.fillStyle = this.option('backgroundColor');
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width, img.height);

                return this._loadImage(canvas.toDataURL(this.option('contentType')));
            }).bind(this))
    }

    /**
     * Get image object from source
     *
     * @param  {Mixed} src Image object or image data url
     * @return {Image}     Image object
     */
    _getImage(src) {
        if (typeof src === 'string') {
            let img = new Image();
            img.src = src;

            return img;
        }
        else if (src instanceof(Image))
            return src;

        throw new Error('OP3Screenshot: invalid src argument (provide valid image data url or Image object with valid image data url as source).');
    }

    /**
     * Load image object from source
     *
     * @param  {Mixed}   src Image object or image data url
     * @return {Promise}
     */
    _loadImage(src) {
        return new Promise((resolve, reject) => {
            let _load = (e) => {
                if (!e.target.naturalWidth && !e.target.naturalHeight)
                    reject(new Error('OP3Screenshot: unable to load empty image.'));
                else
                    resolve(e.target);
            }

            let _error = (e) => {
                reject(new Error('OP3Screenshot: unable to load image.'));
            }

            let re = /^data\:(.*?),(.*)/;
            if (src instanceof(Image) && src.src && src.src.match(re) && src.complete && src.naturalWidth && src.naturalHeight) {
                _load({ target: src });
            }
            else if (src instanceof(Image) && src.src && src.src.match(re) && src.complete) {
                _error({ target: src });
            }
            else if (src instanceof(Image) && src.src && src.src.match(re)) {
                src.onload = _load;
                src.onerror = _error;
            }
            else if (typeof src === 'string' && src.match(re)) {
                let img = new Image();
                img.onload = _load;
                img.onerror = _error;
                img.src = src;
            }
            else
                reject(new Error('OP3Screenshot: invalid src argument (provide valid image data url or Image object with valid image data url as source).'));
        });
    }

    /**
     * Convert image to different content-type
     *
     * @param  {Mixed}   src         Image object or image data url
     * @param  {String}  contentType image/png, image/bmp, image/gif, image/jpeg, image/tiff
     * @return {Promise}
     */
    _imageConvert(src, contentType) {
        return this._loadImage(src)
            .then(((img) => {
                let parse = this._imageDataUrlParse(img.src);
                if (!contentType || contentType === parse.contentType)
                    return img;

                let canvas = this.document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                let ctx = canvas.getContext('2d');
                ctx.fillStyle = this.option('backgroundColor');
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // @todo - <foreignObject> in <canvas> (in
                // safari browser) gets tainted, do some
                // fallback?
                return this._loadImage(canvas.toDataURL(contentType));
            }).bind(this));
    }

    /**
     * Create screenshot
     *
     * @param  {String}  method
     * @param  {String}  url
     * @return {Promise}
     */
    _screenshot(method, url) {
        if (this.__promise)
            throw new Error('OP3Screenshot: already pending screenshot.');

        let getParams = this.option('previewUrlAppendGetParams'),
            urlParser = new URL(url);
        if (getParams)
            for (var i in getParams) {
                urlParser.searchParams.set(i, getParams[i]);
            }

        this.__blobLog = [];

        this.__promise = Promise
            .resolve({
                method: method,
                url: urlParser.href,
                window: null,
                document: null,
                '$': null,
                iframe: null,
                result: null,
                error: null,
            })
            .then(this._initFrame.bind(this))
            .then(this._loadFrameAssets.bind(this))
            .then(this._proxyFrameAssets.bind(this))
            .then(this._handleFramePrepared.bind(this))
            .then(this._loadFrameSvgResources.bind(this))
            .then(this._loadFrameImages.bind(this))
            .then(this._fixFrameNonLoadedImages.bind(this))
            .then(this._handleFrameReady.bind(this))
            .then(this._handleLib.bind(this))
            .catch(this._handleError.bind(this))
            .finally(this._handleClean.bind(this));

        return this.__promise;
    }

    /**
     * Additional assets list
     *
     * @return {Array}
     */
    _getAdditionalAssets() {
        let frame = this.$(this.__element).find('iframe').get(0),
            base = this.option('assetsUrl'),
            cacheBust = (new Date()).getTime(),
            result = [
                `<link href="${base}/css/op3-screenshot.css?${cacheBust}" type="text/css" rel="stylesheet" />`,
                `<link href="${base}/css/op3-icons.css?${cacheBust}" type="text/css" rel="stylesheet" />`,
                `<script src="${base}/js/dom-to-image.js?${cacheBust}" type="text/javascript" />`,
            ];

        // sometimes rocketloader blocks jQuery
        // loading (it loads it async, after
        // iframe), so we're gonna add jQuery
        // to assets as well, making sure that
        // we don't get any exceptions
        if (frame && frame.contentWindow.document && frame.contentWindow.document.defaultView && !frame.contentWindow.document.defaultView.jQuery)
            result.push(`<script src="${base}/js/jquery.js?${cacheBust}" type="text/javascript" />`);

        return result;
    }

    /**
     * Initialize dummy iframe element
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _initFrame(response) {
        return new Promise(((resolve, reject) => {
            this.__element = this.$('<div />')
                .addClass('op3-screenshot-wrapper')
                .css({
                    position: 'absolute',
                    display: 'block',
                    zIndex: -1,
                    visibility: 'hidden',
                    overflow: 'hidden',
                    width: 0,
                    height: 0,
                })
                .appendTo(this.document.body)
                .get(0);

            this.$('<iframe />')
                .addClass('op3-screenshot-frame')
                .css({
                    display: 'block',
                    width: this.option('iframeWidth'),
                    height: this.option('iframeHeight'),
                    border: '0 none',
                })
                .on('load', (e) => {
                    response.iframe = e.target;
                    response.document = response.iframe.contentWindow.document;
                    response.window = response.document.defaultView;
                    response.$ = response.window.jQuery;

                    resolve(response);
                })
                .on('error', (e) => {
                    response.error = new Error(`OP3Screenshot: failed to load ${response.url} iframe.`);
                    reject(response);
                })
                .attr('src', response.url)
                .appendTo(this.__element);
        }).bind(this));
    }

    /**
     * Load iframe assets:
     * we need additional assets to make
     * sure frontend renders
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _loadFrameAssets(response) {
        // additional assets
        let assets = this._getAdditionalAssets();

        // return as primise
        return new Promise((resolve, reject) => {
            // asset load event handler
            let handleLoad = ((e) => {
                // error occurred?
                if (!assets)
                    return;

                // remove one, continue?
                assets.shift();
                if (assets.length)
                    return;

                // clear, resolve
                response.$ = response.window.jQuery;
                assets = null;
                resolve(response);
            }).bind(this);

            // asset error event handler
            let handleError = ((e) => {
                // error occurred?
                if (!assets)
                    return;

                // clear, set error, reject
                let url = this.$(e.target).attr('href') || this.$(e.target).attr('src');
                assets = null;
                response.error = new Error(`OP3Screenshot: unable to load asset ${url}.`);
                reject(response);
            }).bind(this);

            // append assets to dom
            // (not using jquery here be cause it does
            // not work - synchronous xmlhttprequest
            // on the main thread is deprecated)
            assets.forEach((item) => {
                let div = response.document.createElement('div');
                div.innerHTML = item;

                // use temp element so we can add
                // attributes (src/href) after we
                // bind load event
                let temp = div.firstChild,
                    attrs = temp.attributes,
                    node = response.document.createElement(temp.tagName);

                node.addEventListener('load', handleLoad, false);
                node.addEventListener('error', handleError, false);

                for (let i = 0; i < attrs.length; i++) {
                    node.setAttribute(attrs[i].name, attrs[i].value);
                }

                response.document.head.appendChild(node);
            });
        });
    }

    /**
     * Proxy iframe assets:
     * we need point some assets to our
     * proxy service so we do not get
     * cross-origin error
     *
     * Addition: let's fetch data from our
     * proxy service, create object url and
     * point asset to object url.
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _proxyFrameAssets(response) {
        if (this.__cacheObjectURL)
            Object.keys(this.__cacheObjectURL).forEach((url) => {
                URL.revokeObjectURL(this.__cacheObjectURL[url]);
            });
        this.__cacheObjectURL = {};

        let $ = response.$,
            domain = response.window.location.hostname,
            proxyUrl = this.option('proxyUrl'),
            createObjectURL = (rel, url) => {
                if (/^(blob|data)\:/.test(url))
                    return Promise.resolve(url);
                else if (url in this.__cacheObjectURL)
                    return Promise.resolve(this.__cacheObjectURL[url]);
                else if (rel === 'image' && new RegExp('^(https?:)?\/\/' + domain.replace(/\./g, '\\.') + '\/').test(url))
                    return Promise.resolve(url);

                return fetch(`${proxyUrl}?rel=${rel}&url=${encodeURIComponent(url)}`)
                    .then(request => request.blob())
                    .then(blob => URL.createObjectURL(blob))
                    .then(objectURL => {
                        // Cache blob object url so we can revokeObjectURL()
                        // on later.
                        this.__cacheObjectURL[url] = objectURL;

                        return objectURL;
                    });
            };

        return Promise.resolve(response)

            // Replace img src to point to blob url (fetch and create object
            // url).
            .then((response) => {
                return new Promise((resolve, reject) => {
                    let nodes = $('img').toArray(),
                        proxify = () => {
                            if (!nodes.length) {
                                resolve(response);

                                return;
                            }

                            let node = nodes.pop();
                            createObjectURL('image', node.src)
                                .then(url => {
                                    node.src = url;
                                })
                                .catch(error => {
                                    // pass
                                })
                                .finally(() => {
                                    proxify();
                                });
                        };

                    proxify();
                });
            })

            // Replace picture>source srcset to point to blob url (fetch and
            // create object url).
            .then((response) => {
                return new Promise((resolve, reject) => {
                    let nodes = $('picture img').prevAll('source').toArray(),
                        proxify = () => {
                            if (!nodes.length) {
                                resolve(response);

                                return;
                            }

                            let node = nodes.pop();
                            createObjectURL('image', node.srcset)
                                .then(url => {
                                    node.srcset = url;
                                })
                                .catch(error => {
                                    // pass
                                })
                                .finally(() => {
                                    proxify();
                                });
                        };

                    proxify();
                });
            })

            // Replace link[rel="stylesheet"] href to point to blob url (fetch
            // and create object url).
            .then((response) => {
                return new Promise((resolve, reject) => {
                    let nodes = $('link[rel="stylesheet"]').toArray(),
                        proxify = () => {
                            if (!nodes.length) {
                                resolve(response);

                                return;
                            }

                            // Current tylesheet.
                            let oldNode = nodes.pop();
                            if (!oldNode.href) {
                                proxify();

                                return;
                            }

                            // Clone stylesheet.
                            let newNode = oldNode.ownerDocument.createElement(oldNode.tagName);
                            for (let i = 0, attrs = oldNode.attributes; i < attrs.length; i++) {
                                if (attrs[i].name !== 'href')
                                    newNode.setAttribute(attrs[i].name, attrs[i].value);
                            }

                            // Replace stylesheet with the one pointing to blob url.
                            createObjectURL('stylesheet', oldNode.href)
                                .then(url => {
                                    $(newNode)
                                        .insertAfter(oldNode)
                                        .prop('href', url);
                                    $(oldNode)
                                        .remove();
                                })
                                .catch(error => {
                                    // pass
                                })
                                .finally(() => {
                                    proxify();
                                });
                        };

                    proxify();
                });
            });
    }

    /**
     * Iframe ready event handler:
     * execute custom events
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _handleFramePrepared(response) {
        let proto = this,
            methods = [];
        while (proto = Object.getPrototypeOf(proto)) {
            let protoMethods = Object.getOwnPropertyNames(proto)
                .filter((prop) => {
                    return /^_handleFramePrepared_/.test(prop) && typeof proto[prop] === 'function';
                });

            methods = methods.concat(protoMethods);
        }

        return new Promise(((resolve, reject) => {
            for (let i = 0; i < methods.length; i++) {
                try {
                    this[methods[i]].call(this, response);
                } catch(e) {
                    response.error = new Error(e.toString());
                    reject(response);

                    return;
                }
            }

            resolve(response);
        }).bind(this));
    }

    /**
     * Iframe ready event handler:
     * add class to #op3-designer-element
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_designerElementClass(response) {
        response.$(response.document.documentElement)
            .addClass('op3-screenshot');
    }

    /**
     * Iframe ready event handler:
     * remove wordpress' adminbar (and html
     * top-margin as well)
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_wpAdminBar(response) {
        // use some kung-fu scripting
        let $style = response.$(response.document)
            .find('style[media="print"]')
            .filter((index, node) => {
                return /#wpadminbar/.test(response.$(node).html());
            });
        response.$('#wpadminbar')
            .add($style)
            .add($style.next())
            .remove();
    }

    /**
     * Iframe ready event handler:
     * remove all noscript elements, making
     * markup cleaner
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_noscript(response) {
        response.$('noscript')
            .remove();
    }

    /**
     * Iframe ready event handler:
     * make sure that screenshot element
     * has no display:none
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_displayBlock(response) {
        if (response.method === 'page' || response.method === 'template')
            return;

        let node = response.$(`.op3-element[data-op3-uuid="${response.method}"]`).get(0);
        response.$(node)
            .parents('.op3-element')
            .add(node)
            .css('display', 'block');
    }

    /**
     * Iframe ready event handler:
     * set element styling
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_styling(response) {
        let node = null;
        if (response.method === 'page')
            node = response.document.body;
        else if (response.method === 'template')
            node = response.document.getElementById('op3-designer-element');
        else
            node = response.document.getElementById(`op3-element-${response.method}`);
        if (!node)
            return;

        node.style.setProperty('margin', '0', 'important');
        node.style.setProperty('overflow', 'hidden', 'important');

        // Force node size width to px, as it cuts off the element when % is used
        node.style.setProperty('max-width', node.getBoundingClientRect().width + 'px', 'important');
    }

    /**
     * Iframe ready event handler:
     * remove OPC overlay
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_OPCOverlay(response) {
        response.$('.opc-overlay')
            .remove();
    }

    /**
     * Iframe ready event handler:
     * disable next-gen image loading (use original)
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_nextGenImages(response) {
        let $ = response.$;
        $('html').attr('data-op3-support', function() {
            return $(this).attr('data-op3-support')
                .replace(/\s(webp|avif)/, ' no-$1');
        });

        $('#op3-designer-element picture img')
            .prevAll('source[type]')
            .remove();
    }

    /**
     * Iframe ready event handler:
     * disable viewport progressive image loading
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_viewportProgressiveImage(response) {
        response.$('html')
            .removeAttr('data-op3-viewport-progressive-image');
    }

    /**
     * Iframe ready event handler:
     * disable lazy load
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_lazyLoad(response) {
        // Disable native lazy loading
        let $ = response.$;
        $('[loading="lazy"]')
            .removeAttr('loading');

        // Force optimize-lazy-loader library background image
        $('.oll-css')
            .removeClass('oll-css');

        // Force optimize-lazy-loader library image source
        $('.oll[data-oll-src],.oll[data-oll-srcset]')
            .removeClass('oll')
            .each((index, node) => {
                let $node = $(node),
                    src = $node.attr('data-oll-src'),
                    srcset = $node.attr('data-oll-srcset');

                $node
                    .attr(src ? 'src' : 'data-oll-src', src)
                    .attr(srcset ? 'srcset' : 'data-oll-srcset', srcset)
                    .removeAttr('data-oll-src')
                    .removeAttr('data-oll-srcset');
            });
    }

    /**
     * Iframe ready event handler:
     * remove animations and delays
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_animations(response) {
        response.$('[data-op-animation-state]')
            .removeAttr('data-op-animation-state');
    }

    /**
     * Iframe ready event handler:
     * do not autoinit rich text animation
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_richTextAnimations(response) {
        //response.window.RICH_TEXT_ANIMATION_AUTOINIT_DISABLE = false;

        // The ideal way to do this would be to set the
        // flag (see above) to FALSE. The problem is that
        // the library initialization is occured on
        // DOMContentLoaded event, so at this point it's
        // too late. So let's just destruct the instance...
        response.$('.rich-text-animation')
            .filter((index, node) => {
                return !!response.$(node).data('jquery-rich-text-animation');
            })
            .each((index, node) => {
                response.$(node).data('jquery-rich-text-animation').destroy();
            })
            .addClass('rich-text-animation');
    }

    /**
     * Iframe ready event handler:
     * fix empty src attribute
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_emptySrcAttributes(response) {
        response.$('[src=""]')
            .attr('src', 'data:,');
        response.$('[srcset=""]')
            .attr('srcset', 'data:,x');
    }

    /**
     * Iframe ready event handler:
     * dom-to-image renders the ::placeholder
     * pseudo-element with the same color as
     * input element, so we're gonna add
     * value to input and set color to
     * the one set in pseudo-element
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_inputPlaceholder(response) {
        response.$('input[value=""][placeholder]:not([placeholder=""]), textarea[value][placeholder]:not([placeholder=""])')
            .each((index, node) => {
                // getComputedStyle on ::placeholder
                // pseudo-element is not working in
                // all browsers
                let pseudo = null;
                if (/firefox/i.test(response.window.navigator.userAgent))
                    pseudo = '::placeholder';
                //else if (/edge/i.test(response.window.navigator.userAgent))
                //    pseudo = '::-ms-input-placeholder';

                // since getComputedStyle on ::placeholder
                // pseudo-element is not working on all
                // browsers, we're gonna use current
                // color and 0.5 opacity as fallback
                let style = node.ownerDocument.defaultView.getComputedStyle(node, pseudo),
                    color = style.getPropertyValue('color'),
                    opacity = pseudo ? style.getPropertyValue('opacity') : '0.5';

                // parse color
                let match, r,g,b,a;
                if (!match) {
                    match = color.match(/rgb\((.*?),\s*(.*?),\s*(.*?)\)/);
                    if (match) {
                        r = match[1];
                        g = match[2];
                        b = match[3];
                        a = 1;
                    }
                }
                if (!match) {
                    match = color.match(/rgba\((.*?),\s*(.*?),\s*(.*?),\s*(.*?)\)/);
                    if (match) {
                        r = match[1];
                        g = match[2];
                        b = match[3];
                        a = match[4];
                    }
                }
                if (!match)
                    return;

                // set value with new color
                let $node = response.$(node),
                    text = $node.attr('placeholder');
                color = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a * opacity) + ')';
                color = `rgba(${r}, ${g}, ${b}, ${a * opacity})`;
                $node
                    .val(text)
                    .css('color', color)
                    .css('-webkit-text-fill-color', color);
            });
    }

    /**
     * Iframe ready event handler:
     * iframe with cross-origin src can not be
     * rendered with dom-to-image, so we're
     * gonna replace iframe with some
     * placeholders (op3 elements
     * thumbs)
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_iframePlaceholder(response) {
        response.$('.op3-element iframe')
            .each((index, node) => {
                response.$('<div />')
                    .attr('class', 'op3-element-iframe-placeholder')
                    .insertAfter(node);

                response.$(node)
                    .remove();
            });

        // if any iframe left on page just remove it
        response.$('iframe')
            .remove();
    }

    /**
     * Iframe ready event handler:
     * remove elements that may cause errors
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_removeUnnecessary(response) {
        response.$('.op3-element .op3-screenshot-force-remove')
            .remove();
    }

    /**
     * Iframe ready event handler:
     * dom-to-image decodes already encoded image
     * source, so svg can not be rendered, let's
     * convert image source to base64 encoded
     * data
     *
     * @param  {Object} response
     * @return {Void}
     */
    _handleFramePrepared_svgImages(response) {
        response.$('img[src^="data:image/svg"]')
            .attr('src', function() {
                let src = response.$(this).attr('src');
                if (!/data:image\/svg.*?\bbase64\b/.test(src)) {
                    let match = src.match(/(data:image\/svg.*?),(.*)/),
                        meta = match[1],
                        content = match[2];

                    content = decodeURIComponent(content);
                    content = btoa(content);

                    src = meta + ';base64,' + content;
                }

                return src;
            });
    }

    /**
     * Load iframe svg resources
     *
     * Library for taking screenshots is not
     * perfect. For example it doesn't render
     * use elements with href pointing to
     * outer source. The reason is that that
     * source is not yet loaded at the time
     * of taking screenshot.
     *
     * So, let's find all the svg use nodes
     * with href pointing to outer source,
     * fetch that source, create new element
     * from source, append it before node and
     * point (set href) to that newly created
     * element...
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _loadFrameSvgResources(response) {
        // additional assets
        let assets = [],
            resources = {},
            $nodes = response.$(response.document)
                .find('svg use[href]')
                .filter((index, node) => {
                    let $node = response.$(node),
                        href = $node.attr('href'),
                        arr = href.split('#'),
                        url = arr[0],
                        pattern = arr[1];
                    if (!url || !pattern)
                        return false;

                    $node
                        .data('op3-screenshot-svg-resource-url', url)
                        .data('op3-screenshot-svg-resource-pattern', pattern);

                    return true;
                })
                .each((index, node) => {
                    let url = response.$(node).data('op3-screenshot-svg-resource-url');
                    if (assets.indexOf(url) !== -1)
                        return;

                    assets.push(url);
                });

        // return as promise
        return new Promise((resolve, reject) => {
            // load each asset
            let fetchAll = (() => {
                if (assets.length) {
                    // recursion
                    let url = assets.shift();
                    fetch(url)
                        .then((xhr) => {
                            return xhr.text();
                        })
                        .then((html) => {
                            resources[url] = null;

                            try {
                                let parser = new DOMParser(),
                                    doc = parser.parseFromString(html, 'image/svg+xml');

                                resources[url] = doc.firstElementChild;
                            }
                            catch(e) {
                                // pass
                            }

                            fetchAll();
                        });
                }
                else {
                    // done
                    $nodes
                        .each((index, node) => {
                            let $node = response.$(node),
                                url = $node.data('op3-screenshot-svg-resource-url'),
                                pattern = $node.data('op3-screenshot-svg-resource-pattern'),
                                $pattern = response.$(resources[url]).find(`#${pattern}`);
                            if (!$pattern.length)
                                return;

                            $pattern
                                .clone()
                                .attr('id', `op3-screenshot-svg-resource-${pattern}`)
                                .insertBefore(node);
                            $node
                                .attr('href', `#op3-screenshot-svg-resource-${pattern}`);
                        });

                    resolve(response);
                }
            }).bind(this);
            fetchAll();
        });
    }

    /**
     * Load iframe images:
     * wait for all images to load
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _loadFrameImages(response) {
        let $iframe = this.$(response.iframe);

        return new Promise((resolve, reject) => {
            let checkImages = (() => {
                // get image list
                let assets = $iframe.data('op3-screenshot-images');
                if (!assets) {
                    assets = response.$(response.document).find('img');

                    $iframe
                        .data('op3-screenshot-images', assets)
                        .data('op3-screenshot-images-load-check', 0);
                }

                // filter not-loaded ones
                assets = assets
                    .filter((index, node) => {
                        return !node.complete;
                    });
                $iframe
                    .data('op3-screenshot-images', assets)
                    .data('op3-screenshot-images-load-check', $iframe.data('op3-screenshot-images-load-check')+1);

                // not all images loaded, check again later
                // (use maxCheckTime for timeout)
                let delay = 500,
                    maxCheckTime = 25;
                if (assets.length && $iframe.data('op3-screenshot-images-load-check') <= maxCheckTime) {
                    setTimeout(checkImages, delay);

                    return;
                }

                // all images loaded (or timed-out)
                resolve(response);
            }).bind(this);

            checkImages();
        });
    }

    /**
     * Fix iframe non loaded images:
     * replace it with placeholder
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _fixFrameNonLoadedImages(response) {
        return new Promise((resolve, reject) => {
            response.$(response.document)
                .find('img')
                .filter((index, node) => {
                    return !node.complete || !node.naturalWidth || !node.naturalHeight;
                })
                .each((index, node) => {
                    node.src = this._placeholderURL();
                });

            resolve(response);
        });
    }

    /**
     * Iframe ready event handler:
     * take screenshot
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _handleFrameReady(response) {
        // get screenshot node
        let node = null;
        if (response.method === 'page')
            node = response.document.body;
        else if (response.method === 'template')
            node = response.document.getElementById('op3-designer-element');
        else
            node = response.document.getElementById(`op3-element-${response.method}`);

        // debug mode: convert document to blob and store it
        try {
            if (this.isDebugMode()) {
                // XMLSerializer.serializeToString performs an HTML
                // encode, so this is not the good way to go
                //let doc = response.document,
                //    html = new XMLSerializer().serializeToString(doc),
                //    charset = doc.characterSet.toLowerCase(),
                //    blob = new Blob([ html ], { type : 'text/html;' + charset }),
                //    url = window.URL.createObjectURL(blob);

                let doc = response.document,
                    doctype = doc.doctype,
                    html = ''
                        + '<!DOCTYPE '
                        + doctype.name
                        + (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '')
                        + (!doctype.publicId && doctype.systemId ? ' SYSTEM' : '')
                        + (doctype.systemId ? ' "' + doctype.systemId + '"' : '')
                        + '>'
                        + doc.documentElement.outerHTML,
                    charset = doc.characterSet.toLowerCase(),
                    blob = new Blob([ html ], { type : 'text/html;' + charset }),
                    url = this.window.URL.createObjectURL(blob);

                this.__blobLog.push([ 'HTML', url ]);
            }
        } catch(e) {
            // pass
        }

        // return as primise
        return new Promise((resolve, reject) => {
            if (!node) {
                response.error = new Error(`OP3Screenshot: can not find element with ${response.method} uuid.`);
                reject(response);

                return;
            }

            // dom-to-image library options:
            // lib uses node's scrollWidth/scrollHeight as
            // svg size which, in our case, is not ok (it
            // displays column gutters). let's force size
            // to prevent this.
            // addition: disabling background color because
            // it messes with element background (background
            // color will be set on lib success callback with
            // _imageConvert method).
            let lib = response.window.domtoimage,
                options = {
                    width: node.offsetWidth,
                    height: node.offsetHeight,
                    //bgcolor: this.option('backgroundColor'),
                };

            // let domtoimage do it's magic (using small timeout
            // making sure that all the object urls are loaded)
            setTimeout(() => {
                lib.toSvg(node, options)
                    .then(((e) => {
                        response.result = e;
                        resolve(response);
                    }).bind(response.iframe))
                    .catch(((e) => {
                        response.error = new Error(e);
                        reject(response);
                    }).bind(response.iframe));
            }, 250);
        });
    }

    /**
     * Library dom-to-image.js success
     * event handler
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _handleLib(response) {
        // @todo - do some svg fixes
        // rating element has style appended to defs
        // (which contains path/use) node
        //let parse = that._imageDataUrlParse(dataUrl);
        //let $element = this.$(parse.contentData)
        //$element
        //    .find('[data-op3-element-type="rating"]')
        //    .find('defs path, defs use')
        //    .attr('style', '');
        //dataUrl = 'data:' + parse.contentType + ',' + $element.get(0).outerHTML;
        //// NOTE: this is just a quickfix
        response.result = response.result
            .replace(/(<svg\s+[^>]*?class="rating-svg"[\s\S]*?<path\s+[^>]*?)style=".*?"/g, "$1")
            .replace(/(<svg\s+[^>]*?class="rating-svg"[\s\S]*?<use\s+[^>]*?)style=".*?"/g, "$1");

        // debug mode: convert svg to blob and store it
        try {
            if (this.isDebugMode())
                this.__blobLog.push([ 'SVG', this._imageToBlobUrl(response.result) ]);
        } catch(e) {
            // pass
        }

        // result as promise
        return this._loadImage(response.result)
            .then(((img) => {
                let contentType = this.option('contentType');
                if (/image\/svg/.test(contentType))
                    // result as image
                    return img;

                // result as promise
                //return this._imageConvert(img, contentType);

                // sometimes ff won't render large images in svg, converting
                // it for the second time does the trick (wft???)
                return this._imageConvert(img, contentType)
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(resolve, 250);
                        });
                    })
                    .then(() => this._imageConvert(img, contentType));

            }).bind(this))
            .then(((img) => {
                // debug mode: convert image to blob and store it
                if (this.isDebugMode())
                    this.__blobLog.push([ 'IMG', this._imageToBlobUrl(img) ]);

                return img;
            }).bind(this));
    }

    /**
     * Promise reject event handler
     *
     * @param  {Object}  response
     * @return {Promise}
     */
    _handleError(response) {
        if (response && (response instanceof Error))
            throw response;
        else if (response && response.error && (response.error instanceof Error))
            throw response.error;
        else if (response && response.error)
            throw new Error(response.error);
        else
            throw new Error(response);
    }

    /**
     * Library dom-to-image.js clean
     * event handler (promise's finally):
     * remove temporary iframe element
     *
     * @return {Void}
     */
    _handleClean() {
        this.$(this.__element).remove();

        this.__blobLog
            .forEach((item) => {
                console.log('OP3_SCREENSHOT_DEBUG blob created', item[0], item[1]);
            });

        if (!this.isDebugMode() && this.__cacheObjectURL) {
            Object.keys(this.__cacheObjectURL).forEach((url) => {
                URL.revokeObjectURL(this.__cacheObjectURL[url]);
            });

            delete this.__cacheObjectURL;
        }

        delete this.__blobLog;
        delete this.__element;
        delete this.__promise;
    }
};

/**
 * Default options
 *
 * @type {Object}
 */
OP3Screenshot.prototype._defaults = {
    assetsUrl: '/wp-content/plugins/op-builder/public/assets',
    proxyUrl: '/wp-content/plugins/op-dashboard/resources/views/proxy',
    previewUrlAppendGetParams: {
        op3_preview: 1,
        op3_screenshot: 1,
        op3_disable_optimizations: 1,
    },
    contentType: 'image/png',
    iframeWidth: 1200,
    iframeHeight: 675,
    backgroundColor: '#fff',
    thumbPageWidth: 280,
    thumbPageHeight: null,
    thumbPageMargin: 0,
    thumbTemplateWidth: 270,
    thumbTemplateHeight: null,
    thumbTemplateMargin: 0,
    thumbElementWidth: 260,
    thumbElementHeight: null,
    thumbElementMargin: 12,
};

export default OP3Screenshot;
