const isString = require('lodash/isString')
const isObject = require('lodash/isObject')

module.exports = function(wallet) {
    let content = 'import Vue from \'vue\';\n'
    let contentInit = '        const components = {\n'

    const { components } = wallet.application.mainJsModules

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
                    content += `import ${nameObj} from '_CORE/components/common/${key}${item}';\n`
                } else if (isString(value)) {
                    contentInit += `            ${nameObj},\n`
                    content += `import ${nameObj} from '${value}';\n`
                }
            }
        })
    }

    __buildImport(components, '')

    contentInit += '        };\n\n'

    content += '\nexport default {\n' +
        `    init() {\n${contentInit}` +
        '        Object.values(components).forEach(c => Vue.component(c.name, c));\n' +
        '    },\n' +
        '};\n'

    return content
}
