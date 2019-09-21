/**
 * Google Analytic Directive for detecting user actions
 *
 * To use:
 * Add to any `button` `v-ons-button`
 *
 * @example
 * <caption>This directive `v-ga` with arguments</caption>
 * import { Analytics } from '_directives';
 * Vue.directive('ga', Analytics);
 *
 * <v-ons-button v-ga:addCard />
 * @example
 * <caption>You can also pass value for example: clicking category</caption>
 * v-ga:category="Love"
 * @type {{inserted: function(*, {arg: *, value: *})}}
 */
export default {
    name: 'ga',
    inserted: (el, { arg, value }) => {
        setTimeout(() => {
            el.addEventListener('click', () => {
                if (window.cordova && window.ga) {
                    window.ga.trackEvent('Prod', 'click', arg, value)
                }

                if (window.plugins && window.plugins.appsFlyer) {
                    window.plugins.appsFlyer.trackEvent('click', {
                        [arg]: value
                    })
                }
            })
        }, 0)
    }
}
