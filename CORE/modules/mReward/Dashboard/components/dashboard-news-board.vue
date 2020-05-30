<template>
    <div style="height: 100%">
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

                <div
                        v-else-if="item.type === 'raffles'"
                        :key="index"
                        class="news-banner"
                        :style="`background-image: url('${item.img}')`"
                        @click="goToRaffleDetailsPage(item.data)"
                >
                    <div class="fishka-count">
                        <i class="icon-k-symbol" />
                        <span>{{item.count}}</span>
                    </div>

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


        <div class="button-phone" @click="goToPage('contacts')" >
            <i class="icon-phone" />
        </div>
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
    import ScreenRaffleDetails from '_screen_raffle_details'
    import sortBy from 'lodash/sortBy'


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
                polls: constants.MrewardPoll.Getters.polls,
                raffles: constants.MrewardRaffles.Getters.dashboardRaffles
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

                let listRaffles = [];
                if(this.raffles && this.raffles.length) {
                    listRaffles = this.raffles.map((item) => ({
                        img: item.images.mobile,
                        type: 'raffles',
                        count: item.count,
                        // fixed: item.fixed,
                        // priority: item.priority,
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

                const sortList = sortBy([
                    ...listPromotion,
                    ...listNews,
                    ...listPolls,
                ], ['fixed', 'priority']);


                return [
                    ...listRaffles,
                    ...sortList,
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
                    this.getRaffles({ networkFirst: true }),
                ])
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },
        methods: {
            ...mapActions({
                pushPage: constants.App.Actions.pushPage,
                getPromotions: constants.MrewardPromotions.Actions.getPromotions,
                getPromotionItem: constants.MrewardPromotions.Actions.getPromotionItem,
                getPolls: constants.MrewardPoll.Actions.getPolls,
                getNews: constants.MrewardNews.Actions.getNews,
                getNewsItem: constants.MrewardNews.Actions.getNewsItem,
                getRaffles: constants.MrewardRaffles.Actions.getRaffles,
            }),

            goToPromotionsDetails (promotions) {
                promotions.item.viewed += 1
                this.getPromotionItem({id: promotions.item.id})

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
                            },
                        },
                    },
                })
            },
            goToNewsDetails (news) {
                news.viewed += 1
                this.getNewsItem({id: news.id})

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

            goToRaffleDetailsPage(raffleData) {
                this.pushPage({
                    extends: ScreenRaffleDetails,
                    data: () => {
                        return {
                            raffleData,
                        }
                    }
                })
            }
        }
    }
</script>
