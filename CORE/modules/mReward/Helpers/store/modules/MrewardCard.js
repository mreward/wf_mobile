import constants from '_vuex_constants'
import MrewardCard from '../../libs/MrewardCard'

const state = {
    cards: {}
}

const mutations = {
    [constants.MrewardCard.Mutations.Cards.name]: (state, data) => {
        state.cards = data
    }
}

const actions = {
    /**
     * Get info
     * @param commit
     * @param dispatch
     */
    async getInfo({ commit, dispatch }, payload = {}) {
        console.log('STORE: MrewardCard Module - getInfo')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardCard().GetInfo({...payload})

            if (!response.cards.length) {
                const result = await new MrewardCard().Generate({...payload})
                response.cards.push(result.card)
            }

            commit(constants.MrewardCard.Mutations.Cards.name, response.cards)
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardCard Module - getInfo'
            }, { root: true })
        }
    }
}

const getters = {
    cards(state) {
        return state.cards
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
