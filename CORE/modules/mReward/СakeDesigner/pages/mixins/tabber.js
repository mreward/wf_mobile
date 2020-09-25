import PullToWrapper from '_pull_to_wrapper'

export default {
    components: {
        PullToWrapper
    },
    data() {
        return {
            layout: 'tab',
            tab: 'standart',
            tabbarIndex: 0
        }
    },
    methods: {
        setActiveTab(name, index) {
            this.tab = name
            this.tabbarIndex = index
        }
    }
}
