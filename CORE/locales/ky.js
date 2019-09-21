const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/ky.js')
const validationsErrors = require('./validations-errors/ky.js')
const mWalletErrors = require('./mWalletErrors/ky.js')
const Languages = require('./Languages/all.js')
const Default = require('./default/ky.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...Default.default
}
