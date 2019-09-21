/* eslint-disable no-template-curly-in-string */
const path = require('path')

/**
 * Выполнение скриптов в коммандной строке
 * @param grunt
 * @param wallet
 * @returns {{shell: {xcodebuild_xcarchive: {command: string}, xcodebuild_exportArchive: {command: string}, xcodebuild_exportArchiveA: {command: string}}}}
 */
module.exports = function({ grunt, wallet }) {
    // для работы с терминалом
    grunt.loadNpmTasks('grunt-shell')

    let pathXcode = '/Applications/Xcode.app'
    if (grunt.file.exists('/Volumes/Mivina/Xcode.app')) {
        pathXcode = '/Volumes/Mivina/Xcode.app'
    }

    const {appleConnectId, appleConnectKey} = require('../../../wallets.config.js')

    const _appleConnectId = process.env.CI_APPLE_CONNECT_ID || appleConnectId
    const _appleConnectKey = process.env.CI_APPLE_CONNECT_KEY || appleConnectKey

    return {
        shell: {
            xcodebuild_xcarchive: {
                command: [
                    `cd ./projects/${wallet.name}/platforms/ios/`,
                    `xcodebuild -allowProvisioningUpdates -workspace "${wallet.name}.xcworkspace" -scheme ${wallet.name} -configuration Release archive -archivePath ${wallet.name}`
                ].join('&&')
            },
            // TODO: добавить папку с датой добавления
            xcodebuild_exportArchive: {
                command: [
                    `cd ./projects/${wallet.name}/platforms/ios/`,
                    `xcodebuild -allowProvisioningUpdates -exportArchive -exportPath ${path.resolve(__dirname, `${grunt.option('pathBuild')}/IOS/`)} -archivePath ${wallet.name}.xcarchive/ -exportOptionsPlist ${wallet.name}/${wallet.name}-Info.plist`
                ].join('&&')
            },

            xcodebuild_exportArchiveA: {
                command: [
                    `cd ./projects/${wallet.name}/platforms/ios/`,
                    'xcrun -sdk iphoneos PackageApplication -v "${RELEASE_BUILDDIR}/${APPLICATION_NAME}.app" -o "${BUILD_HISTORY_DIR}/${APPLICATION_NAME}.ipa" --sign "${DEVELOPER_NAME}" --embed "${PROVISONING_PROFILE}"'
                ].join('&&')
            },

            xcodebuild_exportArchive_store: {
                command: [
                    `cd ./projects/${wallet.name}/platforms/ios/`,
                    `xcodebuild -allowProvisioningUpdates -exportArchive -exportPath ${path.resolve(__dirname, `${grunt.option('pathBuild')}/IOS/`)} -archivePath ${wallet.name}.xcarchive/ -exportOptionsPlist ${path.resolve(__dirname, '../../../projects/certificates/ExportOptions.plist')}`
                ].join('&&')
            },

            altool_app_store: {
                command: [
                    'echo "Validating app..."',
                    `${pathXcode}/Contents/Applications/Application\\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Versions/A/Support/altool --validate-app --type ios -f "${path.resolve(__dirname, `${grunt.option('pathBuild')}/IOS/${wallet.name}.ipa`)}" -u "${_appleConnectId}" -p "${_appleConnectKey}"`,
                    'echo "Uploading app to App Store Connect..."',
                    `${pathXcode}/Contents/Applications/Application\\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Versions/A/Support/altool --upload-app --type ios -f "${path.resolve(__dirname, `${grunt.option('pathBuild')}/IOS/${wallet.name}.ipa`)}" -u "${_appleConnectId}" -p "${_appleConnectKey}"`
                ].join('&&')
            }
        }
    }
}
