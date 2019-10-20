import constants from '_vuex_constants'
import _map from 'lodash/map'
import MrewardRaffles from '../../libs/MrewardRaffles'
import formatDatePeriod from '_CORE/modules/mReward/libs/formatDatePeriod'

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

const getters = {
    dashboardRaffles(state) {
        const dashboardRaffles = formatRaffleObject(state.raffles)

        return dashboardRaffles.slice(0, 2)
    },
    allRaffles(state) {
        return formatRaffleObject(state.raffles)
    }
}

const formatRaffleObject = (rafflesList) => {
    return _map(rafflesList, (value, key) => {
        return {
            name: value.name,
            description: value.description,
            datePeriod: formatDatePeriod(value.date_from, value.date_to),
            generatorId: key,
            count: value.count,
            dibsForNext: value.for_next,
            images: {
                mobile: value.image_url_420
            }
        }
    })
}

export default {
    strict: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
