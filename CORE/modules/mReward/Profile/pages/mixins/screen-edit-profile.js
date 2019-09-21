import constants from '_vuex_constants'
import { mapGetters, mapActions } from 'vuex'
import DynamicInput from '_dynamic_input'
import MaskPhone from '_PLUGINS/common/MaskPhone'
import _isEqual from 'lodash/isEqual'

export default {
    components: {
        DynamicInput
    },
    data: () => ({
        dynamicInput: {},
        errorMessages: {},
        selectedCountry: {
            code: ''
        },
        allStartProfileData: {}
    }),
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings,
            profile: constants.MrewardProfile.Getters.userProfile,
            countries: constants.MrewardGeo.Getters.countries,
            profileFields: constants.MrewardProfile.Getters.profileFields
        }),
        nothingChanges() {
            const allProfileData = {
                city: this.city.name,
                ...this.dynamicInput
            }
            return _isEqual(allProfileData, this.allStartProfileData)
        }
    },
    async created() {
        try {
            if (!this.profileFields.length) {
                await this.getProfileParams()
            }

            if (!this.countries.length) {
                await this.getCountries()
            }

            if (this.profile.id_city) {
                this.setCityName()
            }

            this.addDynamicFieldsToData()
            this.setCountry()
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            getProfileParams: constants.MrewardProfile.Actions.getProfileParams,
            editProfileAction: constants.MrewardProfile.Actions.editProfile,
            popToPage: constants.App.Actions.popToPage,
            getCountries: constants.MrewardGeo.Actions.getCountries,
            getCityById: constants.MrewardGeo.Actions.getCityById
        }),
        async setCityName() {
            try {
                const {target: {city_name: name}} = await this.getCityById({
                    id: this.profile.id_city
                })
                this.city.name = name
                this.allStartProfileData.city = name
            } catch (e) {
                this.$Alert.Error(e)
            }
        },
        setCountry() {
            const fullMobileNumber = `+${this.profile.mobile}`
            const countryCode = MaskPhone.GetCountryByPhoneNumber(fullMobileNumber)

            const country = this.countries.find(({ code }) => {
                return code === countryCode
            })

            const { phone_code: code, country_id: id, country_name: name, code: iso } = country
            this.selectedCountry = {
                code,
                id,
                name,
                iso
            }
        },
        addDynamicFieldsToData() {
            if (this.profileFields.length) {
                this.profileFields.forEach(({ key }) => {
                    this.$set(this.dynamicInput, key, '')

                    // check dynamic fields in profile
                    if (this.profile.hasOwnProperty(key)) {
                        this.dynamicInput[key] = this.profile[key]
                    }
                })
                this.allStartProfileData = { ...this.allStartProfileData, ...this.dynamicInput }
            }
        },
        async editProfile() {
            try {
                this.errorMessages = {}
                // this is final model for api
                const model = {
                    ...this.dynamicInput,
                    id_city: this.city.id,
                    id_region: this.city.regionId
                }
                await this.editProfileAction(model)

                this.$bus.$emit(
                    'showStatusPopover',
                    {
                        status: 1,
                        title: this.$t('m_profile_edit_profile_success'),
                        nextEvent: this.goToProfile
                    }
                )
            } catch ({ error: { data = [] }, message }) {
                data.forEach((item) => {
                    this.$set(this.errorMessages, item.field, item.message)
                })

                // this.$Alert.Error({ message })
            }
        },
        goToProfile() {
            this.popToPage('screen-home')
        }
    }
}
