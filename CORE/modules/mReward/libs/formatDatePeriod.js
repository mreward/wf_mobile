import moment from 'moment'

/**
 * format date to '00 - 00 Month'
 */
export default (dateFrom, dateTo) => {
    const fromMonth = moment(dateFrom, 'YYYY-MM-DD').month()
    const toMonth = moment(dateTo, 'YYYY-MM-DD').month()
    const from = moment(dateFrom, 'YYYY-MM-DD')
    const to = moment(dateTo, 'YYYY-MM-DD')

    if (dateFrom === dateTo) {
        return from.format('DD MMMM')
    }
    if (fromMonth === toMonth) {
        return `${from.format('DD')} - ${to.format('DD MMMM')}`
    }
    return `${from.format('DD MMM')} - ${to.format('DD MMM')}`
}
