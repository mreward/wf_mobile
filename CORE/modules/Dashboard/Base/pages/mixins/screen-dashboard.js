import ScreenHome from '_screen_home'
import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import WebIntent from '_PLUGINS/common/WebIntent'

export default {
    components: {
        ScreenHome
    },
    data() {
        return {
            swipeable: true,
            currentPage: 'screen-home',
            lastTimeBackPress: 0,
            timePeriodToExit: 2000
        }
    },
    computed: {
        ...mapGetters({
            userSettings: constants.User.Getters.userSettings,
            selectedLanguage: constants.App.Getters.language
        })
    },
    mounted() {
        setTimeout(() => {
            this.$SplashScreen.Hide()
        }, 1000)

        this.$bus.$emit('open-dashboard')

        this.updateValueKey({ key: 'loggedIn', saveLocalStorage: false })

        if (!this.userSettings.language || this.userSettings.language !== this.selectedLanguage) {
            this.saveSettings({
                language: this.selectedLanguage
            })
        }

        WebIntent.Ready()
    },
    methods: {
        ...mapActions({
            updateValueKey: constants.AppState.Actions.updateValueKey,
            saveSettings: constants.User.Actions.saveSettings
        }),
        onBack(e) {
            if (this.pageStack.length === 1) {
                e.preventDefault()
                if (this.currentPage === 'screen-home') {
                    if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                        navigator.app.exitApp()
                    } else {
                        this.lastTimeBackPress = new Date().getTime()
                    }
                } else {
                    this.openDashboardMenu = true
                }
            }
        }
    }
}
