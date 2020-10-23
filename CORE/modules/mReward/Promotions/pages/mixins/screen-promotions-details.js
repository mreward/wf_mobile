import moment from 'moment'
import MixinHandleHtmlLinks from '_mixin_handle_html_links'

export default {
    mixins: [MixinHandleHtmlLinks],
    props: {
        promotions: {
            type: Object,
            default: () => ({})
        }
    },
    mounted() {
        window.StatusBar && window.StatusBar.styleLightContent();
    },
    beforeDestroy() {

    },
    methods: {
        createdDate() {
            return moment(this.promotions.item.created, 'X').format('DD MMMM, YYYY')
        }
    }
}
