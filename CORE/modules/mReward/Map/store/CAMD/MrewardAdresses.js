export default {
    Mutations: {
        Adresses: {
            name: 'ADRESSES',
            nameGlobal: 'MrewardAdresses/ADRESSES'
        },
        TotalCount: {
            name: 'TOTALCOUNT',
            nameGlobal: 'MrewardAdresses/TOTALCOUNT'
        },
        CurrentPosition: {
            name: 'CURRENT_POSITION',
            nameGlobal: 'MrewardAdresses/CURRENT_POSITION'
        },
        PartnerId: {
            name: 'PARTNER_ID',
            nameGlobal: 'MrewardAdresses/PARTNER_ID'
        }
    },
    Actions: {
        getAdresses: 'MrewardAdresses/getAdresses',
        getPartnerIdByLatLng: 'MrewardAdresses/getPartnerIdByLatLng'
    },
    Getters: {
        adresses: 'MrewardAdresses/adresses',
        totalCount: 'MrewardAdresses/totalCount'
    }
}
