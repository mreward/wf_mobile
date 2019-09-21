import constants from '_vuex_constants'
import MrewardAdresses from '../../libs/MrewardAdresses'
import validatePagination from '../../../libs/ValidatePagination'
import Vue from 'vue'
import Geolocation from '_CORE/plugins/common/Geolocation'

const {
    MrewardAdresses: {
        Mutations: AdressesMutat
    }
} = constants

const state = {
    adresses: []
}
const mutations = {
    [AdressesMutat.Adresses.name]: (state, data) => {
        if (data._meta.currentPage > 1) {
            state.adresses = state.adresses.concat(data.items)
        } else {
            state.adresses = [...data.items]
        }
    }
}
const actions = {
    async getAdresses({ commit, dispatch }, payload) {
        console.log('STORE: MrewardAdresses Module - getAdresses')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardAdresses().GetAdressesPoints(payload)
            let currentPosition = {
                latitude: 0,
                longitude: 0
            }
            if (Vue.prototype.$ons.isWebView()) {
                currentPosition = await Geolocation.getCurrentPosition()
            }
            if (currentPosition.latitude !== 0 && currentPosition.longitude !== 0) {
                response.items.map((item) => {
                    item.distance = Geolocation.calculetDistance(item, currentPosition)
                    return item
                })
            }

            commit(AdressesMutat.Adresses.name, response)

            validatePagination(response, constants.MrewardAdresses.Actions.getAdresses)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response.items
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardAdressesd Module - getAdresses'
            }, { root: true })
        }
    }
}

const getters = {
    adresses(state) {
        // Sort addresses list by distance field, from low to high
        return state.adresses.sort((item1, item2) => {
            return item1.distance - item2.distance
        })
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
