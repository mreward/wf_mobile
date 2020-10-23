import { mapGetters } from 'vuex'
import constants from '_vuex_constants'
import WebIntent from '_PLUGINS/common/WebIntent'

export default {
    computed: {
        ...mapGetters({
            settings: constants.App.Getters.settings
        })
    },
    created() {
        WebIntent.Init(this.settings.urlScheme)
    }
}
