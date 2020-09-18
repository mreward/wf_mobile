/**
 * Validation for name kind of fields.
 * Allows alphabetic characters, dashes, whitespace and ticks.
 * @param val
 * @returns {boolean}
 */
export default function alphaName(val) {
    return /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s'-]+$/g.test(val);
}
