import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import MobileNumber from '_mobile_number'
import StringMask from 'string-mask'
import MaskPhone from '_PLUGINS/common/MaskPhone'
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
        errorMessages: {},
        countryPhoneMask: '+000 000 000 000',
    }),
    computed: {
        ...mapGetters({
            loaderVisible: constants.App.Getters.loaderVisible,
            moduleOptions: constants.App.Getters.moduleOptions,
            settings: constants.App.Getters.settings,
            profile: constants.MrewardProfile.Getters.userProfile,
            countries: constants.MrewardGeo.Getters.countries,
            maskFromIso: constants.PhoneMasks.Getters.maskFromIso
        }),
        mobileNumber () {
            if (this.profile && this.profile.mobile) {
                return new StringMask(this.countryPhoneMask, {reverse: true}).apply(this.profile.mobile)
            }

            return `${this.selectedCountry.code} ${this.mobile}`
        }
    },
    mounted() {
        window.StatusBar && window.StatusBar.styleDefault();

        if (this.profile && this.profile.mobile) {
            this.setCountryPhoneMask()
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
        },

        setCountryPhoneMask() {
            const fullMobileNumber = `+${this.profile.mobile}`
            const countryCode = MaskPhone.GetCountryByPhoneNumber(fullMobileNumber)

            const country = this.countries.find(({ code }) => {
                return code === countryCode
            })

            const { phone_code: code, country_id: id, country_name: name, code: iso } = country
            const selectedCountry = {
                code,
                id,
                name,
                iso
            }

            const { mask } = this.maskFromIso(selectedCountry)
            this.countryPhoneMask = `${code} ${mask}`.replace(/[0-9x]/g, '0')
        },
    }
}
