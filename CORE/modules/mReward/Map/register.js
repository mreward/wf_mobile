/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Map`
    const COMMON = `${dirname}/CORE/components/common`

    return {
        _screen_adresses: `${PATH}/pages/screen-adresses.vue`,
        _mixin_screen_adresses: `${PATH}/pages/mixins/screen-adresses.js`,

        _layout_tab: `${dirname}/CORE/layouts/tab.vue`,

        _adress_item: `${PATH}/components/adress-item.vue`,
        _not_found_items: `${COMMON}/not-found-items.vue`
    }
}
