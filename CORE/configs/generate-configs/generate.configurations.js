/* eslint-disable import/no-dynamic-require,prefer-const */
const mergeWith = require('lodash/mergeWith')
const cloneDeep = require('lodash/cloneDeep')
const isArray = require('lodash/isArray')

function _customizer(objValue, srcValue) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue)
    }
}

module.exports = function({ grunt, wallet }) {
    try {
        let { configs: configsToMerge, contentOptions, pathToModules } = require('./content.modules')(wallet)
        // remove row 'css' what would not be going in main.js
        let contentSCSS = ''
        if (configsToMerge.css) {
            contentSCSS = require('./content.scss')(configsToMerge.css)
            delete configsToMerge.css
        }

        // merge new configs with mainJsModules
        const mainJsModules = cloneDeep(wallet.application.mainJsModules)
        wallet.application.mainJsModules = mergeWith(mainJsModules, configsToMerge, _customizer)
        // console.log(wallet.application.mainJsModules);

        // Создание файлов конфигурации
        const pathProject = './CORE/__configs.generate__/'
        let contentMain = require('./content.main')(wallet)
        let contentConfigsIndex = require('./content.configs.index')(wallet)
        let contentDirectives = require('./content.directives')(wallet)
        let contentOnsenUI = require('./content.onsenui')(wallet)
        let contentFilters = require('./content.filters')(wallet)
        let contentStoreConstants = require('./content.store.modules')(wallet, 'CAMD')
        let contentStoreModules = require('./content.store.modules')(wallet, 'modules')
        let contentComponents = require('./content.components')(wallet)
        let contentPlugins = require('./content.plugins')(wallet)
        let contentMixins = require('./content.mixins')(wallet)
        let contentLocales = require('./content.locales')(wallet)
        let contentMwalletClient = require('./content.mwallet.client')(grunt, wallet)
        let contentRegister = require('./content.register')(wallet)
        const filesLocales = require('./content.locales.lang')(wallet, pathProject)

        const titleFile = '/* DO NOT CHANGE: Auto-generated file */\n\n'
        contentMain = titleFile + contentMain
        contentConfigsIndex = titleFile + contentConfigsIndex
        contentDirectives = titleFile + contentDirectives
        contentOnsenUI = titleFile + contentOnsenUI
        contentFilters = titleFile + contentFilters
        contentStoreConstants = titleFile + contentStoreConstants
        contentStoreModules = titleFile + contentStoreModules
        contentComponents = titleFile + contentComponents
        contentPlugins = titleFile + contentPlugins
        contentMixins = titleFile + contentMixins
        contentLocales = titleFile + contentLocales
        contentMwalletClient = titleFile + contentMwalletClient
        contentRegister = titleFile + contentRegister
        contentSCSS = titleFile + contentSCSS
        contentOptions = titleFile + contentOptions

        // console.log(filesLocales);
        const filesList = [
            {
                path: `${pathProject}/main.js`,
                content: contentMain
            }, {
                path: `${pathProject}/configs/index.js`,
                content: contentConfigsIndex
            }, {
                path: `${pathProject}/configs/directives.js`,
                content: contentDirectives
            }, {
                path: `${pathProject}/configs/onsenUI.js`,
                content: contentOnsenUI
            }, {
                path: `${pathProject}/configs/filters.js`,
                content: contentFilters
            }, {
                path: `${pathProject}/store/constants.js`,
                content: contentStoreConstants
            }, {
                path: `${pathProject}/store/modules.js`,
                content: contentStoreModules
            }, {
                path: `${pathProject}/configs/components.js`,
                content: contentComponents
            }, {
                path: `${pathProject}/configs/plugins.js`,
                content: contentPlugins
            }, {
                path: `${pathProject}/configs/mixins.js`,
                content: contentMixins
            }, {
                path: `${pathProject}/configs/locales.js`,
                content: contentLocales
            }, {
                path: `${pathProject}/configs/client.mWallet.js`,
                content: contentMwalletClient
            }, {
                path: `${pathProject}/configs/register.js`,
                content: contentRegister
            }, {
                path: `${pathProject}/style/base.scss`,
                content: contentSCSS
            }, {
                path: `${pathProject}/configs/config.modules.js`,
                content: contentOptions
            },
            ...filesLocales
        ]

        // Создание иконок
        require('../grunt-modules/webfont')({ grunt, wallet, pathToModules })
        // Генерация и экспорт языков
        require('../grunt-modules/langs-generate')({ grunt, wallet, pathToModules })

        filesList.forEach((item) => {
            grunt.file.write(item.path, item.content)
        })
    } catch (e) {
        console.log(e)
    }
}
