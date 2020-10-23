/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Helpers`

    return {
        // components
        _dynamic_input: `${PATH}/components/dynamic-input.vue`,
        _status_popover: `${PATH}/components/status-popover.vue`,
        _pull_to_wrapper: `${PATH}/components/pull-to-wrapper.vue`,

        // mixins
        _mixin_handle_html_links: `${PATH}/mixins/handleHtmlLinks.js`
    }
}
