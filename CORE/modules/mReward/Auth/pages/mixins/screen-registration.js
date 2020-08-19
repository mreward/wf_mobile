import constants from '_vuex_constants'
import { mapGetters, mapActions } from 'vuex'
import MobileNumber from '_mobile_number'
import DynamicInput from '_dynamic_input'
const ScreenConfirmOtp = () => import('_screen_confirm_otp')
const ScreenAuthorization = () => import('_screen_authorization')
const ScreenConfirmPin = () => import('_screen_confirm_pin')

export default {
    components: {
        MobileNumber,
        DynamicInput
    },
    data: () => ({
        mobile: '',
        user: {
            password: ''
        },
        dynamicInput: {},
        errorMessages: {}
    }),
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings,
            loaderVisible: constants.App.Getters.loaderVisible,
            profileRequiredFields: constants.MrewardProfile.Getters.profileRequiredFields,
            profileFields: constants.MrewardProfile.Getters.profileFields
        }),
        mobileNumber() {
            return (`${this.selectedCountry.code} ${this.mobile}`).replace(/\s/g, '')
        }
    },
    async created() {
        try {
            await this.getProfileParams()

            this.addDynamicFieldsToData()
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            replacePage: constants.App.Actions.replacePage,
            pushPage: constants.App.Actions.pushPage,
            registrationUser: constants.MrewardUser.Actions.registrationUser,
            getProfileParams: constants.MrewardProfile.Actions.getProfileParams,
            registrationUserConfirm: constants.MrewardUser.Actions.registrationUserConfirm
        }),
        addDynamicFieldsToData() {
            if (this.profileFields.length) {
                this.profileFields.forEach(({ key, data_type: type }) => {
                    if (type === 4) {
                        this.$set(this.dynamicInput, key, 1)
                        return
                    }
                    this.$set(this.dynamicInput, key, '')
                })
            }
        },
        goToAuthorization() {
            this.replacePage(ScreenAuthorization)
        },

        async sendRegistration() {
            try {
                this.errorMessages = {}
                // this is final model for api
                const model = {
                    ...this.dynamicInput,
                    id_city: this.city.id,
                    id_region: this.city.regionId,
                    id_country: this.selectedCountry.id,
                    password: this.user.password,
                    phone: this.mobileNumber
                }
                const { sms_id: smsId } = await this.registrationUser(model)

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
                                await this.registrationUserConfirm({
                                    smsCode: smsCode,
                                    smsId: smsId
                                })
                                this.replacePage({
                                    extends: ScreenConfirmPin,
                                    data: () => {
                                        return {
                                            mobile: this.mobile,
                                            code: this.selectedCountry.code
                                        }
                                    }
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
        }
    }
}
