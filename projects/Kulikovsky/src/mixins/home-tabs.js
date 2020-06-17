import ScreenHomeTab from '_screen_home_tab'
import ScreenShop from '_screen_shop'
import ScreenAdresses from '_screen_adresses'
import ScreenNotifications from '_screen_notifications'

import Vue from 'vue'
import DashboardProfile from '_dashboard_profile'
import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'

export default {
    components: {
        ScreenHomeTab,
        ScreenShop,
        ScreenAdresses,
        ScreenNotifications
    },
    data: () => ({
        childTabs: [
            {
                label: 'm_home',
                key: 'screen-home-tab',
                icon: 'home'
            },
            {
                label: 'm_shop_title',
                key: 'screen-shop',
                icon: 'shop'
            },
            {
                label: 'm_scan',
                key: 'dashboard-open-toolbar',
                icon: 'qr-code',
                class: 'circle',
                button: true
            },
            {
                label: 'm_notifications',
                key: 'screen-notifications',
                icon: 'notifications',
                class: [],
            },
            {
                label: 'm_adresses',
                key: 'screen-adresses',
                icon: 'location'
            }
        ]
    }),
    computed: {
        ...mapGetters({
            notificationsUnread: constants.MrewardNotifications.Getters.notificationsUnread
        }),
        showDot() {
            return [
                { 'notifications-counter': this.notificationsUnread.length }
            ]
        }
    },
    watch: {
        showDot(value) {
            debugger
            Vue.set(this.childTabs, 3, {
                ...this.childTabs[3],
                class: value
            })
        }
    },
    async mounted() {
        const $this = this
        const ComponentClass = Vue.extend(DashboardProfile)
        const instance = new ComponentClass({
            store: this.$store,
            computed: {
                currentPageTab () {
                    return $this.currentPageTab
                }
            }
        })
        instance.$mount() // pass nothing

        this.$el.appendChild(instance.$el)

        try {
            await this.getNotifications({ networkFirst: true })
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            getNotifications: constants.MrewardNotifications.Actions.getNotifications
        })
    }
}
