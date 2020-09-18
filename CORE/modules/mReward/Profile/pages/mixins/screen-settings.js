import constants from '_vuex_constants'
import { mapActions, mapGetters } from 'vuex'
import MaskPhone from '_PLUGINS/common/MaskPhone'
const ScreenRecoveryPassword = () => import('_screen_recovery_password')
const ScreenConfirmPin = () => import('_screen_confirm_pin')

export default {
    data() {
        return {
            listBackgroundAnimationColor: '#dcdee1',
            usePin: true,
            useBiometric: true,
        }
    },
    computed: {
        ...mapGetters({
            loaderVisible: constants.App.Getters.loaderVisible,
            profile: constants.MrewardProfile.Getters.userProfile,
            selectedLanguage: constants.App.Getters.language,
            settings: constants.App.Getters.settings,
            profileFields: constants.MrewardProfile.Getters.profileFields,
            countries: constants.MrewardGeo.Getters.countries,
            country: constants.MrewardShop.Getters.country,
            userConfig: constants.MrewardUser.Getters.userConfig
        }),
        languagesList() {
            return this.settings.languages.map(lang => ({
                lang,
                label: this.$t(`m_languages_${lang}`)
            }))
        },
        addressYou() {
            return this.profileFields.find(i => i.key === 'address_you');
        },
        currentLang() {
            return this.languagesList.find(item => item.lang === this.selectedLanguage)
        },
        currentAddressYou() {
            if(this.addressYou) {
                return this.addressYou.items.find(item => item.id == this.profile.address_you)
            }

            return {}
        }
    },
    watch: {
        usePin(value) {
            if(this.usePin !== this.userConfig.usePin) {
                if(!this.usePin) {
                    this.setUserConfig({
                        usePin: this.usePin,
                        useFingerprint: false,
                        pin: '',
                    })
                } else {
                    this.setUserConfig({
                        usePin: this.usePin,
                    })
                    this.goToCreatePin()
                }
            }
        },
        useBiometric(value) {
            if(this.useBiometric !== this.userConfig.useFingerprint) {
                this.setUserConfig({
                    useFingerprint: this.useBiometric,
                })
            }
        }
    },
    async created() {
        try {
            this.usePin = this.userConfig.usePin
            this.useBiometric = this.userConfig.useFingerprint

            if (!this.profileFields.length) {
                await this.getProfileParams()
                await this.loadSelectCountry()
            }

        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    mounted() {
        window.StatusBar && window.StatusBar.styleDefault();
    },
    methods: {
        ...mapActions({
            getProfileParams: constants.MrewardProfile.Actions.getProfileParams,
            pushPage: constants.App.Actions.pushPage,
            popToPage: constants.App.Actions.popToPage,
            setLang: constants.App.Actions.setLang,
            editProfileAction: constants.MrewardProfile.Actions.editProfile,
            selectCountry: constants.MrewardShop.Actions.selectCountry,
            loadSelectCountry: constants.MrewardShop.Actions.loadSelectCountry,
            setUserConfig: constants.MrewardUser.Actions.setUserConfig
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
        },
        async onSelectCountry(item) {
            try {
                await this.selectCountry(item)
            } catch (e) {
                console.log(e)
            }
        },
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
                        this.$bus.$emit(
                          'showStatusPopover',
                          {
                              status: 1,
                              title: this.$t('m_auth_password_changed_done'),
                              nextEvent: () => {
                                  this.popToPage('screen-home')
                              }
                          }
                        )
                    }
                }
            })
        },
        goToCreatePin() {
            const fullMobileNumber = `+${this.profile.mobile}`
            const clearPhoneNumber = MaskPhone.GetClearPhoneNumber(fullMobileNumber)
            const clearPhoneMask = fullMobileNumber.replace(clearPhoneNumber, '')

            this.pushPage({
                extends: ScreenConfirmPin,
                data: () => {
                    return {
                        mobile: clearPhoneNumber,
                        code: clearPhoneMask,
                    }
                },
                methods: {
                    callackNext() {
                        this.popPage()
                    }
                }
            })
        }
    }
}
