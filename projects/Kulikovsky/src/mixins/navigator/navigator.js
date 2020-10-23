const ScreenDashboard = () => import('_screen_dashboard')
const ScreenAuthorization = () => import('_screen_authorization')
const ScreenOnBoarding = () => import('_screen_onboarding')
const ScreenAuthConfirmPin = () => import('_screen_auth_confirm_pin')

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
            showOnBoarding: constants.OnBoarding.Getters.showOnBoarding,
            userConfig: constants.MrewardUser.Getters.userConfig
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
            getUserData: constants.MrewardUser.Actions.getUserData,
            replacePage: constants.App.Actions.replacePage
        }),

        onUpdateSettings(data) {
            ApiClient.setConfig(data)
        },

        async onStartPage() {
            const authToken = await this.getAuthToken()
            await this.getOnBoarding()
            await this.getUserData()

            if (!this.showOnBoarding) {
                this.replacePage(ScreenOnBoarding)
            } else if (this.userConfig.pin && this.userConfig.usePin) {
                this.replacePage(ScreenAuthConfirmPin)
            } else if (authToken) {
                this.replacePage(ScreenDashboard)
            } else {
                this.replacePage(ScreenAuthorization)
            }
        },

        onOnline() {
            this.$bus.$emit('showStatusPopover', {
                  status: 1,
                  title: this.$t('m_online_toast'),
                  nextEvent: () => {
                  }
              })
        },

        onOffline() {
            this.$bus.$emit('showStatusPopover', {
                status: 0,
                title: this.$t('m_offline_toast'),
                nextEvent: () => {
                }
            })
        }
    }
}
