import Toast from '_toast'
import Vue from 'vue'
import NotificationsIconMixin from '_notifications_icon_mixin'
import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
const ScreenNewsDetails = () => import('_screen_news_details')
const ScreenPromotionsDetails = () => import('_screen_promotions_details')
const ScreenPollDetails = () => import('_screen_poll_details')
const ScreenRaffleDetails = () => import('_screen_raffle_details')
import toNumber from '_CORE/utils/toNumber'

export default {
    components: {
        Toast
    },
    mixins: [
        NotificationsIconMixin
    ],
    data() {
        return {
            isLoaded: false
        }
    },
    created() {
        // this.PushNotification({
        //     title: 'ghbdtn',
        //     message: 'retrt',
        //     timestamp: '2019-08-21T11:12:02+00:00',
        //     command: 'nps',
        //     command_arg: '4'
        // })
        this.$bus.$on('pushNotification', this.filterPushNotification)
        this.$bus.$on('goToDetailsByType', this.goToDetailsByType)
    },
    beforeDestroy() {
        this.$bus.$off('pushNotification', this.filterPushNotification)
        this.$bus.$off('goToDetailsByType', this.goToDetailsByType)
    },
    computed: {
        ...mapGetters({
            partnerPromotions: constants.MrewardPromotions.Getters.partnerPromotions,
            partnerNews: constants.MrewardNews.Getters.partnerNews,
            polls: constants.MrewardPoll.Getters.polls,
            allRaffles: constants.MrewardRaffles.Getters.allRaffles
        })
    },
    methods: {
        ...mapActions({
            getNotifications: constants.MrewardNotifications.Actions.getNotifications,
            getPolls: constants.MrewardPoll.Actions.getPolls,
            getNews: constants.MrewardNews.Actions.getNews,
            getPromotions: constants.MrewardPromotions.Actions.getPromotions,
            pushPage: constants.App.Actions.pushPage,
            getAccounts: constants.MrewardAccount.Actions.getAccounts,
            getRaffles: constants.MrewardRaffles.Actions.getRaffles
        }),
        async filterPushNotification(push) {
            this.PushNotification(push)
            this.getNotifications({ networkFirst: true })

            // TODO: Make requests by push.command_arg(id) to get details for specific news, promo or poll
            // ask @@the_western_sun
            // 1./partner/%guid%/news/%id%
            // 2./partner/actions/%id%
            // 3./nps/list/%id% (???????? ?????????? ???????????? ???? ?????????????????? ???? ?????????? ?????????????????? ?????? ?????? - /nps/list?id=%id% ,
            // ???? ?????? ???????????? ???????????? ???????? ???????????? ??????????, ?? ?????????? ?????????????????? ???????? ?? ?????? ???????????????? ??????????)
            switch (push.command) {
                case 'nps': {
                    await this.getPolls({ networkFirst: true })
                    this.isLoaded = true
                    break
                }
                case 'news': {
                    await this.getNews({ networkFirst: true })
                    this.isLoaded = true
                    break
                }
                case 'offer': {
                    await this.getPromotions({ networkFirst: true })
                    this.isLoaded = true
                    break
                }
                case 'fishka': {
                    await this.getRaffles({ networkFirst: true })
                    this.isLoaded = true
                    break
                }
                default: {
                    // We don't have a push.command type for push where balance changed, so update balance for every push without type
                    this.getAccounts({ networkFirst: true })
                    break
                }
            }
        },
        PushNotification(pushData) {
            const ComponentClass = Vue.extend(Toast)
            const instance = new ComponentClass({
                propsData: {
                    icon: this.getNotificationsIcon(pushData.command),
                    title: pushData.title,
                    text: pushData.message,
                    time: pushData.timestamp,
                    toastVisible: true,
                    typeData: {
                        type: pushData.command,
                        id: pushData.command_arg
                    }
                }
            })
            instance.$mount()

            document.getElementsByTagName('body')[0].appendChild(instance.$el)
            setTimeout(function() {
                instance.toastVisible = false
                setTimeout(function () {
                    instance.$destroy()
                }, 1000)
            }, 3000)
        },
        async goToDetailsByType(data) {
            if (this.isLoaded) {
                switch (data.type) {
                    case 'nps': {
                        const poll = this.polls.filter(item => toNumber(data.id) === item.id)
                        if (poll.length) {
                            this.pushPage({
                                extends: ScreenPollDetails,
                                props: {
                                    poll: {
                                        type: Object,
                                        default: () => {
                                            return poll[0]
                                        }
                                    }
                                }
                            })
                        }
                        break
                    }
                    case 'news': {
                        const news = this.partnerNews.filter(item => toNumber(data.id) === item.id)

                        if (news.length) {
                            this.pushPage({
                                extends: ScreenNewsDetails,
                                props: {
                                    news: {
                                        type: Object,
                                        default: () => {
                                            return news[0]
                                        }
                                    }
                                }
                            })
                        }
                        break
                    }
                    case 'offer': {
                        const promotion = this.partnerPromotions.filter(item => toNumber(data.id) === item.item.id)
                        if (promotion.length) {
                            this.pushPage({
                                extends: ScreenPromotionsDetails,
                                props: {
                                    promotions: {
                                        type: Object,
                                        default: () => {
                                            return promotion[0]
                                        }
                                    }
                                }
                            })
                        }
                        break
                    }
                    case 'fishka': {
                        const raffle = this.allRaffles.filter(item => toNumber(data.id) === item.generatorId)
                        if (raffle.length) {
                            this.pushPage({
                                extends: ScreenRaffleDetails,
                                data: () => {
                                    return {
                                        raffleData: raffle[0]
                                    }
                                }
                            })
                        }
                        break
                    }
                    default: break
                }
            }
        }
    }
}
