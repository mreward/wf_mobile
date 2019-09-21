/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Helpers`

    return {
        // components
        _dynamic_input: `${PATH}/components/dynamic-input.vue`,
        _status_popover: `${PATH}/components/status-popover.vue`
    }
}
