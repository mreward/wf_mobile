/**
 * Validator validPassword
 * @param regex {RegExp}
 * @returns {Boolean}
 */
export default function validPassword(value) {
    const regExp = new RegExp(/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/, 'i');
    return regExp.test(value);
}
