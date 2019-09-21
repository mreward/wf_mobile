const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/ru.js')
const validationsErrors = require('./validations-errors/ru.js')
const mWalletErrors = require('./mWalletErrors/ru.js')
const Languages = require('./Languages/all.js')
const Default = require('./default/ru.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...Default.default
}
