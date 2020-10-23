/**
 * создание сплешскринов
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    // авто генерация сплеш скринов
    grunt.loadNpmTasks('grunt-phonegapsplash')

    const walletName = grunt.option('name') || wallet.name

    return {
        phonegapsplash: {
            all: {
                // Source file: the PNG.
                src: `./projects/${walletName}/src/img/splash.png`,
                // Destination directory where are stored all splashscreens
                dest: `./projects/${walletName}/`,
                // Optionnal, it produces splashscreen and layout
                // for all phonegap targets if not specified
                options: {
                    prjName: walletName,
                    // A list of layouts, it produces landscape and portrait if not specified
                    layouts: ['portrait'],
                    // A  list of phone targets, it produces android,
                    // bada, blackberry, ios, webos, windows-phone if not specified
                    profiles: ['ios', 'android']
                }
            }
        }
    }
}
