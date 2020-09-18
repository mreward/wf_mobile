/**
 * Validator regex
 * @param regex {RegExp}
 * @returns {Boolean}
 */
export default function regex(regex) {
    return (value) => {
        return new RegExp(regex, 'g').test(value);
    };
}
