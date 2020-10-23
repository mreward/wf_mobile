import Vue from 'vue'

/**
 * Search for localized error message by response error code in selected schema
 * @param code
 * @param defaultMessage
 * @param schema
 * @returns {*}
 */
export function getMessage({ code = '', defaultMessage = '', schema, appName }) {
    if (!Vue.prototype.$polyglot) {
        return ''
    }

    let messageKey = ''
    if (schema) {
        let codeInt = parseInt(code, 10)
        const prefix = codeInt < 0 ? '_minus' : ''
        codeInt *= codeInt < 0 ? -1 : 1
        messageKey = `m_${schema}${prefix}_${codeInt}`
    } else if (code.length >= 4) {
        // error masterpass
        messageKey = `m_massterpass_${code}`
    } else {
        const codeInt = parseInt(code, 10)

        if (codeInt >= 500 && codeInt < 600) {
            messageKey = 'm_mwallet_500'
        } else if (codeInt >= 300 && codeInt < 500) {
            messageKey = 'm_mwallet_400'
        } else {
            // error mWallet
            messageKey = `m_mwallet_${code}`
        }
    }

    return Vue.prototype.$polyglot._translate(messageKey, defaultMessage, { appName })
}
