import constants from '_vuex_constants'
import { mapActions, mapGetters } from 'vuex'
import MaskPhone from '_PLUGINS/common/MaskPhone'
const ScreenRecoveryPassword = () => import('_screen_recovery_password')

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
            logoutUserAction: constants.MrewardUser.Actions.logoutUser,
            setLang: constants.App.Actions.setLang
        }),
        goToRecoveryPassword() {
            const fullMobileNumber = `+${this.profile.mobile}`
            const clearPhoneNumber = MaskPhone.GetClearPhoneNumber(fullMobileNumber)
            const clearPhoneMask = fullMobileNumber.replace(clearPhoneNumber, '')

            this.pushPage({
                extends: ScreenRecoveryPassword,
                data: () => {
                    return {
                        mobile: clearPhoneNumber,
                        code: clearPhoneMask,
                        showMobileNumberInput: false,
                        titleTranslationKey: 'm_auth_change_password_title'
                    }
                },
                methods: {
                    callbackPageOpen: () => {
                        this.popToPage('screen-home')
                    }
                }
            })
        },
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
