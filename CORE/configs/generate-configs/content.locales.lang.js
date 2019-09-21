module.exports = function(wallet, pathProject) {
    const { locales = {} } = wallet.application.mainJsModules

    function __buildContent(list, lg) {
        let content = '/* DO NOT CHANGE: Auto-generated file */\n\n'
        let contentInit = ''

        list.forEach((item, index) => {
            content += `import Lang${index} from '${item}/${lg}';\n`
            contentInit += `    ...Lang${index},\n`
        })

        content += `import LangCORE${lg} from '_CORE/locales/${lg}';\n`
        content += `import LangApp${lg} from '_PROJECT_APP/src/locales/${lg}';\n`
        contentInit += `    ...LangCORE${lg},\n`
        contentInit += `    ...LangApp${lg},\n`

        content += '\nexport default {\n' +
            `    ${contentInit}` +
            '};\n'

        return content
    }

    /* LANG */
    const filesLocales = []

    const pathModules = {}
    Object.keys(locales).forEach((lg) => {
        locales[lg].forEach((path) => {
            pathModules[path.slice(0, -3)] = ''
        })
    })

    wallet.application.languages.forEach((lg) => {
        if (lg) {
            filesLocales.push({
                path: `${pathProject}locales/${lg}.js`,
                content: __buildContent(Object.keys(pathModules), lg)
            })
        }
    })

    if (filesLocales.length === 0) {
        const { languages } = wallet.application

        languages.forEach((lg) => {
            filesLocales.push({
                path: `${pathProject}locales/${lg}.js`,
                content: __buildContent([])
            })
        })
    }

    return filesLocales
}
