/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/Dashboard/Base`
    const COMMON = `${dirname}/CORE/components/common`

    return {
        // Dashboard
        _layout_home: `${dirname}/CORE/layouts/home.vue`,
        _screen_dashboard: `${PATH}/pages/screen-home/index.vue`,
        _screen_home_tab: `${PATH}/pages/screen-home/tab-home.vue`,
        _screen_home: `${PATH}/pages/screen-home/index.vue`,

        // mixins
        _mixins_screen_dashboard: `${PATH}/pages/mixins/screen-dashboard-main.js`,
        _mixin_screen_dashboard: `${PATH}/pages/mixins/screen-dashboard.js`,
        _mixin_screen_home_tab: `${PATH}/pages/mixins/screen-home-tab-home.js`,
        _mixin_screen_home: `${PATH}/pages/mixins/screen-home.js`,
        _mixin_device_back_button: `${PATH}/pages/mixins/device-back-button.js`,
        _mixin_home_tabs: `${PATH}/mixins/home-tabs.js`,
        _mixin_home_widgets: `${PATH}/mixins/home-widgets.js`,

        _tile: `${COMMON}/tile.vue`
    }
}
