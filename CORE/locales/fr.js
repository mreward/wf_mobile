const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/fr.js')
const validationsErrors = require('./validations-errors/fr.js')
const mWalletErrors = require('./mWalletErrors/fr.js')
const Languages = require('./Languages/all.js')
const Default = require('./default/fr.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...Default.default
}
