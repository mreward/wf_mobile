<template>
    <v-ons-page page="checkout-iframe" shown>
        <div class="page__content no-after">
            <template v-if="payData && payData.paymentPage">
                <iframe ref="iframe"
                        frameborder="0"
                        :src="payData.paymentPage"
                        allowfullscreen></iframe>
            </template>
        </div>
    </v-ons-page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import constants from '_vuex_constants'

    export default {
        name: 'pay-iframe',
        computed: {
            ...mapGetters({
                payData: constants.MrewardShop.Getters.payData,
            })
        },
        watch: {
            payData: {
                deep: true,
                handler() {
                    console.log('iFrame watch payData');
                },
                immediate: true
            }
        },
        mounted() {
            console.log('iFrame mounted');
            window.addEventListener('message', this.postMessage, false);
        },
        destroyed() {
            console.log('iFrame destroyed');
            window.removeEventListener('message', this.postMessage);
        },
        methods: {
            ...mapActions({
                popPage: constants.App.Actions.popPage,
                pushPage: constants.App.Actions.pushPage,
                popToPage: constants.App.Actions.popToPage,
            }),
            postMessage(e) {
                debugger
                console.log('iFrame postMessage');

                if (e.data) {
                    console.log('iFrame postmessage emitted with data: ', e.data);
                    let code = ''
                    let message = ''
                    let status = ''

                    if (typeof e.data === 'string') {
                        try {
                            const data = JSON.parse(e.data)
                            code = data.code
                            message = data.message
                            status = data.status
                        } catch (e) {
                            return
                        }
                    } else if (typeof e.data === 'object') {
                        code = e.data.code
                        message = e.data.message
                        status = e.data.status
                    }

                    if (status) {
                        this.$bus.$emit('goToPayStatus', {
                            code,
                            message,
                            status
                        })
                    }
                }
            },
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
               //  this.$refs.iframe.src = this.payData.paymentPage
            }
        }
    }
</script>
q
<style lang="scss">
    .page[page="checkout-iframe"] {
        .page__content {
            padding: 0 !important;
        }

        iframe {
            height: 100%;
            width: 100%;
            flex:1;
        }
    }
</style>
