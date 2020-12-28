import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import PullToWrapper from '_pull_to_wrapper'
import { get, isEmpty, isFunction } from 'lodash'
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
            mode: '',
            loaderUpdate: true
        }
    },
    computed: {
        ...mapGetters({
            profile: constants.MrewardProfile.Getters.userProfile,
            countries: constants.MrewardGeo.Getters.countries,
            cart: constants.MrewardShop.Getters.cart,
            totalCartProduct: constants.MrewardShop.Getters.totalCartProduct,
            country: constants.MrewardShop.Getters.country,
            agreement: constants.MrewardСakeDesigner.Getters.agreement,
            profileFields: constants.MrewardProfile.Getters.profileFields
        }),

        showCancelButton() {
            return this.search.length > 0
        },

        isConstructor() {
            return false; // !isEmpty(this.agreement) && get(this.agreement, 'status', 0) === 1
        }
    },
    watch: {
        async search(value) {
            this.tab = 'catalog'

            if (value.length > 2) {
                this.goToSearch()
                this.getProductSearch({name: value})
            } else {
                this.tab = 'catalog'
                this.mode = ''
                this.clearProductSearch()
            }
        }
    },
    async created() {
        this.$bus.$on('showPopoverFavorite', this.showPopoverFavorite)
        this.$bus.$on('showCart', this.showCart)
        this.$bus.$on('showFilter', this.showFilter)
        this.$bus.$on('goToSearch', this.goToSearch)
        this.$bus.$on('clearSearch', this.clearSearchField)
        this.$bus.$on('currentTab', this.currentTab)

        try {
            if (!this.countries.length) {
                await this.getCountries()
                await this.getProductsFavorite()
            }

            await this.loadSelectCountry()

            if(get(this.country, 'config.id')) {
                await this.getAgreement({
                    partnerId: get(this.country, 'config.id')
                })
            }
        } catch (e) {
            this.$Alert.Error(e)
        }

        this.loaderUpdate = false

        try {
            if (!this.profileFields.length) {
                await this.getProfileParams()
            }
        } catch (e) {
            console.log(e)
        }
    },
    beforeDestroy() {
        this.$bus.$off('showPopoverFavorite', this.showPopoverFavorite)
        this.$bus.$off('showCart', this.showCart)
        this.$bus.$off('showFilter', this.showFilter)
        this.$bus.$off('clearSearch', this.clearSearchField)
        this.$bus.$off('goToSearch', this.goToSearch)
        this.$bus.$off('currentTab', this.currentTab)
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
            clearProductSearch: constants.MrewardShop.Actions.clearProductSearch,
            loadSelectCountry: constants.MrewardShop.Actions.loadSelectCountry,
            getAgreement: constants.MrewardСakeDesigner.Actions.getAgreement,
            getProfileParams: constants.MrewardProfile.Actions.getProfileParams,
        }),
        currentTab(tab) {
            if (tab === 'screen-shop') {
                this.hideKeyboard()
            }
        },

        setActiveTab(name, index) {
            this.tab = name;
            this.tabbarIndex = index;

        },
        clearSearchField() {
            this.search = ''
            this.mode = ''
            this.clearProductSearch()
        },
        showPopoverFavorite() {
            this.popoverFavorite = true
            setTimeout(() => {
                this.popoverFavorite = false
            }, 3000)
        },
        async onSelectCountry(item) {
            try {
                this.loaderUpdate = true
                this.countryDialog = false
                await this.selectCountry(item)

                if(get(this.country, 'config.id')) {
                    await this.getAgreement({
                        partnerId: get(this.country, 'config.id')
                    })
                }
            } catch (e) {
                console.log(e)
            }

            this.loaderUpdate = false
        },
        showCart() {
            this.isVisibleCart = true
        },
        showFilter() {
            this.isVisibleFilters = true
        },
        goToSearch() {
            this.tab = 'catalog'
            this.mode = 'search'
        }
    }
}
