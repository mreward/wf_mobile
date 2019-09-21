export default {
    Mutations: {
        PartnerNews: {
            name: 'PARTNER_NEWS',
            nameGlobal: 'MrewardNews/PARTNER_NEWS'
        }
    },
    Actions: {
        getNews: 'MrewardNews/getNews'
    },
    Getters: {
        partnerNews: 'MrewardNews/partnerNews',
        partnerNewsSortedByColumns: 'MrewardNews/partnerNewsSortedByColumns'
    }
}
