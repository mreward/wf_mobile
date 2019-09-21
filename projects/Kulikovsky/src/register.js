module.exports = (dirname) => {
    const PATH = `${dirname}/projects/Kulikovsky/src` // required
    const COMMON = `${dirname}/CORE/components/common`

    return {
        // mixins
        _mixins_navigator: `${PATH}/mixins/navigator`,
        _mixin_navigator_go_to_handler: `${PATH}/mixins/navigator-go-to-handler.js`,
        _mixin_onboarding: `${PATH}/mixins/onboarding.js`,
        _mixin_home_tabs: `${PATH}/mixins/home-tabs.js`,
        _mixin_push_notification_handler_extend: `${PATH}/mixins/push-notification-handler.js`,

        // plugins
        _plugins_validation_helpers: `${dirname}/CORE/plugins/common/validations/index.js`,
        _plugins_validators: `${dirname}/CORE/plugins/common/validations/validators/index.js`,

        // pages
        _screen_home_tab: `${PATH}/pages/screen-home/tab-home.vue`,

        // LOGO
        _img_logo: `${PATH}/img/k-logo.svg`,
        _splashPng: `${PATH}/img/splash-loader.png`,
        _img_location: `${PATH}/img/location.png`,

        _toast: `${COMMON}/toast/toast.vue`
    }
}
