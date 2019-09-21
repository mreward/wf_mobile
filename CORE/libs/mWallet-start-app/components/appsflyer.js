export default {
    init(configWallet) {
        // Analytics AppsFlyer
        if (window.plugins && window.plugins.appsFlyer) {
            const optionsAppsFlyer = {
                devKey: configWallet.application.appsFlyerToken,
                isDebug: false,
                onInstallConversionDataListener: true,
                collectIMEI: false,
                collectAndroidID: false
            }

            if (device.platform.toLowerCase() === 'ios') {
                optionsAppsFlyer.appId = configWallet.application.appStoreId
            }
            window.plugins.appsFlyer.initSdk(optionsAppsFlyer, (e) => {
                console.log('appsFlyer.initSdk', e)
            }, (e) => {
                console.log('appsFlyer.initSdk ERROR: ', e)
            })

            if (window.FirebasePlugin) {
                if (device.platform.toLowerCase() === 'ios') {
                    window.FirebasePlugin.getAPNSToken(function (token) {
                        console.log('appsFlyer.registerUninstall', token)
                        window.plugins.appsFlyer.registerUninstall(token)
                    }, function (error) {
                        console.error(error)
                    })
                } else {
                    window.FirebasePlugin.onTokenRefresh(function (token) {
                        console.log('appsFlyer.updateServerUninstallToken', token)
                        window.plugins.appsFlyer.updateServerUninstallToken(token)
                    }, function (error) {
                        console.error(error)
                    })
                }
            }
        }
    }
}
