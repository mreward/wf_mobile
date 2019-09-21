/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const COMMON = `${dirname}/CORE/components/common`

    return {
        // Helpers
        _screen_fail: `${dirname}/CORE/modules/Helpers/Base/pages/screen-fail.vue`,
        _screen_success: `${dirname}/CORE/modules/Helpers/Base/pages/screen-success.vue`,
        _screen_iframe: `${dirname}/CORE/modules/Helpers/Base/pages/screen-iframe.vue`,
        _screen_sms_confirm_helper: `${dirname}/CORE/modules/Helpers/Base/pages/screen-sms-confirm.vue`,

        _mixin_screen_fail: `${dirname}/CORE/modules/Helpers/Base/pages/mixins/screen-fail.js`,
        _mixin_screen_success: `${dirname}/CORE/modules/Helpers/Base/pages/mixins/screen-success.js`,
        _mixin_screen_iframe: `${dirname}/CORE/modules/Helpers/Base/pages/mixins/screen-iframe.js`,
        _mixin_screen_sms_confirm_helper: `${dirname}/CORE/modules/Helpers/Base/pages/mixins/screen-sms-confirm.js`,
        _mixin_screen_sms_confirm_resend_code: `${dirname}/CORE/modules/Helpers/Base/pages/mixins/screen-sms-confirm-resend-code.js`,

        _layout_default: `${dirname}/CORE/layouts/default.vue`,
        _layout_auth: `${dirname}/CORE/layouts/auth.vue`,
        _button_base: `${COMMON}/buttons/button-base.vue`,
        _input_pin: `${COMMON}/inputs/input-pin-sequence.vue`,

        _account: `${COMMON}/account.js`
    }
}
