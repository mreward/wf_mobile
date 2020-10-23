import * as libphonenumber from 'libphonenumber-js'
/**
 * FileOpener plugin will open a file on your device file system with its default application..
 *
 * To use:
 * Call `FileOpener.NameFunction(params)`
 */
export default {
    /**
     * Convert "our" format of masks to the format of 'vue-masked-input'
     * @param mask
     * @example
     * <caption>-----</caption>
     * import MaskPhone from '_PLUGINS/common/MaskPhone';
     *
     * MaskPhone.ConvertMaskForVueMask(mask)
     * @returns {string}
     */
    ConvertMaskForVueMask(mask) {
        let newString = ''
        mask.split('').forEach((item) => {
            let char = item
            if (char !== 'x') {
                char = `\\${item}`
            } else {
                char = '1'
            }
            newString += char
        })

        return newString
    },
    /**
     * Clear the phone number of various characters
     * @param mobile
     * @example
     * <caption>-----</caption>
     * import MaskPhone from '_PLUGINS/common/MaskPhone';
     *
     * MaskPhone.GetClearMobile(mobile)
     * @constructor
     */
    GetClearMobile(mobile) {
        return mobile.replace(/[\(\)+\-\s\_]/g, '')
    },
    /**
     * Get country iso by phone number
     * @param mobile
     * @example
     * <caption>-----</caption>
     * import MaskPhone from '_PLUGINS/common/MaskPhone';
     *
     * MaskPhone.GetCountryByPhoneNumber(phone)
     * @returns {string}
     */
    GetCountryByPhoneNumber(mobile) {
        let { country } = libphonenumber.parseNumber(mobile)
        // TODO: add format to libphonenumber
        if (!country && mobile.indexOf('+260') > -1) {
            country = 'ZM'
        }
        return country
    },
    /**
     * Get phone number without country mask and whitespaces
     * @param mobile
     * @example
     * <caption>-----</caption>
     * import MaskPhone from '_PLUGINS/common/MaskPhone';
     *
     * MaskPhone.GetClearPhoneNumber(phone)
     * @returns {string}
     */
    GetClearPhoneNumber(mobile) {
        const { phone } = libphonenumber.parseNumber(mobile)
        const withoutSpaces = phone ? phone.replace(/\s/g, '') : mobile.replace(/\s/g, '')
        return withoutSpaces
    }
}
