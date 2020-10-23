/* eslint-disable import/no-dynamic-require */
const path = require('path')

/**
 *
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    let exportFiles = []
    const exportConfigPath = path.resolve(__dirname, `../../../projects/${wallet.name}/export.config.js`)
    const isWalletsType = grunt.file.exists(exportConfigPath)
    if (isWalletsType) {
        exportFiles = require(exportConfigPath)
    } else {
        console.log(`Please create file 'export.config.js' in 'projects/${wallet.name}'`)
    }

    // копировать папки/файлы
    grunt.loadNpmTasks('grunt-contrib-copy')
    const pathReleaseAPK = `${grunt.option('pathBuild')}/Android/${wallet.name}.apk`
    const pathReleaseArm64APK = `${grunt.option('pathBuild')}/Android/${wallet.name}-arm64.apk`
    const pathDebugAPK = `${grunt.option('pathBuild')}/Android/${wallet.name}-debug.apk`
    return {
        copy: {
            android_release: {
                files: [
                    {
                        src: `./projects/${wallet.name}/platforms/android/build/outputs/apk/android-armv7-release.apk`,
                        dest: pathReleaseAPK
                    }, {
                        src: `./projects/${wallet.name}/platforms/android/build/outputs/apk/android-release.apk`,
                        dest: pathReleaseAPK
                    }, {
                        src: `./projects/${wallet.name}/platforms/android/build/outputs/apk/armv7/release/android-armv7-release.apk`,
                        dest: pathReleaseAPK
                    }, {
                        src: `./projects/${wallet.name}/platforms/android/build/outputs/apk/arm64/release/android-arm64-release.apk`,
                        dest: pathReleaseArm64APK
                    }, {
                        src: `./projects/${wallet.name}/platforms/android/app/build/outputs/apk/release/app-release.apk`,
                        dest: pathReleaseAPK
                    }]
            },

            android_debug: {
                files: [
                    {
                        src: `./projects/${wallet.name}/platforms/android/build/outputs/apk/android-armv7-debug.apk`,
                        dest: pathDebugAPK
                    }, {
                        src: `./projects/${wallet.name}/platforms/android/build/outputs/apk/android-debug.apk`,
                        dest: pathDebugAPK
                    }, {
                        src: `./projects/${wallet.name}/platforms/android/build/outputs/apk/armv7/debug/android-armv7-debug.apk`,
                        dest: pathDebugAPK
                    }, {
                        src: `./projects/${wallet.name}/platforms/android/app/build/outputs/apk/debug/app-debug.apk`,
                        dest: pathDebugAPK
                    }]
            },

            GoogleServiceInfoIOS: {
                files: [
                    {
                        src: `./projects/${wallet.name}/${wallet.application.GoogleServiceInfoIOS}`,
                        dest: `./projects/${wallet.name}/GoogleService-Info.plist`
                    }]
            },

            SourceCodeExport: {
                files: [
                    {
                        expand: true,
                        src: exportFiles,
                        dest: `./projects/${wallet.name}/EXPORT/${wallet.name}/`
                    }

                ]
            },

            CreateProject: {
                files: [
                    {
                        expand: true,
                        cwd: './projects/mWalletDemo/src',
                        src: '**',
                        dest: `./projects/${grunt.option('name')}/src`
                    }, {
                        expand: true,
                        flatten: true,
                        src: [
                            './projects/mWalletDemo/build.json',
                            './projects/mWalletDemo/config.app.js',
                            './projects/mWalletDemo/mWallet.keystore',
                            './projects/mWalletDemo/CHANGELOG.js'
                        ],
                        dest: `./projects/${grunt.option('name')}/`
                    }, {
                        expand: true,
                        flatten: true,
                        src: [
                            './projects/mWalletDemo/src/.config.main.js'
                        ],
                        dest: `./projects/${grunt.option('name')}/src/`
                    }
                ]
            }
        }
    }
}
