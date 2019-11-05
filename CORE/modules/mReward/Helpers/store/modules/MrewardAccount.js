import constants from '_vuex_constants'
import MrewardAccount from '../../libs/MrewardAccount'
import localforage from 'localforage'
import {DbObject} from '_CORE/store/db-objects'

const formatBalance = (balance) => {
    const arrBalance = balance.replace('.', ',').split(',')
    return {
        amount: arrBalance[0]
    }
}
const removeBon = (accounts) => {
    return accounts.filter(item => item.currency !== 'BON').map(item => ({
        ...item,
        ...formatBalance(item.balance)
    }))
}
const state = {
    balance: {},
    accounts: [],
    selectedAccount: {}
}

const mutations = {
    [constants.MrewardAccount.Mutations.Balance.name]: (state, data) => {
        state.balance = data
    },
    [constants.MrewardAccount.Mutations.Accounts.name]: (state, data) => {
        state.accounts = [...data]
    },
    [constants.MrewardAccount.Mutations.SelectedAccount.name]: (state, data) => {
        state.selectedAccount = { ...data }
    }
}

const actions = {
    /**
     * Get info
     * @param commit
     * @param dispatch
     */
    async getBalance({ commit, dispatch }, payload = {}) {
        console.log('STORE: MrewardAccount Module - getInfo')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardAccount().GetBalance({...payload})
            commit(constants.MrewardAccount.Mutations.Balance.name, response)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardAccount Module - getInfo'
            }, { root: true })
        }
    },

    /**
     * Get accounts info
     * @param commit
     * @param dispatch
     */
    async getAccounts({ commit, dispatch }, payload = {}) {
        console.log('STORE: MrewardAccount Module - getInfo')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const { accounts } = await new MrewardAccount().GetAccounts({...payload})

            const formattedAccounts = removeBon(accounts)
            commit(constants.MrewardAccount.Mutations.Accounts.name, formattedAccounts)
            if (formattedAccounts.length === 1) {
                dispatch(constants.MrewardAccount.Actions.saveSelectedAccount, formattedAccounts[0], { root: true })
            }
            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return accounts
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardAccount Module - getInfo'
            }, { root: true })
        }
    },
    async saveSelectedAccount({ state, commit, dispatch }, payload) {
        console.log('STORE: STORE: MrewardAccount Module - saveSelectedAccount')
        try {
            commit(constants.MrewardAccount.Mutations.SelectedAccount.name, payload)
            localforage.setItem(DbObject.keys.mReward.selectedAccount.name, payload)
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardAccount Module - saveSelectedAccount'
            }, { root: true })
        }
    },
    async getSelectedAccount({ commit, dispatch }) {
        console.log('STORE: STORE: MrewardAccount Module - getSelectedAccount')
        try {
            const account = await localforage.getItem(DbObject.keys.mReward.selectedAccount.name)
            commit(constants.MrewardAccount.Mutations.SelectedAccount.name, account)
            return account
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardAccount Module - getSelectedAccount'
            }, { root: true })
        }
    }
}

const getters = {
    balance(state) {
        return state.balances
    },
    accounts(state) {
        return state.accounts
    },
    selectedAccount(state) {
        return state.selectedAccount
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
