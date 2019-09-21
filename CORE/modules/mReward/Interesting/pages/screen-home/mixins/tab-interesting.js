import TabPromotions from '_screen_promotions'
import TabPoll from '_screen_poll'
import TabNews from '_screen_news'

export default {
    components: {
        TabPromotions,
        TabNews,
        TabPoll
    },
    data() {
        return {
            layout: 'tabs',
            position: 'top',
            current: 'tab-promotions',
            tabs: [
                {
                    label: 'm_interesting_promotions',
                    key: 'tab-promotions',
                    props: {}
                }, {
                    label: 'm_interesting_news',
                    key: 'tab-news',
                    props: {}
                }, {
                    label: 'm_interesting_poll',
                    key: 'tab-poll',
                    props: {}
                }
            ]
        }
    }
}
