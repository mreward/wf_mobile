/* eslint-disable import/no-dynamic-require */

const path = require('path')

/**
 *
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    // копировать папки/файлы
    grunt.loadNpmTasks('grunt-contrib-copy')

    let stats = ''
    const statsPath = path.resolve(__dirname, '../../../stats.json')
    const isWalletsType = grunt.file.exists(statsPath)
    if (isWalletsType) {
        stats = require(statsPath)
    } else {
        console.log('Please run "yarn webpack-build"')
    }

    let { configs: configsToMerge, pathToModules } = require('../generate-configs/content.modules')(wallet)
    const replacePath = path.resolve(__dirname, '../..')
    // console.log(stats);

    let src = []
    stats.modules.forEach((item) => {
        src.push(item.identifier.replace(replacePath, './CORE'))

        if (item.issuerPath) {
            item.issuerPath.forEach((itemIssuerPath) => {
                if (typeof itemIssuerPath.id === 'string') {
                    src.push(itemIssuerPath.id.replace(replacePath, './CORE'))
                }
            })
        }

        if (item.reasons) {
            item.reasons.forEach((itemReason) => {
                if (typeof itemReason.module === 'string') {
                    src.push(itemReason.module.replace(replacePath, './CORE'))
                }
            })
        }

        src.push(item.name.replace(replacePath, './CORE'))
    })

    pathToModules.forEach((item) => {
        let el = item.replace(replacePath, './CORE')
        src.push(`${el}/**`)
        src.push(`${el}/.config.js`)
    })

    src.forEach((item) => {
        if (item.indexOf('/Base/') !== -1 && item.indexOf('/CORE/modules/') !== -1) {
            const modulePath = item.slice(0, item.indexOf('/Base/'))
            src.push(`${modulePath}/Base/**`)
            src.push(`${modulePath}/Base/.config.js`)
        }
    })

    if (configsToMerge.css) {
        configsToMerge.css.forEach((item) => {
            let el = item.replace('_CORE/modules/', './CORE/modules/')
            el = `${el.slice(0, el.lastIndexOf('/'))}/**`
            src.push(el)
        })
    }

    src = src.filter(item => item.indexOf('./CORE') === 0)

    console.log(src, null, '\t')

    grunt.config.merge({
        copy: {
            SourceCodeExport: {
                files: [
                    {
                        expand: true,
                        src: src,
                        dest: './EXPORT/'
                    },
                    {
                        expand: true,
                        cwd: `./projects/${wallet.name}/`,
                        src: [
                            '**',
                            'src/.config.main.js'
                        ],
                        dest: `./EXPORT/projects/${wallet.name}/`
                    }, {
                        expand: true,
                        cwd: './CORE/',
                        src: [
                            '*.js',
                            'configs/**',
                            'css/**',
                            'fonts/**',
                            'themes/Unicorn/**',
                            'project-template/index.hbs'
                        ],
                        dest: './EXPORT/CORE/'
                    }, {
                        expand: true,
                        cwd: './',
                        src: [
                            '*.*'
                        ],
                        dest: './EXPORT/'
                    }
                ]
            }
        }
    })

    grunt.task.run('copy:SourceCodeExport')
}
// TODO: wallet.js
// TODO: .lock
