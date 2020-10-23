import toCoins from '_CORE/utils/toCoins'

/**
 * Filter for convert value to coins format
 *
 *
 * @example
 * import { toCoins } from '_filters';
 *
 * filters: {
 *  toCoins,
 * },
 *
 * {{ item.amount | toCoins }}
 *
 * @param {String|Number} value - Value to convert
 * @param {String} [precision=2]
 * @return {Number}
 */
export default toCoins
