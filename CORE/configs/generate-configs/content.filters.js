const isString = require('lodash/isString')

module.exports = function(wallet) {
    let content = ''
    let contentInit = ''
    let contentImportTop = 'import Vue from \'vue\';\n\n'

    const mainJsModules = wallet.application.mainJsModules

    Object.keys(mainJsModules.filters).forEach((item) => {
        const value = mainJsModules.filters[item]
        if (value === true) {
            content += `import ${item} from '_CORE/filters/${item}';\n`
            contentInit += `        Vue.filter('${item}', ${item});\n`
        } else if (isString(value)) {
            contentImportTop += `import ${item} from '${value}';\n`
            contentInit += `        Vue.filter('${item}', ${item});\n`
        }
    })

    content = contentImportTop + content

    content += '\n'
    content += 'export default {\n    init() {\n'
    content += contentInit
    content += '    },\n};\n'
    return content
}
