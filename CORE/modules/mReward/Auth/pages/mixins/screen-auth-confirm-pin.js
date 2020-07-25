import constants from '_vuex_constants';
import { mapActions, mapGetters } from 'vuex';
import ScreenDashboard from '_screen_dashboard';
import sha256 from 'crypto-js/sha256';
import md5 from 'crypto-js/md5';
import InputPin from '_input_pin_sequence';
import TouchId from '_CORE/plugins/common/TouchId';

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
            userPin: constants.User.Getters.pin,
            moduleOptions: constants.App.Getters.moduleOptions,
            settings: constants.App.Getters.settings,
            userSettings: constants.User.Getters.userSettings,
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
    },
    watch: {
        pin() {
            if (this.pin.length === this.lengthPin && !this.dataSent) {
                if (sha256(md5(this.pin).toString()).toString() === this.userPin) {
                    this.hideKeyboard();
                    this.dataSent = true;
                    this.loadUser();
                } else {
                    this.pinTries = this.pinTries - 1;
                    if (this.pinTries < 1) {
                        this.logout();
                    } else {
                        this.hideKeyboard();
                        this.$Alert.Error({
                            title: this.$t('m_auth_error'),
                            text: `${this.$t('m_auth_invalid_pin_code')} ${this.pinTries} ${this.$t('m_auth_attempts_left')}`,
                            nextName: this.$t('m_auth_ok'),
                            nextEvent: () => {
                                setTimeout(() => {
                                    this.$refs.pin.focus();
                                }, 100);
                            },
                        });
                        this.pin = '';
                        this.$refs.form.reset();
                        this.dataSent = false;
                    }
                }
            }
        },
    },
    async created() {
        this.pinTries = this.moduleOptions('Auth.PinCode').pinTries || this.moduleOptions('Auth.PinAndPass').pinTries;
        this.lengthPin = this.moduleOptions('Auth.PinCode').lengthPin || this.moduleOptions('Auth.PinAndPass').lengthPin;
        const touchId = await TouchId.IsAvailable();
        if (touchId) {
            this.touchIdSupported = true;
        }
        if (!this.userSettings.useFingerprint) {
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
            loadUserData: constants.User.Actions.loadUserData,
            replacePage: constants.App.Actions.replacePage,
            pushPage: constants.App.Actions.pushPage,
            authMobile: constants.User.Actions.authMobile,
            logout: constants.User.Actions.logout,
        }),
        async loadUser() {
            const $this = this;
            try {
                this.$SplashScreen.Show();
                await this.loadUserData();
                this.replacePage(ScreenDashboard);
            } catch (error) {
                // Wait until user read error message
                setTimeout(() => {
                    $this.logout();
                }, 1500);
            }
        },
    },
};
