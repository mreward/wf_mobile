const tokenAppCenter = require('../../../wallets.config').tokenAppCenter
/**
 * Загрузка apk/ipa в appcenter
 * @param grunt
 * @param wallet
 * @param onDone
*/
module.exports = function ({ grunt, wallet }) {
    grunt.loadNpmTasks('grunt-shell')

    if (!wallet.application.appCenter && !wallet.application.appCenter.ios) {
        grunt.error('Empty appCenter ios vars')
    }

    if (!wallet.application.appCenter && !wallet.application.appCenter.android) {
        grunt.error('Empty appCenter android vars')
    }

    const properties = {
        api_token: tokenAppCenter,
        ios_project: wallet.application.appCenter.ios,
        android_project: wallet.application.appCenter.android,
        ios_file: `${grunt.option('pathBuild')}/IOS/${wallet.name}.ipa`,
        android_file: `${grunt.option('pathBuild')}/Android/${wallet.name}.apk`,
        release_notes: wallet.notesHockeyapp
    }

    grunt.registerTask('appcenter:android', 'Grunt plugin for uploading apps via the appcenter with cli.', function () {
        const platform = 'android'
        grunt.config.merge({
            shell: {
                AppCenterUploadAPK: {
                    command: [
                        'echo "Login to AppCenter..."',
                        `appcenter login --token=${properties.api_token}`,
                        `echo "Set project..."`,
                        `appcenter apps set-current ${properties[`${platform}_project`]}`,
                        'echo "Uploading release to AppCenter..."',
                        `appcenter distribute release --file=${properties[`${platform}_file`]} --group=Collaborators --release-notes="${properties.release_notes}"`,
                        'echo "Happy end :)"'
                    ].join('&&')
                }
            }
        })

        grunt.option('AppCenterProject', properties[`${platform}_project`])

        grunt.task.run([
            'shell:AppCenterUploadAPK',
            'notification-slack'
        ])
    })

    grunt.registerTask('appcenter:ios', 'Grunt plugin for uploading apps via the appcenter with cli.', function () {
        const platform = 'ios'
        grunt.config.merge({
            shell: {
                AppCenterUploadIPA: {
                    command: [
                        'echo "Login to AppCenter..."',
                        `appcenter login --token=${properties.api_token}`,
                        `echo "Set project..."`,
                        `appcenter apps set-current ${properties[`${platform}_project`]}`,
                        'echo "Uploading release to AppCenter..."',
                        `appcenter distribute release --file=${properties[`${platform}_file`]} --group=Collaborators --release-notes="${properties.release_notes}"`,
                        'echo "Happy end :)"'
                    ].join('&&')
                }
            }
        })

        grunt.option('AppCenterProject', properties[`${platform}_project`])

        grunt.task.run([
            'shell:AppCenterUploadIPA',
            'notification-slack'
        ])
    })
}
