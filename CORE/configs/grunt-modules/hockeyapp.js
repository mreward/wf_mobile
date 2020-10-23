const keyHockeyApp = require('../../../wallets.config').keyHockeyApp

/**
 * Загрузка apk/ipa на хокеап
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet, onDone }) {
    // для загрузки апк на hockeyapp
    grunt.loadNpmTasks('grunt-hockeyapp-upload')

    const data = {
        hockeyapp: {
            options: {
                resource: 'upload',
                downloadable: false,
                token: keyHockeyApp,
                notes: wallet.notesHockeyapp,
                notesType: 'markdown',
                notify: 'all',
                onDone
            },
            android: {
                file: `${grunt.option('pathBuild')}/Android/${wallet.name}.apk`
            },
            ios: {
                file: `${grunt.option('pathBuild')}/IOS/${wallet.name}.ipa`
            },
            androidArm64: {
                options: {
                    resource: `${wallet.application.hockeyArm64AppID}/app_versions/upload`,
                    notes: `### ARM 64\n${wallet.notesHockeyapp}`
                },
                file: `${grunt.option('pathBuild')}/Android/${wallet.name}-arm64.apk`
            }
        }
    }

    return {
        ...data
    }
}
