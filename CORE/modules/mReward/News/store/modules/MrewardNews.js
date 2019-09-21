import constants from '_vuex_constants'
import MrewardNews from '../../libs/MrewardNews'
import validatePagination from '../../../libs/ValidatePagination'
import moment from 'moment'
import sortByColumns from '_CORE/modules/mReward/libs/sortByColumns'

const {
    MrewardNews: {
        Mutations: NewsMutat
    }
} = constants

const state = {
    partnerNews: []
}

const mutations = {
    [NewsMutat.PartnerNews.name]: (state, data) => {
        if (data._meta.currentPage > 1) {
            state.partnerNews = state.partnerNews.concat(data.items)
        } else {
            state.partnerNews = [...data.items]
        }
    }
}

const actions = {
    /**
     * Get partner news
     * @param commit
     * @param payload
     * @param dispatch
     */
    async getNews({ commit, dispatch }, payload) {
        console.log('STORE: MrewardNews Module - getNews')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardNews().GetNews(payload)

            commit(NewsMutat.PartnerNews.name, response)

            validatePagination(response, constants.MrewardNews.Actions.getNews)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardNews Module - getNews'
            }, { root: true })
        }
    }
}

const getters = {
    partnerNewsSortedByColumns(state) {
        const sortedPartnerNews = sortByColumns(state.partnerNews)

        return sortedPartnerNews.map((item) => {
            return {
                img: item.img_path,
                title: item.name,
                data: moment(item.date, 'X').format('DD MMMM, YYYY'),
                item
            }
        })
    },

    partnerNews(state) {
        return state.partnerNews.map((item) => {
            return {
                img: item.img_path,
                title: item.name,
                data: moment(item.date, 'X').format('DD MMMM, YYYY'),
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
