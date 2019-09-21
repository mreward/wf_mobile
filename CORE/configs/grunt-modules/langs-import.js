/* eslint-disable import/no-dynamic-require,import/no-extraneous-dependencies */
require('@babel/register')
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')

module.exports = function({ grunt, wallet }) {
    try {
        const replace = grunt.option('replace') || false

        console.log(wallet)
        const exelObject = excelToJson({
            source: fs.readFileSync(`${wallet.name}-langs.xlsx`),
            header: {
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        })

        const keysObj = Object.keys(exelObject)
        const result = exelObject[keysObj[0]]

        // BUILD ARRAY LANGS
        const json = {}
        let obj = {}
        result.forEach((item) => {
            if (item.KEY.indexOf('#') === 0) {
                obj = {}
                json[item.KEY.replace('#', '')] = obj
            } else {
                let key = ''
                Object.keys(item).forEach((langKey) => {
                    if (langKey !== 'KEY') {
                        if (!obj[langKey]) {
                            obj[langKey] = {
                                [key]: ''
                            }
                        } else {
                            obj[langKey][key] = item[langKey]
                        }
                    } else {
                        key = item[langKey]
                    }
                })
            }
        })

        Object.keys(json).forEach((folder) => {
            Object.keys(json[folder]).forEach((lang) => {
                // MERGE
                const path = `${folder}${lang}.js`
                const pathProject = `./projects/${wallet.name}/src/locales/${lang}.js`

                if (grunt.file.exists(path)) {
                    const langExel = json[folder][lang]
                    const langCore = require(`../../.${path}`).default
                    const langProject = require(`../../.${pathProject}`).default

                    Object.keys(langExel).forEach((langExelKey) => {
                        // if the translation is different
                        if (langExel[langExelKey] && langCore[langExelKey] && langExel[langExelKey].trim() !== langCore[langExelKey].trim()) {
                            console.log(`------${langExelKey}-----`)
                            console.log(langExel[langExelKey].trim())
                            console.log(langCore[langExelKey].trim())

                            if (replace) {
                                langCore[langExelKey] = langExel[langExelKey].trim()
                            } else {
                                langProject[langExelKey] = langExel[langExelKey].trim()
                            }
                        }
                    })

                    // if the translation is different then overwrite
                    if (replace) {
                        let content = 'export default {\n'
                        const linstKeys = Object.keys(langCore).sort()
                        linstKeys.forEach((lngObjKey, index) => {
                            const comma = linstKeys.length - 1 === index ? '' : ','
                            content += `    ${lngObjKey}: '${langCore[lngObjKey].replace(/\'/g, '\\\'')}'${comma}\n`
                        })
                        content += '}\n'

                        grunt.file.write(path, content)
                    } else {
                        let content = 'export default {\n'
                        const linstKeys = Object.keys(langProject).sort()
                        linstKeys.forEach((lngObjKey, index) => {
                            const comma = linstKeys.length - 1 === index ? '' : ','
                            content += `    ${lngObjKey}: '${langProject[lngObjKey].replace(/\'/g, '\\\'')}'${comma}\n`
                        })
                        content += '}\n'

                        grunt.file.write(pathProject, content)
                    }
                }
            })
        })
    } catch (e) {
        console.error(e)
    }
}
