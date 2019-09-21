export default {
    Mutations: {
        Countries: {
            name: 'COUNTRIES',
            nameGlobal: 'MrewardGeo/COUNTRIES'
        },
        Cities: {
            name: 'CITIES',
            nameGlobal: 'MrewardGeo/CITIES'
        }
    },
    Actions: {
        getCountries: 'MrewardGeo/getCountries',
        getCities: 'MrewardGeo/getCities',
        getCityById: 'MrewardGeo/getCityById'
    },
    Getters: {
        countries: 'MrewardGeo/countries',
        cities: 'MrewardGeo/cities'
    }
}
