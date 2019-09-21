import Vue from 'vue'

/**
 * WebIntent plugin
 * NOTE: need add to project
 * cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=urlScheme (urlScheme from project configuration)
 * To use:
 * Call `WebIntent.Init()`
 */
export default {
    /**
     * @param urlScheme - URL_SCHEME (from project configuration)
     * @example
     * <caption>-----</caption>
     * import WebIntent from '_PLUGINS/common/WebIntent';
     *
     * WebIntent.Init((this.settings.urlScheme)
     */
    Init (urlScheme) {
        console.log('WebIntent Init')
        window.handleOpenURL = (URL) => {
            const url = URL || window.handleOpenURL.url
            console.log('WebIntent.handleOpenURL', window.handleOpenURL.isReady)
            if (window.handleOpenURL.isReady && url) {
                window.handleOpenURL.url = ''
                setTimeout(() => {
                    const {searchParams} = new window.URL(url)

                    if (url.indexOf('otp') > -1 && url.indexOf('?from=email') > -1) {
                        const otp = url.replace(`${urlScheme}://otp-`, '').replace('?from=email', '')
                        if (otp) {
                            Vue.prototype.$bus.$emit('intent-from-email', otp)
                        }
                    } else if (url.indexOf('otp-') > -1) {
                        const otp = url.replace(`${urlScheme}://otp-`, '')
                        if (otp) {
                            Vue.prototype.$bus.$emit('intent-otp-auth', {otp})
                        }
                    } else if (url.indexOf('pay-') > -1) {
                        const token = url.replace(`${urlScheme}://pay-`, '')
                        if (token) {
                            Vue.prototype.$bus.$emit('intent-pay', {token})
                        }
                    } else if (url.indexOf('invoicelong') > -1) {
                        const token = searchParams.get('data')
                        if (token) {
                            Vue.prototype.$bus.$emit('intent-pay', {token, text: url})
                        }
                    } else {
                        Vue.prototype.$bus.$emit('QrScanner:parse', {text: url})
                    }
                }, 0)
            } else {
                window.handleOpenURL.url = URL
            }
        }

        window.handleOpenURL.isReady = false
    },

    Ready () {
        console.log('WebIntent.Ready')
        window.handleOpenURL.isReady = true
        window.handleOpenURL()
    }
}
