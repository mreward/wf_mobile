const PATH = '_CORE/modules/Helpers/Base';

module.exports = {
    options: {
        maskPhoneNumber: false,
    },
    components: {
        LayoutAuth: '_layout_auth',
        LayoutDefault: '_layout_default',
        InputPin: '_input_pin',
        ButtonBase: '_button_base',
        Account: '_account'
    },
    locales: {
        uk: [
            `${PATH}/locales/uk`,
        ],
        ru: [
            `${PATH}/locales/ru`,
        ],
        en: [
            `${PATH}/locales/en`,
        ],
        tg: [
            `${PATH}/locales/tg`,
        ],
    },
    css: [
        `${PATH}/css/main.scss`,
    ],
};
