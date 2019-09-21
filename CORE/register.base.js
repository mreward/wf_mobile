/* eslint-disable import/no-dynamic-require */
/**
 * Базовый реестр - хранит все основные и обязательные пути
 * @param dirname
 * @returns {{_mwallet_navigator: string, _vue_components: string}}
 */

module.exports = (dirname) => {
    let registerModules = () => {}
    try {
        registerModules = require(`${dirname}/CORE/__configs.generate__/configs/register.js`)
    } catch (e) {
        console.log('./__configs.generate__/configs/register.js not found')
    }
    const COMMON = `${dirname}/CORE/components/common`

    return {
        _screen_contacts: `${dirname}/`,
        _screen_secret: `${dirname}/CORE/pages/screen-secret.vue`,
        ...registerModules(dirname),
        _mwallet_navigator: `${dirname}/CORE/components/navigator/navigator.vue`,
        _mixins_navigator: `${dirname}/CORE/components/navigator/mixin`,

        // Vuex Config
        _vuex_modules: `${dirname}/CORE/__configs.generate__/store/modules.js`,
        _vuex_constants: `${dirname}/CORE/__configs.generate__/store/constants.js`,

        _action_sheet_feedback: `${dirname}/CORE/components/navigator/action-sheet-feedback.vue`,
        _vue_inspector: `${dirname}/CORE/components/debug-mod/vue-inspector.vue`,

        _mWalletClient: `${dirname}/CORE/__configs.generate__/configs/client.mWallet.js`,
        _commonClient: `${dirname}/CORE/libs/common-client.js`,
        _apiClient: `${dirname}/CORE/libs/mWallet/ApiClient.js`,
        _ApiCMD: `${dirname}/CORE/libs/mWallet/ApiCMD`,

        _img_location: `_CORE/img/location.png`,
        _progress_circular: `${COMMON}/progress-circular.vue`,

        // Alert
        _alert_confirm: `${COMMON}/alerts/alert-confirm/index.vue`,
        _alert_confirm_default: `${COMMON}/alerts/alert-confirm/default.vue`,
        _alert_confirm_notification: `${COMMON}/alerts/alert-confirm/notification.vue`,
        _alert_confirm_helper: `${COMMON}/alerts/alert-confirm/helper.vue`,

        // masks
        _masks: `${dirname}/CORE/masks/index.js`,

        // plugins
        _plugins_validation_helpers: `${dirname}/CORE/plugins/common/validations/index.js`,
        _plugins_validators: `${dirname}/CORE/plugins/common/validations/validators/index.js`,

        //    payment system logo
        _payment_system_logo: `${dirname}/CORE/img/payment-system-logo`
    }
}
