import constants from '_vuex_constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        country: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        countryIndex: ''
    }),
    computed: {
        ...mapGetters({
            countries: constants.MrewardGeo.Getters.countries
        })
    },
    watch: {
        countryIndex(newValue, oldValue) {
            if (oldValue || oldValue === 0) {
                const country = this.countries[this.countryIndex]
                this.$bus.$emit('selectedCountry', country)
                this.popPage()
            }
        }
    },
    created() {
        this.countryIndex = this.countries.findIndex(({ phone_code: code, country_id: id }) => {
            return code === this.country.code && id === this.country.id
        })
    },
    methods: {
        ...mapActions({
            popPage: constants.App.Actions.popPage
        })
    }
}
