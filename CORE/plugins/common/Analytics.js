import Vue from 'vue'
import LogRocket from 'logrocket'
/**
 * Analytics plugin for track pages in google analytics, Firebase  and LogRocket.
 *
 * @example
 * <caption>This plugin `Analytics` with params</caption>
 * import Analytics from '_PLUGINS/common/Analytics'; or import Analytics from '_CORE/plugins/common/Analytics';
 *
 * Analytics.TrackPage(name)
 */

export default {
    /**
     * track screen in analytics systems
     * @param page - page name
     * @example
     * <caption>-----</caption>
     * import Analytics from '_PLUGINS/common/Analytics';
     *
     * Analytics.TrackPage(page)
     */
    TrackPage(page) {
        if (window.cordova && window.ga) {
            window.ga.trackView(page)
            LogRocket.track(page)
        }

        if (window.plugins && window.plugins.appsFlyer) {
            window.plugins.appsFlyer.trackEvent(`Page: ${page}`)
        }

        if (window.FirebasePlugin) {
            window.FirebasePlugin.setScreenName(page)
        }
    },

    /**
     * convert system page name to readable form
     * @param name - page name
     * @param category - category name (for gifts)
     */
    TrackPageConvert(name, category) {
        let namePage = Vue.prototype.$polyglot._translate(`m_ga_${name}`)
        if (category) {
            namePage = Vue.prototype.$polyglot._translate(`m_ga_${name}-${category.toLowerCase().split(' ').join('_')}`)
        }
        console.log(namePage)

        this.TrackPage(namePage)
    },

    /**
     * track event in analytics systems
     * @param event - event name
     * @param options - event options
     * @example
     * <caption>-----</caption>
     * import Analytics from '_PLUGINS/common/Analytics';
     *
     * Analytics.TrackEvent(event)
     */
    TrackEvent(event, options = {}) {
        if (window.FirebasePlugin) {
            window.FirebasePlugin.logEvent(event, options)
        } else {
            console.log('FirebasePlugin plugin not installed')
        }

        if (window.cordova && window.ga) {
            window.ga.trackEvent(event)
        } else {
            console.log('ga plugin not installed')
        }

        if (Vue.prototype.$ons.isWebView()) {
            LogRocket.track(event)
        }

        if (window.plugins && window.plugins.appsFlyer) {
            window.plugins.appsFlyer.trackEvent(`Event: ${event}`, options)
        } else {
            console.log('appsFlyer plugin not installed')
        }
    }
}
