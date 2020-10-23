import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import PullToWrapper from '_pull_to_wrapper'
const ScreenNewsDetails = () => import('_screen_news_details')

export default {
    components: {
        PullToWrapper
    },
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
    mounted() {
        window.StatusBar && window.StatusBar.styleDefault();
    },
    beforeDestroy() {
        window.StatusBar && window.StatusBar.styleLightContent();
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
        },
        async updateNews(loaded) {
            try {
                await this.getNews({ networkFirst: true })
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
