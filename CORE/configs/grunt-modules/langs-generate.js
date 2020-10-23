/* eslint-disable import/no-extraneous-dependencies,import/no-dynamic-require,no-unused-expressions,no-await-in-loop,no-restricted-syntax */
require('@babel/register')
const forEach = require('lodash/forEach')
const googleTranslate = require('google-translate')('AIzaSyDCzLtQXHDMZu-u3hfiVNoiZtOtMzGBRO8')

const languages = require('../langs')

function translate(text, lang, fromLang = 'ru') {
    return new Promise((resolve, reject) => {
        googleTranslate.translate(text, fromLang, lang, (err, translation) => {
            if (err) {
                reject(err)
            } else {
                resolve(translation.translatedText)
            }
        })
    })
}

module.exports = function({ grunt, wallet }) {
    const sync = grunt.option('sync') || false

    const folders = {}
    const filePattern = './CORE/modules/**/locales/**/*.js'
    const files = grunt.file.expand(filePattern)

    if (files.length) {
        files.forEach((file) => {
            folders[file.slice(0, -5)] = ''
        })
    }

    if (sync) {
        folders[`./projects/${wallet.name}/src/locales/`] = ''
    }

    folders['./CORE/locales/default/'] = ''
    folders['./CORE/locales/GlobalManeyErrors/'] = ''
    folders['./CORE/locales/MasterpassErrors/'] = ''
    folders['./CORE/locales/mWalletErrors/'] = ''
    folders['./CORE/locales/validations-errors/'] = ''
    folders['./CORE/locales/iOSUsegeDescription/'] = ''

    grunt.registerTask('translate-lang', async function() {
        const done = this.async()

        for (const folder of Object.keys(folders)) {
            const langs = {}
            let LANGS = languages
            if (folder.indexOf('./projects/') === 0) {
                LANGS = wallet.application.languages
            }

            forEach(LANGS, (lang) => {
                const path = `${folder}${lang}.js`
                if (!grunt.file.exists(path)) {
                    grunt.file.write(path, 'export default {\n\n}')
                }

                langs[lang] = require(`../../.${path}`).default
            })

            // BUILD ALL KEYS
            let fileKeys = {}
            Object.keys(langs).forEach((key) => {
                const _obj = {}
                Object.keys(langs[key]).forEach((itemKey) => {
                    _obj[itemKey] = ''
                })

                fileKeys = {
                    ...fileKeys,
                    ..._obj
                }
            })

            // ADD keys and translate (default en)
            for (const langKey of Object.keys(langs)) {
                const lngObj = langs[langKey]

                for (const fileKeysKey of Object.keys(fileKeys)) {
                    if (!lngObj[fileKeysKey]) {
                        const fromLang = Object.keys(langs).find(l => !!langs[l][fileKeysKey])
                        if (fromLang) {
                            try {
                                const result = await translate(langs[fromLang][fileKeysKey], langKey, fromLang)
                                lngObj[fileKeysKey] = result
                            } catch (e) {
                                console.log(e)
                            }
                        } else {
                            lngObj[fileKeysKey] = ''
                        }
                    }
                }

                let content = 'export default {\n'

                const linstKeys = Object.keys(lngObj).sort()
                linstKeys.forEach((lngObjKey, index) => {
                    const comma = linstKeys.length - 1 === index ? '' : ','
                    content += `    ${lngObjKey}: '${lngObj[lngObjKey].replace(/\'/g, '\\\'')}'${comma}\n`
                })
                content += '}\n'

                const path = `${folder}${langKey}.js`
                grunt.file.write(path, content)
            }
        }

        done()
    })

    // grunt.registerTask('create-lang-ios', function() {
    //     const LANGS = wallet.application.languages
    //
    //     LANGS.forEach((lang) => {
    //         const langs = require(`../../../CORE/__configs.generate__/locales/${lang}.js`)
    //
    //         debugger;
    //     })
    // })

    grunt.task.run([
        'translate-lang'
        // 'create-lang-ios'
    ])
}
