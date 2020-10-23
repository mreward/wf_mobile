const PATH = '_CORE/modules/mReward/Shop'

module.exports = {
    store: {
        MrewardShop: `${PATH}/store/modules/MrewardShop`
    },
    components: {
        LayoutCover: '_layout_cover'
    },
    css: [
        `${PATH}/css/main.scss`
    ],
    locales: {
        en: [
            `${PATH}/locales/en`
        ],
        ru: [
            `${PATH}/locales/ru`
        ]
    }
}
