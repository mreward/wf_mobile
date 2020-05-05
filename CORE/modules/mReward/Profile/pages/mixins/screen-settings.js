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
            settings: constants.App.Getters.settings,
            profileFields: constants.MrewardProfile.Getters.profileFields
        }),
        languagesList() {
            return this.settings.languages.map(lang => ({
                lang,
                label: this.$t(`m_languages_${lang}`)
            }))
        },
        addressYou() {
            return this.profileFields.find(i => i.key === 'address_you');
        }
    },
    async created() {
        try {
            if (!this.profileFields.length) {
                await this.getProfileParams()
            }
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            getProfileParams: constants.MrewardProfile.Actions.getProfileParams,
            pushPage: constants.App.Actions.pushPage,
            popToPage: constants.App.Actions.popToPage,
            setLang: constants.App.Actions.setLang,
            editProfileAction: constants.MrewardProfile.Actions.editProfile,
        }),
        async selectLanguage(lang) {
            try {
                await this.setLang({ lang })
                await this.getProfileParams();
                this.$bus.$emit('switch-language')
            } catch (error) {
                this.$Alert.Error(error)
            }
        },
        saveAddressYou(id) {
            this.editProfileAction({
                address_you: id,
            })
        }
    }
}
