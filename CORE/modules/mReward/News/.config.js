const PATH = '_CORE/modules/mReward/News'

module.exports = {
    store: {
        MrewardNews: `${PATH}/store/modules/MrewardNews`
    },
    css: [
        `${PATH}/css/main.scss`
    ],
    components: {
        LayoutCover: '_layout_cover'
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
