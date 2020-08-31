import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import PullToWrapper from '_pull_to_wrapper'
import isFunction from 'lodash/isFunction'
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
            tabbarIndex: 0,
            popoverFavorite: false,
        }
    },
    computed: {
        ...mapGetters({
            profile: constants.MrewardProfile.Getters.userProfile,
            countries: constants.MrewardGeo.Getters.countries,
            cart: constants.MrewardShop.Getters.cart,
            totalCartProduct: constants.MrewardShop.Getters.totalCartProduct,
            country: constants.MrewardShop.Getters.country,
        }),

        showCancelButton() {
            return this.search.length > 0
        },
    },
    watch: {
        async search(value) {
            if (value.length > 2) {
                this.tab = 'search'
                this.getProductSearch({name: value})
            } else {
                this.tab = 'top'
            }
        }
    },
    async created() {
        this.$bus.$on('showPopoverFavorite', this.showPopoverFavorite.bind(this))
        this.$bus.$on('showCart', this.showCart.bind(this))

        try {
            if (!this.countries.length) {
                await this.getCountries()
                await this.getProductsFavorite()
            }

            if (this.profile && this.profile.country) {
                const country = this.countries.find(i => i.country_id === this.profile.country)
                if (country) {
                    this.selectCountry(country)
                }
            }
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    beforeDestroy() {
        this.$bus.$off('showPopoverFavorite', this.showPopoverFavorite.bind(this))
        this.$bus.$off('showCart', this.showCart.bind(this))
    },
    methods: {
        ...mapActions({
            popPage: constants.App.Actions.popPage,
            pushPage: constants.App.Actions.pushPage,
            popToPage: constants.App.Actions.popToPage,
            getCountries: constants.MrewardGeo.Actions.getCountries,
            getProductsFavorite: constants.MrewardShop.Actions.getProductsFavorite,
            selectCountry: constants.MrewardShop.Actions.selectCountry,
            getProductSearch: constants.MrewardShop.Actions.getProductSearch,
        }),
        setActiveTab(name, index) {
            this.tab = name;
            this.tabbarIndex = index;

        },
        cleareSearchField() {
            this.search = ''
        },
        showPopoverFavorite() {
            this.popoverFavorite = true
            setTimeout(() => {
                this.popoverFavorite = false
            }, 3000)
        },
        onSelectCountry(item) {
            this.countryDialog = false
            this.selectCountry(item)
        },
        showCart() {
            this.isVisibleCart = true
        }
    }
}
