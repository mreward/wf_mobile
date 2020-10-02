import constants from '_vuex_constants'
import MrewardСakeDesigner from '../../libs/MrewardСakeDesigner'
// import MrewardСakeDesignerMock from '../../libs/MrewardСakeDesignerMock'

import moment from 'moment'
import { get, map, compact } from 'lodash'

const {
    MrewardСakeDesigner: {
        Mutations: ConstructMutat
    }
} = constants

const state = {
    agreement: {},
    fillings: [],
    decors: [],
    decorGallery: [],
    letterings: [],
    letteringGallery: [],
    deliveryPreset: {},
    order: {
        filling: {
            item: {}
        },
        decor: {
            item: {},
            gallery: null,
            custom: null
        },
        lettering: {
            item: {},
            gallery: null,
            custom: null
        }
    }
}

const mutations = {
    [ConstructMutat.Agreement.name]: (state, data) => {
        state.agreement = data
    },
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
    [ConstructMutat.DeliveryPreset.name]: (state, data) => {
        state.deliveryPreset = data
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
    async getAgreement({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - getAgreement')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardСakeDesigner().GetAgreement(payload)
            commit(ConstructMutat.Agreement.name, get(response, 'agreement.0', {}))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - getAgreement'
            }, {root: true})
        }
    },

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

    async getDeliveryPreset({ state, dispatch, commit }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - getDeliveryPreset')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const response = await new MrewardСakeDesigner().GetDeliveryPreset(payload)
            commit(ConstructMutat.DeliveryPreset.name, get(response, 'list.0.list.0', {}))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - getDeliveryPreset'
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

    /**
     * Upload decor image
     * @param commit
     * @param dispatch
     * @param payload
     */
    async uploadDecorImage({ commit, dispatch }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - uploadDecorImage')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardСakeDesigner().UploadDecorImage({
                imageURI: payload.imageURI,
                options: payload.options
            })

            commit(ConstructMutat.OrderDecor.name, {
                ...state.order.decor,
                gallery: null,
                custom: response
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - uploadDecorImage'
            }, { root: true })
        }
    },

    async order({ commit, state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - order')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const country = rootState.MrewardShop.country
            const phone = rootState.MrewardProfile.userProfile.mobile

            const decor = get(state.order, 'decor', {})
            const filling = get(state.order, 'filling', {})
            const lettering = get(state.order, 'lettering', {})

            const response = await new MrewardСakeDesigner().Order({
                decor_id: decor.item.id,
                filling_id: filling.item.id,
                ...(lettering.item.id ? {
                    lettering_id: lettering.item.id
                } : {}),
                ...(decor.gallery ? {
                    decor_gallery_id: decor.gallery.id
                } : {}),
                ...(decor.custom ? {
                    decor_image_id: decor.custom.id
                } : {}),
                ...(lettering.gallery ? {
                    lettering_gallery_id: lettering.gallery.id
                } : {}),
                ...(lettering.custom ? {
                    lettering: lettering.custom.text
                } : {}),
                partner_id: country.config.id,
                phone,
                ...payload
            })

            commit(ConstructMutat.LetteringGallery.name, get(response, 'items', []))

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - order'
            }, { root: true })
        }
    },

    async preCheck({ commit, state, dispatch, rootState }, payload) {
        console.log('STORE: MrewardСakeDesigner Module - preCheck')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })
            const country = rootState.MrewardShop.country
            const deliveryList = rootState.MrewardShop.deliveryList

            const phone = rootState.MrewardProfile.userProfile.mobile

            const list = [
                state.order.filling.item,
                state.order.decor.item,
                state.order.lettering.item
            ]

            const receiptDetails = map(list, (item, index) => {
                if (!item.art_id) {
                    return false
                }

                const count = item.count || 1
                const data = {
                    position: index + 1,
                    prod_code: item.art_id,
                    prod_price: item.price,
                    prod_amount: count,
                    prod_sum: item.price * count
                }

                if (payload.type === 'cash') {
                    data.bonus_restrict = '1'
                }
                return data
            })

            const delivery = get(deliveryList, '0', {})
            const deliveryReceiptDetails = {
                position: receiptDetails.length + 1,
                prod_code: delivery.art_id,
                prod_price: delivery.price,
                prod_amount: 1,
                prod_sum: delivery.price
            }
            if (payload.type === 'cash') {
                deliveryReceiptDetails.bonus_restrict = '1'
            }

            receiptDetails.push(deliveryReceiptDetails)

            const response = await new MrewardСakeDesigner().PreCheck({
                branch_id: country.config.code,
                is_online_store: 1,
                order_id: payload.order_id,
                construct_id: payload.order_id,
                phone,
                receipt_bonus_amount: payload.bonuses || 0,
                receipt_currency: `B${country.code}`,
                receipt_datetime: moment().format('X'),
                receipt_description: 'Заказ конструктора',
                receipt_details: JSON.stringify(compact(receiptDetails))
            }, {
                partnerKey: country.config.key
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response.pre_check
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardСakeDesigner Module - preCheck'
            }, { root: true })
        }
    }
}

const getters = {
    agreement(state) {
        return state.agreement
    },
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
    deliveryPreset(state) {
        return state.deliveryPreset
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
