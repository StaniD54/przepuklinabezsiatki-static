class OPBGlobalElementsAdmin {
    /**
     * Instantiate
     */
    constructor() {
        this['jQueryInit']();
    }

    /**
     * jQuery initialization
     */
    ['jQueryInit']() {
        let _this = this;
        let $ = jQuery;

        $(document).ready(() => {
            _this['init']($);
        });
    }

    /**
     * Functionality after $ is ready
     *
     * @param {jQuery} $
     */
    ['init']($) {
        let _this = this;

        _this['deleteGlobalElement']($);
    }

    /**
     * Open confirm dialog and delete global element
     *
     * @param {jQuery} $
     */
    ['deleteGlobalElement']($) {
        let _this = this;



        $('.opb-global-elements-list').on('click', '.opb-delete-global-element-btn', (e) => {
            e.preventDefault();

            let $btn         = $(e.currentTarget);
            let elementTitle = $btn.closest('.opb-global-element-list-item').find('.opb-global-element-title');
            let elementId    = $btn.data('gid');
            let deleteUrl    = $btn.attr('data-href') || $btn.attr('href');
            let nonce        = '';

            _this.deleteGlobalElementConfirm = window.OP3General.confirm(Object.assign(window.OP3General.dialogOptions, {
                title: elementTitle,
                content: `<p>Are you sure you want to delete this element?</p><p>If you delete a global element, and it is used somewhere on the page, it will be converted to a normal element.</p>`,
                buttons: {
                    Yes: {
                        btnClass: 'btn-red',
                        action: () => {
                            _this.deleteGlobalElementConfirm.showLoading(true);

                            /**
                             * AJAX request that deletes page in funnel
                             *
                             * @see \OPFunnel\Http\FunnelController::deleteFunnelPage
                             */
                            $.ajax({
                                type: 'POST',
                                beforeSend: function(request) {
                                    request.setRequestHeader("X-WP-Nonce", window.OpsScriptData.nonce);
                                },
                                url: deleteUrl,
                            }).success(function(response) {
                                $('.opb-global-element-list-item-' + elementId + '').fadeOut(function() {
                                    $(this).remove();

                                    // Check count
                                    if ($('.opb-global-element-list-item').length < 1) {
                                        window.location.reload();
                                    }
                                });

                                _this.deleteGlobalElementConfirm.close();
                            }).error(function(response) {
                                _this.deleteGlobalElementConfirm.setTitle('Error');
                                _this.deleteGlobalElementConfirm.setContent(response.responseJSON.message);
                                _this.deleteGlobalElementConfirm.hideLoading(true);
                            });
                            return false;
                        }
                    }
                }
            }));
        });
    }
}

export default OPBGlobalElementsAdmin;
