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
            loading: true
        }
    },
    computed: {
        ...mapGetters({
            partnerPromotions: constants.MrewardPromotions.Getters.partnerPromotionsSortedByColumns,
            loaderVisible: constants.App.Getters.loaderVisible
        })
    },
    watch: {
        loaderVisible(value) {
            if (!value) {
                this.loading = false
            }
        }
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            getPromotions: constants.MrewardPromotions.Actions.getPromotions
        }),
        goToPromotionsDetails(promotions) {
            this.pushPage({
                extends: ScreenPromotionsDetails,
                // options: {
                //     animation: 'fade'
                // },
                props: {
                    promotions: {
                        type: Object,
                        default: () => {
                            return promotions
                        }
                    }
                }
            })
        },
        async updatePromotions(loaded) {
            try {
                await this.getPromotions({ networkFirst: true })
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                setTimeout(() => {
                    loaded('done')
                }, 300)
            }
        }
    }
}
