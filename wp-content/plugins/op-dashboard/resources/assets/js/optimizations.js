import {
    ImageOptimizerWebp,
    ImageOptimizerProgressive,
} from './ImageOptimizer';

export default class Optimizations {
    /**
     * Constructor.
     *
     * @return {Void}
     */
    constructor() {
        this._$ui = {};

        // Instances (on DOM load).
        this._settingsSecondaryMenu = null;
        this._imageOptimizerWebpModal = null;
        this._imageOptimizerProgressiveModal = null;

        // Bound event handlers.
        this._boundHandleImageOptimizerWebpModalClick = this._handleImageOptimizerWebpModalClick.bind(this);
        this._boundHandleImageOptimizerProgressiveModalClick = this._handleImageOptimizerProgressiveModalClick.bind(this);
        this._boundHandleFormChange = this._handleFormChange.bind(this);

        // Are we on the right page?
        this._group = null;
        let parser = new URLSearchParams(window.location.search),
            page = parser.get('page');
        if (page === 'op-dashboard-optimizations')
            this._group = parser.get('op-optimizations-group') || 'assets';

        // Wait for DOM load and init all.
        jQuery(() => {
            if (!this.group)
                return;

            this._$ui.form = jQuery('.ops-form');
            this._$ui.fields = this._$ui.form.find('[name]');

            this._settingsSecondaryMenu = OP3General.createMovingBorderMenu('.opd-settings-secondary-menu');
            this._imageOptimizerWebpModal = new ImageOptimizerWebp();
            this._imageOptimizerProgressiveModal = new ImageOptimizerProgressive();

            this._$ui.form.on('click', '.ops-js-image-optimizer-modal-webp', this._boundHandleImageOptimizerWebpModalClick);
            this._$ui.form.on('click', '.ops-js-image-optimizer-modal-progressive', this._boundHandleImageOptimizerProgressiveModalClick);
            this._$ui.form.on('change', this._boundHandleFormChange);
        });
    }

    /**
     * Destructor.
     *
     * @return {Void}
     */
    destroy() {
        if (this._$ui.form) {
            this._$ui.form.off('change', this._boundHandleFormChange);
            this._$ui.form.off('click', '.ops-js-image-optimizer-modal-progressive', this._boundHandleImageOptimizerProgressiveModalClick);
            this._$ui.form.off('click', '.ops-js-image-optimizer-modal-webp', this._boundHandleImageOptimizerWebpModalClick);
        }

        if (this._imageOptimizerProgressiveModal)
            this._imageOptimizerProgressiveModal.destroy();
        if (this._imageOptimizerWebpModal)
            this._imageOptimizerWebpModal.destroy();
        //if (this._settingsSecondaryMenu)
        //    this._settingsSecondaryMenu.destroy();

        delete this._boundHandleFormChange;
        delete this._boundHandleImageOptimizerProgressiveModalClick;
        delete this._boundHandleImageOptimizerWebpModalClick;
        delete this._imageOptimizerProgressiveModal;
        delete this._imageOptimizerWebpModal;
        delete this._settingsSecondaryMenu;
        delete this._$ui;
    }

    /**
     * Group property getter.
     *
     * @return {String}
     */
    get group() {
        return this._group;
    }

    /**
     * Show confirm modal.
     *
     * @param  {String}  type
     * @param  {String}  title
     * @param  {String}  markup
     * @return {Promise}
     */
    confirmModal(type, title, markup) {
        return new Promise((resolve, reject) => {
            let $ = jQuery,
                template = ''
                    +   '<div class="optimizations-confirm-modal optimizations-confirm-modal--type-' + type + '">'
                    +       '<div class="optimizations-confirm-modal--wrapper">'
                    +           '<header class=optimizations-confirm-modal--header>'
                    +               '<i class="optimizations-confirm-modal--icon"></i>'
                    +               '<h2 class=optimizations-confirm-modal--title>'
                    +                   $('<textarea />').text(title).html()
                    +               '</h2>'
                    +           '</header>'
                    +           '<div class="optimizations-confirm-modal--content">'
                    +               markup
                    +           '</div>'
                    +           '<footer class="optimizations-confirm-modal--footer">'
                    +               '<button class="optimizations-confirm-modal--button optimizations-confirm-modal--button-confirm" type="button">Confirm</button>'
                    +               '<button class="optimizations-confirm-modal--button optimizations-confirm-modal--button-cancel" type="button">Cancel</button>'
                    +           '</footer>'
                    +       '</div>'
                    +   '</div>',
                $modal = $(template);

            $modal
                .appendTo(document.body)
                .each((index, element) => {
                    element.offsetHeight;
                })
                .on('optimizationsconfirmmodalclose', (e, confirm) => {
                    if (!$modal.is('.optimizations-confirm-modal--state-visible'))
                        return;

                    $modal
                        .off('transitionend.optimizationsconfirmmodal')
                        .on('transitionend.optimizationsconfirmmodal', (e) => {
                            $modal
                                .remove();
                        })
                        .removeClass('optimizations-confirm-modal--state-shake')
                        .removeClass('optimizations-confirm-modal--state-visible');

                    resolve(confirm);
                })
                .on('optimizationsconfirmmodalshake', (e) => {
                    if ($modal.is('.optimizations-confirm-modal--state-shake'))
                        return;

                    $modal
                        .find('.optimizations-confirm-modal--wrapper')
                        .off('animationend.optimizationsconfirmmodal')
                        .on('animationend.optimizationsconfirmmodal', (e) => {
                            $modal
                                .removeClass('optimizations-confirm-modal--state-shake');
                        });
                    $modal
                        .addClass('optimizations-confirm-modal--state-shake');
                })
                .on('click', (e) => {
                    if ($modal.is(e.target))
                        $modal
                            .trigger('optimizationsconfirmmodalshake');
                })
                .on('click', '.optimizations-confirm-modal--button-confirm', (e) => {
                    $modal
                        .trigger('optimizationsconfirmmodalclose', true);
                })
                .on('click', '.optimizations-confirm-modal--button-cancel', (e) => {
                    $modal
                        .trigger('optimizationsconfirmmodalclose', false);
                })
                .addClass('optimizations-confirm-modal--state-visible');
        });
    }

    /**
     * Image optimizer modal (link) click event handler.
     *
     * @param  {Event} e
     * @return {Void}
     */
    _handleImageOptimizerWebpModalClick(e) {
        this._imageOptimizerWebpModal.show();
    }

    /**
     * Image optimizer modal (link) click event handler.
     *
     * @param  {Event} e
     * @return {Void}
     */
    _handleImageOptimizerProgressiveModalClick(e) {
        this._imageOptimizerProgressiveModal.show();
    }

    /**
     * Form change event handler.
     *
     * @param  {Event} e
     * @return {Void}
     */
    _handleFormChange(e) {
        if (this.group === 'assets') {
            var $target = jQuery(e.target),
                checked = $target.prop('checked'),
                $fieldJsOp = this._$ui.fields.filter('[type="checkbox"][name="opd_enqueue_assets[js_op]"]'),
                $fieldJsOther = this._$ui.fields.filter('[type="checkbox"][name="opd_enqueue_assets[js_other]"]'),
                setJsOtherExternal = true
                    && $target.is($fieldJsOp)
                    && !checked
                    && $fieldJsOther.prop('checked'),
                setJsOpExternalDefer = true
                    && $target.is($fieldJsOther)
                    && checked
                    && !$fieldJsOp.prop('checked');

            if (setJsOtherExternal)
                $fieldJsOther.prop('checked', false);
            if (setJsOpExternalDefer)
                $fieldJsOp.prop('checked', true);

            if ($target.is('[name="opd_enqueue_assets[js_other]"]'))
                $target
                    .closest('form')
                    .attr('data-is-js-external-defer', $target.prop('checked') ? '1' : '0');
            if ($target.is('[name="opd_enqueue_assets[js_delay]"]'))
                $target
                    .closest('form')
                    .attr('data-is-js-delay', $target.prop('checked') ? '1' : '0');

            if ($target.is('[name="opd_enqueue_assets[js_other]"]') && checked) {
                let type = 'info',
                    title = 'Check Your Website After Activating',
                    markup = ''
                        + '<p>Defering render-blocking JavaScript may cause issues with scripts that require certain order of execution. We advise you to check the front end of your website after you enable this optimization.</p>'
                        + '<p>If you notice issues with certain functionality, use the Exclude functionality to keep those scripts loading in a render-blocking manner.</p>';
                this.confirmModal(type, title, markup)
                    .then((confirm) => {
                        if (!confirm)
                            $target
                                .prop('checked', false)
                                .trigger('change');
                    });
            }

            if ($target.is('[name="opd_enqueue_assets[js_delay]"]') && checked) {
                let type = 'info',
                    title = 'Check Your Website After Activating',
                    markup = ''
                        + '<p>Delaying JavaScript may cause issues with scripts that require certain order of execution. We advise you to check the front end of your website after you enable this optimization.</p>'
                        + '<p>If you notice issues with certain functionality, use the Exclude functionality to keep those scripts without delay.</p>';
                this.confirmModal(type, title, markup)
                    .then((confirm) => {
                        if (!confirm)
                            $target
                                .prop('checked', false)
                                .trigger('change');
                    });
            }
        }
        //else {
        //
        //}
    }
}

window.OPDashboard.Optimizations = new Optimizations;
