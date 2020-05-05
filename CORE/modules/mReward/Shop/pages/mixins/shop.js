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
        }
    },
    computed: {
        ...mapGetters({
        })
    },
    watch: {

    },
    methods: {
        ...mapActions({
        }),
    }
}
