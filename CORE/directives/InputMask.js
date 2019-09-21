import Inputmask from 'inputmask'
import _isEmpty from 'lodash/isEmpty'

Inputmask.prototype.definitions['9'] = {
    validator: '[0-9\uFF11-\uFF19\u0030-\u0039]',
    cardinality: 1,
    definitionSymbol: '*'
}

Inputmask.prototype.definitions['*'] = {
    validator: '[0-9\uFF11-\uFF19\u0030-\u0039A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]',
    cardinality: 1
}

/**
 * Input Mask Directive
 *
 * For more documentation how to use it, string format and object format, check this link {@link https://github.com/RobinHerbots/Inputmask}
 *
 * To use:
 * Add `v-mask` attribute to `<input />` or `<v-ons-input></v-ons-input>` and pass object or string with mask.
 *
 * It can be used with other html-elements, see plugin documentation: {@link https://github.com/RobinHerbots/Inputmask#allowed-html-elements}
 *
 * @example
 * import { InputMask } from '_directives';
 * Vue.directive('mask', InputMask);
 *
 * <v-ons-input v-mask: {mask: '999', placeholder: '' } />
 *
 * @example
 * <caption>You can use it with `<span>` element, the text content will be masked</caption>
 * <span v-mask="{mask: '+999 99 999 99 99', placeholder: ''}">{{ phoneNumber }}</span>
 *
 * @type {{inserted: function(*, *, *)}}
 */
export default {
    name: 'mask',
    inserted: (el, { value, modifiers }, vnode) => {
        if (_isEmpty(value)) {
            return
        }
        setTimeout(() => {
            // if length == 0 directive used for <input> else for <v-ons-input>
            const input = vnode.elm.children.length ? vnode.elm.getElementsByTagName('input')[0] : el
            const _el = Inputmask(value).mask(input)
            el.maskValue = value.mask
            if (modifiers.origin) {
                input.addEventListener('input', () => {
                    el.unmaskedValue = _el.unmaskedvalue()
                })
            }
        }, 0)
    },
    update: (el, { value }, vnode) => {
        if (!value) {
            return
        }
        if (el.maskValue !== value.mask) {
            setTimeout(() => {
                const _el = vnode.elm.children.length ? vnode.elm.getElementsByTagName('input')[0] : el
                const _mask = Inputmask(value).mask(_el)
                el.maskValue = value.mask
                el.unmaskedValue = _mask.unmaskedvalue()
                // _el.focus();
                // _el.blur();
            }, 0)
        }
    }
}
