/**
 * Validate expire date in format --/--
 * @param expire
 * @returns {boolean}
 */
export default function cardExpiryDateFormat(expire) {
    const currDate = new Date();
    const futureDate = new Date();
    const arrayExpire = expire.split('/');
    if ((arrayExpire.length !== 2) || (arrayExpire[0] === '') || (Number.isNaN(arrayExpire[0])) || arrayExpire[1] === ''
        || (Number.isNaN(arrayExpire[1])) || (arrayExpire[0] < 1) || (arrayExpire[0] > 12)) {
        return false;
    }
    futureDate.setFullYear((arrayExpire[1] * 1) + 2000, arrayExpire[0], 1);
    return futureDate > currDate;
}
