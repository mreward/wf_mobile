export default {
    Mutations: {
        UserData: {
            name: 'USER_DATA',
            nameGlobal: 'MrewardUser/USER_DATA'
        },
        AuthToken: {
            name: 'USER_AUTH_TOKEN',
            nameGlobal: 'MrewardUser/USER_AUTH_TOKEN'
        },
        UserConfig: {
            name: 'USER_CONFIG',
            nameGlobal: 'MrewardUser/USER_CONFIG'
        },
    },
    Actions: {
        getUserData: 'MrewardUser/getUserData',
        getAuthToken: 'MrewardUser/getAuthToken',
        setAuthToken: 'MrewardUser/setAuthToken',
        authenticateUser: 'MrewardUser/authenticateUser',
        changePassword: 'MrewardUser/changePassword',
        changePasswordConfirm: 'MrewardUser/changePasswordConfirm',
        registrationUser: 'MrewardUser/registrationUser',
        registrationUserConfirm: 'MrewardUser/registrationUserConfirm',
        logoutUser: 'MrewardUser/logoutUser',
        setUserConfig: 'MrewardUser/setUserConfig',
        loadUserConfig: 'MrewardUser/loadUserConfig'
    },
    Getters: {
        userData: 'MrewardUser/userData',
        userConfig: 'MrewardUser/userConfig',
    }
}
