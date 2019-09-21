const isObject = require('lodash/isObject')
const isString = require('lodash/isString')

module.exports = function(wallet) {
    const { modules = {} } = wallet.application.mainJsModules

    let content = ''
    let contentInit = ''
    function __buildImport(object, key) {
        Object.keys(object).sort().forEach((item) => {
            const value = object[item]
            if (isObject(value)) {
                __buildImport(object[item], `${key}${item}/`)
            } else {
                const keys = `${key}${item}`
                const nameObj = keys.replace(/\//g, '')

                if (value === true) {
                    content += `const ${nameObj} = require('../../modules/${key}${item}/register.js');\n`
                    contentInit += `    ...${nameObj}(dirname),\n`
                } else if (isString(value)) {
                    content += `const ${nameObj} = require('../../../${value}/register.js');\n`
                    contentInit += `    ...${nameObj}(dirname),\n`
                }
            }
        })
    }

    __buildImport(modules, '')

    content += '\nmodule.exports = dirname => ({\n' +
        `    ${contentInit}` +
        '});\n'

    return content
}
