const PATH = '_CORE/modules/OnBoarding';

module.exports = {
    css: [
        `${PATH}/css/main.scss`,
    ],
    components: {
        ButtonBase: '_button_base',
    },
    options: {
        lengthSteps: 5,
        closeTitle: false,
        skipAction: false,
        nextAction: false
    },
    store: {
        OnBoarding: `${PATH}/store/modules/Onboarding`,
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
        ]
    },
};
