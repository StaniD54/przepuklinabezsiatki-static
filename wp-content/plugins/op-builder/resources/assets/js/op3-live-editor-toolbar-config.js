/**
 * OptimizePress3 live-editor extension
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-query.js
 *     - op3-live-editor.js
 *     - op3-live-editor-toolbar.js
 */
;(function($, window, document) {

    "use strict";

    // set configuration for each element type
    window.OP3.Toolbar._config = function() {
        var result = {
            arrow: {
                nav: [
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "size",
                        label: OP3._("Size Options"),
                        icon: "op3-icon-size-large-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Size"),
                                property: [ "height", "transformRotate", "transformFlipX" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            audio: {
                nav: [
                    {
                        id: "audio",
                        label: OP3._("Audio Player"),
                        icon: "op3-icon-note-03-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Source"),
                                property: [ "src", "loop", "autoplay" ],
                            },
                        ],
                    },
                    {
                        id: "audio-download",
                        label: OP3._("Download Icon Styling"),
                        icon: "op3-icon-square-download-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Download Styling"),
                                property: [ "audioDownload", "color", 'fontSize' ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            breadcrumbtrail: {
                nav: [
                    {
                        id: "breadcrumbtrail",
                        label: OP3._("Breadcrumb Trail"),
                        icon: "op3-icon-minimal-right",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon Settings"),
                                property: [ "op3Icon", "iconFontSize", "iconSpacingRight", "iconVerticalPosition" ],
                            },
                            {
                                label: OP3._("Icon Colour"),
                                property: [ "iconColor" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Inactive Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Active Colour"),
                                property: [ "colorActive" ],
                            },
                            {
                                label: OP3._("Hover Colour"),
                                property: [ "colorHover" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "alignItems", "justifyContent", "alignItemsMobile", "stackColumnsDesktop", "stackColumnsTablet", "stackColumnsMobile" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            bulletblock: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Bullet List"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "bulletblock", "bulletlist" ],
                    },
                    {
                        id: "bulletblock",
                        label: OP3._("Bullet Block Options"),
                        icon: "op3-icon-bullet-list-69",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "bulletblockMedia" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            bulletlist: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Bullet List"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "bulletblock", "bulletlist" ],
                    },
                    {
                        id: "bullet-list",
                        label: OP3._("Bullet List"),
                        icon: "op3-icon-list-bullet-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Bullet List Settings"),
                                property: [ "op3Icon", "src", "fontSize", "marginBottom", "iconFontSize", "iconSpacing", "iconVerticalPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Icon Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Size"),
                                                property: [ "iconFontSize" ],
                                            },
                                            {
                                                label: OP3._("Spacing"),
                                                property: [ "iconSpacing" ],
                                            },
                                            {
                                                label: OP3._("Vertical Position"),
                                                property: [ "iconVerticalPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon Colour"),
                                property: [ "iconColor" ],
                            },
                            {
                                label: OP3._("Background Colour"),
                                property: [ "backgroundColor" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "selectMediaFile", "href", "target", "popOverlayTrigger", "relNoFollow", "createVideoPopoverlay", "createPopoverlay", "selectHrefTarget", "smoothScroll" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon Colour"),
                                property: [ "iconColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "toggleSidebar",
                    },
                ],
            },
            button: {
                nav: [
                    {
                        id: "product",
                        label: OP3._("Upsell/Downsell Options"),
                        icon: "op3-icon-link-2-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Upsell/Downsell"),
                                property: [ "productId" ],
                            },
                        ],
                    },
                    {
                        id: "button",
                        label: OP3._("Button Settings"),
                        icon: "op3-icon-button-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Sizing"),
                                property: [ "buttonSize", "maxWidth", "height" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "visible", "op3Icon", "iconSize", "iconDirection", "iconSpacing", "iconColor" ],
                                filter: [
                                    {
                                        label: OP3._("Icon Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Size"),
                                                property: [ "iconSize" ],
                                            },
                                            {
                                                label: OP3._("Position"),
                                                property: [ "iconDirection" ],
                                            },
                                            {
                                                label: OP3._("Spacing"),
                                                property: [ "iconSpacing" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Subtext"),
                                property: [ "subtextVisible", "fontWeightSubtext", "fontStyleSubtext", "textTransformSubtext", "textDecorationSubtext", "fontSizeSubtext", "letterSpacingSubtext", "offsetXSubtext", "offsetYSubtext" ],
                                filter: [
                                    {
                                        label: OP3._("Subtext Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Styling"),
                                                property: [ "fontWeightSubtext", "fontStyleSubtext", "textTransformSubtext", "textDecorationSubtext" ],
                                            },
                                            {
                                                label: OP3._("Sizing"),
                                                property: [ "fontSizeSubtext", "letterSpacingSubtext" ],
                                            },
                                            {
                                                label: OP3._("Position"),
                                                property: [ "offsetXSubtext", "offsetYSubtext" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration", "textShadow" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "alignItemsText" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderPresets", "borderRadiusPresets" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Inner Shadow"),
                                property: [ "boxShadowInsetPresets" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "selectMediaFile", "href", "target", "relNoFollow", "popOverlayTrigger", "selectFunnelStep", "createVideoPopoverlay", "createPopoverlay", "selectHrefTarget", "smoothScroll" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Hover State"),
                                property: [ "transitionDuration", "filterBrightnessHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            cart: {
                nav: [
                    {
                        id: "product",
                        label: OP3._("Checkout Options"),
                        icon: "op3-icon-cart-in-9-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Checkout"),
                                property: [ "productId" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Cart"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Cart Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            calendly: {
                nav: [
                    {
                        id: "calendly",
                        label: OP3._("Calendly Embed"),
                        icon: "op3-icon-opening-times-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Calendly Embed Options"),
                                property: [ "calendlyUrl" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Calendly Colour Options"),
                                property: [ "calendlyUrlBackgroundColor", "calendlyUrlTextColor", "calendlyUrlButtonAndLinkColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            cartdownload: {
                nav: [
                    {
                        id: "cartdownload",
                        label: OP3._("Cart Download"),
                        icon: "op3-icon-square-download-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Cart Download"),
                                property: [ "toggleStatusError" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ 'marginTop', 'marginBottom' ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            cartdownloaditem: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            cartsummary: {
                nav: [
                    {
                        id: "cartdownload",
                        label: OP3._("Cart Summary"),
                        icon: "op3-icon-box-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Cart Summary"),
                                property: [ "toggleStatusError" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Section"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "form-borders",
                        label: OP3._("Form Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ 'marginTop', 'marginBottom' ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            checkbox: {
                nav: [
                    {
                        id: "input-settings",
                        label: OP3._("Checkbox Settings"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Input"),
                                property: [ "required", "checked", "checkedLock", "widthCalcColumns" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconVisible", "blink", "op3Icon", "iconFontSize", "iconSpacing" ],
                            },
                            {
                                label: OP3._("Label"),
                                property: [ "labelSpacing" ],
                            },
                            {
                                label: OP3._("Validation"),
                                property: [ "urlMapping", "inputValidationMessage" ],
                            },
                        ],
                    },
                    {
                        id: "checkmark",
                        label: OP3._("Checkmark Options"),
                        icon: "op3-icon-check-square-09-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Position"),
                                property: [ "checkmarkSize", "checkboxPosition" ],
                            },
                            {
                                label: OP3._("Colours"),
                                property: [ "checkmarkBackgroundColorUnchecked", "checkmarkBackgroundColorChecked", "checkmarkColor" ],
                            },
                            {
                                label: OP3._("Borders"),
                                property: [ "checkmarkBorderTopWidth", "checkmarkBorderTopStyle", "checkmarkBorderTopColor", "checkmarkBorderRightWidth", "checkmarkBorderRightStyle", "checkmarkBorderRightColor", "checkmarkBorderBottomWidth", "checkmarkBorderBottomStyle", "checkmarkBorderBottomColor", "checkmarkBorderLeftWidth", "checkmarkBorderLeftStyle", "checkmarkBorderLeftColor", "checkmarkBorderTopLeftRadius", "checkmarkBorderTopRightRadius", "checkmarkBorderBottomRightRadius", "checkmarkBorderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Checked Borders"),
                                property: [ "checkmarkBorderTopWidthChecked", "checkmarkBorderTopStyleChecked", "checkmarkBorderTopColorChecked", "checkmarkBorderRightWidthChecked", "checkmarkBorderRightStyleChecked", "checkmarkBorderRightColorChecked", "checkmarkBorderBottomWidthChecked", "checkmarkBorderBottomStyleChecked", "checkmarkBorderBottomColorChecked", "checkmarkBorderLeftWidthChecked", "checkmarkBorderLeftStyleChecked", "checkmarkBorderLeftColorChecked", "checkmarkBorderTopLeftRadiusChecked", "checkmarkBorderTopRightRadiusChecked", "checkmarkBorderBottomRightRadiusChecked", "checkmarkBorderBottomLeftRadiusChecked" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColor" ],
                            },
                            {
                                label: OP3._("Checked Background"),
                                property: [ "backgroundColorChecked" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-brush-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor"],
                            },
                            {
                                label: OP3._("Checked Icon"),
                                property: [ "iconColorChecked"],
                            },
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Checked Label"),
                                property: [ "colorChecked"],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                ],
            },
            column: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            comments: {
                nav: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            contenttoggle: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Content Toggle Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "contenttoggle", "contenttoggleitem" ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "width" ],
                            },
                        ],
                    },
                    {
                        id: "contenttoggle",
                        label: OP3._("Content Toggle Options"),
                        icon: "op3-icon-ui-04-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Content Toggle Options"),
                                property: [ "closeOtherTabs" ]
                            }
                        ]
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            contenttoggleitem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Content Toggle Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "contenttoggle", "contenttoggleitem" ],
                    },
                    {
                        id: "contenttoggleitem",
                        label: OP3._("Content Toggle Item Options"),
                        icon: "op3-icon-ui-03-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Content Toggle Item Options"),
                                property: [ "marginBottom", "faqItemIconPosition" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Text Options"),
                                property: [ "fontFamily", "fontWeight", "fontSize" ],
                            },
                        ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Open / Close Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Open / Close Icon"),
                                property: [ "op3Icon", "op3Icon2", "fontSizeIcon" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Bg"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Content Bg"),
                                property: [ "backgroundImageContentType", "backgroundColorContent", "backgroundImageContentAngle", "backgroundImageContentPosition", "backgroundImageContentStartColor", "backgroundImageContentStartPosition", "backgroundImageContentStopColor", "backgroundImageContentStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },

                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Bg"),
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Content Bg"),
                                property: [ "backgroundImageContentHoverType", "backgroundColorContentHover", "backgroundImageContentHoverAngle", "backgroundImageContentHoverPosition", "backgroundImageContentHoverStartColor", "backgroundImageContentHoverStartPosition", "backgroundImageContentHoverStopColor", "backgroundImageContentHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon"),
                                 property: [ "iconColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [  ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            countdowntimer: {
                nav: [
                    {
                        id: "countdown",
                        label: OP3._("Countdown Settings"),
                        icon: "op3-icon-calendar-grid-61-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Countdown Settings"),
                                property: [ "dateTime", "countdownFinishAction", "redirectUrl", "editFinishText" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight", "unitsTextTransform" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "digitsFontSize", "unitsFontSize" ],
                            },
                            {
                                label: OP3._("Custom"),
                                property: [ "flexDirectionVertical", "wrapperMarginRight" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Digits Colour"),
                                property: [ "digitsColor" ],
                            },
                            {
                                label: OP3._("Units Colour"),
                                property: [ "unitsColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            counter: {
                nav: [
                    {
                        id: "counter",
                        label: OP3._("Counter Settings"),
                        icon: "op3-icon-countdown-34-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Counter Settings"),
                                property: [ "counterStart", "counterEnd", "counterAnimationDuration", "counterSeparator" ],
                            },
                            {
                                label: OP3._("Layout"),
                                property: [ "visiblePrefix", "spacingPrefix", "visibleSuffix", "spacingSuffix", "visibleTextAbove", "spacingTextAbove", "visibleTextBelow", "spacingTextBelow" ],
                            },
                        ],
                    },
                    {
                        id: "font",
                        label: OP3._("Font Settings"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Counter"),
                                property: [ "fontFamilyCounter", "fontWeightCounter", "fontSizeCounter", "lineHeightCounter", "letterSpacingCounter", "fontStyleCounter", "textTransformCounter", "textDecorationCounter" ],
                                filter: [
                                    {
                                        label: OP3._("Counter"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Font"),
                                                property: [ "fontFamilyCounter", "fontWeightCounter" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "fontSizeCounter", "lineHeightCounter", "letterSpacingCounter" ],
                                            },
                                            {
                                                label: OP3._("Styling"),
                                                property: [ "fontStyleCounter", "textTransformCounter", "textDecorationCounter" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Prefix"),
                                property: [ "fontFamilyPrefix", "fontWeightPrefix", "fontSizePrefix", "lineHeightPrefix", "letterSpacingPrefix", "fontStylePrefix", "textTransformPrefix", "textDecorationPrefix", ],
                                filter: [
                                    {
                                        label: OP3._("Counter Prefix"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Font"),
                                                property: [ "fontFamilyPrefix", "fontWeightPrefix" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "fontSizePrefix", "lineHeightPrefix", "letterSpacingPrefix" ],
                                            },
                                            {
                                                label: OP3._("Styling"),
                                                property: [ "fontStylePrefix", "textTransformPrefix", "textDecorationPrefix" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Suffix"),
                                property: [ "fontFamilySuffix", "fontWeightSuffix", "fontSizeSuffix", "lineHeightSuffix", "letterSpacingSuffix", "fontStyleSuffix", "textTransformSuffix", "textDecorationSuffix", ],
                                filter: [
                                    {
                                        label: OP3._("Counter Suffix"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Font"),
                                                property: [ "fontFamilySuffix", "fontWeightSuffix" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "fontSizeSuffix", "lineHeightSuffix", "letterSpacingSuffix" ],
                                            },
                                            {
                                                label: OP3._("Styling"),
                                                property: [ "fontStyleSuffix", "textTransformSuffix", "textDecorationSuffix" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Text Above"),
                                property: [ "fontFamilyTextAbove", "fontWeightTextAbove", "fontSizeTextAbove", "lineHeightTextAbove", "letterSpacingTextAbove", "fontStyleTextAbove", "textTransformTextAbove", "textDecorationTextAbove", ],
                                filter: [
                                    {
                                        label: OP3._("Text Above Counter"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Font"),
                                                property: [ "fontFamilyTextAbove", "fontWeightTextAbove" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "fontSizeTextAbove", "lineHeightTextAbove", "letterSpacingTextAbove" ],
                                            },
                                            {
                                                label: OP3._("Styling"),
                                                property: [ "fontStyleTextAbove", "textTransformTextAbove", "textDecorationTextAbove" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Text Below"),
                                property: [ "fontFamilyTextBelow", "fontWeightTextBelow", "fontSizeTextBelow", "lineHeightTextBelow", "letterSpacingTextBelow", "fontStyleTextBelow", "textTransformTextBelow", "textDecorationTextBelow", ],
                                filter: [
                                    {
                                        label: OP3._("Text Below Counter"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Font"),
                                                property: [ "fontFamilyTextBelow", "fontWeightTextBelow" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "fontSizeTextBelow", "lineHeightTextBelow", "letterSpacingTextBelow" ],
                                            },
                                            {
                                                label: OP3._("Styling"),
                                                property: [ "fontStyleTextBelow", "textTransformTextBelow", "textDecorationTextBelow" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "colorCounter", "colorPrefix", "colorSuffix", "colorTextAbove", "colorTextBelow", "colorIcon" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "visibleIcon", "op3Icon", "fontSizeIcon", "marginRightIcon" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "alignItems" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            creditcard: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Credit Card Element"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "creditcard", "creditcarditem" ],
                    },
                    {
                        id: "creditcard",
                        label: OP3._("Credit Cards"),
                        icon: "op3-icon op3-icon-credit-card-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Credit Cards"),
                                property: [ "creditCardsStyle", "width", "gutter" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            creditcarditem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Credit Card Element"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "creditcard", "creditcarditem" ],
                    },
                    {
                        id: "creditcarditem",
                        label: OP3._("Credit Card"),
                        icon: "op3-icon op3-icon-credit-card-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Credit Card"),
                                property: [ "codeHtmlCreditCardType" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            customhtml: {
                nav: [
                    {
                        id: "code",
                        label: OP3._("Custom HTML code"),
                        icon: "op3-icon-code-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Custom HTML code"),
                                property: [ "codeHtml" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            date: {
                nav: [
                    {
                        id: "date",
                        label: OP3._("Dynamic Date Options"),
                        icon: "op3-icon-calendar-grid-61-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Date Options"),
                                property: [ "dateTimeType", "dateTime", "intervalType", "timeInterval", "dateInterval", "dateCustomInterval", "dayInterval", "dateFormat", "timeFormat", "visible" ],
                            },
                            {
                                label: OP3._("Layout"),
                                property: [ "calendarVisible", "calendarStackedLayout", "dateStackedLayout", "timeVisible" ],
                            },
                            {
                                label: OP3._("Text Strings"),
                                property: [  "gutter2", "timezoneMarginLeft" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Calendar"),
                                property: [ "backgroundColor" ],
                            },
                            {
                                label: OP3._("Icons"),
                                property: [ "iconColor" ],
                            },
                        ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "dateIconVisible",  "op3Icon", "timeIconVisible", "op3Icon2", "iconSize", "iconSpacing" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "justifyContent", "alignItems" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "calendar-borders",
                        label: OP3._("Calendar Borders / Shadows"),
                        icon: "op3-icon-border-radius-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "calendarBorderTopWidth", "calendarBorderTopStyle", "calendarBorderTopColor", "calendarBorderRightWidth", "calendarBorderRightStyle", "calendarBorderRightColor", "calendarBorderBottomWidth", "calendarBorderBottomStyle", "calendarBorderBottomColor", "calendarBorderLeftWidth", "calendarBorderLeftStyle", "calendarBorderLeftColor", "calendarBorderTopLeftRadius", "calendarBorderTopRightRadius", "calendarBorderBottomRightRadius", "calendarBorderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "calendarBoxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "calendarBoxShadowAngle", "calendarBoxShadowDistance", "calendarBoxShadowBlur", "calendarBoxShadowSpread", "calendarBoxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            descriptionlist: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Description List Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "descriptionlist", "descriptionlistitem" ],
                    },
                    {
                        id: "descriptionlist",
                        label: OP3._("Description List Styling"),
                        icon: "op3-icon-recipe-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Description List Styling"),
                                property: [ "fieldLayoutDesktop", "fieldLayoutTablet", "fieldLayoutMobile", "split", "indent", "descriptionlistitemBottomSpacing" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Section"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "form-borders",
                        label: OP3._("Form Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            descriptionlistitem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Description List Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "descriptionlist", "descriptionlistitem" ],
                    },
                    {
                        id: "key-text",
                        label: OP3._("Key Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "value-text",
                        label: OP3._("Value Text Options"),
                        icon: "op3-icon-caps-small-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "valueFontFamily", "valueFontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "valueFontSize", "valueLineHeight", "valueLetterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "valueFontStyle", "valueTextTransform", "valueTextDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Key Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Value Text Colour"),
                                property: [ "valueColor" ],
                            },
                            {
                                label: OP3._("Background Colour"),
                                property: [ "backgroundColor" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "toggleSidebar",
                    },
                ],
            },
            evergreencountdowntimer: {
                nav: [
                    {
                        id: "evergreencountdowntimer",
                        label: OP3._("Evergreen Countdown Settings"),
                        icon: "op3-icon-calendar-grid-61-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Evergreen Countdown Settings"),
                                property: [ "uuid", "linkEvergreen", "day", "hour", "minute", "second", "countdownFinishAction", "editFinishText", "redirectUrl", "restartTimer", "restartDay", "restartHour" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight", "unitsTextTransform" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "digitsFontSize", "unitsFontSize" ],
                            },
                            {
                                label: OP3._("Custom"),
                                property: [ "flexDirectionVertical", "wrapperMarginRight" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Digits Colour"),
                                property: [ "digitsColor" ],
                            },
                            {
                                label: OP3._("Units Colour"),
                                property: [ "unitsColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            facebookbutton: {
                nav: [
                    {
                        id: "facebook-button",
                        label: OP3._("Button Settings"),
                        icon: "op3-icon-thumb-up-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Button Settings"),
                                property: [ "facebookLayout", "facebookWidth", "facebookAction", "facebookSize" ],
                            },
                            {
                                label: OP3._("Advanced Settings"),
                                property: [ "facebookHrefType", "facebookHref", "facebookColorscheme", "facebookShareProxy", "facebookFacesProxy" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            facebookcomments: {
                nav: [
                    {
                        id: "facebook-comments",
                        label: OP3._("Comments Settings"),
                        icon: "op3-icon-chat-33-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Comments Settings"),
                                property: [ "facebookNumposts", "facebookOrderby", "facebookHrefType", "facebookHref" ],
                            },
                            {
                                label: OP3._("Advanced Settings"),
                                property: [ "facebookColorscheme", "maxWidth"],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            faq: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Faq Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "faq", "faqitem" ],
                    },
                    {
                        id: "faq",
                        label: OP3._("Faq Options"),
                        icon: "op3-icon-ui-04-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Faq Options"),
                                property: [ "closeOtherTabs" ]
                            }
                        ]
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            faqitem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Faq Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "faq", "faqitem" ],
                    },
                    {
                        id: "faqitem",
                        label: OP3._("Faq Item Options"),
                        icon: "op3-icon-ui-03-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Faq Item Options"),
                                property: [ "marginBottom", "faqItemIconPosition" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Text Options"),
                                property: [ "fontFamily", "fontWeight", "fontSize" ],
                            },
                        ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Open / Close Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Open / Close Icon"),
                                property: [ "op3Icon", "op3Icon2", "fontSizeIcon" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Bg"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Content Bg"),
                                property: [ "backgroundImageContentType", "backgroundColorContent", "backgroundImageContentAngle", "backgroundImageContentPosition", "backgroundImageContentStartColor", "backgroundImageContentStartPosition", "backgroundImageContentStopColor", "backgroundImageContentStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Header Bg"),
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Content Bg"),
                                property: [ "backgroundImageContentHoverType", "backgroundColorContentHover", "backgroundImageContentHoverAngle", "backgroundImageContentHoverPosition", "backgroundImageContentHoverStartColor", "backgroundImageContentHoverStartPosition", "backgroundImageContentHoverStopColor", "backgroundImageContentHoverStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            featureblock: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Feature Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "featureblock", "featureblockitem" ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "wrapColumnsFlexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayMedia", "blockDisplayTitle", "blockDisplaySubtitle", "blockDisplayText", "blockDisplayButton" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            featureblockitem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Feature Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "featureblock", "featureblockitem" ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "columnGap", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            fieldset: {
                nav: [
                    {
                        id: "fieldset",
                        label: OP3._("Fieldset Label"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Fieldset Label"),
                                property: [ "labelVisible", "labelSpacing" ],
                            },
                            {
                                label: OP3._("Fieldset Layout"),
                                property: [ "flexDirectionVertical", "childWidth" ],
                            }
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Fieldset Label"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "fieldset-borders",
                        label: OP3._("Form Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "width" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            form: {
                nav: [
                    {
                        id: "integration",
                        label: OP3._("Integration Options"),
                        icon: "op3-icon-email-83-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Integration"),
                                property: [ "optinIntegration" ],
                            },
                        ],
                    },
                    {
                        id: "form",
                        label: OP3._("Form Styling"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Styling"),
                                property: [ "width", "optinFieldLayout", "alignItems" ],
                            },
                            {
                                label: OP3._("Field Sizing"),
                                property: [ "fieldWidthDefault", "fieldWidthDefaultInline", "spacing" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "form-borders",
                        label: OP3._("Form Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            contactform: {
                nav: [
                    {
                        id: "integration",
                        label: OP3._("Integration Options"),
                        icon: "op3-icon-email-83-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Integration"),
                                property: [ "optinIntegration" ],
                            },
                        ],
                    },
                    {
                        id: "form",
                        label: OP3._("Form Styling"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Styling"),
                                property: [ "width", "optinFieldLayout", "alignItems" ],
                            },
                            {
                                label: OP3._("Field Sizing"),
                                property: [ "fieldWidthDefault", "fieldWidthDefaultInline", "spacing" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "form-borders",
                        label: OP3._("Form Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            formsection: {
                nav: [
                    {
                        id: "formsection",
                        label: OP3._("Form Section Styling"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Section Styling"),
                                property: [ "width", "gridGap" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Section"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "form-borders",
                        label: OP3._("Form Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            googlemaps: {
                nav: [
                    {
                        id: "googlemaps",
                        label: OP3._("Google Maps"),
                        icon: "op3-icon-square-pin-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Map Options"),
                                property: [ "googlemapsTheme", "googlemapsZoom", "googlemapsScrollwheel", "googlemapsZoomControl", "googlemapsStreetViewControl", "googlemapsFullscreenControl" ],
                            },
                            {
                                label: OP3._("Marker Options"),
                                property: [ "googlemapsTitle", "googlemapsText", "googlemapsPosition" ],
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Change the marker position by dragging it or double-clicking on the map where you want to place it.") + '</div>',
                            }
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "height", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            googlemapssimple: {
                nav: [
                    {
                        id: "googlemapssimple",
                        label: OP3._("Google Maps"),
                        icon: "op3-icon-square-pin-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Map Options"),
                                property: [ "googlemapsSearch", "googlemapsZoom" ]
                            },
                            {
                                label: OP3._("Map Effects"),
                                property: [ "opacity100", "filterBrightness", "filterBlur", "filterContrast", "filterGrayscale", "filterSepia", "filterInvert", "filterSaturate" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadowHover" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowHoverAngle", "boxShadowHoverDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                            {
                                label: OP3._("Effects"),
                                property: [ "opacity100Hover", "filterBrightnessHover", "filterBlurHover", "filterContrastHover", "filterGrayscaleHover", "filterSepiaHover", "filterInvertHover", "filterSaturateHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "height", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            headline: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tag", "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColorOverlay" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "textShadowAngle", "textShadowDistance", "textShadowBlurRadius", "textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            horizontalline: {
                nav: [
                    {
                        id: "horizontal-line",
                        label: OP3._("Horizontal Line Settings"),
                        icon: "op3-icon-simple-delete-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Horizontal Line Settings"),
                                property: [ "borderTopStyle", "horizontalLineHeight", "maxWidth" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "horizontalLineColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            icon: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Icon Element"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "socialicons", "icon" ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "op3Icon", "fontSize", "lineHeight" ],
                            },
                            {
                                label: OP3._("Icon Background"),
                                property: [ "iconFrame", "iconShape", "padding", "borderWidth" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColor" ],
                            },
                            {
                                label: OP3._("Border"),
                                property: [ "borderColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "selectMediaFile", "href", "target", "relNoFollow", "popOverlayTrigger", "selectFunnelStep", "createVideoPopoverlay", "createPopoverlay", "selectHrefTarget", "smoothScroll" ]
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColorHover" ],
                            },
                            {
                                label: OP3._("Border"),
                                property: [ "borderColorHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "columnGapParent" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            image: {
                nav: [
                    {
                        id: "image",
                        label: OP3._("Image Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Image"),
                                property: [ "src", "attrWidth", "width", "gridTemplateColumnsImage", "title", "alt" ],
                            },
                            {
                                label: OP3._("Image Effects"),
                                property: [ "opacity100", "filterBrightness", "filterBlur", "filterContrast", "filterGrayscale", "filterSepia", "filterInvert", "filterSaturate" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Image Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "selectMediaFile", "href", "target", "relNoFollow", "popOverlayTrigger", "selectFunnelStep", "createVideoPopoverlay", "createPopoverlay", "selectHrefTarget", "smoothScroll" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundColorOverlayHover" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadowHover" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowHoverAngle", "boxShadowHoverDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                            {
                                label: OP3._("Effects"),
                                property: [ "opacity100Hover", "filterBrightnessHover", "filterBlurHover", "filterContrastHover", "filterGrayscaleHover", "filterSepiaHover", "filterInvertHover", "filterSaturateHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "columnGapParent" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            input: {
                nav: [
                    {
                        id: "input-settings",
                        label: OP3._("Input Settings"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "labelVisible", "labelSpacing" ],
                            },
                            {
                                label: OP3._("Input"),
                                property: [ "required", "value", "placeholder", "widthCalcColumns" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconVisible", "op3Icon", "iconFontSize", "iconSpacing", "iconFlexDirection" ],
                            },
                            {
                                label: OP3._("Validation"),
                                property: [ "urlMapping", "inputValidationMessage" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Label Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Label Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "text-field",
                        label: OP3._("Field Text Options"),
                        icon: "op3-icon-caps-small-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Field Font"),
                                property: [ "fieldFontFamily", "fieldFontWeight" ],
                            },
                            {
                                label: OP3._("Field Size"),
                                property: [ "fieldFontSize", "fieldLineHeight", "fieldLetterSpacing" ],
                            },
                            {
                                label: OP3._("Field Styling"),
                                property: [ "fieldFontStyle", "fieldTextTransform" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Field"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Input"),
                                property: [ "fieldColor", "placeholderColor" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor"],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                ],
            },
            intervalcountdowntimer: {
                nav: [
                    {
                        id: "intervalcountdowntimer",
                        label: OP3._("Interval Countdown Settings"),
                        icon: "op3-icon-calendar-grid-61-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Interval Countdown Settings"),
                                property: [ "countdownInterval", "countdownFinishAction", "editFinishText", "redirectUrl", "restartTimer", "restartDay", "restartHour" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight", "unitsTextTransform" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "digitsFontSize", "unitsFontSize" ],
                            },
                            {
                                label: OP3._("Custom"),
                                property: [ "flexDirectionVertical", "wrapperMarginRight" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Digits Colour"),
                                property: [ "digitsColor" ],
                            },
                            {
                                label: OP3._("Units Colour"),
                                property: [ "unitsColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ]
            },
            listmenu: {
                nav: [
                    {
                        id: "list-menu",
                        label: OP3._("List Menu"),
                        icon: "op3-icon-menu-34-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("List Menu"),
                                property: [ "menuName", "titleVisible", "titleSpacing", "linkSpacing", "submenuIndent" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "titleFontFamily", "titleFontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "titleFontSize", "titleLineHeight", "titleLetterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "titleFontStyle", "titleTextTransform", "titleTextDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "linkFontFamily", "linkFontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "linkFontSize", "linkLineHeight", "linkLetterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "linkFontStyle", "linkTextTransform", "linkTextDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Title"),
                                property: [ "titleColor" ],
                            },
                            {
                                label: OP3._("Link"),
                                property: [ "linkColor" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Colour"),
                                property: [ "transitionDuration", "linkColorHover" ],
                            },
                            {
                                label: OP3._("Link Text"),
                                property: [ "linkFontWeightHover", "linkFontStyleHover", "linkTextDecorationHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            membershipcontentlist: {
                nav: [
                    {
                        id: "membership",
                        label: OP3._("Select Membership Options"),
                        icon: "op3-icon-link-2-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Membership Options"),
                                property: [ "membershipInfo" ],
                            },
                        ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "wrapColumnsFlexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayLogo", "blockDisplayText" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            membershipcontentlistitem: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "href", "target", "relNoFollow" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "columnGap", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            numberblock: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Number Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "numberblock", "numberblockitem" ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "wrapColumnsFlexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayTitle" , "blockDisplayText"],
                            },
                        ],
                    },
                    {
                        id: "block-styling",
                        icon: "op3-icon-brush-1",
                        label: OP3._("Number Block Styling"),
                        action: "context",
                        context: [
                            {
                                label: OP3._("Number Block Styling"),
                                property: [ "marginLeftNumber", "marginRightNumber", "marginBottomNumber", "numberblockFrame", "padding", "borderWidthNumber", "size" ],
                            },
                            {
                                label: OP3._("Number Block Settings"),
                                property: [ "numberblockSequence", "numberblockShape"],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            numberblockitem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Number Block Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "numberblock", "numberblockitem" ],
                    },
                    {
                        id: "number",
                        label: OP3._("Number Colours"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Number Background Colour"),
                                property: [ "backgroundNumberImageBaseType", "backgroundNumberColorBase", "backgroundNumberImageBaseAngle", "backgroundNumberImageBasePosition", "backgroundNumberImageBaseStartColor", "backgroundNumberImageBaseStartPosition", "backgroundNumberImageBaseStopColor", "backgroundNumberImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Number Colour"),
                                property: [ "color" ],
                            },
                        ],

                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            progressbar: {
                nav: [
                    {
                        id: "progress-bar",
                        label: OP3._("Progress Bar Sizing"),
                        icon: "op3-icon-chart-bar-32-1 op3-icon-rotate-90",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress Bar Sizing"),
                                property: [ "progressWidthSteps", "progressWidth", "animationToggle", "height" ],
                            },
                            {
                                label: OP3._("Label Positioning"),
                                property: [ "textAlign", "labelPlacement", "labelSpacingTop", "labelSpacingBottom" ],
                            },
                        ],
                    },
                    {
                        id: "styling",
                        label: OP3._("Progress Bar Styling"),
                        icon: "op3-icon-brush-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress Bar Styling"),
                                property: [ "backgroundStripes", "backgroundStripesPresets", "animationToggle2", "borderRadiusPresets" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration", "textShadow" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Bar"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Progress"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor" ],
                            },
                            {
                                label: OP3._("Bar"),
                                property: [ "borderTopWidthBase", "borderTopStyleBase", "borderTopColorBase", "borderRightWidthBase", "borderRightStyleBase", "borderRightColorBase", "borderBottomWidthBase", "borderBottomStyleBase", "borderBottomColorBase", "borderLeftWidthBase", "borderLeftStyleBase", "borderLeftColorBase" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "width" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            onetimeoffer: {
                nav: [
                    {
                        id: "product",
                        label: OP3._("Upsell/Downsell Options"),
                        icon: "op3-icon-bag-time-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Upsell/Downsell"),
                                property: [ "productId" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "editPaymentInputs", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            orderbump: {
                nav: [
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-calendar-check-59-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayMedia", "blockDisplayTitle", "blockDisplayText" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Form Section"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            radiobutton: {
                nav: [
                    {
                        id: "input-settings",
                        label: OP3._("Radio Settings"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Input"),
                                property: [ "required", "checked", "checkedLock", "widthCalcColumns" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconVisible", "blink", "op3Icon", "iconFontSize", "iconSpacing" ],
                            },
                            {
                                label: OP3._("Label"),
                                property: [ "labelSpacing" ],
                            },
                            {
                                label: OP3._("Validation"),
                                property: [ "urlMapping", "inputValidationMessage" ],
                            },
                        ],
                    },
                    {
                        id: "checkmark",
                        label: OP3._("Checkmark Options"),
                        icon: "op3-icon-check-circle-08-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Position"),
                                property: [ "checkmarkSize", "checkboxPosition" ],
                            },
                            {
                                label: OP3._("Colours"),
                                property: [ "checkmarkBackgroundColorUnchecked", "checkmarkBackgroundColorChecked", "checkmarkColor" ],
                            },
                            {
                                label: OP3._("Borders"),
                                property: [ "checkmarkBorderTopWidth", "checkmarkBorderTopStyle", "checkmarkBorderTopColor", "checkmarkBorderRightWidth", "checkmarkBorderRightStyle", "checkmarkBorderRightColor", "checkmarkBorderBottomWidth", "checkmarkBorderBottomStyle", "checkmarkBorderBottomColor", "checkmarkBorderLeftWidth", "checkmarkBorderLeftStyle", "checkmarkBorderLeftColor", "checkmarkBorderTopLeftRadius", "checkmarkBorderTopRightRadius", "checkmarkBorderBottomRightRadius", "checkmarkBorderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Checked Borders"),
                                property: [ "checkmarkBorderTopWidthChecked", "checkmarkBorderTopStyleChecked", "checkmarkBorderTopColorChecked", "checkmarkBorderRightWidthChecked", "checkmarkBorderRightStyleChecked", "checkmarkBorderRightColorChecked", "checkmarkBorderBottomWidthChecked", "checkmarkBorderBottomStyleChecked", "checkmarkBorderBottomColorChecked", "checkmarkBorderLeftWidthChecked", "checkmarkBorderLeftStyleChecked", "checkmarkBorderLeftColorChecked", "checkmarkBorderTopLeftRadiusChecked", "checkmarkBorderTopRightRadiusChecked", "checkmarkBorderBottomRightRadiusChecked", "checkmarkBorderBottomLeftRadiusChecked" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColor" ],
                            },
                            {
                                label: OP3._("Checked Background"),
                                property: [ "backgroundColorChecked" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-brush-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor"],
                            },
                            {
                                label: OP3._("Checked Icon"),
                                property: [ "iconColorChecked"],
                            },
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Checked Label"),
                                property: [ "colorChecked"],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                ],
            },
            rating: {
                nav: [
                    {
                        id: "rating",
                        label: OP3._("Rating"),
                        icon: "op3-icon-favourite-28-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Rating"),
                                property: [ "ratingSvgPattern", "ratingSvgCount", "ratingSvgRate", "ratingSvgOffset", "height" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Fill"),
                                property: [ "ratingSvgFillColor" ],
                            },
                            {
                                label: OP3._("Empty"),
                                property: [ "ratingSvgFillColor2" ],
                            },
                        ],
                    },
                    {
                        id: "stroke",
                        label: OP3._("Stroke"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Stroke"),
                                property: [ "ratingSvgStrokeWidth", "ratingSvgStrokeColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "ratingSvgPreserveAspectRatio" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            row: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            section: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Video"),
                                property: [ "videoSource", "videoUrlYoutube", "videoUrlVimeo", "videoUrlWistia", "videoUrlSelfhosted", "videoUrlUploaded", "code", "aspectRatio", "showOnMobile" ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },

                    {
                        id: "up",
                        label: OP3._("Move Element Up"),
                        icon: "op3-icon-simple-up",
                        action: "up",
                    },
                    {
                        id: "down",
                        label: OP3._("Move Element Down"),
                        icon: "op3-icon-simple-down",
                        action: "down",
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "paddingTop", "paddingBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            select: {
                nav: [
                    {
                        id: "select-settings",
                        label: OP3._("Input Settings"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "labelVisible", "labelSpacing" ],
                            },
                            {
                                label: OP3._("Select"),
                                property: [ "required", "value", "selectPlaceholder", "widthCalcColumns" ],
                            },
                            {
                                label: OP3._("Validation"),
                                property: [ "urlMapping", "inputValidationMessage" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Label Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Label Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "text-field",
                        label: OP3._("Field Text Options"),
                        icon: "op3-icon-caps-small-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Field Font"),
                                property: [ "fieldFontFamily", "fieldFontWeight" ],
                            },
                            {
                                label: OP3._("Field Size"),
                                property: [ "fieldFontSize", "fieldHeight", "fieldLetterSpacing" ],
                            },
                            {
                                label: OP3._("Field Styling"),
                                property: [ "fieldFontStyle", "fieldTextTransform" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Field"),
                                property: [ "fieldColor", "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                ],
            },
            socialicons: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Icon Element"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "socialicons", "icon" ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            socialsharing: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Social Sharing Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "socialsharing", "socialsharingitem" ],
                    },
                    {
                        id: "socialsharing",
                        label: OP3._("Social Sharing Options"),
                        icon: "op3-icon-share-2-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Social Sharing Options"),
                                property: [ "flexDirection", "socialShareCount", "socialShareTotalCount", "pageUrl" ],
                            },
                        ],
                    },
                    {
                        id: "tota-share-text",
                        label: OP3._("Total Shares Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "totalFontFamily", "totalFontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "totalFontSize", "totalLineHeight", "totalLetterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "totalFontStyle", "totalTextTransform", "totalTextDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            socialsharingitem: {
                 nav: [
                    {
                        id: "add",
                        label: OP3._("Add Social Sharing Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "socialsharing", "socialsharingitem" ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "op3Icon", "iconFontSize", "iconDirection", "iconSpacing" ],
                                filter: [
                                    {
                                        label: OP3._("Icon Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Size"),
                                                property: [ "iconFontSize" ],
                                            },
                                            {
                                                label: OP3._("Position"),
                                                property: [ "iconDirection" ],
                                            },
                                            {
                                                label: OP3._("Spacing"),
                                                property: [ "iconSpacing" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Icon Background"),
                                property: [ "iconFrame", "iconShape", "iconPadding", "iconBorderWidth" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor", "iconBackgroundColor", "iconBorderColor" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            soundcloud: {
                nav: [
                    {
                        id: "SoundCloud",
                        label: OP3._("SoundCloud Settings"),
                        icon: "op3-icon-logo-soundcloud",
                        action: "context",
                        context: [
                            {
                                label: OP3._("SoundCloud Settings"),
                                property: [ "soundCloudLayout", "srcSoundCloudUrl", "srcSoundCloudAutoplay", "maxWidth", "height" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            spacer: {
                nav: [
                    {
                        id: "spacer",
                        label: OP3._("Spacer Settings"),
                        icon: "op3-icon-simple-delete-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Spacer Settings"),
                                property: [ "height" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "toggleSidebar",
                    },
                ],
            },
            switcher: {
                nav: [
                    {
                        id: "slider",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-ui-03-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Slider"),
                                property: [ "sliderWidth", "sliderHeight", "gutter2" ],
                            },
                            {
                                label: OP3._("Colour"),
                                property: [ "sliderBackgroundColor", "sliderBackgroundColorActive", "boxBackgroundColorActive", "color" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "slider-borders",
                        label: OP3._("Switcher Borders / Shadows"),
                        icon: "op3-icon-border-radius-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Bar Borders "),
                                property: [ "sliderBorderTopWidth", "sliderBorderTopStyle", "sliderBorderTopColor", "sliderBorderRightWidth", "sliderBorderRightStyle", "sliderBorderRightColor", "sliderBorderBottomWidth", "sliderBorderBottomStyle", "sliderBorderBottomColor", "sliderBorderLeftWidth", "sliderBorderLeftStyle", "sliderBorderLeftColor", "sliderBorderTopLeftRadius", "sliderBorderTopRightRadius", "sliderBorderBottomRightRadius", "sliderBorderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Handle Borders"),
                                property: [ "boxBorderTopWidth", "boxBorderTopStyle", "boxBorderTopColor", "boxBorderRightWidth", "boxBorderRightStyle", "boxBorderRightColor", "boxBorderBottomWidth", "boxBorderBottomStyle", "boxBorderBottomColor", "boxBorderLeftWidth", "boxBorderLeftStyle", "boxBorderLeftColor", "boxBorderTopLeftRadius", "boxBorderTopRightRadius", "boxBorderBottomRightRadius", "boxBorderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxBoxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxBoxShadowAngle", "boxBoxShadowDistance", "boxBoxShadowBlur", "boxBoxShadowSpread", "boxBoxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "marginAlign", "width" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            switchercontent: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            switchercontentitem: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tabs: {
                nav: [
                    {
                        id: "tabs",
                        label: OP3._("Tabs Options"),
                        icon: "op3-icon-window-add-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Tabs"),
                                property: [ "defaultActiveTab", "tabContentAnimation", ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tabscontent: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tabscontentitem: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tabsheader: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Tabs Header"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "tabsheader", "tabsheaderitem" ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "fieldLayoutDesktop", "fieldLayoutTablet", "fieldLayoutMobile", "justifyContent", "alignItems" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tabsheaderitem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Tabs Header Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "tabsheader", "tabsheaderitem" ],
                    },
                    {
                        id: "tabsheaderitem",
                        label: OP3._("Item Options"),
                        icon: "op3-icon-icon-with-text",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Layout"),
                                property: [ "blockDisplayMedia", "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "gap" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "op3Icon", "mediaSize" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "src", "mediaSize" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Item"),
                                property: [ "backgroundImageActiveType", "backgroundColorActive", "backgroundImageActiveAngle", "backgroundImageActivePosition", "backgroundImageActiveStartColor", "backgroundImageActiveStartPosition", "backgroundImageActiveStopColor", "backgroundImageActiveStopPosition", "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition", "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Active"),
                                                property: [ "backgroundImageActiveType", "backgroundColorActive", "backgroundImageActiveAngle", "backgroundImageActivePosition", "backgroundImageActiveStartColor", "backgroundImageActiveStartPosition", "backgroundImageActiveStopColor", "backgroundImageActiveStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Inactive"),
                                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Hover"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "textColorActive", "textColor", "textColorHover" ],
                                filter: [
                                    {
                                        label: OP3._("Color"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Active"),
                                                property: [ "textColorActive" ],
                                            },
                                            {
                                                label: OP3._("Inactive"),
                                                property: [ "textColor" ],
                                            },
                                            {
                                                label: OP3._("Hover"),
                                                property: [ "textColorHover" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColorActive", "iconColor", "iconColorHover" ],
                                filter: [
                                    {
                                        label: OP3._("Color"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Active"),
                                                property: [ "iconColorActive" ],
                                            },
                                            {
                                                label: OP3._("Inactive"),
                                                property: [ "iconColor" ],
                                            },
                                            {
                                                label: OP3._("Hover"),
                                                property: [ "iconColorHover" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Active"),
                                property: [ "borderTopWidthActive", "borderTopStyleActive", "borderTopColorActive", "borderRightWidthActive", "borderRightStyleActive", "borderRightColorActive", "borderBottomWidthActive", "borderBottomStyleActive", "borderBottomColorActive", "borderLeftWidthActive", "borderLeftStyleActive", "borderLeftColorActive", "borderTopLeftRadiusActive", "borderTopRightRadiusActive", "borderBottomRightRadiusActive", "borderBottomLeftRadiusActive" ],
                            },
                            {
                                label: OP3._("Inactive"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Hover"),
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Shadows"),
                        icon: "op3-icon-humidity-26-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Active"),
                                property: [ "boxShadowActive" ],
                            },
                            {
                                label: OP3._("Inactive"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Hover"),
                                property: [ "boxShadowHover" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "maxWidth", "justifyContent"],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_a: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_a_fontWeight", "tcp_a_fontStyle", "tcp_a_textTransform", "tcp_a_textDecoration" ],
                            },
                            {
                                label: OP3._("Hover"),
                                property: [ "tcp_a_fontWeightHover", "tcp_a_fontStyleHover", "tcp_a_textTransformHover", "tcp_a_textDecorationHover" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_a_color" ],
                            },
                            {
                                label: OP3._("Hover"),
                                property: [ "tcp_a_colorHover" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_a_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_a_textShadowAngle", "tcp_a_textShadowDistance", "tcp_a_textShadowBlurRadius", "tcp_a_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_all: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_all_fontFamily" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_all_color" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_all_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_all_textShadowAngle", "tcp_all_textShadowDistance", "tcp_all_textShadowBlurRadius", "tcp_all_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_blockquote: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_blockquote_fontFamily", "tcp_blockquote_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_blockquote_fontSize", "tcp_blockquote_lineHeight", "tcp_blockquote_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_blockquote_fontStyle", "tcp_blockquote_textTransform", "tcp_blockquote_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_blockquote_color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "tcp_blockquote_backgroundColor" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_blockquote_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "tcp_blockquote_borderTopWidth", "tcp_blockquote_borderTopStyle", "tcp_blockquote_borderTopColor", "tcp_blockquote_borderRightWidth", "tcp_blockquote_borderRightStyle", "tcp_blockquote_borderRightColor", "tcp_blockquote_borderBottomWidth", "tcp_blockquote_borderBottomStyle", "tcp_blockquote_borderBottomColor", "tcp_blockquote_borderLeftWidth", "tcp_blockquote_borderLeftStyle", "tcp_blockquote_borderLeftColor", "tcp_blockquote_borderTopLeftRadius", "tcp_blockquote_borderTopRightRadius", "tcp_blockquote_borderBottomRightRadius", "tcp_blockquote_borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "tcp_blockquote_boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "tcp_blockquote_boxShadowAngle", "tcp_blockquote_boxShadowDistance", "tcp_blockquote_boxShadowBlur", "tcp_blockquote_boxShadowSpread", "tcp_blockquote_boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_blockquote_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_blockquote_textShadowAngle", "tcp_blockquote_textShadowDistance", "tcp_blockquote_textShadowBlurRadius", "tcp_blockquote_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_blockquote_marginTop", "tcp_blockquote_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_h1: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_h1_fontFamily", "tcp_h1_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_h1_fontSize", "tcp_h1_lineHeight", "tcp_h1_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h1_fontStyle", "tcp_h1_textTransform", "tcp_h1_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_h1_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_h1_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_h1_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h1_textShadowAngle", "tcp_h1_textShadowDistance", "tcp_h1_textShadowBlurRadius", "tcp_h1_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_h1_marginTop", "tcp_h1_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_h2: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_h2_fontFamily", "tcp_h2_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_h2_fontSize", "tcp_h2_lineHeight", "tcp_h2_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h2_fontStyle", "tcp_h2_textTransform", "tcp_h2_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_h2_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_h2_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_h2_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h2_textShadowAngle", "tcp_h2_textShadowDistance", "tcp_h2_textShadowBlurRadius", "tcp_h2_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_h2_marginTop", "tcp_h2_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_h3: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_h3_fontFamily", "tcp_h3_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_h3_fontSize", "tcp_h3_lineHeight", "tcp_h3_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h3_fontStyle", "tcp_h3_textTransform", "tcp_h3_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_h3_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_h3_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_h3_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h3_textShadowAngle", "tcp_h3_textShadowDistance", "tcp_h3_textShadowBlurRadius", "tcp_h3_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_h3_marginTop", "tcp_h3_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_h4: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_h4_fontFamily", "tcp_h4_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_h4_fontSize", "tcp_h4_lineHeight", "tcp_h4_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h4_fontStyle", "tcp_h4_textTransform", "tcp_h4_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_h4_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_h4_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_h4_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h4_textShadowAngle", "tcp_h4_textShadowDistance", "tcp_h4_textShadowBlurRadius", "tcp_h4_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_h4_marginTop", "tcp_h4_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_h5: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_h5_fontFamily", "tcp_h5_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_h5_fontSize", "tcp_h5_lineHeight", "tcp_h5_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h5_fontStyle", "tcp_h5_textTransform", "tcp_h5_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_h5_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_h5_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_h5_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h5_textShadowAngle", "tcp_h5_textShadowDistance", "tcp_h5_textShadowBlurRadius", "tcp_h5_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_h5_marginTop", "tcp_h5_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_h6: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_h6_fontFamily", "tcp_h6_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_h6_fontSize", "tcp_h6_lineHeight", "tcp_h6_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h6_fontStyle", "tcp_h6_textTransform", "tcp_h6_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_h6_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_h6_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_h6_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_h6_textShadowAngle", "tcp_h6_textShadowDistance", "tcp_h6_textShadowBlurRadius", "tcp_h6_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_h6_marginTop", "tcp_h6_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_headings: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_headings_fontFamily", "tcp_headings_fontWeight" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_headings_fontStyle", "tcp_headings_textTransform", "tcp_headings_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_headings_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_headings_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_headings_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_headings_textShadowAngle", "tcp_headings_textShadowDistance", "tcp_headings_textShadowBlurRadius", "tcp_headings_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_headings_marginTop", "tcp_headings_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_li: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_li_fontFamily", "tcp_li_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_li_fontSize", "tcp_li_lineHeight", "tcp_li_letterSpacing", "tcp_li_itemMarginVertical" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_li_fontStyle", "tcp_li_textTransform", "tcp_li_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_li_color" ],
                            },
                            // {
                            //     label: OP3._("Background"),
                            //     property: [ "tcp_li_backgroundColor" ],
                            // },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_li_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "tcp_li_borderTopWidth", "tcp_li_borderTopStyle", "tcp_li_borderTopColor", "tcp_li_borderRightWidth", "tcp_li_borderRightStyle", "tcp_li_borderRightColor", "tcp_li_borderBottomWidth", "tcp_li_borderBottomStyle", "tcp_li_borderBottomColor", "tcp_li_borderLeftWidth", "tcp_li_borderLeftStyle", "tcp_li_borderLeftColor", "tcp_li_borderTopLeftRadius", "tcp_li_borderTopRightRadius", "tcp_li_borderBottomRightRadius", "tcp_li_borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "tcp_li_boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "tcp_li_boxShadowAngle", "tcp_li_boxShadowDistance", "tcp_li_boxShadowBlur", "tcp_li_boxShadowSpread", "tcp_li_boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_li_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_li_textShadowAngle", "tcp_li_textShadowDistance", "tcp_li_textShadowBlurRadius", "tcp_li_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_p: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_p_fontFamily", "tcp_p_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_p_fontSize", "tcp_p_lineHeight", "tcp_p_letterSpacing", "tcp_p_marginVertical" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_p_fontStyle", "tcp_p_textTransform", "tcp_p_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_p_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_p_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_p_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_p_textShadowAngle", "tcp_p_textShadowDistance", "tcp_p_textShadowBlurRadius", "tcp_p_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_pre: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_pre_fontFamily", "tcp_pre_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_pre_fontSize", "tcp_pre_lineHeight", "tcp_pre_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_pre_fontStyle", "tcp_pre_textTransform", "tcp_pre_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_pre_color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "tcp_pre_backgroundColor" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_pre_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "tcp_pre_borderTopWidth", "tcp_pre_borderTopStyle", "tcp_pre_borderTopColor", "tcp_pre_borderRightWidth", "tcp_pre_borderRightStyle", "tcp_pre_borderRightColor", "tcp_pre_borderBottomWidth", "tcp_pre_borderBottomStyle", "tcp_pre_borderBottomColor", "tcp_pre_borderLeftWidth", "tcp_pre_borderLeftStyle", "tcp_pre_borderLeftColor", "tcp_pre_borderTopLeftRadius", "tcp_pre_borderTopRightRadius", "tcp_pre_borderBottomRightRadius", "tcp_pre_borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "tcp_pre_boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "tcp_pre_boxShadowAngle", "tcp_pre_boxShadowDistance", "tcp_pre_boxShadowBlur", "tcp_pre_boxShadowSpread", "tcp_pre_boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_pre_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_pre_textShadowAngle", "tcp_pre_textShadowDistance", "tcp_pre_textShadowBlurRadius", "tcp_pre_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "tcp_pre_marginTop", "tcp_pre_marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tcp_texts: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "tcp_texts_fontFamily", "tcp_texts_fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "tcp_texts_fontSize", "tcp_texts_lineHeight", "tcp_texts_letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_texts_fontStyle", "tcp_texts_textTransform", "tcp_texts_textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "tcp_texts_color" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "tcp_texts_textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "shadow",
                        label: OP3._("Text Shadow"),
                        icon: "op3-icon-single-copy-06-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Presets"),
                                property: [ "tcp_texts_textShadow" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "tcp_texts_textShadowAngle", "tcp_texts_textShadowDistance", "tcp_texts_textShadowBlurRadius", "tcp_texts_textShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            testimonial: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Testimonial Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "testimonial", "testimonialitem" ],
                    },
                    {
                        id: "block-order",
                        label: OP3._("Block Order"),
                        icon: "op3-icon-contacts-44-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Order"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "wrapColumnsFlexBasisSteps" ],
                            },
                            {
                                label: OP3._("Block Visibility"),
                                property: [ "blockDisplayTitle", "blockDisplayAvatar", "blockDisplayCompany", "blockDisplayAuthor", "blockDisplayLogo" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            testimonialitem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Testimonial Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "testimonial", "testimonialitem" ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "vertical-alignment",
                        label: OP3._("Vertical Alignment"),
                        icon: "op3-icon-align-vertical",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Vertical Alignment"),
                                property: [ "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "columnGap", "marginTop", "marginBottom", ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            text: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing", "paragraphMarginVertical" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundColorOverlay" ],
                            },
                        ],
                    },
                    {
                        id: "text-align",
                        label: OP3._("Text Align"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Align"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            textarea: {
                nav: [
                    {
                        id: "input-settings",
                        label: OP3._("Textarea Settings"),
                        icon: "op3-icon-window-paragraph-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "labelVisible", "labelSpacing" ],
                            },
                            {
                                label: OP3._("Input"),
                                property: [ "required", "placeholder", "widthCalcColumns", "rows" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconVisible", "op3Icon", "iconFontSize", "iconSpacing", "iconTop", "iconFlexDirection" ],
                            },
                            {
                                label: OP3._("Validation"),
                                property: [ "urlMapping", "inputValidationMessage" ],
                            },
                        ],
                    },
                    {
                        id: "text-label",
                        label: OP3._("Label Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Label Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Label Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "text-field",
                        label: OP3._("Field Text Options"),
                        icon: "op3-icon-caps-small-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Field Font"),
                                property: [ "fieldFontFamily", "fieldFontWeight" ],
                            },
                            {
                                label: OP3._("Field Size"),
                                property: [ "fieldFontSize", "fieldLineHeight", "fieldLetterSpacing" ],
                            },
                            {
                                label: OP3._("Field Styling"),
                                property: [ "fieldFontStyle", "fieldTextTransform" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Label"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Field"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Input"),
                                property: [ "fieldColor", "placeholderColor" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColor"],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                ],
            },
            textwithicon: {
                nav: [
                    {
                        id: "block-layout",
                        label: OP3._("Block Layout"),
                        icon: "op3-icon-icon-with-text",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Block Layout"),
                                property: [ "blockLayoutDesktop", "blockLayoutTablet", "blockLayoutMobile", "blockDisplayMedia", "columnGap", "rowGap", "textWithIconSize" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "alignItems", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            treemenu: {
                nav: [
                    {
                        id: "simple-menu",
                        label: OP3._("WP Menu"),
                        icon: "op3-icon-segmentation-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Simple Menu"),
                                property: [ "menuName", "animation" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "lineHeight", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            //{
                            //    label: OP3._("Icon Colour"),
                            //    property: [ "iconColor" ],
                            //},
                            {
                                label: OP3._("Background Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "width", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            treemenuitem: {
                nav: [
                    {
                        id: "simple-menu",
                        label: OP3._("Menu Item"),
                        icon: "op3-icon-segmentation-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Size"),
                                property: [ "minHeight", "gutter", "linkPaddingLeft", "linkPaddingRight" ],
                            },
                            {
                                label: OP3._("Menu Icon"),
                                property: [ "iconVisible", "op3Icon", "iconFontSize", "iconSpacing" ],
                            },
                            {
                                label: OP3._("Dropdown Icon"),
                                property: [ "dropdownIconVisible", "dropdownIcon", "dropdownIconFontSize", "dropdownIconSpacing", "dropdownIconSpacingTop" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Font"),
                                property: [ "fontFamily", "fontWeight" ],
                            },
                            {
                                label: OP3._("Size"),
                                property: [ "fontSize", "letterSpacing" ],
                            },
                            {
                                label: OP3._("Styling"),
                                property: [ "fontStyle", "textTransform", "textDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Icon Colour"),
                                property: [ "iconColor" ],
                            },
                            {
                                label: OP3._("Background Colour"),
                                // property: [ "backgroundColor" ],
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                        ],
                    },
                    {
                        id: "childwrap",
                        label: OP3._("Submenu Wrapper"),
                        icon: "op3-icon-chat-1 op3-icon-rotate-180",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "childWrapBackgroundImageChildWrapType", "childWrapBackgroundBackgroundColorChildWrap", "childWrapBackgroundImageChildWrapAngle", "childWrapBackgroundImageChildWrapPosition", "childWrapBackgroundImageChildWrapStartColor", "childWrapBackgroundImageChildWrapStartPosition", "childWrapBackgroundImageChildWrapStopColor", "childWrapBackgroundImageChildWrapStopPosition" ]
                            },
                            {
                                label: OP3._("Borders"),
                                property: [ "childWrapBorderTopWidth", "childWrapBorderTopStyle", "childWrapBorderTopColor", "childWrapBorderRightWidth", "childWrapBorderRightStyle", "childWrapBorderRightColor", "childWrapBorderBottomWidth", "childWrapBorderBottomStyle", "childWrapBorderBottomColor", "childWrapBorderLeftWidth", "childWrapBorderLeftStyle", "childWrapBorderLeftColor", "childWrapBorderTopLeftRadius", "childWrapBorderTopRightRadius", "childWrapBorderBottomRightRadius", "childWrapBorderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadows"),
                                property: [ "childWrapBoxShadow" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "flexGrow", "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover State"),
                        icon: "op3-icon-cursor-pointer",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Border"),
                                property: [ "borderHoverStyle", "borderBottomColorHover" ],
                            },
                            {
                                label: OP3._("Text"),
                                property: [ "colorHover" ],
                            },
                            {
                                label: OP3._("Icon"),
                                property: [ "iconColorHover" ],
                            },
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                            },
                        ],
                    },
                    {
                       id: "advanced",
                       label: OP3._("Advanced Settings"),
                       icon: "op3-icon-settings-gear-63-1",
                       action: "context",
                       context: [
                           {
                               label: OP3._("Settings"),
                               property: [ "widthAutoToggle", "width" ],
                               appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                           },
                       ],
                    },
                ],
            },
            trustbadge: {
                nav: [
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "color" ],
                            },
                        ],
                    },
                    {
                        id: "size",
                        label: OP3._("Size Options"),
                        icon: "op3-icon-size-large-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Size"),
                                property: [ "height", "transformRotate" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-center-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text"),
                                property: [ "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            tweet: {
                nav: [
                    {
                        id: "tweet",
                        label: OP3._("Tweet Settings"),
                        icon: "op3-icon-logo-twitter",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Tweet Options"),
                                property: [ "twitterUrl", "twitterVia", "labelMarginRight", "tweetMarginBottom" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour Options"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Background"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                            {
                                label: OP3._("Tweet Colour"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Label Color"),
                                property: [ "labelColor" ],
                            },
                            {
                                label: OP3._("Icon Color"),
                                property: [ "iconColor" ],
                            },
                        ],
                    },
                    {
                        id: "text",
                        label: OP3._("Text Options"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Tweet Text Options"),
                                property: [ "fontFamily", "fontWeight", "fontSize", "lineHeight", "letterSpacing", "fontStyle", "textTransform", "textDecoration" ],
                            },
                            {
                                label: OP3._("Label Text Options"),
                                property: [ "labelFontFamily", "labelFontWeight", "labelFontSize", "labelLineHeight", "labelLetterSpacing", "labelFontStyle", "labelTextTransform", "labelTextDecoration" ],
                            },
                        ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "iconFontSize" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign", "justifyContent", "textAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ]
            },
            video: {
                nav: [
                    {
                        id: "video",
                        label: OP3._("Video Settings"),
                        icon: "op3-icon-button-circle-play-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Video"),
                                property: [ "videoSource", "videoUrlYoutube", "videoUrlVimeo", "videoUrlWistia", "videoUrlSelfhosted", "videoUrlUploaded", "code", "aspectRatio", "maxWidth" ],
                            },
                            {
                                label: OP3._("Video Advanced"),
                                property: [ "videoStartTime", "videoAutoplay", "videoBackground", "videoMute", "videoLoop", "videoDownloadControls", "videoModestBranding", "videoRelated", "videoPortrait", "videoByline", "videoTitle", "videoSpeed", "videoColor", "videoControls" ],
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("This will disable play/pause feature. Use with autoplay or with video overlay.") + '</div>',
                            },
                            {
                                label: OP3._("Sticky Video"),
                                property: [ "videoSticky", "videoStickyPreview", "videoStickyMaxWidth", "videoStickyPosition", "videoStickyTop", "videoStickyBottom", "videoStickyLeft", "videoStickyRight", "videoStickyClose", "videoStickyDevices", "videoStickyDesktop", "videoStickyTablet", "videoStickyMobile" ],
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("To view or change sticky options, please enable the Preview mode.") + '</div>',
                            },
                        ],
                    },
                    {
                        id: "image",
                        label: OP3._("Image Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Image Overlay"),
                                property: [ "visible", "backgroundImageUrl", "videoIconVisible", "op3Icon", "fontSize", "color", "filterIconShadow" ],
                                filter: [
                                    {
                                        label: OP3._("Play Icon Settings"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Icon"),
                                                property: [ "op3Icon" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "fontSize" ],
                                            },
                                            {
                                                label: OP3._("Color"),
                                                property: [ "color" ],
                                            },
                                            {
                                                label: OP3._("Shadow"),
                                                property: [ "filterIconShadow" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            videothumbnail: {
                nav: [
                    {
                        id: "video",
                        label: OP3._("Video Settings"),
                        icon: "op3-icon-button-circle-play-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Video Thumbnail"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize", "aspectRatio", "maxWidth" ],
                                filter: [
                                    {
                                        label: OP3._("Video Thumbnail"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Play Icon"),
                                property: [ "visible", "op3Icon", "fontSize", "color", "filterIconShadow" ],
                            },
                        ],
                    },
                    {
                        id: "video-thumbnail-overlay",
                        label: OP3._("Video Thumbnail Overlay"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Video Thumbnail Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "link",
                        label: OP3._("Link Options"),
                        icon: "op3-icon-link-72-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Link Action"),
                                property: [ "action", "selectMediaFile", "href", "target", "relNoFollow", "popOverlayTrigger", "selectFunnelStep", "createVideoPopoverlay", "createPopoverlay", "selectHrefTarget", "smoothScroll" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment Options"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Align"),
                                property: [ "marginAlign" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            webinarcalendar: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Webinar Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "webinarcalendar", "webinarcalendaritem" ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "gutter", "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            webinarcalendaritem: {
                nav: [
                    {
                        id: "add",
                        label: OP3._("Add Webinar Item"),
                        icon: "op3-icon-circle-add-1",
                        action: "addElement",
                        args: [ "webinarcalendar", "webinarcalendaritem" ],
                    },
                    {
                        id: "icon",
                        label: OP3._("Icon"),
                        icon: "op3-icon-shape-star-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Icon"),
                                property: [ "htmlWebinarCalendarType", "height" ],
                            },
                        ],
                    },
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            webinardate: {
                nav: [
                    {
                        id: "text",
                        label: OP3._("Date"),
                        icon: "op3-icon-text-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Month"),
                                property: [ "monthFontFamily", "monthFontSize", "monthFontWeight"],
                            },
                            {
                                label: OP3._("Day"),
                                property: [ "dayFontFamily", "dayFontSize", "dayFontWeight" ],
                            },
                            {
                                label: OP3._("Date"),
                                property: [ "dateFontFamily", "dateFontSize", "dateFontWeight" ],
                            },
                            {
                                label: OP3._("Timezone"),
                                property: [ "timezoneFontFamily", "timezoneFontSize", "timezoneFontWeight" ],
                            },
                        ],
                    },
                    {
                        id: "alignment",
                        label: OP3._("Alignment"),
                        icon: "op3-icon-align-horizontal",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Alignment"),
                                property: [ "justifyContent" ],
                            },
                        ],
                    },
                    {
                        id: "color",
                        label: OP3._("Colour"),
                        icon: "op3-icon-palette-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Text"),
                                property: [ "color" ],
                            },
                            {
                                label: OP3._("Month"),
                                property: [ "monthColor", "backgroundColor" ],
                            },
                            {
                                label: OP3._("Day"),
                                property: [ "dayColor" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
            webinarlink: {
                nav: [
                    {
                        id: "background",
                        label: OP3._("Background Options"),
                        icon: "op3-icon-image-5",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Colour"),
                                property: [ "backgroundImageBaseType", "backgroundColorBase", "backgroundImageBaseAngle", "backgroundImageBasePosition", "backgroundImageBaseStartColor", "backgroundImageBaseStartPosition", "backgroundImageBaseStopColor", "backgroundImageBaseStopPosition" ],
                            },
                            {
                                label: OP3._("Image"),
                                property: [ "backgroundImageUrl", "opacity100", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                                filter: [
                                    {
                                        label: OP3._("Image Properties"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Position"),
                                                property: [ "backgroundPosition" ],
                                            },
                                            {
                                                label: OP3._("Attachment"),
                                                property: [ "backgroundAttachment" ],
                                            },
                                            {
                                                label: OP3._("Repeat"),
                                                property: [ "backgroundRepeat" ],
                                            },
                                            {
                                                label: OP3._("Size"),
                                                property: [ "backgroundSize" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: OP3._("Overlay"),
                                property: [ "backgroundImageOverlayType", "backgroundColorOverlay", "backgroundImageOverlayAngle", "backgroundImageOverlayPosition", "backgroundImageOverlayStartColor", "backgroundImageOverlayStartPosition", "backgroundImageOverlayStopColor", "backgroundImageOverlayStopPosition" ],
                            },
                        ],
                    },
                    {
                        id: "borders",
                        label: OP3._("Borders / Shadows"),
                        icon: "op3-icon-border-radius-2",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Borders"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                label: OP3._("Shadow"),
                                property: [ "boxShadow" ],
                            },
                            {
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced Settings"),
                        icon: "op3-icon-settings-gear-63-1",
                        action: "context",
                        context: [
                            {
                                label: OP3._("Settings"),
                                property: [ "marginTop", "marginBottom", "maxWidth", "marginAlign" ],
                                appendHTML: '<button type="button" class="op3-toolbar-button" data-op3-toolbar-action="toggleSidebar"><i class="op3-icon op3-icon-dock-right-2"></i>' + OP3._("Advanced Options") + '</button>',
                            },
                        ],
                    },
                ],
            },
        }

        // specific buttons that are part of every element
        // (css will take care of their visibility)
        for (var type in result) {
            var nav = result[type].nav;
            if (!nav)
                continue;

            // lock, styles-and-presets items go at the beggining
            nav.unshift(
                {
                    id: "lock",
                    label: OP3._("Styling Lock & Override"),
                    icon: "op3-icon-lock-circle-open-1",
                    action: "toggleLinkProperties",
                },
                {
                    id: "styles-and-presets",
                    label: OP3._("Styles and Presets"),
                    icon: "op3-icon-wand-99-2",
                    action: "toggleSidebarDesign",
                },
            );

            // global element as well
            nav.unshift(
                {
                    id: "global-element",
                    label: OP3._("Global Element"),
                    icon: "op3-icon-globe-1",
                    action: "toggleSidebarGlobalElement",
                },
            );

            // get advanced item index (which should always be last)
            var index = nav.length;
            for (var i = 0; i < nav.length; i++) {
                if (nav[i].id !== "advanced")
                    continue;

                index = i;
                break;
            }

            // move item goes before advanced item (or at the end)
            nav.splice(index++, 0, {
                id: "move",
                label: OP3._("Move Element"),
                icon: "op3-icon-zoom-99-2",
                linkAttr: {
                    "data-jquery-mmdnd-draggable": "op3-query",
                },
                action: "move",
            });

            // clone item goes before advanced item (or at the end)
            nav.splice(index++, 0, {
                    id: "clone",
                    label: OP3._("Clone Element"),
                    icon: "op3-icon-ungroup-1",
                    action: "clone",
            });

            // delete item goes before advanced item (or at the end)
            nav.splice(index++, 0, {
                    id: "delete",
                    label: OP3._("Delete Element"),
                    icon: "op3-icon-trash-simple-1",
                    action: "delete",
            });
        }

        return result;
    };

})(jQuery, window, document);
