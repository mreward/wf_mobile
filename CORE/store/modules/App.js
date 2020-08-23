import constants from '_vuex_constants'
import CommonClient from '_commonClient'
import localforage from 'localforage'
import moment from 'moment'
import Analytics from '_CORE/plugins/common/Analytics'
import { getMessage } from '_CORE/store/utils/mapErrorLocale.js'
import _isObject from 'lodash/isObject'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import _isFunction from 'lodash/isFunction'
import _isEqual from 'lodash/isEqual'
import Vue from 'vue'
import { box } from 'tweetnacl'
import { decodeBase64, decodeUTF8, encodeBase64 } from 'tweetnacl-util'
import { DbObject } from '../db-objects.js'
import { __processingBlockedUser } from '_CORE/store/utils/userIsBlocked'
import getUDID from '_PLUGINS/common/getUDID'

const ImageCache = localforage.createInstance({
    name: 'ImageCache'
})

const Logs = localforage.createInstance({
    name: 'Logs'
})

const {
    App: {
        Actions: AppAct,
        Mutations: AppMutat
    }
} = constants

// хранение последней открытой страницы
let beforeUpdateHookLast = {}

export const state = {
    //  счетчик вызовов loader
    countLoader: 0,
    navigator: [],
    error: {
        code: '',
        message: ''
    },
    imageCache: [],
    navigatorAnimation: 'slide',
    logs: [],
    settings: {},
    language: '',
    deviceInfo: {}
}

export const mutations = {
    [AppMutat.Loader]: (state, count) => {
        state.countLoader = count
    },
    [AppMutat.Error]: (state, data) => {
        state.error = { ...data }
    },
    [AppMutat.ResetNavigator]: (state, payload) => {
        state.navigator = Array.isArray(payload) ? payload : [payload || state.navigator[0]]
    },
    [AppMutat.PushPage]: (state, data) => {
        // Animation name. Available animations are
        // "slide", "lift", "fade" and "none". These are platform based animations.
        // For fixed animations, add "-ios" or "-md" suffix to the animation name. E.g.
        // "lift-ios", "lift-md". Defaults values are "slide-ios" and "fade-md" depending on the platform.

        if (data.options) {
            state.navigatorAnimation = data.options.animation
            delete data.options
        } else {
            state.navigatorAnimation = 'slide'
        }

        state.navigator.push(data)
    },
    [AppMutat.PopPage]: (state, data) => {
        if (data && data.options) {
            state.navigatorAnimation = data.options.animation
            delete data.options
        } else {
            state.navigatorAnimation = 'slide'
        }

        if (state.navigator.length > 1) {
            state.navigator.pop()
        }
    },
    [AppMutat.PopToPage]: (state, data) => {
        if (data && data.options) {
            state.navigatorAnimation = data.options.animation
            delete data.options
        } else {
            state.navigatorAnimation = 'slide'
        }

        let namePage = ''
        if (typeof data === 'string') {
            namePage = data
        } else {
            namePage = data.name
        }

        const index = state.navigator.findIndex((page) => {
            if (!page.name && page.extends.name === namePage) {
                return true
            }

            return page.name === namePage
        })
        if (index >= 0) {
            state.navigator = state.navigator.slice(0, index + 1)
        } else {
            state.navigator = state.navigator.slice(0, 1)
        }
    },
    [AppMutat.ReplacePage]: (state, payload) => {
        if (payload.options) {
            state.navigatorAnimation = payload.options.animation
            delete payload.options
        } else {
            state.navigatorAnimation = 'slide'
        }

        state.navigator = [payload]
    },
    [AppMutat.RemovePage]: (state, data) => {
        let index
        if (typeof data === 'number') {
            index = data
        } else {
            let namePage = ''
            if (typeof data === 'string') {
                namePage = data
            } else {
                namePage = data.name
            }

            index = state.navigator.findIndex((page) => {
                if (!page.name && page.extends.name === namePage) {
                    return true
                }

                return page.name === namePage
            })
        }

        state.navigator.splice(index, 1)
    },
    [AppMutat.AddImageCache]: (state, data) => {
        state.imageCache.push(data)
    },
    [AppMutat.ImageCache]: (state, list) => {
        state.imageCache = list
    },
    [AppMutat.AddLog]: () => {
        // if (Array.isArray(item)) {
        //     state.logs = item;
        // } else {
        //     state.logs.push(item);
        // }
    },
    [AppMutat.Settings.name]: (state, settings) => {
        let addSettings = {}
        if (window.device) {
            addSettings = {
                uuid: getUDID(settings.nameApp),
                os: window.device.platform.toLowerCase()
            }
        }

        if (state.language) {
            state.settings.lang = state.language
        }

        state.settings = {
            ..._merge(state.settings, settings),
            ...addSettings
        }

        moment.locale(state.settings.lang)
    },
    [AppMutat.Language]: (state, payload) => {
        state.language = payload
        moment.locale(state.language)
    },

    [AppMutat.DeviceInfo.name]: (state, payload) => {
        state.deviceInfo = payload
    }
}

export const actions = {
    addCountLoader({ commit, state }) {
        console.log('STORE: App Module - addCountLoader')
        setTimeout(() => {
            commit(AppMutat.Loader, state.countLoader + 1)
        }, 600)
    },
    removeCountLoader({ commit, state }) {
        console.log('STORE: App Module - removeCountLoader')
        setTimeout(() => {
            if (state.countLoader > 0) {
                commit(AppMutat.Loader, state.countLoader - 1)
            }
        }, 600)
    },
    setError({ commit }, payload) {
        console.log('STORE: App Module - setError', payload)
        commit(AppMutat.Error, payload)
    },
    resetNavigator({ commit }, payload) {
        console.log('STORE: App Module - resetNavigator', payload)
        commit(AppMutat.ResetNavigator, payload)
    },
    async beforeUpdateHook({ commit, dispatch }, payload = {}) {
        console.log('STORE: App Module - beforeUpdateHook', payload)

        let component = payload
        let params = {}
        let _asyncData = {}
        let _data = {}

        if (!payload.extends) {
            component = {
                extends: payload
            }
        }

        console.warn(component)
        if (_isFunction(component.extends)) {
            const _component = await component.extends()
            component.extends = _component.default
        }

        if (payload.extends) {
            if (payload.data && component.extends.fetch) {
                _data = payload.data()
                delete payload.data
            }
            if (payload.params) {
                params = payload.params
                delete payload.params
            }
        }

        const { name, fetch = null } = component.extends

        if (beforeUpdateHookLast.promise &&
            beforeUpdateHookLast.name === name &&
            _isEqual(params, beforeUpdateHookLast.params)) {
            return beforeUpdateHookLast.promise
        }

        const promise = new Promise(async (resolve, reject) => {
            try {
                beforeUpdateHookLast = {
                    name,
                    params
                }

                const context = { dispatch, params }

                if (_isFunction(fetch)) {
                    console.log('STORE: App Module - beforeUpdateHook:fetch')
                    try {
                        _asyncData = await fetch(context)
                        component.data = () => ({ ..._data, ..._asyncData })
                    } catch (error) {
                        if (Vue.prototype.$Alert) {
                            Vue.prototype.$Alert.Error(error)
                        } else {
                            console.error(error)
                        }

                        reject(error)
                        return
                    }
                }

                if (beforeUpdateHookLast.name === name && _isEqual(params, beforeUpdateHookLast.params)) {
                    Analytics.TrackPage(name)
                    commit(payload.mutation, component)
                }
                beforeUpdateHookLast.promise = null
                resolve()
            } catch (e) {
                reject(e)
            }
        })

        if (_isFunction(fetch)) {
            beforeUpdateHookLast.promise = promise
        }

        return promise
    },
    async pushPage({ dispatch }, payload = {}) {
        console.log('STORE: App Module - pushPage', payload)
        let obj = {}
        if (_isObject(payload) && !payload.extends) {
            obj.extends = payload
        } else {
            obj = payload
        }
        await dispatch('beforeUpdateHook', { ...obj, mutation: AppMutat.PushPage })
    },
    popPage({ commit }, payload) {
        console.log('STORE: App Module - popPage', payload)
        beforeUpdateHookLast = {}
        commit(AppMutat.PopPage, payload)
    },
    popToPage({ commit }, payload) {
        console.log('STORE: App Module - popToPage', payload)
        beforeUpdateHookLast = {}
        commit(AppMutat.PopToPage, payload)
    },
    async replacePage({ dispatch }, payload = {}) {
        console.log('STORE: App Module - replacePage', payload)
        let obj = {}
        if (!_isObject(payload) || !payload.extends) {
            obj.extends = payload
        } else {
            obj = payload
        }
        await dispatch('beforeUpdateHook', { ...obj, mutation: AppMutat.ReplacePage })
    },
    removePage({ commit }, payload = {}) {
        console.log('STORE: App Module - removePage')
        commit(AppMutat.RemovePage, payload)
    },

    async startApplication({ dispatch }) {
        console.log('STORE: App Module - startApplication')
        // dispatch(AppAct.getAllImageFromCache, null, { root: true });
        dispatch(AppAct.validateLogs, null, { root: true })
        dispatch(AppAct.getInfoDevice, null, { root: true })
    },

    async getAndSaveDB({ commit, dispatch }, payload = {}) {
        console.log('STORE: App Module - getAndSaveDB', payload)

        if (payload.loader !== false) {
            dispatch(AppAct.addCountLoader, {}, { root: true })
        }
        let list = []
        const isOffline = 'onLine' in navigator && !navigator.onLine
        if (!isOffline) {
            if ((Array.isArray(payload.state) && payload.state.length === 0) || payload.isUpdate) {
                list = await payload.get()
                // сохраняем в БД
                const listObject = new DbObject().GetDefaultObject(list)
                await localforage.setItem(payload.dbKeys.name, listObject)
            } else if (!Array.isArray(payload.state) && !payload.isUpdate) {
                list = await payload.get()
            } else {
                list = payload.state
            }
        } else {
            const dbData = await localforage.getItem(payload.dbKeys.name)

            // Case when user is offline and cache is missing
            if (!dbData || payload.isUpdate) {
                if (payload.loader !== false) {
                    dispatch(AppAct.removeCountLoader, {}, { root: true })
                }
                throw new Error('No internet connection')
            }

            // TODO handle case when not saved data
            if (DbObject.ValidateTimeCreate(dbData, payload.dbKeys)) {
                list = dbData.data
            }
        }
        if (payload.loader !== false) {
            dispatch(AppAct.removeCountLoader, {}, { root: true })
        }
        if (payload.mutation) {
            commit(payload.mutation, list, { root: true })
        }
        return list
    },

    async getFromDbOrLoad({ commit, dispatch }, payload) {
        console.log('STORE: App Module - getFromDbOrLoad', payload)
        dispatch(AppAct.addCountLoader, {}, { root: true })
        let list = []
        const objectDb = await localforage.getItem(payload.dbKeys.name)
        if (DbObject.ValidateTimeCreate(objectDb, payload.dbKeys)) {
            commit(payload.mutation, objectDb.data, { root: true })
            list = objectDb.data
        } else {
            payload.isUpdate = true
        }

        if (payload.isUpdate) {
            const isOffline = 'onLine' in navigator && !navigator.onLine
            if (isOffline) {
                dispatch(AppAct.removeCountLoader, {}, { root: true })
                throw new Error('No internet connection')
            } else {
                list = await payload.get()
                // сохраняем в БД
                const listObject = new DbObject().GetDefaultObject(list)
                await localforage.setItem(payload.dbKeys.name, listObject)
            }

            commit(payload.mutation, list, { root: true })
        }

        dispatch(AppAct.removeCountLoader, {}, { root: true })
        return list
    },

    async getData({ dispatch }, payload) {
        console.log('STORE: App Module - getData', payload)

        const isOffline = 'onLine' in navigator && !navigator.onLine
        if (isOffline) {
            throw new Error('No internet connection')
        }
        dispatch(AppAct.addCountLoader, {}, { root: true })

        const data = await payload.get()
        dispatch(AppAct.removeCountLoader, {}, { root: true })
        return data
    },

    /**
     * Загрузка кэша изображений в state
     * @returns {Promise.<void>}
     */
    async getAllImageFromCache({ commit, state }) {
        console.log('STORE: App Module - getAllImageFromCache')
        if (state.imageCache.length === 0) {
            // загружаем с кэша все картинки
            const keys = await ImageCache.keys()
            const imagesFromCachePromises = keys.map(item => ImageCache.getItem(item))
            const imagesAll = await Promise.all(imagesFromCachePromises)

            // фильруем и строим новый список
            const imagesActual = []
            imagesAll.forEach((item) => {
                if (DbObject.ValidateTimeCreate(item, DbObject.keys.imageCache)) {
                    imagesActual.push(item.data)
                } else {
                    ImageCache.removeItem(window.btoa(item.data.url))
                }
            })

            commit(AppMutat.ImageCache, imagesActual)
        }
    },

    /**
     * Получаем картинку с кэша
     * если картинки в кэше нету тогда возвращаем урл картинки
     * и загружаем картинку в кеш
     * @param url
     * @returns {*}
     */
    getImage({ dispatch, state }, payload) {
        console.log('STORE: App Module - getImage', payload)
        let imgFromCache = null
        state.imageCache.forEach((item) => {
            if (payload === item.payload) {
                imgFromCache = item.data
            }
        })
        if (imgFromCache) {
            return imgFromCache
        }
        dispatch(AppAct.loadImageToCache, payload, { root: true })
        return payload
    },

    /**
     * Загрузка изображени и сохранение в кэш
     *
     * после загрузки картинки
     * конвертируем ее в base64
     * добавляем в state и сохраняем в БД
     * key = url -> base64
     * @param url
     */
    loadImageToCache({ commit }, payload) {
        console.log('STORE: App Module - loadImageToCache', payload)
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)

            const item = {
                url: img.src,
                data: canvas.toDataURL('image/png')
            }

            commit(AppMutat.AddImageCache, item)
            ImageCache.setItem(window.btoa(item.url), new DbObject().GetDefaultObject(item))
        }
        img.src = payload
    },

    async sendFeedbackLog({ dispatch, state, rootState }) {
        console.log('STORE: App Module - sendFeedbackLog')
        try {
            const data = await dispatch(AppAct.getData, {
                get: async () => {
                    // Заполняем масив логов
                    const keys = await Logs.keys()
                    const getLogsPromises = keys.map(item => Logs.getItem(item))
                    const logsAll = await Promise.all(getLogsPromises)

                    // фильруем и строим новый список
                    let logs = []
                    logsAll.forEach((item) => {
                        logs.push({
                            time: item.date_create,
                            displayTime: moment(item.date_create, 'x').format('DD.MM.YYYY hh:mm:ss'),
                            string: `${item.data.level} ${item.data.text}`,
                            data: item.data.args
                        })
                    })

                    // Готовим обьект с данными об пользователе и устройстве
                    let userInfo = {}
                    if (rootState.User) {
                        userInfo = rootState.User.user.profile
                    }
                    const json = {
                        email: userInfo.email || '',
                        name: `${userInfo.fname || ''} ${userInfo.lname || ''} ${userInfo.mobile}`,
                        os_version: window.device ? `${window.device.platform} ${window.device.version}` : 'DEBUG',
                        model: window.device ? window.device.model : 'DEBUG',
                        oem: window.device ? window.device.manufacturer : 'DEBUG',
                        subject: `${userInfo.fname || ''} ${userInfo.lname ||
                        ''} version:${rootState.App.settings.versionCode}`,
                        lang: state.settings.lang,
                        hockeyAppID: state.settings.hockeyAppID,
                        hockeyAppToken: state.settings.hockeyAppToken
                    }

                    const { encrytpOptios } = rootState.App.settings
                    if (encrytpOptios && _DEVMOD === 'false') {
                        const nonce = decodeBase64(encrytpOptios.nonce)
                        const mySecretKey = decodeBase64(encrytpOptios.mySecretKey)
                        const theirPublicKey = decodeBase64(encrytpOptios.theirPublicKey)
                        const message = decodeUTF8(JSON.stringify(logs))

                        const result = box(message, nonce, theirPublicKey, mySecretKey)

                        logs = {
                            data: encodeBase64(result)
                        }
                    }

                    const blob = new Blob([JSON.stringify(logs)], { type: 'application/json' })
                    await new CommonClient().SendFeedbackLog(json, blob)
                }
            }, { root: true })

            return data
        } catch (error) {
            console.log('Error send feedback log')
            dispatch(AppAct.removeCountLoader, {}, { root: true })
            throw new Error(error)
        }
    },

    async addLog(store, payload) {
        const jsonDB = new DbObject().GetDefaultObject(payload)
        // TODO this causes memory leaks and forces state to re-render in unexpected places, e.g. history module getters
        // commit(AppMutat.AddLog, jsonDB);
        await Logs.setItem(jsonDB.date_create.toString(), jsonDB)
    },

    async validateLogs({ commit }) {
        console.log('STORE: App Module - validateLogs')
        // Заполняем масив логов
        const keys = await Logs.keys()
        const getLogsPromises = keys.map(item => Logs.getItem(item))
        const logsAll = await Promise.all(getLogsPromises)

        const logs = []
        logsAll.forEach((item) => {
            if (!DbObject.ValidateTimeCreate(item, DbObject.keys.logs)) {
                Logs.removeItem(item.date_create.toString())
            } else {
                logs.push(item)
            }
        })

        // TODO stop writing logs to store. This crashes vue-devtools.
        // For performance, logs should be loaded from indexedDB to store only on debug mode being ON.
        if (window.cordova) {
            commit(AppMutat.AddLog, logs)
        }
    },

    validateError({ dispatch, state, rootState }, payload = {}) {
        const isOffline = 'onLine' in navigator && !navigator.onLine
        if (isOffline) {
            dispatch(AppAct.removeCountLoader, {}, { root: true })
            const data = {
                message: Vue.prototype.$polyglot._translate('m_offline'),
                error: payload.error
            }
            throw data
        }

        if (_get(rootState, 'App.settings.alwaysSendLogOnError', false)) {
            dispatch(AppAct.sendFeedbackLog, {}, { root: true })
        }

        if (payload.error && payload.error.stack && !payload.error.response) {
            console.error(payload.error)
            delete payload.error
        }

        const errorData = { ...payload, ...payload.error }

        console.error('STORE: App Module - validateError', { ...errorData, log: payload.log })

        dispatch(AppAct.removeCountLoader, {}, { root: true })

        if (errorData.response && errorData.response.status) {
            errorData.error = {
                error: errorData.response.status,
                message: errorData.response.message,
                data: _get(errorData, 'response.data.data', {})
            }
        }

        // if (errorData.response && errorData.response.status && !payload.schema) {
        //     const data = {
        //         message: errorData.message || _get(errorData, 'response.data.message'),
        //         error: errorData.response.status,
        //     };
        //     switch (errorData.response.status) {
        //         case 503: {
        //             // dispatch(AppAct.setError, data, { root: true });
        //             break;
        //         }
        //         default:
        //             break;
        //     }
        //     throw data;
        // }

        // NEW format error message
        const codeError = _get(errorData, 'error.error', errorData.error)

        errorData.message = getMessage({
            code: codeError,
            defaultMessage: errorData.message || errorData.desc,
            schema: payload.schema,
            appName: state.settings.nameApp
        })

        const data = {
            message: errorData.message || errorData.desc,
            error: errorData.error ? errorData.error : ''
        }

        if (errorData.code) {
            data.code = errorData.code
        }

        switch (errorData.error) {
            case 16: // session is not valid
            case 1012: // session is not valid mwallet_2
                return dispatch(constants.User.Actions.logout, {}, { root: true })
            case 1008: // the user is blocked
                return __processingBlockedUser(dispatch)
            default:
                break
        }

        // if (_get(errorData, 'error.error', errorData.error) === 401) {
        //     return dispatch(constants.MrewardUser.Actions.logoutUser, {}, { root: true })
        // }

        throw data
    },
    /**
     * Сохраняем настройки c конфига White Label в БД обновляем и загружаем в state,
     * @param commit
     * @param dispatch
     * @param state
     * @param settings
     * @returns {Promise}
     */
    async setSettingsFromConfig({ commit, dispatch }, payload = {}) {
        let settings = payload
        console.log('STORE: App Module - setSettingsFromConfig', settings)
        try {
            const _settings = await localforage.getItem(DbObject.keys.settings.name)
            const language = await localforage.getItem(DbObject.keys.language.name)
            if (_settings) {
                settings.colorTheme = _settings.data.colorTheme
            }
            settings.lang = language || settings.lang

            const { meta } = settings
            if (meta && meta.length === 1) {
                settings = { ...settings, ...meta[0] }
            }
            commit(AppMutat.Settings.name, settings)
            commit(AppMutat.Language, settings.lang)
            const settingObject = new DbObject().GetDefaultObject(settings)
            await localforage.setItem(DbObject.keys.settings.name, settingObject)
            return settings
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: App Module - setSettingsFromConfig'
            }, { root: true })
        }
    },

    setMetadata({ state }, payload) {
        console.log('STORE: App Module - setMetadata', payload)

        let defaultMeta
        const { settings: { meta } } = state
        const code = `+${payload.mobile.substring(0, 3)}`

        if (meta.length === 1) {
            return meta[0]
        }
        const result = meta.filter((item) => {
            if (item.default) {
                defaultMeta = item
            }
            if (item.code !== code) {
                return false
            }
            return item
        })

        if (result.length === 0) {
            result.push(defaultMeta)
        }
        return result[0]
    },

    async setLang({ commit }, { lang }) {
        console.log('STORE: App Module - setLang', lang)
        try {
            await localforage.setItem(DbObject.keys.language.name, lang)
            commit(AppMutat.Language, lang)
        } catch (e) {
            console.log('STORE: App Module - setLang')
        }
    },

    async getInfoDevice({ dispatch, state: { DeviceInfo } }) {
        await dispatch(AppAct.getAndSaveDB, {
            mutation: AppMutat.DeviceInfo.nameGlobal,
            dbKeys: DbObject.keys.DeviceInfo,
            state: DeviceInfo,
            get: async () => {
                const { data } = await new CommonClient().GetInfoDevice()
                return data
            },
            loader: false
        }, { root: true })
    }
}

export const getters = {
    loaderVisible(state) {
        return state.countLoader > 0
    },
    error(state) {
        return state.error
    },
    navigator(state) {
        return state.navigator
    },
    imageCache(state) {
        return state.imageCache
    },
    navigatorAnimation(state) {
        return {
            animation: state.navigatorAnimation
        }
    },
    logs(state) {
        return state.logs
    },
    settings(state) {
        return state.settings
    },
    moduleOptions: state => (module, defaultValue = {}) => {
        if (state.settings.options) {
            return _get(state.settings.options.modules, module, defaultValue)
        }
        return defaultValue
    },
    module: state => (module) => {
        return _get(state.settings.mainJsModules.modules, module, false)
    },
    language(state) {
        return state.language
    },
    /**
     * Language that is allowed to be used.
     * It is device or settings language if it is listed in languages list for the app
     * Or first language from available in app's settings
     * @param state
     * @returns {*}
     */
    availableLanguage(state) {
        const deviceLanguage = state.language
        const languages = state.settings.languages
        if (Array.isArray(languages) && languages.length) {
            return languages.indexOf(deviceLanguage) !== -1 ? deviceLanguage : languages[0]
        }
        return deviceLanguage
    },
    /**
     * Links to app's terms of service. It may be set as object with links to different locales or a string.
     * @param state
     * @returns {String}
     */
    linkTermsService(state) {
        const terms = state.settings.linkTermsService
        if (typeof terms === 'string') {
            return terms
        } if (_isObject(terms)) {
            const lang = state.language
            return typeof terms[lang] === 'string' ? terms[lang] : terms[Object.keys(terms)[0]]
        }
        return ''
    },

    deviceInfo(state) {
        return state.deviceInfo
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
