import md5 from 'md5'
/**
 * Camera plugin for take a photo or choose from gallery
 *
 * To use:
 * Call `Camera.FunctionName(params)`
 */
export default {
    /**
     * @param {Object}
     * @param sourceType - source of the picture. 1 (Camera), 0 (From Gallery)
     * @param targetWidth - Width in pixels to scale image. Must be used with targetHeight. Aspect ratio remains constant.
     * @param targetHeight - Height in pixels to scale image. Must be used with targetWidth. Aspect ratio remains constant.
     * @param quality - Quality of the saved image, expressed as a range of 0-100, where 100 is typically full resolution
     * with no loss from file compression. (Note that information about the camera's resolution is unavailable.)
     * @example
     * <caption>-----</caption>
     * import Camera from '_PLUGINS/common/Camera';
     *
     * Camera.GetPicture({imageSource})
     */
    GetPicture({ imageSource: sourceType, targetWidth = 600, targetHeight = 600, quality = 100 }) {
        return new Promise((resolve, reject) => {
            if (window.cordova) {
                let allowEdit = true
                if (device.manufacturer === 'Meizu') {
                    allowEdit = false
                }
                navigator.camera.getPicture(resolve, (e) => {
                    switch (e) {
                        case 'Selection cancelled.':
                        case 'Camera cancelled.':
                            reject()
                            break
                        default:
                            reject(e)
                            break
                    }
                }, {
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType,
                    correctOrientation: true,
                    quality,
                    allowEdit,
                    targetWidth,
                    targetHeight
                })
            } else {
                reject()
            }
        })
    },
    /**
     * @param picture - obtained by Camera.GetPicture
     * @param accountId - user profile account ID
     * @param type
     * @param w - Width
     * @param h -Height
     * @example
     * import Camera from '_PLUGINS/common/Camera';
     *
     * Camera.PreparePicture({PreparePicture})
     */
    PreparePicture ({picture, accountId, type, w = 400, h = 400, isHashFileName = true, fileKey = 'file'}) {
        return new Promise((resolve, reject) => {
            resolveLocalFileSystemURL(picture, (fileEntry) => {
                fileEntry.file((fileObj) => {
                    fileEntry.getMetadata((metaData) => {
                        const imageURI = fileObj.localURL
                        const options = new FileUploadOptions()
                        options.fileKey = fileKey
                        const fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1)
                        options.fileName = isHashFileName ? md5(fileName) : fileName
                        options.mimeType = 'image/png'
                        options.httpMethod = 'POST'
                        options.headers = {}

                        const params = {}
                        params.par = JSON.stringify({
                            type: type || 'avatar_orig',
                            account_id: accountId,
                            w,
                            h,
                            center: 1
                        })
                        params.size = metaData.size
                        params.load_photo = '1.0.0.1'

                        options.params = params
                        options.chunkedMode = false

                        resolve({
                            options,
                            imageURI
                        })
                    }, (e) => {
                        reject(e)
                    })
                }, (e) => {
                    if (e.indexOf('Camera cancelled') > -1) {
                        reject()
                    } else {
                        reject(e)
                    }
                })
            })
        })
    }
}
