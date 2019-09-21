import _isFunction from 'lodash/isFunction'

export default {
    methods: {

    },
    created() {
        document.addEventListener('offline', () => {
            if (_isFunction(this.onOffline)) {
                this.onOffline()
            } else {
                this.$Toast.Warning('Your offline, please connect to internet.', 5000)
            }
        }, false)

        document.addEventListener('online', () => {
            if (_isFunction(this.onOnline)) {
                this.onOnline()
            } else {
                this.$Toast.Success('Hola! Your are online now')
            }
        }, false)
    }
}
