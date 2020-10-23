export default {
    init(configWallet) {
        if (window.hockeyapp) {
            try {
                hockeyapp.start(
                    (success) => {
                        console.log('hockeyapp.start success', success)
                    },
                    (error) => {
                        console.log('hockeyapp.start error', error)
                    },
                    configWallet.application.hockeyAppID,
                    true,
                    hockeyapp.checkForUpdateMode.CHECK_MANUALLY,
                    false,
                    false,
                    hockeyapp.loginMode.ANONYMOUS,
                )
            } catch (error) {
                console.log('hockeyapp.start Error: ', error)
            }
        }
    }
}
