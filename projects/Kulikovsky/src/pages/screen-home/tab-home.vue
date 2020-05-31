<template>
    <layout
        layout="home"
        :show-loader="false"
        page="home"
    >
        <div slot="toolbar">
            <!--<dashboard-profile />-->
        </div>

        <pull-to-wrapper
            :update-action="updateDashboardContent"
        >
            <dashboard-news-board />
        </pull-to-wrapper>

        <status-popover />


        <div class="button-phone" @click="goToPage('contacts')" >
            <i class="icon-phone" />
        </div>
    </layout>
</template>

<script>
    import constants from '_vuex_constants'
    import { mapActions } from 'vuex'
    import DashboardNewsBoard from '_dashboard_news_board'
    import StatusPopover from '_status_popover'
    import MixinPushNotificationHandler from '_mixin_push_notification_handler_extend'
    import PullToWrapper from '_pull_to_wrapper'

    export default {
        name: 'screen-home-tab',
        components: {
            PullToWrapper,
            DashboardNewsBoard,
            StatusPopover
        },
        mixins: [
            MixinPushNotificationHandler
        ],
        methods: {
            ...mapActions({
                getAccounts: constants.MrewardAccount.Actions.getAccounts,
                getPromotions: constants.MrewardPromotions.Actions.getPromotions,
                getRaffles: constants.MrewardRaffles.Actions.getRaffles,
                getPolls: constants.MrewardPoll.Actions.getPolls,
                getNews: constants.MrewardNews.Actions.getNews,

            }),
            async updateDashboardContent(loaded) {
                try {
                    await Promise.all([
                        this.getPromotions({ networkFirst: true }),
                        this.getAccounts({ networkFirst: true }),
                        this.getRaffles({ networkFirst: true }),
                        this.getPolls({ networkFirst: true }),
                        this.getNews({ networkFirst: true }),
                    ])
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
</script>
