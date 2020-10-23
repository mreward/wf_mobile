import { mapActions } from 'vuex'
import constants from '_vuex_constants'
import imgNotSuccess from '_SRC_IMG_WALLET/not-success.png'

export default {
    data() {
        return {
            imgNotSuccess
        }
    },
    methods: {
        ...mapActions({
            popToPage: constants.App.Actions.popToPage
        }),
        goToDashboard() {
            this.popToPage('screen-dashboard')
        }
    }
}
