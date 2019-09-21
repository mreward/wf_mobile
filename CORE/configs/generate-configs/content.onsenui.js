const isString = require('lodash/isString')

module.exports = function(wallet) {
    let content = ''
    let contentInit = ''

    content += 'import Vue from \'vue\';\n' +
        'import VueOnsen from \'vue-onsenui/esm\';\n\n' +
        '// OnsenUI style\n' +
        'import \'onsenui/css/onsenui-core.css\';\n' +
        'import \'onsenui/css/onsen-css-components.css\';\n\n'

    contentInit += '        const OnsenComponents = {\n'

    const mainJsModules = wallet.application.mainJsModules

    Object.keys(mainJsModules.onsenUI).forEach((item) => {
        const value = mainJsModules.onsenUI[item]
        if (value === true) {
            content += `import ${item} from 'vue-onsenui/esm/components/${item}';\n`
            contentInit += `            ${item},\n`
        } else if (isString(value)) {
            content += `import ${item} from '${value}';\n`
            contentInit += `            ${item},\n`
        }
    })

    contentInit += '        };\n\n'

    content += '\nexport default {\n' +
        `    init() {\n${contentInit}` +
        '        Vue.use(VueOnsen);\n' +
        '        Object.values(OnsenComponents).forEach(c => Vue.component(c.name, c));\n' +
        '        Vue.prototype.$ons.disableAutoStatusBarFill();\n' +
        '    },\n' +
        '};\n'
    return content
}
