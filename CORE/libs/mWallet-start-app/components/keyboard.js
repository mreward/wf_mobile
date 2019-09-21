import smoothscroll from 'smoothscroll-polyfill'
// kick off the polyfill!
smoothscroll.polyfill()

function _getCssHeight(h) {
    return `html[onsflag-keyboard-show] .page__content:not(.no-after)::after {
                        height: ${h}px !important;
                        content: '';
                        display: block;
                }`
}

export default {
    init(configWallet) {
        if (window.Keyboard && configWallet.application.keyboard) {
            if (window.device && window.device.platform.toLowerCase() === 'ios') {
                Keyboard.hideFormAccessoryBar(true)
            }

            /**
             * Добавляем отступ в странице для прокрутки контента при открытой клавиатуре
             */
            let isAddHeightKeyboardCss = false
            let _timer = 0
            let _timeoutID = 0
            const _interval = 10

            window.addEventListener('keyboardWillShow', (e) => {
                console.log('keyboardWillShow')

                if (!isAddHeightKeyboardCss) {
                    isAddHeightKeyboardCss = true
                    // Create our stylesheet
                    const style = document.createElement('style')
                    style.id = 'keyboard-height'
                    style.innerHTML = _getCssHeight(e.keyboardHeight)

                    // Get the first script tag
                    const ref = document.querySelector('script')
                    // Insert our new styles before the first script tag
                    ref.parentNode.insertBefore(style, ref)
                } else {
                    document.getElementById('keyboard-height').innerHTML = _getCssHeight(e.keyboardHeight)
                }

                if (_timeoutID && (Date.now() - _timer) < _interval) {
                    clearTimeout(_timeoutID)
                } else {
                    // TYPE
                    let element = document.activeElement
                    if (element.parentElement.nodeName === 'ONS-INPUT') {
                        if (element.parentElement.parentElement.className.indexOf('list-item__center') > -1) {
                            element = element.parentElement.parentElement.parentElement
                        }
                    } else if (element.parentElement.className.indexOf('placeholder-wrap') > -1 ||
                        (element.parentElement.parentElement &&
                            element.parentElement.parentElement.className.indexOf('placeholder-wrap') > -1)) {
                        /**
                         * else if condition for interactive placeholder
                         * (Moneyveo)
                         */
                        const children = element.parentElement.childNodes

                        for (let i = 0; i < children.length; i += 1) {
                            if (children[i].className && children[i].className.indexOf('placeholder') > -1) {
                                element = children[i]
                            }
                        }
                    }

                    document.documentElement.setAttribute('onsflag-keyboard-show', '')
                    document.documentElement.setAttribute('webkit-overflow-scrolling-off', '')

                    const position = element.getBoundingClientRect()
                    // console.log(`height: ${window.innerHeight - e.keyboardHeight} | position: ${position.y}`);
                    if ((window.innerHeight - e.keyboardHeight) < (position.top + 30)) {
                        setTimeout(() => {
                            let topPlus = 150
                            if (window.innerHeight < 600) {
                                topPlus = 50
                            }
                            element.scrollIntoView({ behavior: 'smooth' }, topPlus)
                        }, 50)
                    }

                    setTimeout(() => {
                        document.documentElement.removeAttribute('webkit-overflow-scrolling-off')
                    }, 1000)
                }
            })

            window.addEventListener('keyboardWillHide', () => {
                console.log('keyboardWillHide')
                _timeoutID = setTimeout(() => {
                    document.documentElement.removeAttribute('onsflag-keyboard-show')
                }, _interval)
                _timer = Date.now()
            })
        }
    }
}
