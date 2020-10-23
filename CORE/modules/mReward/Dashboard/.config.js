const PATH = '_CORE/modules/mReward/Dashboard'

module.exports = {
    css: [
        `${PATH}/css/main.scss`
    ],
    components: {
        ProductCard: '_product_card'
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

