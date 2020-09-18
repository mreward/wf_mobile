/**
 * Validate prefixes of fields
 * @param prefix
 * @returns {boolean}
 */
export default function containPrefix(prefix) {
    return (value) => {
        return (prefix.split(',').find(e => value.indexOf(e) === 0) || '').length > 0;
    };
}
