import moment from 'moment/moment'

function formatByPlatform (platform, date) {
    if (!date) {
        return ''
    }
    switch (platform.toLowerCase()) {
        case 'ios':
            return moment(date).toDate()
        case 'android':
        default:
            return moment(date).format('x')
    }
}
/**
 * DatePicker plugin show calendar and return selected date.
 *
 * To use:
 * Call `DatePicker.Pick()`
 */
export default {
    /**
     * Show calendar and return selected date.
     * @param data - {Object}
     * @param data.mockDate - mockup for browser
     * @param data.date - Selected date.
     * @param data.theme - Choose the theme of the picker ( only Android )
     * @param data.minDate - Minimum date.
     * @param data.maxDate - Maximum date.
     * @param data.format - input date format
     * @example
     * <caption>-----</caption>
     * import DatePicker from '_PLUGINS/common/DatePicker';
     *
     * const option = {
     *   maxDate: moment().add(10, 'day'),
     *   minDate: moment(),
     *   date: moment().add(this.term, 'day').format(format),
     *   format,
     * };
     * const date = await DatePicker.Pick(option);
     */
    Pick(data = {}) {
        const format = data.format || 'DD-MM-YYYY'

        // This is only for DEBUG purposes, to simulate date pick in browser
        if (!window.cordova && !window.datePicker && data.mockDate) {
            return new Promise((resolve) => {
                resolve(moment(data.mockDate).format(format))
            })
        }

        let date = new Date()
        if (data && data.date) {
            const ts = moment(data.date, format).valueOf()
            if (Number.isNaN(ts) === false) {
                date = new Date(ts)
            }
        }

        let androidTheme = ''
        switch (data.theme) {
            case 'default':
                androidTheme = datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
                break
            default:
                androidTheme = datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
                break
        }

        const options = {
            mode: 'date',
            date,
            minDate: formatByPlatform(device.platform, data.minDate),
            maxDate: formatByPlatform(device.platform, data.maxDate),
            androidTheme
        }

        return new Promise((resolve, reject) => {
            if (window.cordova) {
                datePicker.show(options, (date) => {
                    // iOS CANCEL button renders now date, solution taken from https://github.com/VitaliiBlagodir/cordova-plugin-datepicker/issues/247
                    // eslint-disable-next-line
                    if (date === undefined) { resolve() }
                    resolve(this.IncrementDateByHour(date))
                }, reject)
            } else {
                reject()
            }
        })
    },
    /**
     * Increment date value by one hour
     * Fixed cordova-plugin-datepicker iOS bug for dates 1981-1989 years
     * (picked dated equals 23-00 12.03.1982 instead of 00-00 13.03.1982)
     *
     * @param date - date value
     * @example
     * <caption>-----</caption>
     * import DatePicker from '_PLUGINS/common/DatePicker';
     *
     * DatePicker.IncrementDateByHour(date);
     */
    IncrementDateByHour(date) {
        return moment(date).add(1, 'h')
    }
}
