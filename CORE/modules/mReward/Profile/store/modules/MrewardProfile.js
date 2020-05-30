import constants from '_vuex_constants'
import MrewardProfile from '../../libs/MrewardProfile'
import _get from 'lodash/get'
import Vue from 'vue'

const {
    MrewardProfile: {
        Mutations: ProfileMutat
    }
} = constants

const state = {
    // static profile field
    staticFields: [
        'mobile',
        'id_city',
        'id_region'
    ],
    userProfile: {},
    profileParams: {},
    profileFields: [],
    pushData: {}
}

const formatProfileFields = ({ staticFields }, list) => {
    return list.filter((item) => {
        return staticFields.indexOf(item.key) === -1
    }).sort((item1, item2) => {
        return item1.sort - item2.sort
    })
}

const mutations = {
    [ProfileMutat.UserProfile.name]: (state, data) => {
        state.userProfile = { ...data }
    },
    [ProfileMutat.ProfileParams.name]: (state, data) => {
        state.profileParams = { ...data }
    },
    [ProfileMutat.ProfileFields.name]: (state, data) => {
        state.profileFields = formatProfileFields(state, data)
    },
    [ProfileMutat.NotificationsPushData.name]: (state, data) => {
        state.pushData = data
    }
}

const actions = {
    initHook({ commit }) {
        console.warn('MrewardProfile Module - initHook')
        Vue.prototype.$bus.$on('VUEX:setPushToken', (payload) => {
            console.log('MrewardProfile VUEX:setPushToken - initHook', payload)
            commit(ProfileMutat.NotificationsPushData.name, payload)
        })
    },

    /**
     * Get user profile
     * @param payload
     * @param state
     * @param commit
     * @param dispatch
     */
    async getProfile({ commit, dispatch, state }, payload) {
        console.log('STORE: MrewardProfile Module - getProfile')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardProfile().GetProfile(payload)

            commit(ProfileMutat.UserProfile.name, response)

            const { pushData, userProfile } = state
            let os
            switch (pushData.os) {
                case 'Android': {
                    os = 1
                    break
                }
                case 'iOS': {
                    os = 2
                    break
                }
            }
            if (pushData.pushKey) {
                const data = `phone=${userProfile.mobile}&token=${pushData.pushKey}&os=${os}`
                await new MrewardProfile().SendPushToken(data)
            }

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardProfile Module - getProfile'
            }, { root: true })
        }
    },

    /**
     * edit user profile
     * @param payload
     * @param commit
     * @param dispatch
     */
    async editProfile({ commit, dispatch }, payload) {
        console.log('STORE: MrewardProfile Module - editProfile')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardProfile().EditProfile(payload)

            commit(ProfileMutat.UserProfile.name, response)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardProfile Module - editProfile'
            }, { root: true })
        }
    },

    /**
     * Get profile params
     * @param commit
     * @param dispatch
     */
    async getProfileParams({ commit, dispatch }) {
        console.log('STORE: MrewardProfile Module - getProfileParams')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardProfile().ProfileParams()

            commit(ProfileMutat.ProfileParams.name, response)
            commit(ProfileMutat.ProfileFields.name, response.fields)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardProfile Module - getProfileParams'
            }, { root: true })
        }
    },

    /**
     * Upload profile avatar
     * @param commit
     * @param dispatch
     * @param payload
     */
    async uploadAvatar({ commit, dispatch }, payload) {
        console.log('STORE: MrewardProfile Module - uploadAvatar')
        try {
            dispatch(constants.App.Actions.addCountLoader, {}, { root: true })

            const response = await new MrewardProfile().UploadAvatar({
                imageURI: payload.imageURI,
                options: payload.options
            })

            commit(ProfileMutat.UserProfile.name, response)

            dispatch(constants.App.Actions.removeCountLoader, {}, { root: true })

            return response
        } catch (error) {
            await dispatch(constants.App.Actions.validateError, {
                error,
                log: 'STORE: MrewardProfile Module - uploadAvatar'
            }, { root: true })
        }
    }
}

const getters = {
    userProfile(state) {
        return state.userProfile
    },
    profileFields(state) {
        return state.profileFields
    },
    profileRequiredFields(state) {
        return _get(state.profileParams, 'params.required', {})
    },
    userName (state) {
        //  ]{"id":"0","value":"По имени"},
        //     {"id":"1","value":"По имени и отчеству"},
        //     {"id":"2","value":"По имени и фамилии"}]

        if (state.userProfile && state.userProfile.first_name) {
            switch (state.userProfile.address_you) {
                case '0':
                    return state.userProfile.first_name
                case '1':
                    return `${state.userProfile.first_name}<br/>${state.userProfile.middle_name || ''}`
                case '2':
                default:
                    return `${state.userProfile.first_name}<br/>${state.userProfile.last_name || ''}`
            }
        }
        return '';
    },
}

export default {
    strict: false,
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
