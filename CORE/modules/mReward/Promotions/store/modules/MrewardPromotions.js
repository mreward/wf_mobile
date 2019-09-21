import constants from '_vuex_constants'
import MrewardPromotions from '../../libs/MrewardPromotions'
import moment from 'moment'
import validatePagination from '_CORE/modules/mReward/libs/ValidatePagination'
import sortByColumns from '_CORE/modules/mReward/libs/sortByColumns'

const {
    MrewardPromotions: {
        Mutations: PromotionsMutat
    }
} = constants

const state = {
    partnerPromotions: []
}

const mutations = {
    [PromotionsMutat.PartnerPromotions.name]: (state, data) => {
        if (data._meta.currentPage > 1) {
            state.partnerPromotions = state.partnerPromotions.concat(data.items)
        } else {
            state.partnerPromotions = [...data.items]
        }
    }
}

const actions = {
    /**
     * Get partner promotions
     * @param commit
     * @param payload
     * @param dispatch
     */
    async getPromotions({ commit, dispatch }, payload) {
        console.log('STORE: MrewardPromotions Module - getPromotions')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardPromotions().GetPromotions(payload)

            commit(PromotionsMutat.PartnerPromotions.name, response)

            validatePagination(response, constants.MrewardPromotions.Actions.getPromotions)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardPromotions Module - getPromotions'
            }, { root: true })
        }
    }
}

const formatPromotionPeriod = (dateFrom, dateTo) => {
    const fromMonth = moment(dateFrom, 'YYYY-MM-DD').month()
    const toMonth = moment(dateTo, 'YYYY-MM-DD').month()
    const from = moment(dateFrom, 'YYYY-MM-DD')
    const to = moment(dateTo, 'YYYY-MM-DD')

    if (dateFrom === dateTo) {
        return from.format('DD MMMM')
    }
    if (fromMonth === toMonth) {
        return `${from.format('DD')} - ${to.format('DD MMMM')}`
    }
    return `${from.format('DD MMM')} - ${to.format('DD MMM')}`
}

const getters = {
    partnerPromotionsSortedByColumns(state) {
        const sortedPartnerPromotions = sortByColumns(state.partnerPromotions)

        return sortedPartnerPromotions.map((item) => {
            return {
                img: item.img_path,
                title: item.title,
                data: formatPromotionPeriod(item.act_from, item.act_to),
                item
            }
        })
    },

    partnerPromotions(state) {
        return state.partnerPromotions.map((item) => {
            return {
                img: item.img_path,
                title: item.title,
                data: formatPromotionPeriod(item.act_from, item.act_to),
                item
            }
        })
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
