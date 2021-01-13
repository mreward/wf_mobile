import constants from '_vuex_constants';
import { mapActions, mapGetters } from 'vuex';
import ScreenDashboard from '_screen_dashboard';
import sha256 from 'crypto-js/sha256';
import md5 from 'crypto-js/md5';
import InputPin from '_input_pin_sequence';
import TouchId from '_CORE/plugins/common/TouchId';
const ScreenOnBoarding = () => import('_screen_onboarding')
const ScreenAuthorization = () => import('_screen_authorization')

export default {
    data() {
        return {
            pin: '',
            lengthPin: 4,
            pinTries: 3,
            touchIdSupported: false,
            dataSent: false,
        };
    },
    components: {
        InputPin,
    },
    computed: {
        ...mapGetters({
            loaderVisible: constants.App.Getters.loaderVisible,
            moduleOptions: constants.App.Getters.moduleOptions,
            settings: constants.App.Getters.settings,
            userConfig: constants.MrewardUser.Getters.userConfig,
        }),
        title() {
            if (this.touchIdSupported) {
                if (this.$ons.platform.isIPhoneX()) {
                    return this.$t('m_auth_enter_with_face_id_text');
                }

                return this.$t('m_auth_enter_with_fingerprint_text');
            }

            return this.$t('m_auth_enter_with_pin_code');
        },
        biometric() {
            if (this.touchIdSupported) {
                if (this.$ons.platform.isIPhoneX()) {
                    return 'Face ID'
                }

                return 'Touch ID'
            }

            return ''
        },
    },
    watch: {
        pin() {
            if (this.pin.length === this.lengthPin && !this.dataSent) {
                if (sha256(md5(this.pin).toString()).toString() === this.userConfig.pin) {
                    this.hideKeyboard();
                    this.dataSent = true;
                    this.loadUser();
                } else {
                    this.pinTries = this.pinTries - 1;
                    if (this.pinTries < 1) {
                        this.logout();
                    } else {
                        this.hideKeyboard();
                        this.$bus.$emit('showStatusPopover', {
                            status: 2,
                            title: this.$t('m_auth_login_code_error_code', '', {
                                count: this.pinTries,
                            })
                        })

                        // this.$Alert.Error({
                        //     title: this.$t('m_auth_error'),
                        //     text: `${this.$t('m_auth_invalid_pin_code')} ${this.pinTries} ${this.$t('m_auth_attempts_left')}`,
                        //     nextName: this.$t('m_auth_ok'),
                        //     nextEvent: () => {
                        //         setTimeout(() => {
                        //             this.$refs.pin.focus();
                        //         }, 100);
                        //     },
                        // });
                        this.pin = '';
                        this.$refs.form.reset();
                        this.dataSent = false;
                    }
                }
            }
        },
    },
    async created() {
        const touchId = await TouchId.IsAvailable();
        if (touchId && this.userConfig.useFingerprint) {
            this.touchIdSupported = true;
            await this.useTouchId();
        }
        if (!this.userConfig.useFingerprint) {
            setTimeout(() => {
                this.$refs.pin.focus();
                // TODO: Move to plugin
                if (window.Keyboard && !!window.Keyboard.show) {
                    window.Keyboard.show();
                }
            }, 1800);
        }
    },
    methods: {
        ...mapActions({
            replacePage: constants.App.Actions.replacePage,
            pushPage: constants.App.Actions.pushPage,
            logout: constants.MrewardUser.Actions.logoutUser
        }),
        async loadUser() {
            const $this = this
            try {
                this.replacePage(ScreenDashboard)
            } catch (error) {
                // Wait until user read error message
                setTimeout(() => {
                    $this.logout()
                }, 1500)
            }
        },
        goToAboutApp() {
            this.replacePage(ScreenOnBoarding)
        },

        async useTouchId() {
            if (this.userConfig.useFingerprint) {
                try {
                    await TouchId.IsAvailable()

                    await TouchId.VerifyFingerprint({
                        locale: this.selectedLanguage
                    })
                    this.replacePage(ScreenDashboard)
                } catch (e) {
                    console.log('COMPONENT: screen-auth-confirm-pin - useTouchId fail init', e)
                }
            }
        },
        goToRecoveryPassword() {
            this.logout()
        }
    },
};
