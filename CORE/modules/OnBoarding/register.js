/**
 * @param dirname
 * @returns {{}}
 */

module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/OnBoarding`
    const COMMON = `${dirname}/CORE/components/common`

    return {
        // Screens
        _screen_onboarding: `${PATH}/pages/screen-onboarding.vue`,
        // Components
        _button_base: `${COMMON}/buttons/button-base.vue`,
        // Mixins
        _mixin_screen_onboarding: `${PATH}/pages/mixins/screen-onboarding.js`,
        _mixin_onboarding: `${PATH}/pages/mixins/onboarding.js`
    }
}
