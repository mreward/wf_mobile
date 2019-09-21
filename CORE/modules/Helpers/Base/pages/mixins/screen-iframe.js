export default {
    data: () => ({
        title: ''
    }),
    computed: {
        pageTitle() {
            return this.title || this.$t(`m_iframe_${this.type}`) || ''
        }
    },
    mounted() {
        window.addEventListener('message', this.postMessage, false)
    },
    destroyed() {
        window.removeEventListener('message', this.postMessage)
    },
    methods: {
        postMessage(e) {
            if (e.data) {
                console.log('iFrame postmessage emitted with data: ', e.data)
                const { code, type } = e.data
                if (type === 'payment-status') {
                    switch (code.toString()) {
                        case '-1': // for mWallet with Mastercard
                        case '0':
                            this.callback('success', { ...e.data, success: true })
                            break
                        case '96':
                            this.callback('pending')
                            break
                        case '18':
                            this.callback('failed', {
                                error: code,
                                message: this.$t('m_error_bank_issue')
                            })
                            break
                        default:
                            this.callback('failed', {
                                error: code,
                                message: this.$t('m_helpers_fail_code', '', { code })
                            })
                            break
                    }
                }
            }
        },
        load(e) {
            console.log('iFrame load emitted with data: ', e)
            switch (this.type) {
                case 'topup': {
                    const url = decodeURIComponent(e.currentTarget.contentWindow.location.href)
                    if (url.indexOf('success') > -1) {
                        this.callback('success')
                    } else if (url.indexOf('fail') > -1) {
                        this.callback('failed')
                    }
                    break
                }
                default:
                    break
            }
        }
    }
}
