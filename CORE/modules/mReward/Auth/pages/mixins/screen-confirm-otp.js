import InputPin from '_input_pin_sequence'

export default {
    data() {
        return {
            smsCode: '',
            lengthPin: 4,
            mobileNumber: ''
        }
    },
    components: {
        InputPin
    },
    watch: {
        smsCode(newVal) {
            if (newVal.length === 4) {
                this.callback(newVal)
            }
        }
    }
}
