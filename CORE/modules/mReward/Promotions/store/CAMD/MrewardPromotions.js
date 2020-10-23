export default {
    Mutations: {
        PartnerPromotions: {
            name: 'PARTNER_PROMOTIONS',
            nameGlobal: 'MrewardPromotions/PARTNER_PROMOTIONS'
        }
    },
    Actions: {
        getPromotions: 'MrewardPromotions/getPromotions',
        getPromotionItem: 'MrewardPromotions/getPromotionItem'
    },
    Getters: {
        partnerPromotions: 'MrewardPromotions/partnerPromotions',
        partnerPromotionsSortedByColumns: 'MrewardPromotions/partnerPromotionsSortedByColumns'
    }
}
