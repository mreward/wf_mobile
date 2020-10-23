export default {
    methods: {
        async onReportBug() {
            try {
                this.$Alert.Confirm({
                    title: this.$t('m_send_error_report'),
                    text: this.$t('m_sorry_error_in_application'),
                    nextName: this.$t('m_ok'),
                    cancelName: this.$t('m_not_send'),
                    nextEvent: async () => {
                        await this.sendFeedback()

                        this.$Alert.Success({
                            title: this.$t('m_report_sent'),
                            text: this.$t('m_thanks_we_will_fix_error'),
                            nextName: this.$t('m_ok')
                        })
                    }
                })
            } catch (e) {
                this.$Alert.Error(e)
            }
        }
    }
}
