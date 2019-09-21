<template>
    <layout
        layout="home"
        :show-loader="false"
        page="home"
    >
        <div slot="toolbar">
            <!--<dashboard-profile />-->
        </div>
        <dashboard-action />
        <dashboard-history />
        <status-popover />
    </layout>
</template>

<script>
    import DashboardAction from '_dashboard_action'
    import DashboardHistory from '_dashboard_history'
    import StatusPopover from '_status_popover'
    import MixinPushNotificationHandler from '_mixin_push_notification_handler_extend'

    export default {
        name: 'screen-home-tab',
        components: {
            DashboardHistory,
            DashboardAction,
            StatusPopover
        },
        mixins: [
            MixinPushNotificationHandler
        ],
    }
</script>
