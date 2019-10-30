import MixinOpenProtocol from '_CORE/mixins/common/open-protocol'

export default {
    mixins: [MixinOpenProtocol],
    mounted() {
        this.$refs.htmlBlock.addEventListener('click', this.clickForLink)
    },
    beforeDestroy() {
        this.$refs.htmlBlock.removeEventListener('click', this.clickForLink)
    },
    methods: {
        clickForLink(event) {
            const target = event.target
            if (target.getAttribute('href')) {
                event.preventDefault()
                this.openProtocol(target.href)
            }
        },
    }
}
