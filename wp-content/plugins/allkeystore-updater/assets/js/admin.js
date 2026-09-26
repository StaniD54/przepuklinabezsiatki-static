/**
 * Allkeystore Updater — Admin Panel JS v4 (i18n)
 */
jQuery(document).ready(function ($) {

    var t = aks_updater.i18n || {};

    // =========================================================================
    // Przełączanie zakładek
    // =========================================================================
    $('.aks-nav-tabs .nav-tab').on('click', function (e) {
        e.preventDefault();
        var tab = $(this).data('tab');

        $('.aks-nav-tabs .nav-tab').removeClass('nav-tab-active');
        $(this).addClass('nav-tab-active');

        $('.aks-tab-content').hide();
        $('#aks-tab-' + tab).show();

        if (tab === 'ustawienia' && aks_updater.is_registered === '1') {
            loadSites();
        }
    });

    // =========================================================================
    // Auto-save ustawień (checkbox)
    // =========================================================================
    $('#aks-share-versions').on('change', function () {
        var $cb    = $(this);
        var $wrap  = $cb.closest('.aks-checkbox-wrap');
        var isOn   = $cb.is(':checked') ? 'yes' : 'no';

        $.ajax({
            url:  aks_updater.ajax_url,
            type: 'POST',
            data: {
                action:  'aks_save_setting',
                nonce:   aks_updater.nonce,
                setting: 'aks_updater_share_versions',
                value:   isOn
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    $wrap.addClass('aks-saved-flash');
                    setTimeout(function () {
                        $wrap.removeClass('aks-saved-flash');
                    }, 1200);
                }
            }
        });
    });

    // =========================================================================
    // Rejestracja strony
    // =========================================================================
    $('#aks-register-btn').on('click', function () {
        var $btn     = $(this);
        var $loading = $('#aks-register-loading');
        var $result  = $('#aks-register-result');
        var apiKey   = $('#aks_api_key_input').val().trim();

        if (!apiKey) {
            $result.html('<div class="notice notice-error inline"><p>' + escHtml(t.enter_api_key) + '</p></div>');
            return;
        }

        $btn.prop('disabled', true);
        $loading.show();
        $result.empty();

        $.ajax({
            url:  aks_updater.ajax_url,
            type: 'POST',
            data: {
                action:  'aks_register_site',
                nonce:   aks_updater.nonce,
                api_key: apiKey
            },
            dataType: 'json',
            success: function (response) {
                $btn.prop('disabled', false);
                $loading.hide();

                if (response.success) {
                    $result.html('<div class="notice notice-success inline"><p>' + escHtml(response.data.message) + '</p></div>');
                    aks_updater.is_registered = '1';
                    setTimeout(function () { location.reload(); }, 1500);
                } else {
                    var msg = (response.data && response.data.message) ? response.data.message : t.registration_error;
                    $result.html('<div class="notice notice-error inline"><p>' + escHtml(msg) + '</p></div>');
                }
            },
            error: function () {
                $btn.prop('disabled', false);
                $loading.hide();
                $result.html('<div class="notice notice-error inline"><p>' + escHtml(t.connection_error) + '</p></div>');
            }
        });
    });

    // =========================================================================
    // Wyrejestrowanie strony
    // =========================================================================
    $('#aks-deregister-btn').on('click', function () {
        if (!confirm(t.confirm_deregister)) {
            return;
        }

        var $btn    = $(this);
        var $result = $('#aks-deregister-result');

        $btn.prop('disabled', true);
        $result.html('<div class="aks-loading"><span class="spinner is-active"></span> ' + escHtml(t.deregistering) + '</div>');

        $.ajax({
            url:  aks_updater.ajax_url,
            type: 'POST',
            data: {
                action: 'aks_deregister_site',
                nonce:  aks_updater.nonce
            },
            dataType: 'json',
            success: function (response) {
                $btn.prop('disabled', false);

                if (response.success) {
                    $result.html('<div class="notice notice-success inline"><p>' + escHtml(response.data.message) + '</p></div>');
                    setTimeout(function () { location.reload(); }, 1500);
                } else {
                    var msg = (response.data && response.data.message) ? response.data.message : t.deregistration_error;
                    $result.html('<div class="notice notice-error inline"><p>' + escHtml(msg) + '</p></div>');
                }
            },
            error: function () {
                $btn.prop('disabled', false);
                $result.html('<div class="notice notice-error inline"><p>' + escHtml(t.connection_error) + '</p></div>');
            }
        });
    });

    // =========================================================================
    // Ładowanie listy zarejestrowanych domen
    // =========================================================================
    function loadSites() {
        var $loading = $('#aks-sites-loading');
        var $list    = $('#aks-sites-list');

        $loading.show();
        $list.empty();

        $.ajax({
            url:  aks_updater.ajax_url,
            type: 'POST',
            data: {
                action: 'aks_get_sites',
                nonce:  aks_updater.nonce
            },
            dataType: 'json',
            success: function (response) {
                $loading.hide();

                if (response.success && response.data.sites) {
                    var sites    = response.data.sites;
                    var maxSites = response.data.max_sites || 0;
                    var remaining = maxSites - sites.length;
                    if (remaining < 0) remaining = 0;

                    $('#aks-remaining-count').text(remaining);

                    if (sites.length === 0) {
                        $list.html('<p>' + escHtml(t.no_sites) + '</p>');
                    } else {
                        $list.html(buildSitesTable(sites));
                    }
                } else {
                    var msg = (response.data && response.data.message) ? response.data.message : t.could_not_load_sites;
                    $list.html('<p>' + escHtml(msg) + '</p>');
                }
            },
            error: function () {
                $loading.hide();
                $list.html('<p>' + escHtml(t.connection_error) + '</p>');
            }
        });
    }

    function buildSitesTable(sites) {
        var currentSite = (aks_updater.site_url || '').replace(/\/+$/, '');

        var html = '';
        html += '<table class="wp-list-table widefat fixed striped aks-sites-table">';
        html += '<thead><tr>';
        html += '<th>' + escHtml(t.th_site_url) + '</th>';
        html += '<th>' + escHtml(t.th_registered_at) + '</th>';
        html += '<th>' + escHtml(t.th_last_seen) + '</th>';
        html += '</tr></thead>';
        html += '<tbody>';

        for (var i = 0; i < sites.length; i++) {
            var s = sites[i];
            var siteNorm = (s.site_url || '').replace(/\/+$/, '');
            var isCurrent = (siteNorm === currentSite);
            var rowClass = isCurrent ? 'aks-current-site' : '';

            html += '<tr class="' + rowClass + '">';
            html += '<td>' + escHtml(s.site_url) + (isCurrent ? ' <strong>' + escHtml(t.this_site) + '</strong>' : '') + '</td>';
            html += '<td>' + escHtml(s.registered_at) + '</td>';
            html += '<td>' + escHtml(s.last_seen_at) + '</td>';
            html += '</tr>';
        }

        html += '</tbody></table>';
        return html;
    }

    // =========================================================================
    // Sprawdzanie aktualizacji
    // =========================================================================
    $('#aks-check-btn').on('click', function () {
        var $btn     = $(this);
        var $loading = $('#aks-loading');
        var $results = $('#aks-results');

        $btn.prop('disabled', true);
        $loading.show();
        $results.empty();

        $.ajax({
            url:      aks_updater.ajax_url,
            type:     'POST',
            data: {
                action: 'aks_check_updates',
                nonce:  aks_updater.nonce
            },
            dataType: 'json',
            success: function (response) {
                $btn.prop('disabled', false);
                $loading.hide();

                if (response.success) {
                    if (!response.data || response.data.length === 0) {
                        $results.html(
                            '<div class="aks-no-updates">' + escHtml(t.all_up_to_date) + '</div>'
                        );
                    } else {
                        $results.html(buildUpdatesTable(response.data));
                    }
                } else {
                    var msg = (response.data && response.data.message)
                        ? response.data.message
                        : t.unknown_error;
                    $results.html(
                        '<div class="notice notice-error inline"><p>' + escHtml(msg) + '</p></div>'
                    );
                }
            },
            error: function () {
                $btn.prop('disabled', false);
                $loading.hide();
                $results.html(
                    '<div class="notice notice-error inline"><p>' + escHtml(t.connection_error) + '</p></div>'
                );
            }
        });
    });

    function buildUpdatesTable(items) {
        var html = '';
        html += '<table class="wp-list-table widefat fixed striped aks-updates-table">';
        html += '<thead><tr>';
        html += '<th class="column-type">' + escHtml(t.th_type) + '</th>';
        html += '<th class="column-name">' + escHtml(t.th_name) + '</th>';
        html += '<th class="column-local-version">' + escHtml(t.th_local_version) + '</th>';
        html += '<th class="column-store-version">' + escHtml(t.th_store_version) + '</th>';
        html += '<th class="column-download">' + escHtml(t.th_download) + '</th>';
        html += '</tr></thead>';
        html += '<tbody>';

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            html += '<tr>';
            html += '<td>' + escHtml(item.type) + '</td>';
            html += '<td><strong>' + escHtml(item.name) + '</strong></td>';
            html += '<td>' + escHtml(item.local_version) + '</td>';
            html += '<td>' + escHtml(item.store_version) + '</td>';
            html += '<td class="column-download">';
            if (item.product_url) {
                html += '<a href="' + escAttr(item.product_url) + '" target="_blank" rel="noopener" class="button button-small">' + escHtml(t.btn_go) + '</a>';
            } else {
                html += '—';
            }
            html += '</td>';
            html += '</tr>';
        }

        html += '</tbody></table>';
        return html;
    }

    // =========================================================================
    // Helpers
    // =========================================================================
    function escHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    }

    function escAttr(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
});
