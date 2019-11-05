import constants from '_vuex_constants'
import MrewardHistory from '../../libs/MrewardHistory'
import moment from 'moment'

const formatHistoryList = (list) => {
    return list.map((purchase) => {
        const formatData = {
            dateX: '', // transaction timestamp
            date: '', // transaction date
            name: '', // shop name
            address: '', // shop address
            sumTotal: '', // transaction sum
            sumMoney: '', // paid by money
            debitedBonuses: '', // paid by bonuses
            accruedBonuses: '', // accrued new bonuses
            products: [],
            fishka: purchase.fishka || []
        }
        purchase.transactions.forEach((transaction, index) => {
            const {
                pay_date: date,
                shop_name: name,
                shop_address: address,
                pay_bonus: bonus,
                pay_sum: sumMoney,
                pay_type: type,
                check_positions: products
            } = transaction

            if (index === 0) {
                formatData.dateX = date
                formatData.date = moment(date, 'X').format('DD MMMM, HH:mm')
                formatData.name = name
                formatData.address = address
            }

            if (type === 1) {
                formatData.sumMoney = sumMoney.toFixed(0)
                formatData.accruedBonuses = bonus.toFixed(0)

                if (!formatData.products.length) {
                    formatData.products = products.map(formatProducts)
                }

                if (!formatData.sumTotal) {
                    formatData.sumTotal = sumMoney.toFixed(0)
                }
            } else if (type === 2) {
                formatData.sumTotal = sumMoney.toFixed(0)
                formatData.debitedBonuses = bonus.toFixed(0)

                formatData.products = products.map(formatProducts)
            }
        })
        return formatData
    })
}

const formatProducts = (product) => {
    const {
        product_amount: amount,
        product_name: name,
        product_price: price,
        product_sum: sum
    } = product

    return {
        amount,
        name,
        price: price.toFixed(0),
        sum: sum.toFixed(0)
    }
}

const {
    MrewardHistory: {
        Mutations: HistoryMutat
    }
} = constants

const state = {
    history: []
}

const mutations = {
    [HistoryMutat.History.name]: (state, data) => {
        state.history = formatHistoryList(data)
    }
}

const actions = {
    /**
     * Get history
     * @param commit
     * @param dispatch
     * @param payload
     */
    async getHistory({ commit, dispatch }, payload) {
        console.log('STORE: MrewardHistory Module - getHistory')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardHistory().GetHistory(payload)

            commit(HistoryMutat.History.name, response.purchases)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardHistory Module - getHistory'
            }, { root: true })
        }
    }
}

const getters = {
    history(state) {
        return state.history
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
