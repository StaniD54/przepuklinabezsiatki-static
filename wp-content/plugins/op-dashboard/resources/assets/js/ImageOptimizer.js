class ImageOptimizerBase {
    /**
     * Constructor.
     *
     * @return {Void}
     */
    constructor() {
        // Interface.
        let $element = jQuery(this.MARKUP);
        this._$ui = {
            element: $element,
            title: $element.find('.opd-settings-image-optimizer-modal-title'),
            desc: $element.find('.opd-settings-image-optimizer-modal-content-status-idle'),
            progressUrl: $element.find('.opd-settings-image-optimizer-modal-content-status-progress-url'),
            progressBar: $element.find('.opd-settings-image-optimizer-modal-content-status-progress-progressbar'),
            status: $element.find('.opd-settings-image-optimizer-modal-content-status-done'),
        };

        // Content.
        let title = this.TITLE,
            desc = '<p>'
                + this.DESC
                    .replace('\n\n', '</p><p>')
                    .replace('\n', '<br />')
                + '</p>'
        this._$ui.title.text(title);
        this._$ui.desc.html(desc);

        // Bound events.
        this._boundHandleClick = this._handleClick.bind(this);
        this._boundHandleCloseClick = this._handleCloseClick.bind(this);
        this._boundHandleStartClick = this._handleStartClick.bind(this);
        this._boundHandleCancelClick = this._handleCancelClick.bind(this);

        // Connect event listeners.
        $element
            .on('click', this._boundHandleClick)
            .on('click', '.opd-settings-image-optimizer-modal-close', this._boundHandleCloseClick)
            .on('click', '.opd-settings-image-optimizer-modal-button-start', this._boundHandleStartClick)
            .on('click', '.opd-settings-image-optimizer-modal-button-cancel', this._boundHandleCancelClick);
    }

    /**
     * Destructor.
     *
     * @return {Void}
     */
    destroy() {
        this._$ui.element
            .remove();

        delete this._boundHandleCancelClick;
        delete this._boundHandleStartClick;
        delete this._boundHandleCloseClick;
        delete this._boundHandleClick;
        delete this._$ui;
    }

    /**
     * Status property getter.
     *
     * @return {String}
     */
    get status() {
        return this._$ui.element
            .attr('data-opd-settings-image-optimizer-modal-status');
    }

    /**
     * Show modal.
     *
     * @return {ImageOptimizerBase}
     */
    show() {
        let status = this.status;
        if (status !== 'none')
            return this;

        // Append to DOM and repaint.
        this._$ui.element
            .appendTo(document.body)
            .prop('offsetHeight');

        // Show.
        this._setStatus('idle');

        return this;
    }

    /**
     * Hide modal.
     *
     * @return {ImageOptimizerBase}
     */
    hide() {
        let status = this.status;
        if (status === 'none')
            return this;
        if (status === 'progress')
            return this.abort();

        this._setStatus('none');

        return this;
    }

    /**
     * Start optimization.
     *
     * @return {ImageOptimizerBase}
     */
    start() {
        let status = this.status;
        if (status !== 'idle')
            return this;

        this._setStatus('preparing');
        this._$ui.progressUrl
            .text('https://');
        this._$ui.progressBar
            .css({
                '--progressbar-position': 0,
                '--progressbar-length': 0,
            });
        this._$ui.status.html('<p>...</p>');

        this._requestList()
            .catch((error) => {
                this._$ui.status.html('<p>Error: unable to get image list.</p>');
                this._setStatus('done');
            })
            .then((data) => {
                if (!data)
                    return null;

                if (this.status === 'aborting') {
                    this.hide();

                    return null;
                }

                this._$ui.progressBar
                    .css({
                        '--progressbar-position': 0,
                        '--progressbar-length': data.data.length,
                    });

                this._setStatus('progress');

                return data;
            })
            .then((data) => {
                if (!data)
                    return null;

                return new Promise((resolve, reject) => {
                    let images = data.data,
                        countAll = images.length,
                        countOptimize = 0,
                        countSuccess = 0,
                        countError = 0,
                        optimizeFirstImage = () => {
                            if (this.status === 'aborting') {
                                this.hide();

                                return null;
                            }

                            let src = images.shift();
                            this._$ui.progressUrl
                                .attr('title', src)
                                .text(src);
                            this._$ui.progressBar
                                .attr('title', src)
                                .css('--progressbar-position', countSuccess + countError + 1);

                            this._requestOptimize(src)
                                .then((data) => {
                                    countOptimize += data.data.length;
                                    countSuccess++;
                                })
                                .catch(() => {
                                    countError++;
                                })
                                .finally(() => {
                                    optimize();
                                })
                        },
                        optimize = () => {
                            if (!images.length)
                                resolve({
                                    all: countAll,
                                    optimize: countOptimize,
                                    success: countSuccess,
                                    error: countError,
                                });
                            else
                                optimizeFirstImage();
                        };

                    optimize();
                });
            })
            .then((data) => {
                if (!data)
                    return null;

                let text;
                if (data.success + data.error === 0)
                    text = 'No images for optimization found.'
                else if (!data.optimize && !data.error)
                    text = 'Optimizing images finished, no new images created.';
                else if (data.optimize && !data.error)
                    text = 'Optimizing images finished, ' + data.optimize + ' new image(s) created.';
                else
                    text = 'Optimizing images finished, ' + data.optimize + ' new image(s) created, ' + data.error + ' image(s) failed.';

                this._$ui.status.html('<p>' + text + '</p>');
                this._setStatus('done');
            })
            .catch((error) => {
                this._$ui.status.html('<p>Error: unknown error.</p>');
                this._setStatus('done');
            })
            .finally(() => {
                // pass
            });

        return this;
    }

    /**
     * Abort optimization.
     *
     * @return {ImageOptimizerBase}
     */
    abort() {
        let status = this.status;
        if (status !== 'preparing' && status !== 'progress')
            return this;

        this._setStatus('aborting');

        return this;
    }

    /**
     * Set status.
     *
     * @param  {String} status
     * @return {Void}
     */
    _setStatus(status) {
        if (status === this.status)
            return;

        if (!this._$ui.element.parent().length)
            this._$ui.element
                .appendTo(document.body)
                .prop('offsetHeight');

        if (status === 'none')
            this._$ui.element
                .one('transitionend', (e) => {
                    this._$ui.element
                        .detach();
                })

        this._$ui.element
            .attr('data-opd-settings-image-optimizer-modal-status', status);
    }

    /**
     * Ajax request as promise.
     *
     * @param  {Object}  options
     * @return {Promise}
     */
    _request(options) {
        return new Promise((resolve, reject) => {
            jQuery.ajax(jQuery.extend({
                method: 'get',
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    'X-WP-Nonce': null
                        || (window.OP3 && OP3.Meta ? OP3.Meta.nonce : '')
                        || (window.OpsScriptData && OpsScriptData.nonce ? OpsScriptData.nonce : '')
                        || '',
                },
                success: (data, textStatus, jqXHR) => {
                    resolve(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(textStatus);
                },
            }, options));
        });
    }

    /**
     * Ajax request list.
     *
     * @return {Promise}
     */
    _requestList() {
        return this._request({
            url: this.API_LIST,
        });
    }

    /**
     * Ajax request optimize.
     *
     * @param  {String}  image
     * @return {Promise}
     */
    _requestOptimize(image) {
        return this._request({
            url: this.API_OPTIMIZE,
            method: 'post',
            data: JSON.stringify({
                image: image,
            }),
        });
    }

    /**
     * Modal click event handler:
     * hide modal on overlay click.
     *
     * @param  {Event} e
     * @return {Void}
     */
    _handleClick(e) {
        if (e.target !== e.delegateTarget)
            return;

        let status = this.status;
        if (status !== 'idle' && status !== 'done')
            return;

        this.hide();
    }

    /**
     * Close button click event handler:
     * hide or abort.
     *
     * @param  {Event} e
     * @return {Void}
     */
    _handleCloseClick(e) {
        e.preventDefault();

        let status = this.status;
        if (status === 'idle' || status === 'done')
            this.hide();
        else
            this.abort();
    }

    /**
     * Start button click event handler:
     * start or hide.
     *
     * @param  {Event} e
     * @return {Void}
     */
    _handleStartClick(e) {
        let status = this.status;
        if (status !== 'done')
            this.start();
        else
            this.hide();
    }

    /**
     * Cancel button click event handler.
     *
     * @param  {Event} e
     * @return {Void}
     */
    _handleCancelClick(e) {
        let status = this.status;
        if (status === 'idle' || status === 'done')
            this.hide();
        else
            this.abort();
    }
}

/**
 * Modal markup.
 *
 * @type {String}
 */
ImageOptimizerBase.prototype.MARKUP = `
    <div class="opd-settings-image-optimizer-modal" data-opd-settings-image-optimizer-modal-status="none">
        <form class="opd-settings-image-optimizer-modal-wrapper">
            <div class="opd-settings-image-optimizer-modal-header">
                <h3 class="opd-settings-image-optimizer-modal-title">...</h3>
                <a href="#" class="opd-settings-image-optimizer-modal-close">&times;</a>
            </div>
            <div class="opd-settings-image-optimizer-modal-content">
                <div class="opd-settings-image-optimizer-modal-content-status opd-settings-image-optimizer-modal-content-status-idle"></div>
                <div class="opd-settings-image-optimizer-modal-content-status opd-settings-image-optimizer-modal-content-status-preparing">
                    <p>Getting images list...</p>
                </div>
                <div class="opd-settings-image-optimizer-modal-content-status opd-settings-image-optimizer-modal-content-status-progress">
                    <p class="opd-settings-image-optimizer-modal-content-status-progress-url">https://</p>
                    <div class="opd-settings-image-optimizer-modal-content-status-progress-progressbar"></div>
                </div>
                <div class="opd-settings-image-optimizer-modal-content-status opd-settings-image-optimizer-modal-content-status-aborting">
                    <p>Aborting...</p>
                </div>
                <div class="opd-settings-image-optimizer-modal-content-status opd-settings-image-optimizer-modal-content-status-done">
                    <p class="opd-settings-image-optimizer-modal-content-status-done-text">Done.</p>
                </div>
            </div>
            <div class="opd-settings-image-optimizer-modal-footer">
                <button class="opd-settings-image-optimizer-modal-button opd-settings-image-optimizer-modal-button-start" type="button">Start</button>
                <button class="opd-settings-image-optimizer-modal-button opd-settings-image-optimizer-modal-button-cancel" type="button">Close</button>
            </div>
        </form>
    </div>`;

/**
 * Modal title.
 *
 * @type {String}
 */
ImageOptimizerBase.prototype.TITLE = 'Image Optimizer';

/**
 * Modal description.
 *
 * @type {String}
 */
ImageOptimizerBase.prototype.DESC = 'Based on your settings you can optimize all of your images in gallery: convert it to next generation image format (image optimizer) and/or create small blured placeholder (progressive hero background). Note that converting images may take some time (depending on images count).';

/**
 * Modal API url (list).
 *
 * @type {String}
 */
ImageOptimizerBase.prototype.API_LIST = '/wp-json/opd/v1/image-optimizer/all/list-non-optimized';

/**
 * Modal API url (optimize).
 *
 * @type {String}
 */
ImageOptimizerBase.prototype.API_OPTIMIZE = '/wp-json/opd/v1/image-optimizer/all/optimize';

class ImageOptimizerWebp extends ImageOptimizerBase {};
ImageOptimizerWebp.prototype.TITLE = 'Start WebP Image Conversion';
ImageOptimizerWebp.prototype.DESC = 'Convert all images in your WordPress media library to WebP format. Original images will be untouched and used as fallback where browsers do not support WebP (when option is active). Image conversion may take some time depending on image count (larger sites can take 1-2 hours). <a href="https://docs.optimizepress.com/article/2509-image-optimization" target="_blank">Learn more</a>';
ImageOptimizerWebp.prototype.API_LIST = '/wp-json/opd/v1/image-optimizer/next-gen/list-non-optimized';
ImageOptimizerWebp.prototype.API_OPTIMIZE = '/wp-json/opd/v1/image-optimizer/next-gen/optimize';

class ImageOptimizerProgressive extends ImageOptimizerBase {};
ImageOptimizerProgressive.prototype.TITLE = 'Start Progressive Image Generation';
ImageOptimizerProgressive.prototype.DESC = 'Generate progressive replacement images (small images around 30px wide) for all images in your media library. These will be used if you activate the Progressive Images option for any of your viewport sizes. Note: Generating images may take some time depending on image count (larger sites can take 1-2 hours). <a href="https://docs.optimizepress.com/article/2508-viewport-progressive-images" target="_blank">Learn more</a>';
ImageOptimizerProgressive.prototype.API_LIST = '/wp-json/opd/v1/image-optimizer/progressive/list-non-optimized';
ImageOptimizerProgressive.prototype.API_OPTIMIZE = '/wp-json/opd/v1/image-optimizer/progressive/optimize';

export {
    ImageOptimizerWebp,
    ImageOptimizerProgressive,
}
