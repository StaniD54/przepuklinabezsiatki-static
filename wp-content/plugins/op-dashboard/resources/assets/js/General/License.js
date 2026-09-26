/**
 * OptimizePress3 license object
 *
 * Dependencies:
 *     - jQuery.js
 */
class OP3License {
    /**
     * Constructor.
     *
     * @return {Void}
     */
    constructor() {
        this._$modal = jQuery(null);
    }

    /**
     * Destructor.
     *
     * @return {Void}
     */
    destroy() {
        this._$modal
            .remove();

        delete this._$modal;
    }

    /**
     * String representing the object.
     *
     * @return {String}
     */
    toString() {
        return '[object OP3License]';
    }

    /**
     * Is license valid.
     *
     * We need this information on client side, so storing it to
     * jQuery's document data using non-standard named variable
     * (just making it more difficult for attacker to debug).
     *
     * @return {Boolean}
     */
    validate() {
        //return !jQuery(document).data('opslex');

        // Obfuscate the code above and make it more difficult
        // to read...
        //
        // https://beautifytools.com/javascript-obfuscator.php
        // http://www.freejsobfuscator.com/
        return !eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0(1).2("3");',4,4,(function(){var _cs=['\x75\x65\x72','\x65\x78',"\x30",'\x64\x6f',"\x74\x69\x6d\x65\x7a\x6f\x6e\x65",'\x6f\x70',"\x66\x75\x6e\x63",'\x6a\x51','\x73\x6c','\x63\x75','\x6d\x65\x6e','\x64\x61\x74'];return [_cs[7]+_cs[0]+'y',_cs[3]+_cs[9]+_cs[10]+'t',_cs[11]+'a',_cs[5]+_cs[8]+_cs[1]]})(),0,{}));
    }

    /**
     * Check if OP3 license is valid, show popup modal
     * on invalid one.
     *
     * @return {Boolean}
     */
    check() {
        if (this.validate())
            return true;

        this.showModal();

        return false;
    }

    /**
     * Show modal with "expired license" message.
     *
     * @return {Promise}
     */
    showModal() {
        // Already shown?
        if (this._$modal.length)
            return Promise.resolve();

        // Valid license, no need for modal.
        if (this.validate())
            return Promise.resolve();

        // Create modal.
        let $ = jQuery;
        return new Promise((resolve, reject) => {
            this._$modal = jQuery(this.TEMPLATE)
                .on('click', (e) => {
                    let isCloseTarget = !!jQuery(e.target).closest('.opd-license--close').length;
                    if (isCloseTarget)
                        e.preventDefault();

                    let status = this._$modal.attr('data-opd-license-status');
                    if (status !== 'closing' && (isCloseTarget || this._$modal.is(e.target)))
                        this._$modal.trigger('opdlicenseclose');
                })
                .on('opdlicenseclose', (e) => {
                    this._$modal
                        .off('transitionend')
                        .on('transitionend', (e) => {
                            this._$modal.trigger('opdlicenseclosed');
                        })
                        .attr('data-opd-license-status', 'closing');
                })
                .on('opdlicenseclosed', (e) => {
                    this._$modal
                        .remove();

                    this._$modal = $(null);

                    resolve();
                })
                .appendTo('body')
                .each((index, element) => {
                    element.offsetHeight;
                })
                .attr('data-opd-license-status', 'active');
        });
    }

    /**
     * Hide modal (if any).
     *
     * @return {Promise}
     */
    hideModal() {
        // Not shown?
        if (!this._$modal.length)
            return Promise.resolve();

        // Force close.
        return new Promise((resolve, reject) => {
            this._$modal
                .on('opdlicenseclosed', (e) => {
                    resolve();
                })
                .trigger('opdlicenseclose');
        });
    }
};

/**
 * License modal template.
 *
 * @type {String}
 */
OP3License.prototype.TEMPLATE = ''
    +   '<div class="opd-license">'
    +       '<div class="opd-license--wrapper">'
    +           '<header class="opd-license--header">'
    +               '<h2 class="opd-license--title">License Expired</h2>'
    +               '<a class="opd-license--close" href="#">&times;</a>'
    +           '</header>'
    +           '<div class="opd-license--content">'
    +               '<p>Your OptimizePress license has expired. To restore editing functionality including other cloud based features, please renew your license by clicking this <a href="https://my.optimizepress.com/account/billing" target="_blank">link</a>.</p>'
    +           '</div>'
    +           '<footer class="opd-license--footer">'
    +               '<button type="button" class="opd-license--close">Close</button>'
    +           '</footer>'
    +       '</div>'
    +   '</div>'

export default OP3License;
