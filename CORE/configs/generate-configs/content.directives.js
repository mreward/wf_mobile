const isString = require('lodash/isString')

module.exports = function(wallet) {
    let content = ''
    let contentInit = ''
    let contentImportTop = 'import Vue from \'vue\';\n\n'

    const mainJsModules = wallet.application.mainJsModules

    Object.keys(mainJsModules.directives).forEach((item) => {
        const value = mainJsModules.directives[item]
        if (value === true) {
            content += `import ${item} from '_CORE/directives/${item}';\n`
            contentInit += `        Vue.directive(${item}.name || '${item}', ${item});\n`
        } else if (isString(value)) {
            contentImportTop += `import ${item} from '${value}';\n`
            contentInit += `        Vue.directive(${item}.name || '${item}', ${item});\n`
        }
    })

    content = contentImportTop + content

    content += '\n'
    content += 'export default {\n    init() {\n'
    content += contentInit
    content += '    },\n};\n'
    return content
}
