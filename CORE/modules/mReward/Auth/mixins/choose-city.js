import constants from '_vuex_constants'
import {mapActions, mapGetters} from 'vuex'
const ScreenSelectCity = () => import('_screen_select_city')

export default {
    data: () => ({
        city: {
            name: ''
        }
    }),
    created() {
        this.$bus.$on('selectedCity', this.chooseCity)
    },
    beforeDestroy() {
        this.$bus.$on('selectedCity', this.chooseCity)
    },
    computed: {
        ...mapGetters({
            cityFields: constants.MrewardProfile.Getters.cityFields
        })
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            addCity: constants.MrewardProfile.Actions.addCity
        }),
        chooseCity({ city_name: name, city_id: id, region_id: regionId }) {
            this.$delete(this.errorMessages, 'id_city')
            this.city =  {
                name,
                id,
                regionId
            }
            this.addCity(this.city)
        },
        goToSelectCity() {
            this.pushPage({
                extends: ScreenSelectCity,
                props: {
                    country: {
                        type: Object,
                        default: () => (this.selectedCountry)
                    }
                }
            })
        }
    }
}
