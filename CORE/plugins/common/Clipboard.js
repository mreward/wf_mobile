import * as clipboard from 'clipboard-polyfill'

/**
 * Clipboard management plugin
 *
 * To use:
 * Call `Clipboard.FunctionName(*params)`
 */
export default {
    /**
     * Puts the text on the clipboard
     * @param text - text to be placed in clipboard
     * @example
     * <caption>-----</caption>
     * import Clipboard from '_PLUGINS/common/Clipboard';
     *
     * Clipboard.Copy('text')
     */
    Copy(text) {
        return new Promise((resolve, reject) => {
            if (window.cordova && cordova.plugins.clipboard) {
                cordova.plugins.clipboard.copy(text, resolve, reject)
            } else {
                clipboard.writeText(text).then(resolve, reject)
                // console.log('need add install plugin cordova.plugins.clipboard');
                // reject();
            }
        })
    },
    /**
     * Returns text from the clipboard
     * @example
     * <caption>-----</caption>
     * import Clipboard from '_PLUGINS/common/Clipboard';
     *
     * await Clipboard.Paste();
     */
    Paste() {
        return new Promise((resolve, reject) => {
            if (window.cordova && cordova.plugins.clipboard) {
                cordova.plugins.clipboard.paste(resolve, reject)
            } else {
                clipboard.readText().then(resolve, reject)
            }
        })
    }
}
