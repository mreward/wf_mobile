import constants from '_vuex_constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        selectedCountry: {
            code: ''
        }
    }),
    computed: {
        ...mapGetters({
            countries: constants.MrewardGeo.Getters.countries,
            settings: constants.App.Getters.settings
        })
    },
    async created() {
        this.$bus.$on('selectedCountry', this.chooseCountry)
        this.selectedCountry.code = this.settings.defaultPhoneCode
        this.selectedCountry.id = this.settings.defaultCountryId
        try {
            if (!this.countries.length) {
                await this.getCountries()
            }
            this.chooseCountry()
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    beforeDestroy() {
        this.$bus.$off('selectedCountry', this.chooseCountry)
    },
    methods: {
        ...mapActions({
            getCountries: constants.MrewardGeo.Actions.getCountries
        }),
        chooseCountry(item) {
            let country = item
            if (!country) {
                country = this.countries.find(({phone_code: code, country_id: id}) => {
                    return code === this.selectedCountry.code && id === this.selectedCountry.id
                })
            }

            const {phone_code: code, country_id: id, country_name: name, code: iso, mask} = country
            this.selectedCountry = {
                code,
                id,
                name,
                iso,
                mask
            }
        }
    }
}
