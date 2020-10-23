import { store } from '_CORE/store'
import constants from '_vuex_constants'
import { get } from 'lodash'

export default (account) => {
    const defaultPhoneMask = get(store.getters, `[${constants.App.Getters.settings}].defaultPhoneMask`)

    let parseAccount

    if (account) {
        parseAccount = account.replace(/[\(\)+\-\s\_]/g, '')
        switch (defaultPhoneMask) {
            case 'LB':
                const replaceFucn = (srt, $1, $2) => {
                    if ($1 === '03') {
                        return `9613${$2}`
                    }
                    return `961${$2}`
                }
                return parseAccount.replace(/^(00961|0961|03)(\d{6,8})/g, replaceFucn)
            case 'UA':
                return parseAccount.replace(/^(06[3,6-8]|09[1-9]|050|073)(\d{7})/g, '38$1$2')
            default:
                return parseAccount
        }
    }
}
