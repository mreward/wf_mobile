const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/uk.js')
const validationsErrors = require('./validations-errors/uk.js')
const mWalletErrors = require('./mWalletErrors/uk.js')
const Languages = require('./Languages/all.js')
const Default = require('./default/uk.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...Default.default
}
