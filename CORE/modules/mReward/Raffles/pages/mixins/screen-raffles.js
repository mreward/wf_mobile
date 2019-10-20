import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'

export default {
    computed: {
        ...mapGetters({
            allRaffles: constants.MrewardRaffles.Getters.allRaffles
        })
    },
    methods: {
        ...mapActions({
            getRaffles: constants.MrewardRaffles.Actions.getRaffles
        }),
        async updateRaffles(loaded) {
            try {
                await this.getRaffles({ networkFirst: true })
            } catch (e) {
                this.$Alert.Error(e)
            } finally {
                setTimeout(() => {
                    loaded('done')
                }, 300)
            }
        }
    }
}
