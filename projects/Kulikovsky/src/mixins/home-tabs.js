import ScreenHomeTab from '_screen_home_tab'
import ScreenInterestingTab from '_screen_interesting_tab'
import ScreenAdresses from '_screen_adresses'
import ScreenProfileTab from '_tab_profile'
import Vue from 'vue'
import DashboardProfile from '_dashboard_profile'

export default {
    components: {
        ScreenHomeTab,
        ScreenInterestingTab,
        ScreenAdresses,
        ScreenProfileTab
    },
    data: () => ({
        childTabs: [
            {
                label: 'm_home',
                key: 'screen-home-tab',
                icon: 'home'
            },
            {
                label: 'm_interesting',
                key: 'screen-interesting-tab',
                icon: 'news'
            },
            {
                label: 'm_scan',
                key: 'dashboard-open-toolbar',
                icon: 'qr-code',
                class: 'circle',
                button: true
            },
            {
                label: 'm_profile',
                key: 'screen-profile-tab',
                icon: 'profile'
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
