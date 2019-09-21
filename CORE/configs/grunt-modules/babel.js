/**
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    // для загрузки апк на hockeyapp
    grunt.loadNpmTasks('grunt-babel')

    return {
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    expand: true,
                    src: [
                        `./projects/${wallet.name}/platforms/ios/platform_www/**/*.js`
                    ],
                    dest: `./projects/${wallet.name}/platforms/ios/platform_www/`
                }
            }
        }
    }
}
