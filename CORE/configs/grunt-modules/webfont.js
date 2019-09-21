/**
 * generator web-font from SVG icons
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet, pathToModules }) {
    // для генерации web-fonts с SVG Icon
    grunt.loadNpmTasks('grunt-webfont')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')

    let src = []
    const defaultSVG = `./projects/${wallet.name}/src/img/icons/*.svg`
    if (pathToModules) {
        src = pathToModules.map(item => `${item}/img/icons/*.svg`)
        src.push(defaultSVG)
    } else {
        src = [defaultSVG]
    }

    const tmpPath = './CORE/__tmp__/'

    grunt.config.merge({
        copy: {
            icons: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src,
                        dest: tmpPath
                    }

                ]
            }
        },
        webfont: {
            icons: {
                src: `${tmpPath}*.svg`,
                dest: `./projects/${wallet.name}/src/fonts/icons`,
                destCss: `./projects/${wallet.name}/src/fonts/icons`,
                options: {
                    // font: wallet.name,
                    template: './CORE/fonts/Icons/template.css',
                    fontFilename: wallet.name,
                    htmlDemoTemplate: './CORE/fonts/Icons/index.html',
                    htmlDemo: true
                }
            }
        },
        clean: [tmpPath]
    })

    grunt.task.run('copy:icons')
    grunt.task.run('webfont:icons')
    grunt.task.run('clean')
}
