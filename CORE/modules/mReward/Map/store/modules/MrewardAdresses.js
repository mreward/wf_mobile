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
    adresses: [],
    totalCount: 0
}
const mutations = {
    [AdressesMutat.Adresses.name]: (state, data) => {
        if (data._meta.currentPage > 1) {
            state.adresses = state.adresses.concat(data.items)
        } else {
            state.adresses = [...data.items]
        }
    },
    [AdressesMutat.TotalCount.name]: (state, data) => {
        state.totalCount = data
    }
}
const actions = {
    async getAdresses({ commit, dispatch }, payload) {
        console.log('STORE: MrewardAdresses Module - getAdresses')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            let currentPosition = {
                latitude: 50.4062163,
                longitude: 30.6244756
            }
            if (Vue.prototype.$ons.isWebView()) {
                currentPosition = await Geolocation.getCurrentPosition()
            }

            const partnerId = await dispatch(constants.MrewardAdresses.Actions.getPartnerIdByLatLng, currentPosition, { root: true })

            // partnerId
            const response = await new MrewardAdresses().GetAdressesPoints({
                ...payload,
                partnerId
            })

            if (currentPosition.latitude !== 0 && currentPosition.longitude !== 0) {
                response.items.map((item) => {
                    item.distance = Geolocation.calculetDistance(item, currentPosition)
                    return item
                })
            }

            commit(AdressesMutat.Adresses.name, response)
            commit(AdressesMutat.TotalCount.name, response._meta.totalCount)

            validatePagination(response, constants.MrewardAdresses.Actions.getAdresses)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response.items
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardAdressesd Module - getAdresses'
            }, { root: true })
        }
    },

    async getPartnerIdByLatLng({ commit, dispatch, rootState }, payload) {
        try {
            const googleApiKey = rootState.App.settings.googleApiKey
            const { data: geoInfo } = await new MrewardAdresses().GetGoogleGeoInfo({
                ...payload,
                googleApiKey
            })

            const countryShortName = geoInfo.results.find((item) => {
                return item.types[0] === 'street_address'
            }).address_components.find((item) => {
                return item.types[0] === 'country'
            }).short_name
            debugger

            return getPartnerId(countryShortName)
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardAdressesd Module - getAdresses'
            }, {root: true})
        }
    }
}

const getters = {
    adresses(state) {
        // Sort addresses list by distance field, from low to high
        return state.adresses.sort((item1, item2) => {
            return item1.distance - item2.distance
        })
    },
    totalCount(state) {
        return state.totalCount
    }
}

const getPartnerId = (countryShortName) => {
    switch (countryShortName) {
        case 'KG':
            return 1
        case 'KZ':
            return 2
        case 'RU':
            return 3
        default:
            return 1
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
