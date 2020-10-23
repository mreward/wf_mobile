/* eslint-disable import/no-dynamic-require */
const isString = require('lodash/isString')
const isObject = require('lodash/isObject')
const mergeWith = require('lodash/mergeWith')
const cloneDeep = require('lodash/cloneDeep')
const isArray = require('lodash/isArray')
const set = require('lodash/set')
const path = require('path')

function _customizer(objValue, srcValue) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue)
    }
}

module.exports = function(wallet) {
    const { modules = {} } = wallet.application.mainJsModules

    const pathToModules = []
    let configs = {}
    const options = {
        modules: {}
    }

    function __buildImport(object, key) {
        Object.keys(object).sort().forEach((item) => {
            const value = object[item]
            if (isObject(value)) {
                if (key) {
                    modules[key] = {}
                }
                __buildImport(object[item], `${key}${item}/`)
            } else {
                let pathModule = ''
                if (value === true) {
                    pathModule = path.resolve(__dirname, `../../../CORE/modules/${key}${item}`)
                } else if (isString(value)) {
                    pathModule = path.resolve(__dirname, `../../../${value}`)
                }

                if (pathModule) {
                    pathToModules.push(pathModule)
                    const config = require(`${pathModule}/.config.js`)

                    if (config.options) {
                        set(options.modules, `${key}${item}`.replace(/\//g, '.'), config.options)
                        delete config.options
                    }

                    if (config.modules) {
                        __buildImport(config.modules, '')
                    }

                    configs = mergeWith(cloneDeep(configs), config, _customizer)
                }
            }
        })
    }

    __buildImport(modules, '')

    const contentOptions = `module.exports = ${JSON.stringify(options, null, '\t')}`

    return {
        configs,
        contentOptions,
        pathToModules
    }
}
