import constants from '_vuex_constants'
import MrewardNotifications from '../../libs/MrewardNotifications'
import localforage from 'localforage'
import {DbObject} from '_CORE/store/db-objects'
import _isObject from 'lodash/isObject'

const {
    MrewardNotifications: {
        Mutations: NotificationsMutat,
        Actions: NotificationsAct
    }
} = constants

const state = {
    notificationsList: [],
    notificationsLoaded: false
}

const mutations = {
    [NotificationsMutat.Notifications.name]: (state, data) => {
        state.notificationsList = [ ...data ]
        state.notificationsLoaded = true
    },
    [NotificationsMutat.ReadNotifications.name](state, markedAsRead) {
        state.notificationsList = state.notificationsList.map(notification => (
            markedAsRead.indexOf(notification.id) === -1 ? notification : {
                ...notification,
                unread: false
            }
        ))
    }
}

const actions = {
    /**
     * Get Notifications
     * @param commit
     * @param dispatch
     * @param state
     * @param payload
     */
    async getNotifications({ commit, dispatch, state }, payload) {
        console.log('STORE: MrewardNotifications Module - getNotifications')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const { items: response } = await new MrewardNotifications().GetNotifications(payload)

            const processedList = await dispatch(NotificationsAct.processUnreadNotifications, response, { root: true })

            commit(NotificationsMutat.Notifications.name, processedList)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            state.notificationsLoaded = true
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardNotifications Module - getNotifications'
            }, { root: true })
        }
    },
    /**
     * Check if notifications where previously loaded in application
     * and sets `read` property accordingly.
     * Note, that for the first execution, all notifications will be saved with falsy `read` value
     * @param dispatch
     * @param list
     * @returns {Promise<{[p: string]: *}[]>}
     */
    async processUnreadNotifications({ dispatch }, list = []) {
        console.log('STORE: MrewardNotifications Module - processUnreadNotifications')
        try {
            const storedNotifications = await localforage.getItem(DbObject.keys.notificationsList.name)

            if (!_isObject(storedNotifications) || !_isObject(storedNotifications.data)) {
                const newList = list.map(notification => notification.id)

                const newListDocument = await new DbObject().GetDefaultObject(newList)

                await localforage.setItem(DbObject.keys.notificationsList.name, newListDocument)

                return list.map(notification => ({
                    ...notification,
                    unread: false
                }))
            }

            const storedNotificationsIds = storedNotifications.data

            return list.map(notification => ({
                ...notification,
                unread: storedNotificationsIds.indexOf(notification.id) === -1
            }))
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardNotifications Module - processUnreadNotifications'
            }, { root: true })
        }
    },
    /**
     * Save notification in local DB and store as `read` by provided `id`
     * @param commit
     * @param dispatch
     * @param notifications
     * @returns {Promise<void>}
     */
    async markNotificationsAsRead({ commit, dispatch }, notifications = []) {
        console.log('STORE: MrewardNotifications Module - markNotificationsAsRead')

        const listToUpdate = notifications.map(notification => notification.id)
        try {
            const storedNotifications = await localforage.getItem(DbObject.keys.notificationsList.name)

            if (_isObject(storedNotifications) && _isObject(storedNotifications.data)) {
                const newList = [...storedNotifications.data, ...listToUpdate]

                const newListDocument = await new DbObject().GetDefaultObject(newList)

                await localforage.setItem(DbObject.keys.notificationsList.name, newListDocument)
            }

            commit(NotificationsMutat.ReadNotifications.name, listToUpdate)
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardNotifications Module - markNotificationsAsRead'
            }, { root: true })
        }
    }
}

const getters = {
    notificationsList(state) {
        return state.notificationsList
    },
    notificationsLoaded(state) {
        return state.notificationsLoaded
    },
    notificationsUnread(state) {
        return state.notificationsList.filter(notification => notification.unread)
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
