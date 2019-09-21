const validationsErrors = require('./validations-errors/tg.js')
const mWalletErrors = require('./mWalletErrors/tg.js')
const Languages = require('./Languages/all.js')
const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/tg.js')
const Default = require('./default/tg.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...Default.default
}
