const moment = require('moment')

function getVersionCode() {
    const d = moment().format('MMDD')
    const y = moment().format('YY') - 15
    const version = parseInt(y.toString() + d, 10)
    return version.toString()
}

module.exports = getVersionCode
