import constants from '_vuex_constants'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            listBackgroundAnimationColor: '#dcdee1'
        }
    },
    computed: {
        ...mapGetters({
            loaderVisible: constants.App.Getters.loaderVisible,
            profile: constants.MrewardProfile.Getters.userProfile,
            selectedLanguage: constants.App.Getters.language,
            settings: constants.App.Getters.settings
        }),
        languagesList() {
            return this.settings.languages.map(lang => ({
                lang,
                label: this.$t(`m_languages_${lang}`)
            }))
        }
    },
    methods: {
        ...mapActions({
            pushPage: constants.App.Actions.pushPage,
            popToPage: constants.App.Actions.popToPage,
            setLang: constants.App.Actions.setLang
        }),
        async selectLanguage(lang) {
            try {
                await this.setLang({ lang })
                this.$bus.$emit('switch-language')
            } catch (error) {
                this.$Alert.Error(error)
            }
        }
    }
}
