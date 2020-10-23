import round from 'lodash/round'
import isNumber from 'lodash/isNumber'

import toNumber from '_CORE/utils/toNumber'

/**
 * Function for convert value to money format
 *
 *
 * @example
 * import toMoney from '_CORE/utils/toMoney';
 *
 * toMoney(value)
 * @param {String|Number} initialValue - Value to convert
 * @param {String} [precision=2]
 * @return {Number}
 */
export default (initialValue, precision = 2) => {
    const value = toNumber(initialValue)

    if (!isNumber(value) || !value) {
        return 0
    }

    return round(value / 100, precision)
}
