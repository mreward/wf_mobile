/**
 * Function convert value text to capitalize
 *
 *
 * @example
 * import {capitalize} from '_filters';
 *
 * @param {String} value - Value to convert capitalize
 * @return {String}
 */
export default (value) => {
    const string = value.toString()
    return string.charAt(0).toUpperCase() + string.slice(1)
}
