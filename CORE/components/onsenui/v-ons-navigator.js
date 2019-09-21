import VueOnsNavigator from 'vue-onsenui/esm/components/VOnsNavigator'
import get from 'lodash/get'

const { ...Component } = VueOnsNavigator

export default {
    name: 'v-ons-navigator',
    extends: Component,
    watch: {
        pageStack(after, before) {
            if (this.$el.hasAttribute('swipeable') && this.$children.length !== this.$el.children.length) {
                return
            }

            const propWasMutated = after === before // Can be mutated or replaced
            const lastTopPage = get(this.$children[this.$children.length - 1], '$el')
            if (!lastTopPage) {
                return
            }

            const scrollElement = this._findScrollPage(lastTopPage)
            const scrollValue = scrollElement.scrollTop || 0

            this._pageStackUpdate = {
                lastTopPage,
                lastLength: propWasMutated ? this.$children.length : before.length,
                currentLength: !propWasMutated && after.length,
                restoreScroll() {
                    scrollElement.scrollTop = scrollValue
                }
            }

            // this.$nextTick(() => { }); // Waits too long, updated() hook is faster and prevents flickerings
        }
    }
}
