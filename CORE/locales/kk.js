const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/kk.js')
const validationsErrors = require('./validations-errors/kk.js')
const mWalletErrors = require('./mWalletErrors/kk.js')
const Languages = require('./Languages/all.js')
const Default = require('./default/kk.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...Default.default
}
