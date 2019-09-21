const googleAnalitycs = require('./PagesGoogleAnalitycs/ru.js')
const masterpassErrors = require('./MasterpassErrors/en.js')
const validationsErrors = require('./validations-errors/en.js')
const mWalletErrors = require('./mWalletErrors/en.js')
const Languages = require('./Languages/all.js')
const globalManeyErrors = require('./GlobalManeyErrors/en.js')
const Default = require('./default/en.js')

export default {
    ...googleAnalitycs.default,
    ...masterpassErrors.default,
    ...validationsErrors.default,
    ...mWalletErrors.default,
    ...Languages.default,
    ...globalManeyErrors.default,
    ...Default.default
}
