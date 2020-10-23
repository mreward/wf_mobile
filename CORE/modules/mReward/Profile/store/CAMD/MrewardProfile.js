export default {
    Mutations: {
        UserProfile: {
            name: 'USER_PROFILE',
            nameGlobal: 'MrewardProfile/USER_PROFILE'
        },
        ProfileParams: {
            name: 'PROFILE_PARAMS',
            nameGlobal: 'MrewardProfile/PROFILE_PARAMS'
        },
        ProfileFields: {
            name: 'PROFILE_FIELDS',
            nameGlobal: 'MrewardProfile/PROFILE_FIELDS'
        },
        NotificationsPushData: {
            name: 'NOTIFICATIONS_PUSH_DATA',
            nameGlobal: 'MrewardProfile/NOTIFICATIONS_PUSH_DATA'
        }
    },
    Actions: {
        initHook: 'MrewardProfile/initHook',
        getProfile: 'MrewardProfile/getProfile',
        editProfile: 'MrewardProfile/editProfile',
        getProfileParams: 'MrewardProfile/getProfileParams',
        uploadAvatar: 'MrewardProfile/uploadAvatar'
    },
    Getters: {
        userName: 'MrewardProfile/userName',
        userProfile: 'MrewardProfile/userProfile',
        profileFields: 'MrewardProfile/profileFields',
        profileRequiredFields: 'MrewardProfile/profileRequiredFields'
    }
}
