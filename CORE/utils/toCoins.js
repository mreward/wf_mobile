import isNumber from 'lodash/isNumber'
import round from 'lodash/round'

import toNumber from '_CORE/utils/toNumber'

/**
 * Function for convert value to coins format
 *
 *
 * @example
 * import toCoins from '_CORE/utils/toCoins';
 *
 * toCoins(value)
 * @param {String|Number} initialValue - Value to convert
 * @param {String} [precision=2]
 * @return {Number}
 */
export default (initialValue, precision = 2) => {
    const value = initialValue ? toNumber(initialValue) : 0

    if (!isNumber(value) || !value) {
        return 0
    }

    return round(value * 100, precision)
}
