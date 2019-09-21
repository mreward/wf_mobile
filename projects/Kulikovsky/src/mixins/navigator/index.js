import MixinNavigatorCore from '_CORE/components/navigator/mixin'
import MixinNavigatorGoToPageHandler from '_mixin_navigator_go_to_handler'
import MixinNavigator from './navigator'

export default [
    ...MixinNavigatorCore,
    MixinNavigatorGoToPageHandler,
    MixinNavigator
]
