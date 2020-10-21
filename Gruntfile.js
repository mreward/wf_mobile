/* eslint-disable import/no-dynamic-require,no-template-curly-in-string */
const axios = require('axios')
const moment = require('moment')
const configPath = './wallets.config.js'

module.exports = function (grunt) {
    grunt.task.registerTask('build', '', () => {
        const isWalletsConfig = grunt.file.exists('./wallets.config.js')
        if (isWalletsConfig) {
            const wallet = require('./wallets.config.js').wallet

            grunt.option('pathBuild', require('./CORE/configs/grunt-modules/utils').getPathBuild(wallet.name))

            // Сжатие картинок
            const imagemin = require('./CORE/configs/grunt-modules/imagemin')({ grunt, wallet })
            grunt.config.merge(imagemin)

            // Выполнение скриптов в коммандной строке
            const shell = require('./CORE/configs/grunt-modules/shell')({ grunt, wallet })
            grunt.config.merge(shell)

            // Создание иконок
            const gmPicturefill = require('./CORE/configs/grunt-modules/gm_picturefill')({ grunt, wallet })
            grunt.config.merge(gmPicturefill)

            // Создание иконок
            const phonegapsplash = require('./CORE/configs/grunt-modules/phonegapsplash')({ grunt, wallet })
            grunt.config.merge(phonegapsplash)

            // Загрузка apk/ipa на appcenter
            const appcenter = require('./CORE/configs/grunt-modules/appcenter')({ grunt, wallet })
            grunt.config.merge(appcenter)

            // cordova cli
            const cordovacli = require('./CORE/configs/grunt-modules/cordovacli')({ grunt, wallet })
            grunt.config.merge(cordovacli)

            const copy = require('./CORE/configs/grunt-modules/copy')({ grunt, wallet })
            grunt.config.merge(copy)

            // преезапись строк в файлах
            const replace = require('./CORE/configs/grunt-modules/replace')({ grunt, wallet })
            grunt.config.merge(replace)
            grunt.registerTask('default', ['webpack:dev'])

            grunt.registerTask('gm_picturefill:android', [
                'gm_picturefill:ldpi',
                'gm_picturefill:ldpiBackgroundV26',
                'gm_picturefill:ldpiForegroundV26',
                'gm_picturefill:ldpiNotifications',
                'gm_picturefill:mdpi',
                'gm_picturefill:mdpiBackgroundV26',
                'gm_picturefill:mdpiForegroundV26',
                'gm_picturefill:mdpiNotifications',
                'gm_picturefill:hdpi',
                'gm_picturefill:hdpiBackgroundV26',
                'gm_picturefill:hdpiForegroundV26',
                'gm_picturefill:hdpiNotifications',
                'gm_picturefill:xhdpi',
                'gm_picturefill:xhdpiBackgroundV26',
                'gm_picturefill:xhdpiForegroundV26',
                'gm_picturefill:xhdpiNotifications',
                'gm_picturefill:xxhdpi',
                'gm_picturefill:xxhdpiBackgroundV26',
                'gm_picturefill:xxhdpiForegroundV26',
                'gm_picturefill:xxhdpiNotifications',
                'gm_picturefill:xxxhdpi',
                'gm_picturefill:xxxhdpiBackgroundV26',
                'gm_picturefill:xxxhdpiForegroundV26',
                'gm_picturefill:xxxhdpiNotifications',
            ])

            grunt.registerTask('build android', [
                'generate-config',
                'replace:DateBuild',
                'replace:IndexHtmlTitle',
                'webpack:prod',
                'replace:BundleID',

                'cordovacli:prepare_android',
                'replace:VersionCodeAndroid',
                'replace:ResXmlConfigAndroid',

                'cordovacli:compile_debug_android',
                'copy:android_debug'
            ])

            grunt.registerTask('build android r', '', () => {
                const tasks = [
                    'generate-config',
                    'replace:DateBuild',
                    'replace:IndexHtmlTitle',
                    'webpack:prod',
                    'replace:BundleID',

                    'cordovacli:prepare_android',
                    'replace:VersionCodeAndroid',
                    'replace:ResXmlConfigAndroid',

                    'cordovacli:compile_release_android',
                    'copy:android_release',
                    'appcenter:android'
                ]

                const wallet = require('./wallets.config.js').wallet

                if (wallet.application.hockeyArm64AppID) {
                    tasks.push(...[
                        // Arm64
                        'replace:SetArm64Android',
                        'cordovacli:prepare_android',
                        'replace:VersionCodeAndroid',
                        'replace:ResXmlConfigAndroid',
                        'cordovacli:compile_release_android',
                        'replace:RemoveArm64Android',

                        'copy:android_release',
                        'appcenter:androidArm64'
                    ])
                }
                grunt.task.run(tasks)
            })

            grunt.registerTask('build ios r', [
                'generate-config',
                'replace:DateBuild',
                'replace:IndexHtmlTitle',
                'webpack:prod',
                'replace:BundleID',
                'copy:GoogleServiceInfoIOS',

                'cordovacli:prepare_ios',
                'replace:CFBundleDisplayNameIOS',
                'replace:CFBundleVersionIOS',

                'shell:xcodebuild_xcarchive',
                'shell:xcodebuild_exportArchive',
                'appcenter:ios'
            ])

            grunt.registerTask('build all store', '', () => {
                const tasks = [
                    'generate-config',
                    'replace:DateBuild',
                    'replace:IndexHtmlTitle',
                    'webpack:prod',
                    'replace:BundleID',
                    'copy:GoogleServiceInfoIOS',

                    'cordovacli:prepare_ios',
                    'replace:CFBundleDisplayNameIOS',
                    'replace:CFBundleVersionIOS',

                    'shell:xcodebuild_xcarchive',
                    'shell:xcodebuild_exportArchive_store',
                    'shell:altool_app_store',

                    'cordovacli:prepare_android',
                    'replace:VersionCodeAndroid',
                    'replace:ResXmlConfigAndroid',
                    'cordovacli:compile_release_android',

                    'copy:android_release',
                    'appcenter:android'
                ]

                const wallet = require('./wallets.config.js').wallet

                if (wallet.application.hockeyArm64AppID) {
                    tasks.push(...[
                        // Arm64
                        'replace:SetArm64Android',
                        'cordovacli:prepare_android',
                        'replace:VersionCodeAndroid',
                        'replace:ResXmlConfigAndroid',
                        'cordovacli:compile_release_android',
                        'replace:RemoveArm64Android',

                        'copy:android_release',
                        'appcenter:androidArm64'
                    ])
                }
                grunt.task.run(tasks)
            })

            grunt.registerTask('build ios', [
                'generate-config',
                'replace:DateBuild',
                'replace:IndexHtmlTitle',
                'webpack:prod',
                'replace:BundleID',
                'copy:GoogleServiceInfoIOS',

                'cordovacli:prepare_ios',
                'replace:CFBundleDisplayNameIOS',
                'replace:CFBundleVersionIOS'
            ])

            grunt.registerTask('build all r', '', () => {
                grunt.task.run([
                    'generate-config',
                    'replace:DateBuild',
                    'replace:IndexHtmlTitle',
                    'webpack:prod',
                    'replace:BundleID',

                    'copy:GoogleServiceInfoIOS',
                    'cordovacli:prepare_ios',
                    'replace:CFBundleDisplayNameIOS',
                    'replace:CFBundleVersionIOS',
                    'shell:xcodebuild_xcarchive',
                    'shell:xcodebuild_exportArchive',
                    'appcenter:ios',

                    'cordovacli:prepare_android',
                    'replace:VersionCodeAndroid',
                    'replace:ResXmlConfigAndroid',
                    'cordovacli:compile_release_android',
                    'copy:android_release',
                    'appcenter:android'
                ])
            })

            grunt.registerTask('create', '', () => {
                // DELETE FILES THAT WE DO NOT NEED
                grunt.registerTask('clear-project-tmp-file', 'Delete files that we do not need', () => {
                    const deleteFiles = [
                        `./projects/${grunt.option('name')}/hooks`,
                        `./projects/${grunt.option('name')}/.npmignore`,
                        `./projects/${grunt.option('name')}/package.json`,
                        `./projects/${grunt.option('name')}/res/**`
                    ]

                    deleteFiles.forEach((item) => {
                        const isFile = grunt.file.exists(item)
                        if (isFile) {
                            grunt.file.delete(item)
                        }
                    })
                })

                // COPY BASIC CONFIGURATIONS
                grunt.loadNpmTasks('grunt-contrib-copy')
                grunt.config.merge({
                    copy: {
                        newProjectFiles: {
                            files: [
                                {
                                    expand: true,
                                    flatten: true,
                                    src: [
                                        './CORE/project-template/build.json',
                                        './CORE/project-template/CHANGELOG.js',
                                        './CORE/project-template/test-data.js',
                                        './CORE/project-template/config.app.js',
                                        './CORE/project-template/google-services.json',
                                        './CORE/project-template/GoogleService-Info.plist',
                                        './CORE/project-template/walletfactory.keystore'
                                    ],
                                    dest: `./projects/${grunt.option('name')}`
                                }
                            ]
                        },
                        newProjectFilesIos: {
                            files: [
                                {
                                    expand: true,
                                    flatten: true,
                                    src: [
                                        './CORE/project-template/CDVLaunchScreen.storyboard'
                                    ],
                                    dest: `./projects/${grunt.option('name')}/platforms/ios/${grunt.option('name')}`
                                }
                            ]
                        }
                    }
                })

                // создавтаь в хокеап приложения и забирать ID
                // в слаке брать ID
                grunt.task.run([
                    'cordovacli:create',
                    'clear-project-tmp-file',
                    'copy:newProjectFiles',
                    'cordovacli:add_plugins',
                    'cordovacli:add_platforms',
                    'copy:newProjectFilesIos'
                ])

                //
                // grunt.task.run('cordovacli:add_plugins')
                // grunt.task.run('cordovacli:add_platforms')

                grunt.task.run('copy:icons')

                // 'copy:CreateProject',
                // 'replace:CreateProject',
                // 'replace:CreateProjectAddConfig',
                // 'replace:CreateProjectRegister',
            })

            grunt.registerTask('rebuild:platforms', '', () => {
                const wallet = require(`./projects/${grunt.option('name')}/config.app.js`)
                let DEVELOPMENT_TEAM = ''
                const pathProject = `./projects/${grunt.option('name')}/platforms/ios/${grunt.option('name')}.xcodeproj`

                // CLEAR OLD FILES
                grunt.loadNpmTasks('grunt-contrib-clean')
                grunt.config.merge({
                    clean: {
                        oldProject: {
                            src: [
                                `./projects/${grunt.option('name')}/platforms/`,
                                `./projects/${grunt.option('name')}/plugins/`,
                                `./projects/${grunt.option('name')}/node_modules/`,
                                // `./projects/${grunt.option('name')}/package.json`,
                                `./projects/${grunt.option('name')}/package-lock.json`
                            ]
                        },
                        newProjectImagesCordova: {
                            src: [
                                `./projects/${grunt.option('name')}/platforms/android/res/*/screen.png`
                            ]
                        }
                    }
                })

                // COPY BASIC CONFIGURATIONS
                grunt.loadNpmTasks('grunt-contrib-copy')
                grunt.config.merge({
                    copy: {
                        newProjectFilesIos: {
                            files: [
                                {
                                    expand: true,
                                    flatten: true,
                                    src: [
                                        './CORE/project-template/CDVLaunchScreen.storyboard'
                                    ],
                                    dest: `./projects/${grunt.option('name')}/platforms/ios/${grunt.option('name')}`
                                },
                                {
                                    expand: true,
                                    flatten: true,
                                    src: [
                                        './CORE/project-template/WorkspaceSettings.xcsettings'
                                    ],
                                    dest: `./projects/${grunt.option('name')}/platforms/ios/${grunt.option('name')}.xcworkspace/xcshareddata`
                                }
                            ]
                        },
                        newProjectPackageJson: {
                            files: [
                                {
                                    expand: true,
                                    flatten: true,
                                    src: [
                                        './CORE/project-template/package.json'
                                    ],
                                    dest: `./projects/${grunt.option('name')}`
                                }
                            ]
                        }
                    }
                })

                // ANDROID REPLACE CONFIGS
                grunt.loadNpmTasks('grunt-text-replace')
                grunt.config.merge({
                    replace: {
                        newProjectReplaceAndroidBuildGradle: {
                            src: [`./projects/${grunt.option('name')}/platforms/android/build.gradle`],
                            overwrite: true,
                            replacements: [
                                {
                                    from: '*10 + 2',
                                    to: ''
                                }, {
                                    from: '*10 + 4',
                                    to: ''
                                }, {
                                    from: 'android {',
                                    to: 'android {\n' +
                                        '    flavorDimensions "default"'
                                }, {
                                    from: 'classpath \'com.android.tools.build:gradle:3.0.0\'',
                                    to: 'classpath \'com.android.tools.build:gradle:3.1.2\''
                                }
                            ]
                        },
                        newProjectReplaceAndroidProperties: {
                            src: [`./projects/${grunt.option('name')}/platforms/android/project.properties`],
                            overwrite: true,
                            replacements: [
                                {
                                    from: /target=android-(\d)(\d)/,
                                    to: 'target=android-28'
                                }, {
                                    from: '$GMS_VERSION',
                                    to: '+'
                                }, {
                                    from: '$ANDROID_SUPPORT_V4_VERSION',
                                    to: '24.1.1+'
                                }, {
                                    from: 'firebase:firebase-core:+',
                                    to: 'firebase:firebase-core:16.0.8'
                                }, {
                                    from: 'firebase:firebase-messaging:+',
                                    to: 'firebase:firebase-messaging:17.5.0'
                                }, {
                                    from: 'firebase:firebase-config:+',
                                    to: 'firebase:firebase-config:16.4.1'
                                }, {
                                    from: 'firebase:firebase-perf:+',
                                    to: 'firebase:firebase-perf:16.2.4'
                                }
                            ]
                        },
                        newProjectReplaceAndroidQrscanner: {
                            src: [`./projects/${grunt.option('name')}/platforms/android/cordova-plugin-qrscanner/*.gradle`],
                            overwrite: true,
                            replacements: [
                                {
                                    from: 'buildToolsVersion',
                                    to: '// buildToolsVersion'
                                }
                            ]
                        },
                        newProjectReplaceAndroidAndroidManifestXml: {
                            src: [`./projects/${grunt.option('name')}/platforms/android/app/src/main/AndroidManifest.xml`],
                            overwrite: true,
                            replacements: [
                                {
                                    from: '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />',
                                    to: '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />\n' +
                                        '    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" tools:remove="android:maxSdkVersion" />\n' +
                                        '    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />'
                                }, {
                                    from: /targetSdkVersion="(\d)(\d)"/,
                                    to: 'targetSdkVersion="28"'
                                }, {
                                    from: '<application ',
                                    to: '<application android:allowBackup="false" android:fullBackupContent="false" android:usesCleartextTraffic="true" '
                                }, {
                                    from: 'xmlns:android="http://schemas.android.com/apk/res/android">',
                                    to: 'xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">'
                                }, {
                                    from: '    </application>',
                                    to: '        <meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/ic_stat_notification" />\n' +
                                        '        <meta-data android:name="com.google.firebase.messaging.default_notification_color" android:resource="@color/notificationColor" />\n' +
                                        '    </application>'
                                }
                            ]
                        },
                        newProjectReplaceColors: {
                            src: [`./projects/${grunt.option('name')}/platforms/android/app/src/main/res/values/colors.xml`],
                            overwrite: true,
                            replacements: [
                                {
                                    from: '</resources>',
                                    to: `    <color name="notificationColor">${wallet.application.pushNotificationBackgroundColor}</color>` +
                                        '\n</resources>'
                                }
                            ]
                        },
                        newProjectReplaceGradle: {
                            src: [`./projects/${grunt.option('name')}/platforms/android/cordova-plugin-firebase-lib/*.gradle`],
                            overwrite: true,
                            replacements: [
                                {
                                    from: '\n' +
                                        'dependencies {\n' +
                                        '    ',
                                    to: '\n' +
                                        'dependencies {\n' +
                                        '    compile \'com.google.firebase:firebase-inappmessaging-display:18.0.0\'\n    '
                                }
                            ]
                        },

                        // compile 'com.google.firebase:firebase-inappmessaging-display:18.0.0'
                        newProjectReplaceAndroidGradleBuilder: {
                            src: [`./projects/${grunt.option('name')}/platforms/android/cordova/lib/builders/GradleBuilder.js`],
                            overwrite: true,
                            replacements: [
                                {
                                    from: 'distributions/gradle-4.1-all.zip',
                                    to: 'distributions/gradle-4.10.2-all.zip'
                                }, {
                                    from: '<application ',
                                    to: '<application android:allowBackup="false" android:fullBackupContent="false" '
                                }, {
                                    from: 'xmlns:android="http://schemas.android.com/apk/res/android">',
                                    to: 'xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">'
                                }
                            ]
                        }
                    }
                })

                // UPDATE CORDOVA PLUGINS
                grunt.loadNpmTasks('grunt-shell')
                grunt.config.merge({
                    shell: {
                        cordovaCheckPlugins: {
                            command: [
                                `cd ./projects/${grunt.option('name')}/`,
                                `cordova-check-plugins --update=auto`
                            ].join('&&')
                        }
                    }
                })

                // TODO: создавтаь в хокеап приложения и забирать ID
                // TODO: в слаке брать ID

                grunt.registerTask('set-xcode-project-configs', function () {
                    const xcodeProjectConfigs = require('./CORE/configs/grunt-modules/xcode-project-configs')
                    xcodeProjectConfigs.setConfigs(pathProject, { DEVELOPMENT_TEAM })
                })

                grunt.registerTask('get-xcode-project-configs', function () {
                    if (wallet.application.appleTeamId) {
                        DEVELOPMENT_TEAM = wallet.application.appleTeamId
                    } else if (grunt.file.exists(pathProject)) {
                        const xcodeProjectConfigs = require('./CORE/configs/grunt-modules/xcode-project-configs')
                        const result = xcodeProjectConfigs.getConfigs(pathProject)
                        DEVELOPMENT_TEAM = result.buildSettings.DEVELOPMENT_TEAM
                    }
                })

                // LANGS
                grunt.registerTask('langs-create', function () {
                    const LANGS = wallet.application.languages
                    const arrayStrings = []

                    try {
                        LANGS.forEach((lang) => {
                            const PATH = `./projects/${grunt.option('name')}/platforms/ios/${grunt.option(
                                'name')}/Resources/${lang}.lproj/InfoPlist.strings`
                            require('@babel/register')

                            const LangCOREru = require(`./CORE/locales/iOSUsegeDescription/${lang}`)
                            const LangAppru = require(`./projects/${grunt.option('name')}/src/locales/${lang}`)
                            const locales = {
                                ...LangCOREru.default,
                                ...LangAppru.default
                            }

                            let iOSUsegeDescription = ''
                            Object.keys(locales).forEach((key) => {
                                if (key.indexOf('NS') === 0) {
                                    iOSUsegeDescription += `"${key}" = "${locales[key].replace(/\'/g, '\\\'')}";\n`
                                }
                            })
                            grunt.file.write(PATH, iOSUsegeDescription)
                            arrayStrings.push(`${lang}.lproj/InfoPlist.strings`)
                        })

                        const xcodeProjectConfigs = require('./CORE/configs/grunt-modules/xcode-project-configs')
                        xcodeProjectConfigs.addLangs(pathProject, arrayStrings)
                    } catch (e) {
                        console.log(e)
                    }
                })

                grunt.task.run([
                    'get-xcode-project-configs',
                    'clean:oldProject',
                    // 'copy:newProjectPackageJson',
                    'cordovacli:addPlatformsIos',
                    'cordovacli:addPlatformsAndroid',

                    // ANDROID
                    // 'replace:newProjectReplaceAndroidBuildGradle',
                    // 'replace:newProjectReplaceAndroidProperties',
                    // 'replace:newProjectReplaceAndroidQrscanner',
                    'replace:newProjectReplaceAndroidAndroidManifestXml',
                    'replace:newProjectReplaceColors',
                    'replace:newProjectReplaceGradle',
                    // 'replace:newProjectReplaceAndroidGradleBuilder',

                    // IOS
                    // 'copy:newProjectFilesIos',
                    'cordovacli:prepare_ios',
                    'set-xcode-project-configs',

                    // IMAGES
                    'gm_picturefill:android',
                    'gm_picturefill:ios',
                    'phonegapsplash:all',

                    // 'shell:cordovaCheckPlugins',
                    'clean:newProjectImagesCordova',
                    'langs-create'
                ])
            })

            const listTasks = grunt.cli.tasks[0].split(':')
            if (listTasks.length > 1) {
                const nameTask = `${listTasks[1]}${listTasks[2] ? `:${listTasks[2]}` : ''}`
                console.log(nameTask)
                grunt.task.run(nameTask)
            }
        } else if (grunt.cli.tasks.indexOf('mwallet-init') === -1) {
            throw new Error('wallets.config.js not found\nPlease init mWalet-platform: "yarn mwallet-init"')
        }
    })

    grunt.registerTask('copy-project-mirror', '', () => {
        let wallet = null
        if (!grunt.option('name')) {
            wallet = require('./wallets.config.js').wallet
        } else {
            console.log('NAME', grunt.option('name'))
            wallet = require(`./projects/${grunt.option('name')}/config.app.js`)
        }

        const pathTmp = './tmp-mirror/'
        const branchName = `Mirror/${wallet.name}/${moment().format('DDMM/HHmm')}`
        const privateToken = process.env.CI_PrivateToken
        const gitUrl = `https://oauth2:${privateToken}@gitlab.walletfactory.com/mobileapp/${wallet.name.toLowerCase()}.git`
        const gitTargetUrl = `https://oauth2:${privateToken}@gitlab.walletfactory.com/mobileapp/mwallet_v4.git`

        // COPY BASIC CONFIGURATIONS
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-shell')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.config.merge({
            copy: {
                projectSync: {
                    files: [
                        {
                            expand: true,
                            cwd: `${pathTmp}/`,
                            src: [
                                'projects/**',
                                'CORE/**'
                            ],
                            dest: './'
                        }
                    ]
                }
            },
            shell: {
                gitCheckout: {
                    command: [
                        // 'git checkout origin/dev',
                        // `git branch -D Mirror/${wallet.name}/${moment().format('DDMM')}`,
                        `git checkout -b ${branchName}`
                    ].join('&&')
                },
                gitClone: {
                    command: `git clone ${gitUrl} ${pathTmp}`
                },
                gitAdd: {
                    command: 'git add .'
                },
                gitCommit: {
                    command: `git commit -m "${branchName}"`
                },
                gitPush: {
                    command: `git push ${gitTargetUrl} "${branchName}"`
                }
            },
            clean: {
                pathTmp: {
                    src: [
                        pathTmp
                    ]
                }
            }
        })

        grunt.registerTask('create-mr', async function () {
            const done = this.async()

            const options = {
                method: 'post',
                url: `https://gitlab.walletfactory.com/api/v4/projects/1/merge_requests?private_token=${privateToken}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    source_branch: branchName,
                    target_branch: 'dev',
                    title: branchName
                },
                json: true
            }
            try {
                await axios(options)
            } catch (e) {
                console.log(e.message)
            }

            done()
        })

        grunt.task.run([
            'clean:pathTmp',
            'shell:gitCheckout',
            'shell:gitClone',
            'copy:projectSync',
            'clean:pathTmp',
            'shell:gitAdd',
            'shell:gitCommit',
            'shell:gitPush',
            'create-mr'
        ])
    })

    grunt.registerTask('build web', '', () => {
        const wallet = require(configPath).wallet
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.config.merge({
            copy: {
                webUploadWww: {
                    files: [
                        {
                            expand: true,
                            flatten: true,
                            src: [
                                `./projects/${wallet.name}/www/**/*`
                            ],
                            dest: `./${wallet.application.domain}`
                        }
                    ]
                }
            }
        })

        grunt.loadNpmTasks('grunt-shell')
        grunt.config.merge({
            shell: {
                uploadWww: {
                    command: [
                        `git clone https://oauth2:CtyFoSQKpzsZsMbRHMxZ@gitlab.walletfactory.com/mobileapp/${wallet.application.domain}.git  ./${wallet.application.domain}`,
                        `cd ./${wallet.application.domain}`,
                        'git add .',
                        'git commit -m "Upload WWW"',
                        `git push https://oauth2:CtyFoSQKpzsZsMbRHMxZ@gitlab.walletfactory.com/mobileapp/${wallet.application.domain}.git`
                    ].join('&&')
                }
            }
        })

        //
        // - git clone https://oauth2:CtyFoSQKpzsZsMbRHMxZ@gitlab.walletfactory.com/mobileapp/mWallet_v4.wiki.git  ./docs/mWallet_v4.wiki

        //  - git add .
        //  - git commit -m "Update Wiki"
        //  - git push https://oauth2:CtyFoSQKpzsZsMbRHMxZ@gitlab.walletfactory.com/mobileapp/mWallet_v4.wiki.git

        grunt.task.run([
            'generate-config',
            'replace:DateBuild',
            'replace:IndexHtmlTitle',
            'webpack:prod',
            'copy:webUploadWww'
            // 'shell:uploadWww',
        ])
    })

    grunt.task.registerTask('webpack', '', () => {
        grunt.loadNpmTasks('grunt-webpack')
        const webpackConfig = require('./webpack.config')

        grunt.config.merge({
            webpack: {
                options: {
                    stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
                },
                prod: Object.assign({ mode: 'production' }, webpackConfig),
                dev: Object.assign({ watch: true }, webpackConfig)
            }
        })

        grunt.task.run(grunt.task.current.nameArgs)
    })

    grunt.task.registerTask('set-wallet', '', () => {
        const walletName = require(configPath).walletName
        grunt.loadNpmTasks('grunt-text-replace')
        grunt.initConfig({
            replace: {
                replaceWalletName: {
                    src: ['./wallets.config.js'],
                    overwrite: true,
                    replacements: [
                        {
                            from: /require\(\'\.\/projects\/(\w*)\/config\.app\.js\'\)/,
                            to: `require('./projects/${walletName}/config.app.js')`
                        }
                    ]
                }
            }
        })
        grunt.task.run('replace')
    })

    grunt.task.registerTask('generate-config', '', () => {
        // Object.keys(require.cache).forEach((key) => {
        //     delete require.cache[key];
        // });

        const wallet = require(configPath).wallet
        require('./CORE/configs/generate-configs/generate.configurations')({ grunt, wallet })
    })

    grunt.task.registerTask('langs-generate', '', () => {
        const wallet = require('./wallets.config.js').wallet
        require('./CORE/configs/grunt-modules/langs-generate')({ grunt, wallet })
    })

    grunt.task.registerTask('langs-export', '', () => {
        let wallet = null
        if (!(grunt.option('type') === 'platforms')) {
            wallet = require('./wallets.config.js').wallet
        }
        require('./CORE/configs/grunt-modules/langs-export')({ grunt, wallet })
    })

    grunt.task.registerTask('export-project', '', () => {
        const wallet = require('./wallets.config.js').wallet
        require('./CORE/configs/grunt-modules/export-project')({ grunt, wallet })
    })

    grunt.task.registerTask('langs-import', '', () => {
        let wallet = null
        if (!(grunt.option('type') === 'platforms')) {
            wallet = require('./wallets.config.js').wallet
        }
        require('./CORE/configs/grunt-modules/langs-import')({ grunt, wallet })
    })

    grunt.task.registerTask('docs-generate', '', () => {
        require('./CORE/configs/grunt-modules/docs-generate')({ grunt })
    })

    grunt.task.registerTask('docs-generate-projects', '', () => {
        require('./CORE/configs/grunt-modules/docs-generate-projects')({ grunt })
    })

    grunt.task.registerTask('notification-slack', '', () => {
        require('./CORE/configs/grunt-modules/notification-slack')({ grunt })
    })

    // TODO: @ARSHE fixed
    grunt.task.registerTask('mwallet-init', 'mWallet Platform init: creating default files for platform', () => {
        // ------ GitLab CI/CD ------
        const CI_COMMIT_TAG = grunt.option('CI_COMMIT_TAG')
        let buildWallet = ''
        console.log('CI_COMMIT_TAG', CI_COMMIT_TAG)
        if (CI_COMMIT_TAG) {
            const _tagArray = CI_COMMIT_TAG.split('-')
            if (_tagArray.length > 1) {
                if (/([A-Za-z]*)-(\w*)-build(-*)(\w*)/.test(CI_COMMIT_TAG)) {
                    // #Name-UAT-build (or -hashtag)
                    buildWallet = {
                        name: _tagArray[0],
                        env: _tagArray[1].toUpperCase()
                    }
                } else if (/(\w*)-v(\d*).(\d*).(\d*)-(\d){5}-(\w*)/.test(CI_COMMIT_TAG)) {
                    // #Name-v1.0.2-31003-PROD
                    buildWallet = {
                        name: _tagArray[0],
                        version: _tagArray[1],
                        build: parseInt(_tagArray[2], 10),
                        env: _tagArray[3].toUpperCase()
                    }
                } else if (/([A-Za-z]*)-store(-*)(\w*)/.test(CI_COMMIT_TAG) ||
                    /([A-Za-z]*)-demo(-*)(\w*)/.test(CI_COMMIT_TAG)) {
                    buildWallet = {
                        name: _tagArray[0],
                        env: 'PROD'
                    }
                }
            } else {
                throw new Error(`TAG name is not correct: ${CI_COMMIT_TAG} \nSimple tag: name-v1.0.0-31001`)
            }
        }
        console.log(buildWallet)

        const getVersionCode = require('./CORE/getVersionCode.js')

        const isWalletsType = grunt.file.exists('wallets-type.js')
        if (isWalletsType) {
            grunt.file.delete('wallets-type.js')
        }

        // Default name Wallet
        let walletType = 'mWalletDemo'
        if (buildWallet) {
            walletType = buildWallet.name
        }

        // Создание файлов конфигурации
        const filesList = [
            {
                path: './wallets.config.js',
                content: '/* eslint-disable import/no-dynamic-require */\n' +
                    'const walletType = require(\'./wallets\')\n' +
                    '\n' +
                    `let wallet = walletType.${walletType}\n\n` +
                    'if (process.env.WALLET) {\n' +
                    '    wallet = walletType[process.env.WALLET]\n' +
                    '}\n\n' +
                    'module.exports.walletName = wallet\n\n' +
                    '// <--- auto generate --->\n' +
                    'module.exports.dateBuild = 1540301283683\n' +
                    `module.exports.versionCode = '${getVersionCode()}'\n` +
                    `module.exports.wallet = require(\'./projects/${walletType}/config.app.js\')\n` +
                    '// <---/auto generate --->\n'
            }
        ]

        filesList.forEach((item) => {
            // const walletsType = grunt.file.exists(item.path);
            // if (walletsType) {
            grunt.file.write(item.path, item.content)
            // }
        })

        // Creating folder WWW because is required for Cordova
        grunt.file.mkdir(`./projects/${walletType}/www/`)

        if (CI_COMMIT_TAG) {
            grunt.loadNpmTasks('grunt-text-replace')

            const replace = {
                replaceConfig: {
                    src: [
                        `./projects/${walletType}/config.app.js`
                    ],
                    overwrite: true,
                    replacements: [
                        {
                            from: /(\s){4}application:(\s)Environment.(\w*),/g,
                            to: `    application: Environment.${buildWallet.env},`
                        }, {
                            from: /(\s){4}application:(\s)Environment\[(\w*)],/g,
                            to: `    application: Environment.${buildWallet.env},`
                        }
                    ]
                }
            }

            // Replace version code and version app
            if (buildWallet.version) {
                replace.replaceConfig.replacements.push({
                    from: /\n(\s){4}version:(\s)'(\d*).(\d*).(\d*)'/g,
                    to: `\n    version: '${buildWallet.version.slice(1)}'`
                })
            }

            if (buildWallet.build) {
                const configDefault = require('./CORE/.config.mwallet.js')

                const _noC = parseInt(getVersionCode(), 10)
                const _toC = parseInt(configDefault.app_config.application.versionCode, 10)
                let corelation = _toC - _noC
                if (buildWallet.build > _toC) {
                    corelation += buildWallet.build - _toC
                }

                replace.replaceVersionBuild = {
                    src: [
                        './CORE/.config.mwallet.js'
                    ],
                    overwrite: true,
                    replacements: [
                        {
                            from: /versionCode:(\s)_buildVersionCode\((\d*)\)/g,
                            to: `versionCode: _buildVersionCode(${corelation})`
                        }
                    ]
                }
            }

            grunt.initConfig({
                replace
            })
            grunt.task.run('replace')
        }
    })

    // if (grunt.cli.tasks.indexOf(':') > -1) {
    //     const listTasks = grunt.cli.tasks[0].split(':');
    //     grunt.task.run(listTasks[0]);
    // }
}
