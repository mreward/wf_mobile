import { mapActions, mapGetters } from 'vuex'
import constants from '_vuex_constants'
import PollCard from '_poll_card'

export default {
    components: {
        PollCard
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
        })
    }
}

