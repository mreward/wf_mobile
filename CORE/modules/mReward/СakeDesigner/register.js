/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/СakeDesigner`

    return {
        // layout
        _layout_cover: `${dirname}/CORE/layouts/cover.v2.vue`,

        // pages mixins
        _screen_designer_tabber_mixin: `${PATH}/pages/mixins/tabber.js`,

        // pages
        _screen_designer: `${PATH}/pages/screen-designer`,
        _screen_designer_catalog: `${PATH}/pages/screen-designer-catalog`
    }
}
