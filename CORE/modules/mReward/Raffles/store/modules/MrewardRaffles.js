import constants from '_vuex_constants'
import _map from 'lodash/map'
import MrewardRaffles from '../../libs/MrewardRaffles'
import formatDatePeriod from '_CORE/modules/mReward/libs/formatDatePeriod'
import moment from 'moment'
import _keys from 'lodash/keys'
import _forEach from 'lodash/forEach'

const {
    MrewardRaffles: {
        Mutations: RafflesMutat
    }
} = constants

const state = {
    raffles: {}
}

const mutations = {
    [RafflesMutat.Raffles.name]: (state, data) => {
        state.raffles = { ...data.raffles }

        const rafflesIds = _keys(state.raffles)
        // TODO сказать чтоб это на беке сделали и в нормальном формате сразу отдавали данные
        // TODO или оптимизировать
        // записываем фишки к соответствующим розыгрышам
        _forEach(data.dibs, (itemDib) => {
            _forEach(rafflesIds, (itemRaffleId) => {
                if (itemDib.generator_id.toString() === itemRaffleId) {
                    if (!state.raffles[itemRaffleId].dibs) {
                        state.raffles[itemRaffleId].dibs = []
                    }
                    state.raffles[itemRaffleId].dibs.push(itemDib)
                }
            })
        })
    }
}

const actions = {
    /**
     * Get raffles
     * @param commit
     * @param payload
     * @param dispatch
     */
    async getRaffles({ commit, dispatch }, payload) {
        console.log('STORE: MrewardRaffles Module - getRaffles')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const { generators: raffles = {}, dibs = [] } = await new MrewardRaffles().GetRaffles(payload)

            commit(RafflesMutat.Raffles.name, {
                raffles,
                dibs
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return raffles
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardRaffles Module - getRaffles'
            }, { root: true })
        }
    }
}

const getters = {
    dashboardRaffles(state) {
        const dashboardRaffles = formatRaffleObject(state.raffles)

        return dashboardRaffles.slice(0, 2)
    },
    allRaffles(state) {
        return formatRaffleObject(state.raffles)
    }
}

const formatRaffleObject = (rafflesList) => {
    return _map(rafflesList, (value, key) => {
        return {
            name: value.name,
            description: value.description,
            datePeriod: formatDatePeriod(value.date_from, value.date_to),
            expiredDate: moment(value.expired_date).format('DD MMMM'),
            generatorId: key,
            count: value.count,
            dibsForNext: value.for_next,
            amount: value.amount,
            currency: getCurrency(value.partner_id),
            dibs: value.dibs || [],
            images: {
                mobile: value.image_url_420
            }
        }
    })
}

const getCurrency = (partnerId) => {
    switch (partnerId) {
        case 1:
            return 'SOM'
        case 2:
            return 'KZT'
        case 3:
            return 'RUB'
        default:
            return ''
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
