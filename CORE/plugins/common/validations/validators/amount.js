import isNaN from 'lodash/isNaN';

/**
 * Validation for amount field.
 * @param value
 * @returns {boolean}
 */
export default function amount(value) {
    const val = String(value).replace(/\s|\,/g, '')
    return !isNaN(val - parseFloat(val));
}
