import constants from '_vuex_constants'
import MrewardContacts from '../../libs/MrewardContacts'

const state = {
    contacts: [],
}

const mutations = {
    [constants.MrewardContacts.Mutations.Contacts.name]: (state, data) => {
        state.contacts = [ ...data ]
    },
}

const actions = {
    async getContacts({ commit, dispatch, state }, payload) {
        console.log('STORE: MrewardContacts Module - getContacts')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const {result} = await new MrewardContacts().GetContacts(payload)

            debugger;
            commit(constants.MrewardContacts.Mutations.Contacts.name, result)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return result
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardContacts Module - getContacts'
            }, { root: true })
        }
    },
}

const getters = {
    contacts(state) {
        return state.contacts
    },

}

export default {
    strict: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
