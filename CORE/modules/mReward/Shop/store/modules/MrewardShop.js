// import constants from '_vuex_constants'
// import MrewardShop from '../../libs/MrewardShop'
// import validatePagination from '_CORE/modules/mReward/libs/ValidatePagination'
// import sortByColumns from '_CORE/modules/mReward/libs/sortByColumns'
// import formatDatePeriod from '_CORE/modules/mReward/libs/formatDatePeriod'

import constants from '_vuex_constants'
import MrewardShop from '../../libs/MrewardShop'
import validatePagination from '_MODULES/mReward/libs/ValidatePagination'
import { clone } from 'quasar-framework'
import cloneDeep from 'lodash/cloneDeep'
import sortBy from 'lodash/sortBy'
import isNumber from 'lodash/isNumber'
import moment from 'moment'
import { DbObject } from '_CORE/store/db-objects'
import localforage from "localforage"

const {
    MrewardShop: {
        Mutations: ShopMutat
    }
} = constants

const state = {
    products: [],
    productsTop: [],
    productsGroups: [],
    cart: {
        kg: [],
        kz: [],
        ru: [],
    },
    productsFavorite: [],
    deliveryList: [],
    country: {},
    productSearch: [],
    payData: null,
    productSearchLoader: false,
    orders: [],
    address: [],
    productsCategory: [],
}

const mutations = {
    [ShopMutat.Products.name]: (state, data) => {
        state.products = data
    },
    [ShopMutat.ProductsTop.name]: (state, data) => {
        if (data._meta && data._meta.currentPage > 1) {
            state.productsTop = state.productsTop.concat(data.items)
        } else {
            state.productsTop = [...data.items]
        }
    },
    [ShopMutat.ProductsGroups.name]: (state, data) => {
        if (data._meta && data._meta.currentPage > 1) {
            state.productsGroups = state.productsGroups.concat(data.items)
        } else {
            state.productsGroups = [...data.items]
        }
    },
    [ShopMutat.Cart.name]: (state, data) => {
        const key = state.country.code.toLowerCase()
        state.cart[key] = data
    },
    [ShopMutat.ProductsFavorite.name]: (state, data) => {
        state.productsFavorite = data
    },
    [ShopMutat.DeliveryList.name]: (state, data) => {
        if (data[0] && data[0].list && data[0].list.length) {
            state.deliveryList = data[0].list
        } else {
            state.deliveryList = []
        }
    },
    [ShopMutat.ProductsCategory.name]: (state, data) => {
        if (data._meta && data._meta.currentPage > 1) {
            state.productsCategory = state.productsCategory.concat(data.items)
        } else {
            state.productsCategory = [...data.items]
        }
    },

    [ShopMutat.Country.name]: (state, data) => {
        state.country = data
    },
    [ShopMutat.ProductSearch.name]: (state, data) => {
        if (data._meta && data._meta.currentPage > 1) {
            state.productSearch = state.productSearch.concat(data.items)
        } else {
            state.productSearch = [...data.items]
        }
    },
    [ShopMutat.PayData.name]: (state, data) => {
        state.payData = data
    },
    [ShopMutat.ProductSearchLoader.name]: (state, data) => {
        state.productSearchLoader = data
    },
    [ShopMutat.Orders.name]: (state, data) => {
        state.orders = data
    },
    [ShopMutat.Address.name]: (state, data) => {
        state.address = data
    },
}

const actions = {
    async getProducts({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getProducts')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProducts(payload)

            commit(ShopMutat.Products.name, response)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProducts'
            }, { root: true })
        }
    },

    async getProductsTop({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getProductsTop')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProductsTop({
                ...payload,
                partnerId: state.country.config.id
            })

            commit(ShopMutat.ProductsTop.name, response)

            validatePagination(response, constants.MrewardShop.Actions.getProductsTop)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })
            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProductsTop'
            }, { root: true })
        }
    },

    async getProductsGroups({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getProductsGroups')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProductsGroups(payload, {
                partnerKey: state.country.config.key,
            })

            commit(ShopMutat.ProductsGroups.name, response)

            await validatePagination(response, constants.MrewardShop.Actions.getProductsGroups)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProductsGroups'
            }, { root: true })
        }
    },

    async setFavorite({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - setFavorite')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().SetFavorite({
                art_id: payload.data.art_id,
                partner_id: payload.data.partner_id,
            })
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })
            dispatch(constants.MrewardShop.Actions.getProductsFavorite, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - setFavorite'
            }, { root: true })
        }
    },

    async removeFavorite({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - removeFavorite')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().RemoveFavorite({
                id: payload.id,
                art_id: payload.data.art_id,
                partner_id: payload.data.partner_id,
            })
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })
            dispatch(constants.MrewardShop.Actions.getProductsFavorite, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - removeFavorite'
            }, { root: true })
        }
    },

    async getProductsFavorite({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getProductsFavorite')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetListFavorite(payload)
            commit(ShopMutat.ProductsFavorite.name, response.items)
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProductsFavorite'
            }, { root: true })
        }
    },

    addToCart ({state, commit, dispatch, rootState}, payload) {
        if (payload) {
            const key = state.country.code.toLowerCase()
            const list = state.cart[key]
            let product = list.find(item => item.data.art_id === payload.data.art_id)

            if (!product) {
                product = cloneDeep(payload)
                list.push(product)
            }

            product.count += 1
            commit(ShopMutat.Cart.name, list)
        }
    },

    removeFromCart ({state, commit, dispatch, rootState}, payload) {
        if (payload) {
            const key = state.country.code.toLowerCase()
            const list = state.cart[key]
            const productIndex = list.findIndex(item => item.data.art_id === payload.data.art_id)
            if (list[productIndex]) {
                list[productIndex].count -= 1

                if (list[productIndex].count === 0) {
                    list.splice(productIndex, 1)
                }
            }
            commit(ShopMutat.Cart.name, list)
        }
    },

    clearCart ({commit}) {
        commit(ShopMutat.Cart.name, [])
    },

    async getDeliveryList({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getDeliveryList')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetDeliveryList(payload)
            commit(ShopMutat.DeliveryList.name, response.list)
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getDeliveryList'
            }, { root: true })
        }
    },

    async preCheck({ commit, state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - preCheck')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const key = state.country.code.toLowerCase()
            const list = state.cart[key]


            const receiptDetails = list.map((item, index) => {
                const data = {
                    position: index + 1,
                    prod_code: item.data.art_id,
                    prod_price: item.data.product_price,
                    prod_amount: item.count,
                    prod_sum: item.data.product_price * item.count,
                }

                if(payload.type === 'cash') {
                    data.bonus_restrict = '1'
                }
                return data
            })

            const response = await new MrewardShop().PreCheck({
                branch_id: state.country.config.code,
                is_online_store: 1,
                phone: rootState.MrewardProfile.userProfile.mobile,
                receipt_bonus_amount: payload.type === 'cash' ? 0 : (payload.bonuses || 0),
                receipt_currency: `B${state.country.code}`,
                receipt_datetime: moment().format('X'),
                receipt_description: 'Покупка в Интернет-Магазине',
                receipt_details: JSON.stringify(receiptDetails),
            }, {
                partnerKey: state.country.config.key,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response.pre_check
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - preCheck'
            }, { root: true })
        }
    },

    async paymentUrl({ commit, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - paymentUrl')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            commit(ShopMutat.PayData.name, null)

            const response = await new MrewardShop().PaymentUrl({
                precheck_id: payload.pre_check_id
            })
            commit(ShopMutat.PayData.name, response)
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - paymentUrl'
            }, {root: true})
        }
    },

    async selectCountry ({state, commit, rootState, dispatch}, payload) {
        console.log('STORE: MrewardShop Module - selectCountry')
        const country = rootState.App.settings.partnerKeys.find(i => i.country === payload.code)

        const data = {
            ...payload,
            config: country,
        }

        const dataObject = new DbObject().GetDefaultObject(data)
        await localforage.setItem(DbObject.keys.mReward.shop.country.name, dataObject)

        commit(ShopMutat.Country.name, dataObject.data)

        await dispatch(constants.MrewardShop.Actions.getProductsFavorite, {}, {root: true})
        await dispatch(constants.MrewardShop.Actions.getProductsTop, {}, {root: true})
        await dispatch(constants.MrewardShop.Actions.getProductsGroups, {}, {root: true})
    },

    async loadSelectCountry({ commit, dispatch, rootState }, payload) {
        const dbData = await localforage.getItem(DbObject.keys.mReward.shop.country.name)
        if(dbData) {
            commit(ShopMutat.Country.name, dbData.data)
        } else {
            const profile = rootState.MrewardProfile.userProfile
            if (profile && isNumber(profile.country)) {
                const country = rootState.MrewardGeo.countries.find(i => i.country_id === profile.country)
                if (country) {
                    await dispatch(constants.MrewardShop.Actions.selectCountry, country, { root: true })
                }
            }
        }
    },


    async getProduct({ commit, dispatch, rootState, state }, payload) {
        console.log('STORE: MrewardShop Module - getProduct')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProduct({
                art_id: payload.data.art_id
            }, {
                partnerKey: state.country.config.key,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProduct'
            }, {root: true})
        }
    },

    async getProductSearch({ commit, dispatch, rootState, state }, payload) {
        console.log('STORE: MrewardShop Module - getProductSearch')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            commit(ShopMutat.ProductSearch.name, {items: []})
            commit(ShopMutat.ProductSearchLoader.name, true)

            const response = await new MrewardShop().ProductSearch({
                ...payload,
                product: payload.name
            }, {
                partnerKey: state.country.config.key,
            })

            const list = response.products.map((item) => {
                return {
                    ...item,
                    id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    art_id: item.art_id,
                    images: item.images || [],
                    top: item.top,
                    partner_id: '1',
                }
            })

            commit(ShopMutat.ProductSearch.name, {
                items: list,
                _meta: response._meta
            })
            commit(ShopMutat.ProductSearchLoader.name, false)

            validatePagination(response, constants.MrewardShop.Actions.getProductSearch, payload)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProductSearch'
            }, {root: true})
        }
    },

    async getProductSearchTag({ commit, dispatch, rootState, state }, payload) {
        console.log('STORE: MrewardShop Module - getProductSearchTag')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            commit(ShopMutat.ProductSearch.name, {items: []})
            commit(ShopMutat.ProductSearchLoader.name, true)

            const response = await new MrewardShop().ProductSearchTag({
                ...payload,
                product: payload.name
            }, {
                partnerKey: state.country.config.key,
            })

            const list = response.products.map((item) => {
                return {
                    ...item,
                    id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    art_id: item.art_id,
                    images: item.images || [],
                    top: item.top,
                    partner_id: '1',
                }
            })


            commit(ShopMutat.ProductSearch.name, {
                items: list,
                _meta: response._meta
            })
            commit(ShopMutat.ProductSearchLoader.name, false)

            validatePagination(response, constants.MrewardShop.Actions.getProductSearchTag, payload)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProductSearch'
            }, {root: true})
        }
    },

    async clearProductSearch({ commit, state, rootState }, payload) {
        console.log('STORE: MrewardShop Module - clearProductSearch')
        commit(ShopMutat.ProductSearch.name, {
            items: []
        })
    },

    async getProductsCategory({ commit, state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getProductsCategory')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProductsCategory({
                ...payload
            }, {
                partnerKey: state.country.config.key,
            })

            const list = response.items.map((item) => {
                return {
                    ...item,
                    id: item.id,
                    product_name: item.name,
                    product_price: item.price,
                    art_id: item.art_id,
                    images: item.images || [],
                    top: item.top,
                    partner_id: '1',
                }
            })
            commit(ShopMutat.ProductsCategory.name, {
                items: list,
                _meta: response._meta
            })

            validatePagination(response, constants.MrewardShop.Actions.getProductsCategory, payload)
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return list
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getProductsCategory'
            }, {root: true})
        }
    },

    async getPriceDelivery({ state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getPriceDelivery')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().ProductSearch({
                product: 'Доставка'
            }, {
                partnerKey: state.country.config.key,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response.products[0]
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getPriceDelivery'
            }, {root: true})
        }
    },

    async checkConfirm({ state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - checkConfirm')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().CheckConfirm({
                check_number: payload.check_number,
                pre_check_id: payload.pre_check_id,
                payment_type: JSON.stringify([{'type': 1, sum: payload.money}])
            }, {
                partnerKey: state.country.config.key,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - checkConfirm'
            }, {root: true})
        }
    },

    async onlineStoreApplication({ state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - onlineStoreApplication')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().OnlineStoreApplication({
                address: payload.address,
                date: payload.date,
                info: payload.info,
                lat: payload.lat,
                lon: payload.lon,
                precheck_id: payload.pre_check_id,
                time_from: payload.time_from,
                time_to: payload.time_to,
        }, {
                partnerKey: state.country.config.key,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - onlineStoreApplication'
            }, {root: true})
        }
    },

    async getOrders({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardShop Module - getOrders')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardShop().OnlineOrder({})
            commit(ShopMutat.Orders.name, response.orders)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - getOrders'
            }, {root: true})
        }
    },

    async checkReturn({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardShop Module - checkReturn')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const returnDetails = payload.check_details.map((item) => ({
                prod_amount: item.amount,
                prod_code: item.art_id,
            }))

            const response = await new MrewardShop().CheckReturn({
                branch_id: state.country.config.code,
                check_number: `return_${moment().format('x')}`,
                return_check_number: payload.check_number,
                return_datetime: moment().format('X'),
                return_details: JSON.stringify(returnDetails),
            }, {
                partnerKey: state.country.config.key,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - checkReturn'
            }, {root: true})
        }
    },

    async onlineRefund({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardShop Module - onlineRefund')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardShop().OnlineRefund({
                precheck_id: payload.precheck_id,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - onlineRefund'
            }, {root: true})
        }
    },

    async onlineStoreStatus({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardShop Module - onlineStoreStatus')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().OnlineStoreStatus({
                check_number: payload.check_number,
                precheck_id: payload.precheck_id,
                status: payload.status,
            }, {
                partnerKey: state.country.config.key,
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - onlineStoreStatus'
            }, {root: true})
        }
    },

    async listDeliveryAddress({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardShop Module - listDeliveryAddress')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().ListDeliveryAddress()

            commit(ShopMutat.Address.name, response.address)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response.address
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - listDeliveryAddress'
            }, {root: true})
        }
    },

    async removeDeliveryAddress({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardShop Module - removeDeliveryAddress')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().RemoveDeliveryAddress({
                id: payload.id
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardShop Module - removeDeliveryAddress'
            }, {root: true})
        }
    },

    clearProductsCategory({ commit, state, rootState }, payload) {
        console.log('STORE: MrewardShop Module - clearProductsCategory')
        commit(ShopMutat.ProductsCategory.name, {items: []})
    },
}

const getters = {
    products (state) {
        return state.products.filter(i => i.partner_id === state.country.config.id)
    },
    productsTop (state) {
        return state.productsTop.filter(i => i.partner_id === state.country.config.id)
    },
    productsGroups (state) {
        return state.productsGroups
    },
    cart (state) {
        if (state.country.code) {
            const key = state.country.code.toLowerCase()
            return state.cart[key]
        }

        return []
    },
    totalCartProduct (state) {
        if (state.country.code) {
            const key = state.country.code.toLowerCase()
            const list = state.cart[key]
            return list.reduce((acc, item) => {
                return acc + item.count
            }, 0)
        }
        return 0
    },
    productsFavorite (state) {
        return state.productsFavorite.filter(i => i.partner_id === state.country.config.id)
    },
    deliveryList (state) {
        return state.deliveryList
    },
    country (state) {
        return state.country
    },
    productSearch (state) {
        return state.productSearch
    },
    payData (state) {
        return state.payData
    },
    productSearchLoader (state) {
        return state.productSearchLoader
    },
    orders (state) {
        return state.orders
    },
    address (state) {
        return state.address
    },
    productsCategory (state) {
        return state.productsCategory
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
