export default {
    Mutations: {
        PartnerNews: {
            name: 'PARTNER_NEWS',
            nameGlobal: 'MrewardNews/PARTNER_NEWS'
        }
    },
    Actions: {
        getNews: 'MrewardNews/getNews',
        getNewsItem: 'MrewardNews/getNewsItem'
    },
    Getters: {
        partnerNews: 'MrewardNews/partnerNews',
        partnerNewsSortedByColumns: 'MrewardNews/partnerNewsSortedByColumns'
    }
}
