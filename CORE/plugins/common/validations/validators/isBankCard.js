/**
 * Validate bank card number
 * @param val {String} - card number
 * @returns {boolean}
 */

function Moon(number) {
    const arr = [];
    const cardNumber = number.toString().replace(/\s/g, '');
    for (let i = 0; i < cardNumber.length; i++) {
        if (i % 2 === 0) {
            const m = parseInt(cardNumber[i], 10) * 2;
            if (m > 9) {
                arr.push(m - 9);
            } else {
                arr.push(m);
            }
        } else {
            const n = parseInt(cardNumber[i], 10);
            arr.push(n);
        }
    }
    const summ = arr.reduce((a, b) => a + b);
    return Boolean(!(summ % 10));
}

export default function isBankCard(val) {
    if (typeof val === 'undefined' || val === null || val === '') {
        return false;
    }

    return val.replace(/\s/g, '').length === 16 && /^[\d\s]+$/.test(val) && Moon(val);
}
