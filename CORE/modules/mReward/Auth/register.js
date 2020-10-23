/**
 * @param dirname
 * @returns {{}}
 */
module.exports = (dirname) => {
    const PATH = `${dirname}/CORE/modules/mReward/Auth`
    const COMMON = `${dirname}/CORE/components/common`

    return {
        // Components common
        _form_base: `${COMMON}/form/form-base.vue`,
        _form_item: `${COMMON}/form/form-item.vue`,
        _form_list: `${COMMON}/form/form-list.vue`,
        _input_base: `${COMMON}/inputs/input-base.vue`,
        _layout_auth: `${dirname}/CORE/layouts/auth.vue`,
        _toolbar: `${dirname}/CORE/components/common/toolbar/index.vue`,
        _datepicker_custom: `${COMMON}/datepickers/datepicker-custom/index.vue`,
        _validation_error: `${COMMON}/form/validation-error.vue`,
        _input_pin_sequence: `${dirname}/CORE/components/common/inputs/input-pin-sequence.vue`,

        // Components
        _mobile_number: `${PATH}/components/mobile-number.vue`,
        _use_touch_id: `${PATH}/components/use-touch-id.vue`,

        // pages
        _screen_registration: `${PATH}/pages/screen-registration.vue`,
        _screen_authorization: `${PATH}/pages/screen-authorization.vue`,
        _screen_recovery_password: `${PATH}/pages/screen-recovery-password.vue`,
        _screen_confirm_otp: `${PATH}/pages/screen-confirm-otp.vue`,
        _screen_select_city: `${PATH}/pages/screen-select-city.vue`,
        _screen_select_country: `${PATH}/pages/screen-select-country.vue`,
        _screen_confirm_pin: `${PATH}/pages/screen-confirm-pin.vue`,
        _screen_auth_confirm_pin: `${PATH}/pages/screen-auth-confirm-pin.vue`,

        // mixins pages
        _mixin_screen_registration: `${PATH}/pages/mixins/screen-registration.js`,
        _mixin_screen_authorization: `${PATH}/pages/mixins/screen-authorization.js`,
        _mixin_screen_recovery_password: `${PATH}/pages/mixins/screen-recovery-password.js`,
        _mixin_screen_confirm_otp: `${PATH}/pages/mixins/screen-confirm-otp.js`,
        _mixin_screen_select_country: `${PATH}/pages/mixins/screen-select-country.js`,
        _mixin_screen_select_city: `${PATH}/pages/mixins/screen-select-city.js`,
        _mixin_screen_confirm_pin: `${PATH}/pages/mixins/screen-confirm-pin.js`,
        _mixin_screen_auth_confirm_pin: `${PATH}/pages/mixins/screen-auth-confirm-pin.js`,

        // mixins
        _mixin_choose_country: `${PATH}/mixins/choose-country.js`,
        _mixin_choose_city: `${PATH}/mixins/choose-city.js`,

        _img_touch_id: `${PATH}/img/touch-id.svg`,
        _img_face_id: `${PATH}/img/face-id.svg`,
        _img_pin_illustration: `${PATH}/img/pin-illustration.svg`,
    }
}
