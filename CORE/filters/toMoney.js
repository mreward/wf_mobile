import toMoney from '_CORE/utils/toMoney'

/**
 * Filter for convert value to money format
 *
 *
 * @example
 * import { toMoney } from '_filters';
 *
 * filters: {
 *  toMoney,
 * },
 *
 * {{ item.amount | toMoney }}
 *
 * @param {String|Number} value - Value to convert
 * @param {String} [precision=2]
 * @return {Number}
 */
export default toMoney
