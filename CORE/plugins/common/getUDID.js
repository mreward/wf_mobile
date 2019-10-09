import { v4 as uuidv4 } from 'uuid'

export default function (app) {
    if (window.device) {
        if (device.platform.toLowerCase() === 'ios' && app) {
            Keychain.get((val) => {
                if (!val) {
                    const hash = uuidv4()
                    Keychain.set(() => {
                    }, () => {
                    }, `IMEI_${app.replace(/\s/g, '_')}`, hash)
                    window.device.serial = hash
                } else {
                    window.device.serial = val
                }
            }, () => {
            }, `IMEI_${app.replace(/\s/g, '_')}`)
        }
        return window.device.serial
    }
    return ''
}
