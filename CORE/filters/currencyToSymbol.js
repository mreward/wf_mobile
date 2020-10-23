/**
 * Filter for convert ISO code currency to symbol ($, ₦, etc)
 * Available NGN, KES and default USD
 *
 * @example
 * import { currencyToSymbol } from '_filters';
 *
 * filters: {
 *  currencyToSymbol,
 * },
 *
 * {{ item.currency | currencyToSymbol }}
 *
 * @param {String} value - Currency in ISO format
 */
export default (value) => {
    switch (value) {
        case 'NGN':
            return '₦'
        case 'KES':
            return '/-'
        default:
            return '$'
    }
}
