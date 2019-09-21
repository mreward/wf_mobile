const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/be.js')
const validationsErrors = require('./validations-errors/be.js')
const mWalletErrors = require('./mWalletErrors/be.js')
const Languages = require('./Languages/all.js')
const Default = require('./default/be.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...Default.default
}
