import Vue from 'vue'

/**
 * ShowPassword Directive
 *
 * To show password value in input[type="password"] at focused on "show element".
 * Fires on Click, Hold events
 *
 * To use:
 * Add `v-show-password` attribute to `<input />` or `<v-ons-input></v-ons-input>`
 *
 * @example
 * <caption>Pass the object with icons to `v-show-password` attribute.</caption>
 * <v-ons-input
 * v-show-password="{iconHide: 'icon-eye-opened', iconShow: 'icon-eye-closed'}"
 * />
 *
 * @example
 * <caption>Passed object can be a computed property</caption>
 * <v-ons-input
 * v-show-password="showPassword"
 * />
 * computed: {
 *     showPassword() {
 *          return {iconHide: 'icon-eye-opened', iconShow: 'icon-eye-closed'};
 *     },
 * }
 * @param binding - {Object} [object]
 * @param binding.value.onlyClickMode - Only by clicking on the visibility of the password
 * @param binding.value.onlyClickMode - default = false
 *
 * @type {{inserted: function(*, {value: *}, *)}}
 */
export default {
    inserted: (element, { value: { onlyClickMode = false, iconShow, iconHide, className = 'show-password-button' } = {} }, vnode) => {
        if (!iconShow && !iconHide) return
        setTimeout(() => {
            console.log('ShowPassword Directive inserted')
            const el = vnode.elm.children.length ? vnode.elm.children[0] : element

            function insertAfter(elem, refElem) {
                return refElem.parentNode.insertBefore(elem, refElem.lastChild)
            }

            const showElement = document.createElement('div')
            insertAfter(showElement, el)

            showElement.innerHTML = `<i class="${iconShow}"></i>`
            showElement.className = className

            showElement.addEventListener('click', () => {
                el.focus()
            })

            let eventListener = 'touchstart'

            if (!Vue.prototype.$ons.isWebView()) {
                eventListener = 'click'
            }

            el.typeInput = el.type

            let timer = 0
            showElement.addEventListener(eventListener, () => {
                if (el.typeInput !== 'text') {
                    if (el.type === 'text') {
                        showElement.innerHTML = `<i class="${iconShow}"></i>`
                        el.type = 'password'
                    } else {
                        showElement.innerHTML = `<i class="${iconHide}"></i>`
                        el.type = 'text'
                    }
                } else if (el.typeInput === 'text') {
                    if (el.parentElement.classList.contains('text--security')) {
                        showElement.innerHTML = `<i class="${iconHide}"></i>`
                        el.parentElement.classList.remove('text--security')
                    } else {
                        showElement.innerHTML = `<i class="${iconShow}"></i>`
                        el.parentElement.classList.add('text--security')
                    }
                }

                timer = Date.now()
            }, false)

            showElement.addEventListener('touchend', () => {
                const t = Date.now() - timer
                if (t > 300 && !onlyClickMode) {
                    if (el.typeInput !== 'text') {
                        el.type = 'password'
                    } else {
                        el.parentElement.classList.add('text--security')
                    }
                }
            }, false)
        }, 0)
    }
}
