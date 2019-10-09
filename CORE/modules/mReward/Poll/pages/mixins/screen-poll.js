import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import PollCard from '_poll_card'
import PullToWrapper from '_pull_to_wrapper'

export default {
    components: {
        PollCard,
        PullToWrapper
    },
    data() {
        return {
            layout: 'tab'
        }
    },
    computed: {
        ...mapGetters({
            polls: constants.MrewardPoll.Getters.polls
        })
    },
    async created() {
        try {
            await this.getPolls()
        } catch (e) {
            this.$Alert.Error(e)
        }
    },
    methods: {
        ...mapActions({
            getPolls: constants.MrewardPoll.Actions.getPolls
        }),
        async updatePolls(loaded) {
            try {
                await this.getPolls({ networkFirst: true })
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

