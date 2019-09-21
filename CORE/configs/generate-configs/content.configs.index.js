const isString = require('lodash/isString')

module.exports = function(wallet) {
    let content = ''
    let contentInit = ''
    let contentImportTop = ''

    content += 'import onsenUI from \'./onsenUI\';\n'
    content += 'import directives from \'./directives\';\n'
    content += 'import filters from \'./filters\';\n'
    content += 'import components from \'./components\';\n'
    content += 'import plugins from \'./plugins\';\n'
    content += 'import mixins from \'./mixins\';\n'

    contentInit += '    await onsenUI.init({config});\n'
    contentInit += '    await directives.init({config});\n'
    contentInit += '    await filters.init({config});\n'
    contentInit += '    await components.init({config});\n'
    contentInit += '    await plugins.init({config});\n'
    contentInit += '    await mixins.init({config});\n'

    const mainJsModules = wallet.application.mainJsModules

    Object.keys(mainJsModules).forEach((item) => {
        const value = mainJsModules[item]
        if (value === true) {
            content += `import ${item} from './${item}';\n`
            contentInit += `    await ${item}.init({config});\n`
        } else if (isString(value)) {
            contentImportTop += `import ${item} from '${value}';\n`
            contentInit += `    await ${item}.init({config});\n`
        }
    })

    content = contentImportTop + content

    content += '\n'
    content += 'export default async function ({config}) {\n'
    content += contentInit
    content += '}\n'
    return content
}
