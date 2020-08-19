// import constants from '_vuex_constants'
// import MrewardShop from '../../libs/MrewardShop'
// import validatePagination from '_CORE/modules/mReward/libs/ValidatePagination'
// import sortByColumns from '_CORE/modules/mReward/libs/sortByColumns'
// import formatDatePeriod from '_CORE/modules/mReward/libs/formatDatePeriod'

import constants from '_vuex_constants'
import MrewardShop from '../../libs/MrewardShop'
import MrewardNews from '_MODULES/mReward/News/libs/MrewardNews'
import validatePagination from '_MODULES/mReward/libs/ValidatePagination'

const {
    MrewardShop: {
        Mutations: ShopMutat
    }
} = constants

const state = {
    products: [],
    productsTop: [],
}

const mutations = {
    [ShopMutat.Products.name]: (state, data) => {
        state.products = data
    },
    [ShopMutat.ProductsTop.name]: (state, data) => {
        state.productsTop = data
    },
}

const actions = {
    async getProducts({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardNews Module - getProducts')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProducts(payload)

            commit(ShopMutat.Products.name, response)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardNews Module - getProducts'
            }, { root: true })
        }
    },

    async getProductsTop({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardNews Module - getProductsTop')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProductsTop(payload)

            commit(ShopMutat.ProductsTop.name, response)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardNews Module - getProductsTop'
            }, { root: true })
        }
    }
}

const getters = {
    products(state) {
        return state.products;
    },
    productsTop(state) {
        return state.productsTop;
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
