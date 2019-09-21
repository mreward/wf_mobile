import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
const ScreenNewsDetails = () => import('_screen_news_details')

export default {
    data() {
        return {
            layout: 'tab',
            items: []
        }
    },
    computed: {
        ...mapGetters({
            partnerNews: constants.MrewardNews.Getters.partnerNewsSortedByColumns
        })
    },
    async created() {
        try {
            await this.getNews()
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            getNews: constants.MrewardNews.Actions.getNews,
            pushPage: constants.App.Actions.pushPage
        }),
        goToNewsDetails(news) {
            this.pushPage({
                extends: ScreenNewsDetails,
                // options: {
                //     animation: 'fade'
                // },
                props: {
                    news: {
                        type: Object,
                        default: () => {
                            return news
                        }
                    }
                }
            })
        }
    }
}
