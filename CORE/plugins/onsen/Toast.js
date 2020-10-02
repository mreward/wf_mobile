import isString from 'lodash/isString'
import isObject from 'lodash/isObject'

export default {
    install(Vue) {
        Vue.prototype.$Toast = {
            _show(_options) {
                let options = {
                    buttonLabel: 'OK',
                    timeout: 2500,
                    force: true
                }

                if (isString(_options)) {
                    options.message = _options
                }

                if (isObject(_options)) {
                    options = { ...options, ..._options }
                }

                if (!options.message) {
                    return false
                }

                Vue.prototype.$ons.notification.toast(options)

                return options
            },

            Success(options = {}) {
                console.log(`Toast.Success msg: ${options}`)
                this._show(options)
            },

            Error(options = {}) {
                console.error(`Toast.Error msg: ${options}`)
                if (!options) {
                    return false
                }
                if (options instanceof Array && options.length) {
                    options.forEach((error) => {
                        this._show({ ...options, ...error })
                    })
                } else {
                    this._show(options)
                }
            },

            Warning(options = {}, timeout = 2500) {
                console.log(`Toast.Error msg: ${options}`)
                this._show({ ...options, timeout })
            }
        }
    }
}
