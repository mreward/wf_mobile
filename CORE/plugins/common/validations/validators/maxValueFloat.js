import toNumber from '_CORE/utils/toNumber';

/**
 * Validate amount string with comma separator
 * @param maxValue
 * @returns {function(*): boolean}
 */
export default function maxValueFloat(maxValue) {
    return (value) => {
        return toNumber(value) <= toNumber(maxValue);
    };
}
