import constants from '_vuex_constants'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            description: '',
            sendData: false
        }
    },
    computed: {
        ...mapGetters({
            profile: constants.User.Getters.profile
        })
    },
    methods: {
        async confirmPhone() {
            try {
                if (!this.sendData) {
                    this.sendData = true
                    await this.callback(this.otp)
                }
            } catch (error) {
                this.$Alert.Error(error)
                this.otp = ''
                this.$refs.form.reset()
            } finally {
                this.sendData = false
            }
        }
    }
}
