<template>
    <v-ons-list-item>
        <div class="left">
            <div class="icon-wrap">
                <v-ons-icon
                    :icon="getNotificationsIcon(item.command)"
                />
            </div>
        </div>
        <div class="center">
            <div class="title_notification">
                {{ item.title }}
            </div>
            <div class="message">
                {{ item.message }}
            </div>
            <div class="time text--muted">
                {{ formatTime(item.date_sent) }}
            </div>
        </div>
    </v-ons-list-item>
</template>

<script>
    import moment from 'moment'
    import NotificationsIconMixin from '_notifications_icon_mixin'

    export default {
        name: 'notifications-item',
        mixins: [
            NotificationsIconMixin
        ],
        props: {
            item: {
                type: Object,
                default: () => ({}),
                required: true
            }
        },
        methods: {
            formatTime(time) {
                return moment(time).format('DD MMMM, HH:mm')
            }
        }
    }
</script>

<style scoped>

</style>
