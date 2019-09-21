/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Profile`

    return {
        _layout_tabs: `${dirname}/CORE/layouts/tabs.vue`,
        _layout_tab: `${dirname}/CORE/layouts/tab.vue`,
        _layout_tab_cover: `${dirname}/CORE/layouts/tab-cover.vue`,

        // mixins
        _tab_profile_mixin: `${PATH}/pages/mixins/tab-profile.js`,
        _screen_edit_profile_mixin: `${PATH}/pages/mixins/screen-edit-profile.js`,
        _screen_settings_mixin: `${PATH}/pages/mixins/screen-settings.js`,

        // pages
        _tab_profile: `${PATH}/pages/tab-profile.vue`,
        _screen_settings: `${PATH}/pages/screen-settings.vue`,
        _screen_edit_profile: `${PATH}/pages/screen-edit-profile.vue`
    }
}
