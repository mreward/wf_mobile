import moment from 'moment'
import Vue from 'vue'

/**
 * Filter for formatting value to date with moment.format
 *
 *
 * @example
 * import { date } from '_filters';
 *
 * filters: {
 *  date,
 * },
 *
 * {{ item.start_from | date }}
 * or
 * {{ item.start_from | date({ formatFrom = 'x', formatTo: 'hh:mm'}) }}
 *
 * @param {String} date - String date in undefined format date
 * @param {Object} options
 * @param {Object} options.formatTo - Format date to convert (see https://momentjs.com/docs/)
 * @param {Object} options.formatFrom - Format from to convert (see https://momentjs.com/docs/)
 * @param {Boolean} options.showToday - Show 'Today' title instead of date
 */
export default (date, { formatTo = 'DD.MM.YYYY', formatFrom = null, showToday = false } = {}) => {
    const formattedDate = moment(date, formatFrom).format(formatTo)
    if (showToday) {
        return formattedDate === moment().format(formatTo) ? Vue.prototype.$polyglot._translate('m_today') : formattedDate
    }
    return formattedDate
}
