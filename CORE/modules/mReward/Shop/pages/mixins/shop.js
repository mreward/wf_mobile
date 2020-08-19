import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import PullToWrapper from '_pull_to_wrapper'
const ScreenPromotionsDetails = () => import('_screen_promotions_details')

export default {
    components: {
        PullToWrapper
    },
    data() {
        return {
            layout: 'tab',
            tab: 'top',
            search: '',
            selectCountry: '',
            tabbarIndex: 0,
        }
    },
    computed: {
        ...mapGetters({
            profile: constants.MrewardProfile.Getters.userProfile,
            countries: constants.MrewardGeo.Getters.countries,
        }),

        showCancelButton() {
            return this.search.length > 0
        },

        country () {
            if (!this.selectCountry && this.profile && this.profile.country) {
                const country = this.countries.find(i => i.country_id === this.profile.country)

                if(country) {
                    return country.flag
                }
            }

            return this.selectCountry
        },
    },
    watch: {

    },
    async created() {
        try {
            if (!this.countries.length) {
                await this.getCountries()
            }
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            popPage: constants.App.Actions.popPage,
            pushPage: constants.App.Actions.pushPage,
            popToPage: constants.App.Actions.popToPage,
            getCountries: constants.MrewardGeo.Actions.getCountries
        }),
        setActiveTab(name, index) {
            this.tab = name;
            this.tabbarIndex = index;

        },
        cleareSearchField() {
            this.search = ''
        },
        onSelectCountry() {

        }
    }
}
