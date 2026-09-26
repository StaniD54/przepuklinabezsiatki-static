/**
 * OptimizePress3 element options box.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-live-editor.js
 *     - op3-live-editor-sidebar.js
 *     - op3-designer.js
 *     - op3-element-options.js
 */
;(function($, window, document) {

    "use strict";

    // set configuration for each element type
    window.OP3.ElementOptions._config = function() {
        var result = {
            arrow: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-paint-37-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            audio: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            breadcrumbtrail: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                        ],
                    },
                ],
            },
            bulletblock: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            bulletlist: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                        ],
                    },
                ],
            },
            button: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                id: "shadow",
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                            {
                                id: "inner-shadow",
                                label: OP3._("Inner Shadow"),
                                property: [ "boxShadowInsetAngle", "boxShadowInsetDistance", "boxShadowInsetBlur", "boxShadowInsetSpread", "boxShadowInsetColor" ],
                            },
                            {
                                id: "text-shadow",
                                label: OP3._("Text Shadow"),
                                property: [ "textShadowAngle", "textShadowDistance", "textShadowBlurRadius", "textShadowColor" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "effectstyle",
                                label: OP3._("Button Effect"),
                                reset: true,
                                property: [ "effectStyle" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration", "colorHover", "iconColorHover" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Borders & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverAngle", "boxShadowHoverDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            calendly: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            cart: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "maxWidth", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            cartdownload: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            cartdownloaditem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            cartsummary: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            checkbox: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Element Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            column: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            comments: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            contenttoggle: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            contenttoggleitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                        ],
                    },
                ],
            },
            countdowntimer: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "text-customization",
                                label: OP3._("Text Customization"),
                                reset: true,
                                property: [ "countdownTimerUnitDay", "countdownTimerUnitHour", "countdownTimerUnitMin", "countdownTimerUnitSec" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            counter: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            creditcard: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            creditcarditem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                ],
            },
            customhtml: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            date: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "colorHover" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Borders & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                        ],
                    },
                ],
            },
            descriptionlist: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "width", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            descriptionlistitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            evergreencountdowntimer: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "text-customization",
                                label: OP3._("Text Customization"),
                                reset: true,
                                property: [ "countdownTimerUnitDay", "countdownTimerUnitHour", "countdownTimerUnitMin", "countdownTimerUnitSec" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            facebookbutton: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            facebookcomments: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            faq: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            faqitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                        ],
                    },
                ],
            },
            featureblock: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            featureblockitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            fieldset: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            form: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "children",
                                label: OP3._("Fields"),
                                reset: false,
                                property: [ "children" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            contactform: {
                tab: [
                    {
                        id: "design",
                        label: OP3._("Design"),
                        icon: "op3-icon-wand-99-2",
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "children",
                                label: OP3._("Fields"),
                                reset: false,
                                property: [ "children" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            formsection: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            googlemaps: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id",  "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            googlemapssimple: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                        ],
                    },
                ],
            },
            headline: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "typography",
                                label: OP3._("Typography"),
                                reset: true,
                                property: [ "colorHover", "fontWeightHover", "fontStyleHover", "textTransformHover", "textDecorationHover" ],
                            },
                        ],
                    },
                ],
            },
            horizontalline: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            icon: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "shadow",
                                label: OP3._("Shadow Styling"),
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                        ],
                    },
                ],
            },
            image: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverAngle", "boxShadowHoverDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            input: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Element Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width" ],
                            },
                            {
                                id: "input-positioning",
                                label: OP3._("Input Positioning"),
                                reset: true,
                                property: [ "inputBoxModel", "inputMarginTop", "inputMarginBottom", "inputMarginLeft", "inputMarginRight", "inputPaddingTop", "inputPaddingBottom", "inputPaddingLeft", "inputPaddingRight" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            intervalcountdowntimer: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "text-customization",
                                label: OP3._("Text Customization"),
                                reset: true,
                                property: [ "countdownTimerUnitHour", "countdownTimerUnitMin", "countdownTimerUnitSec" ],
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ]
            },
            listmenu: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            membershipcontentlist: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            membershipcontentlistitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            numberblock: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            numberblockitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            popoverlay: {
                tab: [
                    {
                        id: "style",
                        label: OP3._("Style"),
                        icon: "op3-icon-paint-37-2",
                        group: [
                            {
                                id: "general",
                                label: OP3._("Popup General"),
                                reset: true,
                                property: [ "text", "marginTopWrapper", "backgroundColor", "popoverlayContentBackground" ],
                            },
                            {
                                id: "delay",
                                label: OP3._("Delay & Animation"),
                                reset: true,
                                property: [ "animation", "animationTrigger", "useOnDevices", "timer", "cookieExpires" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageUrl", "backgroundPosition", "backgroundAttachment", "backgroundRepeat", "backgroundSize" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Popup Borders & Corners"),
                                reset: true,
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Popup Shadow"),
                                reset: true,
                                property: [ "boxShadow", "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                        ],
                    },
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width", "minHeight" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "delete" ],
                            },
                        ],
                    },
                ],
            },
            progressbar: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            onetimeoffer: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            orderbump: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            radiobutton: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Element Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            rating: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            row: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "wrapColumnsDesktop", "wrapColumnsFlexBasisDesktop", "wrapColumnsTablet", "wrapColumnsFlexBasisTablet", "wrapColumnsMobile", "wrapColumnsFlexBasisMobile", "stackColumnsDesktop", "stackColumnsDesktopReverse", "stackColumnsTablet", "stackColumnsTabletReverse", "stackColumnsMobile", "stackColumnsMobileReverse" ],
                                property: [ "deviceVisibility", "forceVisibility", "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "separator",
                                label: OP3._("Separator"),
                                reset: true,
                                property: [ "codeHtmlSeparatorTopType", "colorSeparatorTop", "heightSeparatorTop", "transformSeparatorTopFlipX", "zIndexSeparatorTop", "separatorHtmlSeparatorBottomType", "colorSeparatorBottom", "heightSeparatorBottom", "transformSeparatorBottomFlipX", "zIndexSeparatorBottom" ],
                                filter: [
                                    {
                                        label: OP3._("Dividers"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Top"),
                                                property: [ "codeHtmlSeparatorTopType", "colorSeparatorTop", "heightSeparatorTop", "transformSeparatorTopFlipX", "zIndexSeparatorTop" ],
                                            },
                                            {
                                                label: OP3._("Bottom"),
                                                property: [ "separatorHtmlSeparatorBottomType", "colorSeparatorBottom", "heightSeparatorBottom", "transformSeparatorBottomFlipX", "zIndexSeparatorBottom" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "sticky",
                                label: OP3._("Sticky Feature"),
                                reset: true,
                                property: [ "sticky", "stickyActiveDesktop", "stickyActiveTablet", "stickyActiveMobile", "stickyActive", "stickyTopDesktop", "stickyTopTablet", "stickyTopMobile", "stickyUntil", "stickyUntilElement" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            section: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "separator",
                                label: OP3._("Separator"),
                                reset: true,
                                property: [ "codeHtmlSeparatorTopType", "colorSeparatorTop", "heightSeparatorTop", "transformSeparatorTopFlipX", "zIndexSeparatorTop", "separatorHtmlSeparatorBottomType", "colorSeparatorBottom", "heightSeparatorBottom", "transformSeparatorBottomFlipX", "zIndexSeparatorBottom" ],
                                filter: [
                                    {
                                        label: OP3._("Dividers"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Top"),
                                                property: [ "codeHtmlSeparatorTopType", "colorSeparatorTop", "heightSeparatorTop", "transformSeparatorTopFlipX", "zIndexSeparatorTop" ],
                                            },
                                            {
                                                label: OP3._("Bottom"),
                                                property: [ "separatorHtmlSeparatorBottomType", "colorSeparatorBottom", "heightSeparatorBottom", "transformSeparatorBottomFlipX", "zIndexSeparatorBottom" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "sticky",
                                label: OP3._("Sticky Feature"),
                                reset: true,
                                property: [ "sticky", "stickyActiveDesktop", "stickyActiveTablet", "stickyActiveMobile", "stickyActive", "stickyTopDesktop", "stickyTopTablet", "stickyTopMobile", "stickyUntil", "stickyUntilElement" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "export",
                                label: OP3._("Export Section"),
                                reset: false,
                                property: [ "export" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            select: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Element Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width" ],
                            },
                            {
                                id: "select-positioning",
                                label: OP3._("Select Positioning"),
                                reset: true,
                                property: [ "selectBoxModel", "selectMarginTop", "selectMarginBottom", "selectMarginLeft", "selectMarginRight", "selectPaddingTop", "selectPaddingBottom", "selectPaddingLeft", "selectPaddingRight" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            socialicons: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            socialsharing: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            socialsharingitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration", "textColorHover", "iconColorHover" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Borders & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                        ],
                    },
                ],
            },
            soundcloud: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            spacer: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            switcher: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            switchercontent: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            switchercontentitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            tabs: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            tabscontent: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            tabscontentitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            tabsheader: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            tabsheaderitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Shadow Styling"),
                                reset: true,
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowBlur", "boxShadowSpread", "boxShadowColor" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "active",
                        label: OP3._("Active"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "box-shadow",
                                label: OP3._("Shadow Styling"),
                                reset: true,
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowActiveBlur", "boxShadowActiveSpread", "boxShadowActiveColor" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Shadow Styling"),
                                reset: true,
                                property: [ "boxShadowAngle", "boxShadowDistance", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            tcp_a: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "hover",
                                label: OP3._("Hover"),
                                reset: true,
                                property: [ "tcp_a_transitionDuration" ],
                            },
                        ],
                    },
                ],
            },
            tcp_all: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                        ],
                    },
                ],
            },
            tcp_blockquote: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_blockquote_boxModel", "tcp_blockquote_marginTop", "tcp_blockquote_marginBottom", "tcp_blockquote_marginLeft", "tcp_blockquote_marginRight", "tcp_blockquote_paddingTop", "tcp_blockquote_paddingBottom", "tcp_blockquote_paddingLeft", "tcp_blockquote_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_h1: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_h1_boxModel", "tcp_h1_marginTop", "tcp_h1_marginBottom", "tcp_h1_marginLeft", "tcp_h1_marginRight", "tcp_h1_paddingTop", "tcp_h1_paddingBottom", "tcp_h1_paddingLeft", "tcp_h1_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_h2: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_h2_boxModel", "tcp_h2_marginTop", "tcp_h2_marginBottom", "tcp_h2_marginLeft", "tcp_h2_marginRight", "tcp_h2_paddingTop", "tcp_h2_paddingBottom", "tcp_h2_paddingLeft", "tcp_h2_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_h3: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_h3_boxModel", "tcp_h3_marginTop", "tcp_h3_marginBottom", "tcp_h3_marginLeft", "tcp_h3_marginRight", "tcp_h3_paddingTop", "tcp_h3_paddingBottom", "tcp_h3_paddingLeft", "tcp_h3_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_h4: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_h4_boxModel", "tcp_h4_marginTop", "tcp_h4_marginBottom", "tcp_h4_marginLeft", "tcp_h4_marginRight", "tcp_h4_paddingTop", "tcp_h4_paddingBottom", "tcp_h4_paddingLeft", "tcp_h4_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_h5: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_h5_boxModel", "tcp_h5_marginTop", "tcp_h5_marginBottom", "tcp_h5_marginLeft", "tcp_h5_marginRight", "tcp_h5_paddingTop", "tcp_h5_paddingBottom", "tcp_h5_paddingLeft", "tcp_h5_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_h6: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_h6_boxModel", "tcp_h6_marginTop", "tcp_h6_marginBottom", "tcp_h6_marginLeft", "tcp_h6_marginRight", "tcp_h6_paddingTop", "tcp_h6_paddingBottom", "tcp_h6_paddingLeft", "tcp_h6_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_headings: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_headings_boxModel", "tcp_headings_marginTop", "tcp_headings_marginBottom", "tcp_headings_marginLeft", "tcp_headings_marginRight", "tcp_headings_paddingTop", "tcp_headings_paddingBottom", "tcp_headings_paddingLeft", "tcp_headings_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_li: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("List Positioning"),
                                reset: true,
                                property: [ "tcp_li_boxModel", "tcp_li_marginTop", "tcp_li_marginBottom", "tcp_li_marginLeft", "tcp_li_marginRight", "tcp_li_paddingTop", "tcp_li_paddingBottom", "tcp_li_paddingLeft", "tcp_li_paddingRight" ],
                            },
                            {
                                id: "positioning_item",
                                label: OP3._("Item Positioning"),
                                reset: true,
                                property: [ "tcp_li_itemBoxModel", "tcp_li_itemMarginTop", "tcp_li_itemMarginBottom", "tcp_li_itemMarginLeft", "tcp_li_itemMarginRight", "tcp_li_itemPaddingTop", "tcp_li_itemPaddingBottom", "tcp_li_itemPaddingLeft", "tcp_li_itemPaddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_modal: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                        ],
                    },
                ],
            },
            tcp_p: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_p_boxModel", "tcp_p_marginTop", "tcp_p_marginBottom", "tcp_p_marginLeft", "tcp_p_marginRight", "tcp_p_paddingTop", "tcp_p_paddingBottom", "tcp_p_paddingLeft", "tcp_p_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_pre: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "tcp_pre_boxModel", "tcp_pre_marginTop", "tcp_pre_marginBottom", "tcp_pre_marginLeft", "tcp_pre_marginRight", "tcp_pre_paddingTop", "tcp_pre_paddingBottom", "tcp_pre_paddingLeft", "tcp_pre_paddingRight" ],
                            },
                        ],
                    },
                ],
            },
            tcp_texts: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "typography_override",
                                label: OP3._("Typography Override"),
                                // content rendered by op3-live-editor-property-type-typography-override.js
                            },
                        ],
                    },
                ],
            },
            testimonial: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth", "maxWidth", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            testimonialitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "minHeight", "matchScreenHeight", "justifyContent" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "columnsLayoutDesktop", "wrapColumnsFlexBasisDesktop", "stackColumnsDesktopReverse", "columnsLayoutTablet", "wrapColumnsFlexBasisTablet", "stackColumnsTabletReverse", "columnsLayoutMobile", "wrapColumnsFlexBasisMobile", "stackColumnsMobileReverse" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            text: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                property: [ "borderTopWidth", "borderTopStyle", "borderTopColor", "borderRightWidth", "borderRightStyle", "borderRightColor", "borderBottomWidth", "borderBottomStyle", "borderBottomColor", "borderLeftWidth", "borderLeftStyle", "borderLeftColor", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "typography",
                                label: OP3._("Typography"),
                                reset: true,
                                property: [ "colorHover", "fontWeightHover", "fontStyleHover", "textTransformHover", "textDecorationHover" ],
                            },
                        ],
                    },
                ],
            },
            textarea: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Element Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "width" ],
                            },
                            {
                                id: "input-positioning",
                                label: OP3._("Textarea Positioning"),
                                reset: true,
                                property: [ "inputBoxModel", "inputMarginTop", "inputMarginBottom", "inputMarginLeft", "inputMarginRight", "inputPaddingTop", "inputPaddingBottom", "inputPaddingLeft", "inputPaddingRight" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class" ],
                            },
                        ],
                    },
                ],
            },
            textwithicon: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition", "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover", "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                filter: [
                                    {
                                        label: OP3._("Background"),
                                        lib: "filterButton",
                                        options: [
                                            {
                                                label: OP3._("Colour"),
                                                property: [ "backgroundImageBaseHoverType", "backgroundColorBaseHover", "backgroundImageBaseHoverAngle", "backgroundImageBaseHoverPosition", "backgroundImageBaseHoverStartColor", "backgroundImageBaseHoverStartPosition", "backgroundImageBaseHoverStopColor", "backgroundImageBaseHoverStopPosition" ],
                                            },
                                            {
                                                label: OP3._("Image"),
                                                property: [ "backgroundImageHoverUrl", "opacityHover100", "backgroundPositionHover", "backgroundAttachmentHover", "backgroundRepeatHover", "backgroundSizeHover" ],
                                            },
                                            {
                                                label: OP3._("Overlay"),
                                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                            {
                                id: "box-shadow",
                                label: OP3._("Box Shadow"),
                                reset: true,
                                property: [ "boxShadowHover", "boxShadowHoverOffsetX", "boxShadowHoverOffsetY", "boxShadowHoverBlur", "boxShadowHoverSpread", "boxShadowHoverColor" ],
                            },
                        ],
                    },
                ],
            },
            treemenu: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "width", "matchScreenWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility", "stackColumnsDesktop", "stackColumnsTablet", "stackColumnsMobile", "hamburgerFontSize", "hamburgerColor", "hamburgerJustifyContent", "hamburgerIconVisible", "hamburgerIcon", "hamburgerTextVisible", "hamburgerTextLabel", "hamburgerIconOrder", "hamburgerMarginLeft", "hamburgerMarginRight", "treeMenuStyling", "hamburgerSidebarWidth", "hamburgerBackgroundColor", "hamburgerIconClose", "hamburgerIconCloseColor", "hamburgerIconCloseFontSize", "hamburgerIconCloseVerticalOffset", "hamburgerTriangleVisible", "hamburgerTriangleSize", "hamburgerTriangleTop" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex"],
                            },
                        ],
                    },
                ],
            },
            treemenuitem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "childwrap-positioning",
                                label: OP3._("Subitems Positioning"),
                                reset: true,
                                property: [ "childWrapBoxModel", "childWrapMarginTop", "childWrapMarginBottom", "childWrapMarginLeft", "childWrapMarginRight", "childWrapPaddingTop", "childWrapPaddingBottom", "childWrapPaddingLeft", "childWrapPaddingRight", "submenuAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "shadow",
                                label: OP3._("Shadow Styling"),
                                property: [ "childWrapBoxShadowAngle", "childWrapBoxShadowDistance", "childWrapBoxShadowBlur", "childWrapBoxShadowSpread", "childWrapBoxShadowColor" ],
                            },
                            {
                                id: "triangle",
                                label: OP3._("Triangle"),
                                property: [ "triangleVisible", "triangleSize", "triangleTop", "triangleLeft", "triangleMarginRight", "triangleMarginBottom" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [ "transitionDuration" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Border"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover" ],
                            },
                        ],
                    },
                ],
            },
            trustbadge: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-paint-37-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "marginAlign", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            tweet: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "maxWidth" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                    {
                        id: "hover",
                        label: OP3._("Hover"),
                        icon: "op3-icon-cursor-pointer",
                        group: [
                            {
                                id: "general",
                                label: OP3._("General"),
                                reset: true,
                                property: [  "transitionDuration", "tweetColorHover", "labelColorHover", "iconColorHover" ],
                            },
                            {
                                id: "background",
                                label: OP3._("Background"),
                                reset: true,
                                property: [ "backgroundImageOverlayHoverType", "backgroundColorOverlayHover", "backgroundImageOverlayHoverAngle", "backgroundImageOverlayHoverPosition", "backgroundImageOverlayHoverStartColor", "backgroundImageOverlayHoverStartPosition", "backgroundImageOverlayHoverStopColor", "backgroundImageOverlayHoverStopPosition" ],
                            },
                            {
                                id: "border",
                                label: OP3._("Borders & Corners"),
                                reset: true,
                                property: [ "borderTopWidthHover", "borderTopStyleHover", "borderTopColorHover", "borderRightWidthHover", "borderRightStyleHover", "borderRightColorHover", "borderBottomWidthHover", "borderBottomStyleHover", "borderBottomColorHover", "borderLeftWidthHover", "borderLeftStyleHover", "borderLeftColorHover", "borderTopLeftRadiusHover", "borderTopRightRadiusHover", "borderBottomRightRadiusHover", "borderBottomLeftRadiusHover" ],
                            },
                        ],
                    },
                ],
            },
            video: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            videothumbnail: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            webinarcalendar: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "maxWidth", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            webinarcalendaritem: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement", "html" ],
                            },
                        ],
                    },
                ],
            },
            webinardate: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "maxWidth", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
            webinarlink: {
                tab: [
                    {
                        id: "advanced",
                        label: OP3._("Advanced"),
                        icon: "op3-icon-preferences-2",
                        group: [
                            {
                                id: "positioning",
                                label: OP3._("Positioning"),
                                reset: true,
                                property: [ "boxModel", "marginTop", "marginBottom", "marginLeft", "marginRight", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "paddingDrag", "maxWidth", "marginAlign" ],
                            },
                            {
                                id: "responsive",
                                label: OP3._("Responsive"),
                                reset: true,
                                property: [ "deviceVisibility", "forceVisibility" ],
                            },
                            {
                                id: "animation",
                                label: OP3._("Animation & Delay"),
                                reset: true,
                                appendHTML: '<div class="op3-options-group-notes">' + OP3._("Set a time delay before this element appears on your page.") + '</div>',
                                property: [ "animationTrigger", "animationStyle", "animationLoop", "timerMinutes", "timerSeconds" ],
                            },
                            {
                                id: "advanced",
                                label: OP3._("Advanced"),
                                reset: true,
                                property: [ "id", "caption", "class", "zIndex", "codeBeforeElement", "codeAfterElement" ],
                            },
                        ],
                    },
                ],
            },
        }

        return result;
    };

})(jQuery, window, document);
