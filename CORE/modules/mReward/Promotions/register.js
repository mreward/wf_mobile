/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Promotions`

    return {
        // layout
        _layout_cover: `${dirname}/CORE/layouts/cover.v2.vue`,

        // pages mixins
        _screen_promotions_mixin: `${PATH}/pages/mixins/screen-promotions.js`,
        _screen_promotions_details_mixin: `${PATH}/pages/mixins/screen-promotions-details.js`,

        // pages
        _screen_promotions: `${PATH}/pages/screen-promotions.vue`,
        _screen_promotions_details: `${PATH}/pages/screen-promotions-details.vue`
    }
}
