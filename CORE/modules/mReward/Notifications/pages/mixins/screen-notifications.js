import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import moment from 'moment'
import PullToWrapper from '_pull_to_wrapper'
import formatDatePeriod from '_MODULES/mReward/libs/formatDatePeriod'
import ScreenRaffleDetails from '_MODULES/mReward/Raffles/pages/screen-raffle-details'
const ScreenPromotionsDetails = () => import('_screen_promotions_details')
const ScreenNewsDetails = () => import('_screen_news_details')

export default {
    components: {
        PullToWrapper
    },
    data() {
        return {
            layout: 'tab'
        }
    },
    computed: {
        ...mapGetters({
            notificationsList: constants.MrewardNotifications.Getters.notificationsList,
            raffles: constants.MrewardRaffles.Getters.dashboardRaffles
        }),
        notificationsListFormmated() {
            const newList = []
            let itemsList = []
            let dateGroup
            if (this.notificationsList.length) {
                this.notificationsList.forEach((a, index) => {
                    const month = moment(a.date_sent).format('MMMM')
                    if (!dateGroup || dateGroup !== month) {
                        if (itemsList.length) {
                            newList.push(itemsList)
                        }
                        newList.push({ date: month, type: 'header' })
                        dateGroup = month
                        itemsList = []
                    }
                    itemsList.push(a)

                    if (this.notificationsList.length - 1 === index) {
                        newList.push(itemsList)
                    }
                })
            }
            return newList
        }
    },
    async created() {
        try {
            await this.getNotifications()
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    beforeDestroy() {
        this.markNotificationsAsRead(this.notificationsList)
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            getNotifications: constants.MrewardNotifications.Actions.getNotifications,
            markNotificationsAsRead: constants.MrewardNotifications.Actions.markNotificationsAsRead,
            getPromotionItem: constants.MrewardPromotions.Actions.getPromotionItem,
            getNewsItem: constants.MrewardNews.Actions.getNewsItem,
        }),
        async updateNotifications(loaded) {
            try {
                await this.getNotifications({ networkFirst: true })
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                setTimeout(() => {
                    loaded('done')
                }, 300)
            }
        },

        async onClickNotification(item) {
            if (item.command === 'offer') {
                const promotions = await this.getPromotionItem({id: item.command_arg})

                this.pushPage({
                    extends: ScreenPromotionsDetails,
                    props: {
                        promotions: {
                            type: Object,
                            default: () => {
                                return {
                                    img: promotions.img_path,
                                    title: promotions.title,
                                    data: formatDatePeriod(promotions.act_from, promotions.act_to),
                                    item: promotions,
                                }
                            },
                        },
                    },
                })
            } else if (item.command === 'news') {
                const news = await this.getNewsItem({id: item.command_arg})

                this.pushPage({
                    extends: ScreenNewsDetails,
                    props: {
                        news: {
                            type: Object,
                            default: () => {
                                return news
                            }
                        }
                    }
                })
            } else if (item.command === 'fishka') {
                const raffleData = this.raffles.find(i => i.id === parseInt(item.command_arg, 10))

                if (raffleData) {
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
    }
}

