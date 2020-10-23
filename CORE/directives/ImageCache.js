import ImgCache from '_CORE/plugins/common/ImgCache'
/**
 *  ImgCache Directive
 *
 * To use:
 * Add `v-image-cache` attribute to `<img/>` or `<div></div>`
 * Use it to get projects images from cache, to rise speed of loading images.
 *
 * @example
 * <caption>To use with tag `<img/>` pass the object with image property that contain the image</caption>
 * import { ImgCache } from '_directives';
 * Vue.directive('image-cache', ImgCache);
 *
 * import imgVisaLogo from '_SRC_IMG_WALLET/visa.svg';
 *
 * <img v-image-cache="{ image: imgVisaLogo }" alt="">
 * @example
 * <caption>Directive can be used with tag `<div></div>` to set background image from cache,
 * pass the object with backgroundImage property that contain the image </caption>
 * import imgCardLogo from '_SRC_IMG_WALLET/logo-card.svg';
 *
 * <div v-image-cache="{ backgroundImage: imgCardLogo }"></div>
 * @type {{inserted: function(*, value: {})}}
 */
export default {
    async inserted(el, { value: { backgroundImage, image } }) {
        let url = backgroundImage || image

        try {
            const result = await ImgCache.Get(url)
            url = result.nativeURL || result.fullPath

            if (window.Ionic && window.Ionic.normalizeURL) {
                url = window.Ionic.normalizeURL(url)
            }

            if (window.Ionic && window.Ionic.WebView && window.Ionic.WebView.convertFileSrc) {
                url = window.Ionic.WebView.convertFileSrc(url)
            }
        } catch (e) {
            console.log(e)
        }

        if (backgroundImage) {
            el.style.backgroundImage = `url('${url}')`
        } else if (image) {
            el.src = url
        }
    },
    async update(el, { value: { backgroundImage, image } }) {
        let url = backgroundImage || image

        try {
            const result = await ImgCache.Get(url)
            url = result.nativeURL || result.fullPath

            if (window.Ionic && window.Ionic.normalizeURL) {
                url = window.Ionic.normalizeURL(url)
            }

            if (window.Ionic && window.Ionic.WebView && window.Ionic.WebView.convertFileSrc) {
                url = window.Ionic.WebView.convertFileSrc(url)
            }
        } catch (e) {
            console.log(e)
        }

        if (backgroundImage) {
            el.style.backgroundImage = `url('${url}')`
        } else if (image) {
            el.src = url
        }
    }
}
