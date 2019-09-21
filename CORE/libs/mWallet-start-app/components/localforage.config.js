import localforage from 'localforage'

export default {
    async init (configWallet) {
        try {
            // IOS 12.2 fixed crash IndexedDB
            // DOMException: Connection to Indexed Database server lost. Refresh the page to try again
            let driver = []
            if (window.device && device.platform.toLowerCase() === 'ios') {
                driver = [
                    localforage.WEBSQL,
                    localforage.LOCALSTORAGE
                ]
            } else {
                driver = [
                    localforage.INDEXEDDB,
                    localforage.WEBSQL,
                    localforage.LOCALSTORAGE
                ]
            }
            await localforage.config({
                driver,
                name: configWallet.name
            })
            await localforage.ready()
        } catch (error) {
            console.error('localforage.config Error: ', error)
        }
    }
}
