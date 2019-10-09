const PATH = '_CORE/modules/mReward/Helpers'

module.exports = {
    locales: {
        en: [
            `${PATH}/locales/en`,
        ],
        ru: [
            `${PATH}/locales/ru`,
        ],
    },
    css: [
        `${PATH}/css/main.scss`,
    ],
    store: {
        MrewardGeo: `${PATH}/store/modules/MrewardGeo`,
        MrewardAccount: `${PATH}/store/modules/MrewardAccount`,
        MrewardCard: `${PATH}/store/modules/MrewardCard`
    }
}

