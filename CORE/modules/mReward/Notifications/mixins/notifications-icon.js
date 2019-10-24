
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
                    return 'k-symbol'
                }
                default:
                    return 'notifications'
            }
        }
    }
}
