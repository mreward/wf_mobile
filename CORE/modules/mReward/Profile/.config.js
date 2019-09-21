const PATH = '_CORE/modules/mReward/Profile'

module.exports = {
    css: [
        `${PATH}/css/main.scss`,
    ],
    store: {
        MrewardProfile: `${PATH}/store/modules/MrewardProfile`
    },
    components: {
        LayoutTabCover: `_layout_tab_cover`
    },
    locales: {
        en: [
            `${PATH}/locales/en`
        ],
        ru: [
            `${PATH}/locales/ru`
        ]
    }
}
