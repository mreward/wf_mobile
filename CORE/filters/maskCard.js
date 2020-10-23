import repeat from 'lodash/repeat'

/**
 * Filter for mask payment card number
 *
 *
 * @example
 * import { maskCard } from '_filters';
 *
 * filters: {
 *  maskCard,
 * },
 *
 * {{ item.card_pan | maskCard }}
 * or
 * {{ item.card_pan | maskCard({ placeholder: '*', startChars: 6, endChars: 4, delimiter: '' }) }}
 *
 * @param {String|Number} value - Pan card length 16 numbers
 * @param {String} placeholder - Placeholder, default * sing
 * @param {Number} startChars - Show first chard
 * @param {Number} endChars - Show last chars
 * @param {String} delimiter - delimiter between group
 * @param {Number} countGroups
 * @return {String} - 1234 **** **** 5678
 */
export default (value, { countGroups = 4, placeholder = '*', startChars = 4, endChars = 4, delimiter = ' ' } = {}) => {
    const currentValue = value || ''
    const str = currentValue.toString()
    const lengthPlaceholder = value.length - startChars - endChars
    const _placeholder = repeat(placeholder, lengthPlaceholder)
    const start = str.substr(0, startChars)
    const end = str.substr(-endChars)
    const maskStr = `${start}${_placeholder}${end}`
    return (maskStr.match(new RegExp('.{1,' + countGroups + '}', 'g')) || []).join(delimiter)
}

