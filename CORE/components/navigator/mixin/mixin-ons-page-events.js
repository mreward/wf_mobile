import Analytics from '_CORE/plugins/common/Analytics'

// Fix
// при прееходе на любую страницу если быстро клацать кнопку назад
// в стеке может запуститсья удадение страниц
export default {
    methods: {
        prePush() {
            this.$ons.disableDeviceBackButtonHandler()
        },
        postPush() {
            this.$ons.enableDeviceBackButtonHandler()

            const page = this.pageStack[this.pageStack.length - 1]
            this.postPushTrackPage(page.extends.name, page.categoryTitle)

            if (this.$bus) {
                this.$bus.$emit('postPush')
            }
        },
        prePop() {
            this.$ons.disableDeviceBackButtonHandler()
        },
        postPop() {
            this.$ons.enableDeviceBackButtonHandler()
        },
        postPushTrackPage(name, category) {
            Analytics.TrackPageConvert(name, category)
        }
    }
}
