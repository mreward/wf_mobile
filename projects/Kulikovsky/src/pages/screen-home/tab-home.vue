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
            <dashboard-action />
            <dashboard-history />
        </pull-to-wrapper>

        <status-popover />
    </layout>
</template>

<script>
    import constants from '_vuex_constants'
    import { mapActions } from 'vuex'
    import DashboardAction from '_dashboard_action'
    import DashboardHistory from '_dashboard_history'
    import StatusPopover from '_status_popover'
    import MixinPushNotificationHandler from '_mixin_push_notification_handler_extend'
    import PullToWrapper from '_pull_to_wrapper'

    export default {
        name: 'screen-home-tab',
        components: {
            PullToWrapper,
            DashboardHistory,
            DashboardAction,
            StatusPopover
        },
        mixins: [
            MixinPushNotificationHandler
        ],
        methods: {
            ...mapActions({
                getHistory: constants.MrewardHistory.Actions.getHistory,
                getAccounts: constants.MrewardAccount.Actions.getAccounts,
                getPromotions: constants.MrewardPromotions.Actions.getPromotions
            }),
            async updateDashboardContent(loaded) {
                try {
                    await Promise.all([
                        this.getPromotions({ networkFirst: true }),
                        this.getHistory({ networkFirst: true }),
                        this.getAccounts({ networkFirst: true })
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
