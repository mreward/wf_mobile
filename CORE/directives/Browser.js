/**
 * Open external url in browser
 * For mobile it uses cordova-plugin-inappbrowser {@link https://github.com/apache/cordova-plugin-inappbrowser}
 * For web it uses default window.open() function
 * To use:
 * Add `v-browser="url"` to any html element you want to click to open the webpage
 * @example
 * import { Browser } from '_directives';
 * Vue.directive('browser', Browser);
 *
 * <v-ons-button v-browser="url" />
 * @type {{bind: (function(*, {value: *}))}}
 */
export default {
    bind: (el, { value }) => {
        let url = value
        if (!/^https?:\/\//i.test(url)) {
            url = `http://${url}`
        }
        el.addEventListener('click', () => {
            if (window.cordova) {
                cordova.InAppBrowser.open(url, '_blank', 'location=yes')
            } else {
                window.open(url)
            }
        })
    }
}
