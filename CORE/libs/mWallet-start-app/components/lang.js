import { store } from '_CORE/store'
import constants from '_vuex_constants'
import Polyglot from 'vue-polyglot'
import moment from 'moment/moment'
import Vue from 'vue'

export default {
    async init(configWallet) {
        let config = {}
        try {
            if (configWallet.application.autoLang) {
                const lang = navigator.language.substring(0, 2)
                const isLang = configWallet.application.languages.indexOf(lang) !== -1
                if (isLang) {
                    configWallet.application.lang = lang
                } else {
                    configWallet.application.lang = configWallet.application.languages[0]
                }
            }

            config = await store.dispatch(constants.App.Actions.setSettingsFromConfig, configWallet.application)
        } catch (error) {
            console.error('setSettingsFromConfig Error: ', error)
        }

        try {
            // Устанавливаем конфигурацию языка приложения
            Vue.use(Polyglot, {
                defaultLanguage: config.lang,
                languagesAvailable: config.languages
            })

            Vue.mixin({
                methods: {
                    $t(key, fallbackMessage, data) {
                        if (!this.$polyglot.locale[key] && !fallbackMessage) {
                            console.warn(`[vue-polyglot] Value of key '${key}' is not a string!`)
                        }

                        return this.$polyglot._translate(key, fallbackMessage, data)
                    }
                }
            })

            moment.locale(config.lang)
        } catch (error) {
            console.error('Polyglot init Error: ', error)
        }
    }
}
