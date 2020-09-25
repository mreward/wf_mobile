import constants from '_vuex_constants'
import MrewardСakeDesigner from '../../libs/MrewardСakeDesigner'
// import MrewardСakeDesignerMock from '../../libs/MrewardСakeDesignerMock'

import { get } from 'lodash'

const {
    MrewardСakeDesigner: {
        Mutations: ConstructMutat
    }
} = constants

const state = {
    fillings: [],
    decors: [],
    decorGallery: [],
    letterings: [],
    letteringGallery: [],
    order: {
        decor: {
            item: {},
            gallery: null
        },
        filling: {
            item: {}
        },
        lettering: {
            item: {},
            gallery: null
        }
    }
}

const mutations = {
    [ConstructMutat.Fillings.name]: (state, data) => {
        state.fillings = data
    },
    [ConstructMutat.Decors.name]: (state, data) => {
        state.decors = data
    },
    [ConstructMutat.DecorGallery.name]: (state, data) => {
        state.decorGallery = data
    },
    [ConstructMutat.Letterings.name]: (state, data) => {
        state.letterings = data
    },
    [ConstructMutat.LetteringGallery.name]: (state, data) => {
        state.letteringGallery = data
    },
    [ConstructMutat.OrderFilling.name]: (state, data) => {
        state.order.filling = data
    },
    [ConstructMutat.OrderDecor.name]: (state, data) => {
        state.order.decor = data
    },
    [ConstructMutat.OrderLettering.name]: (state, data) => {
        state.order.lettering = data
    }
}

const actions = {
    async getFillings({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - getFillings')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardСakeDesigner().GetFillings(payload)
            commit(ConstructMutat.Fillings.name, get(response, 'filling.0.filling', []))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - getFillings'
            }, {root: true})
        }
    },

    async getDecor({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - getDecor')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardСakeDesigner().GetDecor(payload)
            commit(ConstructMutat.Decors.name, get(response, 'decor.0.decor', []))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - getDecor'
            }, {root: true})
        }
    },

    async getDecorGallery({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - getDecor')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardСakeDesigner().GetDecorGallery(payload)
            commit(ConstructMutat.DecorGallery.name, get(response, 'items', []))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - getDecor'
            }, {root: true})
        }
    },

    async getLetterings({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - getLetterings')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardСakeDesigner().GetLetterings(payload)
            commit(ConstructMutat.Letterings.name, get(response, 'list.0.list', []))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - getLetterings'
            }, {root: true})
        }
    },

    async getLetteringGallery({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - getLetteringGallery')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardСakeDesigner().GetLetteringGallery(payload)
            commit(ConstructMutat.LetteringGallery.name, get(response, 'items', []))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - getLetteringGallery'
            }, {root: true})
        }
    },

    setOrderFilling({ state, commit }, payload) {
        commit(ConstructMutat.OrderFilling.name, payload)
    },

    setOrderDecor({ state, commit }, payload) {
        commit(ConstructMutat.OrderDecor.name, payload)
    },

    setOrderLettering({ state, commit }, payload) {
        commit(ConstructMutat.OrderLettering.name, payload)
    },

    uploadOrderDecor({ state, commit }, payload) {

    },

    uploadOrderLettering({ state, commit }, payload) {

    }
}

const getters = {
    fillings(state) {
        return state.fillings
    },
    decors(state) {
        return state.decors
    },
    decorGallery(state) {
        return state.decorGallery
    },
    letterings(state) {
        return state.letterings
    },
    letteringGallery(state) {
        return state.letteringGallery
    },
    order(state) {
        return state.order
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
