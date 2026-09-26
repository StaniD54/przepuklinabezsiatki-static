/**
 * OptimizePress3 app.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * window.OP3.Media object
     *
     * @type {Object}
     */
    var that = {

        /**
         * window.wp object searched through
         * iframe parents (in autoinit)
         *
         * @type {Object}
         */
        _wp: null,

        /**
         * Modal default settings
         *
         * @type {Object}
         */
        _settings: {
            className: "media-frame op3-modal op3-modal-media",
            library: {
                type: "all",
            },
            title: "Select or Upload Media",
            button: {
                text: "Use this media",
            },
            frame: "post",
            multiple: false,
        },

        /**
         * Show WP media modal
         *
         * @param  {Object}   options
         * @param  {Function} callback
         * @return {Void}
         */
        _modal: function(options, callback) {
            if (!that._wp)
                return;
            var frame = that._wp.media(options);

            frame
                .on("open", function() {
                    setTimeout(function() {
                        // select last tab
                        frame.modal.$el
                            .find(".media-frame-router .media-menu-item")
                            .last()
                                .click();

                        // select correct "filter media" value
                        var $filter = frame.modal.$el.find(".media-frame-content #media-attachment-filters");
                        if (options.library && $filter.val() !== options.library.type)
                            $filter
                                .val(options.library.type);
                    });

                    // preselect file(s)
                    // @todo - this is not working as expected,
                    // (disabling all) -> file is selected, but
                    // options in sidebar (attachment display
                    // settings) are not rendered well
                    //var attid = undefined;
                    //var attach = this.attachment(attid);
                    //frame.state().get("selection").add(attach);
                    //
                    // addition: use something like this
                    //var selection = frame.state().get( 'selection' );
                    //selection.reset( attid ? [ wp.media.attachment(attid) ] : [] );
                })
                .on("select", function() {
                    var state = frame.state(),
                        attach = null;
                    if (state.props)
                        attach = state.props.toJSON();
                    else
                        attach = state.get("selection").first().toJSON();

                    if (typeof callback === "function")
                        callback.call(this, attach);
                })
                .on("insert", function() {
                    var attach = frame.state().get("selection").first().toJSON();
                    attach.settings = {};
                    frame.$el.find(".attachment-display-settings [data-setting]:not(.hidden)").each(function() {
                        attach.settings[$(this).attr("data-setting")] = $(this).val();
                    });

                    if (typeof callback === "function")
                        callback.call(this, attach);
                })
                .open();
        },

        modalSelect: function(callback) {
            return that._modal({
                className: "media-frame op3-modal op3-modal-media op3-modal-media-select",
                frame: "select",
                multiple: false,
                title: "Select or Upload Media",
                button: {
                    text: "Use this media",
                },
            }, callback);
        },

        modalImage: function(callback) {
            return that._modal({
                className: "media-frame op3-modal op3-modal-media op3-modal-media-image",
                frame: "post",
                library: {
                    type: "image",
                },
                multiple: false,
            }, callback);
        },

        modalVideo: function(callback) {
            return that._modal({
                className: "media-frame op3-modal op3-modal-media op3-modal-media-video",
                frame: "post",
                library: {
                    type: "video",
                },
                multiple: false,
            }, callback);
        },

        modalAudio: function(callback) {
            return that._modal({
                className: "media-frame op3-modal op3-modal-media op3-modal-media-audio",
                frame: "post",
                library: {
                    type: "audio",
                },
                multiple: false,
            }, callback);
        },

    }

    // globalize
    window.OP3.Media = that;

    // autoinit
    $(function() {
        try {
            var win = window;
            while ((!win.wp || !win.wp.media) && win.parent !== win) {
                win = win.parent;
            }

            that._wp = win.wp || null;
        }
        catch(e) {
            // crossdomain
        }
    });

})(jQuery, window, document);
