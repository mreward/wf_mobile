const PATH = '_CORE/modules/mReward/Map';

module.exports = {
    directives: {
        //OnsModalOnScroll: true,
    },
    css: [
        `${PATH}/css/main.scss`,
    ],
    components: {
        LayoutTab: '_layout_tab',
        NotFoundItems: '_not_found_items',
    },
    store: {
        MrewardAdresses: `${PATH}/store/modules/MrewardAdresses`,
    },
    locales: {
        en: [
            `${PATH}/locales/en`,
        ],
        ru: [
            `${PATH}/locales/ru`,
        ],
    }
};

