import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

export default {
    install(Vue) {
        Vue.prototype.$Alert = {
            _show(options) {
                this._hideKeyboard()
                Vue.prototype.$bus.$emit('alert-confirm:Show', {
                    timeout: options.timeout,
                    pushData: options.pushData,
                    icon: options.icon,
                    img: options.img,
                    subIcon: options.subIcon,
                    title: options.title,
                    text: options.text || '',
                    cancelName: options.cancelName,
                    nextName: options.nextName || '',
                    type: options.type,
                    addFavorite: options.addFavorite,
                    nextCallback: options.nextEvent,
                    cancelCallback: options.cancelEvent,
                    showAgainCheckbox: options.showAgainCheckbox,
                    isBorder: options.isBorder
                })
            },

            Success(options = {}) {
                console.log('Alert.Success options', options)
                options.type = 'success'
                this._show(options)
            },

            Error(params = {}) {
                let options = params
                console.log('Alert.Error options', options)
                if (options.message) {
                    options = {
                        text: options.message
                    }
                }

                options.text = get(params, 'error.data[0].message', params.message)

                if (!options.text && options.text !== false) {
                    options.text = Vue.prototype.$polyglot._translate('m_sorry_error_in_application')
                }

                if (!options.title) {
                    options.title = Vue.prototype.$polyglot._translate('m_sorry_error')
                }

                if (!options.icon) {
                    options.icon = 'error'
                }

                if (!options.nextName) {
                    options.nextName = Vue.prototype.$polyglot._translate('m_report_bug')
                }

                if (!options.cancelName && options.cancelName !== false) {
                    options.cancelName = Vue.prototype.$polyglot._translate('m_close')
                }

                if (isFunction(params.nextEvent)) {
                    options.nextEvent = params.nextEvent
                } else {
                    options.nextEvent = () => {
                        Vue.prototype.$bus.$emit('sendLog')
                    }
                }
                options.type = 'error'
                this._show(options)
            },

            Confirm(options = {}) {
                console.log('Alert.Confirm options', options)
                options.type = 'confirm'
                options.isBorder = true
                this._show(options)
            },

            Info(options = {}) {
                console.log('Alert.Info options', options)
                options.type = 'info'
                this._show(options)
            },

            PushNotification(options = {}) {
                console.log('Alert.PushNotification options', options)
                options.type = 'notification'
                this._show(options)
            },

            _hideKeyboard() {
                if (window.Keyboard) {
                    if (Keyboard.hide) {
                        Keyboard.hide()
                    } else if (Keyboard.close) {
                        Keyboard.close()
                    }
                } else {
                    [...document.getElementsByTagName('input')].forEach(input => input.blur())
                }
            }
        }
    }
}
