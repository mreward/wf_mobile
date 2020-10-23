// Instead of using the PERSISTENT or TEMPORARY filesystems, use one of the
// Cordova File plugin's app directories
// (https://github.com/apache/cordova-plugin-file#where-to-store-files).
// This is friendlier in a mobile application environment as we are able to store
// files in the correct platform-recommended/enforced directories.
// WARNING: Make sure this points to a directory!
// NOTE: Only has effect when running in a Cordova environment
import ImgCache from 'imgcache/lib/imgcache'
import ImgCachePromise from 'imgcache/lib/imgcache-promise'

class _imgObject {
    constructor(url) {
        this.src = url
    }

    async loadImage() {
        let obj = ''
        try {
            obj = await ImgCachePromise.isCached(this.src)
        } catch (e) {
            try {
                obj = await ImgCachePromise.cacheFile(this.src)
            } catch (e) {
                console.log(e)
                throw e
            }
        }

        if (typeof obj === 'string') {
            obj = {
                nativeURL: obj
            }
        }

        if (obj.nativeURL.startsWith('file://')) {
            obj.nativeURL = obj.nativeURL.substr(7) // len("file://") == 7
        }

        return obj
    }
}

export default {
    Init() {
        return new Promise((resolve, reject) => {
            if (window.cordova && window.cordova.file) {
                ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory

                ImgCache.init(() => {
                    console.log('ImgCache init: success!')
                    // bug first request is null
                    ImgCachePromise.isCached('').then(resolve).catch(resolve)
                }, (e) => {
                    console.log('ImgCache init: error! Check the log for errors', e)
                    reject(e)
                })
            } else {
                resolve()
            }
        })
    },

    async Get(url) {
        if (window.cordova) {
            const result = await new _imgObject(url).loadImage()
            return result
        }

        return {
            nativeURL: url
        }
    }
}
