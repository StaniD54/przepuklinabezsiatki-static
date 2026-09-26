import MovingBorderMenu from "./Menu/MovingBorderMenu";
import CollapsibleMenu from "./Menu/CollapsibleMenu";
import Menus from "./Menu/Menus";
import 'jquery-confirm'
import OP3Dashboard from "./OP3Dashboard";
import OP3WallopSlider from "./Slider/WallopSlider";
import OP3WallopAjaxSlider from "./Slider/WallopAjaxSlider";
import OP3MovingImage from "./Element/MovingImage";
import OP3Dialog from "./General/Dialog";
import OP3License from "./General/License";
import OP3Screenshot from "./General/Screenshot";
import OP3Builder from "./OP3Builder";
import OPDSystemStatus from "./Pages/SystemStatus";

class OP3General {
    constructor() {
        this.menus = null;
        this.pages = {};
        this.globalElements = {};
        this.mainMenu = this.createMovingBorderMenu('.op3-main-menu');

        this.pages.dashboard = new OP3Dashboard();
        this.pages.systemStatus = new OPDSystemStatus();
        this['jQueryInit']();
    }

    /**
     * jQuery initialization
     */
    ['jQueryInit']() {
        let _this = this;
        let $ = jQuery;

        $(document).ready(() => {
            _this.menus = new Menus($);
        });
    }

    /**
     * Get default options for dialog
     *
     * @return {Object}
     */
    get dialogOptions() {
        return OP3Dialog.dialogOptions;
    }

    /**
     * Get jquery-confirm dialog
     *
     * @return {$.dialog}
     */
    get dialog() {
        return OP3Dialog.dialog;
    }

    /**
     * Get jquery-confirm confirm
     *
     * @return {$.confirm}
     */
    get confirm() {
        return OP3Dialog.confirm;
    }

    /**
     * Get jquery-confirm alert
     *
     * @return {$.alert}
     */
    get alert() {
        return OP3Dialog.alert;
    }

    /**
     * Get screenshot constructor
     *
     * @return {OP3Screenshot}
     */
    get Screenshot() {
        return OP3Screenshot;
    }

    /**
     * Create dialog with alert display type
     *
     * @param {string} title
     * @param {string} content
     * @param {string} redirectUrl
     * @return {$.dialog}
     */
    createAlert(title, content, redirectUrl = '') {
        return OP3Dialog.createAlert(title, content, redirectUrl);
    }

    /**
     * Create dialog with success display type
     *
     * @param {string} title
     * @param {string} content
     * @param {string} redirectUrl
     * @return {$.dialog}
     */
    createSuccess(title, content, redirectUrl = '') {
        return OP3Dialog.createSuccess(title, content, redirectUrl);
    }

    /**
     * Creates Moving Border Menu
     *
     * @param {string} selector
     * @param {boolean} preventClick
     * @return {MovingBorderMenu}
     */
    createMovingBorderMenu(selector, preventClick = false) {
        return new MovingBorderMenu(selector, preventClick);
    }

    /**
     * Creates Collapsible Menu
     *
     * @param {string} selector
     * @return {CollapsibleMenu}
     */
    createCollapsibleMenu(selector) {
        return new CollapsibleMenu(selector);
    }

    /**
     * Creates Wallop Slider
     *
     * @param {string} sliderSelector
     * @param {jQuery} $
     * @param {boolean} autoResize
     * @return {OP3WallopSlider}
     */
    createWallopSlider(sliderSelector, $, autoResize = false) {
        return new OP3WallopSlider(sliderSelector, $, autoResize)
    }

    /**
     * Creates Wallop Slider
     *
     * @param {string} sliderSelector
     * @param {jQuery} $
     * @param {boolean} autoResize
     * @return {OP3WallopSlider}
     */
    createWallopAjaxSlider(sliderSelector, $, autoResize = false) {
        return new OP3WallopAjaxSlider(sliderSelector, $, autoResize)
    }

    /**
     * Creates image that is scrolling down when image is bigger then container
     *
     * @param {string} selector
     * @param {jQuery} $
     * @return {OP3MovingImage}
     */
    createMovingImage(selector, $) {
        return new OP3MovingImage(selector, $);
    }

    /**
     * Copy text to clipboard.
     *
     * It would be better to use Clipboard API, but this
     * requires browser permission "clipboardRead" and
     * "clipboardWrite".
     * So we're using fallback, an execCommand() here:
     * create temporary HTMLInputElement, set value,
     * select text, copy text to clipboard and destroy
     * element.
     * That means that using this command we will remove
     * window selection range (if exist).
     *
     * Warning: this may not work if the command is not
     * executed with user interaction (chrome allows it,
     * but firefox throws warning). So make sure you use
     * this method inside some click (or any other user
     * interacted) handler.
     *
     * @param  {String} text
     * @return {Void}
     */
     copyTextToClipboard(text, $) {
        $('<input >')
            .css({
                position: 'absolute',
                top: '0',
                left: '0',
                fontSize: 1,
                opacity: '0',
            })
            .val(text || '')
            .appendTo('body')
            .select()
            .each((index, element) => {
                element.ownerDocument.execCommand('copy');
            })
            .remove();
    }

     /**
     * Check if OP3 license is valid
     *
     * @return {Boolean}
     */
    isLicenseValid() {
        if (!this._license)
            this._license = new OP3License();

        return this._license.validate();
    }

    /**
     * Check if OP3 license is valid, show popup modal
     * on invalid one.
     *
     * @return {Boolean}
     */
    checkLicense() {
        if (this.isLicenseValid())
            return true;

        return this._license.check();
    }
}

export default OP3General;

window.OP3General = new OP3General();
/** @todo - Remove when moving JS to OP Builder */
window.OP3General.pages.builder = new OP3Builder();
