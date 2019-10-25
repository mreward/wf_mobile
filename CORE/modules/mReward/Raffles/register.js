/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Raffles`

    return {
        // layout
        _layout_raffle_details: `${dirname}/CORE/layouts/raffle-details.vue`,

        _screen_raffles: `${PATH}/pages/screen-raffles.vue`,
        _screen_raffle_details: `${PATH}/pages/screen-raffle-details.vue`,

        // mixins
        _screen_raffles_mixin: `${PATH}/pages/mixins/screen-raffles.js`,
        _screen_raffle_details_mixin: `${PATH}/pages/mixins/screen-raffle-details.js`
    }
}
