const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/ar.js')
const validationsErrors = require('./validations-errors/ar.js')
const mWalletErrors = require('./mWalletErrors/ar.js')
const Languages = require('./Languages/all.js')
const globalManeyErrors = require('./GlobalManeyErrors/ar.js')
const Default = require('./default/ar.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...globalManeyErrors.default,
    ...Default.default
}

