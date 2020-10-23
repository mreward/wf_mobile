import constants from '_vuex_constants'
import MrewardPoll from '../../libs/MrewardPoll'

const {
    MrewardPoll: {
        Mutations: PollMutat
    }
} = constants

const state = {
    polls: {
    }
}

const mutations = {
    [PollMutat.Polls.name]: (state, data) => {
        state.polls = data.sort((a, b) => {
            if (a.answer < b.answer) {
                return -1
            }
            if (a.answer > b.answer) {
                return 1
            }
            return 0
        })
    }
}

const actions = {
    /**
     * Get polls
     * @param payload
     * @param commit
     * @param dispatch
     */
    async getPolls({ commit, dispatch }, payload) {
        console.log('STORE: MrewardPoll Module - getPolls')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardPoll().GetPoll(payload)

            commit(PollMutat.Polls.name, response.items)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardPoll Module - getPolls'
            }, { root: true })
        }
    },

    async setAnswer({ commit, dispatch }, payload) {
        console.log('STORE: MrewardPoll Module - setAnswer')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardPoll().SetAnswer(payload)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardPoll Module - setAnswer'
            }, { root: true })
        }
    }
}

const getters = {
    polls(state) {
        return state.polls
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
