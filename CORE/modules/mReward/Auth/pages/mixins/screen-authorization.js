import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import MobileNumber from '_mobile_number'
const ScreenRegistration = () => import('_screen_registration')
const ScreenDashboard = () => import('_screen_dashboard')
const ScreenRecoveryPassword = () => import('_screen_recovery_password')
const ScreenOnBoarding = () => import('_screen_onboarding')
const ScreenAuthorization = () => import('_screen_authorization')

export default {
    components: {
        MobileNumber
    },
    data: () => ({
        showPass: false,
        mobile: '',
        password: '',
        modalCountryVisible: false,
        errorMessages: {}
    }),
    computed: {
        ...mapGetters({
            loaderVisible: constants.App.Getters.loaderVisible,
            moduleOptions: constants.App.Getters.moduleOptions,
            countries: constants.MrewardGeo.Getters.countries,
            settings: constants.App.Getters.settings
        })
    },
    methods: {
        ...mapActions({
            replacePage: constants.App.Actions.replacePage,
            pushPage: constants.App.Actions.pushPage,
            authenticateUser: constants.MrewardUser.Actions.authenticateUser
        }),

        goToRegistration() {
            this.replacePage(ScreenRegistration)
        },

        goToAboutApp() {
            this.replacePage(ScreenOnBoarding)
        },

        async sendAuthorization() {
            try {
                this.errorMessages = {}
                await this.authenticateUser({
                    mobileNumber: `${this.selectedCountry.code}${this.mobile}`,
                    password: this.password
                })

                this.replacePage({
                    extends: ScreenDashboard,
                    options: {
                        animation: 'none'
                    }
                })
            } catch ({ error: { data = [] }, message }) {
                data.forEach((item) => {
                    this.$set(this.errorMessages, item.field, item.message)
                })

                // this.$Alert.Error({ message })
            }
        },

        async goToRecoveryPassword() {
            const $this = this

            this.pushPage({
                extends: ScreenRecoveryPassword,
                data: () => {
                    return {
                        mobile: this.mobile,
                        code: this.selectedCountry.code,
                        titleTranslationKey: 'm_auth_recovery_password_title'
                    }
                },
                methods: {
                    callbackPageOpen: (data = {}) => {
                        $this.$bus.$emit(
                          'showStatusPopover',
                          {
                              status: 1,
                              title: $this.$t('m_auth_password_changed_done'),
                              nextEvent: () => {
                                  $this.replacePage({
                                      extends: ScreenAuthorization,
                                      data: () => {
                                          return {
                                              ...data,
                                          }
                                      },
                                  })
                              },
                          },
                        )
                    },
                },
            })
        },

        hidePhoneInputError() {
            this.errorMessages['phone'] = ''
            this.errorMessages['mobile'] = ''
        }
    }
}
