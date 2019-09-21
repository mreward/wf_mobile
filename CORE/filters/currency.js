export default (value = 0, paymentId = null, currency) => {
    if (paymentId && (parseInt(paymentId, 10) === 51 || currency === 'GCB')) {
        if (typeof value === 'string') {
            return (value / 10000000).toFixed(7)
        }

        return (value / 100).toFixed(7)
    }
    return (value / 100).toFixed(2)
}
