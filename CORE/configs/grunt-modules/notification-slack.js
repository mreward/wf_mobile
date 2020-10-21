const axios = require('axios')
const moment = require('moment')
const tokenAppCenter = require('../../../wallets.config').tokenAppCenter

/**
 *
 * @param grunt
 */
module.exports = function ({ grunt }) {
    const wallet = require('../../../wallets.config.js').wallet
    grunt.registerTask('get-release-info', async function () {
        const done = this.async()
        const AppCenterProject = grunt.option('AppCenterProject')

        const options = {
            method: 'get',
            url: `https://api.appcenter.ms/v0.1/apps/${AppCenterProject}/releases/latest`,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Token': tokenAppCenter
            },
            json: true
        }
        const { data } = await axios(options)
        // console.log(data)
        done(data)
        grunt.option('ReleaseResult', data)
    })

    grunt.registerTask('notification-slack-axios', async function () {
        const done = this.async()
        const CHANGELOG = require(`../../../projects/${wallet.name}/CHANGELOG`)

        const { newFeatures = [], bugFixes = [] } = CHANGELOG[0]

        if (!wallet.application.idChanel) {
            return
        }

        let features = ''
        newFeatures.forEach((item) => {
            features += `• ${item.replace(/(\[#\w*-\d*])\((.*)\) - /, '<$2|$1> ')}\n`
        })

        let fixes = ''
        bugFixes.forEach((item) => {
            fixes += `• ${item.replace(/(\[#\w*-\d*])\((.*)\) - /, '<$2|$1> ')}\n`
        })

        const {
            device_family: deviceFamily,
            min_os: minOsVersion,
            app_name: appName,
            app_display_name: title,
            app_os: platform,
            app_icon_url: appIconUrl,
            owner: {
                name: ownerName
            }
        } = grunt.option('ReleaseResult')

        const publicUrl = `https://install.appcenter.ms/orgs/${ownerName}/apps/${appName}`

        let iconFooter = 'https://freeiconshop.com/wp-content/uploads/edd/android-flat.png'
        if (platform === 'iOS') {
            iconFooter = 'https://image.flaticon.com/icons/png/512/23/23656.png'
        }

        const { version, versionCode } = wallet.application
        let text = `<${publicUrl}| *${title} v${version} (${versionCode})* >\n`
        if (newFeatures.length) {
            text += `> *New Features (${newFeatures.length})*\n${features}\n`
        }

        if (bugFixes.length) {
            text += `> *Bug Fixes (${bugFixes.length})*\n${fixes}`
        }

        const data = {
            attachments: [
                {
                    footer: `${platform} ${deviceFamily ? `${deviceFamily} ` : ''}${minOsVersion}`,
                    footer_icon: iconFooter,
                    ts: moment().format('X'),
                    thumb_url: appIconUrl,
                    text: text,
                    mrkdwn: true,
                    color: '#0675a6'
                }]
        }

        const logChanel = 'https://hooks.slack.com/services/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'
        const options = {
            method: 'post',
            url: logChanel,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...data,
                channel: wallet.application.idChanel //  'GFUUKJGM8',
            },
            json: true
        }
        const result = await axios(options)
        done(result)
    })

    grunt.task.run('get-release-info')
    grunt.task.run('notification-slack-axios')
}
