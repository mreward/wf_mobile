import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import moment from 'moment'
import PullToWrapper from '_pull_to_wrapper'

export default {
    components: {
        PullToWrapper
    },
    data() {
        return {
            layout: 'default'
        }
    },
    computed: {
        ...mapGetters({
            notificationsList: constants.MrewardNotifications.Getters.notificationsList
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
            getNotifications: constants.MrewardNotifications.Actions.getNotifications,
            markNotificationsAsRead: constants.MrewardNotifications.Actions.markNotificationsAsRead
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
        }
    }
}

