import constants from '_vuex_constants'
import localforage from 'localforage'
import { DbObject } from '_CORE/store/db-objects'

const { OnBoarding } = constants

const eternalStore = localforage.createInstance({
    name: 'EternalStore'
})
const storeItemName = 'showOnBoarding'

const state = {
    showOnBoarding: true
}

const mutations = {
    [OnBoarding.Mutations.OnBoarding.name]: (state, payload) => {
        state.showOnBoarding = payload
    }
}

const actions = {
    async setOnBoarding({ commit, dispatch }) {
        console.log('STORE: OnBoarding Module - setOnBoarding')
        try {
            const dataObject = new DbObject().GetDefaultObject(true)
            await eternalStore.setItem(storeItemName, dataObject)
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: OnBoarding Module - setOnBoarding'
            }, { root: true })
        }
    },
    async getOnBoarding({ commit, dispatch }) {
        console.log('STORE: OnBoarding Module - getOnBoarding')
        try {
            const showOnBoarding = await eternalStore.getItem(storeItemName)
            commit(OnBoarding.Mutations.OnBoarding.name, showOnBoarding)
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: OnBoarding Module - getOnBoarding'
            }, { root: true })
        }
    }
}

const getters = {
    showOnBoarding(state) {
        return state.showOnBoarding
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
