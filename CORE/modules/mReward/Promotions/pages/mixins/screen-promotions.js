import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
const ScreenPromotionsDetails = () => import('_screen_promotions_details')

export default {
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
            pushPage: constants.App.Actions.pushPage
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
        }
    }
}
