/**
 * Allows only ASCII characters (32-127)
 * @param val
 * @returns {boolean}
 */
export default function isASCII(val) {
    return /^[\x20-\x7F]*$/g.test(val);
}
