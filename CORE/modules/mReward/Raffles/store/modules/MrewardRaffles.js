import constants from '_vuex_constants'
import MrewardRaffles from '../../libs/MrewardRaffles'

const {
    MrewardRaffles: {
        Mutations: RafflesMutat
    }
} = constants

const state = {
    raffles: {}
}

const mutations = {
    [RafflesMutat.Raffles.name]: (state, data) => {
        state.raffles = { ...data }
    }
}

const actions = {
    /**
     * Get raffles
     * @param commit
     * @param payload
     * @param dispatch
     */
    async getRaffles({ commit, dispatch }, payload) {
        console.log('STORE: MrewardRaffles Module - getRaffles')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const { generators: raffles } = await new MrewardRaffles().GetRaffles(payload)

            commit(RafflesMutat.Raffles.name, raffles)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return raffles
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardRaffles Module - getRaffles'
            }, { root: true })
        }
    }
}

import _map from 'lodash/map'

const getters = {
    // TODO format raffle there
    dashboardRaffles(state) {
        const dashboardRaffles = _map(state.raffles, (value, key) => {
            return {
                name: value.name,
                description: value.description,
                generatorId: key,
                count: value.count,
                dibsForNext: value.for_next,
                images: {
                    mobile: value.image_url_420
                }
            }
        })

        return dashboardRaffles.slice(0, 2)
    },
    allRaffles(state) {
        return state.raffles
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
