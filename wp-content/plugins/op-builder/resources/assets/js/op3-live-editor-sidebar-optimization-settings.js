/**
 * OptimizePress3 live editor extension:
 * Sidebar special properties for manipulating
 * page title, desc, template, status and featured image.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-storage.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 *     - op3-query.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * OPD optimization settings object
     *
     * @type {Object}
     */
    var optimizationSettings = null;

    /**
     * Disable OPD optimization settings change flag
     *
     * @type {Boolean}
     */
    var disableOptimizationSettingsChange = false;

    /**
     * Optimization settings inputs
     *
     * @type {Object}
     */
    var $input = $(null);

    /**
     * Optimization property exists
     *
     * @param  {String}  prop
     * @return {Boolean}
     */
    var _optimizationPropExists = function(prop) {
        var option = optimizationSettings[prop];

        return true
            && option !== null
            && typeof option !== 'undefined';
    }

    /**
     * Option render
     *
     * @param  {Object} e
     * @param  {Object} o
     * @return {Void}
     */
    var _renderDocument = function(e, o) {
        if (!optimizationSettings || typeof optimizationSettings !== "object")
            return;
        if (!Object.keys(optimizationSettings).filter(function(key) { return _optimizationPropExists(key); }).length)
            return

        var $group = $(OP3.$.templating(OP3.DocumentOptions._template.group(), {
                id: "optimization-settings",
                label: "Page Optimizations",
                reset: false,
            }))
            .addClass("op3-element-options-group-child-preserve");
        var $optimizeSettingsWrapper = $('<div class="optimization-settings" />')
            .appendTo($group);

        // Enqueue Assets
        if (_optimizationPropExists('enqueue_assets')) {
            $('<p />')
                .addClass('op3-element-options-description')
                .html("Control how the various scripts and stylesheets are loaded on your OptimizePress pages. Note that you can not set <i>JS Other</i> defer, if <i>JS</i> is not set to defer as well.")
                .appendTo($optimizeSettingsWrapper);

            var $enqueueAssetsCssOp = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsCssOp">' +
                '<div class="op3-element-options-label-group">' +
                '<label>CSS</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[css_op]" data-property-type="boolean">' +
                '<option value="0">External</option>' +
                '<option value="1">Internal</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.css_op === "internal" ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsCssOp);

            var $enqueueAssetsCssDeps = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsCssDeps">' +
                '<div class="op3-element-options-label-group">' +
                '<label>CSS Dependencies</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[css_deps]" data-property-type="boolean">' +
                '<option value="0">External</option>' +
                '<option value="1">Internal</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.css_deps === "internal" ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsCssDeps);

            var $enqueueAssetsJsOp = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsJsOp">' +
                '<div class="op3-element-options-label-group">' +
                '<label>JS</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[js_op]" data-property-type="boolean">' +
                '<option value="0">Normal</option>' +
                '<option value="1">Defer</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.js_op === "external_defer" ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsJsOp);

            var $enqueueAssetsJsOther = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsJsOther">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Other JS</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[js_other]" data-property-type="boolean">' +
                '<option value="0">Normal</option>' +
                '<option value="1">Defer</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.js_other === "external_defer" ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsJsOther);

            var $enqueueAssetsJsDelay = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsJsDelay">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Delay JS Execution</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[js_delay]" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.js_delay ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsJsDelay);

            var $enqueueAssetsSvgOp = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsSvgOp">' +
                '<div class="op3-element-options-label-group">' +
                '<label>SVG Icons</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[svg_op]" data-property-type="boolean">' +
                '<option value="0">External</option>' +
                '<option value="1">Internal</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.svg_op === "internal" ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsSvgOp);

            //var $loadStripeCode = $(
            //    '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsLoadStripeCode">' +
            //    '<div class="op3-element-options-label-group">' +
            //    '<label>Load Stripe code only on checkout pages.</label>' +
            //    '<span class="alert"></span>' +
            //    '</div>' +
            //    '</div>')
            //    .appendTo($optimizeSettingsWrapper);
            //$('<select name="load_stripe_scripts" data-property-type="boolean">' +
            //    '<option value="0">Off</option>' +
            //    '<option value="1">On</option>' +
            //    '</select>')
            //    .val(optimizationSettings.load_stripe_scripts ? "1" : "0")
            //    .on("change", _optimizationSettingsChange)
            //    .appendTo($loadStripeCode);

            var $enqueueAssetsDisableEmojis = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsDisableEmojis">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Disable Emojis</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[disable_emojis]" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.disable_emojis ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsDisableEmojis);

            var $enqueueAssetsDisableEmbeds = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueAssetsDisableEmbeds">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Disable Embeds</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_assets[disable_embeds]" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_assets.disable_embeds ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueAssetsDisableEmbeds);
        }

        // Enqueue Google Fonts
        if (_optimizationPropExists('enqueue_google_fonts')) {
            $('<p />')
                .addClass('op3-element-options-description')
                .html("Customize the loading of Google fonts on your OptimizeBuilder pages.")
                .appendTo($optimizeSettingsWrapper);

            var $enqueueGoogleFontsPreload = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueGoogleFontsPreload">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Preload</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_google_fonts[preload]" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_google_fonts.preload ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueGoogleFontsPreload);

            var $enqueueGoogleFontsAppendTo = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueGoogleFontsAppendTo">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Append Stylesheet to</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_google_fonts[append_to]" data-property-type="boolean">' +
                '<option value="0">Body</option>' +
                '<option value="1">Head</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_google_fonts.append_to === "head" ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueGoogleFontsAppendTo);

            var $enqueueGoogleFontsFontDisplay = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEnqueueGoogleFontsFontDisplay">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Font Display</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="enqueue_google_fonts[font_display]" data-property-type="boolean">' +
                '<option value="0">Optional</option>' +
                '<option value="1">Swap</option>' +
                '</select>')
                .val(optimizationSettings.enqueue_google_fonts.font_display === "swap" ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($enqueueGoogleFontsFontDisplay);
        }

        // Image Optimizer
        if (_optimizationPropExists('image_optimizer')) {
            $('<p />')
                .addClass('op3-element-options-description')
                .html("The <code>picture</code> element contains zero or more <code>source</code> elements and one <code>img</code> element to offer alternative versions of an image for different display/device scenarios. That means that we can optimize rendering our images by adding multiple sources and let browser render most optimal one.")
                .appendTo($optimizeSettingsWrapper);
            var $imageOptimizer = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsImageOptimizer">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Use next generation image format (if exists)</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="image_optimizer" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.image_optimizer ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($imageOptimizer);
        }

        // Progressive Hero Background Assets
        if (_optimizationPropExists('viewport_progressive_images_assets')) {
            $('<p />')
                .addClass('op3-element-options-description')
                .html("Instead of rendering images on page load, we can serve small, blured placeholder. This will preserve bandwidth and speedup loading time. The placeholder will be replaced with original image on first user interaction.<br /><strong>Important:</strong> This rule applies only to images on first two sections (elements in viewport). For other images use Lazy Loading option.")
                .appendTo($optimizeSettingsWrapper);

            var $viewportProgressiveImagesAssetsDesktop = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="viewportProgressiveImagesAssetsDesktop">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Desktop</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="viewport_progressive_images_assets[desktop]" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.viewport_progressive_images_assets.desktop ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($viewportProgressiveImagesAssetsDesktop);

            var $viewportProgressiveImagesAssetsTablet = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="viewportProgressiveImagesAssetsTablet">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Tablet</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="viewport_progressive_images_assets[tablet]" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.viewport_progressive_images_assets.tablet ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($viewportProgressiveImagesAssetsTablet);

            var $viewportProgressiveImagesAssetsMobile = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="viewportProgressiveImagesAssetsMobile">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Mobile</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="viewport_progressive_images_assets[mobile]" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.viewport_progressive_images_assets.mobile ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($viewportProgressiveImagesAssetsMobile);
        }

        // Lazy Load Assets
        if (_optimizationPropExists('lazy_load_assets')) {
            $('<p />')
                .addClass('op3-element-options-description')
                .html("Lazy loading images will delay the loading of off-screen image assets until your visitor interacts with the page and scrolls within a certain distance of these images. This can help prevent blocking time in page speed tests and speed up initial loading.")
                .appendTo($optimizeSettingsWrapper);
            $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsLazyLoadAssets">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Lazy Loading</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '<div class="op3-element-options-radio-group">' +
                '<label>' +
                '<input type="radio" name="lazy_load_assets" value="default" ' + (optimizationSettings.lazy_load_assets === "default" ? "checked " : "") + '/>' +
                '<span>Off</span>' +
                '</label>' +
                '<label>' +
                '<input type="radio" name="lazy_load_assets" value="native" ' + (optimizationSettings.lazy_load_assets === "native" ? "checked " : "") + '/>' +
                '<span>Native Lazy Load</span>' +
                '</label>' +
                '<label>' +
                '<input type="radio" name="lazy_load_assets" value="native+js" ' + (optimizationSettings.lazy_load_assets === "native+js" ? "checked " : "") + '/>' +
                '<span>Native Lazy Load with JS Fallback</span>' +
                '</label>' +
                '<label>' +
                '<input type="radio" name="lazy_load_assets" value="js" ' + (optimizationSettings.lazy_load_assets === "js" ? "checked " : "") + '/>' +
                '<span>JS Lazy Load</span>' +
                '</label>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper)
                .find("[name]")
                    .on("change", _optimizationSettingsChange);
        }

        // Embed Video Facade Assets
        if (_optimizationPropExists('embed_video_facade_assets')) {
            $('<p />')
                .addClass('op3-element-options-description')
                .html("Third-party resources are often used for displaying videos. The default approach is to load third-party resources as soon as the page loads, but this can unnecessarily slow the page load. If the third-party content is not critical, this performance cost can be reduced by lazy loading it. We can use facade in place of the third-party content until the user interacts with it. Instead of adding a third-party embed directly to our HTML, we're gonna load the page with a static element that looks similar to the actual embedded third-party, and replace it with the third-party product on click.")
                .appendTo($optimizeSettingsWrapper);
            var $embedVideoFacade = $(
                '<div class="op3-element-options-property" data-op3-element-options-property-id="optimizationSettingsEmbedVideoFacade">' +
                '<div class="op3-element-options-label-group">' +
                '<label>Use Embed Video Facade</label>' +
                '<span class="alert"></span>' +
                '</div>' +
                '</div>')
                .appendTo($optimizeSettingsWrapper);
            $('<select name="embed_video_facade_assets" data-property-type="boolean">' +
                '<option value="0">Off</option>' +
                '<option value="1">On</option>' +
                '</select>')
                .val(optimizationSettings.embed_video_facade_assets ? "1" : "0")
                .on("change", _optimizationSettingsChange)
                .appendTo($embedVideoFacade);
        }

        $('<button type="button">Reset to Defaults</button>')
            .on("click", _optimizationSettingsReset)
            .appendTo($optimizeSettingsWrapper);

        // Append to sidebar
        $(o.parent)
            .find(".op3-element-options-group")
            .first()
            .after($group);

        $input = $group.find("[name]");
    }

    /**
     * Refresh data:
     * sync optimizationSettings object with DOM elements.
     *
     * @return {Void}
     */
    var _refreshData = function() {
        var $result = $(null);

        disableOptimizationSettingsChange = true;

        $input.each(function() {
            var $node = $(this);
            var key = $node.attr("name");
            var value = null;

            value = optimizationSettings;
            key
                .split(/\]|\[/)
                .filter(function(item) {
                    return item;
                })
                .forEach(function(item) {
                    if (typeof value === "undefined")
                        return;

                    if (item in value)
                        value = value[item];
                    else
                        value = undefined;
                });

            if (typeof value === "undefined")
                return;

            var valueReal = value,
                isBoolean = false
                    || key === "enqueue_assets[js_delay]"
                    || /^enqueue_assets\[disable_/.test(key)
                    || key === "enqueue_google_fonts[preload]"
                    || key === "image_optimizer"
                    || key === "embed_video_facade_assets"
                    || /^viewport_progressive_images_assets/.test(key);
            if (/^enqueue_assets\[css_/.test(key) && value === "external")
                valueReal = "0";
            else if (/^enqueue_assets\[css_/.test(key) && value === "internal")
                valueReal = "1";
            else if (/^enqueue_assets\[js_(op|deps|other)/.test(key) && value === "external")
                valueReal = "0";
            else if (/^enqueue_assets\[js_(op|deps|other)/.test(key) && value === "external_defer")
                valueReal = "1";
            else if (/^enqueue_assets\[svg_/.test(key) && value === "external")
                valueReal = "0";
            else if (/^enqueue_assets\[svg_/.test(key) && value === "internal")
                valueReal = "1";
            else if (key === "enqueue_google_fonts[append_to]" && value === "head")
                valueReal = "1";
            else if (key === "enqueue_google_fonts[append_to]" && value === "body")
                valueReal = "0";
            else if (key === "enqueue_google_fonts[font_display]" && value === "swap")
                valueReal = "1";
            else if (key === "enqueue_google_fonts[font_display]" && value === "optional")
                valueReal = "0";
            else if (isBoolean)
                valueReal = value ? "1" : "0";

            if ($node.is('[type="radio"]')) {
                if ($node.attr("name") === key && $node.attr("value") === valueReal && !$node.prop("checked")) {
                    $node.prop("checked", true)
                        .trigger("change");

                    $result = $result.add($node);
                }
            }
            else {
                if ($node.val() !== valueReal) {
                    $node
                        .val(valueReal)
                        .trigger("change");

                    $result = $result.add($node);
                }
            }
        });

        disableOptimizationSettingsChange = false;

        return $result;
    }

    /**
     * OPD optimization settings change change event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _optimizationSettingsChange = function(e) {
        if (disableOptimizationSettingsChange)
            return;

        var $target = $(e.target);
        var key = $target.attr("name");
        var value = $target.val();
        var data = {
            "ID": OP3.Meta.pageId,
        }

        // value to real value
        if (/^enqueue_assets\[css_/.test(key) && value === "0")
            data[key] = "external";
        else if (/^enqueue_assets\[css_/.test(key) && value === "1")
            data[key] = "internal";
        else if (/^enqueue_assets\[js_(op|deps|other)/.test(key) && value === "0")
            data[key] = "external";
        else if (/^enqueue_assets\[js_(op|deps|other)/.test(key) && value === "1")
            data[key] = "external_defer";
        else if (/^enqueue_assets\[svg_/.test(key) && value === "0")
            data[key] = "external";
        else if (/^enqueue_assets\[svg_/.test(key) && value === "1")
            data[key] = "internal";
        else if (key === "enqueue_google_fonts[append_to]" && value === "0")
            data[key] = "body";
        else if (key === "enqueue_google_fonts[append_to]" && value === "1")
            data[key] = "head";
        else if (key === "enqueue_google_fonts[font_display]" && value === "0")
            data[key] = "optional";
        else if (key === "enqueue_google_fonts[font_display]" && value === "1")
            data[key] = "swap";
        else
            data[key] = value;

        // validate (you can not set JS Other defer,
        // if JS is not set to defer as well)
        var $enqueueAssetsJsOpInput = $input.filter('[name="enqueue_assets[js_op]"]');
        var $enqueueAssetsJsOtherInput = $input.filter('[name="enqueue_assets[js_other]"]');
        var triggerJsOtherExternal = true
            && $target.is($enqueueAssetsJsOpInput)
            && data[key] === "external"
            && $enqueueAssetsJsOtherInput.val() === "1";
        var triggerJsOpExternalDefer = true
            && $target.is($enqueueAssetsJsOtherInput)
            && data[key] !== "external"
            && $enqueueAssetsJsOpInput.val() === "0";
        if (triggerJsOtherExternal || triggerJsOpExternalDefer) {
            disableOptimizationSettingsChange = true;

            if (triggerJsOtherExternal) {
                data["enqueue_assets[js_other]"] = "external";
                $enqueueAssetsJsOtherInput
                    .val("0")
                    .trigger("change");
                $target = $target.add($enqueueAssetsJsOtherInput);
            }
            if (triggerJsOpExternalDefer) {
                data["enqueue_assets[js_op]"] = "external_defer";
                $enqueueAssetsJsOpInput
                    .val("1")
                    .trigger("change");
                $target = $target.add($enqueueAssetsJsOpInput);
            }

            disableOptimizationSettingsChange = false;
        }

        // api request (save)
        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/optimization-settings",
            method: "post",
            data: JSON.stringify(data),
            success: function(data, textStatus, jqXHR) {
                optimizationSettings = data.data;

                _alert($target.add(_refreshData()), "success");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                _refreshData();
                _alert($target, "error");
            },
        });
    }

    /**
     * Page enqueue assets reset event handler
     *
     * @param  {Object} e
     * @return {Void}
     */
    var _optimizationSettingsReset = function(e) {
        var $target = $(e.target).closest(".optimization-settings").find("[name]");
        var data = {
            "ID": OP3.Meta.pageId,
        }

        $target.each(function() {
            data[$(this).attr("name")] = "";
        });

        OP3.Ajax.request({
            url: "pages/" + OP3.Meta.pageId + "/optimization-settings",
            method: "post",
            data: JSON.stringify(data),
            success: function(data, textStatus, jqXHR) {
                optimizationSettings = data.data;

                _alert(_refreshData(), "success");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                _refreshData();
                _alert($target, "error");
            },
        });
    }

    /**
     * Display response api message for page properties
     *
     * @param {Object} $node
     * @param {String} status
     * @return {Void}
     */
    var _alert = function($node, status) {
        var nodeClass = "alert-" + status;
        var $alert = $node
            .closest(".op3-element-options-property")
            .find(".alert")
            .addClass(nodeClass);
        setTimeout(function () {
            $alert.removeClass(nodeClass);
        }, 3000);
    }

    // init
    OP3.bind("elementoptionsformrender::document", _renderDocument);

    // import page templates from initial ajax request
    OP3.bind("loadajaxinit", function(e, o) {
        optimizationSettings = o.optimization_settings;
    });

})(jQuery, window, document);
