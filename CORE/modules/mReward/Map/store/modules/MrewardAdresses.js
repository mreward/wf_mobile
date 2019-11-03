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
    totalCount: 0,
    currentPosition: {},
    partnerId: 1
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
    },
    [AdressesMutat.CurrentPosition.name]: (state, data) => {
        state.currentPosition = data
    },
    [AdressesMutat.PartnerId.name]: (state, data) => {
        state.partnerId = data
    }
}
const actions = {
    async getAdresses({ commit, dispatch, state }, payload) {
        console.log('STORE: MrewardAdresses Module - getAdresses')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            if (Object.keys(state.currentPosition).length === 0 || payload.networkFirst) {
                if (Vue.prototype.$ons.isWebView()) {
                    const currentPosition = await Geolocation.getCurrentPosition()
                    commit(AdressesMutat.CurrentPosition.name, currentPosition)
                }

                if (Object.keys(state.currentPosition).length > 0) {
                    const partnerId = await dispatch(constants.MrewardAdresses.Actions.getPartnerIdByLatLng, state.currentPosition, {root: true})
                    commit(AdressesMutat.PartnerId.name, partnerId)
                }
            }

            // partnerId
            const response = await new MrewardAdresses().GetAdressesPoints({
                ...payload,
                partnerId: state.partnerId
            })

            if (state.currentPosition.latitude !== 0 && state.currentPosition.longitude !== 0) {
                response.items.map((item) => {
                    item.distance = Geolocation.calculetDistance(item, state.currentPosition)
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

            if (geoInfo.returnDefault) {
                return getPartnerId()
            }

            /**
             * get count short name from google maps api response
             */
            const countryShortName = geoInfo.results.find((item) => {
                return item.types.find((item) => {
                    return item === 'country'
                })
            }).address_components.find((item) => {
                return item.types.find((item) => {
                    return item === 'country'
                })
            }).short_name

            return getPartnerId(countryShortName)
        } catch (error) {
            console.error('STORE: MrewardAdressesd Module - getAdresses', error)
            return getPartnerId()
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

const getPartnerId = (countryShortName = 'default') => {
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
