export default {
    Mutations: {
        CountryList: {
            name: 'PHONEMASKS_COUNTRY_LIST',
            nameGlobal: 'PhoneMasks/PHONEMASKS_COUNTRY_LIST'
        }
    },
    Actions: {
        updateCountryList: 'PhoneMasks/updateCountryList'
    },
    Getters: {
        maskFromPhone: 'PhoneMasks/maskFromPhone',
        countryList: 'PhoneMasks/countryList',
        maskFromIso: 'PhoneMasks/maskFromIso',
        maskForComponents: 'PhoneMasks/maskForComponents'
    }
}
