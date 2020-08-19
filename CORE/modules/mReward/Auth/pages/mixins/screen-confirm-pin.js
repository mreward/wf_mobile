import InputPin from '_input_pin_sequence'
import {mapActions, mapGetters} from 'vuex'
import constants from '_CORE/__configs.generate__/store/constants'
const ScreenDashboard = () => import('_screen_dashboard')
import TouchId from '_PLUGINS/common/TouchId'

export default {
    data() {
        return {
            lengthPin: 4,
            pin: '',
            confirm: '',
            loaderVisible: false,
            isRecoverPin: false
        }
    },
    components: {
        InputPin
    },
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings
        }),
        isValid() {
            return this.pin.length === this.lengthPin && this.confirm.length === this.lengthPin
        },
        isPinValid() {
            return this.pin.length > 0 && this.pin === this.confirm
        }
    },
    watch: {
        pin() {
            if (this.pin.length === this.lengthPin) {
                this.hideKeyboard()
                setTimeout(() => {
                    this.$refs.confirm.focus()
                }, 400)
            }

            if (this.isValid && this.isPinValid) {
                this.createPin()
            }
        },
        confirm() {
            if (this.confirm.length === this.lengthPin) {
                if (!this.isPinValid) {
                    this.hideKeyboard()

                    this.$Alert.Error({
                        text: this.$t('m_auth_pin_error')
                    })

                    setTimeout(() => {
                        this.reset()
                    }, 1000)
                }
            }

            if (this.isValid && this.isPinValid) {
                this.createPin()
            }
        }
    },
    methods: {
        ...mapActions({
            replacePage: constants.App.Actions.replacePage,
            setUserData: constants.MrewardUser.Actions.setUserData
        }),
        reset() {
            this.pin = ''
            this.confirm = ''
            this.$refs.form.reset()
        },
        async createPin() {
            try {
                const pin = this.pin

                this.setUserData({
                    pin
                })

                if (!this.isRecoverPin) {
                    const touchId = await TouchId.IsAvailable()
                    if (touchId) {
                        await TouchId.VerifyFingerprint({
                            title: this.$t('m_allow_fingerprint', '', { appName: this.settings.nameApp })
                        })
                    }
                }
            } catch (error) {
                console.error('COMPONENT: screen-auth-create-pin - useTouchId', error)
            }
            this.goToDashboard()
        },
        goToDashboard() {
            this.replacePage({
                extends: ScreenDashboard,
                data: () => {
                    return {
                        mobile: this.mobile,
                        code: this.selectedCountry.code
                    }
                }
            })
        }
    }
}
