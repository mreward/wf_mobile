import Analytics from '_CORE/plugins/common/Analytics'

export default {
    created() {
        this.$bus.$on('userBehavior', this.trackUserBehaviour)
    },
    beforeDestroy() {
        this.$bus.$off('userBehavior', this.trackUserBehaviour)
    },
    methods: {
        trackUserBehaviour(model) {
            console.log('trackUserBehaviour - ', model)

            if (typeof model === 'string') {
                Analytics.TrackEvent(model)
            } else {
                Analytics.TrackEvent(model.event, model.options)
            }
        }
    }
}
