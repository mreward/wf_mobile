const path = require('path')

/**
 * cordova cli
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    // Cordova
    grunt.loadNpmTasks('grunt-cordovacli')

    const walletName = grunt.option('name') || wallet.name

    return {
        cordovacli: {
            options: {
                path: path.resolve(__dirname, `../../../projects/${walletName}`),
                cli: 'cordova'
            },
            compile_release_android: {
                options: {
                    command: 'compile',
                    platforms: ['android'],
                    args: ['--release']
                }
            },
            compile_release_ios: {
                options: {
                    command: 'build',
                    platforms: ['ios'],
                    args: ['--release']
                }
            },
            compile_debug_android: {
                options: {
                    command: 'compile',
                    platforms: ['android']
                }
            },
            prepare_android: {
                options: {
                    command: 'prepare',
                    platforms: ['android']
                }
            },
            prepare_ios: {
                options: {
                    command: 'prepare',
                    platforms: ['ios']
                }
            },
            create: {
                options: {
                    path: path.resolve(__dirname, `../../../projects/${walletName}`),
                    command: 'create',
                    id: grunt.option('id'),
                    name: grunt.option('name')
                }
            },
            add_platforms: {
                options: {
                    path: path.resolve(__dirname, `../../../projects/${walletName}`),
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios@latest', 'android@latest']
                }
            },

            addPlatformsIos: {
                options: {
                    path: path.resolve(__dirname, `../../../projects/${walletName}`),
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios@latest']
                }
            },

            addPlatformsAndroid: {
                options: {
                    path: path.resolve(__dirname, `../../../projects/${walletName}`),
                    command: 'platform',
                    action: 'add',
                    platforms: ['android@latest']
                }
            },

            add_plugins: {
                options: {
                    path: path.resolve(__dirname, `../../../projects/${walletName}`),
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'https://github.com/wizpanda/cordova-plugin-firebase-lib.git',
                        'cordova-plugin-android-permissions',
                        'cordova-plugin-device',
                        'cordova-plugin-device-motion',
                        'cordova-plugin-file',
                        'cordova-plugin-file-transfer',
                        'cordova-plugin-inappbrowser',
                        'cordova-plugin-network-information',
                        'cordova-plugin-shake',
                        'cordova-plugin-splashscreen',
                        {
                            name: 'cordova-plugin-touch-id',
                            args: [
                                '--variable',
                                'FACEID_USAGE_DESCRIPTION=For quick authentication.',
                                '--save'
                            ]
                        },
                        'cordova-plugin-whitelist',
                        'cordova-plugin-x-socialsharing',
                        'cordova-plugin-appavailability',
                        'cordova-plugin-ios-keychain',
                        {
                            name: 'cordova-plugin-camera',
                            args: [
                                '--variable',
                                'CAMERA_USAGE_DESCRIPTION=The camera is used to scan QR codes.',
                                '--variable',
                                'PHOTOLIBRARY_USAGE_DESCRIPTION=This app requires photo library access to function properly.',
                                '--save'
                            ]
                        },
                        'cordova-plugin-datepicker',
                        'cordova-plugin-listpicker',
                        'cordova-plugin-qrscanner',
                        // 'cordova-plugin-ionic-webview@2.4.1',
                        'https://github.com/oarsheo/cordova-plugin-android-fingerprint-auth.git',
                        'cordova-plugin-ionic-keyboard',
                        {
                            name: 'cordova-plugin-google-analytics',
                            args: [
                                '--variable',
                                'GMS_VERSION=11.0.1',
                                '--save'
                            ]
                        },
                        'com.verso.cordova.clipboard',
                        'https://github.com/oarsheo/cordova-plugin-statusbar.git',
                        'cordova-android-support-gradle-release',
                        // 'cordova-plugin-crosswalk-webview',
                        'https://github.com/oarsheo/cordova-plugin-decimal-keyboard-wkwebview.git',
                        'cordova-plugin-ionic-webview',
                        'cordova-plugin-androidx',
                        'cordova-plugin-androidx-adapter'
                    ],
                    args: ['--save']
                }
            }
        }
    }
}
