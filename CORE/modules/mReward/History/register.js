/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/History`

    return {
        // mixins
        _screen_history_mixin: `${PATH}/pages/mixins/screen-history.js`,
        _screen_history_details_mixin: `${PATH}/pages/mixins/screen-history-details.js`,

        // pages
        _screen_history: `${PATH}/pages/screen-history.vue`,
        _screen_history_details: `${PATH}/pages/screen-history-details.vue`,
        _screen_history_search_shop: `${PATH}/pages/screen-history-search-shop.vue`,

        // components
        _history_item: `${PATH}/components/history-item.vue`,
        _history_header: `${PATH}/components/history-header.vue`,
        _history_product_item: `${PATH}/components/history-product-item.vue`,
        _history_address_item: `${PATH}/components/history-address-item.vue`
    }
}
