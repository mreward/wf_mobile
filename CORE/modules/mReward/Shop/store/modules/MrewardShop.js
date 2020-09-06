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

}

const mutations = {
    [ShopMutat.Products.name]: (state, data) => {
        state.products = data
    },
    [ShopMutat.ProductsTop.name]: (state, data) => {
        state.productsTop = data
    },
    [ShopMutat.ProductsGroups.name]: (state, data) => {
        state.productsGroups = data
    },
    [ShopMutat.Cart.name]: (state, data) => {
        const key = state.country.code.toLowerCase()
        state.cart[key] = data
    },
    [ShopMutat.ProductsFavorite.name]: (state, data) => {
        state.productsFavorite = data
    },
    [ShopMutat.DeliveryList.name]: (state, data) => {
        state.deliveryList = data
    },
    [ShopMutat.Country.name]: (state, data) => {
        state.country = data
    },
    [ShopMutat.ProductSearch.name]: (state, data) => {
        state.productSearch = data
    },
    [ShopMutat.PayData.name]: (state, data) => {
        state.payData = data
    },
    [ShopMutat.ProductSearchLoader.name]: (state, data) => {
        state.productSearchLoader = data
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

            const response = await new MrewardShop().GetProductsTop(payload)

            commit(ShopMutat.ProductsTop.name, response.items)

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

            const activeItems = response.items
            .filter(item => item.view_is_online)
            const items = sortBy(activeItems, 'parent_id')
            const list = []

            items.forEach((item) => {
                if (item.parent_id === 0) {
                    list.push({
                        ...item,
                        child: [],
                    })
                } else {
                    const parent = list.find(el => el.group_id === item.parent_id)
                    if(parent) {
                        parent.child.push(item);
                    } else {
                        list.push({
                            ...item,
                            child: [],
                        })
                    }
                }
            })


            commit(ShopMutat.ProductsGroups.name, list)

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
            commit(ShopMutat.ProductsFavorite.name, response.items)
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

            const receiptDetails = list.map((item) => {
                return {
                    position: item.id,
                    prod_code: item.data.art_id,
                    prod_price: item.data.product_price,
                    prod_amount: item.count,
                    prod_sum: item.data.product_price * item.count,
                }
            })

            const response = await new MrewardShop().PreCheck({
                branch_id: state.country.config.code,
                is_online_store: 1,
                phone: rootState.MrewardProfile.userProfile.mobile,
                receipt_bonus_amount: 0,
                receipt_currency: 'BKG',
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
            if (profile && profile.country) {
                const country = rootState.MrewardGeo.countries.find(i => i.country_id === profile.country)
                if (country) {
                    dispatch(constants.MrewardShop.Actions.selectCountry, country, { root: true })
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

            commit(ShopMutat.ProductSearch.name, [])
            commit(ShopMutat.ProductSearchLoader.name, true)

            const response = await new MrewardShop().ProductSearch({
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

            commit(ShopMutat.ProductSearch.name, list)
            commit(ShopMutat.ProductSearchLoader.name, false)

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
        commit(ShopMutat.ProductSearch.name, [])
    },

    async getProductsCategory({ commit, state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardShop Module - getProductsCategory')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardShop().GetProductsCategory({
                group_id: payload.group_id
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

}

const getters = {
    products(state) {
        return state.products;
    },
    productsTop(state) {
        return state.productsTop;
    },
    productsGroups(state) {
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
    productsFavorite(state) {
        return state.productsFavorite
    },
    deliveryList(state) {
        return state.deliveryList
    },
    country(state) {
        return state.country
    },
    productSearch(state) {
        return state.productSearch
    },
    payData(state) {
        return state.payData
    },
    productSearchLoader(state) {
        return state.productSearchLoader
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
