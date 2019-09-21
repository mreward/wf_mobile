const isString = require('lodash/isString')
const isObject = require('lodash/isObject')
const get = require('lodash/get')

module.exports = function(wallet) {
    let content = 'import Vue from \'vue\';\n'
    let contentInit = ''

    const { plugins } = wallet.application.mainJsModules

    function __buildImport(modules, key) {
        Object.keys(modules).sort().forEach((item) => {
            const value = modules[item]
            const keys = `${key}${item}`
            const nameObj = keys.replace(/\//g, '')

            if (value === true) {
                contentInit += `        Vue.use(${nameObj});\n`
                content += `import ${nameObj} from '_CORE/plugins/vue/${key}${item}';\n`
            } else if (isString(value)) {
                contentInit += `        Vue.use(${nameObj});\n`
                content += `import ${nameObj} from '${value}';\n`
            } else if (isObject(value)) {
                const packageName = get(value, 'src')

                if (packageName) {
                    contentInit += `        Vue.use(${nameObj}, ${JSON.stringify(get(value, 'options', {}))});\n`
                    content += `import ${nameObj} from '${packageName}';\n`
                } else {
                    console.warn('packageName must be set in property src')
                }
            }
        })
    }

    __buildImport(plugins, '')

    content += '\nexport default {\n' +
        `    init() {\n${contentInit}` +
        '    },\n' +
        '};\n'

    return content
}
