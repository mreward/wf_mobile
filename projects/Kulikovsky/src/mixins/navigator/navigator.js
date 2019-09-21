const ScreenDashboard = () => import('_screen_dashboard')
const ScreenAuthorization = () => import('_screen_authorization')
const ScreenOnBoarding = () => import('_screen_onboarding')

import ApiClient from '_CORE/modules/mReward/libs/ApiClient'
import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'

export default {
    data: () => ({
        timeoutSplashScreen: 0
    }),
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings,
            showOnBoarding: constants.OnBoarding.Getters.showOnBoarding
        }),

        supportMail() {
            return {
                email: this.settings.supportMail,
                subject: '',
                body: ''
            }
        }
    },
    created() {
        if (window.StatusBar) {
            window.StatusBar.styleDefault()
        }
    },
    methods: {
        ...mapActions({
            getOnBoarding: constants.OnBoarding.Actions.getOnBoarding,
            getAuthToken: constants.MrewardUser.Actions.getAuthToken,
            replacePage: constants.App.Actions.replacePage
        }),

        onUpdateSettings(data) {
            ApiClient.setConfig(data)
        },

        async onStartPage() {
            const authToken = await this.getAuthToken()
            await this.getOnBoarding()

            if (!this.showOnBoarding) {
                this.replacePage(ScreenOnBoarding)
            } else if (authToken) {
                this.replacePage(ScreenDashboard)
            } else {
                this.replacePage(ScreenAuthorization)
            }
        }
    }
}
