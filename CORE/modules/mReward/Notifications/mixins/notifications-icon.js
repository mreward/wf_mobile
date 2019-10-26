
export default {
    methods: {
        getNotificationsIcon(type) {
            switch (type) {
                case 'offer': {
                    return 'promotion'
                }
                case 'news': {
                    return 'news-notification'
                }
                case 'nps': {
                    return 'poll'
                }
                case 'fishka': {
                    return 'active'
                }
                default:
                    return 'notifications'
            }
        }
    }
}
