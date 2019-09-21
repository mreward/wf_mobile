import constants from '_vuex_constants'
import { mapActions } from 'vuex'
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
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage
        }),
        chooseCity({ city_name: name, city_id: id, region_id: regionId }) {
            this.errorMessages['id_city'] = ''
            this.city = {
                name,
                id,
                regionId
            }
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
