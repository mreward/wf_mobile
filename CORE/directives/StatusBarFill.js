import VueOnsen from 'vue-onsenui/esm/index'

/* eslint-disable no-mixed-operators */
VueOnsen.platform.isIPhoneX = function() {
    // iPhone 8 and iPhone X have a same user agent. We cannot avoid using window.screen.
    // This works well both in iOS Safari and (UI|WK)WebView of iPhone X.
    // Added extra sizes for IPhone XR
    return this.isIPhone() &&
        (window.screen.width === 375 && window.screen.height === 812 ||
            window.screen.width === 414 && window.screen.height === 896 ||
            window.screen.width === 896 && window.screen.height === 414 ||
            window.screen.width === 812 && window.screen.height === 375)
}

/**
 * StatusBarFill Directive
 *
 * Life hack for transparent status bar
 *
 * To use:
 * Add `v-status-bar-fill` attribute to `<v-ons-page />` tag
 *
 * @example
 *
 * <v-ons-page v-status-bar-fill/>
 *
 * @type {{bind: (function(*))}}
 */
export default {
    bind: (el) => {
        if (!(VueOnsen.platform.isAndroidPhone() && window.device && parseFloat(device.version) < 5) &&
            !VueOnsen.platform.isIPhoneX()) {
            el.setAttribute('status-bar-fill', '')
        }
    }
}
