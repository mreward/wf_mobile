export default {
    data() {
        return {
            codeResent: false,
            codeResentButton: false,
            timer: 10,
            timerID: ''
        }
    },
    created() {
        this.timerID = setInterval(this.runTimer, 1000)
    },
    beforeDestroy() {
        console.log(`${this.$options.name} :beforeDestroy`)
        clearInterval(this.timerID)
    },
    methods: {
        async resendCode() {
            this.resetOtp()
            this.codeResent = true
            this.codeResentButton = false
            this.timer = 10
            this.resendRequest(this.mobile)
        },
        runTimer() {
            if (this.timer > 0) {
                this.timer = this.timer - 1
            } else {
                this.codeResent = false
                this.codeResentButton = true
            }
        }
    }
}
