import constants from '_vuex_constants'
import MrewardRaffles from '../../libs/MrewardRaffles'

const {
    MrewardRaffles: {
        Mutations: RafflesMutat
    }
} = constants

const state = {
    raffles: []
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

const getters = {
    // TODO format raffle there
    dashboardRaffles(state) {
        return state.raffles
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
