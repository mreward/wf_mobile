/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Interesting`

    return {
        _layout_tabs: `${dirname}/CORE/layouts/tabs.vue`,
        _layout_tab: `${dirname}/CORE/layouts/tab.vue`,

        // mixins
        _tab_interesting_mixin: `${PATH}/pages/screen-home/mixins/tab-interesting.js`,

        // pages
        _screen_interesting_tab: `${PATH}/pages/screen-home/tab-interesting.vue`
    }
}
