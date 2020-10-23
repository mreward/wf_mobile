export default {
    init(configWallet) {
        if (configWallet.application.timeReload) {
            let lockTimeout = 0
            document.addEventListener('pause', () => {
                console.log('APP pause')
                lockTimeout = new Date().getTime()
            }, false)

            document.addEventListener('resume', () => {
                console.log('APP resume')
                // если больше N минут в фоне при открытие перезагрузить страницу
                const time = new Date().getTime() - lockTimeout
                const timeLimit = 60000 * configWallet.application.timeReload
                const isReload = !document.getElementsByTagName('html')[0].hasAttribute('touchid-show')
                if (time > timeLimit && isReload) {
                    window.location.reload(true)
                }
            }, false)
        }
    }
}
