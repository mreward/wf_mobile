<template>
    <layout
        :layout="layout"
        buttonLeft="none"
        :title="$t('m_notifications')"
        page="notifications"
    >
        <pull-to-wrapper
            :update-action="updateNotifications"
        >
            <template
                v-for="(el, key) in notificationsListFormmated"
            >
                <div
                    v-if="Array.isArray(el)"
                    :key="key"
                >
                    <v-ons-list>
                        <notifications-item
                            v-for="(item, index) in el"
                            :key="index"
                            :item="item"
                            class="notification-list list--indentation"
                            @click.native="onClickNotification(item)"
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
        </pull-to-wrapper>
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

<style lang="scss">
    .page[page="notifications"] {
        .page__content {
            padding: 0 16px 34px 16px;
            /*padding-bottom: 34px;*/

            .not-found-items {
                height: 60px;
            }
        }

        .toolbar-main__left {
            width: 0px;
        }
    }
</style>
