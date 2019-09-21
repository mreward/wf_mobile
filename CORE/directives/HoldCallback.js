/**
 *  HoldCallback Directive
 *
 * To use:
 * Add `v-hold` attribute to any element.
 * Pass the object with callback function which will be fired when user hold the element.
 * Pass the duration property in ms, its time user must holding the element to fire the callback function,
 * default is 500ms
 *
 * @example
 *
 * import { HoldCallback} from '_directives';
 * Vue.directive('hold', FormTracking);
 *
 * <v-ons-action-sheet-button
 * v-hold="{callback: openDebugOptions, duration: 5000}">
 *     </v-ons-action-sheet-button>
 * methods: {
 *        openDebugOptions() {      ...     },
 * }
 * @type {{inserted: function(*, *)}}
 */
export default {
    name: 'hold',
    bind: (el, binding) => {
        let timer = 0
        el.addEventListener('touchstart', () => {
            timer = setTimeout(binding.value.callback, binding.value.duration || 500)
        }, false)

        el.addEventListener('touchend', () => {
            if (timer) {
                clearTimeout(timer)
            }
        }, false)
    }
}
