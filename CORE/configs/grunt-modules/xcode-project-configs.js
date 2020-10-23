/*
* This hook adds all the needed config to implement a Cordova plugin with Swift.
*
*  - It adds a Bridging header importing Cordova/CDV.h if it's not already
*    the case. Else it concats all the bridging headers in one single file.
*
*    /!\ Please be sure not naming your bridging header file 'Bridging-Header.h'
*    else it won't be supported.
*
*  - It puts the ios deployment target to 7.0 in case your project would have a
*    lesser one.
*
*  - It updates the ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES build setting to YES.
*
*  - It updates the SWIFT_VERSION to 4.0.
*/

const fs = require('fs')
const xcode = require('xcode')

module.exports = {
    setConfigs: (path, options = {}) => {
        // This script has to be executed depending on the command line arguments, not
        // on the hook execution cycle.
        const IOS_MIN_DEPLOYMENT_TARGET = options.IOS_MIN_DEPLOYMENT_TARGET || '10.3'
        const IOS_MAX_DEPLOYMENT_TARGET = options.IOS_MAX_DEPLOYMENT_TARGET || '12.2'
        const SWIFT_VERSION = options.SWIFT_VERSION || '5.0'
        const DEVELOPMENT_TEAM = options.DEVELOPMENT_TEAM || 'U6HK3GZ99S'

        const COMMENT_KEY = /_comment$/
        let buildConfigs
        let buildConfig
        let configName

        const pbxprojPath = `${path}/project.pbxproj`
        let xcodeProject = xcode.project(pbxprojPath)
        xcodeProject.parseSync()
        buildConfigs = xcodeProject.pbxXCBuildConfigurationSection()
        for (configName in buildConfigs) {
            if (!COMMENT_KEY.test(configName)) {
                buildConfig = buildConfigs[configName]

                if (xcodeProject.getBuildProperty('SWIFT_VERSION', buildConfig.name) !== SWIFT_VERSION) {
                    xcodeProject.updateBuildProperty('SWIFT_VERSION', SWIFT_VERSION, buildConfig.name)
                    console.log(`Update SWIFT version to ${SWIFT_VERSION}`, buildConfig.name)
                }

                let versionIos = IOS_MIN_DEPLOYMENT_TARGET
                if (buildConfig.baseConfigurationReference_comment === 'build.xcconfig') {
                    versionIos = IOS_MAX_DEPLOYMENT_TARGET
                }
                buildConfig.buildSettings.IPHONEOS_DEPLOYMENT_TARGET = versionIos

                if (xcodeProject.getBuildProperty('TARGETED_DEVICE_FAMILY', buildConfig.name) !== '1') {
                    xcodeProject.updateBuildProperty('TARGETED_DEVICE_FAMILY', '1', buildConfig.name)
                    console.log('Update Targeted device family to iPhone only', buildConfig.name)
                }

                if (xcodeProject.getBuildProperty('DEVELOPMENT_TEAM', buildConfig.name) !== DEVELOPMENT_TEAM) {
                    xcodeProject.updateBuildProperty('DEVELOPMENT_TEAM', DEVELOPMENT_TEAM, buildConfig.name)
                    console.log(`Update Development Team ID: ${DEVELOPMENT_TEAM}`, buildConfig.name)
                }

                if (xcodeProject.getBuildProperty('CODE_SIGN_STYLE', buildConfig.name) !== 'Automatic') {
                    xcodeProject.updateBuildProperty('CODE_SIGN_STYLE', 'Automatic', buildConfig.name)
                    console.log('Update Code sign style: ', buildConfig.name)
                }

                if (xcodeProject.getBuildProperty('CODE_SIGN_IDENTITY', buildConfig.name) !== '"iPhone Developer"') {
                    xcodeProject.updateBuildProperty('CODE_SIGN_IDENTITY', '"iPhone Developer"', buildConfig.name)
                    console.log(`Update Code Sign Identity: ${DEVELOPMENT_TEAM}`, buildConfig.name)
                }
            }
        }

        fs.writeFileSync(pbxprojPath, xcodeProject.writeSync())
    },

    getConfigs: (path) => {
        const COMMENT_KEY = /_comment$/
        let buildConfigs
        let buildConfig
        let configName

        const pbxprojPath = `${path}/project.pbxproj`
        let xcodeProject = xcode.project(pbxprojPath)
        xcodeProject.parseSync()
        buildConfigs = xcodeProject.pbxXCBuildConfigurationSection()
        xcodeProject.addKnownRegion('ru')
        fs.writeFileSync(pbxprojPath, xcodeProject.writeSync())
        for (configName in buildConfigs) {
            if (!COMMENT_KEY.test(configName)) {
                buildConfig = buildConfigs[configName]
                return buildConfig
            }
        }
    },

    addLangs: (path, array) => {
        const pbxprojPath = `${path}/project.pbxproj`
        let xcodeProject = xcode.project(pbxprojPath)
        xcodeProject.parseSync()
        xcodeProject.addKnownRegion('ru')

        /* End PBXVariantGroup section */

        // const pbxVariantGroup = xcodeProject.pbxCreateVariantGroup('InfoPlist.strings')

        let keyGroup = xcodeProject.findPBXGroupKeyAndType({name: 'InfoPlist.strings'}, 'PBXVariantGroup')
        if (!keyGroup) {
            keyGroup = xcodeProject.addLocalizationVariantGroup('InfoPlist.strings').fileRef
        }

        array.forEach(i => xcodeProject.addResourceFile(i, {}, keyGroup))

        fs.writeFileSync(pbxprojPath, xcodeProject.writeSync())
    }
}
