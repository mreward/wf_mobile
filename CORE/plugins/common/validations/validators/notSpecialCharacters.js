/**
 * Allows alphabetic characters, dashes, whitespace and numbers.
 * (forbids special characters)
 * @param val
 * @returns {boolean}
 */
export default function notSpecialCharacters(val) {
    return /^[^√÷×¶∆¢°©®™✓€₽•!@#$%^&*()\]\[{}\/<>£~+='"`|_\\]+$/g.test(val);
}
