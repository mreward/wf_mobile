/* eslint-disable import/no-extraneous-dependencies,import/no-dynamic-require,no-unused-expressions,no-restricted-syntax */
require('@babel/register')
const forEach = require('lodash/forEach')
const isString = require('lodash/isString')
const isEmpty = require('lodash/isEmpty')
const json2xls = require('json2xls')
const fs = require('fs')
const mergeWith = require('lodash/mergeWith')
const cloneDeep = require('lodash/cloneDeep')
const isArray = require('lodash/isArray')

let languages = require('../langs')

function createExel(obj, wallet) {
    try {
        const langs = {
            KEY: ''
        }
        languages.forEach((langKey) => {
            langs[langKey] = ''
        })

        const json = []
        obj.forEach((item) => {
            if (!isEmpty(item)) {
                if (isString(item)) {
                    langs.KEY = item
                    json.push({
                        ...langs
                    })
                } else {
                    const firstEl = Object.keys(item)[0]
                    Object.keys(item[firstEl]).forEach((key) => {
                        const result = {
                            KEY: key
                        }
                        Object.keys(item).forEach((langKey) => {
                            result[langKey.toLowerCase()] = item[langKey][key]
                        })
                        json.push(result)
                    })
                }
            }
        })

        const xls = json2xls(json)

        fs.writeFileSync(`${wallet ? wallet.name : 'mWallet'}-langs.xlsx`, xls, 'binary')
    } catch (e) {
        console.log(e)
    }
}

module.exports = function({ grunt, wallet }) {
    function _customizer(objValue, srcValue) {
        if (isArray(objValue)) {
            return objValue.concat(srcValue)
        }
    }

    const pathModules = {}

    if (wallet) {
        languages = wallet.application.languages
        const {
            configs: configsToMerge
        } = require('../generate-configs/content.modules')(wallet)

        // merge new configs with mainJsModules
        const mainJsModules = cloneDeep(wallet.application.mainJsModules)
        wallet.application.mainJsModules = mergeWith(mainJsModules, configsToMerge, _customizer)
        const {locales = {}} = wallet.application.mainJsModules

        Object.keys(locales).forEach((lg) => {
            locales[lg].forEach((path) => {
                pathModules[path.slice(0, -2).replace('_CORE', './CORE').replace('_PROJECT/', './')] = ''
            })
        })
    }

    pathModules['./CORE/locales/default/'] = ''
    // pathModules['./CORE/locales/GlobalManeyErrors/'] = '';
    // pathModules['./CORE/locales/MasterpassErrors/'] = '';
    pathModules['./CORE/locales/mWalletErrors/'] = ''
    pathModules['./CORE/locales/validations-errors/'] = ''

    if (wallet) {
        pathModules[`./projects/${wallet.name}/src/locales/`] = ''
    } else {
        const filePattern = './CORE/modules/**/locales/**/*.js'
        const files = grunt.file.expand(filePattern)

        if (files.length) {
            files.forEach((file) => {
                pathModules[file.slice(0, -5)] = ''
            })
        }
    }

    const srcModules = Object.keys(pathModules)
    // -------------------------------------------------

    const langsAll = []

    for (const folder of srcModules) {
        const langs = {}
        forEach(languages, (lang) => {
            const path = `${folder}${lang}.js`
            if (!grunt.file.exists(path)) {
                grunt.file.write(path, 'export default {\n\n}')
            }

            langs[lang] = require(`../../.${path}`).default
        })

        const objAll = {}
        // ADD keys and translate (default en)
        for (const langKey of Object.keys(langs)) {
            const lngObj = langs[langKey]

            Object.keys(lngObj).sort().forEach((lngObjKey) => {
                if (!objAll[langKey]) {
                    objAll[langKey] = {}
                }
                objAll[langKey][lngObjKey] = lngObj[lngObjKey]
            })
        }
        // TODO: генерить один файл

        if (srcModules.find(item => item === folder)) {
            langsAll.push(`#${folder}`)
            langsAll.push(objAll)
        }
    }

    createExel(langsAll, wallet)
}
