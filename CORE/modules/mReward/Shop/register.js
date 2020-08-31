/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Shop`

    return {
        // layout
        _layout_cover: `${dirname}/CORE/layouts/cover.v2.vue`,

        // pages mixins
        _screen_shop_mixin: `${PATH}/pages/mixins/shop.js`,

        // pages
        _screen_shop: `${PATH}/pages/screen-shop`,
        _screen_products: `${PATH}/pages/screen-products.vue`,
        _screen_checkout: `${PATH}/pages/screen-checkout`,
        _screen_product_details: `${PATH}/pages/screen-product-details.vue`,

        _screen_shop_img: `${PATH}/img`,
    }
}
