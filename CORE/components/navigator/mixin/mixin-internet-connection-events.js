import _isFunction from 'lodash/isFunction'

export default {
    data () {
        return {
            firstValidationError: null,
            connect: true,
        }
    },
    methods: {},
    created () {
        document.addEventListener('offline', () => {
            console.log('Your offline, please connect to internet')
            if (this.connect) {
                this.connect = false
                if (_isFunction(this.onOffline)) {
                    this.onOffline()
                } else {
                    this.$Toast.Warning('Your offline, please connect to internet.', 5000)
                }
            }
        }, false)

        document.addEventListener('online', () => {
            console.log('Your are online now')

            if (!this.connect) {
                this.connect = true
                if (_isFunction(this.onOnline)) {
                    this.onOnline()
                } else {
                    this.$Toast.Success('Hola! Your are online now')
                }
            }
        }, false)
    },
}
