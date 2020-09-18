import toNumber from '_CORE/utils/toNumber';

/**
 * Validate amount string with comma separator
 * @param minValue
 * @returns {function(*): boolean}
 */
export default function minValueFloat(minValue) {
    return (value) => {
        return toNumber(value) >= toNumber(minValue);
    };
}
