/**
 * Вспомогательные методы
 */
import Analytics from '_CORE/plugins/common/Analytics'
import Logging from '_CORE/plugins/common/Logging'
import SplashScreen from '_CORE/plugins/common/SplashScreen'

import { store } from '_CORE/store'
import constants from '_vuex_constants'
import Vue from 'vue'
import LogRocket from 'logrocket'

import ImgCache from '_CORE/plugins/common/ImgCache'
import Range from './ons-elements/range'
import Localforage from './components/localforage.config'
import Lang from './components/lang'
import Hockeyapp from './components/hockeyapp'
import KeyboardHandler from './components/keyboard'
import TimeReload from './components/timereload'
import Notification from './components/notifications'
import AppsFlyer from './components/appsflyer'

export const mWalletPlugin = {
    install(Vue) {
        Vue.prototype.$GA = Analytics
        Vue.prototype.$SplashScreen = SplashScreen

        Range.init(Vue)
    }
}

export const InitCoreMwallet = async (configWallet) => {
    Vue.config.productionTip = false
    await Localforage.init(configWallet)

    Logging.Init(store.dispatch, constants.App.Actions.addLog)
    await Lang.init(configWallet)
    Notification.init()
    Hockeyapp.init(configWallet)
    KeyboardHandler.init(configWallet)
    TimeReload.init(configWallet)
    AppsFlyer.init(configWallet)

    try {
        await ImgCache.Init()
    } catch (error) {
        console.error('ImgCache init Error: ', error)
    }

    // LogRocket
    if (_DEVMOD === 'true' &&
        window.cordova &&
        configWallet.application.logRocketId) {
        console.log('LogRocket.init')
        LogRocket.init(configWallet.application.logRocketId)
    }
}
