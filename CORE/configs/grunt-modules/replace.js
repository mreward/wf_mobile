/* eslint-disable prefer-template,import/no-dynamic-require */
const getVersionCode = require('../../../CORE/getVersionCode.js')

const nameAppPattern = '(\\w*?)(\\s*?)(\\w*?)(\\s*?)(\\w*?)(\\s*?)(\\w*?)(\\s*?)(\\w*?)'
const idAppPattern = '(\\w*?)\\.(\\w*?)\\.(\\w*?)'
const patterns = {
    BundleID: new RegExp('id="' + idAppPattern + '"', 'g'),
    TitleApp: new RegExp('<title>' + nameAppPattern + '<\/title>', 'g'),
    NameApp: new RegExp('<name>' + nameAppPattern + '<\/name>', 'g'),
    AndroidStringNameApp: new RegExp('<string name=\"app_name\">' + nameAppPattern + '<\/string>', 'g'),
    DescriptionApp: new RegExp('<description>' + nameAppPattern + '\\.<\/description>', 'g'),
    CFBundleDisplayName: new RegExp('PRODUCT_NAME = \"' + nameAppPattern + '\";', 'g'),
    CFBundleDisplayNameNewType: new RegExp('PRODUCT_NAME = ' + nameAppPattern + ';', 'g'),
    CFBundleIdentifier: new RegExp('PRODUCT_BUNDLE_IDENTIFIER = ' + idAppPattern + ';', 'g'),
    CFBundleVersion: /<key>CFBundleVersion<\/key>\n(\s*?)(\s*?)(\s*?)(\s*?)<string>(\d*?)(\.*?)(\d*?)(\.*?)(\d*?)<\/string>/g,
    CFBundleShortVersionString: /<key>CFBundleShortVersionString<\/key>\n(\s*?)(\s*?)(\s*?)(\s*?)(\s*?)<string>(\d*?)(\.*?)(\d*?)(\.*?)(\d*?)<\/string>/g,
    CFBundleIdentifier2: /<key>CFBundleIdentifier<\/key>\n(\s*?)(\s*?)(\s*?)(\s*?)(\s*?)<string>(\w*?)\.(\w*?)\.(\w*?)<\/string>/g,
    CFBundleURLName: /<key>CFBundleURLName<\/key>\n(\s*?)(\s*?)(\s*?)(\s*?)(\s*?)<string>(\w*?)\.(\w*?)\.(\w*?)<\/string>/g,
    CFBundleDisplayName2: /<key>CFBundleDisplayName<\/key>\n(\s*?)(\s*?)(\s*?)(\s*?)<string>(\w*?)(\s*?)(\w*?)(\s*?)(\w*?)(\s*?)(\w*?)(\s*?)(\w*?)<\/string>/,

    AndroidVersionCode: /android:versionCode="(\d*?)"/g,
    AndroidVersionName: /android:versionName="(\d*?)\.(\d*?)\.(\d*?)"/g
}

/**
 * перезапись строк в файлах
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    // преезапись строк в файлах
    grunt.loadNpmTasks('grunt-text-replace')

    return {
        replace: {
            BundleID: {
                src: ['projects/' + wallet.name + '/config.xml'],
                overwrite: true,
                replacements: [
                    {
                        from: patterns.BundleID,
                        to: 'id="' + wallet.application.bundleID + '"'
                    }]
            },
            SetArm64Android: {
                src: ['projects/' + wallet.name + '/config.xml'],
                overwrite: true,
                replacements: [
                    {
                        to: '<platform name="android">\n' +
                            '        <preference name="xwalk64bit" value="true" />\n',
                        from: '<platform name="android">\n'
                    }]
            },
            RemoveArm64Android: {
                src: ['projects/' + wallet.name + '/config.xml'],
                overwrite: true,
                replacements: [
                    {
                        from: '<platform name="android">\n' +
                            '        <preference name="xwalk64bit" value="true" />\n',
                        to: '<platform name="android">\n'
                    }]
            },
            IndexHtmlTitle: {
                src: ['projects/' + wallet.name + '/src/index.html'],
                overwrite: true,
                replacements: [
                    {
                        from: patterns.TitleApp,
                        to: '<title>' + wallet.application.nameApp + '</title>'
                    }]
            },

            CFBundleDisplayNameIOS: {
                src: ['projects/' + wallet.name + '/platforms/ios/' + wallet.name + '.xcodeproj/project.pbxproj'],
                overwrite: true,
                replacements: [
                    {
                        from: patterns.CFBundleDisplayName,
                        to: 'PRODUCT_NAME = \"' + wallet.application.nameApp + '\";'
                    }, {
                        from: patterns.CFBundleDisplayNameNewType,
                        to: 'PRODUCT_NAME = \"' + wallet.application.nameApp + '\";'
                    }, {
                        from: patterns.CFBundleIdentifier,
                        to: 'PRODUCT_BUNDLE_IDENTIFIER = ' + wallet.application.bundleID + ';'
                    }]
            },
            CFBundleVersionIOS: {
                src: ['projects/' + wallet.name + '/platforms/ios/' + wallet.name + '/' + wallet.name + '-Info.plist'],
                overwrite: true,
                replacements: [
                    {
                        from: patterns.CFBundleVersion,
                        to: '<key>CFBundleVersion</key>\n    <string>' + wallet.application.versionCode + '</string>'
                    }, {
                        from: patterns.CFBundleShortVersionString,
                        to: '<key>CFBundleShortVersionString</key>\n    <string>' + wallet.application.version +
                        '</string>'
                    }, {
                        from: patterns.CFBundleIdentifier2,
                        to: '<key>CFBundleIdentifier</key>\n    <string>' + wallet.application.bundleID + '</string>'
                    }, {
                        from: patterns.CFBundleURLName,
                        to: '<key>CFBundleURLName</key>\n        <string>' + wallet.application.bundleID + '</string>'
                    }, {
                        from: patterns.CFBundleURLSchemes,
                        to: '<key>CFBundleURLSchemes</key>\n        <array>\n           <string>' + wallet.application.bundleID + '</string>\n        </array>'
                    }, {
                        from: patterns.CFBundleDisplayName2,
                        to: '<key>CFBundleDisplayName</key>\n    <string>' + wallet.application.nameApp + '</string>'
                    }
                ]
            },

            VersionCodeAndroid: {
                src: ['projects/' + wallet.name + '/platforms/android/app/src/main/AndroidManifest.xml'],
                overwrite: true,
                replacements: [
                    {
                        from: patterns.AndroidVersionCode,
                        to: 'android:versionCode="' + wallet.application.versionCode + '"'
                    }, {
                        from: patterns.AndroidVersionName,
                        to: 'android:versionName="' + wallet.application.version + '"'
                    }]
            },
            ResXmlConfigAndroid: {
                src: [
                    'projects/' + wallet.name + '/platforms/android/app/src/main/res/xml/config.xml',
                    'projects/' + wallet.name + '/platforms/android/app/src/main/res/**/strings.xml'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: patterns.BundleID,
                        to: 'id="' + wallet.application.bundleID + '"'
                    }, {
                        from: patterns.NameApp,
                        to: '<title>' + wallet.application.nameApp + '</title>'
                    }, {
                        from: patterns.DescriptionApp,
                        to: '<description>' + wallet.application.nameApp + ' application.</description>'
                    }, {
                        from: patterns.AndroidStringNameApp,
                        to: '<string name="app_name">' + wallet.application.nameApp + '</string>'
                    }]
            },
            CreateProject: {
                src: [
                    './projects/' + grunt.option('name') + '/config.app.js'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: 'name: \'mWallet\'',
                        to: 'name: \'' + grunt.option('name') + '\''
                    }, {
                        from: 'nameApp: \'mWallet\'',
                        to: 'nameApp: \'' + grunt.option('name') + '\''
                    }, {
                        from: 'bundleID: \'pro.mwallet.mwallet\'',
                        to: 'bundleID: \'' + grunt.option('id') + '\''
                    }
                ]
            },
            CreateProjectAddConfig: {
                src: [
                    './wallets.js'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: '\',\n}',
                        to: '\',\n    ' + grunt.option('name') + ': \'' + grunt.option('name') + '\',\n}'
                    }
                ]
            },
            CreateProjectRegister: {
                src: [
                    `./projects/${grunt.option('name')}/src/register.js`,
                    `./projects/${grunt.option('name')}/src/.config.main.js`
                ],
                overwrite: true,
                replacements: [
                    {
                        from: 'mWalletDemo',
                        to: `${grunt.option('name')}`
                    }
                ]
            },
            DateBuild: {
                src: [
                    './wallets.config.js'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: /dateBuild(\s)=(\s)(\d*)/g,
                        to: 'dateBuild = ' + Date.now()
                    }, {
                        from: /versionCode(\s)=(\s)'(\w*)'/g,
                        to: `versionCode = '${getVersionCode()}'`
                    }
                ]
            }
        }
    }
}
