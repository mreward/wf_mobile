import Clipboard from '_CORE/plugins/common/Clipboard'
import _isEmpty from 'lodash/isEmpty'
import MaskPhone from '_PLUGINS/common/MaskPhone'
import Contacts from '_PLUGINS/common/Contacts'
/**
 * Clipboard Directive
 *
 * When input focused it checks if exist copied value in buffer. If value exist, it can be pasted to the input.
 *
 * This directive allows to pass RegEx format for copied value.
 * If value in wrong format, it impossible to paste it to the input.
 *
 * To use:
 * Add to any `input` or `v-ons-input`
 *
 * @example
 *
 * <v-ons-input v-clipboard="{ regex: ''} "/>
 *
 * @example
 * <caption>Can be pasted only digits</caption>
 *
 * <v-ons-input v-clipboard="{ regex: '^[0-9]+$'}" />
 *
 * @example
 * <caption>Can be used with validators</caption>
 *
 * import { isMobileNumber } from '_plugins_validators';
 *
 * <v-ons-input v-clipboard="{ validator: isMobileNumber, cutOffPhoneMask: true, code: '+380' }" />
 *
 * @type {{inserted: function(*, {value: *},*)}}
 */
export default {
    inserted: (el, { value = {} }, vnode) => {
        if (_isEmpty(value)) return
        if (el.tagName === 'INPUT' || el.tagName === 'ONS-INPUT') {
            setTimeout(() => {
                const input = vnode.elm.children.length ? vnode.elm.children[0] : el
                // inserting an element in the desired
                const insertElement = (elem, targetElem) => {
                    return targetElem.appendChild(elem)
                }
                let keyboardHeight = 0
                const getKeyboardHeight = (e) => {
                    keyboardHeight = e.keyboardHeight || 0
                }

                window.addEventListener('keyboardWillShow', getKeyboardHeight)

                input.addEventListener('focus', () => {
                    Clipboard.Paste().then((clipboardText) => {
                        if (!clipboardText) return
                        let result = clipboardText || ''

                        // if directive consist regex or validator, need check content from clipboard
                        if (value.regex) {
                            const patternRegex = new RegExp(value.regex)
                            result = clipboardText.match(patternRegex)
                        } else if (value.validator) {
                            if (value.cutOffPhoneMask) {
                                result = MaskPhone.GetClearPhoneNumber(result)

                                /**
                                 * cut off '0' for Ukrainian phone numbers
                                 */
                                if (value.code === '+380' && result.length === 10) {
                                    result = Contacts.FormatNumber(result)
                                }
                            }
                            if (!value.validator(result)) return
                        }

                        const createHintElement = () => {
                            // create an hint element and add style (classes)
                            const hintElement = document.createElement('div')
                            const targetElement = document.body
                            hintElement.innerHTML = `<span>${result}</span>`
                            hintElement.className = 'field-insertion-helper'
                            hintElement.style.bottom = `${keyboardHeight}px`
                            insertElement(hintElement, targetElement)

                            const removeElementAndListener = () => {
                                // remove this element
                                hintElement.remove()
                                window.removeEventListener('keyboardWillShow', getKeyboardHeight)
                            }
                            const clickAnywhere = () => {
                                // remove listener
                                window.removeEventListener('click', clickAnywhere)
                                window.removeEventListener('keyboardWillHide', clickAnywhere)
                                removeElementAndListener()
                            }
                            // setTimeout because the event is triggered immediately
                            setTimeout(() => {
                                // check pressing past the item
                                window.addEventListener('click', clickAnywhere)
                                window.addEventListener('keyboardWillHide', clickAnywhere)
                            }, 0)

                            hintElement.addEventListener('click', () => {
                                el.value = result
                                if (el.__vue__) {
                                    el.__vue__.$emit('modelEvent', el.value)
                                }
                                // set empty string in clipboard
                                Clipboard.Copy('')
                                // remove listener
                                window.removeEventListener('click', clickAnywhere)
                                removeElementAndListener()
                            })
                        }

                        if (result) {
                            setTimeout(() => {
                                createHintElement()
                            }, 400)
                        }
                    }).catch((e) => {
                        console.log(e)
                    })
                })
            }, 0)
        }
    }
}
