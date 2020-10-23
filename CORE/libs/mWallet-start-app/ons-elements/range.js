export default {
    init(Vue) {
        if (Vue.prototype.$ons.elements.Range) {
            Vue.prototype.$ons.elements.Range.prototype._update = function _update() {
                const input = this._input
                const focusRing = this._focusRing
                let height = 2
                if (input.parentElement.attributes.height) {
                    height = input.parentElement.attributes.height.value
                }
                input.style.backgroundSize = `${100 * this._ratio}% ${height}px`
                focusRing.value = this.value

                // NOTE: "_zero" attribute is used for CSS styling.
                if ((input.min === '' && input.value === '0') || input.min === input.value) {
                    input.setAttribute('_zero', '')
                } else {
                    input.removeAttribute('_zero')
                }

                ['min', 'max'].forEach((attr) => {
                    focusRing[attr] = input[attr]
                })
            }
        }
    }
}
