module.exports = function(wallet) {
    let content = 'import Vue from \'vue\';\n'
    let contentInit = '        const locales = {\n'

    const { languages } = wallet.application

    languages.forEach((item) => {
        content += `import ${item} from '../locales/${item}';\n`
        content += `import 'moment/locale/${item === 'en' ? 'en-gb' : item}';\n`
        contentInit += `            ${item},\n`
    })

    contentInit += '        };\n\n'

    content += '\nexport default {\n' +
        `    init() {\n${contentInit}` +
        '        Vue.locales(locales);\n' +
        '    },\n' +
        '};\n'

    return content
}
