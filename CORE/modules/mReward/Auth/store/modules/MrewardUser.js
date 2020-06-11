import constants from '_vuex_constants'
import MrewardAuth from '../../libs/MrewardAuth'
import localforage from 'localforage'
import { DbObject } from '_CORE/store/db-objects'
import MaskPhone from '_CORE/plugins/common/MaskPhone'
import { clearCache } from '_CORE/utils/axios-cache-instance'

const {
    MrewardUser: {
        Mutations: UserMutat,
        Actions: UserAct
    }
} = constants

const state = {
    userData: {},
    authToken: ''
}

const mutations = {
    [UserMutat.AuthToken.name]: (state, authToken) => {
        state.authToken = authToken
    },
    [UserMutat.UserData.name]: (state, data) => {
        state.userData = { ...data }
    }
}

const actions = {
    // /**
    //  * get profile data from DB
    //  * @param rootState
    //  * @param commit
    //  * @param dispatch
    //  * @returns {Promise}
    //  */
    // async getUserData({ rootState, commit, dispatch }) {
    //     console.log('STORE: User Module - getUserData')
    //     try {
    //         const user = await localforage.getItem(DbObject.keys.mReward.user.name)
    //         if (user) {
    //             commit(UserMutat.UserData.name, user.data)
    //         }
    //     } catch (error) {
    //         await dispatch(constants.App.Actions.validateError, {
    //             error,
    //             log: 'STORE: User Module - getUserData'
    //         }, { root: true })
    //     }
    // },
    //
    /**
     * Save auth token to DB and set to state/ApiClient config
     * @param commit
     * @param dispatch
     * @param payload
     */
    async setAuthToken({ commit, dispatch }, payload) {
        console.log('STORE: User Module - setAuthToken', payload)
        try {
            if (payload) {
                MrewardAuth.setAuthToken(payload)
                commit(UserMutat.AuthToken.name, payload)
                const authToken = await localforage.setItem(DbObject.keys.mReward.authToken.name, payload)
                console.log(`SUCCESS save authToken: ${authToken}`)
            }
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: User Module - setAuthToken'
            }, { root: true })
        }
    },

    /**
     * Load auth token from db and set to state/ApiClient config
     * @param commit
     * @param dispatch
     * @returns {Promise.<T>}
     */
    async getAuthToken({ commit, dispatch }) {
        console.log('STORE: User Module - getAuthToken')
        try {
            const authToken = await localforage.getItem(DbObject.keys.mReward.authToken.name)
            if (authToken) {
                MrewardAuth.setAuthToken(authToken)
                commit(UserMutat.AuthToken.name, authToken)
                console.log(`SUCCESS load authToken: ${authToken}`)
            }
            return authToken
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: User Module - getAuthToken'
            }, { root: true })
        }
    },

    /**
     * Authenticate user with mobile number and password
     * @param rootState
     * @param commit
     * @param dispatch
     * @param payload.mobileNumber
     * @param payload.password
     * @returns {Promise}
     */
    async authenticateUser({ commit, dispatch }, payload) {
        console.log('STORE: MrewardUser Module - authenticateUser')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardAuth().AuthenticateUser({
                clearMobileNumber: MaskPhone.GetClearMobile(payload.mobileNumber),
                password: payload.password
            })

            await dispatch(UserAct.setAuthToken, response.token, { root: true })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: User-mReward Module - authenticateUser'
            }, { root: true })
        }
    },

    /**
     * Recovery password action
     * @param rootState
     * @param commit
     * @param dispatch
     * @param payload.mobileNumber
     * @param payload.password
     * @returns {Promise}
     */
    async changePassword({ commit, dispatch }, payload) {
        console.log('STORE: MrewardUser Module - changePassword')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardAuth().ChangePassword({
                clearMobileNumber: MaskPhone.GetClearMobile(payload.mobileNumber),
                password: payload.password
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: User-mReward Module - changePassword'
            }, { root: true })
        }
    },

    /**
     * Change password confirm with sms
     * @param dispatch
     * @param payload
     * @param payload.smsCode
     * @param payload.smsId
     * @returns {Promise}
     */
    async changePasswordConfirm({ dispatch }, payload) {
        console.log('STORE: MrewardUser Module - changePasswordConfirm')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardAuth().ChangePasswordConfirm({
                smsCode: payload.smsCode,
                smsId: payload.smsId
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: User-mReward Module - changePasswordConfirm'
            }, { root: true })
        }
    },

    /**
     * registration User
     * @param dispatch
     * @param payload
     * @param payload.address
     * @param payload.dateBirthday
     * @param payload.email
     * @param payload.emailNotify
     * @param payload.firstName
     * @param payload.gender
     * @param payload.cityId
     * @param payload.lastName
     * @param payload.middleName
     * @param payload.password
     * @param payload.mobileNumber
     * @param payload.smsNotify
     * @returns {Promise}
     */
    async registrationUser({ dispatch }, payload) {
        console.log('STORE: MrewardUser Module - registrationUser')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardAuth().RegistrationUser({
                ...payload
            })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: User-mReward Module - registrationUser'
            }, { root: true })
        }
    },

    /**
     * Registration confirm with sms
     * @param dispatch
     * @param payload
     * @param payload.smsCode
     * @param payload.smsId
     * @returns {Promise}
     */
    async registrationUserConfirm({ dispatch }, payload) {
        console.log('STORE: MrewardUser Module - registrationUserConfirm')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardAuth().RegistrationUserConfirm({
                smsCode: payload.smsCode,
                smsId: payload.smsId
            })

            await dispatch(UserAct.setAuthToken, response.token, { root: true })

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: User-mReward Module - registrationUserConfirm'
            }, { root: true })
        }
    },

    /**
     * logout User
     * @returns {Promise}
     */
    async logoutUser() {
        console.log('STORE: MrewardUser Module - logoutUser')
        try {
            await clearCache()
            await localforage.clear()
            if (window.FirebasePlugin) {
                window.FirebasePlugin.unregister(() => {
                    window.location.reload(true)
                })
            } else {
                window.location.reload(true)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },
}

const getters = {
    userData(state) {
        return state.userData
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
