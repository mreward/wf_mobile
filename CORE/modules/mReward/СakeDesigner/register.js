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
        _screen_designer_catalog: `${PATH}/pages/screen-designer-catalog`,
        _screen_designer_categories: `${PATH}/pages/screen-designer-categories`,
        _screen_designer_add_lettering: `${PATH}/pages/screen-designer-add-lettering`,
        _screen_designer_feedback: `${PATH}/pages/screen-feedback`,
        _screen_designer_checkout: `${PATH}/pages/screen-checkout`
    }
}
