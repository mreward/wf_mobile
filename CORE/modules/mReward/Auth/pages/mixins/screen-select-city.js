import constants from '_vuex_constants'
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'

export default {
    props: {
        country: {
            type: Object,
            default: () => ({
                id: 99,
                name: 'Кыргызстан',
                code: '+996'
            })
        }
    },
    data() {
        return {
            search: '',
            cityIndex: ''
        }
    },
    computed: {
        ...mapGetters({
            cities: constants.MrewardGeo.Getters.cities
        })
    },
    watch: {
        search(value) {
            if (value && value.length >= 2) {
                this.searchCities(value)
            }
        },
        cityIndex() {
            const city = this.cities[this.cityIndex]
            this.$bus.$emit('selectedCity', city)
            this.popPage()
        }
    },
    mounted() {
        this.$refs.search.focus()
    },
    methods: {
        ...mapActions({
            getCities: constants.MrewardGeo.Actions.getCities,
            popPage: constants.App.Actions.popPage
        }),
        cancelFind() {
            this.search = ''
        },
        searchCities: debounce(async function search(value) {
            try {
                await this.getCities({
                    country: this.country.id,
                    city: value
                })
            } catch (e) {
                //
            }
        }, 300)
    }
}
