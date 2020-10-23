/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Notifications`
    const COMMON = `${dirname}/CORE/components/common`

    return {
        // mixins
        _screen_notifications_mixin: `${PATH}/pages/mixins/screen-notifications.js`,
        _notifications_icon_mixin: `${PATH}/mixins/notifications-icon.js`,

        // pages
        _screen_notifications: `${PATH}/pages/screen-notifications.vue`,

        _notifications_toolbar_icon: `${PATH}/components/notifications-toolbar-icon.vue`,
        _notifications_item: `${PATH}/components/notifications-item.vue`,

        _not_found_items: `${COMMON}/not-found-items.vue`
    }
}
