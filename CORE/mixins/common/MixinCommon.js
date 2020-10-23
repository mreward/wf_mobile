export default {
    data() {
        return {
            layout: 'default'
        }
    },
    methods: {
        async hideKeyboard() {
            if (window.Keyboard) {
                if (Keyboard.hide) {
                    Keyboard.hide()
                } else if (Keyboard.close) {
                    Keyboard.close()
                }
            } else {
                [...document.getElementsByTagName('input')].forEach(input => input.blur())
            }
        }
    }
}
