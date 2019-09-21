const isString = require('lodash/isString')
const isObject = require('lodash/isObject')

module.exports = function(wallet) {
    let content = 'import Vue from \'vue\';\n'
    let contentInit = '        const mixins = {\n'

    const { mixins } = wallet.application.mainJsModules

    function __buildImport(modules, key) {
        Object.keys(modules).sort().forEach((item) => {
            const value = modules[item]
            if (isObject(value)) {
                __buildImport(modules[item], `${key}${item}/`)
            } else {
                const keys = `${key}${item}`
                const nameObj = keys.replace(/\//g, '')

                if (value === true) {
                    contentInit += `            ${nameObj},\n`
                    content += `import ${nameObj} from '_CORE/mixins/common/${key}${item}';\n`
                } else if (isString(value)) {
                    contentInit += `            ${nameObj},\n`
                    content += `import ${nameObj} from '${value}';\n`
                }
            }
        })
    }

    __buildImport(mixins, '')

    contentInit += '        };\n\n'

    content += '\nexport default {\n' +
        `    init() {\n${contentInit}` +
        '        Object.values(mixins).forEach(m => Vue.mixin(m));\n' +
        '    },\n' +
        '};\n'

    return content
}
