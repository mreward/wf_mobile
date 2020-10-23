export default {
    Mutations: {
        Loader: 'APP_LOADER',
        Error: 'APP_ERROR',
        ResetNavigator: 'APP_RESET_NAVIGATOR',
        PushPage: 'APP_PUSH_PAGE',
        PopPage: 'APP_POP_PAGE',
        PopToPage: 'APP_POP_TO_PAGE',
        ReplacePage: 'APP_REPLACE_PAGE',
        RemovePage: 'APP_REMOVE_PAGE',
        AddImageCache: 'APP_ADD_IMAGE_CACHE',
        ImageCache: 'APP_IMAGE_CACHE',
        AddLog: 'APP_ADD_LOG',
        Language: 'SET_LANGUAGE',
        Settings: {
            name: 'APP_SETTINGS',
            nameGlobal: 'App/APP_SETTINGS'
        },
        DeviceInfo: {
            name: 'APP_DEVICE_INFO',
            nameGlobal: 'App/APP_DEVICE_INFO'
        }
    },
    Actions: {
        getAndSaveDB: 'App/getAndSaveDB',
        getData: 'App/getData',
        getFromDbOrLoad: 'App/getFromDbOrLoad',
        addCountLoader: 'App/addCountLoader',
        removeCountLoader: 'App/removeCountLoader',
        setError: 'App/setError',
        resetNavigator: 'App/resetNavigator',
        pushPage: 'App/pushPage',
        popPage: 'App/popPage',
        popToPage: 'App/popToPage',
        replacePage: 'App/replacePage',
        removePage: 'App/removePage',
        getImage: 'App/getImage',
        loadImageToCache: 'App/loadImageToCache',
        getAllImageFromCache: 'App/getAllImageFromCache',
        sendFeedbackLog: 'App/sendFeedbackLog',
        initLogging: 'App/initLogging',
        addLog: 'App/addLog',
        startApplication: 'App/startApplication',
        validateLogs: 'App/validateLogs',
        validateError: 'App/validateError',
        setSettingsFromConfig: 'App/setSettingsFromConfig',
        setMetadata: 'App/setMetadata',
        setLang: 'App/setLang',
        getInfoDevice: 'App/getInfoDevice'
    },
    Getters: {
        loaderVisible: 'App/loaderVisible',
        error: 'App/error',
        navigator: 'App/navigator',
        navigatorAnimation: 'App/navigatorAnimation',
        logs: 'App/logs',
        module: 'App/module',
        moduleOptions: 'App/moduleOptions',
        settings: 'App/settings',
        language: 'App/language',
        availableLanguage: 'App/availableLanguage',
        linkTermsService: 'App/linkTermsService',
        deviceInfo: 'App/deviceInfo'
    }
}
