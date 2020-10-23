import _get from 'lodash/get'
import Clipboard from '_CORE/plugins/common/Clipboard'

// setCaretPosition - Function to set carret position in input
// ( fixing issues on android and iOS ) - NOT a directive

const setCaretPosition = (el, caretPos) => {
    if (el !== null) {
        if (el.createTextRange) {
            const range = el.createTextRange()
            range.move('character', caretPos)
            range.select()
            return true
        }
        // (el.selectionStart === 0 added for Firefox bug)
        if (el.selectionStart || el.selectionStart === 0) {
            el.focus()
            el.setSelectionRange(caretPos, caretPos)
            return true
        }
        el.focus()
        return false
    }
    return true
}
/**
 * InputNext Directive
 *
 * For single column input fields ( like PIN, OTP ) [] [] [] []
 * To jump to the next / prev input on user input
 *
 * To use:
 * Add v-next-input attribute to `<input />` or `<v-ons-input></v-ons-input>`
 *
 * @example
 * <caption>You can use it with `<v-ons-input>` generated in loop</caption>
 * import { InputNext } from '_directives';
 * Vue.directive('nextInput', InputNext);
 *
 * <v-ons-input
 *  v-for="(n) in lengthPin"
 *  :key="n"
 *  v-next-input
 *  maxlength="1"
 *  />
 *
 * @type {{inserted: function(*, *, *)}}
 */
export default {
    name: 'nextInput',
    inserted: (el, binding, vnode) => {
        setTimeout(() => {
            const maxLength = parseInt(_get(el, 'attributes.length-max.value', 1), 10)
            el.oldValue = el.value

            vnode.elm.children[0].addEventListener('paste', (e) => { // Go Back On Clicking Clear Button
                let text = _get(e, 'detail.text', '')
                if (e.clipboardData) {
                    text = e.clipboardData.getData('Text')
                }

                function __paste__(data) {
                    const clipboardText = data.match(new RegExp(`.{1,${maxLength}}`, 'g'))
                    const evt = document.createEvent('HTMLEvents')
                    evt.initEvent('input', true, true)

                    let next = el
                    next.children[0].value = clipboardText[0]
                    next.children[0].focus()
                    next.children[0].dispatchEvent(evt)

                    clipboardText.map((item, i) => {
                        if (next && !item.isNaN) {
                            while (true) {
                                next = next.nextElementSibling
                                if (next === null) {
                                    break
                                }
                                if (next.children[0].tagName.toLowerCase() === 'input') {
                                    next.children[0].focus()
                                    next.children[0].value = clipboardText[i + 1]
                                    next.children[0].dispatchEvent(evt)
                                    break
                                }
                            }
                        }
                        return item
                    })
                }

                if (!text) {
                    Clipboard.Paste().then((text) => {
                        __paste__(text)
                    })
                } else {
                    __paste__(text)
                }
            })

            const getKeyCode = function(str) {
                if (!str.length) {
                    return 8
                }
                return str.charCodeAt(str.length - 1)
            }

            vnode.elm.children[0].addEventListener('keydown', (e) => {
                const charCode = e.which ? e.which : e.keyCode
                let which = charCode

                if (which === 0 || which === 229) {
                    // for android chrome keycode fix
                    which = getKeyCode(el.value)
                }

                if ((which >= 48 && which <= 57) || (which >= 96 && which <= 105)) {
                    if (el.value && (el.oldValue === el.value) && maxLength === 1) {
                        el.value = ''
                    }
                } else if (which === 8 && !el.value && !el.oldValue) {
                    vnode.elm.children[0].dispatchEvent(new CustomEvent('input'))
                } else if (which !== 8) {
                    e.preventDefault()
                    return false
                }

                return true
            })

            // TODO: for inputmask v4
            // vnode.elm.children[0].addEventListener('beforeinput', (e) => {
            //     if (e.inputType === 'insertText' && e.data.length > 1) {
            //         const pasteEvent = new CustomEvent('paste', { detail: { text: e.data } });
            //         vnode.elm.children[0].dispatchEvent(pasteEvent);
            //     }
            // });

            vnode.elm.children[0].addEventListener('input', (e) => {
                if (e.inputType === 'insertText' && e.data.length > 1) {
                    const pasteEvent = new CustomEvent('paste', { detail: { text: e.data } })
                    vnode.elm.children[0].dispatchEvent(pasteEvent)
                }

                if (Object.prototype.toString.call(e) !== '[object CustomEvent]' && e.bubbles) {
                    return
                }

                setTimeout(() => {
                    let which = ''
                    let isEmptied = false
                    let isNotPrev = false
                    if (el.oldValue.length < el.value.length) {
                        if ((el.value.length - el.oldValue.length) === 1) {
                            which = getKeyCode(el.value)
                        }
                    } else if (el.oldValue.length > el.value.length) {
                        which = 8
                        isNotPrev = true
                    } else if (!el.value && el.oldValue === el.value) {
                        which = 8
                        isEmptied = true
                    } else {
                        console.warn('WARNING:', el)
                    }

                    if (which === 8 || which === 229) {
                        let previous = el
                        if (isNotPrev) {
                            previous.oldValue = ''
                            if (previous.__vue__) {
                                previous.__vue__.$emit('modelEvent', previous.value)
                            }

                            return
                        }
                        const _focusNewInput = () => {
                            // if (maxLength === 1) {
                            //     el.value = '';
                            // }
                            // previous.oldValue = ''; // This caused double reset of value
                            const position = previous.value.length

                            if (!el.value) {
                                setTimeout(() => {
                                    if (isEmptied) {
                                        previous.oldValue = ''
                                        previous.children[0].value = ''
                                        if (previous.__vue__) {
                                            previous.__vue__.$emit('modelEvent', previous.value)
                                        }
                                    }
                                    previous.children[0].focus()
                                    setCaretPosition(previous.children[0], position)
                                }, 0)
                            }
                        }
                        while (true) {
                            previous = previous.previousElementSibling

                            // eslint-disable-next-line
                            if (previous === null) {
                                break
                            }

                            if (previous.children[0].tagName.toLowerCase() === 'input') {
                                _focusNewInput()
                                break
                            }
                        }
                    } else if (el.value.length >= maxLength) {
                        let next = el

                        // eslint-disable-next-line
                        while (true) {
                            next = next.nextElementSibling
                            if (next === null) {
                                break
                            }
                            if ((!next.value || next.value.length < maxLength) && next.children[0].tagName.toLowerCase() === 'input') {
                                next.children[0].focus()
                                break
                            }
                        }
                    }
                    el.oldValue = el.value
                }, 0)
            })
        }, 0)
    }
}
