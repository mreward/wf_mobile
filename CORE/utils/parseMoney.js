import toMoney from './toMoney'
import toCoins from './toCoins'

/**
 * Function for convert value to money format
 * Chain use toCoins -> toMoney
 *
 * @example
 * import parseMoney from '_CORE/utils/parseMoney';
 *
 * parseMoney(value)
 * @param {String|Number} value - Value to convert
 * @return {Number}
 */
export default (value) => {
    return toMoney(toCoins(value))
}
