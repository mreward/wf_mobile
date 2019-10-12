/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Poll`

    return {
        // mixins
        _screen_poll_mixin: `${PATH}/pages/mixins/screen-poll.js`,

        // components
        _poll_card: `${PATH}/components/poll-card.vue`,

        // pages
        _screen_poll: `${PATH}/pages/screen-poll.vue`,
        _screen_poll_details: `${PATH}/pages/screen-poll-details.vue`
    }
}
