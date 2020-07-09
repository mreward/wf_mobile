/* eslint-disable no-template-curly-in-string */
// const path = require('path')

module.exports = function ({grunt, wallet}) {
    // для работы с терминалом
    grunt.loadNpmTasks('grunt-shell')

    const iosPath = `${grunt.option('pathBuild')}/IOS/${wallet.name}.ipa`;
    const androidPath = `${grunt.option('pathBuild')}/Android/${wallet.name}.apk`
    return {
        shell: {
            appcenterIos: {
                command: [
                    'appcenter login --token df1cfccab9ff3a239274e5887b5083a46447677e',
                    `appcenter distribute release --app ${wallet.application.appCenterIos} --file ${iosPath} --group "Collaborators"`,
                ].join('&&')
            },
            appcenterAndroid: {
                command: [
                    'appcenter login --token df1cfccab9ff3a239274e5887b5083a46447677e',
                    `appcenter distribute release --app ${wallet.application.appCenterAndroid} --file ${androidPath} --group "Collaborators"`,
                ].join('&&')
            },
        }
    }
}
