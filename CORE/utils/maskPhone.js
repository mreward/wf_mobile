import StringMask from 'string-mask'
import { store } from '_CORE/store'
import constants from '_vuex_constants'

export default (number) => {
    if (!number) {
        return
    }

    const mask = store.getters[constants.PhoneMasks.Getters.maskForComponents](number)

    if (mask && mask.mask && mask.masked) {
        let phoneString = mask.phone || number
        let phone = parseInt(phoneString, 10)
        let reverse = true
        if (!isNaN(phone)) {
            reverse = false
            phoneString = phone
        }
        return new StringMask(mask.mask.replace(/[0-9]/g, '9'), {reverse}).apply(phoneString)
    } else {
        return number
    }
}
