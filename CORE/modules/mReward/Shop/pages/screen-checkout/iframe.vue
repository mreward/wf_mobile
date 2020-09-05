<template>
    <div class="sdfd">
        <template v-if="payData && payData.paymentPage">
        <iframe ref="iframe" allowfullscreen></iframe>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'pay-iframe',
        computed: {
            ...mapGetters({
                payData: constants.MrewardShop.Getters.payData,
            })
        },
        mounted () {
            if (this.payData && this.payData.url) {
                this.setSrcdoc()
            }
        },
        methods: {
            setSrcdoc() {
                // const inputs = Object.keys(this.payData.form).reduce((result, key) => {
                //     return result + `<input type="hidden" name="${key}" value="${this.payData.form[key]}"/>`
                // }, '')
                //
                //
                // const script = '<script type="text/javascript">document.addEventListener(\'DOMContentLoaded\', function(){alert(1); })<\/script>'
                //
                // const html = `<!DOCTYPE html>
                //         <html>
                //             <body>
                //                 <form method="POST"
                //                       id="paymentForm"
                //                       action="${this.payData.url}"
                //                       accept-charset="utf-8"
                //                       >
                //                       ${inputs}
                //
                //                 </form>
                //
                //                 ${script}
                //             </body>
                //         </html>`
                //
                // debugger
               // this.$refs.iframe.src = 'https://testpay.kkb.kz/jsp/process/logon.jsp';// = html
                this.$refs.iframe.src = this.payData.paymentPage

            }
        }
    }
</script>

<style scoped
       lang="scss">
    .d {
        width: auto;
    }
</style>
