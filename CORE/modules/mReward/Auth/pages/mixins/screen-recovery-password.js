import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import MobileNumber from '_mobile_number'
const ScreenConfirmOtp = () => import('_screen_confirm_otp')

export default {
    components: {
        MobileNumber
    },
    data: () => ({
        mobile: '',
        password: '',
        showPass: false,
        showMobileNumberInput: true,
        errorMessages: {}
    }),
    computed: {
        ...mapGetters({
            loaderVisible: constants.App.Getters.loaderVisible,
            moduleOptions: constants.App.Getters.moduleOptions,
            settings: constants.App.Getters.settings
        }),
        mobileNumber() {
            return `${this.selectedCountry.code} ${this.mobile}`
        }
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            replacePage: constants.App.Actions.replacePage,
            changePassword: constants.MrewardUser.Actions.changePassword,
            changePasswordConfirm: constants.MrewardUser.Actions.changePasswordConfirm
        }),

        async sendRecoveryPassword() {
            try {
                this.errorMessages = {}
                const { sms_id: smsId } = await this.changePassword({
                    mobileNumber: this.mobileNumber,
                    password: this.password
                })

                this.pushPage({
                    extends: ScreenConfirmOtp,
                    data: () => {
                        return {
                            mobileNumber: this.mobileNumber
                        }
                    },
                    methods: {
                        callback: async (smsCode) => {
                            try {
                                await this.changePasswordConfirm({
                                    smsCode: smsCode,
                                    smsId: smsId
                                })

                                this.callbackPageOpen({
                                    mobile: this.mobile,
                                    code: this.selectedCountry.code
                                })
                            } catch (error) {
                                this.$Alert.Error(error)
                            }
                        }
                    }
                })
            } catch ({ error: { data = [] }, message }) {
                data.forEach((item) => {
                    this.$set(this.errorMessages, item.field, item.message)
                })

                // this.$Alert.Error({ message })
            }
        },

        hidePhoneInputError() {
            this.errorMessages['phone'] = ''
            this.errorMessages['mobile'] = ''
        }
    }
}
