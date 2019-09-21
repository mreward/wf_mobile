import constants from '_vuex_constants'
import MrewardGeo from '../../libs/MrewardGeo'

const {
    MrewardGeo: {
        Mutations: GeoMutat
    }
} = constants

const state = {
    countries: [],
    cities: []
}

const mutations = {
    [GeoMutat.Countries.name]: (state, data) => {
        state.countries = data
    },
    [GeoMutat.Cities.name]: (state, data) => {
        state.cities = data
    }
}

const actions = {
    /**
     * Get countries
     * @param commit
     * @param dispatch
     */
    async getCountries({ commit, dispatch }) {
        console.log('STORE: MrewardGeo Module - getCountries')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardGeo().GetCountries()

            commit(GeoMutat.Countries.name, response.target)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardGeo Module - getCountries'
            }, { root: true })
        }
    },

    /**
     * Get cities
     * @param payload
     * @param commit
     * @param dispatch
     */
    async getCities({ commit, dispatch }, payload) {
        console.log('STORE: MrewardGeo Module - getCities')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardGeo().GetCities(payload)

            commit(GeoMutat.Cities.name, response.target)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardGeo Module - getCities'
            }, { root: true })
        }
    },

    /**
     * Get ciy by id
     * @param payload
     * @param commit
     * @param dispatch
     */
    async getCityById({ dispatch }, payload) {
        console.log('STORE: MrewardGeo Module - getCityById')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardGeo().GetCityById(payload)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardGeo Module - getCityById'
            }, { root: true })
        }
    }
}

const getters = {
    countries(state) {
        return state.countries
    },

    cities(state) {
        return state.cities
    }
}

export default {
    strict: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
