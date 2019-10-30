export default {
    Mutations: {
        Adresses: {
            name: 'ADRESSES',
            nameGlobal: 'MrewardAdresses/ADRESSES'
        },
        TotalCount: {
            name: 'TOTALCOUNT',
            nameGlobal: 'MrewardAdresses/TOTALCOUNT'
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
