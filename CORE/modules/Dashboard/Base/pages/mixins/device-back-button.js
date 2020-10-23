import { mapGetters } from 'vuex'
import constants from '_vuex_constants'

export default {
    data() {
        return {
            openDashboardMenu: false,
            currentPage: 'screen-home',
            lastTimeBackPress: 0,
            timePeriodToExit: 2000,
            currentTab: ''
        }
    },
    computed: {
        ...mapGetters({
            pageStack: constants.App.Getters.navigator
        })
    },
    created() {
        this.$bus.$on('currentTab', this.setCurrentTab)
    },
    beforeDestroy() {
        this.$bus.$off('currentTab', this.setCurrentTab)
    },
    methods: {
        setCurrentTab(tab) {
            if (tab) {
                this.currentTab = tab
            }
        },
        onBack(e) {
            if (this.pageStack.length === 1) {
                e.preventDefault()
                if (this.currentTab && this.currentTab !== 'screen-home-tab') {
                    this.$bus.$emit('home:goToTab', 'screen-home-tab')
                    return
                }
                if (this.currentPage === 'screen-home') {
                    if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                        navigator.app.exitApp()
                    }
                } else {
                    this.openDashboardMenu = true
                }
            }
            this.lastTimeBackPress = new Date().getTime()
        }
    }
}
