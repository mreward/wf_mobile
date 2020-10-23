const upperFirst = require('lodash/upperFirst')
const set = require('lodash/set')
const get = require('lodash/get')
const isString = require('lodash/isString')

/**
 * generator web-font from SVG icons
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt }) {
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')

    const defaultSVG = './CORE/**/*.md'
    const files = grunt.file.expand([defaultSVG, './projects/*/README.md'])

    // const filesProject = grunt.file.expand('./projects/*/README.md');

    const filesGrunt = []
    if (files.length) {
        files.forEach((file) => {
            const a = file.split('/')
            let dest = ''
            if (a[1] === 'projects') {
                dest = `./docs/mWallet_v4.wiki/${upperFirst(a[1].toLowerCase())}/${a[a.length - 2]}.md`
            } else {
                dest = `./docs/mWallet_v4.wiki/${upperFirst(a[1].toLowerCase())}/${a[2]}/${a[a.length - 2]}.md`
            }

            filesGrunt.push({
                src: file,
                dest
            })
        })
    } else {
        return
    }

    grunt.config.merge({
        copy: {
            docsMd: {
                files: filesGrunt
            }
        }
    })

    grunt.task.run('copy:docsMd')

    // BUILD MAPS
    const filesMD = grunt.file.expand('./docs/mWallet_v4.wiki/**/*.md')
    const mapMD = {}
    if (filesMD.length) {
        filesMD.forEach((file) => {
            const a = file.replace('\./docs/mWallet_v4.wiki/', '').split('/')

            const obj = get(mapMD, a.slice(0, a.length - 1).join('.'), {})
            set(mapMD, a.slice(0, a.length - 1).join('.'), {
                ...obj,
                [a[a.length - 1]]: a[a.length - 1].replace('.md', '')
            })
        })
    }

    let contentSideMenu = '##### [Home](Home)\n'
    function _parseObjRoute(obj, content = '', par = '', url = '') {
        let contentReturn = content
        // SORT string and later object
        if (obj['_sidebar.md']) {
            delete obj['_sidebar.md']
        }

        const keys = Object.keys(obj)

        keys.sort((a, b) => {
            if (isString(obj[a])) {
                return -1
            }
            if (isString(obj[b])) {
                return 1
            }
            return 0
        })

        keys.forEach((key, index) => {
            if (isString(obj[key])) {
                contentReturn += `${par}${index + 1}. [${obj[key]}](${url}${obj[key]})     \n`
            } else {
                contentReturn += `#####${par ? '#' : ''} ${par}${index + 1} ${key}    \n`

                contentReturn += _parseObjRoute(obj[key], '', `${par}${index + 1}.`, `${url}${key}/`)
            }
        })
        return contentReturn
    }

    contentSideMenu = _parseObjRoute(mapMD, contentSideMenu)

    grunt.file.write('./docs/mWallet_v4.wiki/home.md', contentSideMenu)
    grunt.file.write('./docs/mWallet_v4.wiki/_sidebar.md', contentSideMenu)

    console.log(contentSideMenu)
}
