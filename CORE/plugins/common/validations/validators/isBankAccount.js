/**
 * Validate bank account number
 * @param val {String} - card number
 * @returns {boolean}
 */
export default function isBankAccount(val) {
    if (typeof val === 'undefined' || val === null || val === '') {
        return false;
    }
    const length = val.replace(/\s/g, '').length;
    return length >= 14 || length <= 16;
}
