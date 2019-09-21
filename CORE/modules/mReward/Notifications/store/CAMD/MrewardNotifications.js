export default {
    Mutations: {
        Notifications: {
            name: 'NOTIFICATIONS',
            nameGlobal: 'MrewardNotifications/NOTIFICATIONS'
        },
        ReadNotifications: {
            name: 'READ_NOTIFICATIONS',
            nameGlobal: 'MrewardNotifications/READ_NOTIFICATIONS'
        }
    },
    Actions: {
        getNotifications: 'MrewardNotifications/getNotifications',
        markNotificationsAsRead: 'MrewardNotifications/markNotificationsAsRead',
        processUnreadNotifications: 'MrewardNotifications/processUnreadNotifications'
    },
    Getters: {
        notificationsList: 'MrewardNotifications/notificationsList',
        notificationsUnread: 'MrewardNotifications/notificationsUnread',
        notificationsLoaded: 'MrewardNotifications/notificationsLoaded'
    }
}
