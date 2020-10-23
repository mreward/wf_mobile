const isString = require('lodash/isString')
const isObject = require('lodash/isObject')
const _get = require('lodash/get')

module.exports = function(grunt, wallet) {
    let content = 'import ApiClient from \'_apiClient\';\n'
    let contentInit = ''

    const { mwalletClient } = wallet.application.mainJsModules

    // const pathApiClinet = mwalletClient.ApiClient === true ? '_apiClient' : mwalletClient.ApiClient;
    // content += `import ApiClient from '${pathApiClinet}';\n`;
    // delete mwalletClient.ApiClient;

    function __buildImport(modules, key) {
        Object.keys(modules).sort().forEach((item) => {
            const value = modules[item]
            if (isObject(value)) {
                __buildImport(modules[item], `${key}${item}/`)
            } else {
                const keys = `${key}${item}`
                const nameObj = keys.replace(/\//g, '')

                const {apiV = ''} = _get(wallet, 'application.meta[0].API', '')
                let version = ''
                if (value === true) {
                    contentInit += `    ${nameObj},\n`

                    if (apiV) {
                        const isClientV2 = grunt.file.exists(`./CORE/libs/mWallet/${key}${item}${apiV}.js`)
                        if (isClientV2) {
                            version = apiV
                        }
                    }

                    content += `import ${nameObj} from '_CORE/libs/mWallet/${key}${item}${version}';\n`
                } else if (isString(value)) {
                    contentInit += `    ${nameObj},\n`

                    if (apiV) {
                        const isClientV2 = grunt.file.exists(`${value.replace('_CORE', './CORE')}${apiV}.js`)
                        if (isClientV2) {
                            version = apiV
                        }
                    }

                    content += `import ${nameObj} from '${value}${version}';\n`
                }
            }
        })
    }

    __buildImport(mwalletClient, '')

    content += `
export const mWalletClient = {
    config: (data) => {
        if (data.options) {
            ApiClient.prototype._config(data.options);
        }
    },

    setCallbackUpdateToken: (callbackUpdateToken) => {
        if (callbackUpdateToken) {
            ApiClient.prototype._callbackUpdateToken = callbackUpdateToken;
        }
    },

    setSession: (session) => {
        if (session) {
            ApiClient.prototype.session = session;
        }
    },
    
${contentInit}};`

    return content
}
