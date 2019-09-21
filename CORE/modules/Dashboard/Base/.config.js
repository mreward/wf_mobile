const PATH = '_CORE/modules/Dashboard/Base';

module.exports = {
    components: {
        LayoutHome: '_layout_home',
        Tile: '_tile',
    },
    css: [
        `${PATH}/css/main.scss`,
    ],
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
};
