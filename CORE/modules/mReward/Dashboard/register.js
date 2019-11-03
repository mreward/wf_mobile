/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Dashboard`
    const COMMON = `${dirname}/CORE/components/common`

    return {
        // components
        _title_row: `${PATH}/components/title-row.vue`,
        _product_card: `${PATH}/components/product-card.vue`,
        _dashboard_action: `${PATH}/components/dashboard-action.vue`,
        _dashboard_profile: `${PATH}/components/dashboard-profile.vue`,
        _dashboard_history: `${PATH}/components/dashboard-history.vue`,
        _dashboard_raffles: `${PATH}/components/dashboard-raffles.vue`,
        _not_found_items: `${COMMON}/not-found-items.vue`,
        _raffle_card: `${PATH}/components/raffle-card.vue`
    }
}
