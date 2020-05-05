import ScreenHomeTab from '_screen_home_tab'
import ScreenShop from '_screen_shop'
import ScreenAdresses from '_screen_adresses'
import ScreenNotifications from '_screen_notifications'

import Vue from 'vue'
import DashboardProfile from '_dashboard_profile'

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
                key: 'screen-notification',
                icon: 'notifications'
            },
            {
                label: 'm_adresses',
                key: 'screen-adresses',
                icon: 'location'
            }
        ]
    }),
    mounted() {
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
    }
}
