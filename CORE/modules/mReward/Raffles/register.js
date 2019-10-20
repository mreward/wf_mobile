/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Raffles`

    return {
        // pages
        _screen_raffles: `${PATH}/pages/screen-raffles.vue`,

        // mixins
        _screen_raffles_mixin: `${PATH}/pages/mixins/screen-raffles.js`
    }
}
