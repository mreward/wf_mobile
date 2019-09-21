const PATH = '_CORE/modules/mReward/Promotions'

module.exports = {
    store: {
        MrewardPromotions: `${PATH}/store/modules/MrewardPromotions`
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
