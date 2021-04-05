export default {
    Mutations: {
        AddPhoneFields: {
            name: 'PHONE_FIELDS',
            nameGlobal: 'MrewardProfile/PHONE_FIELDS'
        },
        AddCityFields: {
            name: 'CITY_FIELDS',
            nameGlobal: 'MrewardProfile/CITY_FIELDS'
        },
        AddDynamicFields: {
            name: 'DYNAMIC_INPUT',
            nameGlobal: 'MrewardProfile/DYNAMIC_INPUT'
        },
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
        addDynamicFields: 'MrewardProfile/addDynamicFields',
        initHook: 'MrewardProfile/initHook',
        getProfile: 'MrewardProfile/getProfile',
        addCity: 'MrewardProfile/addCity',
        addPhone: 'MrewardProfile/addPhone',
        editProfile: 'MrewardProfile/editProfile',
        getProfileParams: 'MrewardProfile/getProfileParams',
        uploadAvatar: 'MrewardProfile/uploadAvatar'
    },
    Getters: {
        phoneFields: 'MrewardProfile/phoneFields',
        cityFields: 'MrewardProfile/cityFields',
        dynamicInput: 'MrewardProfile/dynamicInput',
        userName: 'MrewardProfile/userName',
        userProfile: 'MrewardProfile/userProfile',
        profileFields: 'MrewardProfile/profileFields',
        profileRequiredFields: 'MrewardProfile/profileRequiredFields'
    }
}
