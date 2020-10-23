const isString = require('lodash/isString')
const isObject = require('lodash/isObject')

module.exports = function(wallet, type = 'modules') {
    let content = ''
    let contentInit = ''
    let contentImportBottom = ''

    const mainJsModules = wallet.application.mainJsModules

    function __buildImport(modules, key) {
        Object.keys(modules).sort().forEach((item) => {
            const value = modules[item]
            if (isObject(value)) {
                __buildImport(modules[item], `${key}${item}/`)
            } else {
                const keys = `${key}${item}`
                const nameObj = keys.replace(/\//g, '')

                if (value === true) {
                    contentInit += `    ${nameObj},\n`
                    content += `import ${nameObj} from '_CORE/store/${type}/${key}${item}';\n`
                } else if (isString(value)) {
                    const _path = `import ${nameObj} from '${value.replace('/store/modules/', `/store/${type}/`)}';\n`
                    contentInit += `    ${nameObj},\n`
                    if (value.indexOf('.') === 0) {
                        contentImportBottom += _path.replace('/modules/', `/${type}/`)
                    } else {
                        content += _path
                    }
                }
            }
        })
    }

    __buildImport(mainJsModules.store, '')

    content += contentImportBottom
    content += '\n'
    content += 'export default {\n'
    content += contentInit
    content += '};\n'
    return content
}
