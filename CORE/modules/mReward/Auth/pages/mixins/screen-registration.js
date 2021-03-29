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
        errorMessages: {},
        inputArray: []
    }),
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings,
            loaderVisible: constants.App.Getters.loaderVisible,
            profileRequiredFields: constants.MrewardProfile.Getters.profileRequiredFields,
            dynamicInputState: constants.MrewardProfile.Getters.dynamicInput,
            profileFields: constants.MrewardProfile.Getters.profileFields,
            cityFields: constants.MrewardProfile.Getters.cityFields
        }),
        cityParams(){
            return this.cityFields.name ? this.cityFields : this.city
        },
        mobileNumber() {
            return (`${this.selectedCountry.code} ${this.mobile}`).replace(/\s/g, '')
        }
    },
     async created() {
        try {
            const dynamicInputStateStart = await  this.dynamicInputState
            if ( Array.isArray( dynamicInputStateStart ) && dynamicInputStateStart.length === 0){
                await this.getProfileParams()
            }
            await this.getArrayInput()
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
            addDynamicFields: constants.MrewardProfile.Actions.addDynamicFields,
            addCity: constants.MrewardProfile.Actions.addCity,
            registrationUserConfirm: constants.MrewardUser.Actions.registrationUserConfirm
        }),
        async getArrayInput(){
            this.inputArray = await (this.dynamicInputState.length > 0 ? this.dynamicInputState : this.profileFields)
        },
        addDynamicFieldsToData() {
            if (this.profileFields.length) {
                this.profileFields.forEach(({ key, data_type: type }) => {
                    if (type === 4) {
                        this.$set(this.inputArray, key, 1)
                        return
                    }
                    this.$set(this.inputArray, key, '')
                })
            }
        },
       async goToAuthorization() {
            await this.addDynamicFields(this.inputArray)
           await this.replacePage(ScreenAuthorization)
        },

        async sendRegistration() {
            try {
                this.errorMessages = {}
                // this is final model for api
                // this.addDynamicFieldsToData()
                const model = {
                    ...this.inputArray,
                    id_city: this.cityFields.id,
                    id_region: this.cityFields.regionId,
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
