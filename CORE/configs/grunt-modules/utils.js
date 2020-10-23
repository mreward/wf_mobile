const moment = require('moment')
const path = require('path')

module.exports.getPathBuild = function(name) {
    return path.resolve(__dirname, `../../../build_apk/${name}/${moment().format('YYYY.MM.DD-HH:mm')}`)
}
