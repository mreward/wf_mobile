import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
const ScreenSecret = () => import('_screen_secret')
const ScreenRegistration = () => import('_screen_registration')
const ScreenAuthorization = () => import('_screen_authorization')
const ScreenHistory = () => import('_screen_history')
const ScreenSettings = () => import('_screen_settings')
const ScreenEditProfile = () => import('_screen_edit_profile')
const ScreenNotifications = () => import('_screen_notifications')
const ScreenContactss = () => import('_screen_contacts')
const ScreenOrders = () => import('_screen_orders')

export default {
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings
        })
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            replacePage: constants.App.Actions.replacePage
        }),
        goToPage({ page, data = {} }) {
            let screen
            let animation

            // TODO remove this?
            switch (page) {
                case 'secret':
                    screen = ScreenSecret
                    break
                case 'registration':
                    screen = ScreenRegistration
                    break
                case 'settings':
                    screen = ScreenSettings
                    break
                case 'edit-profile':
                    screen = ScreenEditProfile
                    break
                case 'auth':
                    screen = ScreenAuthorization
                    break
                case 'history':
                    screen = ScreenHistory
                    break
                case 'notifications':
                    screen = ScreenNotifications
                    break
                case 'dashboard-open-toolbar':
                    this.$bus.$emit('dashboard-open-toolbar')
                    return false
                case 'contacts':
                    screen = ScreenContactss
                    break
                case 'orders':
                    screen = ScreenOrders
                    break

                default:
                    break
            }

            if (!screen) {
                this.$Alert.Error()
                return
            }

            const pageAction = page === 'auth' ? this.replacePage : this.pushPage

            pageAction({
                extends: screen,
                options: {
                    animation
                },
                data() {
                    return {
                        ...data
                    }
                }
            })
        }
    },
    created() {
        this.$bus.$on('goToPage', this.goToPage)
    },
    beforeDestroy() {
        this.$bus.$off('goToPage', this.goToPage)
    }
}
