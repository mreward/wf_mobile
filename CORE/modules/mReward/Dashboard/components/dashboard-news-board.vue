<template>
    <div>
        <div
            v-if="partnerPromotions.length && !loading"
            class="news-banner-wrapper"
        >


            <template v-for="(item, index) in listNews">
                <div
                        v-if="item.type === 'actions'"
                        :key="index"
                        class="news-banner"
                        :style="`background-image: url('${item.img}')`"
                        @click="goToPromotionsDetails(item.data)"
                >

                    <div v-show="item.isNew" class="new">{{$t('m_dashboard_new')}}</div>
                </div>

                <div
                        v-else-if="item.type === 'news'"
                        :key="index"
                        class="news-banner"
                        :style="`background-image: url('${item.img}')`"
                        @click="goToNewsDetails(item.data.item)"
                >

                    <div v-show="item.isNew" class="new">{{$t('m_dashboard_new')}}</div>
                </div>

                <poll-card
                        v-else-if="item.type === 'polls'"
                        :key="index"
                        :poll="item.data"
                />
            </template>



        </div>

        <v-progress-circular
            v-else-if="loading"
            :width="7"
            :size="70"
            indeterminate
        />

        <not-found-items
            v-else
            :message="$t('m_dashboard_no_accrued_bonuses')"
        />
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'
    import TitleRow from '_title_row'
    import NotFoundItems from '_not_found_items'
    const ScreenPromotionsDetails = () => import('_screen_promotions_details')
    const ScreenNewsDetails = () => import('_screen_news_details')
    import PollCard from '_poll_card'

    export default {
        name: 'dashboard-news-board',
        components: {
            TitleRow,
            NotFoundItems,
            PollCard
        },
        data() {
            return {
                loading: true
            }
        },
        computed: {
            ...mapGetters({
                partnerPromotions: constants.MrewardPromotions.Getters.partnerPromotions,
                partnerNews: constants.MrewardNews.Getters.partnerNewsSortedByColumns,
                polls: constants.MrewardPoll.Getters.polls
            }),

            listNews() {
                let listPromotion = [];
                if(this.partnerPromotions && this.partnerPromotions.length) {
                    listPromotion = this.partnerPromotions.map((item) => ({
                        img: item.img,
                        isNew: item.item.viewed === 0,
                        fixed: item.item.fixed,
                        priority: item.item.priority,
                        type: 'actions',
                        data: item,
                    }));
                }

                let listNews = [];
                if(this.partnerNews && this.partnerNews.length) {
                    listNews = this.partnerNews.map((item) => ({
                        img: item.img,
                        isNew: item.item.viewed === 0,
                        fixed: item.item.fixed,
                        priority: item.item.priority,
                        type: 'news',
                        data: item,
                    }));
                }

                let listPolls = [];
                if(this.polls && this.polls.length) {
                    listPolls = this.polls.map((item) => ({
                        type: 'polls',
                        fixed: item.fixed,
                        priority: item.priority,
                        data: item,
                    }));
                }

                return [
                    ...listPromotion,
                    ...listNews,
                  ...listPolls,
                  ]
            }
        },
        async created() {
            try {
                this.loading = true
                await Promise.all([
                    this.getPromotions({ networkFirst: true }),
                    this.getRaffles({ networkFirst: true }),
                    this.getNews({ networkFirst: true }),
                ])
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },
        methods: {
            ...mapActions({
                getPromotions: constants.MrewardPromotions.Actions.getPromotions,
                pushPage: constants.App.Actions.pushPage,
                getPolls: constants.MrewardPoll.Actions.getPolls,
                getNews: constants.MrewardNews.Actions.getNews,
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
        }
    }
</script>
