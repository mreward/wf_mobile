/**
 * Validate provided phone number
 * @param val {String}
 * @param formData {Object}
 * @returns {boolean}
 */
export default function isMobileNumber(val, formData = {}) {
    if (typeof val === 'undefined' || val === null || val === '') {
        return false;
    }
    let phoneLength = 9;
    if (formData.maskSettings) {
        phoneLength = formData.maskSettings.mask.replace(/\s/g, '').length;
    }

    // All countries
    if (phoneLength === 15) {
        return true;
    }

    const phoneRegExp = new RegExp(`[0-9]{${phoneLength}}`, 'gi');
    const withoutSpaces = val.replace(/\s/g, '');
    return phoneRegExp.test(withoutSpaces);
}
