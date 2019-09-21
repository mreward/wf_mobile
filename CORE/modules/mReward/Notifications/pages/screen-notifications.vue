<template>
    <layout
        :layout="layout"
        :title="$t('m_notifications')"
    >
        <template
            v-for="(el, key) in notificationsListFormmated"
        >
            <div
                v-if="Array.isArray(el)"
                :key="key"
                class="card card--default notification-card"
            >
                <v-ons-list class="notification-list list--indentation">
                    <notifications-item
                        v-for="(item, index) in el"
                        :key="index"
                        :item="item"
                    />
                </v-ons-list>
            </div>
            <div
                v-if="el.type === 'header'"
                :key="key"
                class="row--text"
                v-text="el.date"
            />
        </template>
        <not-found-items
            v-if="!notificationsListFormmated.length"
            :message="$t('m_notifications_not_found')"
        />
    </layout>
</template>

<script>
    import ScreenNotificationsMixin from '_screen_notifications_mixin'
    import NotFoundItems from '_not_found_items'
    import NotificationsItem from '_notifications_item'

    export default {
        name: 'screen-notifications',
        components: {
            NotFoundItems,
            NotificationsItem
        },
        mixins: [
            ScreenNotificationsMixin
        ]
    }
</script>

<style scoped>

</style>
