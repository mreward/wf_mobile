import moment from 'moment'
import MixinHandleHtmlLinks from '_mixin_handle_html_links'

export default {
    mixins: [MixinHandleHtmlLinks],
    props: {
        news: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        createdDate() {
            return moment(this.news.date, 'X').format('DD MMMM, YYYY')
        }
    }
}
